"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";

const Page = () => {
  const router = useRouter();

  return (
    <Box p={4} bg={"green.50"} height={'100vh'}>
      <VStack spacing={6} align="stretch" mt={10}>
        <Heading as="h1" size="2xl" color={'green.700'} textAlign="center">
          Welcome to the Analytics Dashboard
        </Heading>
        <Box p={6} bg="green.100" borderRadius="lg" boxShadow="lg">
          <Text fontSize="2xl" mb={4} fontWeight="bold" color="green.800">
            Overview
          </Text>
          <Text fontSize="lg" color="green.700">
            Welcome to your comprehensive analytics dashboard! This platform is designed to provide key insights and actionable data for our PPC (Production Planning and Control) and Finance departments, as well as facilitate employee engagement through survey forms. Navigate through the sections to find detailed reports and tools that will help you make informed decisions and improve overall efficiency.
          </Text>
        </Box>
        <Box p={6} bg="green.100" borderRadius="lg" boxShadow="lg">
          <Text fontSize="2xl" mb={4} fontWeight="bold" color="green.800">
            Notification
          </Text>
          <Text fontSize="lg" mb={4} color="green.700">
            We kindly request all employees to complete the survey form for the month of July. Your feedback is invaluable in helping us improve and create a better workplace environment for everyone.
          </Text>
          <Button colorScheme="teal" size="lg" onClick={() => { router.push('/survey-form') }}>
            Go to Survey Form
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Page;
