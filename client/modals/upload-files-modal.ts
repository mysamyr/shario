import { Div, Header, Input } from '../components.ts';
import modal from '../features/modal.ts';
import { getLanguage } from '../features/language.ts';
import translations from '../constants/language.ts';
import { hideInputError } from '../helpers.ts';

export default (
  files: File[],
  onSubmit: (inputs: HTMLInputElement[]) => void,
): HTMLDivElement => {
  const container = Div({
    className: 'modal-container',
  });

  const header = Header({
    lvl: 2,
    text: translations[getLanguage()].modals.uploadFiles.title,
  });

  const buttons = Div({
    className: 'buttons',
  });
  let inputs = files.map((file: File) =>
    Input({
      type: 'text',
      value: file.name,
      className: 'upload-input',
    })
  );
  const inputRows = inputs.map(
    (input: HTMLInputElement): HTMLDivElement => {
      const container = Div({
        className: 'input-container',
      });
      const inputWrapper = Div({
        className: 'input-wrapper',
      });
      inputWrapper.appendChild(input);
      const deleteBtn = Div({
        className: 'btn file-upload-delete-btn',
        text: '<img src="/assets/trash.svg" class="icon" alt="delete">',
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
      text: translations[getLanguage()].modals.uploadFiles.buttons.submit,
      onClick: () =>
        onSubmit(
          inputs,
        ),
    }),
    Div({
      className: 'btn',
      text: translations[getLanguage()].modals.uploadFiles.buttons.cancel,
      onClick: () => modal.hideModal(),
    }),
  );
  container.append(header, ...inputRows, buttons);

  inputs.forEach((input: HTMLInputElement): void => {
    input.addEventListener('keypress', (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        onSubmit(inputs);
      }
    });
  });
  return container;
};
