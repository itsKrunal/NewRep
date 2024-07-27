"use client"
import { useState } from 'react';
import { Box, Button, Input, Heading, Text, VStack, Flex, useToast, InputGroup, InputRightElement, IconButton, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Register() {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [emailForReset, setEmailForReset] = useState('');
    const router = useRouter();
    const toast = useToast();
    const { toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    

    const handleLogin = async () => {
        try {
            const info = await axios.post('/api/login', { mobileNumber, password });
            console.log(info)
            if (info.data.message === 'Logged in successfully') {
                toast({
                    title: 'Logged In Successfully',
                    status: 'info',
                    position: "top-right",
                    duration: 3000,
                    isClosable: true,
                });
                router.push('/');
            } else {
                const msg = info.data.message ? info.data.message : info.data.messgage;
                if (msg === 'Please enter correct password') {
                    setEmailForReset(mobileNumber); // Set the email for reset
                    setShowForgotPassword(true);
                }
                toast({
                    title: msg,
                    status: 'error',
                    position: "top-right",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error)
            toast({
                title: error.message,
                status: 'error',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleResetPassword = async () => {
        try {
            await axios.post('/api/reset-password', { email: emailForReset, password: newPassword });
            toast({
                title: 'Password reset successfully',
                status: 'success',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
            onClose();
            setShowForgotPassword(false)
        } catch (error) {
            console.log(error);
            toast({
                title: error.message,
                status: 'error',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
            <Box bg="gray.800" p={8} boxShadow="md" width={['90%', '80%', '60%', '40%']} maxWidth="500px" height={'45%'}>
                <VStack spacing={4} align="stretch">
                    <Heading as="h2" size="lg" textAlign="center" color="white">Login</Heading>
                    <Input
                        placeholder="Email Address"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        type="email"
                        bg="gray.700"
                        color="white"
                        _placeholder={{ color: 'gray.400' }}
                    />
                    <InputGroup>
                        <Input
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            bg="gray.700"
                            color="white"
                            _placeholder={{ color: 'gray.400' }}
                        />
                        <InputRightElement>
                            <IconButton
                                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                onClick={handleTogglePassword}
                                variant="ghost"
                                color="gray.400"
                            />
                        </InputRightElement>
                    </InputGroup>
                    <Button colorScheme="green" onClick={handleLogin}>Login</Button>
                    <Flex alignItems="center" justifyContent="center">
                        {!showForgotPassword && <>
                          <Text textAlign="center" color="white">
                            Don't have an account?
                        </Text>
                        <Button ml={2} colorScheme="green" variant="link" onClick={() => router.push('/register')}>
                            Register
                        </Button>
                        </>
                        }
                        {showForgotPassword && (
                            <>
                            <Button ml={2} colorScheme="green" variant="link" onClick={() => router.push('/register')}>
                            Register Here
                        </Button>
                                <Button ml={2} colorScheme="green" variant="link" onClick={onOpen}>
                                    Forgot password?
                                </Button>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Reset Password</ModalHeader>
                                        <ModalBody>
                                            <Input
                                                placeholder="Email Address"
                                                value={emailForReset}
                                                isReadOnly
                                                bg="gray.700"
                                                color="white"
                                                mb={4}
                                            />
                                            <Input
                                                placeholder="New Password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                type="password"
                                                bg="gray.700"
                                                color="white"
                                                _placeholder={{ color: 'gray.400' }}
                                            />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme="green" onClick={handleResetPassword}>
                                                Reset Password
                                            </Button>
                                            <Button ml={3} onClick={onClose}>
                                                Cancel
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </>
                        )}
                    </Flex>
                </VStack>
            </Box>
        </Box>
    );
}
