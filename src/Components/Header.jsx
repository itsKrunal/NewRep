"use client";
import { Box, Flex, Image, Button, Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider, Icon, Badge, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, useToast, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { MdHome, MdEmail, MdExitToApp, MdAccountCircle, MdLogin, MdLock } from 'react-icons/md';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

const Header = () => {
    const router = useRouter();
    const user = useSelector((state) => state.user)
    console.log("THOSSSS", user)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [email, setEmail] = useState(user.email);
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [verified, setIsVerified] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const toast = useToast();

    const logout = async () => {
        await axios.get('/api/logout');
        router.push('/login');
    }

    useEffect(()=> {
        setEmail(user.email)
    }, [user])



    const sendOtp = async () => {
        setOtpLoading(true);
        try {
            await axios.post('/api/sendOtp', { mobileNumber : email, forget : true });
            toast({
                title: 'OTP has been sent to your email!',
                status: 'info',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: error.message,
                status: 'error',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setOtpLoading(false);
        }
    }

    const handleResetPassword = async () => {
        if (!verified) {
            toast({
                title: 'Please verify your OTP!',
                status: 'info',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            await axios.post('/api/reset-password', { email, password: newPassword });
            toast({
                title: 'Password reset successfully',
                status: 'success',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            toast({
                title: error.message,
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

    const handleVerify = async () => {
        try {
            await axios.post('/api/verify', { otp, mobileNumber : email });
            toast({
                title: "OTP verified successfully!",
                status: 'success',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
            setIsVerified(true);
        } catch (error) {
            toast({
                title: "Invalid OTP!",
                status: 'error',
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    useEffect(() => {
        if (otp.length === 6) handleVerify();
    }, [otp]);

    return (
        <Box
            as="header"
            bgGradient="linear(to-r, green.500, green.500)"
            boxShadow="md"
            p={2}
        >
            <Flex
                justifyContent="space-between"
                alignItems="center"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    textAlign="center"
                >
                    <Image
                        src="/desireWhite.webp"
                        alt="Desire Logo"
                        onClick={() => { router.push('/') }}
                        width="20%"
                        height="20%"
                        objectFit="contain"
                        mr={2}
                    />
                </Box>
                <Box display={'flex'} alignItems={'center'} gap={'10px'}>
                    <Menu>
                        <MenuButton as={Button} p={0} borderRadius="full" cursor="pointer" bg="transparent">
                            <Icon as={MdAccountCircle} w={10} h={10} color="black" />
                        </MenuButton>
                        <MenuList>
                            <MenuGroup  title="Account">
                                        <MenuItem icon={<MdHome />} onClick={() => { router.push('/') }}>Home</MenuItem>
                                        <MenuDivider />
                                        <MenuItem icon={<MdEmail />}>{email}</MenuItem>
                                        <MenuDivider />
                                        <MenuItem icon={<MdLock />} onClick={onOpen}>Reset Password</MenuItem>
                                        <MenuDivider />
                                        <MenuItem icon={<MdExitToApp />} onClick={logout}>Logout</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>

            {/* Modal for Reset Password */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Reset Password</ModalHeader>
                    <ModalBody>
                        <Input
                            placeholder="Email Address"
                            value={email}
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
                        {verified && (
                            <InputGroup mt={2}>
                                <Input
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
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
                        )}
                        {!verified && (
                            <Flex mt={3} alignItems={'flex-end'} display={'flex'} justifyContent={'flex-end'}>
                                <Button colorScheme='blue' isLoading={otpLoading} size={'sm'} w={'20%'} onClick={sendOtp}>
                                    Send OTP
                                </Button>
                            </Flex>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" onClick={handleResetPassword} isDisabled={!verified}>
                            Reset Password
                        </Button>
                        <Button ml={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Header;
