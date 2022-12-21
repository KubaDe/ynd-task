import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Box, Flex } from '@chakra-ui/react';

const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Head>
      <title>YND Task</title>
      <meta name="description" content="Recruitment task - YND" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Flex
      as="main"
      backgroundColor="gray.200"
      minH="100vh"
      justifyContent="center"
      py={{ base: 0, md: 8 }}
    >
      <Box flex="1 1" maxW={{ base: '100%', md: 'lg' }} backgroundColor="white">
        {children}
      </Box>
    </Flex>
  </>
);

export default BaseLayout;
