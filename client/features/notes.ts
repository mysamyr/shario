import { ApiError } from '../types.ts';
import snackbar from './snackbar.ts';
import { API_ERROR_$, NOTHING_TO_SAVE } from '../constants/errors.ts';
import { getText, setText } from '../state/text.ts';
import { handleFilesUpload } from './files.ts';

const textarea: HTMLTextAreaElement = document.querySelector(
  'textarea',
) as HTMLTextAreaElement;

export const initNotes = (): void => {
  textarea.addEventListener('focusout', async (): Promise<void> => {
    if (getText() !== textarea.value) await uploadText(textarea.value);
  });
};

export const uploadText = async (value: string = ''): Promise<void> => {
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
};

export const updateNote = (text: string): void => {
  if (getText() !== text) {
    textarea.value = text;
    textarea.dispatchEvent(new Event('input'));
    setText(text);
  }
};

export const saveNote = (): void => {
  if (!getText()) {
    snackbar.displayMsg(NOTHING_TO_SAVE());
    return;
  }
  handleFilesUpload([
    new File([getText()], 'note.txt', { type: 'text/plain' }),
  ]);
};

export const copyNote = async (): Promise<void> => {
  if (getText() !== '') {
    textarea.focus();
    textarea.select();
    await navigator.clipboard.writeText(textarea.value);
  }
};

export const clearNote = async (): Promise<void> => {
  if (getText()) {
    await uploadText();
  }
};
