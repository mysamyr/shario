import { FileEntry, type TableColumnConfig } from '../types.ts';
import { getFiles } from '../state/files.ts';
import {
  Span,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '../components.ts';
import TABLE_CONFIG from '../constants/table-config.ts';
import translations from '../constants/language.ts';
import { getLanguage } from './language.ts';
import { sortFiles } from '../helpers.ts';

const uncheckSelectAll = (): void => {
  const selectAllCheckbox: HTMLInputElement = document.getElementById<
    HTMLInputElement
  >(
    'select-all-checkbox',
  );
  selectAllCheckbox.checked = false;
};

export const renderFiles = (
  {
    files = getFiles(),
    columns = TABLE_CONFIG,
    sortKey = TABLE_CONFIG[1].key,
    sortAsc = true,
  },
): void => {
  const tbody: HTMLTableSectionElement = document.querySelector<'tbody'>(
    'tbody',
  );
  tbody.innerHTML = '';

  const sortedFiles: FileEntry[] = sortFiles(files, sortKey, sortAsc);

  sortedFiles.forEach((file: FileEntry): void => {
    const tr: HTMLTableRowElement = TableRow({ className: 'file' });
    columns.forEach((col: TableColumnConfig): void => {
      const columnData: HTMLTableCellElement = col.renderColumnData(file);
      if (col.bodyCellClassName) {
        columnData.classList.add(...col.bodyCellClassName.split(' '));
      }
      if (col.grow) columnData.classList.add('grow');
      tr.appendChild(columnData);
    });
    tbody.appendChild(tr);
  });

  uncheckSelectAll();
};

export const initTable = (
  defaultSortKey: string = TABLE_CONFIG[1].key,
  tableConfig: TableColumnConfig[] = TABLE_CONFIG,
  renderData = renderFiles,
): void => {
  let sortKey: string = defaultSortKey;
  let sortAsc: boolean = true;

  const table: HTMLTableElement = document.querySelector<HTMLTableElement>(
    'table',
  );
  const thead: HTMLTableSectionElement = TableHeader();
  const tbody: HTMLTableSectionElement = TableBody();

  const headerRow: HTMLTableRowElement = TableRow();

  const renderHeaderRow = (): void => {
    headerRow.innerHTML = '';
    tableConfig.forEach((col: TableColumnConfig): void => {
      const handleSortClick = (): void => {
        if (sortKey === col.key) {
          sortAsc = !sortAsc;
        } else {
          sortKey = col.key;
          sortAsc = true;
        }
        renderData({ sortKey, sortAsc });
        renderHeaderRow();
      };

      const th: HTMLTableCellElement = TableHeaderCell();
      const headerData: HTMLElement = col.renderHeaderData
        ? col.renderHeaderData()
        : Span({
          id: `file_${col.key}`,
          text: translations[getLanguage()].table[col.key],
        });
      th.appendChild(headerData);

      if (col.minWidth) th.style.minWidth = col.minWidth;
      if (col.grow) th.style.width = '100%';

      if (col.headerCellClassName) {
        th.classList.add(...col.headerCellClassName.split(' '));
      }

      if (col.sortable) {
        th.addEventListener('click', handleSortClick);
        if (sortKey === col.key) {
          th.appendChild(
            document.createTextNode(sortAsc ? ' ▲' : ' ▼'),
          );
        }
      }
      headerRow.appendChild(th);
    });
  };

  renderHeaderRow();
  thead.appendChild(headerRow);
  table.appendChild(thead);
  table.appendChild(tbody);
};
