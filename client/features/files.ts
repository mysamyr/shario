import { ApiError } from '../types.ts';
import { Div, Header, Input, Paragraph, Span } from '../components.ts';
import modal from './modal.ts';
import snackbar from './snackbar.ts';
import { updateHeader } from './header.ts';
import { validateFilename } from '../helpers.ts';
import {
  API_ERROR_$,
  FILES_TOO_BIG,
  NAME_WAS_NOT_CHANGED,
  UPLOAD_ERROR,
} from '../constants/errors.ts';
import {
  FILE_DELETED,
  FILE_RENAMED,
  FILE_UPLOADED,
  FILES_UPLOADED,
} from '../constants/messages.ts';
import { MAX_FILE_SIZE } from '../constants/index.ts';

function showInputError(input: HTMLInputElement, message: string): void {
  input.classList.add('input-error');

  const next: HTMLSpanElement | null = input
      .nextElementSibling as HTMLSpanElement;
  if (next && next.classList.contains('error-message')) {
    next.remove();
  }

  const errorMsg: HTMLSpanElement = Span({
    className: 'error-message',
    text: message,
  });
  input.after(errorMsg);
}

function hideInputError(input: HTMLInputElement): void {
  input.classList.remove('input-error');
  const next: HTMLSpanElement | null = input
      .nextElementSibling as HTMLSpanElement;
  if (next && next.classList.contains('error-message')) {
    next.remove();
  }
}

function uploadFilesModal(
  files: File[],
  onSubmit: (inputs: HTMLInputElement[]) => void,
): HTMLDivElement {
  const container: HTMLDivElement = Div({
    className: 'container modal-container',
  });

  const filenames: string[] = files.map((file: File): string => file.name);

  const header: HTMLHeadingElement = Header({
    lvl: 2,
    text: 'Uploaded file names:',
  });

  const buttons: HTMLDivElement = Div({
    className: 'buttons',
  });
  // todo add delete input action
  const inputs: HTMLInputElement[] = filenames.map((filename: string) =>
    Input({
      type: 'text',
      value: filename,
    })
  );
  const wrappedInputs: HTMLDivElement[] = inputs.map(
    (input: HTMLInputElement): HTMLDivElement => {
      const wrapper: HTMLDivElement = Div({
        className: 'input-wrapper',
      });
      wrapper.appendChild(input);
      return wrapper;
    },
  );
  buttons.append(
    Div({
      className: 'btn',
      text: 'Upload',
      onClick: () =>
        onSubmit(
          inputs,
        ),
    }),
    Div({
      className: 'btn',
      text: 'Cancel',
      onClick: () => modal.hideModal(),
    }),
  );
  container.append(header, ...wrappedInputs, buttons);
  inputs[0].focus();
  inputs.forEach((input: HTMLInputElement): void => {
    input.addEventListener('keypress', (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        onSubmit(
          inputs,
        );
      }
    });
  });
  return container;
}

function renameFileModal(
  filename: string,
  onSubmit: (inputs: HTMLInputElement, originFilename: string) => void,
): HTMLDivElement {
  const container: HTMLDivElement = Div({
    className: 'container modal-container',
  });

  const header: HTMLHeadingElement = Header({
    lvl: 2,
    text: 'Rename file:',
  });

  const buttons: HTMLDivElement = Div({
    className: 'buttons',
  });
  const input: HTMLInputElement = Input({
    type: 'text',
    value: filename,
  });
  const wrappedInput: HTMLDivElement = Div({
    className: 'input-wrapper',
  });
  wrappedInput.appendChild(input);

  buttons.append(
    Div({
      className: 'btn',
      text: 'Rename',
      onClick: () =>
        onSubmit(
          input,
          filename.trim(),
        ),
    }),
    Div({
      className: 'btn',
      text: 'Cancel',
      onClick: () => modal.hideModal(),
    }),
  );
  container.append(header, wrappedInput, buttons);
  input.focus();
  input.addEventListener('keypress', (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      onSubmit(
        input,
        filename.trim(),
      );
    }
  });
  return container;
}

