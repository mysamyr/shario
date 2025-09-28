import { Translation } from '../types.ts';

type Translations = {
  [lang: string]: Translation;
};

export const translations: Translations = {
  en: {
    mainTitle: 'LAN File Sharing',
    uploadBtnTitle: 'Upload files:',
    uploadBtn: 'Select Files',
    sharedTextTitle: 'Shared text:',
    sharedTextPlaceholder: 'Write something here to share',
    filesTitle: 'Files:',
    releaseToUpload: 'Release to upload',
    noFilesUploaded: 'No files uploaded yet',
    titles: {
      upload: 'Upload file from disk',
      clearText: 'Clear textarea content',
      copyText: 'Copy textarea content',
      clearFiles: 'Clear all files',
      openFile: 'Open file',
      downloadFile: 'Download file',
      renameFile: 'Rename file',
      deleteFile: 'Delete file',
    },
    messages: {
      fileUploaded: 'File uploaded successfully.',
      filesUploaded: 'Files uploaded successfully.',
      fileRenamed: 'File renamed successfully.',
      fileDeleted: 'File deleted successfully.',
      filesDeleted: 'Files cleared successfully.',
    },
    errorMessages: {
      noFilenameProvided: 'No filename provided',
      filenameSlashes: 'Filename cannot contain slashes',
      filenameBackslashes: 'Filename cannot contain backslashes',
      filenameColons: 'Filename cannot contain colons',
      filenameAsterisks: 'Filename cannot contain asterisks',
      filenameQuestionMarks: 'Filename cannot contain question marks',
      filenameDoubleQuotes: 'Filename cannot contain double quotes',
      filenameLessThan: 'Filename cannot contain less than signs',
      filenameGreaterThan: 'Filename cannot contain greater than signs',
      filenamePipes: 'Filename cannot contain pipes',
      filenameTooLong: 'Filename cannot be longer than 255 characters',
      filenameTooShort: 'Filename cannot be less than 3 characters',
      filenameStartsDot: 'Filename cannot start with a dot',
      filenameEndsDot: 'Filename cannot end with a dot',
      nameWasNotChanged: 'Name was not changed',
      filesTooBig: (files: string): string =>
        `Files ${files} size exceeds 10GB`,
      uploadError: 'Error while uploading file.',
      noFilesToUpload: 'No valid files to upload',
      noFilesToClear: 'There are no files to delete',
      apiError: (status: number, message: string): string =>
        `Error with status ${status} and message ${message}`,
    },
    modals: {
      clearFiles: {
        title: 'Clear all files',
        text:
          'Are you sure you want to clear all files? This action cannot be undone.',
        buttons: {
          submit: 'Clear',
          cancel: 'Cancel',
        },
      },
      renameFile: {
        title: 'Rename file',
        buttons: {
          submit: 'Rename',
          cancel: 'Cancel',
        },
      },
      uploadFiles: {
        title: 'Upload files',
        buttons: {
          submit: 'Upload',
          cancel: 'Cancel',
        },
      },
    },
  },
  uk: {
    mainTitle: 'Обмін файлами по LAN',
    uploadBtnTitle: 'Завантажити файли:',
    uploadBtn: 'Вибрати файли',
    sharedTextTitle: 'Спільний текст:',
    sharedTextPlaceholder: 'Напишіть щось для спільного використання',
    filesTitle: 'Файли:',
    releaseToUpload: 'Відпустіть, щоб завантажити',
    noFilesUploaded: 'Файли ще не завантажені',
    titles: {
      upload: 'Завантажити файл з диска',
      clearText: 'Очистити вміст текстового поля',
      copyText: 'Скопіювати вміст текстового поля',
      clearFiles: 'Очистити всі файли',
      openFile: 'Відкрити файл',
      downloadFile: 'Завантажити файл',
      renameFile: 'Перейменувати файл',
      deleteFile: 'Видалити файл',
    },
    messages: {
      fileUploaded: 'Файл успішно завантажено.',
      filesUploaded: 'Файли успішно завантажено.',
      fileRenamed: 'Файл успішно перейменовано.',
      fileDeleted: 'Файл успішно видалено.',
      filesDeleted: 'Файли успішно очищено.',
    },
    errorMessages: {
      noFilenameProvided: 'Назва файлу не надана',
      filenameSlashes:
        'Назва файлу не може містити косі риски (/) або зворотні косі риски (\\)',
      filenameBackslashes:
        'Назва файлу не може містити зворотні косі риски (\\) або косі риски (/)',
      filenameColons: 'Назва файлу не може містити двокрапки (:)',
      filenameAsterisks: 'Назва файлу не може містити зірочки (*)',
      filenameQuestionMarks: 'Назва файлу не може містити знаки питання (?)',
      filenameDoubleQuotes: 'Назва файлу не може містити подвійні лапки (")',
      filenameLessThan: 'Назва файлу не може містити знак менше (<)',
      filenameGreaterThan: 'Назва файлу не може містити знак більше (>)',
      filenamePipes: 'Назва файлу не може містити вертикальні риски (|)',
      filenameTooLong: 'Назва файлу не може бути довшою за 255 символів',
      filenameTooShort: 'Назва файлу не може бути коротшою за 3 символи',
      filenameStartsDot: 'Назва файлу не може починатися з крапки',
      filenameEndsDot: 'Назва файлу не може закінчуватися крапкою',
      nameWasNotChanged: 'Назва не була змінена',
      filesTooBig: (files: string): string =>
        `Розмір файлів ${files} перевищує 10 ГБ`,
      uploadError: 'Помилка при завантаженні файлу.',
      noFilesToUpload: 'Немає дійсних файлів для завантаження',
      noFilesToClear: 'Немає файлів для видалення',
      apiError: (status: number, message: string): string =>
        `Помилка з кодом ${status} та повідомленням ${message}`,
    },
    modals: {
      clearFiles: {
        title: 'Очищення всіх файлів',
        text:
          'Ви впевнені, що хочете очистити всі файли? Цю дію не можна скасувати.',
        buttons: {
          submit: 'Видалити',
          cancel: 'Скасувати',
        },
      },
      renameFile: {
        title: 'Перейменування файлу',
        buttons: {
          submit: 'Перейменувати',
          cancel: 'Скасувати',
        },
      },
      uploadFiles: {
        title: 'Відвантаження файлів',
        buttons: {
          submit: 'Відвантажити',
          cancel: 'Скасувати',
        },
      },
    },
  },
};

