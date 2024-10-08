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
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FaProjectDiagram, FaUsers, FaFileAlt, FaWpforms, FaUserPlus, FaUserEdit, FaChartBar, FaDollarSign, FaClipboardList, FaMoneyCheckAlt } from 'react-icons/fa';
import { AiOutlineMenu } from "react-icons/ai";
import UserModalAdd from '../Components/UserModalAdd';
import EditUserModal from '../Components/EditUserModal';
import FeatureStatusModal from '../Components/FeatureStatusModal';
import NewFeature from '../Components/NewFeature';
import { useSelector } from "react-redux";
import { MdHelp } from "react-icons/md";

const MenuDrawer = () => {
    const user = useSelector((state) => state.user);
    const router = useRouter();
    const [reportRights, setReportRights] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isHod, setIsHod] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isModalOpen,
        onOpen: onModalOpen,
        onClose: onModalClose
    } = useDisclosure();

    const {
        isOpen: isFeatureStatusModalOpen,
        onOpen: onFeatureStatusModalOpen,
        onClose: onFeatureStatusModalClose
    } = useDisclosure();

    const {
        isOpen: isFeatureModalOpen,
        onOpen: onFeatureModalOpen,
        onClose: onFeatureModalClose
    } = useDisclosure();


    const {
        isOpen: isEditModalOpen,
        onOpen: onEditModalOpen,
        onClose: onEditModalClose
    } = useDisclosure();

    useEffect(() => {
        fetchRights();
    }, [user]);

    useEffect(() => {
        console.log("RIGHTS", reportRights);
    }, [reportRights]);

    const fetchRights = () => {
        setIsAdmin(user.role === 'Admin');
        setIsHod(user.isHOD)
        setReportRights(user.reportsRight);
    };

    return (
        <Box position="relative" zIndex="overlay" backgroundColor={'green.100'}>
            {console.log("ROLEEEEE", isAdmin)}
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
                            {/* Users Section */}
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="green" width="full" justifyContent="space-between">
                                    <HStack spacing={2}>
                                        <FaUsers />
                                        <Text>Users</Text>
                                    </HStack>
                                </MenuButton>
                                {isAdmin && <MenuList>
                                    <MenuItem icon={<FaUserPlus />} onClick={() => { onModalOpen(); onClose(); }}>New</MenuItem>
                                    <MenuItem icon={<FaUserEdit />} onClick={() => { onEditModalOpen(); onClose(); }}>Edit</MenuItem>
                                </MenuList>}
                            </Menu>
                            <Divider />

                            {/* Reports Section */}
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="green" width="full" justifyContent="space-between">
                                    <HStack spacing={2}>
                                        <FaFileAlt />
                                        <Text>Reports</Text>
                                    </HStack>
                                </MenuButton>
                                <MenuList>
                                    {reportRights && reportRights.ppc === 1 && <MenuItem icon={<FaChartBar />}>PPC</MenuItem>}
                                    {reportRights && reportRights.finance === 1 && <MenuItem onClick={() => router.replace('reports/finance-reports')} icon={<FaDollarSign />}>Finance</MenuItem>}
                                    {reportRights && reportRights.survey === 1 && (
                                        <Menu>
                                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="green" width="full" variant={'outline'} border={'1px solid white'} justifyContent="space-between">
                                                <HStack spacing={2}>
                                                    <FaFileAlt />
                                                    <Text>Survey</Text>
                                                </HStack>
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem icon={<FaFileAlt />} onClick={() => { router.replace('/reports/survey-report'); onClose(); }}>Tabular Reports</MenuItem>
                                                <MenuItem icon={<FaChartBar />} onClick={() => { router.replace('/reports/survey-graphs'); onClose(); }}>Analytical Report</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    )}
                                </MenuList>
                            </Menu>
                            <Divider />

                            {/* Forms Section */}
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="green" width="full" justifyContent="space-between">
                                    <HStack spacing={2}>
                                        <FaWpforms />
                                        <Text>Forms</Text>
                                    </HStack>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem icon={<FaClipboardList />} onClick={() => { router.replace('/survey-form'); onClose(); }}>Survey Form</MenuItem>
                                    <MenuItem icon={<FaMoneyCheckAlt />} onClick={() => { router.replace('/reports/finance-form'); onClose(); }}>Finance Form</MenuItem>
                                </MenuList>
                            </Menu>
                            <Divider />

                            {/* Feature Request Section */}
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="green" width="full" justifyContent="space-between">
                                    <HStack spacing={2}>
                                        <MdHelp />
                                        <Text>Feature Request</Text>
                                    </HStack>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem icon={<FaUserPlus />} onClick={() => { onFeatureModalOpen(); onClose(); }}>New</MenuItem>
                                    <MenuItem icon={<FaUserEdit />} onClick={()=> {onFeatureStatusModalOpen(); onClose();}}>Status</MenuItem>
                                </MenuList>
                            </Menu>
                            <Divider />
                            {isHod && <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="green" width="full" justifyContent="space-between">
                                    <HStack spacing={2}>
                                        <MdHelp />
                                        <Text>HOD</Text>
                                    </HStack>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem icon={<FaUserPlus />} onClick={() => { router.replace('/hod/hod-request') }}>Feature Requests</MenuItem>
                                </MenuList>
                            </Menu>}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <EditUserModal isOpen={isEditModalOpen} onClose={onEditModalClose} />
            <UserModalAdd isOpen={isModalOpen} onClose={onModalClose} />
            <NewFeature isOpen={isFeatureModalOpen} onClose={onFeatureModalClose} />
            <FeatureStatusModal isOpen={isFeatureStatusModalOpen} onClose={onFeatureStatusModalClose} />
        </Box>
    );
};

export default MenuDrawer;
