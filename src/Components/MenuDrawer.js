"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import departments from '../Utils/departments';
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
    useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FaProjectDiagram, FaUsers, FaFileAlt, FaWpforms, FaUserPlus, FaUserEdit, FaChartBar, FaDollarSign } from 'react-icons/fa';
import { AiOutlineMenu } from "react-icons/ai";
import UserModalAdd from '../Components/UserModalAdd'
import EditUserModal from '../Components/EditUserModal'
import { useSelector } from "react-redux";

const MenuDrawer = () => {
    const user = useSelector((state) => state.user);
    const router = useRouter();
    const [reportRights, setReportRights] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isModalOpen,
        onOpen: onModalOpen,
        onClose: onModalClose
    } = useDisclosure();
    
    const {
        isOpen: isEditModalOpen,
        onOpen: onEditModalOpen,
        onClose: onEditModalClose
    } = useDisclosure();
    
    
    useEffect(()=> {
        fetchRights();
    }, [user])

    useEffect(()=> {
        console.log("RIGHTS", reportRights)
    }, [reportRights])

    const fetchRights = () => {
        setIsAdmin(user.role == 'Admin')
        setReportRights(user.reportsRight)
    }

    return (
        <Box position="relative" zIndex="overlay" backgroundColor={'green.100'}>
            <IconButton
                icon={<AiOutlineMenu />}
                onClick={onOpen}
                aria-label="Menu"
                mb={4}
                position="absolute"
                top={4}
                left={4}
                size="lg"
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
                                    <MenuItem icon={<FaUserPlus />} onClick={()=> {onModalOpen(); onClose();}}>New</MenuItem>
                                    <MenuItem icon={<FaUserEdit />} onClick={()=> {onEditModalOpen(); onClose();}}>Edit</MenuItem>
                                </MenuList>
                            </Menu>

                            <Divider />

                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="green" width="full" justifyContent="space-between"  variant="outline">
                                    <HStack spacing={2}>
                                        <FaFileAlt />
                                        <Text>Reports</Text>
                                    </HStack>
                                </MenuButton>
                                <MenuList>
                                    {reportRights && reportRights.ppc == 1 &&  <MenuItem icon={<FaChartBar />}>PPC</MenuItem>}
                                    {reportRights && reportRights.finance == 1 && <MenuItem icon={<FaDollarSign />}>Finance</MenuItem>}
                                    {reportRights && reportRights.survey == 1 && <MenuItem icon={<FaFileAlt />} onClick={() => { router.push('/reports/survey-report'); onClose() }}>Survey</MenuItem>}
                                </MenuList>
                            </Menu>
                            <Divider/>
                            <Button
                                width="full"
                                justifyContent="space-between"
                                variant={'outline'}
                                colorScheme="green"
                                onClick={() => { router.push('/survey-form'); onClose() }}
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
            <EditUserModal isOpen={isEditModalOpen} onClose={onEditModalClose} />
            <UserModalAdd isOpen={isModalOpen} onClose={onModalClose}/>
        </Box>
    );
};

export default MenuDrawer;
