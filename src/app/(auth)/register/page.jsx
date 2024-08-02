"use client"
import { useEffect, useState } from 'react';
import { Box, Button, Input, Heading, Text, VStack, Flex, useToast, InputGroup, InputRightElement, IconButton, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon } from '@chakra-ui/icons'; // Import the CheckCircleIcon


export default function Register() {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const toast = useToast();
    const router = useRouter();
    const { toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const sendOtp = async () => {
        setOtpLoading(true)
        try {
            if (!mobileNumber.includes('desireenergy.com')) {
                toast({
                    title: 'Please enter email with desire domain!',
                    status: 'info',
                    position: "top-right",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            await axios.post('api/sendOtp', { mobileNumber, password });
            onOpen(); // Open the modal after sending OTP
        } catch (error) {
            console.log(error)
            toast({
                title: error.data.message,
                status: 'error',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setOtpLoading(false)
        }
    }

    const handleRegister = async () => {
        try {
            if (!mobileNumber.includes('desireenergy.com')) {
                toast({
                    title: 'Please enter email with desire domain!',
                    status: 'info',
                    position: "top-right",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            if (!isVerified) {
                toast({
                    title: 'Please verify your email!',
                    status: 'info',
                    position: "top-right",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            const info = await axios.post('/api/register', { mobileNumber, password, });
            console.log(info);
            if (info.data.message === 'Registered successfully') {
                toast({
                    title: 'Registered Successfully',
                    status: 'info',
                    position: "top-right",
                    duration: 3000,
                    isClosable: true,
                });
                onClose(); // Close the modal after successful registration
                router.push('/login');
            } else {
                toast({
                    title: info.data.message,
                    status: 'error',
                    position: "top-right",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: error.message,
                status: 'error',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        }
    };


    const handleVerify = async () => {

        try {
            await axios.post('/api/verify', {otp, mobileNumber});
            toast({
                title: "Otp verified successfully!",
                status: 'success',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
            onClose()
            setIsVerified(true);
        } catch (error) {
            toast({
                title: "Please enter correct OTP!",
                status: 'error',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" height="90vh">
            <Box bg="gray.800" p={8} borderRadius="md" boxShadow="md" width={['90%', '80%', '60%', '40%']} maxWidth="500px" height={'45%'}>
                <VStack spacing={4} align="stretch">
                    <Heading as="h2" size="lg" textAlign="center" color="white">Register</Heading>
                    <Input
                        placeholder="Email Address"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        type="email"
                        bg="gray.700"
                        readOnly={isVerified}
                        color="white"
                        _placeholder={{ color: 'gray.400' }}
                    />
                    {!isVerified  && mobileNumber.includes('desireenergy.com') && <Flex alignItems={'flex-end'} display={'flex'} justifyContent={'flex-end'}>
                        <Button isLoading={otpLoading} size={'sm'} w={'20%'} onClick={sendOtp} isDisabled={!mobileNumber.includes('desireenergy.com')}>Send Otp</Button>
                    </Flex>}
                    {isVerified && <InputGroup>
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
                    </InputGroup>}

                    <Button colorScheme="green" onClick={handleRegister}>Register</Button>
                    <Flex alignItems="center" justifyContent="center">
                        <Text textAlign="center" color="white">
                            Already have an account?
                        </Text>
                        <Button ml={2} colorScheme="green" variant="link" onClick={() => router.push('/login')}>
                            Login
                        </Button>
                    </Flex>
                </VStack>
            </Box>

            {/* OTP Modal */}
            <Modal isOpen={isOpen} bg="gray.800"  onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="gray.800" color={'white'}>
                    <ModalHeader>Enter OTP</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody bg="gray.800">
                        <Input
                            variant="ghost"
                            bg="gray.700"
                            onChange={(e) => { setOtp(e.target.value) }}
                            placeholder='Enter Otp Sent To Your Email!'
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="green" onClick={handleVerify}>Verify</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
