"use client";
import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Grid, Select, Text, useToast, Icon, Flex, Input } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@chakra-ui/icons'; // Import the CheckCircleIcon
import Image from 'next/image';
import axios from 'axios';

const departments = [
    "Admin",
    "Aqualogix",
    "Business Development",
    "DTT",
    "E&I",
    "Engineering",
    "EPC",
    "ESCO",
    "Expense",
    "Finance and Accounts",
    "HO",
    "HO-Marketing",
    "HR",
    "Information Technology",
    "MMC",
    "Operations",
    "PPC",
    "Purchase",
    "RO",
    "Sales",
    "SOLAR",
    "Support",
    "Tender"
];



const surveySections = [
    {
        title: "Employee Happiness Survey (Periodic)",
        fields: [
            {
                label: "Job Satisfaction",
                name: "jobSatisfaction",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Work Life Balance",
                name: "workLifeBalance",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Work Environment",
                name: "workEnvironment",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Recognition",
                name: "recognition",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            }
        ]
    },
    {
        title: "Trust",
        fields: [
            {
                label: "I am confident in the leadership's ability to make good decisions for the future of the company.",
                name: "leadershipConfidence",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I have a clear understanding of what is expected of me in my role.",
                name: "roleUnderstanding",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I feel management keeps me informed about important company news and decisions.",
                name: "managementCommunication",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I believe people are treated fairly at this company, regardless of their background or position.",
                name: "fairTreatment",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            }
        ]
    },
    {
        title: "Respect",
        fields: [
            {
                label: "I feel valued as an employee at this company.",
                name: "valuedEmployee",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I am given the opportunity to use my skills and abilities to their full potential.",
                name: "useSkills",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I have the resources and support I need to do my job effectively.",
                name: "resourcesSupport",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I am encouraged to share my ideas and opinions at work.",
                name: "shareIdeas",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            }
        ]
    },
    {
        title: "Fairness",
        fields: [
            {
                label: "I believe promotions and opportunities for advancement are based on merit.",
                name: "meritBasedPromotions",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I feel confident that I will be rewarded for my hard work and performance.",
                name: "rewardedForPerformance",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I am treated with respect by my colleagues and manager.",
                name: "treatedWithRespect",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I have a fair workload and am not expected to work unreasonable hours.",
                name: "fairWorkload",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            }
        ]
    },
    {
        title: "Camaraderie",
        fields: [
            {
                label: "I have a good working relationship with my colleagues.",
                name: "goodWorkingRelationship",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I feel like I am part of a team that supports each other.",
                name: "teamSupport",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I enjoy the people I work with.",
                name: "enjoyColleagues",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "There is a sense of camaraderie and teamwork at this company.",
                name: "senseOfCamaraderie",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            }
        ]
    },
    {
        title: "Pride",
        fields: [
            {
                label: "I am proud of the work that I do at this company.",
                name: "proudOfWork",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I take pride in the quality of the products or services we offer.",
                name: "prideInQuality",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I believe the company has a positive impact on the community.",
                name: "positiveImpact",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I am proud to tell others that I work for this company.",
                name: "proudToTell",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            }
        ]
    }
];


