import React from "react";

interface IPagination {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export const Pagination: React.FC<IPagination> = ({
  page,
  totalPages,
  handlePageChange,
}) => {
  const renderPageNumber = () => {
    const range = 2;
    const startPage = Math.max(1, page - range);
    const endPage = Math.min(totalPages, page + range);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex space-x-1 justify-center mt-5">
      <button
        onClick={() => handlePageChange(page > 1 ? page - 1 : page)}
        disabled={page === 1}
        className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-400 bg-[#0E1B2A] border border-[#0E1B2A] rounded hover:bg-[#091622] hover:border-[#091622] transition duration-200 ease"
      >
        قبلی
      </button>
      {renderPageNumber().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal ${
            page === pageNumber
              ? "text-white bg-[#091622]"
              : "text-slate-400 bg-[#0E1B2A]"
          } border border-[#0E1B2A] rounded hover:bg-[#091622] hover:border-[#091622] transition duration-200 ease`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-400 bg-[#0E1B2A] border border-[#0E1B2A] rounded hover:bg-[#091622] hover:border-[#091622] transition duration-200 ease"
      >
        بعدی
      </button>
    </div>
  );
};

export default Pagination;
