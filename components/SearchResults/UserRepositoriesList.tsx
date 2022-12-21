import { FC } from 'react';
import range from 'lodash/range';
import { Button, Center, Skeleton, Text, VStack } from '@chakra-ui/react';
import useRepositoriesList from '@api/useRepositoriesList';
import NoRepositoriesMessage from '@components/messages/NoRepositoriesMessage';
import RequestErrorMessage from '@components/messages/RequestErrorMessage';
import UserRepository from './UserRepository';

const UserRepositoriesList: FC<{ username: string; isExpanded: boolean }> = ({
  username,
  isExpanded,
}) => {
  const { repositories, error, isValidating, setSize, size, hasMore } =
    useRepositoriesList({
      username,
      isPaused: !isExpanded,
    });

  if (error) {
    return <RequestErrorMessage message={error.cause?.message} />;
  }

  const skeleton = range(2).map(index => (
    <Skeleton key={index} h="130px" w="100%" />
  ));

  if (repositories.length === 0 && !isValidating && isExpanded) {
    return <NoRepositoriesMessage />;
  }
  return (
    <>
      <VStack as="ul">
        {repositories.map(repository => (
          <UserRepository key={repository.id} repository={repository} />
        ))}
        {isValidating && skeleton}
      </VStack>
      <Center mt={3}>
        {hasMore && (
          <Button
            variant="link"
            onClick={() => setSize(size + 1)}
            disabled={isValidating}
          >
            Show more
          </Button>
        )}
        {!hasMore && !isValidating && (
          <Text color="gray.400">{`Total: ${repositories.length} repositories`}</Text>
        )}
      </Center>
    </>
  );
};

export default UserRepositoriesList;
