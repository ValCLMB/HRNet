type TableLengthProps = {
  length: number;
  minPageItem: number;
  maxPageItem: number;
};
export const TableLength = ({
  length,
  minPageItem,
  maxPageItem,
}: TableLengthProps) => {
  return (
    <>
      Showing {minPageItem} to {length < maxPageItem ? length : maxPageItem} of{" "}
      {length} entries
    </>
  );
};