async function uploadFile(
  file: FormDataEntryValue,
  input: HTMLInputElement,
): Promise<void> {
  if (input.disabled) return;
  const formData: FormData = new FormData();
  formData.append('file', file);

  const progress = Paragraph({
    text: '0%',
  });
  input.after(progress);

  try {
    await new Promise<void>((resolve, reject): void => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open('POST', '/');
      xhr.upload.onprogress = (event: ProgressEvent<EventTarget>): void => {
        if (event.lengthComputable) {
          const percent: number = (event.loaded / event.total) * 100;
          progress.innerText = Math.round(percent) + '%';
        }
      };
      xhr.onload = (): void => {
        progress.remove();
        if (xhr.status >= 200 && xhr.status < 300) {
          input.disabled = true;
          resolve();
        } else {
          const { status, message }: ApiError = JSON.parse(xhr.responseText);
          console.warn(API_ERROR_$(status, message));
          snackbar.displayMsg(message);
          reject(new Error(message));
        }
      };
      xhr.onerror = (): void => {
        progress.remove();
        snackbar.displayMsg(UPLOAD_ERROR);
        reject(new Error(UPLOAD_ERROR));
      };
      xhr.send(formData);
    });
  } catch (error) {
    console.error(error);
  }
}

async function renameFile(
  oldValue: string,
  newValue: string,
): Promise<void> {
  const res: Response = await fetch(`/${oldValue}`, {
    method: 'PUT',
    body: JSON.stringify({ name: newValue }),
  });
  if (res.ok) {
    snackbar.displayMsg(FILE_RENAMED);
    modal.hideModal();
    updateHeader();
  } else {
    const { status, message }: ApiError = await res
      .json();
    snackbar.displayMsg(API_ERROR_$(status, message));
  }
}

function onRenameSubmit(oldValue: string) {
  return (input: HTMLInputElement): void => {
    const newValue: string = input.value.trim();
    const error: string | undefined = validateFilename(newValue);
    if (error) {
      showInputError(input, error);
      return;
    } else {
      hideInputError(input);
    }
    if (newValue.toLocaleLowerCase() === oldValue.toLocaleLowerCase()) {
      showInputError(input, NAME_WAS_NOT_CHANGED);
      return;
    }
    renameFile(oldValue, newValue);
  };
}

function onUploadSubmit(files: File[]) {
  return async (inputs: HTMLInputElement[]): Promise<void> => {
    const filenames: string[] = inputs.map((input: HTMLInputElement): string =>
      input.value.trim()
    );
    const errors: (string | undefined)[] = filenames.map((
      newFilename: string,
    ) => validateFilename(newFilename));
    if (errors.some((err: string | undefined): boolean => !!err)) {
      inputs.forEach((input: HTMLInputElement, idx: number): void => {
        if (errors[idx]) {
          showInputError(input, errors[idx] as string);
        } else {
          hideInputError(input);
        }
      });
      return;
    }
    await Promise.all(
      files.map((file: File, idx: number): Promise<void> =>
        uploadFile(
          file.name === filenames[idx]
            ? file
            : new File([file], filenames[idx], { type: file.type }),
          inputs[idx],
        )
      ),
    );
    if (inputs.every((input: HTMLInputElement): boolean => input.disabled)) {
      snackbar.displayMsg(
        files.length > 1 ? FILES_UPLOADED : FILE_UPLOADED,
      );
      modal.hideModal();
    }

    updateHeader();
  };
}

export function askForUpload(files: File[]): void {
  const bigFiles: File[] = files.filter((file: File): boolean =>
    file.size > MAX_FILE_SIZE
  );
  if (bigFiles.length) {
    snackbar.displayMsg(
      FILES_TOO_BIG(bigFiles.map((file: File): string => file.name).join(', ')),
    );
    return;
  }

  modal.showModal(uploadFilesModal(files, onUploadSubmit(files)));
}

export async function deleteFile(e: Event, filename: string): Promise<void> {
  e.preventDefault();
  const res: Response = await fetch(`/${filename}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const { status, message }: ApiError = await res
      .json();
    snackbar.displayMsg(API_ERROR_$(status, message));
  } else {
    snackbar.displayMsg(FILE_DELETED);
  }
  updateHeader();
}

export function handleRenameFile(e: Event, filename: string): void {
  e.preventDefault();

  modal.showModal(renameFileModal(filename, onRenameSubmit(filename)));
}
