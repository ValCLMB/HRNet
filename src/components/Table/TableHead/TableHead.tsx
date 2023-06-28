import styles from "./TableHead.module.css";
import { HeaderCell } from "./HeaderCell";
import { field } from "../Table";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type SortedDefinition = {
  param: string;
  direction: string;
  icon: IconDefinition;
} | null;

type TableHeadProps = {
  fields: field[];
  sortedDefinition: SortedDefinition;
  handleSort: (value: string) => void;
};

export const TableHead = ({
  fields,
  sortedDefinition,
  handleSort,
}: TableHeadProps) => {
  return (
    <thead className={styles.tableHead}>
      <tr className={styles.tableHeadRow}>
        {fields.map((field) => (
          <HeaderCell
            key={field.param}
            label={field.label}
            param={field.param}
            sortedDefinition={sortedDefinition}
            handleSort={handleSort}
          />
        ))}
      </tr>
    </thead>
  );
};
