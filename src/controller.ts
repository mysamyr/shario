import { join } from '@std/path';
import { httpErrors, Request, Response } from 'jsr:@oak/oak';
import { Info } from './types.ts';
import {
  generateQRCodes,
  getFiles,
  isFileExists,
  readFile,
  removeFile,
  writeFile,
} from './services/files.ts';
import { getAddresses } from './services/addresses.ts';
import { PORT } from './config.ts';
import { mapInfo } from './mappers.ts';
import Store from './store.ts';

export function getInfo(): Info {
  generateQRCodes();
  return mapInfo(getAddresses(), PORT, getFiles(), Store.getText());
}

export function getFile(filename: string) {
  return readFile(filename);
}

export async function saveFile(req: Request, _res: Response): Promise<void> {
  const reqBody: FormData = await req.body.formData();
  for (const pair of reqBody.entries()) {
    const val: FormDataEntryValue = pair[1];
    if (val instanceof File) {
      const extension = val.name.split('.').at(-1);
      const newFileName: string = join(
        // @ts-ignore-next-line
        import.meta.dirname,
        '..',
        'files',
        crypto.randomUUID() + `.${extension}`,
      );
      if (isFileExists(newFileName)) {
        throw new httpErrors.BadRequest('File name already exists');
      }
      const content: ReadableStream<Uint8Array> = val.stream();
      await writeFile(newFileName, content);
    } else {
      Store.setText(val);
    }
  }
}

export async function deleteFile(filename: string): Promise<void> {
  // @ts-ignore-next-line
  const filePath: string = join(import.meta.dirname, '..', 'files', filename);
  if (!isFileExists(filePath)) {
    throw new httpErrors.BadRequest("File doesn't exists");
  }
  await removeFile(filePath);
}
