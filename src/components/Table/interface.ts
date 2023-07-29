enum EOrder {
  asc = "asc",
  desc = "desc",
}

type TKeyTable = string | number;

interface ISortTable {
  order: EOrder;
  key: string | number;
}

interface ColumnHeader {
  title: string | number;
  key: TKeyTable;
  isHidden?: boolean;
  isSort?: boolean;
}

interface DataRow {
  key: TKeyTable;
  [key: string]: string | number;
}

interface IPageginationTable {
  currentPage: number;
  totalPage: number;
  onChangePage: (selected: number) => void;
}

interface ITableProps {
  headers: ColumnHeader[];
  data: DataRow[];
  sort?: ISortTable;
  onChangeOrder?: (key: TKeyTable, order: EOrder) => void;
  pagination?: IPageginationTable;
}

export { EOrder };
export type {
  ColumnHeader,
  DataRow,
  ITableProps,
  ISortTable,
  TKeyTable,
  IPageginationTable,
};