const EmployeeHappinessSurvey = () => {
    const toast = useToast();
    const [department, setDepartment] = useState('');
    const [ratings, setRatings] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDepartmentChange = (event) => setDepartment(event.target.value);

    const handleRatingChange = (event, value) => {
        const name = event.currentTarget.getAttribute('name');
        setRatings({
            ...ratings,
            [name]: value
        });
    };

    const handleNext = () => {
        if (isSectionComplete()) {
            if (currentStep < surveySections.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                handleSubmit();
            }
        } else {
            toast({
                title: "Incomplete Fields",
                description: "Please fill all the fields correctly before proceeding to the next section.",
                status: "warning",
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleBack = () => setCurrentStep(currentStep - 1);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const resp = await axios.post('/api/addSurvey', { ...ratings, department });
            if (resp.status === 201) {
                toast({
                    title: "Survey Submitted",
                    description: "Thank you for your response! Your feedback has been submitted.",
                    status: "success",
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
                setSubmitted(true);
            } else {
                toast({
                    title: "Submission Error",
                    description: "Something went wrong. Please try again later.",
                    status: "error",
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast({
                    title: "Survey Already Submitted",
                    description: "You have already submitted a response for this Employee ID.",
                    status: "warning",
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Submission Error",
                    description: "Something went wrong. Please try again later.",
                    status: "error",
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const currentSection = surveySections[currentStep];

    const isSectionComplete = () => {
        if (currentStep === 0) {
            return department && /^\d{3,4}$/.test(ratings.employeeId) && ratings.employeeName?.trim().length > 0;
        }
        return currentSection.fields.every(field => ratings[field.name] !== undefined);
    };

    return (
        <Container
            maxW="container.lg"
            border="1px solid"
            borderColor="whitesmoke"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            borderRadius="md"
            backgroundColor={'#DEECF6'}
            mt={5}
            p={10}
            fontSize={'large'}
            fontFamily={'Tahoma'}
            borderBottom="10px solid gray"
            borderTop="10px solid gray"
            overflowX="auto" // To handle horizontal overflow on smaller screens
        >
            <Box as="form" onSubmit={handleSubmit} height={'max-content'}>
                {submitted ? (
                    <Box textAlign="center" height={'80vh'} justifyContent={'center'} alignItems={'center'} display={'flex'}>
                        <Box>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <CheckCircleIcon boxSize="50px" color="#DEECF6" />
                            </motion.div>
                            <Text fontSize='xl' fontWeight='bold' fontFamily={'Tahoma'} mt={4}>
                                Thank you for your response! Your feedback has been submitted.
                            </Text>
                        </Box>
                    </Box>
                ) : (
                    <>
                        <Flex
                            bg="#DEECF6"
                            p={4}
                            justifyContent={{ base: 'center', md: 'space-between' }} // Center on small screens, space-between on larger screens
                            alignItems="center"
                            border={'5px solid gray'}
                            flexDirection={{ base: 'column', md: 'row' }} // Stack items vertically on smaller screens
                            textAlign={{ base: 'center', md: 'left' }} // Center text on smaller screens
                        >
                            <Text
                                w={{ base: '100%', md: 'auto' }} // Full width on small screens
                                fontSize={{ base: 'xl', md: 'xx-large' }} // Responsive font size
                                fontWeight='bolder'
                                bg="#DEECF6"
                                color="black"
                                fontFamily={'Tahoma'}
                                mt={5}
                                p={2}
                            >
                                {currentSection.title}
                            </Text>
                            <Box
                                display={{ base: 'block', md: 'block' }} // Display image on all screens
                                mt={{ base: 4, md: 0 }} // Margin top for small screens
                                textAlign="center" // Center image on small screens
                            >
                                <Image
                                    src="/desireLogo.png"
                                    alt="Desire Logo"
                                    layout="responsive"
                                    width={320}
                                    height={370}
                                />
                            </Box>
                        </Flex>


                        <Box mt={10}>
                            {currentStep === 0 && (
                                <>
                                    <FormControl isRequired mt={4}>
                                        <FormLabel>Department</FormLabel>
                                        <Select
                                            value={department}
                                            onChange={handleDepartmentChange}
                                            placeholder="Select your Department"
                                        >
                                            {departments.map((dept) => (
                                                <option key={dept} value={dept}>
                                                    {dept}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Employee ID</FormLabel>
                                        <Input
                                            value={ratings.employeeId || ''}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d{0,4}$/.test(value)) {
                                                    setRatings({ ...ratings, employeeId: value });
                                                }
                                            }}
                                            placeholder="Enter your Employee ID"
                                            maxLength={4}
                                        />
                                        {ratings.employeeId && (ratings.employeeId.length < 3 || ratings.employeeId.length > 4) && (
                                            <Text color="red.500" fontSize="sm">
                                                Employee ID must be 3 or 4 digits.
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl isRequired mt={4}>
                                        <FormLabel>Employee Name</FormLabel>
                                        <Input
                                            value={ratings.employeeName || ''}
                                            onChange={(e) => setRatings({ ...ratings, employeeName: e.target.value })}
                                            placeholder="Enter your Employee Name"
                                        />
                                    </FormControl>
                                </>
                            )}
                            {currentSection.fields.map((field, index) => (
                                <FormControl key={index} mt={5} isRequired>
                                    <FormLabel>{field.label}</FormLabel>
                                    <Grid
                                        templateColumns="repeat(auto-fit, minmax(120px, 1fr))"
                                        mt={4}
                                        gap={4}
                                    >
                                        {field.options.map((option, idx) => (
                                            <Button
                                                fontWeight={'normal'}
                                                key={idx}
                                                variant={ratings[field.name] === option ? 'solid' : 'outline'}
                                                name={field.name}
                                                value={option}
                                                onClick={(e) => handleRatingChange(e, option)}
                                                colorScheme='blue'
                                                color={ratings[field.name] === option ? 'white' : ''}
                                                width="100%"
                                            >
                                                {option}
                                            </Button>
                                        ))}
                                    </Grid>
                                </FormControl>
                            ))}
                            <Box mt={12} display="flex" justifyContent="space-between">
                                {currentStep !== 0 && (
                                    <Button onClick={handleBack} mr={2} colorScheme='gray'>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    onClick={handleNext}
                                    colorScheme='blue'
                                    variant={'solid'}
                                    isLoading={loading}
                                    disabled={!isSectionComplete || (currentStep === 0 && !department)}
                                    _hover={{ backgroundColor: 'gray.600' }}
                                >
                                    {currentStep < surveySections.length - 1 ? 'Next' : 'Submit'}
                                </Button>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default EmployeeHappinessSurvey;