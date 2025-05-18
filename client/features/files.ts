import { InputModalProps } from '../types.ts';
import { Div, Header } from '../components.ts';
import modal from './modal.ts';
import snackbar from './snackbar.ts';
import { updateHeader } from './header.ts';

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
  const input: HTMLInputElement = document.createElement('input');
  input.type = 'text';
  input.value = filename;
  buttons.append(
    Div({
      className: 'btn',
      text: submitText,
      onClick: () => onSubmit(input.value, filename),
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
    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/');
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent: number = (event.loaded / event.total) * 100;
          bar.style.width = percent + '%';
        }
      };
      xhr.onload = () => {
        progressBar.style.display = 'none';
        if (xhr.status >= 200 && xhr.status < 300) {
          snackbar.displayMsg('File uploaded successfully.');
          modal.hideModal();
          resolve();
        } else {
          const { status, message } = JSON.parse(xhr.responseText);
          console.warn(`Error with status ${status} and message ${message}`);
          snackbar.displayMsg(message);
          reject(new Error(message));
        }
      };
      xhr.onerror = () => {
        progressBar.style.display = 'none';
        snackbar.displayMsg('Error while uploading file.');
        reject(new Error('Upload failed'));
      };
      xhr.send(formData);
    });
  } catch (error) {
    console.error(error);
  }
}

export function askForUpload(file: File): void {
  if (file.size > 1024 * 1024 * 1024) {
    snackbar.displayMsg('File size exceeds 1GB');
    return;
  }
  const onSubmit = async (newFilename: string): Promise<void> => {
    const fileToUpload: File = file.name === newFilename
      ? file
      : new File([file], newFilename, { type: file.type });
    await uploadFile(fileToUpload);
    updateHeader();
  };
  modal.showModal(uploadFileModal(file.name, onSubmit));
}

async function renameFile(newValue: string, oldValue: string): Promise<void> {
  if (!newValue.trim()) {
    snackbar.displayMsg('Provide file name');
    return;
  }
  if (newValue.trim().toLocaleLowerCase() === oldValue.toLocaleLowerCase()) {
    snackbar.displayMsg("Name wasn't change");
    return;
  }
  const res: Response = await fetch(`/${oldValue}`, {
    method: 'PUT',
    body: JSON.stringify({ name: newValue }),
  });
  if (res.ok) {
    snackbar.displayMsg('File renamed');
    modal.hideModal();
    updateHeader();
  } else {
    const { status, message }: { status: number; message: string } = await res
      .json();
    snackbar.displayMsg(`Error with status ${status} and message ${message}`);
  }
}

export async function deleteFile(e: Event, file: string): Promise<void> {
  e.preventDefault();
  const res: Response = await fetch(`/${file}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const { status, message }: { status: number; message: string } = await res
      .json();
    snackbar.displayMsg(`Error with status ${status} and message ${message}`);
  } else {
    snackbar.displayMsg('File deleted');
  }
  updateHeader();
}

export function handleRenameFile(e: Event, file: string): void {
  e.preventDefault();

  modal.showModal(renameFileModal(file, renameFile));
}
