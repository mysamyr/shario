let text = '';

const Div = props => {
  const div = document.createElement('div');
  if (!props) return div;
  if (props.className)
    div.classList.add(...props.className.split(' ').filter(Boolean));
  if (props.text) div.innerHTML = props.text;
  if (props.id) div.id = props.id;
  if (props.onClick) div.addEventListener('click', props.onClick);

  return div;
};
const Link = props => {
  const a = document.createElement('a');
  if (!props) return a;
  if (props.className)
    a.classList.add(...props.className.split(' ').filter(Boolean));
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
      })
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

const snackbar = new Snackbar();

function getLocationContainer(location, port) {
  const container = Div({
    className: 'location',
  });
  const qr = document.createElement('img');
  qr.src = `/qrcodes/${location}_${port}.png`;
  const ip = document.createElement('p');
  ip.innerText = `${location}:${port}`;
  container.append(qr, ip);
  return container;
}

function renderFiles(files) {
  const filesContainer = document.getElementById('files');
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
      onClick: (e) => handleDeleteFile(e, file)
    });
    buttonsContainer.append(downloadLink, deleteLink);
    container.append(fileLink, buttonsContainer);
    filesContainer.appendChild(container);
  });
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
  if (info.files.length) {
    renderFiles(info.files);
  }
  if (info.text.length) {
    const textarea = document.querySelector('textarea');
    textarea.value = info.text;
    textarea.dispatchEvent(new Event('change'));
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
    } else {
      const {status, message} = await res.json();
      snackbar.displayMsg(`Error with status ${status} and message ${message}`);
    }
  } catch (error) {
    console.error(error);
    snackbar.displayMsg('Error while uploading file.');
  }

  updateHeader();
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
      snackbar.displayMsg(`Got an Error with status ${status} and message ${message}`);
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
    await uploadFile(input.files[0]);

    input.value = null;
  }
}

async function handleUploadByPaste(e) {
  e.stopPropagation();
  e.preventDefault();

  const clipboardData = e.clipboardData;

  if (clipboardData.files.length) {
    await uploadFile(clipboardData.files[0]);
  } else {
    const pastedData = clipboardData.getData('text');
    if (text !== pastedData) await uploadText(pastedData);
  }
}

async function handleCopyText() {
  const element = document.querySelector('textarea');

  await navigator.clipboard.writeText(element.value);
}

function initTextarea() {
  const element = document.querySelector('textarea');
  element.style.overflowY = 'hidden';

  element.addEventListener('change', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 4 + 'px'; // + borders
  });

  element.addEventListener('focusout', async function (e) {
    if (text !== e.target.value) await uploadText(e.target.value);
  });
}

document.getElementById('file-upload').addEventListener(
  'change',
  handleUploadBySelect,
);

document.getElementById('copy-text').addEventListener(
  'click',
  handleCopyText,
);

globalThis.addEventListener('paste', handleUploadByPaste);

initTextarea();

updateHeader();
