import { MAX_FILE_SIZE } from '../constants/index.ts';
import {
  FILE_DELETED,
  FILE_RENAMED,
  FILE_UPLOADED,
  FILES_DELETED,
  FILES_UPLOADED,
} from '../constants/messages.ts';
import {
  API_ERROR_$,
  FILES_TOO_BIG,
  NAME_WAS_NOT_CHANGED,
  NO_FILES_SELECTED,
  NO_FILES_TO_UPLOAD,
  UPLOAD_ERROR,
} from '../constants/errors.ts';
import { Link, Paragraph } from '../components.ts';
import modal from './modal.ts';
import snackbar from './snackbar.ts';
import { reloadPage } from './api.ts';
import uploadFilesModal from '../modals/upload-files-modal.ts';
import renameFileModal from '../modals/rename-file-modal.ts';
import { getSelectedFiles } from '../state/files.ts';
import {
  hideInputError,
  showInputError,
  validateFilename,
} from '../helpers.ts';

import type { ApiError } from '../types.ts';

type FileListItem = {
  name: string;
  input: HTMLInputElement;
  file: File;
  error?: string;
};

const download = (blob: Blob, filename: string): void => {
  const url: string = globalThis.URL.createObjectURL(blob);
  const a: HTMLAnchorElement = Link({
    href: url,
    download: filename,
  });
  document.body.appendChild(a);
  a.click();
  a.remove();
  globalThis.URL.revokeObjectURL(url);
};

const uploadFile = async (
  file: FormDataEntryValue,
  input: HTMLInputElement,
): Promise<void> => {
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
      xhr.upload.onprogress = (event: ProgressEvent): void => {
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
        snackbar.displayMsg(UPLOAD_ERROR());
        reject(new Error(UPLOAD_ERROR()));
      };
      xhr.send(formData);
    });
    // @ts-ignore-next-line
  } catch (error: Error) {
    showInputError(input, error.message);
    console.error(error);
  }
};

const renameFile = async (
  oldValue: string,
  newValue: string,
): Promise<void> => {
  const res: Response = await fetch(`/${oldValue}`, {
    method: 'PUT',
    body: JSON.stringify({ name: newValue }),
  });
  if (res.ok) {
    snackbar.displayMsg(FILE_RENAMED());
    modal.hideModal();
    reloadPage();
  } else {
    const { status, message }: ApiError = await res
      .json();
    snackbar.displayMsg(API_ERROR_$(status, message));
  }
};

const downloadFiles = async (filenames: string[]): Promise<void> => {
  const queryParams: string = new URLSearchParams({
    file: filenames.join(','),
  }).toString();
  const res: Response = await fetch(`/files?${queryParams}`, {
    method: 'GET',
  });
  if (res.ok) {
    const blob: Blob = await res.blob();
    download(blob, 'files.zip');
    reloadPage();
  } else {
    const { status, message }: ApiError = await res
      .json();
    snackbar.displayMsg(API_ERROR_$(status, message));
  }
};

export const deleteFiles = async (filenames: string[]): Promise<void> => {
  const queryParams: string = new URLSearchParams({
    file: filenames.join(','),
  }).toString();
  const res: Response = await fetch(`/?${queryParams}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    snackbar.displayMsg(
      filenames.length === 1 ? FILE_DELETED() : FILES_DELETED(),
    );
  } else {
    const { status, message }: ApiError = await res
      .json();
    snackbar.displayMsg(API_ERROR_$(status, message));
  }
  reloadPage();
};

const onRenameSubmit =
  (oldValue: string) => (input: HTMLInputElement): void => {
    const newValue: string = input.value.trim();
    const error: string | undefined = validateFilename(newValue);
    if (error) {
      showInputError(input, error);
      return;
    } else {
      hideInputError(input);
    }
    if (newValue.toLocaleLowerCase() === oldValue.toLocaleLowerCase()) {
      showInputError(input, NAME_WAS_NOT_CHANGED());
      return;
    }
    renameFile(oldValue, newValue);
  };

const onUploadSubmit =
  (files: File[]) => async (inputs: HTMLInputElement[]): Promise<void> => {
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
      snackbar.displayMsg(NO_FILES_TO_UPLOAD());
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
        files.length > 1 ? FILES_UPLOADED() : FILE_UPLOADED(),
      );
      modal.hideModal();
    }

    reloadPage();
  };

export const downloadFile = async (file: string): Promise<void> => {
  const res: Response = await fetch(`/files/${file}`, {
    method: 'GET',
  });
  if (res.ok) {
    const blob: Blob = await res.blob();
    download(blob, file);
    reloadPage();
  } else {
    const { status, message }: ApiError = await res
      .json();
    snackbar.displayMsg(API_ERROR_$(status, message));
  }
};

export const handleFilesDownload = (): void => {
  const selectedFiles: string[] = getSelectedFiles();
  if (!selectedFiles.length) {
    snackbar.displayMsg(NO_FILES_SELECTED());
    return;
  }

  downloadFiles(selectedFiles);
};

export const handleFilesUpload = (files: File[]): void => {
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
};

export const handleRenameFile = (filename: string): void => {
  modal.showModal(renameFileModal(filename, onRenameSubmit(filename)));
};

export const handleDeleteFiles = async (): Promise<void> => {
  const filenames: string[] = getSelectedFiles();
  if (!filenames.length) {
    snackbar.displayMsg(NO_FILES_SELECTED());
    return;
  }
  await deleteFiles(filenames);
};
