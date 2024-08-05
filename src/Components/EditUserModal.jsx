import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Select,
    Checkbox,
    Stack,
    CheckboxGroup,
    Button,
    useToast,
    VStack,
    Divider,
    Icon,
    HStack
} from "@chakra-ui/react";
import { FaUser, FaIdBadge, FaBuilding, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import departments from '../Utils/departments';
import { EmailIcon } from "@chakra-ui/icons";

const EditUserModal = ({ isOpen, onClose }) => {
    const [selectedUserId, setSelectedUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (isOpen) {
            fetchUsers();
        }
    }, [isOpen]);
    
    useEffect(()=> {
        setSelectedUserId('')
    }, [onClose])

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/getMainUsers');

            console.log("THISSSISSISISI", response.data.data)
            setUsers(response.data.data);
        } catch (error) {
            toast({
                title: "Error fetching users",
                description: "There was an error fetching the users.",
                status: "error",
                position: "top-right",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(()=> {
        console.log(userData)
    }, [userData])

    const handleUserSelect = (e) => {
        console.log(e.target.value);
        const userId = e.target.value;
        setSelectedUserId(userId);
        const selectedUser = users.find(user => user.email === userId);
        if (selectedUser) {
            setUserData({
                eId: selectedUser.eId,
                userName: selectedUser.userName,
                department: selectedUser.department,
                email: selectedUser.email,
                reportAccess: [
                    selectedUser.reportsRight.finance ? "finance" : "",
                    selectedUser.reportsRight.ppc ? "ppc" : "",
                    selectedUser.reportsRight.survey ? "survey" : ""
                ].filter(Boolean)
            });
        }
    };

    const handleSave = async () => {
        if (!/^\d{3,4}$/.test(userData.eId)) {
            toast({
                title: "Invalid ERP ID",
                description: "ERP ID must be a 4-digit number.",
                status: "error",
                position: "top-right",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        if (userData.userName.trim() === '') {
            toast({
                title: "Invalid User Name",
                description: "User Name cannot be empty.",
                status: "error",
                position: "top-right",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        if (!userData.department) {
            toast({
                title: "Invalid Department",
                description: "Please select a department.",
                status: "error",
                position: "top-right",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const updatedUserData = {
            ...userData,
            eId: parseInt(userData.eId),
            reportsRight: {
                finance: userData.reportAccess.includes("finance") ? 1 : 0,
                ppc: userData.reportAccess.includes("ppc") ? 1 : 0,
                survey: userData.reportAccess.includes("survey") ? 1 : 0,
            }
        };

        try {
            setLoading(true);
            await axios.post(`/api/updateUser`, updatedUserData);
            toast({
                title: "User updated.",
                description: "The user has been updated successfully.",
                status: "success",
                position: "top-right",
                duration: 5000,
                isClosable: true,
                icon: <FaCheckCircle />,
            });
            onClose();
        } catch (error) {
            toast({
                title: error.response.data.message,
                description: "There was an error updating the user.",
                status: "error",
                position: "top-right",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setSelectedUserId('');
            setUserData({});
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit User</ModalHeader>
                <Divider />
                <Divider mt={4} mb={2} />

                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4} align="start" width="full">
                        <FormControl borderColor={'green.200'}>
                            <FormLabel>Select User</FormLabel>
                            <Select
                                placeholder="Select user to edit"
                                value={selectedUserId}
                                onChange={handleUserSelect}
                                borderColor={'green.200'}
                                color="black"
                            >
                                {users.map(user => (
                                    <option key={user.email} value={user.email}>
                                        {user.email}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <Divider />
                        <Divider />
                        {selectedUserId && (
                            <>
                                <FormControl borderColor={'green.200'}>
                                    <FormLabel>
                                        <HStack spacing={2}>
                                            <Icon as={FaIdBadge} />
                                            <span>ERP ID</span>
                                        </HStack>
                                    </FormLabel>
                                    <Input
                                        placeholder="Enter ERP ID"
                                        value={userData.eId || ''}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d{0,4}$/.test(value)) {
                                                setUserData({ ...userData, eId: value });
                                            }
                                        }}
                                    />
                                </FormControl>
                                <Divider />
                                {/* <FormControl>
                                    <FormLabel>
                                        <HStack>
                                            <Icon as={EmailIcon} />
                                            <span>Email</span>
                                        </HStack>
                                    </FormLabel>
                                    <Input
                                        value={userData.email || ''}
                                        isReadOnly
                                        color="black"
                                    />
                                </FormControl> */}
                                <FormControl borderColor={'green.200'}>
                                    <FormLabel>
                                        <HStack spacing={2}>
                                            <Icon as={FaUser} />
                                            <span>User Name</span>
                                        </HStack>
                                    </FormLabel>
                                    <Input
                                        placeholder="Enter User Name"
                                        value={userData.userName || ''}
                                        onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                                    />
                                </FormControl>
                                <Divider />
                                <FormControl borderColor={'green.200'}>
                                    <FormLabel>
                                        <HStack spacing={2}>
                                            <Icon as={FaBuilding} />
                                            <span>Department</span>
                                        </HStack>
                                    </FormLabel>
                                    <Select
                                        borderColor={'green.200'}
                                        color="black"
                                        _placeholder={{ color: 'gray.400' }}
                                        value={userData.department || ''}
                                        onChange={(e) => setUserData({ ...userData, department: e.target.value })}
                                        placeholder="Select your Department"
                                    >
                                        {departments.map((dept) => (
                                            <option key={dept} style={{ color: "black" }} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Divider />
                                <FormControl borderColor={'green.200'}>
                                    <FormLabel>
                                        <HStack spacing={2}>
                                            <Icon as={FaClipboardList} />
                                            <span>Report Access</span>
                                        </HStack>
                                    </FormLabel>
                                    <CheckboxGroup
                                        value={userData.reportAccess || []}
                                        onChange={(values) => setUserData({ ...userData, reportAccess: values })}
                                    >
                                        <Stack spacing={2} direction="column">
                                            <Checkbox colorScheme="green" value="finance">Finance</Checkbox>
                                            <Checkbox colorScheme="green" value="ppc">PPC</Checkbox>
                                            <Checkbox colorScheme="green" value="survey">Survey</Checkbox>
                                        </Stack>
                                    </CheckboxGroup>
                                </FormControl>
                            </>
                        )}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='green' isLoading={loading} mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button bg={'green.50'} onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditUserModal;
