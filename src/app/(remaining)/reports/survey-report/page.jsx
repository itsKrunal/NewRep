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
import { HamburgerIcon, } from "@chakra-ui/icons";
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
    const filteredSurveys = surveys.map(
      ({ createdAt, updatedAt, ...rest }) => rest
    );

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredSurveys);
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
                        <Th>MMYYYY</Th>
                        <Th>Email</Th>
                        <Th>Department</Th>
                        <Th>Trust Fair Treatment</Th>
                        <Th>Trust Leadership Confidence</Th>
                        <Th>Trust Management Communication</Th>
                        <Th>Trust Role Understanding</Th>
                        <Th>Respect Resources Support</Th>
                        <Th>Respect Share Ideas</Th>
                        <Th>Respect Use Skills</Th>
                        <Th>Respect Valued Employee</Th>
                        <Th>Fairness Fair Workload</Th>
                        <Th>Fairness Merit Based Promotions</Th>
                        <Th>Fairness Rewarded For Performance</Th>
                        <Th>Fairness Treated With Respect</Th>
                        <Th>Camaraderie Enjoy Colleagues</Th>
                        <Th>Camaraderie Good Working Relationship</Th>
                        <Th>Camaraderie Sense Of Camaraderie</Th>
                        <Th>Camaraderie Team Support</Th>
                        <Th>Pride Positive Impact</Th>
                        <Th>Pride Pride In Quality</Th>
                        <Th>Pride Proud Of Work</Th>
                        <Th>Pride Proud To Tell</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {surveys.map((survey) => (
                        <Tr key={survey._id}>
                          <Td>{survey.MMYYYY}</Td>
                          <Td>{survey.email}</Td>
                          <Td>{survey.department}</Td>
                          <Td>{survey.trustFairTreatment}</Td>
                          <Td>{survey.trustLeadershipConfidence}</Td>
                          <Td>{survey.trustManagementCommunication}</Td>
                          <Td>{survey.trustRoleUnderstanding}</Td>
                          <Td>{survey.respectResourcesSupport}</Td>
                          <Td>{survey.respectShareIdeas}</Td>
                          <Td>{survey.respectUseSkills}</Td>
                          <Td>{survey.respectValuedEmployee}</Td>
                          <Td>{survey.fairnessFairWorkload}</Td>
                          <Td>{survey.fairnessMeritBasedPromotions}</Td>
                          <Td>{survey.fairnessRewardedForPerformance}</Td>
                          <Td>{survey.fairnessTreatedWithRespect}</Td>
                          <Td>{survey.camaraderieEnjoyColleagues}</Td>
                          <Td>{survey.camaraderieGoodWorkingRelationship}</Td>
                          <Td>{survey.camaraderieSenseOfCamaraderie}</Td>
                          <Td>{survey.camaraderieTeamSupport}</Td>
                          <Td>{survey.pridePositiveImpact}</Td>
                          <Td>{survey.pridePrideInQuality}</Td>
                          <Td>{survey.prideProudOfWork}</Td>
                          <Td>{survey.prideProudToTell}</Td>
                        </Tr>
                      ))}
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
