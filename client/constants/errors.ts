export const NO_FILENAME_PROVIDED: string = 'No filename provided';
export const FILENAME_SLASHES: string = 'Filename cannot contain slashes';
export const FILENAME_BACKSLASHES: string =
  'Filename cannot contain backslashes';
export const FILENAME_COLONS: string = 'Filename cannot contain colons';
export const FILENAME_ASTERISKS: string = 'Filename cannot contain asterisks';
export const FILENAME_QUESTION_MARKS: string =
  'Filename cannot contain question marks';
export const FILENAME_DOUBLE_QUOTES: string =
  'Filename cannot contain double quotes';
export const FILENAME_LESS_THAN: string =
  'Filename cannot contain less than signs';
export const FILENAME_GREATER_THAN: string =
  'Filename cannot contain greater than signs';
export const FILENAME_PIPES: string = 'Filename cannot contain pipes';
export const FILENAME_TOO_LONG: string =
  'Filename cannot be longer than 255 characters';
export const FILENAME_TOO_SHORT: string =
  'Filename cannot be less than 3 characters';
export const FILENAME_STARTS_DOT: string = 'Filename cannot start with a dot';
export const FILENAME_ENDS_DOT: string = 'Filename cannot end with a dot';
export const NAME_WAS_NOT_CHANGED: string = 'Name was not changed';
export const FILE_TOO_BIG: string = 'File size exceeds 1GB';
export const UPLOAD_ERROR: string = 'Error while uploading file.';
export const API_ERROR_$ = (status: number, message: string): string =>
  `Error with status ${status} and message ${message}`;
