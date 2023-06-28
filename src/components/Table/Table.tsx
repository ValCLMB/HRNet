import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { SelectOption } from "../CreateEmployee/Form";
import { Pagination } from "./Pagination";
import styles from "./Table.module.css";
import { SortedDefinition, TableHead } from "./TableHead/TableHead";
import { SearchInput } from "./TableHeader/SearchInput";
import { SelectPageLength } from "./TableHeader/SelectPageLength";
import { TableLength } from "./TableLength";

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

const useSearch = <T extends object>(datas: T[]) => {
  const [search, setSearch] = useState("");

  const filteredDatas = datas.filter((item: any) => {
    const values = Object.values(item).join(" ").toLowerCase();
    return values.includes(search.toLowerCase());
  });

  return { filteredDatas, setSearch };
};
type Sorted<T> = {
  definition: SortedDefinition;
  datas: T[];
};

const useSort = <T extends object>(datas: T[]) => {
  const [sorted, setSorted] = useState<Sorted<T>>({
    definition: null,
    datas,
  });

  const { definition } = sorted;

  useEffect(() => {
    if (definition === null) {
      setSorted((curr) => ({ ...curr, datas }));
      return;
    }

    const sortData = [...datas].sort((a: any, b: any) => {
      if (a[definition.param] < b[definition.param]) {
        return -1;
      }
      if (a[definition.param] > b[definition.param]) {
        return 1;
      }
      return 0;
    });

    const direction = definition.direction;

    if (direction === "desc") {
      sortData.reverse();
    }

    setSorted((curr) => ({ ...curr, datas: sortData }));
  }, [datas, definition]);

  const handleSort = (param: string) => {
    setSorted((curr) => {
      if (curr.definition === null || param !== curr.definition.param) {
        return {
          ...curr,
          definition: { param, direction: "asc", icon: faSortUp },
        };
      }

      if (curr.definition.direction === "asc") {
        return {
          ...curr,
          definition: { param, direction: "desc", icon: faSortDown },
        };
      }

      return {
        ...curr,
        definition: null,
      };
    });
  };

  return { sorted, handleSort };
};

export const Table = <T extends object>({
  fields,
  datas = [],
  range,
}: TableProps<T>) => {
  const { sorted, handleSort } = useSort(datas);
  const { filteredDatas, setSearch } = useSearch(sorted.datas);
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
        <TableHead
          fields={fields}
          sortedDefinition={sorted.definition}
          handleSort={handleSort}
        />
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
