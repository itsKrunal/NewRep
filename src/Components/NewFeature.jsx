import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Divider,
    VStack,
    FormLabel,
    HStack,
    Input,
    FormControl,
    Icon,
    Textarea,
    Select,
    Button,
    Box,
    useToast
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { FaIdBadge } from "react-icons/fa";

const NewFeature = ({ isOpen, onClose }) => {
    const user = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState({});
    const toast = useToast();
    const [formData, setFormData] = useState({
        featureTitle: '',
        featureDescription: '',
        priorityLevel: '',
        justification: '',
        targetCompletionDate: '',
        attachments: '',
        remarks: ''
    });

    useEffect(() => {
        setUserInfo(user);
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            attachments: file
        }));
    };

    const handleSubmit = async () => {
        const { featureTitle, featureDescription, priorityLevel, justification, targetCompletionDate, remarks } = formData;
        if (!featureTitle || !featureDescription || !priorityLevel || !justification || !targetCompletionDate || !remarks) {
            toast({
                title: "Validation Error",
                description: "Please fill out all required fields.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            // Create a FormData object
            const formDataToSubmit = new FormData();
            
            // Append form data fields
            formDataToSubmit.append('featureTitle', formData.featureTitle);
            formDataToSubmit.append('featureDescription', formData.featureDescription);
            formDataToSubmit.append('priorityLevel', formData.priorityLevel);
            formDataToSubmit.append('justification', formData.justification);
            formDataToSubmit.append('targetCompletionDate', formData.targetCompletionDate);
            formDataToSubmit.append('remarks', formData.remarks);
            formDataToSubmit.append('eId', userInfo.eId); // Ensure you include user information
            
            // Append file if available
            if (formData.attachments) {
                formDataToSubmit.append('attachments', formData.attachments);
            }
            
            // Send a POST request to the API endpoint
            const response = await axios.post('/api/addFeature', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            // Handle the response
            console.log("Server Response:", response.data);
        
            setFormData({
                featureTitle: '',
                featureDescription: '',
                priorityLevel: '',
                justification: '',
                targetCompletionDate: '',
                attachments: '',
                remarks: ''
            });
            onClose(); // Close the modal
    
        } catch (error) {
            console.error("Error submitting feature request:", error);
            // Handle error appropriately
        }
    }
    

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Feature</ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4} align="start" width="full">
                        <FormControl borderColor={'green.200'}>
                            <FormLabel>
                                <HStack spacing={2}>
                                    <Icon as={FaIdBadge} />
                                    <span>ERP ID</span>
                                </HStack>
                            </FormLabel>
                            <Input
                                readOnly
                                placeholder="Enter ERP ID"
                                value={userInfo.eId}
                            />
                        </FormControl>
                        <Divider />
                        <FormControl borderColor={'green.200'}>
                            <FormLabel>
                                <HStack spacing={2}>
                                    <Icon as={FaIdBadge} />
                                    <span>Employee Name</span>
                                </HStack>
                            </FormLabel>
                            <Input
                                readOnly
                                placeholder="Enter Employee Name"
                                value={userInfo.userName}
                            />
                        </FormControl>
                        <Divider />
                        <FormControl borderColor={'green.200'}>
                            <FormLabel>Feature Title</FormLabel>
                            <Input
                                name="featureTitle"
                                placeholder="Feature Title"
                                value={formData.featureTitle}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl borderColor={'green.200'}>
                            <FormLabel>Feature Description</FormLabel>
                            <Textarea
                                name="featureDescription"
                                placeholder="Detailed description of the feature"
                                value={formData.featureDescription}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl borderColor={'green.200'}>
                            <FormLabel>Priority Level</FormLabel>
                            <Select
                                name="priorityLevel"
                                placeholder="Select priority level"
                                value={formData.priorityLevel}
                                onChange={handleInputChange}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </Select>
                        </FormControl>
                        <FormControl borderColor={'green.200'}>
                            <FormLabel>Justification</FormLabel>
                            <Textarea
                                name="justification"
                                placeholder="Explain why this feature is necessary"
                                value={formData.justification}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl borderColor={'green.200'}>
                            <FormLabel>Target Completion Date</FormLabel>
                            <Input
                                type="date"
                                name="targetCompletionDate"
                                value={formData.targetCompletionDate}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl borderColor={'green.200'}>
                            <FormLabel>Attachments</FormLabel>
                            <Input
                                type="file"
                                name="attachments"
                                onChange={handleFileChange}
                            />
                        </FormControl>
                        <FormControl borderColor={'green.200'}>
                            <FormLabel>Remarks</FormLabel>
                            <Textarea
                                name="remarks"
                                placeholder="Any additional comments or notes"
                                value={formData.remarks}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <HStack spacing={4}>
                        <Button colorScheme="green" onClick={handleSubmit}>Submit</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default NewFeature;
