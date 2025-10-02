import { FileEntry, Info } from '../types.ts';
import { Div, Image, Link, Paragraph } from '../components.ts';
import { getText, setText } from './text.ts';
import { deleteFile, handleRenameFile } from './files.ts';
import { getLanguage, translations } from './language.ts';

const locationsContainer: HTMLDivElement = document.getElementById(
  'locations',
) as HTMLDivElement;
const filesContainer: HTMLDivElement = document.getElementById(
  'files',
) as HTMLDivElement;
const textarea: HTMLTextAreaElement = document.getElementById(
  'share-text',
) as HTMLTextAreaElement;

function renderLocation(location: string, port: string): void {
  const container: HTMLDivElement = Div({
    className: 'location',
  });
  const qr: HTMLImageElement = Image({
    src: `/qrcodes/${location}_${port}.png`,
  });
  const ip: HTMLParagraphElement = Paragraph({ text: `${location}:${port}` });
  container.append(qr, ip);
  locationsContainer.appendChild(container);
}

function renderLocations(locations: string[], port: string): void {
  locationsContainer.innerText = '';
  if (locations.length) {
    locations.forEach((location: string): void =>
      renderLocation(location, port)
    );
  } else {
    const container: HTMLParagraphElement = Paragraph({
      text: translations[getLanguage()].noLocations,
    });
    locationsContainer.appendChild(container);
  }
}

function renderFile(file: FileEntry): void {
  const container: HTMLDivElement = Div({
    className: 'file',
  });
  const fileLink: HTMLAnchorElement = Link({
    className: 'file-link',
    href: `/files/${file.name}`,
    target: '_blank',
    text: file.name,
    title: translations[getLanguage()].titles.openFile,
  });
  const buttonsContainer: HTMLDivElement = Div({
    className: 'buttons',
  });
  const downloadLink: HTMLAnchorElement = Link({
    className: 'btn file-btn',
    href: `/files/${file.name}`,
    download: file.name,
    text: '&#x2193;',
    title: translations[getLanguage()].titles.downloadFile,
  });
  const renameBtn: HTMLDivElement = Div({
    className: 'btn file-btn',
    text: '&#9998;',
    title: translations[getLanguage()].titles.renameFile,
    onClick: (e: MouseEvent) => handleRenameFile(e, file.name),
  });
  const deleteLink: HTMLDivElement = Div({
    className: 'delete btn file-btn',
    text: '&#10005;',
    title: translations[getLanguage()].titles.deleteFile,
    onClick: (e: MouseEvent) => deleteFile(e, file.name),
  });
  buttonsContainer.append(downloadLink, renameBtn, deleteLink);
  container.append(fileLink, buttonsContainer);
  filesContainer.appendChild(container);
}

function renderFiles(files: FileEntry[]): void {
  filesContainer.innerText = '';
  if (files.length) {
    files.forEach(renderFile);
  } else {
    const container: HTMLParagraphElement = Paragraph({
      id: 'no-files',
      text: translations[getLanguage()].noFilesUploaded,
    });
    filesContainer.appendChild(container);
  }
}

export async function updateHeader(): Promise<void> {
  const data: Response = await fetch('/info');
  const info: Info = await data.json();

  // todo: optimize re-rendering
  renderLocations(info.locations, info.port);
  renderFiles(info.files);

  if (info.text.length && getText() !== info.text) {
    textarea.value = info.text;
    textarea.dispatchEvent(new Event('input'));
    setText(info.text);
  }
}
