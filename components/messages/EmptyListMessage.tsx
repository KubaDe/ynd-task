import { FC } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/alert';

const EmptyListMessage: FC = () => {
  return (
    <Alert status="warning">
      <AlertIcon />
      <AlertTitle>No results.</AlertTitle>
      <AlertDescription>Please search for a different phrase</AlertDescription>
    </Alert>
  );
};

export default EmptyListMessage;
