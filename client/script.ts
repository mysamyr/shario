import modal from './features/modal.ts';
import { getText } from './state/text.ts';
import { handleFilesUpload } from './features/files.ts';
import { applyLanguage } from './features/language.ts';
import { initNotes, uploadText } from './features/notes.ts';
import initActions from './features/actions.ts';
import { reloadPage } from './features/api.ts';
import { initTable } from './features/table.ts';

function initDragAndDrop(): void {
  const dragOverlay: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'overlay',
  );
  let dragCounter: number = 0;

  document.addEventListener('dragenter', (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (modal.isModalOpen()) return;
    dragCounter++;
    dragOverlay.style.display = 'block';
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
      dragOverlay.style.display = 'none';
    }
  });

  document.addEventListener('drop', async (e: DragEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    if (modal.isModalOpen()) return;
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

function initGlobalPaste(): void {
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

  globalThis.addEventListener('paste', handleUploadByPaste);
}

function initFileSelect(): void {
  const uploadFileInput: HTMLInputElement = document.getElementById<
    HTMLInputElement
  >(
    'file-upload',
  );

  function handleUploadBySelect(): void {
    const files: FileList = uploadFileInput.files as FileList;
    if (files[0]) {
      handleFilesUpload(Array.from(files));

      uploadFileInput.value = '';
    }
  }

  uploadFileInput.addEventListener(
    'change',
    handleUploadBySelect,
  );
}

initActions();
initTable();
initNotes();
initFileSelect();
initDragAndDrop();
initGlobalPaste();
applyLanguage();

reloadPage();
