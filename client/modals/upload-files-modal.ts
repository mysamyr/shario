import { Div, Header, Input, Span } from '../components.ts';
import modal from '../features/modal.ts';

export function showInputError(input: HTMLInputElement, message: string): void {
  input.classList.add('input-error');

  const next: HTMLSpanElement | null = input
    .nextElementSibling as HTMLSpanElement;
  if (next && next.classList.contains('error-message')) {
    next.remove();
  }

  const errorMsg: HTMLSpanElement = Span({
    className: 'error-message',
    text: message,
  });
  input.after(errorMsg);
}

export function hideInputError(input: HTMLInputElement): void {
  input.classList.remove('input-error');
  const next: HTMLSpanElement | null = input
    .nextElementSibling as HTMLSpanElement;
  if (next && next.classList.contains('error-message')) {
    next.remove();
  }
}

export default function uploadFilesModal(
  files: File[],
  onSubmit: (inputs: HTMLInputElement[]) => void,
): HTMLDivElement {
  const container: HTMLDivElement = Div({
    className: 'container modal-container',
  });

  const header: HTMLHeadingElement = Header({
    lvl: 2,
    text: 'Uploaded file names:',
  });

  const buttons: HTMLDivElement = Div({
    className: 'buttons',
  });
  let inputs: HTMLInputElement[] = files.map((file: File) =>
    Input({
      type: 'text',
      value: file.name,
      className: 'upload-input',
    })
  );
  const wrappedInputs: HTMLDivElement[] = inputs.map(
    (input: HTMLInputElement): HTMLDivElement => {
      const container: HTMLDivElement = Div({
        className: 'input-container',
      });
      const inputWrapper: HTMLDivElement = Div({
        className: 'input-wrapper',
      });
      inputWrapper.appendChild(input);
      const deleteBtn: HTMLDivElement = Div({
        className: 'delete btn file-upload-delete-btn',
        text: '&#10005;',
        title: 'Delete input',
        onClick: (e: MouseEvent): void => {
          e.stopPropagation();
          hideInputError(input);
          container.remove();
          const idx: number = inputs.indexOf(input);
          inputs = inputs.filter((_el: HTMLInputElement, i: number): boolean =>
            i !== idx
          );
          if (!inputs.length) {
            modal.hideModal();
          }
        },
      });
      container.append(inputWrapper, deleteBtn);
      return container;
    },
  );
  buttons.append(
    Div({
      className: 'btn',
      text: 'Upload',
      onClick: () =>
        onSubmit(
          inputs,
        ),
    }),
    Div({
      className: 'btn',
      text: 'Cancel',
      onClick: () => modal.hideModal(),
    }),
  );
  container.append(header, ...wrappedInputs, buttons);
  inputs[0].focus();
  inputs.forEach((input: HTMLInputElement): void => {
    input.addEventListener('keypress', (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        onSubmit(
          inputs,
        );
      }
    });
  });
  return container;
}
