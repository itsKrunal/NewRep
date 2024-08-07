"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  useToast,
  VStack,
  IconButton,
  useDisclosure,
  CardHeader,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import CustomHeading from "@/StyleComponents/PageHeader";

const Page = () => {
  const [surveys, setSurveys] = useState([]);
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <Box p={4} bg={"green.50"} height={'100vh'} w={'100%'}>
      <VStack spacing={6} align="stretch" mt={'3.5em'}>
        <Card boxShadow={'lg'}>
          <CardHeader>
            <CustomHeading prop={'Survey Report'} />
          </CardHeader>
          <CardBody>
            <Card boxShadow={'0px 4px 6px rgba(0, 0, 0.2, 0.3)'} p={3}>
              <Box overflowX="auto">
                <Table variant="striped" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Email</Th>
                      <Th>Department</Th>
                      <Th>Metric</Th>
                      <Th>Field</Th>
                      <Th>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {surveys.flatMap(survey => {
                      const { email, department, ...metrics } = survey;
                      return Object.entries(metrics).map(([field, value]) => {
                        const metric = field.match(/(trust|respect|fairness|camaraderie|pride)/i)?.[0];
                        return metric ? (
                          <Tr key={`${email}-${field}`}>
                            <Td>{email}</Td>
                            <Td>{department}</Td>
                            <Td>{metric.toUpperCase()}</Td>
                            <Td>{field}</Td>
                            <Td>{value}</Td>
                          </Tr>
                        ) : null;
                      });
                    })}
                  </Tbody>
                </Table>
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
