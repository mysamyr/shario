import { ensureDirSync, existsSync } from '@std/fs';
import { dirname, join } from '@std/path';
import { qrPng } from '@sigmasd/qrpng';
import { getAddresses } from './addresses.ts';
import { ENV, PORT } from '../config.ts';

export function getRootPath(): string {
  if (ENV !== 'production') return Deno.cwd();
  const execPath = Deno.execPath();
  return dirname(execPath);
}

export function getFilesFolderPath(): string {
  const filesDir = join(getRootPath(), 'files');
  ensureDirSync(filesDir);
  return filesDir;
}

export function getQRCodesFolderPath(): string {
  const filesDir = join(getRootPath(), 'qrcodes');
  ensureDirSync(filesDir);
  return filesDir;
}

export function isFileExists(name: string): boolean {
  return existsSync(join(getFilesFolderPath(), name));
}

export function readFile(name: string): Uint8Array {
  return Deno.readFileSync(join(getFilesFolderPath(), name));
}

export function readQRCode(name: string): Uint8Array {
  return Deno.readFileSync(join(getQRCodesFolderPath(), name));
}

export function getFiles(): string[] {
  const entries = Deno.readDirSync(getFilesFolderPath());
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.isFile) {
      files.push(entry.name);
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

export async function removeFile(path: string): Promise<void> {
  await Deno.remove(path);
}
