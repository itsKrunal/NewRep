"use client"
import { Box, Flex, Heading, Image, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {

    const router = useRouter();
    return (
        <Box
            as="header"
            bgGradient="linear(to-r, green.500, green.500)"
            boxShadow="md"
        >
            <Flex
                justify="space-between"
                align="center"
                maxW="1200px"
                mx="auto"
                flexWrap="wrap"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    textAlign="center"
                >
                    <Image
                        src="/desireLogo.png"
                        alt="Desire Logo"
                        onClick={()=> {router.push('/')}}
                        width={300}
                        height={100}
                        objectFit="contain"
                        mr={2}
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export default Header;
