import type { Language, Translation } from '../types.ts';

export enum LanguageCode {
  EN = 'en',
  UK = 'uk',
}

export const LANGUAGES_CONFIG: Language[] = [
  {
    name: 'English',
    code: LanguageCode.EN,
  },
  {
    name: 'Українська',
    code: LanguageCode.UK,
  },
];

const translations: Record<LanguageCode, Translation> = {
  [LanguageCode.EN]: {
    filesHeader: 'Files',
    noteHeader: 'Notes',
    sharedTextPlaceholder: 'Write something here to share',
    noLocations: 'You are not connected to any network',
    titles: {
      changeLanguage: 'Change language',
      changeTheme: 'Change theme',
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
      checkbox: '',
      actions: '',
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
    help: {
      title: 'Help',
      sections: [
        {
          title: 'Files — Uploading',
          items: [
            'Click the + button to open the file picker and select one or more files.',
            'Drag & drop any files onto the page to upload them.',
            'Copy a file and press Ctrl+V anywhere on the page to upload it from the clipboard.',
          ],
        },
        {
          title: 'Files — Downloading',
          items: [
            'Click the download icon in a file row to download that individual file.',
            'Select files using the checkboxes, then click the ↓ button in the header to download all selected files as a single ZIP archive.',
          ],
        },
        {
          title: 'Files — Managing',
          items: [
            'Click the pencil icon in a file row to rename the file.',
            'Click the trash icon in a file row to delete that file.',
            'Select files using the checkboxes, then click the trash button in the header to delete all selected files at once.',
            'Click any sortable column header (Name, Size, Type, Created) to sort the table by that column. Click again to reverse the order.',
          ],
        },
        {
          title: 'Notes',
          items: [
            'The notes area is shared — anything typed here is visible to all connected devices in real time.',
            'Click the disk icon to save the current note as a text file.',
            'Click the copy icon to copy the entire note to the clipboard.',
            'Click the broom icon to clear the note.',
            'Press Ctrl+V while the page (not the textarea) is focused to paste text directly into the shared note.',
          ],
        },
        {
          title: 'General',
          items: [
            'Click the QR icon in the header to show QR codes for all network addresses — scan from a mobile device to connect instantly.',
            'Click the globe icon to change the display language.',
            'Use the footer tabs to switch between the Files and Notes views.',
          ],
        },
      ],
    },
    themeLabels: {
      theme: 'Theme',
      color: 'Color',
      light: 'Light',
      dark: 'Dark',
      green: 'Green',
      blue: 'Blue',
      red: 'Red',
    },
  },
  [LanguageCode.UK]: {
    filesHeader: 'Файли',
    noteHeader: 'Нотатки',
    sharedTextPlaceholder: 'Напишіть щось для спільного використання',
    noLocations: 'Ви не підключені до жодної мережі',
    titles: {
      changeLanguage: 'Змінити мову',
      changeTheme: 'Змінити тему',
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
      checkbox: '',
      actions: '',
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
      noFilesSelected: 'Не вибрано жодного файлу',
      nothingToSave: 'Нічого зберігати',
      apiError: (status: number, message: string): string =>
        `Помилка з кодом ${status} та повідомленням ${message}`,
    },
    modals: {
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
    help: {
      title: 'Довідка',
      sections: [
        {
          title: 'Файли — Завантаження',
          items: [
            'Натисніть кнопку +, щоб відкрити файловий менеджер і вибрати один або кілька файлів.',
            'Перетягніть файли на сторінку, щоб завантажити їх.',
            'Скопіюйте файл і натисніть Ctrl+V будь-де на сторінці, щоб завантажити його з буфера обміну.',
          ],
        },
        {
          title: 'Файли — Скачування',
          items: [
            'Натисніть значок завантаження у рядку файлу, щоб скачати окремий файл.',
            'Виберіть файли за допомогою прапорців, а потім натисніть кнопку ↓ в заголовку, щоб скачати всі вибрані файли як один ZIP-архів.',
          ],
        },
        {
          title: 'Файли — Керування',
          items: [
            'Натисніть значок олівця у рядку файлу, щоб перейменувати файл.',
            'Натисніть значок кошика у рядку файлу, щоб видалити цей файл.',
            'Виберіть файли за допомогою прапорців, а потім натисніть кнопку кошика в заголовку, щоб видалити всі вибрані файли одразу.',
            'Натисніть на заголовок будь-якого стовпця (Назва, Розмір, Тип, Файл створено), щоб сортувати таблицю за цим стовпцем. Натисніть ще раз, щоб змінити порядок на зворотний.',
          ],
        },
        {
          title: 'Нотатки',
          items: [
            'Область нотаток є спільною — все, що ви вводите, одразу видно всім підключеним пристроям.',
            'Натисніть значок дискети, щоб зберегти поточну нотатку як текстовий файл.',
            'Натисніть значок копіювання, щоб скопіювати всю нотатку в буфер обміну.',
            'Натисніть значок мітли, щоб очистити нотатку.',
            'Натисніть Ctrl+V, коли фокус знаходиться на сторінці (а не в текстовому полі), щоб вставити текст безпосередньо в спільну нотатку.',
          ],
        },
        {
          title: 'Загальне',
          items: [
            'Натисніть значок QR у заголовку, щоб переглянути QR-коди для всіх мережевих адрес — відскануйте з мобільного пристрою для миттєвого підключення.',
            'Натисніть значок глобуса, щоб змінити мову інтерфейсу.',
            'Використовуйте вкладки внизу сторінки для перемикання між виглядами Файли та Нотатки.',
          ],
        },
      ],
    },
    themeLabels: {
      theme: 'Тема',
      color: 'Колір',
      light: 'Світла',
      dark: 'Темна',
      green: 'Зелений',
      blue: 'Синій',
      red: 'Червоний',
    },
  },
};

export default translations;
