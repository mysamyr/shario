import { getQueryParam, setQueryParam } from './query-param.ts';

const SECTION_IDS = ['files-section', 'notes-section'];
const VIEW_PARAM = 'view';

const sectionKey = (id: string): string => id.split('-')[0];

export const initView = (): void => {
  const sections = SECTION_IDS.reduce<Record<string, HTMLElement>>(
    (acc, id) => {
      const el = document.getElementById(id);
      if (el) acc[id] = el;
      return acc;
    },
    {},
  );

  const footerLinks = Object.values(sections)
    .reduce<Record<string, HTMLDivElement>>((acc, el) => {
      const key = sectionKey(el.id);
      const link = document.getElementById(`${key}-footer-link`);
      if (link) acc[key] = link as HTMLDivElement;
      return acc;
    }, {});

  const showOnly = (key: string): void => {
    Object.values(sections).forEach((el) => {
      el.style.display = sectionKey(el.id) === key ? '' : 'none';
    });
    Object.entries(footerLinks).forEach(([k, link]) => {
      link.classList.toggle('active', k === key);
    });
    setQueryParam(VIEW_PARAM, key);
  };

  showOnly(getQueryParam(VIEW_PARAM) ?? sectionKey(SECTION_IDS[0]));

  Object.entries(footerLinks).forEach(([key, link]) => {
    link.addEventListener('click', () => showOnly(key));
  });
};
