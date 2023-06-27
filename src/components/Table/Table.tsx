import styles from "./Table.module.css";
import { useEffect, useState } from "react";
import { SelectOption } from "../CreateEmployee/CreateEmployee";
import { HeaderCell } from "./TableHead/HeaderCell";
import { Pagination } from "./Pagination";
import { SearchInput } from "./TableHeader/SearchInput";
import { SelectPageLength } from "./TableHeader/SelectPageLength";
import { TableLength } from "./TableLength";
import { TableHead } from "./TableHead/TableHead";

const usePagination = <T extends object>(datas: T[]) => {
  const [pageLength, setPageLength] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the min and max item for the current page
  const maxPageItem = currentPage * pageLength;
  const minPageItem = maxPageItem - pageLength + 1;
  // Calculate the number of pages
  const numberOfPages = Math.ceil(datas.length / pageLength);

  // Set the datas for the current page
  const pageDatas = datas.slice(minPageItem - 1, maxPageItem);

  // Handle the change of page length
  const changePageLength = (value: string) => {
    setPageLength(parseInt(value));
    setCurrentPage(1);
  };

  return {
    pageDatas,
    pageLength,
    changePageLength,
    currentPage,
    setCurrentPage,
    minPageItem,
    maxPageItem,
    numberOfPages,
  };
};

export type field = {
  param: string;
  label: string;
  type?: string;
  options?: SelectOption[];
};

type TableProps<T> = {
  fields: field[];
  datas: T[];
  range?: number[];
};

const TableBody = <T extends object>({
  datas,
  fields,
}: Omit<TableProps<T>, "range">) => {
  return (
    <tbody>
      {datas.map((item: any, key) => (
        <tr key={key}>
          {fields.map(({ param }) => (
            <td key={param}>{item[param]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export const Table = <T extends object>({
  fields,
  datas = [],
  range,
}: TableProps<T>) => {
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState(datas);

  useEffect(() => {
    if (search === "") setFilteredDatas(datas);

    setFilteredDatas((curr) => {
      return curr.filter((item: any) => {
        const values = Object.values(item).join(" ").toLowerCase();
        return values.includes(search.toLowerCase());
      });
    });
  }, [search, datas]);
  const {
    pageDatas,
    pageLength,
    changePageLength,
    minPageItem,
    maxPageItem,
    numberOfPages,
    currentPage,
    setCurrentPage,
  } = usePagination(filteredDatas);

  return (
    <div className={styles.table}>
      <section className={styles.tableHeader}>
        <SelectPageLength
          range={range}
          pageLength={pageLength}
          changePageLength={changePageLength}
        />
        <SearchInput setSearch={setSearch} />
      </section>
      <table>
        <TableHead fields={fields} />
        <TableBody datas={pageDatas} fields={fields} />
      </table>
      <section className={styles.tableFooter}>
        <TableLength
          length={datas.length}
          maxPageItem={maxPageItem}
          minPageItem={minPageItem}
        />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
        />
      </section>
    </div>
  );
};