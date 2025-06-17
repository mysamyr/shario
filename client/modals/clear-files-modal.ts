import { Div, Header, Paragraph } from '../components.ts';
import modal from '../features/modal.ts';
import { getLanguage, translations } from '../features/language.ts';

export default function clearAllFilesModal(
  onSubmit: (e: Event) => Promise<void>,
): HTMLDivElement {
  const container: HTMLDivElement = Div({
    className: 'container modal-container',
  });

  const header: HTMLHeadingElement = Header({
    lvl: 2,
    text: translations[getLanguage()].modals.clearFiles.title,
  });

  const subHeader: HTMLHeadingElement = Paragraph({
    text: translations[getLanguage()].modals.clearFiles.text,
  });

  const buttons: HTMLDivElement = Div({
    className: 'buttons',
  });

  buttons.append(
    Div({
      className: 'btn',
      text: translations[getLanguage()].modals.clearFiles.buttons.submit,
      onClick: onSubmit,
    }),
    Div({
      className: 'btn',
      text: translations[getLanguage()].modals.clearFiles.buttons.cancel,
      onClick: () => modal.hideModal(),
    }),
  );
  container.append(header, subHeader, buttons);
  return container;
}
