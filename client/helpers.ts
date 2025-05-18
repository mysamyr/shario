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

export function validateFilename(
  filename: string,
): string | undefined {
  if (!filename) {
    return NO_FILENAME_PROVIDED;
  }
  if (filename.includes('/')) {
    return FILENAME_SLASHES;
  }
  if (filename.includes('\\')) {
    return FILENAME_BACKSLASHES;
  }
  if (filename.includes(':')) {
    return FILENAME_COLONS;
  }
  if (filename.includes('*')) {
    return FILENAME_ASTERISKS;
  }
  if (filename.includes('?')) {
    return FILENAME_QUESTION_MARKS;
  }
  if (filename.includes('"')) {
    return FILENAME_DOUBLE_QUOTES;
  }
  if (filename.includes('<')) {
    return FILENAME_LESS_THAN;
  }
  if (filename.includes('>')) {
    return FILENAME_GREATER_THAN;
  }
  if (filename.includes('|')) {
    return FILENAME_PIPES;
  }
  if (filename.length > MAX_FILENAME_LENGTH) {
    return FILENAME_TOO_LONG;
  }
  if (filename.length < MIN_FILENAME_LENGTH) {
    return FILENAME_TOO_SHORT;
  }
  if (filename.startsWith('.')) {
    return FILENAME_STARTS_DOT;
  }
  if (filename.endsWith('.')) {
    return FILENAME_ENDS_DOT;
  }
}
