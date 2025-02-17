import { existsSync } from '@std/fs';
import { join } from '@std/path';
import { qrPng } from '@sigmasd/qrpng';
import { getAddresses } from './addresses.ts';
import { PORT } from '../config.ts';

export function isFileExists(filePath: string): boolean {
  return existsSync(filePath);
}

export function readFile(name: string): Uint8Array {
  return Deno.readFileSync(
    // @ts-ignore-next-line
    join(import.meta.dirname, '..', '..', 'files', name),
  );
}

export function getFiles(): string[] {
  const entries = Deno.readDirSync(
    // @ts-ignore-next-line
    join(import.meta.dirname, '..', '..', 'files'),
  );
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.isFile && entry.name !== '.gitkeep') {
      files.push(entry.name);
    }
  }
  return files;
}

export function generateQRCodes(): void {
  const addresses: string[] = getAddresses();
  for (const ip of addresses) {
    const filePath: string = join(
      // @ts-ignore-next-line
      import.meta.dirname,
      '..',
      '..',
      'public',
      'qrcodes',
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
  // @ts-ignore-next-line
  await Deno.writeFile(path, content);
}

export async function removeFile(path: string): Promise<void> {
  // @ts-ignore-next-line
  await Deno.remove(path);
}
