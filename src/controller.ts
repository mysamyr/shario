import { join } from '@std/path';
import { httpErrors, Request, Response } from 'jsr:@oak/oak';
import { Info } from './types.ts';
import {
  FILE_ALREADY_EXISTS,
  FILE_TOO_BIG,
  NOT_EXISTING_FILE,
} from './constants/errors.ts';
import { MAX_FILE_SIZE } from './constants/index.ts';
import {
  generateQRCodes,
  getFiles,
  getFilesFolderPath,
  isFileExists,
  moveFile,
  readFile,
  readQRCode,
  removeFile,
  writeFile,
} from './services/files.ts';
import { PORT } from './config.ts';
import { mapInfo } from './mappers.ts';
import Store from './store.ts';
import { validateFilename } from './helpers.ts';
import { getAddresses } from './services/addresses.ts';

export function getInfo(): Info {
  generateQRCodes();
  return mapInfo(getAddresses(), PORT, getFiles(), Store.getText());
}

export function getFile(filename: string): Uint8Array {
  if (!isFileExists(filename)) {
    throw new httpErrors.BadRequest(NOT_EXISTING_FILE);
  }
  return readFile(filename);
}

export function getQRCode(filename: string): Uint8Array {
  return readQRCode(filename);
}

export async function saveFile(req: Request, _res: Response): Promise<void> {
  const reqBody: FormData = await req.body.formData();
  for (const pair of reqBody.entries()) {
    const val: FormDataEntryValue = pair[1];
    if (val instanceof File) {
      if (isFileExists(val.name)) {
        throw new httpErrors.BadRequest(FILE_ALREADY_EXISTS);
      }
      if (val.size > MAX_FILE_SIZE) {
        throw new httpErrors.BadRequest(FILE_TOO_BIG);
      }
      const validationError = validateFilename(val.name);
      if (validationError) {
        throw new httpErrors.BadRequest(validationError);
      }
      const content: ReadableStream<Uint8Array> = val.stream();
      await writeFile(join(getFilesFolderPath(), val.name), content);
    } else {
      Store.setText(val);
    }
  }
}

export async function renameFile(
  filename: string,
  newFilename: string,
): Promise<void> {
  if (!isFileExists(filename)) {
    throw new httpErrors.BadRequest(NOT_EXISTING_FILE);
  }
  const validationError = validateFilename(newFilename);
  if (validationError) {
    throw new httpErrors.BadRequest(validationError);
  }
  await moveFile(
    join(getFilesFolderPath(), filename),
    join(getFilesFolderPath(), newFilename),
  );
}

export async function deleteFile(filename: string): Promise<void> {
  if (!isFileExists(filename)) {
    throw new httpErrors.BadRequest(NOT_EXISTING_FILE);
  }
  await removeFile(join(getFilesFolderPath(), filename));
}
