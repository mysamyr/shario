import { Language, TableLabels, Titles, Translation } from '../types.ts';
import { Div } from '../components.ts';
import { LANGUAGES_CONFIG } from '../constants/index.ts';
import { COLUMN_KEYS } from '../constants/table.ts';

type Translations = {
  [lang: string]: Translation;
};

export const translations: Translations = {
  en: {
    filesHeader: 'Files:',
    noteHeader: 'Notes',
    sharedTextPlaceholder: 'Write something here to share',
    noLocations: 'You are not connected to any network',
    titles: {
      changeLanguage: 'Change language',
      showQRs: 'Show QR codes',
      showHelp: 'Show help',
      uploadFiles: 'Upload files from disk',
      downloadFiles: 'Download files as ZIP',
      deleteFiles: 'Delete files',
      saveNote: 'Save note',
      copyText: 'Copy textarea content',
      clearText: 'Clear textarea content',
      openFile: 'Open file',
      downloadFile: 'Download file',
      renameFile: 'Rename file',
      deleteFile: 'Delete file',
    },
    table: {
      name: 'Name',
      size: 'Size',
      type: 'Type',
      created: 'File Created',
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
      noFilesSelected: 'No files selected',
      nothingToSave: 'Nothing to save',
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
    filesHeader: 'Файли:',
    noteHeader: 'Нотатки:',
    sharedTextPlaceholder: 'Напишіть щось для спільного використання',
    noLocations: 'Ви не підключені до жодної мережі',
    titles: {
      changeLanguage: 'Змінити мову',
      showQRs: 'Показати QR-коди',
      showHelp: 'Показати довідку',
      uploadFiles: 'Завантажити файли з диска',
      downloadFiles: 'Завантажити файли у вигляді ZIP',
      deleteFiles: 'Видалити файли',
      saveNote: 'Зберегти нотатку',
      copyText: 'Скопіювати нотатку',
      clearText: 'Очистити вміст текстового поля',
      openFile: 'Відкрити файл',
      downloadFile: 'Завантажити файл',
      renameFile: 'Перейменувати файл',
      deleteFile: 'Видалити файл',
    },
    table: {
      name: 'Назва',
      size: 'Розмір',
      type: 'Тип',
      created: 'Файл створено',
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
      noFilesToClear: 'Не вибрано жодного файлу',
      nothingToSave: 'Нічого зберігати',
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

export const getLanguage = (): string =>
  localStorage.getItem('language') || 'en';

export const setLanguage = (lang: string): void => {
  localStorage.setItem('language', lang);
};

const applyHeaders = (lang: Translation): void => {
  const filesHeader: HTMLHeadingElement = document.getElementById<
    HTMLHeadingElement
  >(
    'files-header',
  );
  filesHeader.innerText = lang.filesHeader;
  const noteHeader: HTMLHeadingElement = document.getElementById<
    HTMLHeadingElement
  >(
    'note-header',
  );
  noteHeader.innerText = lang.noteHeader;
};

const applyTitles = (titles: Titles): void => {
  const language: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'language',
  );
  language.title = titles.changeLanguage;
  const showQRs: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'qr',
  );
  showQRs.title = titles.showQRs;
  const showHelp: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'help',
  );
  showHelp.title = titles.showHelp;

  const uploadFiles: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'upload-files',
  );
  uploadFiles.title = titles.uploadFiles;
  const downloadFiles: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'download-files',
  );
  downloadFiles.title = titles.downloadFiles;
  const deleteFiles: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'delete-files',
  );
  deleteFiles.title = titles.deleteFiles;

  const saveNote: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'save-as-file',
  );
  saveNote.title = titles.saveNote;
  const copyText: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'copy-text',
  );
  copyText.title = titles.copyText;
  const clearText: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'clear-text',
  );
  clearText.title = titles.clearText;
};

const applyTableLabels = (labels: TableLabels): void => {
  Object.values(COLUMN_KEYS).forEach((key: string): void => {
    if (!labels[key]) return;
    const header: HTMLTableCellElement = document.getElementById<
      HTMLTableCellElement
    >(`file_${key}`);
    header.innerText = labels[key];
  });
};

export const applyLanguage = (lang: string = getLanguage()): void => {
  const langTranslations: Translation = translations[lang];

  applyHeaders(langTranslations);
  applyTitles(langTranslations.titles);
  applyTableLabels(langTranslations.table);

  const textarea: HTMLTextAreaElement = document.querySelector<
    HTMLTextAreaElement
  >(
    'textarea',
  );
  textarea.placeholder = langTranslations.sharedTextPlaceholder;
};

export const renderLanguageDropdown = (anchor: HTMLElement) => {
  const existing: HTMLDivElement | null = document.getElementById(
    'language-dropdown',
  );
  if (existing) existing.remove();

  const dropdown: HTMLDivElement = Div({
    id: 'language-dropdown',
  });
  dropdown.style.top = `${anchor.offsetTop + anchor.offsetHeight}px`;
  dropdown.style.left = `${anchor.offsetLeft}px`;

  LANGUAGES_CONFIG.forEach((lang: Language): void => {
    const option: HTMLDivElement = Div({
      className: 'language-option',
      text: lang.name,
      onClick: (): void => {
        if (lang.code !== getLanguage()) {
          setLanguage(lang.code);
          applyLanguage(lang.code);
        }
        dropdown.remove();
      },
    });
    dropdown.appendChild(option);
  });

  document.body.appendChild(dropdown);

  setTimeout((): void => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (!dropdown.contains(e.target as Node) && e.target !== anchor) {
        dropdown.remove();
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, 0);
};
