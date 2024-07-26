"use client"
import { useState } from 'react';
import { Box, Button, Input, Heading, Text, VStack, Flex, useToast, InputGroup, InputRightElement, IconButton, useColorMode } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Register() {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const toast = useToast();
    const { toggleColorMode } = useColorMode();

    const handleLogin = async () => {
        try {
            const info = await axios.post('/api/login', { mobileNumber, password });
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

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh" >
            <Box bg="gray.800" p={8}  boxShadow="md" width={['90%', '80%', '60%', '40%']} maxWidth="500px" height={'45%'}>
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
                        <Text textAlign="center" color="white">
                            Don't have an account?
                        </Text>
                        <Button ml={2} colorScheme="green" variant="link" onClick={() => router.push('/register')}>
                            Register
                        </Button>
                    </Flex>
                </VStack>
            </Box>
        </Box>
    );
}