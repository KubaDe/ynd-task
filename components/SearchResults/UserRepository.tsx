import { FC } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { Data as RepositoriesListData } from '@api/useRepositoriesList';

const UserRepository: FC<{ repository: RepositoriesListData[number] }> = ({
  repository,
}) => {
  return (
    <LinkBox
      as="li"
      display="flex"
      backgroundColor="gray.300"
      px={2}
      py={3}
      h="150px"
      w="100%"
    >
      <Box flex="1 1">
        <LinkOverlay
          href={repository.html_url}
          target="_blank"
          fontWeight={700}
          fontSize="lg"
        >
          {repository.name}
        </LinkOverlay>
        <Text noOfLines={3}>{repository.description}</Text>
      </Box>
      <Flex w="50px" alignItems="start" justifyContent="end">
        <Text display="flex" alignItems="center" fontWeight={700}>
          {repository.stargazers_count} <StarIcon aria-label="stars" ml={1} />
        </Text>
      </Flex>
    </LinkBox>
  );
};

export default UserRepository;
