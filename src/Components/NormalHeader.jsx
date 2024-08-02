"use client";
import { Box, Flex, Image, Button, Avatar, Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider, Icon } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Header = () => {
    const router = useRouter();
    
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
                        height={'45%'}
                        objectFit="contain"
                        mr={2}
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export default Header;
