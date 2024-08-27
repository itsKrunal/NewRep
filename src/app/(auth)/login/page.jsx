"use client";
import { useEffect, useState } from 'react';
import { Box, Button, Input, Heading, Text, VStack, Flex, useToast, InputGroup, InputRightElement, IconButton, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Image, Divider } from '@chakra-ui/react';
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
    const [otp, setOtp] = useState('');
    const [verified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [otpLoading, setOtpLoading] = useState(false);

    useEffect(() => {
        if (otp.length === 6) handleVerify();
    }, [otp]);

    const sendOtp = async () => {
        setOtpLoading(true);
        try {
            await axios.post('api/sendOtp', { mobileNumber, forget: true });
            onOpen(); // Open the modal after sending OTP
            toast({
                title: 'Otp has been sent to your registered mail!',
                status: 'info',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.log(error);
            toast({
                title: error.data.message,
                status: 'error',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setOtpLoading(false);
        }
    };

    const handleLogin = async (e) => {
        setLoading(true);
        try {
            const info = await axios.post('/api/login', { mobileNumber, password });
            console.log(info);
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
            console.log(error);
            toast({
                title: error.message,
                status: 'error',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!verified) {
            toast({
                title: 'Please verify your email!',
                status: 'info',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

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
            setShowForgotPassword(false);
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

    const handleVerify = async () => {
        try {
            await axios.post('/api/verify', { otp, mobileNumber });
            toast({
                title: "Otp verified successfully!",
                status: 'success',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
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
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" height="90vh">
            <Box bg="gray.800" p={8} boxShadow="md" width={['90%', '80%', '60%', '40%']} maxWidth="500px" borderRadius={'5%'} height={'57%'}>
                <VStack spacing={4} align="stretch">
                   <Flex justifyContent={'center'} alignItems={'center'}>

                    <Image 
                        src="/desireWhite.webp" 
                        alt="Desire Logo"
                        width="36%"
                        height="45%"
                        objectFit="contain"
                        mr={2}
                    />

                   </Flex>
                   <Divider/>
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
                    <Button type="button" colorScheme="green" onClick={handleLogin} border='0' isLoading={loading}>Login</Button>
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
                                                placeholder="OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                bg="gray.700"
                                                color="white"
                                                _placeholder={{ color: 'gray.400' }}
                                            />
                                            {verified && <Input
                                                placeholder="New Password"
                                                mt={2}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                type="password"
                                                bg="gray.700"
                                                color="white"
                                                _placeholder={{ color: 'gray.400' }}
                                            />}
                                        {!verified &&  <Flex mt={3} alignItems={'flex-end'} display={'flex'} justifyContent={'flex-end'}>
                                            <Button type="button" colorScheme='blue' isLoading={otpLoading} size={'sm'} w={'20%'} onClick={sendOtp} isDisabled={!mobileNumber.includes('desireenergy.com')}>Send Otp</Button>
                                        </Flex>}
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button type="button" colorScheme="green" onClick={handleResetPassword}>
                                                Reset Password
                                            </Button>
                                            <Button type="button" ml={3} onClick={onClose}>
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
