import { Info } from '../types.ts';
import { Div, Image, Link, Paragraph } from '../components.ts';
import { setText } from './text.ts';
import { deleteFile, handleRenameFile } from './files.ts';

const locationsContainer: HTMLDivElement = document.getElementById(
  'locations',
) as HTMLDivElement;
const filesContainer: HTMLDivElement = document.getElementById(
  'files',
) as HTMLDivElement;
const textarea: HTMLTextAreaElement = document.querySelector(
  'textarea',
) as HTMLTextAreaElement;

function getLocationContainer(location: string, port: number): HTMLDivElement {
  const container: HTMLDivElement = Div({
    className: 'location',
  });
  const qr: HTMLImageElement = Image({
    src: `/qrcodes/${location}_${port}.png`,
  });
  const ip: HTMLParagraphElement = Paragraph({ text: `${location}:${port}` });
  container.append(qr, ip);
  return container;
}

function renderFile(file: string): void {
  const container: HTMLDivElement = Div({
    className: 'file',
  });
  container.classList.add('file');
  const fileLink: HTMLAnchorElement = Link({
    className: 'file-link',
    href: `/files/${file}`,
    target: '_blank',
    text: file,
    title: 'Open file',
  });
  const buttonsContainer: HTMLDivElement = Div({
    className: 'buttons',
  });
  const downloadLink: HTMLAnchorElement = Link({
    className: 'btn file-btn',
    href: `/files/${file}`,
    download: file,
    text: '&#x2193;',
    title: 'Download file',
  });
  const renameBtn: HTMLDivElement = Div({
    className: 'btn file-btn',
    text: '&#9998;',
    title: 'Rename file',
    onClick: (e: MouseEvent) => handleRenameFile(e, file),
  });
  const deleteLink: HTMLDivElement = Div({
    className: 'delete btn file-btn',
    text: '&#10005;',
    title: 'Delete file',
    onClick: (e: MouseEvent) => deleteFile(e, file),
  });
  buttonsContainer.append(downloadLink, renameBtn, deleteLink);
  container.append(fileLink, buttonsContainer);
  filesContainer.appendChild(container);
}

function renderFiles(files: string[]): void {
  filesContainer.innerText = '';
  if (files.length) {
    files.forEach(renderFile);
  } else {
    const container: HTMLParagraphElement = Paragraph({
      text: 'No files uploaded yet',
    });
    filesContainer.appendChild(container);
  }
}

export async function updateHeader(): Promise<void> {
  const data: Response = await fetch('/info');
  const info: Info = await data.json();

  document.querySelectorAll('.location').forEach((location: Element): void =>
    location.remove()
  );
  info.locations.forEach((location: string): void => {
    locationsContainer.appendChild(
      getLocationContainer(location, info.port),
    );
  });

  document.querySelectorAll('.file').forEach((location: Element): void =>
    location.remove()
  );
  renderFiles(info.files);
  if (info.text.length) {
    textarea.value = info.text;
    textarea.dispatchEvent(new Event('input'));
    setText(info.text);
  }
}
