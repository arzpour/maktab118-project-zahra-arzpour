import { perPageLimit } from "@/utils/config";

interface IUsePagination<T> {
  totalItems: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page?: number;
  data?: T[];
}

const usePagination = <T>({
  totalItems,
  setPage,
  page = 0,
  data,
}: IUsePagination<T>) => {
  const totalPages = Math.ceil((totalItems || 0) / perPageLimit);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const filteredItems = data?.slice(
    (page - 1) * perPageLimit,
    page * perPageLimit
  );
  return { totalPages, handlePageChange, filteredItems };
};

export default usePagination;
