import {
  clearUrlViewKey,
  getQueryParam,
  setQueryParam,
} from './query-param.ts';

const MOBILE_BREAKPOINT = 676; // px
const SECTION_IDS: string[] = ['files-section', 'notes-section'];
const VIEW_QUERY_PARAM = 'view'; // ?view=files|notes

const sectionKey = (sectionId: string): string => sectionId.split('-')[0];

export const initMobileView = (): void => {
  const sectionElements: Record<string, HTMLElement> = SECTION_IDS.reduce(
    (acc, id: string) => {
      const el = document.getElementById<HTMLElement>(id);
      if (el) acc[id] = el;
      return acc;
    },
    {} as Record<string, HTMLElement>,
  );

  const footerLinks: Record<string, HTMLDivElement> = Object.values(
    sectionElements,
  )
    .reduce((acc, el) => {
      const key: string = sectionKey(el.id);
      const link = document.getElementById<HTMLDivElement>(
        `${key}-footer-link`,
      );
      if (link) acc[key] = link;
      return acc;
    }, {} as Record<string, HTMLDivElement>);

  let isMobile = globalThis.innerWidth <= MOBILE_BREAKPOINT;
  let currentKey: string = sectionKey(SECTION_IDS[0]); // default

  const updateActiveState = (activeKey: string): void => {
    Object.entries(footerLinks).forEach(([key, link]) => {
      link.classList.toggle('active', key === activeKey);
    });
  };

  const showOnly = (key: string): void => {
    currentKey = key;
    Object.values(sectionElements).forEach((el) => {
      el.style.display = (sectionKey(el.id) === key) ? 'block' : 'none';
    });
    updateActiveState(key);
    if (isMobile) setQueryParam(VIEW_QUERY_PARAM, key);
  };

  const showAll = (): void => {
    Object.values(sectionElements).forEach((el) => {
      el.style.display = 'block';
    });
    Object.values(footerLinks).forEach((link) =>
      link.classList.remove('active')
    );
  };

  const handleResize = (): void => {
    const nowMobile = globalThis.innerWidth <= MOBILE_BREAKPOINT;
    if (nowMobile === isMobile) return;
    isMobile = nowMobile;
    if (isMobile) {
      const urlKey = getQueryParam(VIEW_QUERY_PARAM);
      showOnly(urlKey || currentKey);
    } else {
      showAll();
      clearUrlViewKey(VIEW_QUERY_PARAM);
    }
  };

  if (isMobile) {
    const urlKey: string | null = getQueryParam(VIEW_QUERY_PARAM);
    showOnly(urlKey || currentKey);
  } else {
    showAll();
    clearUrlViewKey(VIEW_QUERY_PARAM);
  }

  Object.entries(footerLinks).forEach(([key, link]): void => {
    link.addEventListener('click', () => {
      if (!isMobile) return;
      showOnly(key);
    });
  });

  globalThis.addEventListener('resize', handleResize);
};
