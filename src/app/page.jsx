"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Heading, useToast, VStack } from '@chakra-ui/react';

const Page = () => {
  const [surveys, setSurveys] = useState([]);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/getSurvey');
      setSurveys(response.data.data);
    } catch (error) {
      router.push('/survey-form');
    }
  };

  const handleExport = () => {
    // Prepare data for export
    const filteredSurveys = surveys.map(({ createdAt, updatedAt, ...rest }) => rest);

    // Create a new workbook and add the data
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredSurveys);
    XLSX.utils.book_append_sheet(wb, ws, 'Surveys');

    // Write the workbook to a file
    XLSX.writeFile(wb, 'surveys.xlsx');
  };

  return (
    <Box p={4} bg={'white'}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">Survey Data</Heading>
        <Box overflowX="auto">
          <Table variant='striped' size="sm">
            <Thead>
              <Tr>
                <Th>MMYYYY</Th>
                <Th>Email</Th>
                <Th>Camaraderie Enjoy Colleagues</Th>
                <Th>Camaraderie Good Working Relationship</Th>
                <Th>Camaraderie Sense Of Camaraderie</Th>
                <Th>Camaraderie Team Support</Th>
                <Th>Department</Th>
                <Th>Fairness Fair Workload</Th>
                <Th>Fairness Merit Based Promotions</Th>
                <Th>Fairness Rewarded For Performance</Th>
                <Th>Fairness Treated With Respect</Th>
                <Th>Pride Positive Impact</Th>
                <Th>Pride Pride In Quality</Th>
                <Th>Pride Proud Of Work</Th>
                <Th>Pride Proud To Tell</Th>
                <Th>Respect Resources Support</Th>
                <Th>Respect Share Ideas</Th>
                <Th>Respect Use Skills</Th>
                <Th>Respect Valued Employee</Th>
                <Th>Trust Fair Treatment</Th>
                <Th>Trust Leadership Confidence</Th>
                <Th>Trust Management Communication</Th>
                <Th>Trust Role Understanding</Th>
              </Tr>
            </Thead>
            <Tbody>
              {surveys.map((survey) => (
                <Tr key={survey._id}>
                  <Td>{survey.MMYYYY}</Td>
                  <Td>{survey.email}</Td>
                  <Td>{survey.camaraderieEnjoyColleagues}</Td>
                  <Td>{survey.camaraderieGoodWorkingRelationship}</Td>
                  <Td>{survey.camaraderieSenseOfCamaraderie}</Td>
                  <Td>{survey.camaraderieTeamSupport}</Td>
                  <Td>{survey.department}</Td>
                  <Td>{survey.fairnessFairWorkload}</Td>
                  <Td>{survey.fairnessMeritBasedPromotions}</Td>
                  <Td>{survey.fairnessRewardedForPerformance}</Td>
                  <Td>{survey.fairnessTreatedWithRespect}</Td>
                  <Td>{survey.pridePositiveImpact}</Td>
                  <Td>{survey.pridePrideInQuality}</Td>
                  <Td>{survey.prideProudOfWork}</Td>
                  <Td>{survey.prideProudToTell}</Td>
                  <Td>{survey.respectResourcesSupport}</Td>
                  <Td>{survey.respectShareIdeas}</Td>
                  <Td>{survey.respectUseSkills}</Td>
                  <Td>{survey.respectValuedEmployee}</Td>
                  <Td>{survey.trustFairTreatment}</Td>
                  <Td>{survey.trustLeadershipConfidence}</Td>
                  <Td>{survey.trustManagementCommunication}</Td>
                  <Td>{survey.trustRoleUnderstanding}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Button w={'10%'} mt={5} colorScheme="teal" onClick={handleExport} mb={4}>
          Export to Excel
        </Button>
      </VStack>
    </Box>
  );
};

export default Page;
