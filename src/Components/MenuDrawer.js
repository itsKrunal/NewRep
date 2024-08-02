"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
    Box,
    Button,
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
    VStack,
    Text,
    HStack,
    Divider,
    Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FaProjectDiagram, FaUsers, FaFileAlt, FaWpforms, FaUserPlus, FaUserEdit, FaChartBar, FaDollarSign } from 'react-icons/fa';

const MenuDrawer = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box position="relative" zIndex="overlay" backgroundColor={'green.100'}>
            <IconButton
                icon={<HamburgerIcon />}
                onClick={onOpen}
                aria-label="Menu"
                border={'1px solid black'}
                mb={4}
                position="absolute"
                top={4}
                left={4}
                size="lg"
                variant="outline"
                colorScheme="green"
            />
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent bg="gray.50">
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px" borderColor="gray.200">
                        <HStack spacing={2}>
                            <FaProjectDiagram color="green.500" />
                            <Text fontSize="lg" color="green.600" fontWeight="bold">Menu</Text>
                        </HStack>
                    </DrawerHeader>
                    <DrawerBody p={4}>
                        <VStack align="start" spacing={4} width="full">
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="green" width="full" justifyContent="space-between" variant="outline">
                                    <HStack spacing={2}>
                                        <FaUsers />
                                        <Text>Users</Text>
                                    </HStack>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem icon={<FaUserPlus />}>New</MenuItem>
                                    <MenuItem icon={<FaUserEdit />}>Edit</MenuItem>
                                </MenuList>
                            </Menu>

                            <Divider />

                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="green" width="full" justifyContent="space-between" variant="outline">
                                    <HStack spacing={2}>
                                        <FaFileAlt />
                                        <Text>Reports</Text>
                                    </HStack>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem icon={<FaChartBar />}>PPC</MenuItem>
                                    <MenuItem icon={<FaDollarSign />}>Finance</MenuItem>
                                    <MenuItem icon={<FaFileAlt />} onClick={() => { router.push('/reports/survey-report') }}>Survey</MenuItem>
                                </MenuList>
                            </Menu>
                            <Divider/>
                            <Button
                                width="full"
                                justifyContent="space-between"
                                variant={'outline'}
                                colorScheme="green"
                                onClick={() => { router.push('/survey-form') }}
                            >
                                <HStack spacing={2} align="center">
                                    <FaWpforms />
                                    <Text>Survey Form</Text>
                                </HStack>
                            </Button>

                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default MenuDrawer;
