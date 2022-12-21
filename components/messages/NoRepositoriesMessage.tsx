import { FC } from 'react';
import { useRouter } from 'next/router';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/alert';

const NoRepositoriesMessage: FC = () => {
  const { isReady } = useRouter();
  if (!isReady) {
    return null;
  }
  return (
    <Alert status="warning">
      <AlertIcon />
      <AlertTitle>No public repositories.</AlertTitle>
    </Alert>
  );
};

export default NoRepositoriesMessage;
