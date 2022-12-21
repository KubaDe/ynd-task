import useSWRImmutable from 'swr/immutable';

export type Data = {
  items?: {
    login?: string;
    id?: number;
    url?: string;
  }[];
};

type ApiError = {
  message?: string;
  cause?: {
    message?: string;
  };
};

const useUsersList = ({ searchString }: { searchString: string }) => {
  const searchParams = new URLSearchParams({
    q: searchString,
    per_page: '5',
    page: '0',
  });
  const { data, error, isLoading } = useSWRImmutable<Data, ApiError>(
    `https://api.github.com/search/users?${searchParams.toString()}`,
    { keepPreviousData: true },
  );
  return {
    users: data?.items || [],
    isLoading,
    error,
  };
};

export default useUsersList;
