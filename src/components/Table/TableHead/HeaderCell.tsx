import styles from "./TableHead.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

const useSort = () => {
  const [sort, setSort] = useState<"asc" | "desc" | null>(null);
  const [icon, setIcon] = useState(() => faSort);
  const handleSort = () => {
    if (sort === "asc") {
      setSort("desc");
      setIcon(faSortUp);
    } else if (sort === "desc") {
      setSort(null);
      setIcon(faSort);
    } else {
      setSort("asc");
      setIcon(faSortDown);
    }
  };

  return { icon, handleSort };
};
type HeaderCellProps = {
  label: string;
};
export const HeaderCell = ({ label }: HeaderCellProps) => {
  const { icon, handleSort } = useSort();

  return (
    <th onClick={handleSort} className={styles.tableHeadCell}>
      <div className={styles.tableHeadCellContent}>
        {label}
        <FontAwesomeIcon icon={icon} />
      </div>
    </th>
  );
};
