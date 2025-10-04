export const Div = (props: {
  id?: string;
  text?: string;
  title?: string;
  className?: string;
  onClick?: (this: HTMLDivElement, ev: MouseEvent) => void;
}): HTMLDivElement => {
  const div: HTMLDivElement = document.createElement('div');
  if (!props) return div;
  if (props.className) {
    div.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.text) div.innerHTML = props.text;
  if (props.title) div.title = props.title;
  if (props.id) div.id = props.id;
  if (props.onClick) div.addEventListener('click', props.onClick);

  return div;
};

export const Header = (props: {
  lvl: number;
  id?: string;
  text?: string;
  className?: string;
}): HTMLHeadingElement => {
  const h: HTMLHeadingElement = document.createElement(
    `h${props.lvl}`,
  ) as HTMLHeadingElement;
  if (props.className) {
    h.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.text) h.innerHTML = props.text;
  if (props.id) h.id = props.id;

  return h;
};

export const Paragraph = (props: {
  id?: string;
  text?: string;
  className?: string;
  onClick?: (this: HTMLParagraphElement, ev: MouseEvent) => void;
}): HTMLParagraphElement => {
  const p: HTMLParagraphElement = document.createElement('p');
  if (!props) return p;
  if (props.className) {
    p.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.text) p.innerHTML = props.text;
  if (props.id) p.id = props.id;
  if (props.onClick) p.addEventListener('click', props.onClick);

  return p;
};

export const Span = (props: {
  id?: string;
  text?: string;
  className?: string;
}): HTMLSpanElement => {
  const span: HTMLSpanElement = document.createElement('span');
  if (!props) return span;
  if (props.className) {
    span.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.text) span.innerHTML = props.text;
  if (props.id) span.id = props.id;

  return span;
};

export const Input = (props: {
  id?: string;
  type?: string;
  value?: string;
  title?: string;
  className?: string;
  onClick?: (this: HTMLInputElement, ev: MouseEvent) => void;
  onChange?: (this: HTMLInputElement, ev: Event) => void;
}): HTMLInputElement => {
  const input: HTMLInputElement = document.createElement('input');
  if (!props) return input;
  if (props.className) {
    input.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.id) input.id = props.id;
  if (props.type) input.type = props.type;
  if (props.value) input.value = props.value;
  if (props.title) input.title = props.title;
  if (props.onClick) input.addEventListener('click', props.onClick);
  if (props.onChange) input.addEventListener('change', props.onChange);

  return input;
};
export const Link = (props: {
  id?: string;
  text?: string;
  href?: string;
  target?: string;
  title?: string;
  download?: string;
  rel?: string;
  className?: string;
  onClick?: (this: HTMLAnchorElement, ev: MouseEvent) => void;
}): HTMLAnchorElement => {
  const a: HTMLAnchorElement = document.createElement('a');
  if (!props) return a;
  if (props.className) {
    a.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.text) a.innerHTML = props.text;
  if (props.id) a.id = props.id;
  if (props.href) a.href = props.href;
  if (props.target) a.target = props.target;
  if (props.title) a.title = props.title;
  if (props.download) a.download = props.download;
  if (props.rel) a.rel = props.rel;
  if (props.onClick) a.addEventListener('click', props.onClick);

  return a;
};

export const Image = (props: {
  id?: string;
  src?: string;
  title?: string;
  className?: string;
  onClick?: (this: HTMLImageElement, ev: MouseEvent) => void;
}): HTMLImageElement => {
  const img: HTMLImageElement = document.createElement('img');
  if (!props) return img;
  if (props.className) {
    img.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.src) img.src = props.src;
  if (props.id) img.id = props.id;
  if (props.title) img.title = props.title;
  if (props.onClick) img.addEventListener('click', props.onClick);

  return img;
};

export const TableHeader = (props: {
  id?: string;
  className?: string;
}): HTMLTableSectionElement => {
  const thead: HTMLTableSectionElement = document.createElement('thead');
  if (!props) return thead;
  if (props.className) {
    thead.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.id) thead.id = props.id;

  return thead;
};
export const TableBody = (props: {
  id?: string;
  className?: string;
}): HTMLTableSectionElement => {
  const tbody: HTMLTableSectionElement = document.createElement('tbody');
  if (!props) return tbody;
  if (props.className) {
    tbody.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.id) tbody.id = props.id;

  return tbody;
};
export const TableHeaderCell = (props: {
  id?: string;
  className?: string;
  text?: string;
}): HTMLTableCellElement => {
  const th: HTMLTableCellElement = document.createElement('th');
  if (!props) return th;
  if (props.className) {
    th.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.id) th.id = props.id;
  if (props.text) th.innerHTML = props.text;

  return th;
};
export const TableRow = (props: {
  id?: string;
  className?: string;
}): HTMLTableRowElement => {
  const tr: HTMLTableRowElement = document.createElement('tr');
  if (!props) return tr;
  if (props.className) {
    tr.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.id) tr.id = props.id;

  return tr;
};
export const TableData = (props: {
  id?: string;
  className?: string;
  text?: string;
}): HTMLTableCellElement => {
  const td: HTMLTableCellElement = document.createElement('td');
  if (!props) return td;
  if (props.className) {
    td.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.id) td.id = props.id;
  if (props.text) td.innerHTML = props.text;

  return td;
};
