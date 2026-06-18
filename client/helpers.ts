import {
  FILENAME_ASTERISKS,
  FILENAME_BACKSLASHES,
  FILENAME_COLONS,
  FILENAME_DOUBLE_QUOTES,
  FILENAME_ENDS_DOT,
  FILENAME_GREATER_THAN,
  FILENAME_LESS_THAN,
  FILENAME_PIPES,
  FILENAME_QUESTION_MARKS,
  FILENAME_SLASHES,
  FILENAME_STARTS_DOT,
  FILENAME_TOO_LONG,
  FILENAME_TOO_SHORT,
  NO_FILENAME_PROVIDED,
} from './constants/errors.ts';
import { MAX_FILENAME_LENGTH, MIN_FILENAME_LENGTH } from './constants/index.ts';
import { COLUMN_KEYS } from './constants/table.ts';
import { Span } from './components.ts';
import { FileEntry } from './types.ts';

export const validateFilename = (
  filename: string,
): string | undefined => {
  if (!filename) {
    return NO_FILENAME_PROVIDED();
  }
  if (filename.includes('/')) {
    return FILENAME_SLASHES();
  }
  if (filename.includes('\\')) {
    return FILENAME_BACKSLASHES();
  }
  if (filename.includes(':')) {
    return FILENAME_COLONS();
  }
  if (filename.includes('*')) {
    return FILENAME_ASTERISKS();
  }
  if (filename.includes('?')) {
    return FILENAME_QUESTION_MARKS();
  }
  if (filename.includes('"')) {
    return FILENAME_DOUBLE_QUOTES();
  }
  if (filename.includes('<')) {
    return FILENAME_LESS_THAN();
  }
  if (filename.includes('>')) {
    return FILENAME_GREATER_THAN();
  }
  if (filename.includes('|')) {
    return FILENAME_PIPES();
  }
  if (filename.length > MAX_FILENAME_LENGTH) {
    return FILENAME_TOO_LONG();
  }
  if (filename.length < MIN_FILENAME_LENGTH) {
    return FILENAME_TOO_SHORT();
  }
  if (filename.startsWith('.')) {
    return FILENAME_STARTS_DOT();
  }
  if (filename.endsWith('.')) {
    return FILENAME_ENDS_DOT();
  }
};

export const showInputError = (
  input: HTMLInputElement,
  message: string,
): void => {
  input.classList.add('input-error');

  const next = input
    .nextElementSibling as HTMLSpanElement | null;
  if (next && next.classList.contains('error-message')) {
    next.remove();
  }

  const errorMsg: HTMLSpanElement = Span({
    className: 'error-message',
    text: message,
  });
  input.after(errorMsg);
};

export const hideInputError = (input: HTMLInputElement): void => {
  input.classList.remove('input-error');
  const next = input
    .nextElementSibling as HTMLSpanElement | null;
  if (next && next.classList.contains('error-message')) {
    next.remove();
  }
};

export const sortFiles = (
  files: FileEntry[],
  sortKey: string,
  sortAsc: boolean,
): FileEntry[] =>
  files.toSorted((a: FileEntry, b: FileEntry): number => {
    let valA = a[sortKey as keyof FileEntry];
    let valB = b[sortKey as keyof FileEntry];

    if (valA == null) valA = '';
    if (valB == null) valB = '';

    if (sortKey === COLUMN_KEYS.SIZE) {
      valA = Number(valA);
      valB = Number(valB);
      return sortAsc ? valA - valB : valB - valA;
    } else if (sortKey === COLUMN_KEYS.CREATED) {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
      return sortAsc ? valA - valB : valB - valA;
    } else {
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    }
  });

export const formatBytes = (bytes: number): string => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = [
    'Bytes',
    'KB',
    'MB',
    'GB',
  ];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const debounce = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number,
): (...args: T) => void => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: T): void => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
