import React, { useEffect, useState } from "react";
import "./App.css";
import Checkbox from "./components/Checkbox";
import Modal from "./components/Popup";
import Table from "./components/Table";
import { ColumnHeader, EOrder, ISortTable } from "./components/Table/interface";
import { DATA, HEADERS } from "./constants/data";
import { IExcelRow, exportExcel } from "./untils/export";
import {
  IParamsDiscover,
  IResponseDiscover,
  moviceService,
} from "./services/movieService";
import useDebounce from "./hooks/useDebound";
import Layout from "./HOC/Layout";

interface DataRow {
  key: string | number;
  [key: string]: string | number;
}

const App: React.FC = () => {
  const debounce = useDebounce();
  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [headers, setHeaders] = useState(HEADERS);
  const [movies, setMovies] = useState<IResponseDiscover | undefined>(
    undefined
  );
  const [params, setParams] = useState<IParamsDiscover>({
    page: 1,
  });
  const [sort, setSort] = useState<ISortTable | undefined>(undefined);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const data = await moviceService.getDiscover(params);
      setIsLoading(false);
      setMovies(data);
    })();
  }, [params]);

  const handleChangeOrder = (key: string | number, order: EOrder) => {
    setSort({ key, order });
    setParams({ ...params, sort_by: `${key}.${order}`, page: 1 });
  };

  const handleExportExcel = () => {
    const dataTmp = JSON.parse(JSON.stringify(DATA));

    // const headerTmp = headers.filter((header) => !header.isHidden);
    // const headerExcel = headerTmp.map(({ title, key }) => {
    //   return {
    //     width: 30,
    //     header: title,
    //     key,
    //   };
    // });
    const data = dataTmp.map((item: DataRow) => {
      const excelRow: IExcelRow = {};
      headers.forEach((header) => {
        if (!header.isHidden) {
          excelRow[header.key] = item[header.key];
        }
      });
      return excelRow;
    });
    exportExcel(data);
  };

  return (
    <Layout isLoading={isLoading}>
      <div className="flex-inline justify-center items-center flex-col mx-auto ">
        <div className="flex items-center justify-between py-6">
          <button
            className="border px-6 py-2 rounded-3xl"
            onClick={() => setVisibility(true)}
          >
            Setting Header
          </button>
          <button
            className="border px-6 py-2 rounded-3xl"
            onClick={handleExportExcel}
          >
            Export
          </button>
        </div>

        <div>
          <input
            onChange={(e) => {
              debounce(() =>
                setParams({
                  ...params,
                  with_original_language: e.target.value,
                  page: 1,
                })
              );
            }}
            className="border px-6 py-2 rounded-3xl outline-none mb-6"
            placeholder="search by with_original_language"
          />
        </div>
        <Table
          data={movies?.data || []}
          headers={headers}
          sort={sort}
          onChangeOrder={handleChangeOrder}
          pagination={{
            currentPage: movies?.pagination.currentPage || 1,
            totalPage: movies?.pagination?.totalPage || 1,
            onChangePage: (selected) => {
              setParams({ ...params, page: selected });
            },
          }}
        />

        <Modal
          visibility={visibility}
          setVisibility={setVisibility}
          className="h-fit inline-flex"
        >
          <div className="">
            <div className=" bg-white p-8 rounded-3xl">
              {headers.map((header: ColumnHeader) => {
                return (
                  <div
                    key={header.key}
                    className="flex justify-between items-center gap-12 mt-6"
                  >
                    <div> {header.title} </div>
                    <div>
                      <Checkbox
                        checked={!header.isHidden}
                        onChange={(checked) => {
                          setHeaders((headerState) => {
                            return headerState.map((headerState) => {
                              if (headerState.key === header.key) {
                                return { ...headerState, isHidden: !checked };
                              }
                              return headerState;
                            });
                          });
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default App;
