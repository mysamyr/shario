import { join } from '@std/path';
import { httpErrors, Request, Response } from '@oak/oak';
import { Info } from './types.ts';
import {
  FILE_ALREADY_EXISTS,
  FILE_TOO_BIG,
  NO_FILE,
  NOT_EXISTING_FILE,
} from './constants/errors.ts';
import { MAX_FILE_SIZE } from './constants/index.ts';
import {
  generateQRCodes,
  getFiles,
  getFilesFolderPath,
  getSharedContent,
  isFileExists,
  moveFile,
  readFile,
  readQRCode,
  removeFile,
  setSharedContent,
  writeFile,
} from './services/files.ts';
import { PORT } from './config.ts';
import { mapInfo } from './mappers.ts';
import { validateFilename } from './helpers.ts';
import { getAddresses } from './services/addresses.ts';
import { compressFiles } from './services/compress.ts';

export function getInfo(): Info {
  generateQRCodes();
  return mapInfo(getAddresses(), PORT, getFiles(), getSharedContent());
}

export function downloadFile(filename: string): Uint8Array {
  if (!isFileExists(filename)) {
    throw new httpErrors.BadRequest(NOT_EXISTING_FILE);
  }
  return readFile(filename);
}

export function archiveFiles(filenames: string[]): Promise<Uint8Array> {
  if (!filenames.every((filename: string) => isFileExists(filename))) {
    throw new httpErrors.BadRequest(NOT_EXISTING_FILE);
  }
  return compressFiles(filenames);
}

export function getQRCode(filename: string): Uint8Array {
  return readQRCode(filename);
}

export async function saveFile(req: Request, _res: Response): Promise<void> {
  const reqBody: FormData = await req.body.formData();
  const file: FormDataEntryValue | null = reqBody.get('file');
  if (!file || !(file instanceof File)) {
    throw new httpErrors.BadRequest(NO_FILE);
  }
  if (isFileExists(file.name)) {
    throw new httpErrors.BadRequest(FILE_ALREADY_EXISTS);
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new httpErrors.BadRequest(FILE_TOO_BIG);
  }
  const validationError = validateFilename(file.name);
  if (validationError) {
    throw new httpErrors.BadRequest(validationError);
  }
  const content: ReadableStream<Uint8Array> = file.stream();
  await writeFile(join(getFilesFolderPath(), file.name), content);
}

export async function updateText(req: Request, _res: Response): Promise<void> {
  const reqBody: string = await req.body.text();
  setSharedContent(reqBody);
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

export async function deleteFiles(filenames: string[]): Promise<void> {
  if (!filenames.every((filename: string) => isFileExists(filename))) {
    throw new httpErrors.BadRequest(NOT_EXISTING_FILE);
  }
  for (const filename of filenames) {
    await removeFile(join(getFilesFolderPath(), filename));
  }
}
