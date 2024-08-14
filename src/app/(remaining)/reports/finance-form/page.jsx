"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  FormErrorMessage,
  useToast,
  Text,
  Divider,
} from "@chakra-ui/react";
import { FaFileUpload, FaFileExcel, FaCheck } from "react-icons/fa";
import * as XLSX from 'xlsx';
import CustomHeading from "../../../../StyleComponents/PageHeader";
import axios from "axios";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    project: "",
    h1: "",
    h2: "",
    period: "",
    organisation: "",
    division: "",
    partner: "",
    projectType: "",
    actualBudget: "",
    planBudget: "",
    pMonth: "",
    pQuarter: "",
    pHalfYear: "",
    pFinancialYear: "",
    pCalendarYear: "",
  });

  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleFileUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected!",
        description: "Please select an Excel file to upload.",
        status: "error",
        position: "top-right",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      try {
        setLoading(true)
        const response = await axios.post("/api/importFinanceData", jsonData);
        toast({
          title: "Success!",
          description: "Excel data has been imported successfully.",
          status: "success",
          position: "top-right",
        });
        console.log("Excel data imported:", response.data);
      } catch (error) {
        console.error("Failed to import Excel data", error);
        toast({
          title: "Error",
          description: "Failed to import Excel data.",
          status: "error",
          position: "top-right",
        });
      } finally {
        setLoading(false)
        setFile(null)
      }
    };

    reader.readAsArrayBuffer(file);
  };


  const toast = useToast()
  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validate(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "project":
      case "organisation":
      case "division":
      case "projectType":
        if (!value.trim()) {
          error = "This field is required";
        }
        break;
      case "period":
      case "pMonth":
        if (!/^\d{6}$/.test(value)) {
          error = "Must be in YYYYMM format";
        }
        break;
      case "pQuarter":
      case "pHalfYear":
        if (!/^FY\d{2}(Q[1-4]|H[1-2])$/.test(value)) {
          error = "Must be in FYxxQx or FYxxHx format";
        }
        break;
      case "pFinancialYear":
        if (!/^FY\d{2}$/.test(value)) {
          error = "Must be in FYxx format";
        }
        break;
      case "pCalendarYear":
        if (!/^\d{4}$/.test(value)) {
          error = "Must be in YYYY format";
        }
        break;
      case "actualBudget":
      case "planBudget":
        if (value && isNaN(value)) {
          error = "Must be a number";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const isFormValid = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isFormValid()) {
      try {
        setLoading(true);

        let missingFields = [];

        if (formData.h1.length == 0) {
          missingFields.push("H1");
        }
        if (formData.h2.length == 0) {
          missingFields.push("H2");
        }
        if (formData.partner.length == 0) {
          missingFields.push("Partner");
        }
        if (formData.actualBudget.length == 0) {
          missingFields.push("Actual Budget");
        }
        if (formData.planBudget.length == 0) {
          missingFields.push("Plan Budget");
        }

        if (missingFields.length > 0) {
          toast({
            title: "Empty fields!",
            description: `Please fill in the following fields: ${missingFields.join(", ")}`,
            position: "top-right",
            status: 'error'
          });
          return;
        }

        const response = await axios.post('/api/addFinanceForm', formData);
        setFormData({
          project: "",
          h1: "",
          h2: "",
          period: "",
          organisation: "",
          division: "",
          partner: "",
          projectType: "",
          actualBudget: "",
          planBudget: "",
          pMonth: "",
          pQuarter: "",
          pHalfYear: "",
          pFinancialYear: "",
          pCalendarYear: "",
        })
        toast({
          title: "Sucess",
          description: "Your response has been saved successfully",
          position: 'top-right',
          status: 'success'
        })

        console.log("Form submitted successfully", response.data);
        // Additional logic like resetting the form or showing a success message
      } catch (error) {
        console.error("Failed to submit form", error.response?.data || error.message);
        // Handle error, show error message, etc.
      } finally {
        setErrors({})
        setLoading(false)
      }
    }
  };

  return (
    <Box p={[2, 4]} bg={"green.50"} minHeight={"100vh"} w={"100%"}>
      <VStack spacing={[4, 6]} align="stretch" mt={["2em", "3.5em"]}>
        <Card boxShadow={"lg"}>
          <CardHeader>
            <CustomHeading prop={"Finance Form"} />
          </CardHeader>
          <CardBody>
            <Flex direction={["column", "row"]}
              alignItems={"center"}
              justifyContent={"center"}
              boxShadow={"lg"}
              pb={["10px", "20px"]}
            >
              <VStack w={["100%", "60%"]}
                spacing={4}
                boxShadow="0px 8px 16px rgba(0, 128, 0, 0.2)"
                p={[3, 5]}>
                <FormControl isInvalid={!!errors.project}>
                  <FormLabel>Project</FormLabel>
                  <Input
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    placeholder="Enter project name"
                  />
                  <FormErrorMessage>{errors.project}</FormErrorMessage>
                </FormControl>
                <Divider />

                <FormControl>
                  <FormLabel >H1</FormLabel>
                  <Select
                    name="h1"
                    value={formData.h1}
                    onChange={handleChange}
                    placeholder="Select option"
                  >
                    <option value="COGS">COGS</option>
                    <option value="Other Direct Costs">Other Direct Costs</option>
                    <option value="Overheads(HO)">Overheads(HO)</option>
                    <option value="Revenue">Revenue</option>
                  </Select>
                </FormControl>
                <Divider />

                <FormControl>
                  <FormLabel>H2</FormLabel>
                  <Select
                    name="h2"
                    value={formData.h2}
                    onChange={handleChange}
                    placeholder="Select option"
                  >
                    {formData.h1 === "COGS" && (
                      <>
                        <option value="Material">Material</option>
                        <option value="WO - SubContracting Cost">WO - SubContracting Cost</option>
                        <option value="Manpower">Manpower</option>
                        <option value="Manpower (Off-role)">Manpower (Off-role)</option>
                      </>
                    )}
                    {formData.h1 === "Other Direct Costs" && (
                      <>
                        <option value="Project E&M">Project E&M</option>
                        <option value="Tour & Travelling Expenses">Tour & Travelling Expenses</option>
                        <option value="Facilities">Facilities</option>
                        <option value="Freight & Logistics">Freight & Logistics</option>
                        <option value="G&A">G&A</option>
                        <option value="HR - Others">HR - Others</option>
                        <option value="Power & Fuel">Power & Fuel</option>
                      </>
                    )}
                    {formData.h1 === "Overheads(HO)" && (
                      <>
                        <option value="Consultant Cost">Consultant Cost</option>
                        <option value="Employee Cost">Employee Cost</option>
                        <option value="Facilities">Facilities</option>
                        <option value="G&A">G&A</option>
                        <option value="HR - Others">HR - Others</option>
                        <option value="Insurance & Others">Insurance & Others</option>
                        <option value="Marketing & Promotion">Marketing & Promotion</option>
                        <option value="Tech & IT Infra">Tech & IT Infra</option>
                      </>
                    )}
                    {formData.h1 === "Revenue" && (
                      <option value="Revenue">Revenue</option>
                    )}
                  </Select>
                </FormControl>
                <Divider />

                <FormControl isInvalid={!!errors.period}>
                  <FormLabel>Period</FormLabel>
                  <Input
                    name="period"
                    value={formData.period}
                    onChange={handleChange}
                    placeholder="YYYYMM"
                  />
                  <FormErrorMessage>{errors.period}</FormErrorMessage>
                </FormControl>
                <Divider />

                <FormControl isInvalid={!!errors.organisation}>
                  <FormLabel>Organisation</FormLabel>
                  <Select
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleChange}
                    placeholder="Select organisation"
                  >
                    <option value="Desire">Desire</option>
                    <option value="PMC">PMC</option>
                  </Select>
                  <FormErrorMessage>{errors.organisation}</FormErrorMessage>
                </FormControl>
                <Divider />

                <FormControl isInvalid={!!errors.division}>
                  <FormLabel>Division</FormLabel>
                  <Select
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                    placeholder="Select division"
                  >
                    <option value="Solar">Solar</option>
                    <option value="EPC">EPC</option>
                    <option value="ESCO">ESCO</option>
                    <option value="RO">RO</option>
                    <option value="Revenue">Revenue</option>
                    <option value="Others">Others</option>
                  </Select>
                  <FormErrorMessage>{errors.division}</FormErrorMessage>
                </FormControl>
                <Divider />

                <FormControl>
                  <FormLabel>Partner</FormLabel>
                  <Select
                    name="partner"
                    value={formData.partner}
                    onChange={handleChange}
                    placeholder="Select partner"
                  >
                    <option value="Desire">Desire</option>
                    <option value="Duke">Duke</option>
                    <option value="GA">GA</option>
                    <option value="New">New</option>
                    <option value="Other">Other</option>
                    <option value="Toran">Toran</option>
                  </Select>
                </FormControl>
                <Divider />

                <FormControl isInvalid={!!errors.projectType}>
                  <FormLabel>Project Type</FormLabel>
                  <Select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    placeholder="Select project type"
                  >
                    <option value="Execution">Execution</option>
                    <option value="O&M">O&M</option>
                    <option value="OTH">OTH</option>
                  </Select>
                  <FormErrorMessage>{errors.projectType}</FormErrorMessage>
                </FormControl>
                <Divider />

                <FormControl isInvalid={!!errors.actualBudget}>
                  <FormLabel>Actual Budget</FormLabel>
                  <Input
                    name="actualBudget"
                    value={formData.actualBudget}
                    onChange={handleChange}
                    placeholder="Enter actual budget"
                  />
                  <FormErrorMessage>{errors.actualBudget}</FormErrorMessage>
                </FormControl>
                <Divider />

                <FormControl isInvalid={!!errors.planBudget}>
                  <FormLabel>Planned Budget</FormLabel>
                  <Input
                    name="planBudget"
                    value={formData.planBudget}
                    onChange={handleChange}
                    placeholder="Enter planned budget"
                  />
                  <FormErrorMessage>{errors.planBudget}</FormErrorMessage>
                </FormControl>
                <Divider />

                <FormControl isInvalid={!!errors.pMonth}>
                  <FormLabel>Period - Month</FormLabel>
                  <Input
                    name="pMonth"
                    value={formData.pMonth}
                    onChange={handleChange}
                    placeholder="YYYYMM"
                  />
                  <FormErrorMessage>{errors.pMonth}</FormErrorMessage>
                </FormControl>
                <Divider />

                <FormControl isInvalid={!!errors.pQuarter}>
                  <FormLabel>Period - Quarter</FormLabel>
                  <Input
                    name="pQuarter"
                    value={formData.pQuarter}
                    onChange={handleChange}
                    placeholder="FYxxQx"
                  />
                  <FormErrorMessage>{errors.pQuarter}</FormErrorMessage>
                </FormControl>
                <Divider />

                <FormControl isInvalid={!!errors.pHalfYear}>
                  <FormLabel>Period - Half Year</FormLabel>
                  <Input
                    name="pHalfYear"
                    value={formData.pHalfYear}
                    onChange={handleChange}
                    placeholder="FYxxHx"
                  />
                  <FormErrorMessage>{errors.pHalfYear}</FormErrorMessage>
                </FormControl>
                <Divider />

                <FormControl isInvalid={!!errors.pFinancialYear}>
                  <FormLabel>Period - Financial Year</FormLabel>
                  <Input
                    name="pFinancialYear"
                    value={formData.pFinancialYear}
                    onChange={handleChange}
                    placeholder="FYxx"
                  />
                  <FormErrorMessage>{errors.pFinancialYear}</FormErrorMessage>
                </FormControl>
                <Divider />

                <FormControl isInvalid={!!errors.pCalendarYear}>
                  <FormLabel>Period - Calendar Year</FormLabel>
                  <Input
                    name="pCalendarYear"
                    value={formData.pCalendarYear}
                    onChange={handleChange}
                    placeholder="YYYY"
                  />
                  <FormErrorMessage>{errors.pCalendarYear}</FormErrorMessage>
                </FormControl>
                <Divider mt={2} />

                <Flex w={'100%'} mt={10} alignContent={'center'} justifyContent={'flex-start'}>
                  <Box>
                    <Text fontSize="md" color="gray.600">
                      {file ? `Selected File: ${file.name}` : 'No file chosen'}
                    </Text>
                  </Box>
                </Flex>
                <Flex w="100%" justifyContent="space-between" direction={["column", "row"]} alignItems="center">
                  <Flex direction="row" alignItems="center" mb={4}>
                    <Input
                      type="file"
                      accept="*"
                      onChange={handleFileChange}
                      display="none"
                      id="file-upload"
                    />
                    <Button
                      as="label"
                      htmlFor="file-upload"
                      leftIcon={<FaFileExcel />}
                      colorScheme="green"
                      variant="outline"
                      mr={4}
                      size="md"
                    >
                      Choose Excel File
                    </Button>

                    <Button
                      colorScheme="green"
                      onClick={handleFileUpload}
                      leftIcon={<FaFileUpload />}
                      variant="solid"
                      ml={4}
                      size="md"
                      isLoading={loading}
                    >
                      Import Data
                    </Button>
                  </Flex>
                  <Button
                    colorScheme="green"
                    isLoading={loading}

                    onClick={handleSubmit}
                    leftIcon={<FaCheck />}
                    variant="solid"
                    size="md"
                  >
                    Submit
                  </Button>
                </Flex>

              </VStack>
            </Flex>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default Page;
