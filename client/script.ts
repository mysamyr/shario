import snackbar from './features/snackbar.ts';
import modal from './features/modal.ts';
import { updateHeader } from './features/header.ts';
import { getText, setText } from './features/text.ts';
import { handleClearAllFiles, handleFilesUpload } from './features/files.ts';
import { API_ERROR_$ } from './constants/errors.ts';
import { ApiError, Language } from './types.ts';
import {
  applyLanguage,
  getLanguage,
  setLanguage,
  translations,
} from './features/language.ts';
import { LANGUAGES_CONFIG } from './constants/index.ts';
import { Paragraph } from './components.ts';

const uploadFileInput: HTMLInputElement = document.getElementById(
  'file-upload',
) as HTMLInputElement;

async function uploadText(value: string): Promise<void> {
  try {
    const res: Response = await fetch('/text', {
      method: 'PUT',
      body: value,
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
    handleFilesUpload(Array.from(files));

    uploadFileInput.value = '';
  }
}

async function handleUploadByPaste(e: ClipboardEvent): Promise<void> {
  if (modal.isModalOpen()) return;
  const clipboardData: DataTransfer = e.clipboardData as DataTransfer;

  if (clipboardData.files.length) {
    handleFilesUpload(Array.from(clipboardData.files));
  } else {
    const pastedData: string = clipboardData.getData('text');
    if (
      document.activeElement?.tagName === 'BODY' &&
      getText() !== pastedData
    ) await uploadText(pastedData);
  }
}

function initTextarea(): void {
  const textarea: HTMLTextAreaElement = document.getElementById(
    'share-text',
  ) as HTMLTextAreaElement;
  const clearTextBtn: HTMLParagraphElement = document.getElementById(
    'clear-text',
  ) as HTMLParagraphElement;
  const copyTextBtn: HTMLParagraphElement = document.getElementById(
    'copy-text',
  ) as HTMLParagraphElement;
  const clearFilesBtn: HTMLParagraphElement = document.getElementById(
    'clear-files',
  ) as HTMLParagraphElement;

  textarea.addEventListener('input', function (): void {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight > 240
      ? '244px'
      : textarea.scrollHeight + 4 + 'px'; // + borders
  });

  textarea.addEventListener('focusout', async function (): Promise<void> {
    if (getText() !== textarea.value) await uploadText(textarea.value);
  });

  clearTextBtn.addEventListener(
    'click',
    async (): Promise<void> => {
      if (getText() !== '') {
        await uploadText('');
        setText('');
        textarea.value = '';
      }
    },
  );

  copyTextBtn.addEventListener(
    'click',
    async (): Promise<void> => {
      if (getText() !== '') {
        textarea.focus();
        textarea.select();
        await navigator.clipboard.writeText(textarea.value);
      }
    },
  );

  clearFilesBtn.addEventListener(
    'click',
    handleClearAllFiles,
  );
}

function initDragAndDrop(): void {
  const uploadButton: HTMLLabelElement = document.getElementById(
    'file-upload-label',
  ) as HTMLLabelElement;
  const dragOverlay: HTMLDivElement = document.getElementById(
    'overlay',
  ) as HTMLDivElement;
  let dragCounter: number = 0;

  document.addEventListener('dragenter', (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (modal.isModalOpen()) return;
    dragCounter++;
    uploadButton.innerText = translations[getLanguage()].releaseToUpload;
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
      uploadButton.innerText = translations[getLanguage()].uploadBtn;
      uploadButton.classList.remove('upload-label-drag');
      dragOverlay.style.display = 'none';
    }
  });

  document.addEventListener('drop', async (e: DragEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    if (modal.isModalOpen()) return;
    uploadButton.innerText = translations[getLanguage()].uploadBtn;
    uploadButton.classList.remove('upload-label-drag');
    dragOverlay.style.display = 'none';

    const dragData: DataTransfer = e.dataTransfer as DataTransfer;

    if (dragData.files.length) {
      handleFilesUpload(Array.from(dragData.files));
    } else {
      const pastedData = dragData.getData('text');
      if (getText() !== pastedData) await uploadText(pastedData);
    }
  });
}

function initLanguage(): void {
  const languageContainer: HTMLDivElement = document.getElementById(
    'language',
  ) as HTMLDivElement;
  languageContainer.innerHTML = '';
  LANGUAGES_CONFIG.forEach((language: Language): void => {
    const isActive: boolean = language.code === getLanguage();
    const languageBtn: HTMLParagraphElement = Paragraph({
      className: `language-btn ${isActive ? '' : 'active'}`,
      text: language.name,
      onClick: () => {
        if (isActive) return;
        setLanguage(language.code);
        applyLanguage(language.code);
        initLanguage();
      },
    });
    languageContainer.appendChild(languageBtn);
  });
}

uploadFileInput.addEventListener(
  'change',
  handleUploadBySelect,
);

globalThis.addEventListener('paste', handleUploadByPaste);

initTextarea();

initDragAndDrop();

applyLanguage();

initLanguage();

updateHeader();
