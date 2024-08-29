"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  VStack,
  useToast,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { Table } from "antd";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@chakra-ui/icons";
import CustomHeading from "@/StyleComponents/PageHeader";

const Page = () => {
  const [surveys, setSurveys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getSurvey");
      setSurveys(response.data.data);
    } catch (error) {
      router.push("/survey-form");
    }
  };

  const handleExport = () => {
    const transformedData = surveys.flatMap(survey => {
      const { email, department, ...metrics } = survey;
      return Object.entries(metrics).map(([field, value]) => {
        const metric = field.match(/(trust|respect|fairness|camaraderie|pride)/i)?.[0];
        return {
          email,
          department,
          metric,
          field,
          value
        };
      }).filter(item => item.metric); // Remove entries that do not match any metric
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(transformedData);
    XLSX.utils.book_append_sheet(wb, ws, "Surveys");

    XLSX.writeFile(wb, "surveys.xlsx");
  };

  const columns = [
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Metric', dataIndex: 'metric', key: 'metric' },
    { title: 'Field', dataIndex: 'field', key: 'field' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
  ];

  const filteredData = surveys.flatMap(survey => {
    const { email, department, ...metrics } = survey;
    return Object.entries(metrics).map(([field, value]) => {
      const metric = field.match(/(trust|respect|fairness|camaraderie|pride)/i)?.[0];
      return metric ? {
        key: `${email}-${field}`,
        email,
        department,
        metric: metric.toUpperCase(),
        field,
        value,
      } : null;
    }).filter(item => item)
    .filter(item => {
      return item.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
             item.department.toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  return (
    <Box p={4} bg={"green.50"} height={'100vh'} w={'100%'}>
      <VStack spacing={6} align="stretch" mt={'3.5em'}>
        <Card boxShadow={'lg'}>
          <CardHeader>
            <CustomHeading prop={'Survey Report'} />
          </CardHeader>
          <CardBody>
            {/* Search Bar */}
            <InputGroup mb={4}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input 
                placeholder="Search by email or department" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                width="30%" // Set the width to 30% as requested
              />
            </InputGroup>
            <Card boxShadow={'0px 4px 6px rgba(0, 0, 0.2, 0.3)'} mt={2} p={3}>
              <Box overflowX="auto">
                <Table
                  dataSource={filteredData}
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
              </Box>
              <Button w={'max-content'} mt={5} colorScheme="green" onClick={handleExport}>
                Export to Excel
              </Button>
            </Card>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default Page;
