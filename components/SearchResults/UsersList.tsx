import { FC, useEffect, useState } from 'react';
import { ExpandedIndex } from '@chakra-ui/accordion';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Spinner,
} from '@chakra-ui/react';
import useUsersList from '@api/useUsersList';
import EmptyListMessage from '@components/messages/EmptyListMessage';
import RequestErrorMessage from '@components/messages/RequestErrorMessage';
import UserRepositoriesList from './UserRepositoriesList';

const UsersList: FC<{ searchString: string }> = ({ searchString }) => {
  const { users, isLoading, error } = useUsersList({ searchString });
  const [accordion, setAccordion] = useState<ExpandedIndex>();
  useEffect(() => {
    setAccordion(-1);
  }, [searchString]);
  if (error) {
    return <RequestErrorMessage message={error.cause?.message} />;
  }
  if (users.length === 0) {
    return !isLoading ? (
      <EmptyListMessage />
    ) : (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Accordion index={accordion} onChange={setAccordion}>
      {users.map((user, index) => (
        <AccordionItem key={user.id ?? index} isDisabled={isLoading}>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {user.login}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pr={0}>
                {user.login && (
                  <UserRepositoriesList
                    isExpanded={isExpanded}
                    username={user.login}
                  />
                )}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default UsersList;
