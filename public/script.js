let text = '';

function getLocationContainer(location, port) {
  const container = document.createElement('div');
  container.classList.add('location');
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
    const container = document.createElement('div');
    container.classList.add('file');
    const fileLink = document.createElement('a');
    fileLink.classList.add('file-link');
    fileLink.href = `/files/${file}`;
    fileLink.target = '_blank';
    fileLink.innerText = file;
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons');
    const downloadLink = document.createElement('a');
    downloadLink.classList.add('btn');
    downloadLink.href = `/files/${file}`;
    downloadLink.download = file;
    downloadLink.innerHTML = '&#8681;';
    const deleteLink = document.createElement('a');
    deleteLink.classList.add('delete', 'btn');
    deleteLink.innerHTML = 'x';
    deleteLink.addEventListener('click', async (e) => {
      e.preventDefault();
      const res = await fetch(`/${file}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const { status, message } = await res.json();
        alert(`Got an Error with status ${status} and message ${message}`);
      }
      updateHeader();
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
      alert('File uploaded');
    } else {
      const { status, message } = await res.json();
      alert(`Got an Error with status ${status} and message ${message}`);
    }
  } catch (error) {
    console.error(error);
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
      const { status, message } = await res.json();
      alert(`Got an Error with status ${status} and message ${message}`);
    }
  } catch (error) {
    console.error(error);
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
    if (text === pastedData) {
      return;
    }
    await uploadText(pastedData);
  }
}

function initTextarea() {
  const element = document.querySelector('textarea');
  element.style.overflowY = 'hidden';

  element.addEventListener('change', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 4 + 'px'; // + borders
  });

  element.addEventListener('focusout', async function (e) {
    if (text !== e.target.value) {
      await uploadText(e.target.value);
    }
  });
}

document.getElementById('file-upload').addEventListener(
  'change',
  handleUploadBySelect,
);

globalThis.addEventListener('paste', handleUploadByPaste);

initTextarea();

updateHeader();
