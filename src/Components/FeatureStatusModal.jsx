import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Divider,
    Box,
    Text,
    Badge,
    Stack,
    Center,
    VStack,
    HStack,
    Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import moment from "moment";

const FeatureStatusModal = ({ isOpen, onClose }) => {
    const user = useSelector((state) => state.user);
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/getFeatures");
            const sortedFeatures = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setFeatures(sortedFeatures);
        } catch (error) {
            console.error("Error fetching features:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Feature Status</ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody>
                    {features.length > 0 ? (
                        <Stack spacing={4}>
                            {features.map((feature) => {
                                const featureStatus = feature.status || "pending"; // Default to "pending" if status is not present
                                const formattedDate = moment(feature.createdAt).format("MMM DD, YYYY [at] h:mm A");

                                return (
                                    <Box
                                        key={feature._id}
                                        p={4}
                                        borderWidth="1px"
                                        borderRadius="md"
                                        bg={feature.isRead ? "gray.50" : "white"}
                                        boxShadow="sm"
                                        transition="background 0.3s ease"
                                        _hover={{ bg: "gray.100" }}
                                    >
                                        <VStack align="start" spacing={3}>
                                            <Flex w={'100%'} justifyContent={'space-between'}>
                                                <Box>
                                                    <Text fontSize="md" color="gray.600" mb={1}>
                                                        Title:
                                                    </Text>
                                                    <Text fontSize="lg" fontWeight="bold">
                                                        {feature.featureTitle}
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <Badge
                                                        colorScheme={
                                                            featureStatus === "approved"
                                                                ? "green"
                                                                : featureStatus === "hold"
                                                                    ? "yellow"
                                                                    : "red"
                                                        }
                                                    >
                                                        {featureStatus.charAt(0).toUpperCase() + featureStatus.slice(1)}
                                                    </Badge>
                                                </Box>
                                            </Flex>
                                            <Divider />
                                            <HStack spacing={4}>
                                                {/* <Box>
                                                    <Text fontSize="md" color="gray.600" mb={1}>
                                                        Status:
                                                    </Text>
                                                    <Badge
                                                        colorScheme={
                                                            featureStatus === "approved"
                                                                ? "green"
                                                                : featureStatus === "hold"
                                                                    ? "yellow"
                                                                    : "red"
                                                        }
                                                    >
                                                        {featureStatus.charAt(0).toUpperCase() + featureStatus.slice(1)}
                                                    </Badge>
                                                </Box> */}
                                                <Box>
                                                    <Text fontSize="md" color="gray.600" mb={1}>
                                                        Read:
                                                    </Text>
                                                    <Badge colorScheme={feature.isRead ? "blue" : "gray"}>
                                                        {feature.isRead ? "Read" : "Unread"}
                                                    </Badge>
                                                </Box>
                                                <Box>
                                                    <Text fontSize="md" color="gray.600" mb={1}>
                                                        Date Created:
                                                    </Text>
                                                    <Text fontSize="sm" color="gray.500">
                                                        {formattedDate}
                                                    </Text>
                                                </Box>
                                            </HStack>
                                        </VStack>
                                    </Box>
                                );
                            })}
                        </Stack>
                    ) : (
                        <Center py={6}>
                            <Text>No feature requests available.</Text>
                        </Center>
                    )}
                </ModalBody>
                <ModalFooter>
                    {/* Add buttons or other controls here if needed */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default FeatureStatusModal;
