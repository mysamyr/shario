import snackbar from './snackbar.ts';
import { NOTHING_TO_SAVE } from '../constants/errors.ts';
import { getText, setText } from '../state/text.ts';
import { handleFilesUpload } from './files.ts';
import { sendText } from './ws.ts';
import { debounce } from '../helpers.ts';

const textarea: HTMLTextAreaElement = document.querySelector(
  'textarea',
) as HTMLTextAreaElement;

const debouncedSend = debounce((value: string): void => {
  sendText(value);
}, 400);

export const initNotes = (): void => {
  textarea.addEventListener('input', (): void => {
    const value: string = textarea.value;
    setText(value);
    debouncedSend(value);
  });
};

export const updateNote = (text: string): void => {
  if (getText() !== text) {
    textarea.value = text;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
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

export const clearNote = (): void => {
  if (getText()) {
    updateNote('');
    sendText('');
  }
};
