import modal from './features/modal.ts';
import { getText } from './state/text.ts';
import { handleFilesUpload } from './features/files.ts';
import { applyLanguage } from './features/language.ts';
import { initTheme } from './features/theme.ts';
import { initNotes, updateNote } from './features/notes.ts';
import initActions from './features/actions.ts';
import { initWs } from './features/ws.ts';
import { initTable } from './features/table.ts';
import { initView } from './features/view.ts';

const initDragAndDrop = (): void => {
  const dragOverlay = document.getElementById(
    'overlay',
  ) as HTMLDivElement;
  let dragCounter = 0;

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

    const dragData = e.dataTransfer!;

    if (dragData.files.length) {
      handleFilesUpload(Array.from(dragData.files));
    } else {
      const pastedData = dragData.getData('text');
      if (getText() !== pastedData) await updateNote(pastedData);
    }
  });
};

const initGlobalPaste = (): void => {
  const handleUploadByPaste = async (e: ClipboardEvent): Promise<void> => {
    if (modal.isModalOpen()) return;
    const clipboardData = e.clipboardData!;

    if (clipboardData.files.length) {
      handleFilesUpload(Array.from(clipboardData.files));
    } else {
      const pastedData = clipboardData.getData('text');
      if (
        document.activeElement?.tagName === 'BODY' &&
        getText() !== pastedData
      ) await updateNote(pastedData);
    }
  };

  globalThis.addEventListener('paste', handleUploadByPaste);
};

const initFileSelect = (): void => {
  const uploadFileInput = document.getElementById(
    'file-upload',
  ) as HTMLInputElement;

  const handleUploadBySelect = (): void => {
    const files = uploadFileInput.files!;
    if (files[0]) {
      handleFilesUpload(Array.from(files));

      uploadFileInput.value = '';
    }
  };

  uploadFileInput.addEventListener(
    'change',
    handleUploadBySelect,
  );
};

initActions();
initTheme();
initTable();
initNotes();
initFileSelect();
initDragAndDrop();
initGlobalPaste();
applyLanguage();
initView();

initWs();
