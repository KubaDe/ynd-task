import { FC } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/alert';

const NoSearchStringMessage: FC = () => {
  const { isReady } = useRouter();
  if (!isReady) {
    return null;
  }
  return (
    <Alert status="info">
      <AlertIcon />
      <AlertTitle>Search for Github users.</AlertTitle>
      <AlertDescription>Enter Github username</AlertDescription>
    </Alert>
  );
};

export default NoSearchStringMessage;
