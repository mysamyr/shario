import { JSZip } from 'jszip';
import { readFile } from './files.ts';

export function compressFiles(filenames: string[]): Promise<Uint8Array> {
  const zip: JSZip = new JSZip();

  for (const name of filenames) {
    const fileData = readFile(name);
    zip.addFile(name, fileData);
  }

  return zip.generateAsync({ type: 'uint8array' });
}
