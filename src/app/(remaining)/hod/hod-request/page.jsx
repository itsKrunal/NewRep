"use client"
import { useEffect, useState } from "react";
import {
    Box,
    VStack,
    Card,
    CardHeader,
    CardBody,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Image,
    Text,
    Button,
    Select,
    useToast,
} from "@chakra-ui/react";
import { ViewIcon, CheckIcon } from "@chakra-ui/icons";
import CustomHeading from "../../../../StyleComponents/PageHeader";
import axios from "axios";
import { fileTypeFromBuffer } from 'file-type';
import { FaCheck, FaEye } from "react-icons/fa";

const Page = () => {
    const [features, setFeatures] = useState([]);
    const [selectedAttachment, setSelectedAttachment] = useState(null);
    const [attachmentType, setAttachmentType] = useState(""); // State for attachment type
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFeatureId, setSelectedFeatureId] = useState(null);
    const [status, setStatus] = useState("");
    const toast = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/getFeatures");
            setFeatures(data.data);
        } catch (error) {
            console.error("Error fetching features:", error);
        }
    };

    const handleViewAttachment = async (attachment) => {
        try {
            const { data } = attachment;
            const buffer = Buffer.from(data);

            const type = await fileTypeFromBuffer(buffer);

            if (type && type.mime) {
                if (type.mime.startsWith('image/')) {
                    const base64String = buffer.toString('base64');
                    setSelectedAttachment(`data:${type.mime};base64,${base64String}`);
                    setAttachmentType('image');
                } else if (type.mime === 'application/pdf') {
                    const base64String = buffer.toString('base64');
                    setSelectedAttachment(`data:application/pdf;base64,${base64String}`);
                    setAttachmentType('pdf');
                } else {
                    console.error('Unsupported file type:', type.mime);
                    setSelectedAttachment(null);
                    setAttachmentType('');
                    return;
                }

                setIsModalOpen(true);
            } else {
                console.error('Unable to detect file type');
                setSelectedAttachment(null);
                setAttachmentType('');
            }
        } catch (error) {
            console.error('Error handling attachment:', error);
            setSelectedAttachment(null);
            setAttachmentType('');
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await axios.post(`/api/markAsRead`, { id });
            toast({
                title: "Marked as read.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
            fetchData(); // Refresh the data
        } catch (error) {
            console.error('Error marking as read:', error);
            toast({
                title: "Failed to mark as read.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await axios.post(`/api/changeStatus`, { id, status });
            toast({
                title: `Status changed to ${status}.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            fetchData(); // Refresh the data
        } catch (error) {
            console.error('Error changing status:', error);
            toast({
                title: "Failed to change status.",
                status: "error",
                duration: 3000,
                position: 'top-right',
                isClosable: true,
            });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAttachment(null);
        setAttachmentType('');
    };

    return (
        <Box p={4} bg={"green.50"} height={"100vh"} w={"100%"}>
            <VStack spacing={6} align="stretch" mt={"3.5em"}>
                <Card boxShadow={"lg"}>
                    <CardHeader>
                        <CustomHeading prop={"Feature Request"} />
                    </CardHeader>
                    <CardBody>
                        <Card boxShadow={"0px 4px 6px rgba(0, 0, 0.2, 0.3)"} p={3}>
                            {/* Table displaying the features */}
                            <TableContainer>
                                <Table variant="striped" colorScheme="green">
                                    <Thead>
                                        <Tr>
                                            <Th>Feature Title</Th>
                                            <Th>Priority Level</Th>
                                            <Th>Target Completion Date</Th>
                                            <Th>Justification</Th>
                                            <Th>Remarks</Th>
                                            <Th>Attachment</Th>
                                            <Th>Mark Read</Th>
                                            <Th>Status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {features?.length > 0 ? (
                                            features?.map((feature, index) => (
                                                <Tr key={index}>
                                                    <Td>{feature.featureTitle}</Td>
                                                    <Td>{feature.priorityLevel}</Td>
                                                    <Td>{new Date(feature.targetCompletionDate).toLocaleDateString()}</Td>
                                                    <Td>{feature.justification}</Td>
                                                    <Td>{feature.remarks}</Td>
                                                    <Td>
                                                        {feature.attachments ? (
                                                            <IconButton
                                                                icon={<ViewIcon />}
                                                                onClick={() => handleViewAttachment(feature.attachments)}
                                                                variant="outline"
                                                                colorScheme="green"
                                                                aria-label="View Attachment"
                                                            />
                                                        ) : (
                                                            "No Attachment"
                                                        )}
                                                    </Td>
                                                    <Td>
                                                        {feature.isRead ? (
                                                            <IconButton
                                                                icon={<FaCheck />}
                                                                colorScheme="green"
                                                                aria-label="Feature Read"
                                                                isDisabled={true} // Disable the button since it's already marked as read
                                                            />
                                                        ) : (
                                                            <Button
                                                                onClick={() => handleMarkAsRead(feature._id)}
                                                                colorScheme="green"
                                                                leftIcon={<FaEye />} // Optionally add an icon to the button
                                                                size="sm" // Adjust the size of the button
                                                            >
                                                                Mark as Read
                                                            </Button>
                                                        )}
                                                    </Td>
                                                    <Td>
                                                        <Select
                                                            value={feature.status || ""} // If status is not set, the value will be an empty string
                                                            onChange={(e) => handleStatusChange(feature._id, e.target.value)}
                                                            placeholder="Change Status" // Placeholder when no status is set
                                                            mt={2}
                                                            bg={'green.50'}
                                                        >
                                                            <option value="approved">Approved</option>
                                                            <option value="disapproved">Disapproved</option>
                                                            <option value="hold">Hold</option>
                                                        </Select>

                                                    </Td>
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td colSpan={8} textAlign="center">
                                                    No features found
                                                </Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </CardBody>
                </Card>
            </VStack>

            {/* Modal for viewing attachment */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Attachment Preview</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {attachmentType === 'image' && selectedAttachment && (
                            <Image
                                src={selectedAttachment}
                                alt="Feature Attachment"
                                maxW="100%"
                                maxH="400px"
                                objectFit="contain"
                            />
                        )}
                        {attachmentType === 'pdf' && selectedAttachment && (
                            <Box
                                as="iframe"
                                src={selectedAttachment}
                                width="100%"
                                height="600px"
                                border="none"
                            >
                                <Text>No preview available</Text>
                            </Box>
                        )}
                        {attachmentType === '' && (
                            <Text>No preview available</Text>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Page;
