import React, { useState } from "react";
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

const UserAddModal = ({ isOpen, onClose }) => {
    const [eId, setErpId] = useState('');
    const [userName, setUserName] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [reportAccess, setReportAccess] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleSave = async () => {
        if (!/^\d{3,4}$/.test(eId)) {
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
        
        if (!email.includes('desireenergy.com')) {
            toast({
                title: "Invalid email",
                description: "Email should contain desire energy domain.",
                status: "error",
                position: "top-right",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        if (userName.trim() === '') {
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

        if (!department) {
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

        const userData = {
            eId: parseInt(eId),
            userName,
            email,
            department,
            reportsRight: {
                finance: reportAccess.includes("finance") ? 1 : 0,
                ppc: reportAccess.includes("ppc") ? 1 : 0,
                survey: reportAccess.includes("survey") ? 1 : 0,
            }
        };

        if (isAdmin) {
            userData.role = 'Admin';
        }

        try {
            setLoading(true);
            await axios.post('/api/addMainUser', userData);
            toast({
                title: "User created.",
                description: "The new user has been created successfully.",
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
                description: "There was an error creating the user.",
                status: "error",
                position: "top-right",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setErpId('');
            setDepartment('');
            setUserName('');
            setReportAccess([]);
            setEmail('');
            setIsAdmin(false);
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New User</ModalHeader>
                <Divider mt={4} mb={2} />
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4} align="start" width="full">
                        <FormControl borderColor={'green.200'}>
                            <FormLabel>
                                <HStack spacing={2}>
                                    <Icon as={FaIdBadge} />
                                    <span>ERP ID</span>
                                </HStack>
                            </FormLabel>
                            <Input
                                placeholder="Enter ERP ID"
                                value={eId}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,4}$/.test(value)) {
                                        setErpId(value);
                                    }
                                }}
                            />
                        </FormControl>
                        <Divider />
                        <FormControl>
                            <FormLabel>
                                <HStack>
                                    <Icon as={EmailIcon} />
                                    <span>Email</span>
                                </HStack>
                            </FormLabel>
                            <Input
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                color="black"
                            />
                        </FormControl>
                        <Divider />
                        <FormControl borderColor={'green.200'}>
                            <FormLabel>
                                <HStack spacing={2}>
                                    <Icon as={FaUser} />
                                    <span>User Name</span>
                                </HStack>
                            </FormLabel>
                            <Input
                                placeholder="Enter User Name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
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
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
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
                                value={reportAccess}
                                onChange={setReportAccess}
                            >
                                <Stack spacing={2} direction="column">
                                    <Checkbox colorScheme="green" value="finance">Finance</Checkbox>
                                    <Checkbox colorScheme="green" value="ppc">PPC</Checkbox>
                                    <Checkbox colorScheme="green" value="survey">Survey</Checkbox>
                                </Stack>
                            </CheckboxGroup>
                        </FormControl>
                        <Divider />
                        <FormControl borderColor={'green.200'}>
                            <FormLabel>
                                <HStack spacing={2}>
                                    <Icon as={FaCheckCircle} />
                                    <span>Admin</span>
                                </HStack>
                            </FormLabel>
                            <Checkbox
                                colorScheme="green"
                                isChecked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            >
                                Admin
                            </Checkbox>
                        </FormControl>
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

export default UserAddModal;
