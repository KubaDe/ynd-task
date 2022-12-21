import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import { useRouter } from 'next/router';

type QuerySearchFormValues = {
  search: string;
};

const useQuerySearchForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuerySearchFormValues>({
    defaultValues: {
      search: '',
    },
  });

  useEffect(() => {
    reset({
      search: typeof router.query.q === 'string' ? router.query.q : '',
    });
  }, [reset, router.query.q]);

  const onSubmit = useCallback<(values: QuerySearchFormValues) => void>(
    ({ search }) => {
      router.push(
        {
          pathname: router.pathname,
          query: omitBy(
            {
              ...router.query,
              q: search.trim() || undefined,
            },
            isNil,
          ),
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );
  return {
    onSubmit,
    errors,
    register,
    handleSubmit,
  };
};

export default useQuerySearchForm;
