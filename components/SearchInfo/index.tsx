import { FC } from 'react';
import { useRouter } from 'next/router';
import { Text } from '@chakra-ui/react';

const SearchInfo: FC = () => {
  const { query } = useRouter();
  if (!query?.q) {
    return null;
  }
  return (
    <Text
      color="gray.600"
      px={6}
      pt={6}
    >{`Searching users for "${query?.q}"`}</Text>
  );
};

export default SearchInfo;
