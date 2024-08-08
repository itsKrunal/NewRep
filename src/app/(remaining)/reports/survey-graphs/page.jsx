"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import CustomHeading from "@/StyleComponents/PageHeader";
import { Box, SimpleGrid, VStack, Heading, Card, CardHeader, CardBody, Flex, Text } from "@chakra-ui/react";
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { Select as AntSelect } from 'antd';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const MetricsPage = () => {
    const [surveys, setSurveys] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/getSurvey");
            setSurveys(response.data.data);
        } catch (error) {
            console.error("Error fetching survey data:", error);
        }
    };

    const getMetricData = (metricPrefix) => {
        const filteredSurveys = surveys
            .filter(survey =>
                (selectedEmails?.length === 0 || selectedEmails.includes(survey.email)) &&
                (selectedDepartments?.length === 0 || selectedDepartments.includes(survey.department))
            );

        const metricCounts = filteredSurveys.reduce((acc, survey) => {
            Object.keys(survey).forEach(key => {
                if (key.startsWith(metricPrefix)) {
                    const value = survey[key];
                    acc[value] = (acc[value] || 0) + 1;
                }
            });
            return acc;
        }, {});

        // Map numeric values to labels
        const labelMap = {
            0: 'No',
            1: 'Yes'
        };

        const labels = Object.keys(metricCounts).map(key => labelMap[key] || key);
        const data = Object.values(metricCounts);

        return {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#46BF91'], // Example colors
                }
            ]
        };
    };

    const getMetricSummary = (metricPrefix) => {
        const filteredSurveys = surveys
            .filter(survey =>
                (selectedEmails?.length === 0 || selectedEmails.includes(survey.email)) &&
                (selectedDepartments?.length === 0 || selectedDepartments.includes(survey.department))
            );

        const metricCounts = filteredSurveys.reduce((acc, survey) => {
            Object.keys(survey).forEach(key => {
                if (key.startsWith(metricPrefix)) {
                    const value = survey[key];
                    acc[value] = (acc[value] || 0) + 1;
                }
            });
            return acc;
        }, {});

        // Calculate totals
        const totalYes = metricCounts[1] || 0;
        const totalNo = metricCounts[0] || 0;

        return { totalYes, totalNo };
    };

    const getOverallSatisfaction = () => {
        const filteredSurveys = surveys
            .filter(survey =>
                (selectedEmails?.length === 0 || selectedEmails.includes(survey.email)) &&
                (selectedDepartments?.length === 0 || selectedDepartments.includes(survey.department))
            );

        const totalMetrics = ['trust', 'respect', 'pride', 'camaraderie', 'fairness'];
        let totalYesCount = 0;
        let totalResponses = 0;

        totalMetrics.forEach(metric => {
            const { totalYes, totalNo } = getMetricSummary(metric);
            totalYesCount += totalYes;
            totalResponses += totalYes + totalNo;
        });

        // Calculate the average satisfaction as a percentage
        const averageSatisfaction = totalResponses > 0 ? (totalYesCount / totalResponses) * 100 : 0;
        return averageSatisfaction.toFixed(2);
    };

    const getInsights = () => {
        const totalMetrics = ['trust', 'respect', 'pride', 'camaraderie', 'fairness'];
        let totalYes = 0;
        let totalNo = 0;

        totalMetrics.forEach(metric => {
            const { totalYes: yesCount, totalNo: noCount } = getMetricSummary(metric);
            totalYes += yesCount;
            totalNo += noCount;
        });

        return { totalYes, totalNo };
    };

    const handleEmailChange = (value) => {
        setSelectedEmails(value);
    };

    const handleDepartmentChange = (value) => {
        setSelectedDepartments(value);
    };

    const emailOptions = surveys.map(survey => ({ label: survey.email, value: survey.email }));
    const departmentOptions = [...new Set(surveys.map(survey => survey.department))].map(department => ({ label: department, value: department }));

    const { totalYes, totalNo } = getInsights();

    return (
        <Box p={4} bg={"green.50"} height={'100vh'} w={'100%'}>
            <VStack spacing={6} align="stretch" mt={'3.5em'}>
                <Card boxShadow={'lg'}>
                    <CardHeader>
                        <CustomHeading prop={'Survey Report Analysis'} />
                    </CardHeader>
                    <CardBody>
                        <Card boxShadow={'0px 4px 6px rgba(0, 0, 0, 0.2, 0.3)'} p={3}>
                            <Box mb={6}>
                                <Flex gap={'10px'}>
                                    <AntSelect
                                        mode="single"
                                        allowClear
                                        placeholder="Select department"
                                        onChange={handleDepartmentChange}
                                        style={{ width: '20%' }}
                                        options={departmentOptions}
                                    />
                                    <AntSelect
                                        mode="multiple"
                                        allowClear
                                        placeholder="Select emails"
                                        onChange={handleEmailChange}
                                        style={{ width: '80%', marginBottom: '1em' }}
                                        options={emailOptions}
                                    />
                                </Flex>
                            </Box>
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5 }} mt={10} spacing={6}>
                                <Card boxShadow={'lg'} p={3}>
                                    <CardHeader>
                                        <Heading size="md">Trust Metrics</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Pie data={getMetricData("trust")} />
                                    </CardBody>
                                </Card>
                                <Card boxShadow={'lg'} p={3}>
                                    <CardHeader>
                                        <Heading size="md">Respect Metrics</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Pie data={getMetricData("respect")} />
                                    </CardBody>
                                </Card>
                                <Card boxShadow={'lg'} p={3}>
                                    <CardHeader>
                                        <Heading size="md">Pride Metrics</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Pie data={getMetricData("pride")} />
                                    </CardBody>
                                </Card>
                                <Card boxShadow={'lg'} p={3}>
                                    <CardHeader>
                                        <Heading size="md">Camaraderie Metrics</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Pie data={getMetricData("camaraderie")} />
                                    </CardBody>
                                </Card>
                                <Card boxShadow={'lg'} p={3}>
                                    <CardHeader>
                                        <Heading size="md">Fairness Metrics</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Pie data={getMetricData("fairness")} />
                                    </CardBody>
                                </Card>
                            </SimpleGrid>
                            <Box mt={10}>
                                <Card boxShadow={'lg'} p={4} borderRadius="md" bg="white">
                                    <CardHeader>
                                        <Heading size="md" color="teal.600">Insights</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Flex gap={'20px'}>
                                            <Text fontSize="lg" p={5} background={'blue.50'} borderRadius={'20%'} mb={2}>
                                                <strong>Total Yes:</strong> {totalYes}
                                            </Text>
                                            <Text fontSize="lg" p={5} background={'blue.50'} borderRadius={'20%'} mb={2}>
                                                <strong>Total No:</strong> {totalNo}
                                            </Text>
                                            <Text fontSize="lg" p={5} background={'blue.50'} borderRadius={'20%'} mb={2}>
                                                <strong>Overall Satisfaction:</strong> {getOverallSatisfaction()}%
                                            </Text>
                                        </Flex>
                                    </CardBody>
                                </Card>
                            </Box>
                        </Card>
                    </CardBody>
                </Card>
            </VStack>
        </Box>
    );
};

export default MetricsPage;
