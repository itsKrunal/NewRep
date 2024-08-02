import { Box, Heading } from '@chakra-ui/react';

const CustomHeading = ({prop}) => {
  return (
    <Box 
      bg="green.100" 
      borderRight="10px solid"
      borderColor="green.400" 
      display="inline-block"
      padding="4"
      borderRadius="md"
      w={'60%'}
    >
      <Heading as="h1" size="xl" color={'green.900'}>
        {prop}
      </Heading>
    </Box>
  );
};

export default CustomHeading;
