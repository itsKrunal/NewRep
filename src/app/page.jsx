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
                <MenuItem onClick={()=> {router.push('/reports/survey-report')}}>Survey</MenuItem>
              </MenuList>
            </Menu>
            <Button variant="solid" onClick={()=> {router.push('/survey-form')}} mt={4}>
              Survey Form
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
          </Box>
  );
};

export default Page;
