import React, { memo, useEffect, useRef, useState } from "react";
import Pagination from "../Pagination";
import ImgDown from "./../../assests/down.png";
import ImgUp from "./../../assests/up.png";
import {
  ColumnHeader,
  DataRow,
  EOrder,
  ITableProps,
  TKeyTable,
} from "./interface";

const Table: React.FC<ITableProps> = ({
  headers,
  data,
  sort,
  onChangeOrder,
  pagination,
}) => {
  const draggedColumnRef = useRef<any>(null);

  const [columns, setColumns] = useState<ColumnHeader[]>(headers);

  const [draggedColumnIndex, setDraggedColumnIndex] = useState<number | null>(
    null
  );
  const [dropColumnIndex, setDropColumnIndex] = useState<number | null>(null);

  useEffect(() => {
    setColumns(headers);
  }, [headers]);

  const handleDragStart = (
    e: React.DragEvent<HTMLTableHeaderCellElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
    setDraggedColumnIndex(index);
    draggedColumnRef.current = e.currentTarget;
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLTableHeaderCellElement>,
    index: number
  ) => {
    e.preventDefault();
    setDropColumnIndex(index);
    draggedColumnRef.current.classList.add("dragging");
  };

  const handleDragEnd = () => {
    setDraggedColumnIndex(null);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLTableHeaderCellElement>,
    index: number | string
  ) => {
    if (
      draggedColumnIndex !== null &&
      dropColumnIndex !== null &&
      draggedColumnIndex !== dropColumnIndex
    ) {
      const updatedColumns = [...columns];
      const draggedColumn = updatedColumns[draggedColumnIndex];
      updatedColumns.splice(draggedColumnIndex, 1);
      updatedColumns.splice(dropColumnIndex, 0, draggedColumn);
      setColumns(updatedColumns);
    }
    setDraggedColumnIndex(null);
    setDropColumnIndex(null);
  };

  const handleClickSort = (key: TKeyTable) => {
    if (!onChangeOrder) return null;
    if (
      !sort ||
      (sort.key === key && sort.order === EOrder.asc) ||
      sort.key !== key
    ) {
      return onChangeOrder(key, EOrder.desc);
    }
    onChangeOrder(key, EOrder.asc);
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((column, index) => {
              if (column.isHidden) return null;
              return (
                <th
                  key={column.key}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => {
                    handleDrop(e, index);
                  }}
                  className={`${
                    draggedColumnIndex === index && "dragging"
                  } border p-3`}
                >
                  <div className="flex gap-4 items-center">
                    <div>{column.title}</div>
                    {column.isSort && (
                      <div
                        className="cursor-pointer flex-grow flex flex-col items-end"
                        onClick={() => handleClickSort(column.key)}
                      >
                        <div
                          className={` ${
                            EOrder.asc === sort?.order &&
                            sort?.key === column.key
                              ? "opacity-1"
                              : "opacity-40"
                          }`}
                        >
                          <img alt="up" className="w-3.5" src={ImgUp} />
                        </div>
                        <div
                          className={` ${
                            EOrder.desc === sort?.order &&
                            sort?.key === column.key
                              ? "opacity-1"
                              : "opacity-40"
                          }`}
                        >
                          <img alt="down" className="w-3.5" src={ImgDown} />
                        </div>
                      </div>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row: DataRow) => {
            return (
              <tr key={row.key}>
                {columns.map((column) => {
                  if (column.isHidden) return null;
                  return (
                    <td
                      key={`${column.key}---${row.key}`}
                      className="border p-3"
                    >
                      {row[column.key]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {pagination && (
        <Pagination
          onPageChange={pagination?.onChangePage}
          page={pagination?.currentPage}
          pageCount={pagination?.totalPage}
          className="py-12 flex justify-center"
        />
      )}
    </div>
  );
};

export default memo(Table);
