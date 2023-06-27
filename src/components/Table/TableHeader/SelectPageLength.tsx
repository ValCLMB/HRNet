type SelectPaginationProps = {
  pageLength: number;
  changePageLength: (value: string) => void;
  range?: number[];
};
export const SelectPageLength = ({
  pageLength,
  changePageLength,
  range = [10, 25, 50, 100],
}: SelectPaginationProps) => {
  return (
    <div>
      Show
      <select
        value={pageLength}
        onChange={(e) => changePageLength(e.target.value)}
      >
        {range.map((item: number) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      entries
    </div>
  );
};
