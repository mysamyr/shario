import { ApiError, InputModalProps } from '../types.ts';
import { Div, Header, Input } from '../components.ts';
import modal from './modal.ts';
import snackbar from './snackbar.ts';
import { updateHeader } from './header.ts';
import { validateFilename } from '../helpers.ts';
import {
  API_ERROR_$,
  FILE_TOO_BIG,
  NAME_WAS_NOT_CHANGED,
  UPLOAD_ERROR,
} from '../constants/errors.ts';
import {
  FILE_DELETED,
  FILE_RENAMED,
  FILE_UPLOADED,
} from '../constants/messages.ts';
import { MAX_FILE_SIZE } from '../constants/index.ts';

function inputModal({
  headerText,
  submitText,
  filename,
  onSubmit,
}: InputModalProps): HTMLDivElement {
  const container: HTMLDivElement = Div({
    className: 'container modal-container',
  });

  const header: HTMLHeadingElement = Header({
    lvl: 2,
    text: headerText,
  });

  const buttons: HTMLDivElement = Div({
    className: 'buttons',
  });
  const input: HTMLInputElement = Input({
    type: 'text',
    value: filename,
  });
  buttons.append(
    Div({
      className: 'btn',
      text: submitText,
      onClick: () => onSubmit(input.value, filename.trim()),
    }),
    Div({
      className: 'btn',
      text: 'Cancel',
      onClick: () => modal.hideModal(),
    }),
  );
  container.append(header, input, buttons);
  input.focus();
  input.addEventListener('keypress', (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      onSubmit(input.value, filename);
    }
  });
  return container;
}

function uploadFileModal(
  filename: string,
  onSubmit: (param1: string) => void,
): HTMLDivElement {
  return inputModal({
    headerText: "Uploaded file's name:",
    submitText: 'Upload',
    filename,
    onSubmit,
  });
}

function renameFileModal(
  filename: string,
  onSubmit: (param1: string, param2: string) => void,
): HTMLDivElement {
  return inputModal({
    headerText: 'Rename file:',
    submitText: 'Rename',
    filename,
    onSubmit,
  });
}

async function uploadFile(file: FormDataEntryValue): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);

  const progressBar = document.getElementById(
    'upload-progress',
  ) as HTMLDivElement;
  const bar = document.getElementById('upload-bar') as HTMLDivElement;

  progressBar.style.display = 'block';
  bar.style.width = '0';

  try {
    await new Promise<void>((resolve, reject): void => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open('POST', '/');
      xhr.upload.onprogress = (event: ProgressEvent<EventTarget>): void => {
        if (event.lengthComputable) {
          const percent: number = (event.loaded / event.total) * 100;
          bar.style.width = percent + '%';
        }
      };
      xhr.onload = (): void => {
        progressBar.style.display = 'none';
        if (xhr.status >= 200 && xhr.status < 300) {
          snackbar.displayMsg(FILE_UPLOADED);
          modal.hideModal();
          resolve();
        } else {
          const { status, message }: ApiError = JSON.parse(xhr.responseText);
          console.warn(API_ERROR_$(status, message));
          snackbar.displayMsg(message);
          reject(new Error(message));
        }
      };
      xhr.onerror = (): void => {
        progressBar.style.display = 'none';
        snackbar.displayMsg(UPLOAD_ERROR);
        reject(new Error(UPLOAD_ERROR));
      };
      xhr.send(formData);
    });
  } catch (error) {
    console.error(error);
  }
}

export function askForUpload(file: File): void {
  if (file.size > MAX_FILE_SIZE) {
    snackbar.displayMsg(FILE_TOO_BIG);
    return;
  }
  const onSubmit = async (newFilename: string): Promise<void> => {
    const error: string | undefined = validateFilename(newFilename);
    if (error) {
      snackbar.displayMsg(error);
      return;
    }
    const fileToUpload: File = file.name === newFilename
      ? file
      : new File([file], newFilename, { type: file.type });
    await uploadFile(fileToUpload);
    updateHeader();
  };
  modal.showModal(uploadFileModal(file.name, onSubmit));
}

async function renameFile(newValue: string, oldValue: string): Promise<void> {
  const error: string | undefined = validateFilename(newValue);
  if (error) {
    snackbar.displayMsg(error);
    return;
  }
  if (newValue.toLocaleLowerCase() === oldValue.toLocaleLowerCase()) {
    snackbar.displayMsg(NAME_WAS_NOT_CHANGED);
    return;
  }
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

export async function deleteFile(e: Event, file: string): Promise<void> {
  e.preventDefault();
  const res: Response = await fetch(`/${file}`, {
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

export function handleRenameFile(e: Event, file: string): void {
  e.preventDefault();

  modal.showModal(renameFileModal(file, renameFile));
}
