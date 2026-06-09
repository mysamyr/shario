import { Div, Header, Paragraph } from '../components.ts';
import translations from '../constants/language.ts';
import { getLanguage } from '../features/language.ts';
import type { Translation } from '../types.ts';

export default (): HTMLDivElement => {
  const lang = translations[getLanguage()] as Translation;
  const { title, sections } = lang.help;

  const container: HTMLDivElement = Div({ className: 'modal-container' });
  container.appendChild(Header({ lvl: 2, text: title }));

  sections.forEach(({ title: sectionTitle, items }) => {
    const section: HTMLDivElement = Div({ className: 'help-section' });
    section.appendChild(Header({ lvl: 3, text: sectionTitle }));
    items.forEach((item) => {
      section.appendChild(Paragraph({ className: 'help-item', text: item }));
    });
    container.appendChild(section);
  });

  return container;
};
