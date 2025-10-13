import { COLUMN_KEYS } from './table.ts';
import { formatBytes } from '../helpers.ts';
import {
  deleteFiles,
  downloadFile,
  handleRenameFile,
} from '../features/files.ts';
import { handleRowSelect, handleSelectAll } from '../state/files.ts';
import { Div, Input, Link, TableData } from '../components.ts';

import type { FileEntry, TableColumnConfig } from '../types.ts';

const TABLE_CONFIG: TableColumnConfig[] = [
  {
    key: COLUMN_KEYS.CHECKBOX,
    renderHeaderData: (): HTMLElement =>
      Input({
        type: 'checkbox',
        id: 'select-all-checkbox',
        onChange: (e: Event): void => {
          const target: HTMLInputElement = e.target as HTMLInputElement;
          const checkboxes: NodeListOf<HTMLInputElement> = document
            .querySelectorAll<HTMLInputElement>(
              'input[type=checkbox].row-select',
            );
          checkboxes.forEach((cb: HTMLInputElement): void => {
            cb.checked = target.checked;
          });
          handleSelectAll(
            Array.from(checkboxes).map((cb) => cb.dataset.filename!),
            target.checked,
          );
        },
      }),
    renderColumnData: (file: FileEntry): HTMLTableCellElement => {
      const td: HTMLTableCellElement = TableData();
      const checkbox: HTMLInputElement = Input({
        type: 'checkbox',
        className: 'row-select',
        onChange: (): void => {
          const allCheckbox: HTMLInputElement = document.getElementById<
            HTMLInputElement
          >(
            'select-all-checkbox',
          );
          const checkboxes: NodeListOf<HTMLInputElement> = document
            .querySelectorAll('.row-select');
          allCheckbox.checked = Array.from(checkboxes).every((
            cb: HTMLInputElement,
          ) => cb.checked);
          handleRowSelect(file.name, checkbox.checked);
        },
      });
      checkbox.setAttribute('data-filename', file.name);
      td.appendChild(checkbox);
      return td;
    },
  },
  {
    key: COLUMN_KEYS.NAME,
    sortable: true,
    grow: true,
    minWidth: '200px',
    renderColumnData: (file: FileEntry): HTMLTableCellElement => {
      const td: HTMLTableCellElement = TableData();
      td.appendChild(Link({
        href: `/files/${encodeURIComponent(file.name)}`,
        text: file.name,
        className: 'file-link',
        target: '_blank',
        rel: 'noopener noreferrer',
      }));
      return td;
    },
  },
  {
    key: COLUMN_KEYS.SIZE,
    sortable: true,
    minWidth: '100px',
    renderColumnData: (file: FileEntry): HTMLTableCellElement =>
      TableData({ text: formatBytes(file.size || 0) }),
  },
  {
    key: COLUMN_KEYS.TYPE,
    sortable: true,
    minWidth: '56px',
    renderColumnData: (file: FileEntry): HTMLTableCellElement =>
      TableData({ text: file.size ? file.type : '—' }),
  },
  {
    key: COLUMN_KEYS.CREATED,
    sortable: true,
    minWidth: '200px',
    renderColumnData: (file: FileEntry): HTMLTableCellElement =>
      TableData({
        text: file.created ? new Date(file.created).toLocaleString() : '—',
      }),
  },
  {
    key: COLUMN_KEYS.ACTIONS,
    minWidth: '113px',
    renderColumnData: (file: FileEntry): HTMLTableCellElement => {
      const td: HTMLTableCellElement = TableData();
      const buttonContainer: HTMLDivElement = Div({ className: 'buttons' });
      const downloadBtn: HTMLDivElement = Div({
        className: 'btn',
        text: '&#x2B07;',
        onClick: (): void => downloadFile(file.name),
      });
      const renameBtn: HTMLDivElement = Div({
        className: 'btn',
        text: '&#9998;',
        onClick: (): void => handleRenameFile(file.name),
      });
      const deleteBtn: HTMLDivElement = Div({
        className: 'btn',
        text: '&#x1F5D1;',
        onClick: (): void => deleteFiles([file.name]),
      });
      buttonContainer.append(downloadBtn, renameBtn, deleteBtn);
      td.appendChild(buttonContainer);
      return td;
    },
  },
];

export default TABLE_CONFIG;
