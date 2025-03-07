let text = '';

const Div = (props) => {
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
const Paragraph = (props) => {
  const div = document.createElement('p');
  if (!props) return div;
  if (props.className) {
    div.classList.add(...props.className.split(' ').filter(Boolean));
  }
  if (props.text) div.innerHTML = props.text;
  if (props.id) div.id = props.id;

  return div;
};
const Link = (props) => {
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
  constructor() {
    this.timer = null;
    this.component = null;
    this.messages = [];
    this.TIME_TO_HIDE = 3 * 1000;
  }

  _startTimer() {
    this.timer = setTimeout(() => this._closeHandler(), this.TIME_TO_HIDE);
  }

  _clearTimer() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  _showMessage(msg) {
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

  _closeHandler() {
    this.messages.shift();
    this.component.remove();
    this.component = null;
    this._clearTimer();

    if (this.messages.length) {
      this._showMessage(this.messages[0]);
    }
  }

  displayMsg(msg) {
    this.messages.push(msg);
    if (!this.component) {
      this._showMessage(msg);
    }
  }
}

class Modal {
  constructor() {
    this.dialog = document.querySelector('dialog');
    this.dialog.addEventListener('close', (e) => {
      e.target.innerHTML = '';
    });
    this.dialog.addEventListener('click', (e) => {
      const dialogDimensions = this.dialog.getBoundingClientRect();
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

  showModal(modal) {
    this.dialog.innerText = '';
    this.dialog.appendChild(modal);
    this.dialog.showModal();
  }

  hideModal() {
    this.dialog.innerText = '';
    this.dialog.close();
  }
}

const modal = new Modal();
const snackbar = new Snackbar();

function getLocationContainer(location, port) {
  const container = Div({
    className: 'location',
  });
  const qr = document.createElement('img');
  qr.src = `/qrcodes/${location}_${port}.png`;
  const ip = Paragraph({text: `${location}:${port}`});
  container.append(qr, ip);
  return container;
}

function uploadFileModal(filename, onSubmit) {
  const container = Div({
    className: 'container modal-container',
  });

  const header = document.createElement('h2');
  header.innerText = "Uploaded file's name:";

  const buttons = Div({
    className: 'buttons',
  });
  const input = document.createElement('input');
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
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      onSubmit(input.value);
    }
  });
  return container;
}

function renderFiles(files) {
  const filesContainer = document.getElementById('files');
  filesContainer.innerText = '';
  if (files.length) {
    files.forEach((file) => {
      const container = Div({
        className: 'file',
      });
      container.classList.add('file');
      const fileLink = Link({
        className: 'file-link',
        href: `/files/${file}`,
        target: '_blank',
        text: file,
      });
      const buttonsContainer = Div({
        className: 'buttons',
      });
      const downloadLink = Link({
        className: 'btn',
        href: `/files/${file}`,
        download: file,
        text: '&#8681;',
      });
      const deleteLink = Link({
        className: 'delete btn',
        text: 'x',
        onClick: (e) => handleDeleteFile(e, file),
      });
      buttonsContainer.append(downloadLink, deleteLink);
      container.append(fileLink, buttonsContainer);
      filesContainer.appendChild(container);
    });
  } else {
    const container = Paragraph({
      text: 'No files uploaded yet',
    });
    filesContainer.appendChild(container);
  }
}

async function updateHeader() {
  const data = await fetch('/info');
  const info = await data.json();

  document.querySelectorAll('.location').forEach((location) =>
    location.remove()
  );
  info.locations.forEach((location) => {
    document.getElementById('locations').appendChild(
      getLocationContainer(location, info.port),
    );
  });

  document.querySelectorAll('.file').forEach((location) => location.remove());
  renderFiles(info.files);
  if (info.text.length) {
    const textarea = document.querySelector('textarea');
    textarea.value = info.text;
    textarea.dispatchEvent(new Event('input'));
    text = info.text;
  }
}

async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch('/', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      snackbar.displayMsg('File uploaded successfully.');
      modal.hideModal();
      updateHeader();
    } else {
      const {status, message} = await res.json();
      console.warn(`Error with status ${status} and message ${message}`);
      snackbar.displayMsg(message);
    }
  } catch (error) {
    console.error(error);
    snackbar.displayMsg('Error while uploading file.');
  }
}

function askForUpload(file) {
  const onSubmit = (newFilename) => {
    if (file.name === newFilename) {
      uploadFile(file);
    } else {
      uploadFile(new File([file], newFilename, {type: file.type}));
    }
  };
  modal.showModal(uploadFileModal(file.name, onSubmit));
}

async function uploadText(value) {
  const formData = new FormData();
  formData.append('text', value);

  try {
    const res = await fetch('/', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const {status, message} = await res.json();
      snackbar.displayMsg(
        `Got an Error with status ${status} and message ${message}`,
      );
    }
  } catch (error) {
    console.error(error);
  }

  updateHeader();
}

async function handleDeleteFile(e, file) {
  e.preventDefault();
  const res = await fetch(`/${file}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const {status, message} = await res.json();
    snackbar.displayMsg(`Error with status ${status} and message ${message}`);
  } else {
    snackbar.displayMsg('File deleted');
  }
  updateHeader();
}

async function handleUploadBySelect(e) {
  const input = e.target;

  if (input.files[0]) {
    await askForUpload(input.files[0]);

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

function initTextarea() {
  const element = document.querySelector('textarea');

  element.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight > 240
      ? '244px'
      : this.scrollHeight + 4 + 'px'; // + borders
  });

  element.addEventListener('focusout', async function (e) {
    if (text !== e.target.value) await uploadText(e.target.value);
  });

  document.getElementById('copy-text').addEventListener(
    'click',
    () =>  navigator.clipboard.writeText(element.value),
  );
}

document.getElementById('file-upload').addEventListener(
  'change',
  handleUploadBySelect,
);

globalThis.addEventListener('paste', handleUploadByPaste);

initTextarea();

updateHeader();
