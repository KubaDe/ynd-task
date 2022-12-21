import useSWRInfinite from 'swr/infinite';

export type Data = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
}[];

export type ApiError = {
  message?: string;
  cause?: {
    message?: string;
  };
};

const PER_PAGE = 5;

const useRepositoriesList = ({
  username,
  isPaused,
}: {
  username: string;
  isPaused: boolean;
}) => {
  const { data, error, isLoading, isValidating, setSize, size } =
    useSWRInfinite<Data, ApiError>(
      (page, previousPageData) => {
        if (previousPageData && !previousPageData.length) {
          return null;
        }
        const searchParams = new URLSearchParams({
          per_page: `${PER_PAGE}`,
          page: `${page + 1}`,
        });
        return isPaused
          ? null
          : `https://api.github.com/users/${username}/repos?${searchParams.toString()}`;
      },
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateFirstPage: false,
      },
    );
  // No info about total, so we check if last page is not full - Not ideal solution
  const hasMore = data?.[data?.length - 1].length === PER_PAGE;
  return {
    repositories: data?.flat() || [],
    isLoading,
    isValidating,
    error,
    setSize,
    size,
    hasMore,
  };
};

export default useRepositoriesList;
