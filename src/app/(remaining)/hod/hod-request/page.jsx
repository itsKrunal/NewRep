"use client";
import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
  Select,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, CheckIcon } from "@chakra-ui/icons";
import { Table, Pagination } from "antd";
import { FaCheck, FaEye } from "react-icons/fa";
import CustomHeading from "../../../../StyleComponents/PageHeader";
import axios from "axios";
import { fileTypeFromBuffer } from 'file-type';

const Page = () => {
  const [features, setFeatures] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [attachmentType, setAttachmentType] = useState(""); // State for attachment type
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
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

  const columns = [
    { title: 'Employee ID', dataIndex: 'eId', key: 'eId' },
    { title: 'Feature Title', dataIndex: 'featureTitle', key: 'featureTitle' },
    { title: 'Priority Level', dataIndex: 'priorityLevel', key: 'priorityLevel' },
    { title: 'Target Completion Date', dataIndex: 'targetCompletionDate', key: 'targetCompletionDate', render: (text) => new Date(text).toLocaleDateString() },
    { title: 'Justification', dataIndex: 'justification', key: 'justification' },
    { title: 'Remarks', dataIndex: 'remarks', key: 'remarks' },
    {
      title: 'Attachment', key: 'attachment',
      render: (_, record) => (
        record.attachments ? (
          <Button
            onClick={() => handleViewAttachment(record.attachments)}
            colorScheme="green"
            leftIcon={<ViewIcon />}
            size="sm"
          >
            View
          </Button>
        ) : (
          "No Attachment"
        )
      )
    },
    {
      title: 'Mark Read', key: 'markRead',
      render: (_, record) => (
        record.isRead ? (
          <Button
            colorScheme="green"
            leftIcon={<FaCheck />}
            isDisabled
            size="sm"
          >
            Read
          </Button>
        ) : (
          <Button
            onClick={() => handleMarkAsRead(record._id)}
            colorScheme="green"
            leftIcon={<FaEye />}
            size="sm"
          >
            Mark as Read
          </Button>
        )
      )
    },
    {
      title: 'Status', key: 'status',
      render: (_, record) => (
        <Select
          value={record.status || ""}
          onChange={(e) => handleStatusChange(record._id, e.target.value)}
          placeholder="Change Status"
          bg={'green.50'}
          size="sm"
        >
          <option value="approved">Approved</option>
          <option value="disapproved">Disapproved</option>
          <option value="hold">Hold</option>
        </Select>
      )
    },
  ];

  return (
    <Box p={4} bg={"green.50"} height={"100vh"} w={"100%"}>
      <VStack spacing={6} align="stretch" mt={"3.5em"}>
        <Card boxShadow={"lg"}>
          <CardHeader>
            <CustomHeading prop={"Feature Request"} />
          </CardHeader>
          <CardBody>
            <Card boxShadow={"0px 4px 6px rgba(0, 0, 0.2, 0.3)"} p={3}>
              <Table
                dataSource={features.map((feature) => ({
                  key: feature._id,
                  ...feature,
                }))}
                columns={columns}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  onChange: (page, size) => {
                    setCurrentPage(page);
                    setPageSize(size);
                  },
                  showSizeChanger: true,
                }}
              />
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
