"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  useToast,
  VStack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";

const Page = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={4} bg={"white"} height={'100vh'}>
      <IconButton
        icon={<HamburgerIcon />}
        onClick={onOpen}
        aria-label="Menu"
        mb={4}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody display={'flex'} flexDir={'column'}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Project
              </MenuButton>
              <MenuList>
                <MenuItem>Project Status</MenuItem>
                <MenuItem>Progress Status</MenuItem>
                <MenuItem>Remarks</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mt={4}>
                Users
              </MenuButton>
              <MenuList>
                <MenuItem>Admin</MenuItem>
                <MenuItem>PPC Users</MenuItem>
                <MenuItem>Finance Users</MenuItem>
                <MenuItem>Default</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mt={4}>
                Reports
              </MenuButton>
              <MenuList>
                <MenuItem>PPC</MenuItem>
                <MenuItem>Finance</MenuItem>
                <MenuItem onClick={() => { router.push('/reports/survey-report') }}>Survey</MenuItem>
              </MenuList>
            </Menu>
            <Button variant="solid" onClick={() => { router.push('/survey-form') }} mt={4}>
              Survey Form
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <VStack spacing={4} align="stretch" mt={4}>
        <Heading as="h1" size="lg" textAlign="center">Welcome to the Analytics Dashboard</Heading>
        <Box p={4} bg="gray.100" borderRadius="md" boxShadow="md">
          <Text fontSize="lg" mb={2}><strong>Overview</strong></Text>
          <Text fontSize="md">
            Welcome to your comprehensive analytics dashboard! This platform is designed to provide key insights and actionable data for our PPC (Production Planning and Control) and Finance departments, as well as facilitate employee engagement through survey forms. Navigate through the sections to find detailed reports and tools that will help you make informed decisions and improve overall efficiency.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Page;
