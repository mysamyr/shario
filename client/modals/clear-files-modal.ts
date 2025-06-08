import { Div, Header, Paragraph } from '../components.ts';
import modal from '../features/modal.ts';

export default function clearAllFilesModal(
  onSubmit: (e: Event) => Promise<void>,
): HTMLDivElement {
  const container: HTMLDivElement = Div({
    className: 'container modal-container',
  });

  const header: HTMLHeadingElement = Header({
    lvl: 2,
    text: 'Clear all files:',
  });

  const subHeader: HTMLHeadingElement = Paragraph({
    text:
      'Are you sure you want to clear all files? This action cannot be undone.',
  });

  const buttons: HTMLDivElement = Div({
    className: 'buttons',
  });

  buttons.append(
    Div({
      className: 'btn',
      text: 'Clear',
      onClick: onSubmit,
    }),
    Div({
      className: 'btn',
      text: 'Cancel',
      onClick: () => modal.hideModal(),
    }),
  );
  container.append(header, subHeader, buttons);
  return container;
}
