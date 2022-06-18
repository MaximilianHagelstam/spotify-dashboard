import useSWRInfinite from "swr/infinite";
import TimeRange from "../interfaces/TimeRange";
import useAuth from "./useAuth";

const usePagination = <T>(
  url: string,
  pageSize: number,
  timeRange: TimeRange
) => {
  const { fetcher } = useAuth();

  const getKey = (pageIndex: number, previousPageData: T[]) => {
    if (previousPageData && !previousPageData.length) return null;

    return `${url}?time_range=${timeRange}&limit=${pageSize}&offset=${
      pageSize * pageIndex
    }`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite<T[]>(
    getKey,
    fetcher
  );

  const isError = !!error;
  const paginatedData = data?.flat();
  const isReachedEnd = data && data[data.length - 1].length < pageSize;

  return {
    data: paginatedData,
    isLoading: isValidating,
    isError,
    size,
    setSize,
    isReachedEnd,
  };
};

export default usePagination;
