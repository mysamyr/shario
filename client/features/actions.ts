import modal from './modal.ts';
import { renderLanguageDropdown } from './language.ts';
import { renderThemeDropdown } from './theme.ts';
import helpModal from '../modals/help-modal.ts';
import QRModal from '../modals/qr-modal.ts';
import { clearNote, copyNote, saveNote } from './notes.ts';
import { handleDeleteFiles, handleFilesDownload } from './files.ts';

const initMainHeaderActions = (): void => {
  const languageAction = document.getElementById(
    'language',
  ) as HTMLDivElement;
  languageAction.addEventListener('click', () => {
    renderLanguageDropdown(languageAction);
  });

  const themeAction = document.getElementById(
    'theme',
  ) as HTMLDivElement;
  themeAction.addEventListener('click', () => {
    renderThemeDropdown(themeAction);
  });

  const qrAction = document.getElementById(
    'qr',
  ) as HTMLDivElement;
  qrAction.addEventListener('click', () => {
    modal.showModal(QRModal());
  });

  const helpAction = document.getElementById(
    'help',
  ) as HTMLDivElement;
  helpAction.addEventListener('click', () => {
    modal.showModal(helpModal());
  });
};

const initFilesHeaderActions = (): void => {
  const uploadFiles = document.getElementById(
    'upload-files',
  ) as HTMLDivElement;
  uploadFiles.addEventListener('click', (): void => {
    const fileInput = document.getElementById(
      'file-upload',
    ) as HTMLInputElement;
    fileInput.click();
  });

  const downloadFiles = document.getElementById(
    'download-files',
  ) as HTMLDivElement;
  downloadFiles.addEventListener('click', handleFilesDownload);

  const deleteFilesBtn = document.getElementById(
    'delete-files',
  ) as HTMLDivElement;
  deleteFilesBtn.addEventListener('click', handleDeleteFiles);
};

const initNoteHeaderActions = (): void => {
  const saveAction = document.getElementById(
    'save-as-file',
  ) as HTMLDivElement;
  saveAction.addEventListener('click', saveNote);

  const copyText = document.getElementById(
    'copy-text',
  ) as HTMLDivElement;
  copyText.addEventListener('click', copyNote);

  const clearText = document.getElementById(
    'clear-text',
  ) as HTMLDivElement;
  clearText.addEventListener('click', clearNote);
};

export default (): void => {
  initMainHeaderActions();
  initFilesHeaderActions();
  initNoteHeaderActions();
};
