import { Language } from '../types.ts';

export const MAX_FILE_SIZE: number = 10 * 1024 * 1024 * 1024; // 10GB
export const MAX_FILENAME_LENGTH: number = 50;
export const MIN_FILENAME_LENGTH: number = 3;
export const LANGUAGES_CONFIG: Language[] = [
  {
    name: 'English',
    code: 'en',
  },
  {
    name: 'Українська',
    code: 'uk',
  },
];
