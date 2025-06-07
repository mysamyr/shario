import { Div, Header, Input } from '../components.ts';
import modal from '../features/modal.ts';

export default function renameFileModal(
  filename: string,
  onSubmit: (inputs: HTMLInputElement, originFilename: string) => void,
): HTMLDivElement {
  const container: HTMLDivElement = Div({
    className: 'container modal-container',
  });

  const header: HTMLHeadingElement = Header({
    lvl: 2,
    text: 'Rename file:',
  });

  const buttons: HTMLDivElement = Div({
    className: 'buttons',
  });
  const input: HTMLInputElement = Input({
    type: 'text',
    value: filename,
    className: 'upload-input',
  });
  const wrappedInput: HTMLDivElement = Div({
    className: 'input-wrapper',
  });
  wrappedInput.appendChild(input);

  buttons.append(
    Div({
      className: 'btn',
      text: 'Rename',
      onClick: () =>
        onSubmit(
          input,
          filename.trim(),
        ),
    }),
    Div({
      className: 'btn',
      text: 'Cancel',
      onClick: () => modal.hideModal(),
    }),
  );
  container.append(header, wrappedInput, buttons);
  input.focus();
  input.addEventListener('keypress', (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      onSubmit(
        input,
        filename.trim(),
      );
    }
  });
  return container;
}
