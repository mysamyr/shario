import { Info } from '../types.ts';
import { updateNote } from './notes.ts';
import { renderFiles, uncheckSelectAll } from './table.ts';
import { setQRs } from '../state/qrs.ts';
import { setFiles } from '../state/files.ts';

export async function reloadPage(): Promise<void> {
  const data: Response = await fetch('/info');
  const info: Info = await data.json();

  setQRs(info.locations);
  setFiles(info.files);
  updateNote(info.text);
  renderFiles({});
  uncheckSelectAll();
}
