import { setFiles } from '../state/files.ts';
import { updateNote } from './notes.ts';
import { renderFiles } from './table.ts';
import { setQRs } from '../state/qrs.ts';
import type { FileEntry, Info } from '../types.ts';

type WsMessage =
  | { event: 'files'; data: FileEntry[] }
  | { event: 'text'; data: string };

type ClientMessage = { event: 'text'; data: string };

const RECONNECT_DELAY_MS = 3000;

let socket: WebSocket | null = null;

export const sendText = (text: string): void => {
  if (socket?.readyState === WebSocket.OPEN) {
    const msg: ClientMessage = { event: 'text', data: text };
    socket.send(JSON.stringify(msg));
  }
};

const connect = (): void => {
  socket = new WebSocket(`ws://${globalThis.location.host}/ws`);

  socket.onmessage = (e: MessageEvent): void => {
    const msg: WsMessage = JSON.parse(e.data);
    if (msg.event === 'files') {
      setFiles(msg.data);
      renderFiles();
    } else if (msg.event === 'text') {
      updateNote(msg.data);
    }
  };

  socket.onclose = (): void => {
    socket = null;
    setTimeout(connect, RECONNECT_DELAY_MS);
  };
};

export const initWs = async (): Promise<void> => {
  const data = await fetch('/info');
  const info = await data.json() as Info;

  setQRs(info.locations);
  setFiles(info.files);
  updateNote(info.text);
  renderFiles();

  connect();
};
