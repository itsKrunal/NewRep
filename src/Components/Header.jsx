"use client";
import { Box, Flex, Image, Button, Avatar, Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider, Icon } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MdHome, MdEmail, MdExitToApp, MdAccountCircle, MdLogin } from 'react-icons/md';

const Header = () => {
    const router = useRouter();
    const [email, setEmail] = useState(''); 
    const [isPublic, setIsPublic] = useState(false);
    const logout = async () => {
        await axios.get('/api/logout');
        router.push('/login');
    }


    const getInfo = async () => {
        try {
            const resp = await axios.get('/api/me');
            setIsPublic(false)
            setEmail(resp.data.decodedToken.user.email);
        } catch (error) {
            setIsPublic(true)
        }
    }

    return (
        <Box
            as="header"
            bgGradient="linear(to-r, green.500, green.500)"
            boxShadow="md"
            p={2}
        >
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    textAlign="center"
                >
                    <Image
                        src="/desireLogo.png"
                        alt="Desire Logo"
                        onClick={() => { router.push('/') }}
                        width={'36%'}
                        height={'40%'}
                        objectFit="contain"
                        mr={2}
                    />
                </Box>
                <Box display={'flex'} alignItems={'center'} gap={'10px'} onClick={()=> getInfo()}>
                    <Menu>
                        <MenuButton as={Button} p={0} borderRadius={'100%'} cursor="pointer">
                            <Avatar icon={<Icon as={MdAccountCircle} w={6} h={6} />} />
                        </MenuButton>
                        <MenuList>
                            <MenuGroup title="Account">
                                {!isPublic ? (
                                    <>
                                        <MenuItem icon={<MdHome />} onClick={() => { router.push('/') }}>Home</MenuItem>
                                        <MenuDivider />
                                        <MenuItem icon={<MdEmail />}>{email}</MenuItem>
                                        <MenuDivider />
                                        <MenuItem icon={<MdExitToApp />} onClick={logout}>Logout</MenuItem>
                                    </>
                                ) : (
                                    <MenuItem icon={<MdLogin />} onClick={() => { router.push('/login') }}>Login</MenuItem>
                                )}
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>
        </Box>
    );
};

export default Header;