export function getLanguage(): string {
  return localStorage.getItem('language') || 'en';
}

export function setLanguage(lang: string): void {
  localStorage.setItem('language', lang);
}

export function applyLanguage(lang: string = getLanguage()): void {
  const langTranslations: Translation = translations[lang];

  const h1: HTMLHeadingElement = document.querySelector(
    'h1',
  ) as HTMLHeadingElement;
  h1.textContent = langTranslations.mainTitle;

  const filesUploadTitle: HTMLHeadingElement = document.getElementById(
    'files-upload-title',
  ) as HTMLHeadingElement;
  filesUploadTitle.textContent = langTranslations.uploadBtnTitle;
  filesUploadTitle.title = langTranslations.titles.upload;

  const fileUploadLabel: HTMLLabelElement = document.getElementById(
    'file-upload-label',
  ) as HTMLLabelElement;
  fileUploadLabel.textContent = langTranslations.uploadBtn;

  const shareTextTitle: HTMLHeadingElement = document.getElementById(
    'share-text-title',
  ) as HTMLHeadingElement;
  shareTextTitle.textContent = langTranslations.sharedTextTitle;

  const clearText: HTMLParagraphElement = document.getElementById(
    'clear-text',
  ) as HTMLParagraphElement;
  clearText.title = langTranslations.titles.clearText;

  const copyText: HTMLParagraphElement = document.getElementById(
    'copy-text',
  ) as HTMLParagraphElement;
  copyText.title = langTranslations.titles.copyText;

  const shareText: HTMLTextAreaElement = document.getElementById(
    'share-text',
  ) as HTMLTextAreaElement;
  shareText.placeholder = langTranslations.sharedTextPlaceholder;

  const filesTitle: HTMLHeadingElement = document.getElementById(
    'files-title',
  ) as HTMLHeadingElement;
  filesTitle.textContent = langTranslations.filesTitle;

  const clearFiles: HTMLParagraphElement = document.getElementById(
    'clear-files',
  ) as HTMLParagraphElement;
  clearFiles.title = langTranslations.titles.clearFiles;
}
