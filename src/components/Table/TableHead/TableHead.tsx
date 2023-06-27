import styles from "./TableHead.module.css";
import { HeaderCell } from "./HeaderCell";
import { field } from "../Table";

type TableHeadProps = {
  fields: field[];
};
export const TableHead = ({ fields }: TableHeadProps) => {
  return (
    <thead className={styles.tableHead}>
      <tr className={styles.tableHeadRow}>
        {fields.map((field) => (
          <HeaderCell key={field.param} label={field.label} />
        ))}
      </tr>
    </thead>
  );
};
