type Info = {
  locations: string[];
  port: number;
  files: string[];
  text: string;
};
type InputModalProps = {
  headerText: string;
  submitText: string;
  filename: string;
  onSubmit: (param1: string, param2: string) => void;
};

function Div(props: {
  id?: string;
  text?: string;
  className?: string;
  onClick?: (this: HTMLDivElement, ev: MouseEvent) => void;
}): HTMLDivElement {
  const div: HTMLDivElement = document.createElement('div');
  if (!props) return div;
  if (props.className) {
    div.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.text) div.innerHTML = props.text;
  if (props.id) div.id = props.id;
  if (props.onClick) div.addEventListener('click', props.onClick);

  return div;
}
function Paragraph(props: {
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
function Link(props: {
  id?: string;
  text?: string;
  href?: string;
  target?: string;
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
  if (props.download) a.download = props.download;
  if (props.onClick) a.addEventListener('click', props.onClick);

  return a;
}

class Snackbar {
  timer: number | undefined;
  component: HTMLElement | null = null;
  messages: string[] = [];
  TIME_TO_HIDE: number = 3 * 1000;

  _startTimer(): void {
    this.timer = setTimeout(() => this._closeHandler(), this.TIME_TO_HIDE);
  }

  _clearTimer(): void {
    clearTimeout(this.timer);
    delete this.timer;
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
    this.component && this.component.remove();
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
    this.dialog.addEventListener('close', (): void => {
      this.dialog.innerHTML = '';
    });
    this.dialog.addEventListener('click', (e: MouseEvent): void => {
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
const locationsContainer: HTMLDivElement = document.getElementById(
  'locations',
) as HTMLDivElement;
const filesContainer: HTMLDivElement = document.getElementById(
  'files',
) as HTMLDivElement;
const uploadFileInput: HTMLInputElement = document.getElementById(
  'file-upload',
) as HTMLInputElement;
const copyTextBtn: HTMLParagraphElement = document.getElementById(
  'copy-text',
) as HTMLParagraphElement;
const textarea: HTMLTextAreaElement = document.querySelector(
  'textarea',
) as HTMLTextAreaElement;

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

function inputModal({
  headerText,
  submitText,
  filename,
  onSubmit,
}: InputModalProps): HTMLDivElement {
  const container: HTMLDivElement = Div({
    className: 'container modal-container',
  });

  const header: HTMLHeadingElement = document.createElement('h2');
  header.innerText = headerText;

  const buttons: HTMLDivElement = Div({
    className: 'buttons',
  });
  const input: HTMLInputElement = document.createElement('input');
  input.type = 'text';
  input.value = filename;
  buttons.append(
    Div({
      className: 'btn',
      text: submitText,
      onClick: () => onSubmit(input.value, filename),
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
      onSubmit(input.value, filename);
    }
  });
  return container;
}

function uploadFileModal(
  filename: string,
  onSubmit: (param1: string) => void,
): HTMLDivElement {
  return inputModal({
    headerText: "Uploaded file's name:",
    submitText: 'Upload',
    filename,
    onSubmit,
  });
}

function renameFileModal(
  filename: string,
  onSubmit: (param1: string, param2: string) => void,
): HTMLDivElement {
  return inputModal({
    headerText: 'Rename file:',
    submitText: 'Rename',
    filename,
    onSubmit,
  });
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
        className: 'btn file-btn',
        href: `/files/${file}`,
        download: file,
        text: '&#x2193;',
      });
      const renameBtn: HTMLDivElement = Div({
        className: 'btn file-btn',
        text: '&#9998;',
        onClick: (e: MouseEvent) => handleRenameFile(e, file),
      });
      const deleteLink: HTMLDivElement = Div({
        className: 'delete btn file-btn',
        text: '&#10005;',
        onClick: (e: MouseEvent) => deleteFile(e, file),
      });
      buttonsContainer.append(downloadLink, renameBtn, deleteLink);
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

  document.querySelectorAll('.file').forEach((location: Element): void =>
    location.remove()
  );
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
    } else {
      const { status, message }: { status: number; message: string } = await res
        .json();
      console.warn(`Error with status ${status} and message ${message}`);
      snackbar.displayMsg(message);
    }
  } catch (error) {
    console.error(error);
    snackbar.displayMsg('Error while uploading file.');
  }
}

function askForUpload(file: File): void {
  const onSubmit = async (newFilename: string): Promise<void> => {
    const fileToUpload: File = file.name === newFilename
      ? file
      : new File([file], newFilename, { type: file.type });
    await uploadFile(fileToUpload);
    updateHeader();
  };
  modal.showModal(uploadFileModal(file.name, onSubmit));
}

async function uploadText(value: string): Promise<void> {
  const formData = new FormData();
  formData.append('text', value.trim());

  try {
    const res: Response = await fetch('/', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const { status, message }: { status: number; message: string } = await res
        .json();
      snackbar.displayMsg(
        `Got an Error with status ${status} and message ${message}`,
      );
    }
  } catch (error) {
    console.error(error);
  }

  updateHeader();
}

async function renameFile(newValue: string, oldValue: string): Promise<void> {
  if (!newValue.trim()) {
    snackbar.displayMsg('Provide file name');
    return;
  }
  if (newValue.trim().toLocaleLowerCase() === oldValue.toLocaleLowerCase()) {
    snackbar.displayMsg("Name wasn't change");
    return;
  }
  const res: Response = await fetch(`/${oldValue}`, {
    method: 'PUT',
    body: JSON.stringify({ name: newValue }),
  });
  if (res.ok) {
    snackbar.displayMsg('File renamed');
    modal.hideModal();
    updateHeader();
  } else {
    const { status, message }: { status: number; message: string } = await res
      .json();
    snackbar.displayMsg(`Error with status ${status} and message ${message}`);
  }
}

async function deleteFile(e: Event, file: string): Promise<void> {
  e.preventDefault();
  const res: Response = await fetch(`/${file}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const { status, message }: { status: number; message: string } = await res
      .json();
    snackbar.displayMsg(`Error with status ${status} and message ${message}`);
  } else {
    snackbar.displayMsg('File deleted');
  }
  updateHeader();
}

function handleUploadBySelect(): void {
  const files: FileList = uploadFileInput.files as FileList;
  if (files[0]) {
    askForUpload(files[0]);

    uploadFileInput.value = '';
  }
}

function handleRenameFile(e: Event, file: string): void {
  e.preventDefault();

  modal.showModal(renameFileModal(file, renameFile));
}

async function handleUploadByPaste(e: ClipboardEvent): Promise<void> {
  e.stopPropagation();
  e.preventDefault();

  const clipboardData: DataTransfer = e.clipboardData as DataTransfer;

  if (clipboardData.files.length) {
    askForUpload(clipboardData.files[0]);
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

function initDragAndDrop(): void {
  const uploadButton: HTMLLabelElement = document.querySelector(
    '.file-upload-label',
  ) as HTMLLabelElement;
  const dragOverlay: HTMLDivElement = document.getElementById(
    'overlay',
  ) as HTMLDivElement;
  let dragCounter: number = 0;

  document.addEventListener('dragenter', (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    uploadButton.innerText = 'Release to upload';
    dragOverlay.style.display = 'block';
    uploadButton.classList.add('upload-label-drag');
  });

  document.addEventListener('dragover', (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  });
  document.addEventListener('dragleave', (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;
    if (dragCounter === 0) {
      uploadButton.innerText = 'Select File';
      uploadButton.classList.remove('upload-label-drag');
      dragOverlay.style.display = 'none';
    }
  });

  document.addEventListener('drop', async (e: DragEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    uploadButton.innerText = 'Select File';
    uploadButton.classList.remove('upload-label-drag');
    dragOverlay.style.display = 'none';

    const dragData: DataTransfer = e.dataTransfer as DataTransfer;

    if (dragData.files.length) {
      askForUpload(dragData.files[0]);
    } else {
      const pastedData = dragData.getData('text');
      if (text !== pastedData) await uploadText(pastedData);
    }
  });
}

uploadFileInput.addEventListener(
  'change',
  handleUploadBySelect,
);

globalThis.addEventListener('paste', handleUploadByPaste);

initTextarea();

initDragAndDrop();

updateHeader();
