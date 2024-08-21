"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    VStack,
    Card,
    CardHeader,
    CardBody,
} from "@chakra-ui/react";
import CustomHeading from '../../../../StyleComponents/PageHeader';
import axios from "axios";
import * as XLSX from "xlsx";

const Page = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        const info = await axios.get('/api/getFinanceReports');
        setData(info.data.financeForms);
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data.map((item) => ({
            Project: item.project,
            H1: item.h1,
            H2: item.h2,
            Period: item.period,
            Organisation: item.organisation,
            Division: item.division,
            Partner: item.partner,
            'Project Type': item.projectType,
            'Actual Budget': item.actualBudget,
            'Plan Budget': item.planBudget,
            Month: item.pMonth,
            Quarter: item.pQuarter,
            'Half Year': item.pHalfYear,
            'Financial Year': item.pFinancialYear,
            'Calendar Year': item.pCalendarYear,
            'Created At': new Date(item.createdAt).toLocaleString(),
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "FinanceReports");
        XLSX.writeFile(wb, "FinanceReports.xlsx");
    };

    return (
        <Box p={4} bg={"green.50"} height={'100vh'} w={'100%'}>
            <VStack spacing={6} align="stretch" mt={'3.5em'}>
                <Card boxShadow={'lg'}>
                    <CardHeader>
                        <CustomHeading prop={'Finance Report'} />
                    </CardHeader>
                    <CardBody>

                        <Box overflowX={'auto'}>
                            <Table variant="striped" size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>Project</Th>
                                        <Th>H1</Th>
                                        <Th>H2</Th>
                                        <Th>Period</Th>
                                        <Th>Organisation</Th>
                                        <Th>Division</Th>
                                        <Th>Partner</Th>
                                        <Th>Project Type</Th>
                                        <Th>Actual Budget</Th>
                                        <Th>Plan Budget</Th>
                                        <Th>Month</Th>
                                        <Th>Quarter</Th>
                                        <Th>Half Year</Th>
                                        <Th>Financial Year</Th>
                                        <Th>Calendar Year</Th>
                                        <Th>Created At</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.map((item) => (
                                        <Tr key={item._id.$oid}>
                                            <Td>{item.project}</Td>
                                            <Td>{item.h1}</Td>
                                            <Td>{item.h2}</Td>
                                            <Td>{item.period}</Td>
                                            <Td>{item.organisation}</Td>
                                            <Td>{item.division}</Td>
                                            <Td>{item.partner}</Td>
                                            <Td>{item.projectType}</Td>
                                            <Td>{item.actualBudget}</Td>
                                            <Td>{item.planBudget}</Td>
                                            <Td>{item.pMonth}</Td>
                                            <Td>{item.pQuarter}</Td>
                                            <Td>{item.pHalfYear}</Td>
                                            <Td>{item.pFinancialYear}</Td>
                                            <Td>{item.pCalendarYear}</Td>
                                            <Td>{new Date(item.createdAt).toLocaleString()}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                        <Button
                            onClick={exportToExcel}
                            colorScheme="green"
                            mt={10}
                        >
                            Export to Excel
                        </Button>
                    </CardBody>
                </Card>
            </VStack>
        </Box>
    );
};

export default Page;
