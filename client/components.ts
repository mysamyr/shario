export function Div(props: {
  id?: string;
  text?: string;
  title?: string;
  className?: string;
  onClick?: (this: HTMLDivElement, ev: MouseEvent) => void;
}): HTMLDivElement {
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
}

export function Header(props: {
  lvl: number;
  id?: string;
  text?: string;
  className?: string;
}): HTMLHeadingElement {
  const h: HTMLHeadingElement = document.createElement(
    `h${props.lvl}`,
  ) as HTMLHeadingElement;
  if (props.className) {
    h.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.text) h.innerHTML = props.text;
  if (props.id) h.id = props.id;

  return h;
}

export function Paragraph(props: {
  id?: string;
  text?: string;
  className?: string;
}): HTMLParagraphElement {
  const p: HTMLParagraphElement = document.createElement('p');
  if (!props) return p;
  if (props.className) {
    p.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.text) p.innerHTML = props.text;
  if (props.id) p.id = props.id;

  return p;
}

export function Input(props: {
  id?: string;
  type?: string;
  value?: string;
  title?: string;
  className?: string;
  onClick?: (this: HTMLInputElement, ev: MouseEvent) => void;
  onChange?: (this: HTMLInputElement, ev: Event) => void;
}): HTMLInputElement {
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
}
export function Link(props: {
  id?: string;
  text?: string;
  href?: string;
  target?: string;
  title?: string;
  download?: string;
  className?: string;
  onClick?: (this: HTMLAnchorElement, ev: MouseEvent) => void;
}): HTMLAnchorElement {
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
  if (props.onClick) a.addEventListener('click', props.onClick);

  return a;
}

export function Image(props: {
  id?: string;
  src?: string;
  title?: string;
  className?: string;
  onClick?: (this: HTMLImageElement, ev: MouseEvent) => void;
}): HTMLImageElement {
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
}
