type Info = {
  locations: string[];
  port: number;
  files: string[];
  text: string;
};

const Div = (props: {
  id?: string;
  text?: string;
  className?: string;
  onClick?: (this:HTMLDivElement, ev: MouseEvent) => void;
}): HTMLDivElement => {
  const div = document.createElement('div');
  if (!props) return div;
  if (props.className) {
    div.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.text) div.innerHTML = props.text;
  if (props.id) div.id = props.id;
  if (props.onClick) div.addEventListener('click', props.onClick);

  return div;
};
const Paragraph = (props: {
  id?: string;
  text?: string;
  className?: string;
}): HTMLParagraphElement => {
  const div = document.createElement('p');
  if (!props) return div;
  if (props.className) {
    div.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.text) div.innerHTML = props.text;
  if (props.id) div.id = props.id;

  return div;
};
const Link = (props: {
  id?: string;
  text?: string;
  href?: string;
  target?: string;
  download?: string;
  className?: string;
  onClick?: (this:HTMLAnchorElement, ev: MouseEvent) => void;
}): HTMLAnchorElement => {
  const a = document.createElement('a');
  if (!props) return a;
  if (props.className) {
    a.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.text) a.innerHTML = props.text;
  if (props.id) a.id = props.id;
  if (props.href) a.href = props.href;
  if (props.target) a.target = props.target;
  if (props.download) a.download = props.download;
  if (props.onClick) a.addEventListener('click', props.onClick);

  return a;
};

class Snackbar {
  timer: number | null | undefined = null;
  component: HTMLElement | null = null;
  messages: string[] = [];
  TIME_TO_HIDE: number = 3 * 1000;

  _startTimer(): void {
    this.timer = setTimeout(() => this._closeHandler(), this.TIME_TO_HIDE);
  }

  _clearTimer(): void {
    clearTimeout(this.timer);
    this.timer = null;
  }

  _showMessage(msg: string): void {
    const component = Div({
      className: 'snackbar-container',
    });
    component.append(
      Div({
        className: 'snackbar-label',
        text: msg,
      }),
      Div({
        className: 'snackbar-dismiss',
        text: '&times;',
        onClick: () => this._closeHandler(),
      }),
    );

    component.addEventListener('mouseleave', () => this._startTimer());
    component.addEventListener('mouseenter', () => this._clearTimer());
    component.addEventListener('touchend', () => this._startTimer());
    component.addEventListener('touchstart', () => this._clearTimer());

    this._startTimer();
    document.body.appendChild(component);
    this.component = component;
  }

  _closeHandler(): void {
    this.messages.shift();
    this.component.remove();
    this.component = null;
    this._clearTimer();

    if (this.messages.length) {
      this._showMessage(this.messages[0]);
    }
  }

  displayMsg(msg: string): void {
    this.messages.push(msg);
    if (!this.component) {
      this._showMessage(msg);
    }
  }
}

class Modal {
  dialog: HTMLDialogElement;
  constructor() {
    this.dialog = document.querySelector('dialog') as HTMLDialogElement;
    this.dialog.addEventListener('close', (e): void => {
      e.target.innerHTML = '';
    });
    this.dialog.addEventListener('click', (e): void => {
      const dialogDimensions: DOMRect = this.dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        this.dialog.close();
      }
    });
  }

  showModal(modal: HTMLElement): void {
    this.dialog.innerText = '';
    this.dialog.appendChild(modal);
    this.dialog.showModal();
  }

  hideModal(): void {
    this.dialog.innerText = '';
    this.dialog.close();
  }
}

let text: string = '';

const modal: Modal = new Modal();
const snackbar: Snackbar = new Snackbar();
const locationsContainer: HTMLDivElement = document.getElementById('locations') as HTMLDivElement;
const filesContainer: HTMLDivElement = document.getElementById('files') as HTMLDivElement;
const uploadFileInput: HTMLInputElement = document.getElementById('file-upload') as HTMLInputElement;
const copyTextBtn: HTMLParagraphElement = document.getElementById('copy-text') as HTMLParagraphElement;
const textarea: HTMLTextAreaElement = document.querySelector('textarea') as HTMLTextAreaElement;

function getLocationContainer(location: string, port: number): HTMLDivElement {
  const container: HTMLDivElement = Div({
    className: 'location',
  });
  const qr: HTMLImageElement = document.createElement('img');
  qr.src = `/qrcodes/${location}_${port}.png`;
  const ip: HTMLParagraphElement = Paragraph({ text: `${location}:${port}` });
  container.append(qr, ip);
  return container;
}

