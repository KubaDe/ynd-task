import { FC } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import NoSearchStringMessage from '@components/messages/NoSearchStringMessage';
import UsersList from './UsersList';

const SearchResults: FC = () => {
  const { query } = useRouter();
  const searchString = typeof query?.q === 'string' ? query.q : undefined;
  return (
    <Box px={6} mt={6}>
      {searchString ? (
        <UsersList searchString={searchString} />
      ) : (
        <NoSearchStringMessage />
      )}
    </Box>
  );
};

export default SearchResults;
