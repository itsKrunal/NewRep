import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Input } from "antd";  // Import Input from antd for search bar
import { Modal, useToast, Box, Divider, Text, ModalBody, ModalContent, ModalHeader, ModalCloseButton, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import moment from "moment";

const FeatureStatusModal = ({ isOpen, onClose }) => {
    const user = useSelector((state) => state.user);
    const [features, setFeatures] = useState([]);
    const [searchText, setSearchText] = useState('');  // State for search input
    const toast = useToast();

    useEffect(() => {
        // Call fetchData only when the modal is opened
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/getMyFeature");
            const sortedFeatures = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setFeatures(sortedFeatures);
        } catch (error) {
            toast({
                title: 'Error Fetching Data',
                description: 'There was an error fetching the features data. Please try again later.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            });
            console.error("Error fetching features:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    // Filter features based on search text
    const filteredFeatures = features.filter(feature =>
        feature.featureTitle.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: 'Title',
            dataIndex: 'featureTitle',
            key: 'featureTitle',
            render: text => <Text fontWeight="bold">{text}</Text>,
        },
        {
            title: 'Read',
            dataIndex: 'isRead',
            key: 'isRead',
            render: isRead => (
                <Tag color={isRead ? "blue" : "gray"}>
                    {isRead ? "Read" : "Unread"}
                </Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                const color = status === "approved" ? "green" : status === "hold" ? "yellow" : "red";
                return <Tag color={color}>{status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending'}</Tag>;
            },
        },
        {
            title: 'Date Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: date => moment(date).format("MMM DD, YYYY [at] h:mm A"),
        },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
            isCentered
            closeOnOverlayClick={false}
        >
            <ModalContent boxShadow="0 0 10px 2px rgba(0, 0, 0, 0.2)" >
                <ModalHeader>Feature Status

                <Flex alignItems={'flex-end'} justifyContent={'flex-end'} >
                        <Input
                            placeholder="Search by title"
                            value={searchText}
                            onChange={handleSearch}
                            style={{ width: '30%' }}
                        />
                    </Flex>

                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box mb={4}>
                        <Divider />
                    </Box>
                    
                    <Table
                        dataSource={filteredFeatures}
                        columns={columns}
                        rowKey="_id"
                        pagination={false}
                        bordered
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default FeatureStatusModal;
