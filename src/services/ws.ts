import { FileEntry } from '../types.ts';
import { setSharedContent } from './files.ts';

type ClientMessage = { event: 'text'; data: string };

const clients: Set<WebSocket> = new Set();

export const addClient = (ws: WebSocket): void => {
  clients.add(ws);
  ws.onmessage = async (e: MessageEvent): Promise<void> => {
    const msg: ClientMessage = JSON.parse(e.data);
    if (msg.event === 'text') {
      await setSharedContent(msg.data);
      clients.forEach((client) => {
        if (client !== ws) send(client, 'text', msg.data);
      });
    }
  };
  ws.onclose = (): void => {
    clients.delete(ws);
  };
};

const send = (ws: WebSocket, event: string, data: unknown): void => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ event, data }));
  }
};

export const broadcastFiles = (files: FileEntry[]): void => {
  clients.forEach((ws) => send(ws, 'files', files));
};

export const broadcastText = (text: string): void => {
  clients.forEach((ws) => send(ws, 'text', text));
};
