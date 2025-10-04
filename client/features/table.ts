import { downloadFile, handleRenameFile } from './files.ts';
import { FileEntry, TableColumn } from '../types.ts';
import { getFiles, handleRowSelect, handleSelectAll } from '../state/files.ts';
import {
  Div,
  Input,
  Link,
  Span,
  TableBody,
  TableData,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '../components.ts';
import { COLUMN_KEYS } from '../constants/table.ts';
import { getLanguage, translations } from './language.ts';
import { formatBytes, sortFiles } from '../helpers.ts';

// todo make single config for columns and rows
const DEFAULT_TABLE_COLUMNS: TableColumn[] = [
  { key: COLUMN_KEYS.NAME, sortable: true, minWidth: '152px' },
  {
    key: COLUMN_KEYS.SIZE,
    sortable: true,
    minWidth: '75px',
  },
  { key: COLUMN_KEYS.TYPE, sortable: true, minWidth: '56px' },
  {
    key: COLUMN_KEYS.CREATED,
    sortable: true,
    minWidth: '152px',
  },
  {
    key: COLUMN_KEYS.ACTIONS,
  },
];

const selectAllTh = () => {
  const container: HTMLTableCellElement = TableHeaderCell();
  container.style.width = '20px';
  const selectAllCheckbox: HTMLInputElement = Input({
    type: 'checkbox',
    id: 'select-all-checkbox',
    onChange: (): void => {
      const checkboxes: NodeListOf<HTMLInputElement> = document
        .querySelectorAll<HTMLInputElement>(
          'input[type=checkbox].row-select',
        );
      checkboxes.forEach((cb: HTMLInputElement): void => {
        cb.checked = selectAllCheckbox.checked;
      });
      handleSelectAll(
        Array.from(checkboxes).map((cb) => cb.dataset.filename!),
        selectAllCheckbox.checked,
      );
    },
  });
  container.appendChild(selectAllCheckbox);
  return container;
};

export const initTable = (
  defaultSortKey: string = COLUMN_KEYS.NAME,
  tableColumns: TableColumn[] = DEFAULT_TABLE_COLUMNS,
): void => {
  let sortKey: string = defaultSortKey;
  let sortAsc: boolean = true;

  const table: HTMLTableElement = document.querySelector<HTMLTableElement>(
    'table',
  );
  const thead: HTMLTableSectionElement = TableHeader();
  const tbody: HTMLTableSectionElement = TableBody();

  const headerRow: HTMLTableRowElement = TableRow();

  headerRow.appendChild(selectAllTh(tbody));

  const renderHeaderRow = (): void => {
    headerRow.innerHTML = '';
    headerRow.appendChild(selectAllTh(tbody));

    tableColumns.forEach((col) => {
      const th: HTMLTableCellElement = TableHeaderCell();
      const container = Div();
      container.appendChild(
        Span({
          id: `file_${col.key}`,
          text: translations[getLanguage()].table[col.key],
        }),
      );
      if (col.minWidth) th.style.minWidth = col.minWidth;
      if (col.sortable) {
        th.addEventListener('click', () => {
          if (sortKey === col.key) {
            sortAsc = !sortAsc;
          } else {
            sortKey = col.key;
            sortAsc = true;
          }
          renderFiles({ sortKey, sortAsc });
          renderHeaderRow();
        });
      }

      if (sortKey === col.key) {
        container.appendChild(document.createTextNode(sortAsc ? ' ▲' : ' ▼'));
      }

      th.appendChild(container);
      headerRow.appendChild(th);
    });
  };

  renderHeaderRow();

  thead.appendChild(headerRow);
  table.appendChild(thead);
  table.appendChild(tbody);
};

export const uncheckSelectAll = (): void => {
  const selectAllCheckbox: HTMLInputElement = document.getElementById<
    HTMLInputElement
  >(
    'select-all-checkbox',
  );
  selectAllCheckbox.checked = false;
};

const ROWS_CONFIG = [
  {
    key: COLUMN_KEYS.CHECKBOX,
    render: (file: FileEntry): HTMLTableCellElement => {
      const td: HTMLTableCellElement = TableData();
      const checkbox: HTMLInputElement = Input({
        type: 'checkbox',
        className: 'row-select',
        onChange: (): void => {
          const allCheckbox: HTMLInputElement = document.getElementById(
            'select-all-checkbox',
          );
          const checkboxes: NodeListOf<HTMLInputElement> = document
            .querySelectorAll('.row-select');
          allCheckbox.checked = Array.from(checkboxes).every(
            (cb: HTMLInputElement) => cb.checked,
          );
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
    render: (file: FileEntry): HTMLTableCellElement => {
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
    render: (file: FileEntry): HTMLTableCellElement =>
      TableData({
        text: formatBytes(file.size || 0),
      }),
  },
  {
    key: COLUMN_KEYS.TYPE,
    render: (file: FileEntry): HTMLTableCellElement =>
      TableData({
        text: file.size ? file.type : '—',
      }),
  },
  {
    key: COLUMN_KEYS.CREATED,
    render: (file: FileEntry): HTMLTableCellElement =>
      TableData({
        text: file.created ? new Date(file.created).toLocaleString() : '—',
      }),
  },
  {
    key: COLUMN_KEYS.ACTIONS,
    render: (file: FileEntry): HTMLTableCellElement => {
      const td: HTMLTableCellElement = TableData();
      const buttonContainer: HTMLDivElement = Div({
        className: 'buttons',
      });
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

export const renderFiles = (
  {
    files = getFiles(),
    columns = ROWS_CONFIG,
    sortKey = COLUMN_KEYS.NAME,
    sortAsc = true,
  },
): void => {
  const tbody: HTMLTableSectionElement = document.querySelector<
    HTMLTableSectionElement
  >('tbody');
  tbody.innerHTML = '';

  const sortedFiles: FileEntry[] = sortFiles(files, sortKey, sortAsc);

  sortedFiles.forEach((file: FileEntry): void => {
    const tr: HTMLTableRowElement = TableRow({ className: 'file' });

    columns.forEach((col) => {
      tr.appendChild(col.render(file));
    });

    tbody.appendChild(tr);
  });
};
