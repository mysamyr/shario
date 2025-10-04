import { ApiError } from '../types.ts';
import snackbar from './snackbar.ts';
import { API_ERROR_$, NOTHING_TO_SAVE } from '../constants/errors.ts';
import { getText, setText } from '../state/text.ts';
import { handleFilesUpload } from './files.ts';

const textarea: HTMLTextAreaElement = document.querySelector(
  'textarea',
) as HTMLTextAreaElement;

export function initNotes() {
  textarea.addEventListener('focusout', async function (): Promise<void> {
    if (getText() !== textarea.value) await uploadText(textarea.value);
  });
}

export async function uploadText(value: string = ''): Promise<void> {
  const res: Response = await fetch('/text', {
    method: 'PUT',
    body: value,
  });
  if (!res.ok) {
    const { status, message }: ApiError = await res
      .json();
    snackbar.displayMsg(API_ERROR_$(status, message));
  }

  updateNote(value);
}

export function updateNote(text: string): void {
  if (getText() !== text) {
    textarea.value = text;
    textarea.dispatchEvent(new Event('input'));
    setText(text);
  }
}

export function saveNote(): void {
  if (!getText()) {
    snackbar.displayMsg(NOTHING_TO_SAVE());
    return;
  }
  handleFilesUpload([
    new File([getText()], 'note.txt', { type: 'text/plain' }),
  ]);
}

export async function copyNote(): Promise<void> {
  if (getText() !== '') {
    textarea.focus();
    textarea.select();
    await navigator.clipboard.writeText(textarea.value);
  }
}

export async function clearNote(): Promise<void> {
  if (getText()) {
    await uploadText();
  }
}
