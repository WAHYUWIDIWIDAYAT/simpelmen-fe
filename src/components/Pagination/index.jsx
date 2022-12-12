import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Pagination = ({
  type,
  currentPage,
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  function handlePage(e, currentPageNumber) {
    e.preventDefault();
    paginate(currentPageNumber);
  }
  function handlePrevious(e) {
    e.preventDefault();
    paginate(currentPage - 1);
  }
  function handleNext(e) {
    e.preventDefault();
    paginate(currentPage + 1);
  }
  return (
    <>
      <nav
        className={`flex ${
          type === "dashboard" ? "justify-end" : "justify-center"
        } items-center gap-x-[.375rem] py-2 mt-10`}
        aria-label="pagination"
      >
        <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base !px-3">
          <HiChevronLeft
            className="!text-base xs:!text-xl"
            onClick={(e) => handlePrevious(e)}
          />
        </button>
        {pageNumbers.map((number) => (
          <button
            className={`${
              currentPage === number
                ? "button-gradient-sm"
                : "button-white-sm !shadow-none hover:!shadow-red"
            } !text-xs xs:!text-base`}
            onClick={(e) => handlePage(e, number)}
          >
            {number}
          </button>
        ))}

        <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base !px-3">
          <HiChevronRight
            className="!text-base xs:!text-xl"
            onClick={(e) => handleNext(e)}
          />
        </button>
      </nav>
    </>
  );
};

export default Pagination;
