import modal from './modal.ts';
import { renderLanguageDropdown } from './language.ts';
import helpModal from '../modals/help-modal.ts';
import QRModal from '../modals/qr-modal.ts';
import { clearNote, copyNote, saveNote } from './notes.ts';
import { handleDeleteFiles, handleFilesDownload } from './files.ts';

function initMainHeaderActions(): void {
  const languageAction: HTMLDivElement = document.getElementById<
    HTMLDivElement
  >(
    'language',
  );
  languageAction.addEventListener('click', () => {
    renderLanguageDropdown(languageAction);
  });

  const qrAction: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'qr',
  );
  qrAction.addEventListener('click', () => {
    modal.showModal(QRModal());
  });

  const helpAction: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'help',
  );
  helpAction.addEventListener('click', () => {
    modal.showModal(helpModal());
  });
}

function initFilesHeaderActions(): void {
  const uploadFiles: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'upload-files',
  );
  uploadFiles.addEventListener('click', (): void => {
    const fileInput: HTMLInputElement = document.getElementById<
      HTMLInputElement
    >(
      'file-upload',
    );
    fileInput.click();
  });

  const downloadFiles: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'download-files',
  );
  downloadFiles.addEventListener('click', handleFilesDownload);

  const deleteFilesBtn: HTMLDivElement = document.getElementById<
    HTMLDivElement
  >(
    'delete-files',
  );
  deleteFilesBtn.addEventListener('click', handleDeleteFiles);
}

function initNoteHeaderActions(): void {
  const saveAction: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'save-as-file',
  );
  saveAction.addEventListener('click', saveNote);

  const copyText: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'copy-text',
  );
  copyText.addEventListener('click', copyNote);

  const clearText: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'clear-text',
  );
  clearText.addEventListener('click', clearNote);
}

export default (): void => {
  initMainHeaderActions();
  initFilesHeaderActions();
  initNoteHeaderActions();
};
