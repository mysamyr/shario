import { ApiError, FileListItem } from '../types.ts';
import { Paragraph } from '../components.ts';
import modal from './modal.ts';
import snackbar from './snackbar.ts';
import { updateHeader } from './header.ts';
import { validateFilename } from '../helpers.ts';
import {
  API_ERROR_$,
  FILES_TOO_BIG,
  NAME_WAS_NOT_CHANGED,
  NO_FILES_TO_CLEAR,
  NO_FILES_TO_UPLOAD,
  UPLOAD_ERROR,
} from '../constants/errors.ts';
import {
  FILE_DELETED,
  FILE_RENAMED,
  FILE_UPLOADED,
  FILES_DELETED,
  FILES_UPLOADED,
} from '../constants/messages.ts';
import { MAX_FILE_SIZE } from '../constants/index.ts';
import uploadFilesModal, {
  hideInputError,
  showInputError,
} from '../modals/upload-files-modal.ts';
import renameFileModal from '../modals/rename-file-modal.ts';
import clearAllFilesModal from '../modals/clear-files-modal.ts';

async function uploadFile(
  file: FormDataEntryValue,
  input: HTMLInputElement,
): Promise<void> {
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
    // @ts-ignore-next-line
  } catch (error: Error) {
    showInputError(input, error.message);
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

async function clearFiles(e: Event): Promise<void> {
  e.preventDefault();
  const res: Response = await fetch('/', {
    method: 'DELETE',
  });
  if (!res.ok) {
    const { status, message }: ApiError = await res
      .json();
    snackbar.displayMsg(API_ERROR_$(status, message));
    modal.hideModal();
  } else {
    snackbar.displayMsg(FILES_DELETED);
  }
  updateHeader();
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
    const fileList: FileListItem[] = inputs.map(
      (input: HTMLInputElement, idx: number): FileListItem => {
        const name: string = input.value.trim();
        return {
          name,
          input,
          file: files[idx],
          error: validateFilename(name),
        };
      },
    );

    const filesToUpload: FileListItem[] = fileList.filter(
      ({ error, input }: FileListItem): boolean => {
        if (error) {
          showInputError(input, error);
        } else {
          hideInputError(input);
        }
        return !error && !input.disabled;
      },
    );

    if (!filesToUpload.length) {
      snackbar.displayMsg(NO_FILES_TO_UPLOAD);
      return;
    }

    await Promise.all(
      filesToUpload.map(({ input, file, name }: FileListItem): Promise<void> =>
        uploadFile(
          new File([file], name, { type: file.type }),
          input,
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

export function handleFilesUpload(files: File[]): void {
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

export function handleRenameFile(e: Event, filename: string): void {
  e.preventDefault();

  modal.showModal(renameFileModal(filename, onRenameSubmit(filename)));
}

export function handleClearAllFiles(): void {
  if (!document.querySelector('.file')) {
    snackbar.displayMsg(NO_FILES_TO_CLEAR);
    return;
  }
  modal.showModal(clearAllFilesModal(clearFiles));
}
