import { Div, Header } from '../components.ts';

export default (): HTMLDivElement => {
  const container: HTMLDivElement = Div({
    className: 'modal-container',
  });

  const header: HTMLHeadingElement = Header({
    lvl: 2,
    text: 'TODO instructions',
  });

  container.appendChild(header);
  return container;
};
