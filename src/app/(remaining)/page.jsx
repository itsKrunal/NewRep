"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@chakra-ui/react";
import CustomHeading from '../../StyleComponents/PageHeader';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/userSlice";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(()=> {
    fetchUserData();
  }, [])

  const fetchUserData = async () => {
    try {
      const info = await axios.get('/api/me');
      const user =  info.data.decodedToken.user;
      dispatch(setUser({
        email : user.email,
        role : user.role,
        eId : user.eId,
        userName : user.userName,
        department : user.department,
        reportsRight : user.reportsRight
      }))
    } catch (error) {
      
    }
  }

  return (
    <Box p={4} bg={"green.50"} height={'100vh'} w={'100%'}>
      <VStack spacing={6} align="stretch" mt={'3.5em'}>
        <Card boxShadow={'lg'}>
          <CardHeader>
            <CustomHeading prop={'Welcome to the Analytics Dashboard'} />
          </CardHeader>
          <CardBody>
            <Card boxShadow={'0px 4px 6px rgba(0, 0, 0.2, 0.3)'} p={3}>
              <Box p={6} >
                <Text fontSize="2xl" mb={4} fontWeight="bold" color="green.800">
                  Overview
                </Text>
                <Text fontSize="lg" color="black">
                  Welcome to your comprehensive analytics dashboard! This platform is designed to provide key insights and actionable data for our PPC (Production Planning and Control) and Finance departments, as well as facilitate employee engagement through survey forms. Navigate through the sections to find detailed reports and tools that will help you make informed decisions and improve overall efficiency.
                </Text>
              </Box>
              <Box p={6} >
                <Text fontSize="2xl" mb={4} fontWeight="bold" color="green.800">
                  Notification
                </Text>
                <Text fontSize="lg" mb={4} color="black">
                  We kindly request all employees to complete the survey form for the month of July. Your feedback is invaluable in helping us improve and create a better workplace environment for everyone.
                </Text>
                <Button colorScheme="teal" size="lg" onClick={() => { router.push('/survey-form') }}>
                  Go to Survey Form
                </Button>
              </Box>
            </Card>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default Page;
