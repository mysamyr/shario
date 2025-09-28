import { ensureDirSync, ensureFileSync, existsSync } from '@std/fs';
import { dirname, join } from '@std/path';
import { qrPng } from '@sigmasd/qrpng';
import { getAddresses } from './addresses.ts';
import { ENV, PORT } from '../config.ts';
import { SHARED_TEXT_FILENAME } from '../constants/index.ts';
import { FileEntry } from '../types.ts';

export function getRootPath(): string {
  if (ENV !== 'production') return Deno.cwd();
  const execPath: string = Deno.execPath(); // application file path or deno executable path
  return dirname(execPath);
}

export function getFilesFolderPath(): string {
  const filesDir: string = join(getRootPath(), 'files');
  ensureDirSync(filesDir);
  return filesDir;
}

export function getQRCodesFolderPath(): string {
  const filesDir: string = join(getRootPath(), 'qrcodes');
  ensureDirSync(filesDir);
  return filesDir;
}

export function getSharedContentFilePath(): string {
  return join(getFilesFolderPath(), SHARED_TEXT_FILENAME);
}

export function isFileExists(name: string): boolean {
  return existsSync(join(getFilesFolderPath(), name));
}

export function getSharedContent(): string {
  const sharedContentFile: string = getSharedContentFilePath();
  ensureFileSync(sharedContentFile);
  const decoder: TextDecoder = new TextDecoder('utf-8');
  const data: Uint8Array = Deno.readFileSync(sharedContentFile);
  return decoder.decode(data);
}

export function setSharedContent(content: string): void {
  const sharedContentFile: string = getSharedContentFilePath();
  const encoder: TextEncoder = new TextEncoder();
  writeFile(sharedContentFile, encoder.encode(content));
}

export function readFile(name: string): Uint8Array {
  return Deno.readFileSync(join(getFilesFolderPath(), name));
}

export function readQRCode(name: string): Uint8Array {
  return Deno.readFileSync(join(getQRCodesFolderPath(), name));
}

export function getFiles(): FileEntry[] {
  const entries: IteratorObject<Deno.DirEntry> = Deno.readDirSync(
    getFilesFolderPath(),
  );
  const files: FileEntry[] = [];
  for (const entry of entries) {
    if (entry.isFile && entry.name !== SHARED_TEXT_FILENAME) {
      const info: Deno.FileInfo = Deno.statSync(
        join(getFilesFolderPath(), entry.name),
      );
      files.push({
        name: entry.name,
        size: info.size,
        type: 'todo',
        created: info.birthtime
          ? Date.parse(info.birthtime.toUTCString())
          : null,
        modified: info.mtime ? Date.parse(info.mtime.toUTCString()) : null,
      });
    }
  }
  return files;
}

export function generateQRCodes(): void {
  const addresses: string[] = getAddresses();
  for (const ip of addresses) {
    const filePath: string = join(
      getQRCodesFolderPath(),
      `${ip}_${PORT}.png`,
    );
    if (!existsSync(filePath)) {
      const data: Uint8Array = new TextEncoder().encode(`http://${ip}:${PORT}`);
      const qrCodePng: Uint8Array = qrPng(data);
      Deno.writeFileSync(filePath, qrCodePng);
    }
  }
}

export async function writeFile(
  path: string,
  content: Uint8Array | ReadableStream<Uint8Array>,
): Promise<void> {
  await Deno.writeFile(path, content);
}

export async function moveFile(
  originalPath: string,
  newPath: string,
): Promise<void> {
  await Deno.rename(originalPath, newPath);
}

export async function deleteFolder(path: string): Promise<void> {
  await Deno.remove(path, { recursive: true });
}

export async function removeFile(path: string): Promise<void> {
  await Deno.remove(path);
}
