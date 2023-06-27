import { useMemo } from "react";

type PaginationProps = {
  setCurrentPage: (value: number | ((prevVar: number) => number)) => void;
  currentPage: number;
  numberOfPages: number;
};

export const Pagination = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  // Handle the number of pages to display
  const numberOfPagesArray = Array.from(Array(numberOfPages).keys());

  // Handle the previous and next page
  const previousPage = () => {
    setCurrentPage((curr) => {
      if (curr === 1) return curr;
      return curr - 1;
    });
  };
  const nextPage = () => {
    setCurrentPage((curr) => {
      if (curr === numberOfPages) return curr;
      return curr + 1;
    });
  };

  const handleChangePage = (item: number | string) => {
    if (typeof item === "string") return;

    setCurrentPage(item + 1);
  };
  return (
    <div>
      <button onClick={previousPage}>Previous</button>
      {numberOfPagesArray.map((item) => (
        <button key={item} onClick={() => handleChangePage(item)}>
          {typeof item === "string" ? item : item + 1}
        </button>
      ))}

      <button onClick={nextPage}>Next</button>
    </div>
  );
};
