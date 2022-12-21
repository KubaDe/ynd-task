import { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from '@chakra-ui/react';
import useQuerySearchForm from './useQuerySearchForm';

const SearchBox: FC = () => {
  const { errors, register, onSubmit, handleSubmit } = useQuerySearchForm();
  return (
    <VStack
      px={6}
      pt={6}
      spacing={6}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={!!errors.search}>
        <Input
          type="text"
          placeholder="Enter username"
          {...register('search', {
            maxLength: { value: 32, message: 'Maximum length should be 32' },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="search"
          render={({ message }) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          )}
        />
      </FormControl>
      <Button w="100%" type="submit">
        Search
      </Button>
    </VStack>
  );
};

export default SearchBox;
