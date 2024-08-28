"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import CustomHeading from "@/StyleComponents/PageHeader";
import { Box, SimpleGrid, VStack, Heading, Card, CardHeader, CardBody, Flex, Text, Divider } from "@chakra-ui/react";
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, BarElement, registerables } from 'chart.js';
import { Select as AntSelect } from 'antd'

ChartJS.register(...registerables, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, BarElement);

const MetricsPage = () => {
    const [surveys, setSurveys] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState('');
    const questionsArray = require('../../../../Utils/questions')
    const [responseCounts, setResponseCounts] = useState({});

    useEffect(() => {
        if (typeof selectedDepartments === 'undefined')
            setSelectedDepartments('');
    }, [selectedDepartments]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/getSurvey");
            const response2 = await axios.get("/api/getCountOfResponse")
            setResponseCounts(response2.data)
            setSurveys(response.data.data);
        } catch (error) {
            console.error("Error fetching survey data:", error);
        }
    };

    const getMetricData = (metricPrefix) => {
        const filteredSurveys = surveys
            .filter(survey =>
                (selectedEmails?.length === 0 || selectedEmails?.includes(survey.email)) &&
                (selectedDepartments?.length === 0 || selectedDepartments?.includes(survey.department))
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
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#46BF91'],
                }
            ]
        };
    };

    const getMetricSummary = (metricPrefix) => {
        const filteredSurveys = surveys
            .filter(survey =>
                (selectedEmails?.length === 0 || selectedEmails?.includes(survey.email)) &&
                (selectedDepartments?.length === 0 || selectedDepartments?.includes(survey.department))
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

        const totalYes = metricCounts[1] || 0;
        const totalNo = metricCounts[0] || 0;

        return { totalYes, totalNo };
    };

    const getOverallSatisfaction = () => {
        const filteredSurveys = surveys
            .filter(survey =>
                (selectedEmails?.length === 0 || selectedEmails?.includes(survey.email)) &&
                (selectedDepartments?.length === 0 || selectedDepartments?.includes(survey.department))
            );

        const totalMetrics = ['trust', 'respect', 'pride', 'camaraderie', 'fairness'];
        let totalYesCount = 0;
        let totalResponses = 0;

        totalMetrics.forEach(metric => {
            const { totalYes, totalNo } = getMetricSummary(metric);
            totalYesCount += totalYes;
            totalResponses += totalYes + totalNo;
        });

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

    const getBarGraphData = (metricPrefix) => {
        const filteredSurveys = surveys
            .filter(survey =>
                (selectedEmails?.length === 0 || selectedEmails?.includes(survey.email)) &&
                (selectedDepartments?.length === 0 || selectedDepartments?.includes(survey.department))
            );

        const metricData = filteredSurveys.reduce((acc, survey) => {
            Object.keys(survey).forEach(key => {
                if (key.startsWith(metricPrefix)) {
                    const value = survey[key];
                    acc[key] = acc[key] || { yes: 0, no: 0 };
                    if (value === 1) {
                        acc[key].yes += 1;
                    } else if (value === 0) {
                        acc[key].no += 1;
                    }
                }
            });
            return acc;
        }, {});

        const labels = Object.keys(metricData).map((key, index) => key);
        const yesData = labels.map(label => {
            const total = metricData[label].yes + metricData[label].no;
            return total > 0 ? (metricData[label].yes / total) * 100 : 0;
        });
        const noData = labels.map(label => {
            const total = metricData[label].yes + metricData[label].no;
            return total > 0 ? (metricData[label].no / total) * 100 : 0;
        });

        return {
            labels,
            datasets: [
                {
                    label: 'Yes ',
                    data: yesData,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
                {
                    label: 'No ',
                    data: noData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                }
            ]
        };
    };


    const handleEmailChange = (value) => {
        setSelectedEmails(value);
    };

    const handleDepartmentChange = (value) => {
        setSelectedDepartments(value);
    };

    const emailOptions = surveys.map(survey => ({ label: survey.email, value: survey.email, department: survey.department }));
    const departmentOptions = [...new Set(surveys.map(survey => survey.department))].map(department => ({ label: department, value: department }));

    const { totalYes, totalNo } = getInsights();

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        return questionsArray[tooltipItems[0].label]; // Adjust as needed
                    },
                    label: function (tooltipItem) {
                        const datasetLabel = tooltipItem.dataset.label || '';
                        const dataIndex = tooltipItem.dataIndex;
                        const value = tooltipItem.raw;

                        // Get the count from the dataset
                        const dataset = tooltipItem.dataset.data;
                        const totalCount = dataset.reduce((acc, curr) => acc + curr, 0);

                        // Calculate percentage
                        const percentage = (value / totalCount) * 100;

                        return `${datasetLabel}: ${value}%`;
                    }
                }
            }
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    callback: function (value, index, values) {
                        return `Q${index + 1}`;
                    }
                }
            },
            y: {
                stacked: true,
            }
        }
    };





    return (
        <Box p={4} bg={"green.50"} height={'100vh'} w={'100%'}>
            <VStack spacing={6} align="stretch" mt={'3.5em'}>
                {console.log("SACSDC", selectedDepartments, selectedEmails)}
                <Card boxShadow={'lg'}>
                    <CardHeader>
                        <CustomHeading prop={'Analytical Reports'} />
                    </CardHeader>
                    <CardBody>
                        <Card boxShadow={'lg'} p={4} borderRadius="md" bg="white">

                            <Card boxShadow={'lg'} p={4} borderRadius="md" bg="white">
                                {/* <CardHeader display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                    <Box >
                                        <Heading fontSize="lg" p={5} background={'green.100'} borderRadius={'20%'} whiteSpace={'nowrap'}  mr={'3%'}>Filter Box</Heading>
                                    </Box>
                                    <Flex gap={'20px'}>
                                        <Text fontSize="lg" p={5} background={'blue.100'} borderRadius={'20%'} mb={2}>
                                            <strong>Total Yes:</strong> {totalYes}
                                        </Text>
                                        <Text fontSize="lg" p={5} background={'blue.100'} borderRadius={'20%'} mb={2}>
                                            <strong>Total No:</strong> {totalNo}
                                        </Text>
                                        <Text fontSize="lg" p={5} background={'blue.100'} borderRadius={'20%'} mb={2}>
                                            <strong>Overall Satisfaction:</strong> {getOverallSatisfaction()}%
                                        </Text>
                                    </Flex>
                                </CardHeader> */}
                                <CardBody>
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
                                            options={emailOptions.filter((item) => selectedDepartments?.length == 0 || selectedDepartments == item.department)}
                                        />
                                    </Flex>
                                </CardBody>
                            </Card>
                        </Card>
                        <Card boxShadow={'lg'} p={4} borderRadius="md" bg="white">
                            <Box>
                                <Card boxShadow={'lg'} p={4} borderRadius="md" bg="white">
                                    <CardHeader>
                                        <Heading size="md" color="teal.600">Insights</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Flex gap={'20px'}>
                                            <Text fontSize="lg" p={5} background={'blue.50'} borderRadius={'20%'} mb={2}>
                                                <strong>Total Users:</strong> {responseCounts[selectedDepartments && selectedDepartments.length > 0 ? selectedDepartments.toLowerCase() : 'totalUsers']}
                                            </Text>
                                            <Text fontSize="lg" p={5} background={'blue.50'} borderRadius={'20%'} mb={2}>
                                                <strong>Total Entries filled:</strong> {emailOptions.filter((item) => selectedDepartments?.length == 0 || selectedDepartments == item.department).length}
                                            </Text>
                                            <Text fontSize="lg" p={5} background={'blue.50'} borderRadius={'20%'} mb={2}>
                                                <strong>Total Yes:</strong> {totalYes}
                                            </Text>

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
                        <Card boxShadow={'lg'} p={4} borderRadius="md" bg="white">
                            <CardHeader>
                                <Heading size="md" color="teal.600"> Metrics Breakdown</Heading>
                            </CardHeader>
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5 }} mt={10} spacing={6}>
                                <Card boxShadow={'lg'} p={3}>
                                    <CardHeader>
                                        <Heading size="md">Trust Metrics</Heading>
                                    </CardHeader>
                                    <Divider color={'green.200'} />
                                    <CardBody>
                                        <Pie data={getMetricData("trust")} />
                                    </CardBody>
                                </Card>
                                <Card boxShadow={'lg'} p={3}>
                                    <CardHeader>
                                        <Heading size="md">Respect Metrics</Heading>
                                    </CardHeader>
                                    <Divider color={'green.200'} />
                                    <CardBody>
                                        <Pie data={getMetricData("respect")} />
                                    </CardBody>
                                </Card>
                                <Card boxShadow={'lg'} p={3}>
                                    <CardHeader>
                                        <Heading size="md">Pride Metrics</Heading>
                                    </CardHeader>
                                    <Divider color={'green.200'} />
                                    <CardBody>
                                        <Pie data={getMetricData("pride")} />
                                    </CardBody>
                                </Card>
                                <Card boxShadow={'lg'} p={3}>
                                    <CardHeader>
                                        <Heading size="md">Camaraderie Metrics</Heading>
                                    </CardHeader>
                                    <Divider color={'green.200'} />
                                    <CardBody>
                                        <Pie data={getMetricData("camaraderie")} />
                                    </CardBody>
                                </Card>
                                <Card boxShadow={'lg'} p={3}>
                                    <CardHeader>
                                        <Heading size="md">Fairness Metrics</Heading>
                                    </CardHeader>
                                    <Divider color={'green.200'} />
                                    <CardBody>
                                        <Pie data={getMetricData("fairness")} />
                                    </CardBody>
                                </Card>
                            </SimpleGrid>
                        </Card>
                        <Card boxShadow={'lg'} p={4} borderRadius="md" bg="white">
                            <CardHeader>
                                <Heading size="md" color="teal.600">Detailed Question Breakdown</Heading>
                            </CardHeader>
                            <CardBody>
                                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                                    <Card boxShadow={'lg'} p={4} borderRadius="md" bg="gray.50">
                                        <CardHeader>
                                            <Heading size="sm">Trust Questions</Heading>
                                        </CardHeader>
                                        <Divider color={'green.200'} />
                                        <CardBody>
                                            <Bar
                                                data={getBarGraphData("trust")}
                                                options={{ ...options, maintainAspectRatio: true }}
                                            />

                                        </CardBody>
                                    </Card>

                                    <Card boxShadow={'lg'} p={4} borderRadius="md" bg="gray.50">
                                        <CardHeader>
                                            <Heading size="sm">Respect Questions</Heading>
                                        </CardHeader>
                                        <Divider color={'green.200'} />
                                        <CardBody>
                                            <Bar data={getBarGraphData("respect")}
                                                options={{ ...options, maintainAspectRatio: true }}
                                            />
                                        </CardBody>
                                    </Card>

                                    <Card boxShadow={'lg'} p={4} borderRadius="md" bg="gray.50">
                                        <CardHeader>
                                            <Heading size="sm">Pride Questions</Heading>
                                        </CardHeader>
                                        <Divider color={'green.200'} />
                                        <CardBody>
                                            <Bar data={getBarGraphData("pride")}
                                                options={{ ...options, maintainAspectRatio: true }}
                                            />
                                        </CardBody>
                                    </Card>

                                    <Card boxShadow={'lg'} p={4} borderRadius="md" bg="gray.50">
                                        <CardHeader>
                                            <Heading size="sm">Camaraderie Questions</Heading>
                                        </CardHeader>
                                        <Divider color={'green.200'} />
                                        <CardBody>
                                            <Bar data={getBarGraphData("camaraderie")}
                                                options={{ ...options, maintainAspectRatio: true }}
                                            />
                                        </CardBody>
                                    </Card>

                                    <Card boxShadow={'lg'} p={4} borderRadius="md" bg="gray.50">
                                        <CardHeader>
                                            <Heading size="sm">Fairness Questions</Heading>
                                        </CardHeader>
                                        <Divider color={'green.200'} />
                                        <CardBody>
                                            <Bar data={getBarGraphData("fairness")}
                                                options={{ ...options, maintainAspectRatio: true }}
                                            />
                                        </CardBody>
                                    </Card>
                                </SimpleGrid>
                            </CardBody>
                        </Card>

                    </CardBody>
                </Card>
            </VStack>
        </Box>
    );
};

export default MetricsPage;
