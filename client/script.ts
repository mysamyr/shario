import snackbar from './features/snackbar.ts';
import { updateHeader } from './features/header.ts';
import { getText } from './features/text.ts';
import { askForUpload } from './features/files.ts';
import { API_ERROR_$ } from './constants/errors.ts';
import { ApiError } from './types.ts';

const uploadFileInput: HTMLInputElement = document.getElementById(
  'file-upload',
) as HTMLInputElement;
const copyTextBtn: HTMLParagraphElement = document.getElementById(
  'copy-text',
) as HTMLParagraphElement;
const textarea: HTMLTextAreaElement = document.querySelector(
  'textarea',
) as HTMLTextAreaElement;

async function uploadText(value: string): Promise<void> {
  const formData = new FormData();
  formData.append('text', value.trim());

  try {
    const res: Response = await fetch('/', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const { status, message }: ApiError = await res
        .json();
      snackbar.displayMsg(API_ERROR_$(status, message));
    }
  } catch (error) {
    console.error(error);
  }

  updateHeader();
}

function handleUploadBySelect(): void {
  const files: FileList = uploadFileInput.files as FileList;
  if (files[0]) {
    askForUpload(Array.from(files));

    uploadFileInput.value = '';
  }
}

async function handleUploadByPaste(e: ClipboardEvent): Promise<void> {
  e.stopPropagation();
  e.preventDefault();

  const clipboardData: DataTransfer = e.clipboardData as DataTransfer;

  if (clipboardData.files.length) {
    askForUpload(Array.from(clipboardData.files));
  } else {
    const pastedData = clipboardData.getData('text');
    if (getText() !== pastedData) await uploadText(pastedData);
  }
}

function initTextarea(): void {
  textarea.addEventListener('input', function (): void {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight > 240
      ? '244px'
      : textarea.scrollHeight + 4 + 'px'; // + borders
  });

  textarea.addEventListener('focusout', async function (): Promise<void> {
    if (getText() !== textarea.value) await uploadText(textarea.value);
  });

  copyTextBtn.addEventListener(
    'click',
    async (): Promise<void> => {
      textarea.focus();
      textarea.select();
      await navigator.clipboard.writeText(textarea.value);
    },
  );
}

function initDragAndDrop(): void {
  const uploadButton: HTMLLabelElement = document.querySelector(
    '.file-upload-label',
  ) as HTMLLabelElement;
  const dragOverlay: HTMLDivElement = document.getElementById(
    'overlay',
  ) as HTMLDivElement;
  let dragCounter: number = 0;

  document.addEventListener('dragenter', (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    uploadButton.innerText = 'Release to upload';
    dragOverlay.style.display = 'block';
    uploadButton.classList.add('upload-label-drag');
  });

  document.addEventListener('dragover', (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  });
  document.addEventListener('dragleave', (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;
    if (dragCounter === 0) {
      uploadButton.innerText = 'Select File';
      uploadButton.classList.remove('upload-label-drag');
      dragOverlay.style.display = 'none';
    }
  });

  document.addEventListener('drop', async (e: DragEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    uploadButton.innerText = 'Select File';
    uploadButton.classList.remove('upload-label-drag');
    dragOverlay.style.display = 'none';

    const dragData: DataTransfer = e.dataTransfer as DataTransfer;

    if (dragData.files.length) {
      askForUpload(Array.from(dragData.files));
    } else {
      const pastedData = dragData.getData('text');
      if (getText() !== pastedData) await uploadText(pastedData);
    }
  });
}

uploadFileInput.addEventListener(
  'change',
  handleUploadBySelect,
);

globalThis.addEventListener('paste', handleUploadByPaste);

initTextarea();

initDragAndDrop();

updateHeader();