function uploadFileModal(filename: string, onSubmit: (param1: string) => void): HTMLDivElement {
  const container: HTMLDivElement = Div({
    className: 'container modal-container',
  });

  const header: HTMLHeadingElement = document.createElement('h2');
  header.innerText = "Uploaded file's name:";

  const buttons: HTMLDivElement = Div({
    className: 'buttons',
  });
  const input: HTMLInputElement = document.createElement('input');
  input.type = 'text';
  input.value = filename;
  buttons.append(
    Div({
      className: 'btn',
      text: 'Upload',
      onClick: () => onSubmit(input.value),
    }),
    Div({
      className: 'btn',
      text: 'Cancel',
      onClick: () => modal.hideModal(),
    }),
  );
  container.append(header, input, buttons);
  input.focus();
  input.addEventListener('keypress', (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      onSubmit(input.value);
    }
  });
  return container;
}

function renderFiles(files: string[]): void {
  filesContainer.innerText = '';
  if (files.length) {
    files.forEach((file: string): void => {
      const container: HTMLDivElement = Div({
        className: 'file',
      });
      container.classList.add('file');
      const fileLink: HTMLAnchorElement = Link({
        className: 'file-link',
        href: `/files/${file}`,
        target: '_blank',
        text: file,
      });
      const buttonsContainer: HTMLDivElement = Div({
        className: 'buttons',
      });
      const downloadLink: HTMLAnchorElement = Link({
        className: 'btn',
        href: `/files/${file}`,
        download: file,
        text: '&#8681;',
      });
      const deleteLink: HTMLAnchorElement = Link({
        className: 'delete btn',
        text: 'x',
        onClick: (e: MouseEvent) => handleDeleteFile(e, file),
      });
      buttonsContainer.append(downloadLink, deleteLink);
      container.append(fileLink, buttonsContainer);
      filesContainer.appendChild(container);
    });
  } else {
    const container: HTMLParagraphElement = Paragraph({
      text: 'No files uploaded yet',
    });
    filesContainer.appendChild(container);
  }
}

async function updateHeader(): Promise<void> {
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

  document.querySelectorAll('.file').forEach((location: Element): void => location.remove());
  renderFiles(info.files);
  if (info.text.length) {
    textarea.value = info.text;
    textarea.dispatchEvent(new Event('input'));
    text = info.text;
  }
}

async function uploadFile(file: FormDataEntryValue): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res: Response = await fetch('/', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      snackbar.displayMsg('File uploaded successfully.');
      modal.hideModal();
      updateHeader();
    } else {
      const { status, message }: { status: number, message: string } = await res.json();
      console.warn(`Error with status ${status} and message ${message}`);
      snackbar.displayMsg(message);
    }
  } catch (error) {
    console.error(error);
    snackbar.displayMsg('Error while uploading file.');
  }
}

function askForUpload(file: File): void {
  const onSubmit = (newFilename: string): void => {
    if (file.name === newFilename) {
      uploadFile(file);
    } else {
      uploadFile(new File([file], newFilename, { type: file.type }));
    }
  };
  modal.showModal(uploadFileModal(file.name, onSubmit));
}

async function uploadText(value: string): Promise<void> {
  const formData = new FormData();
  formData.append('text', value);

  try {
    const res: Response = await fetch('/', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const { status, message }: { status: number, message: string } = await res.json();
      snackbar.displayMsg(
        `Got an Error with status ${status} and message ${message}`,
      );
    }
  } catch (error) {
    console.error(error);
  }

  updateHeader();
}

async function handleDeleteFile(e: Event, file: string): Promise<void> {
  e.preventDefault();
  const res: Response = await fetch(`/${file}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const { status, message }: { status: number, message: string } = await res.json();
    snackbar.displayMsg(`Error with status ${status} and message ${message}`);
  } else {
    snackbar.displayMsg('File deleted');
  }
  updateHeader();
}

async function handleUploadBySelect(): Promise<void> {
  if (uploadFileInput.files[0]) {
    await askForUpload(uploadFileInput.files[0]);

    input.value = null;
  }
}

async function handleUploadByPaste(e) {
  e.stopPropagation();
  e.preventDefault();

  const clipboardData = e.clipboardData;

  if (clipboardData.files.length) {
    await askForUpload(clipboardData.files[0]);
  } else {
    const pastedData = clipboardData.getData('text');
    if (text !== pastedData) await uploadText(pastedData);
  }
}

function initTextarea(): void {
  textarea.addEventListener('input', function (): void {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight > 240
      ? '244px'
      : textarea.scrollHeight + 4 + 'px'; // + borders
  });

  textarea.addEventListener('focusout', async function (): Promise<void> {
    if (text !== textarea.value) await uploadText(textarea.value);
  });

  copyTextBtn.addEventListener(
    'click',
    async (): Promise<void> => {
      textarea.focus();
      textarea.select();
      await navigator.clipboard.writeText(textarea.value);
    },
  );
}

uploadFileInput.addEventListener(
  'change',
  handleUploadBySelect,
);

globalThis.addEventListener('paste', handleUploadByPaste);

initTextarea();

updateHeader();
