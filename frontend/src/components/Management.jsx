import { Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Select, Stack, Tab, TabIndicator, TabList, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import DisplayLayout from "./DisplayLayout";
import { fetchList } from "../apiHandler/apiHandler";
import { useLocation } from "react-router-dom";
import { wrap } from "framer-motion";
const Management = () => {
     const [list, setList] = useState([]);
     const [filteredList, setFilteredList] = useState([]);
     // const [tabIndex, setTabIndex] = useState(0);
     const location = useLocation();
     // console.log("location", location);
     const { name, userType, email, _id, token } = location.state;

     useEffect(() => {
          if (name) {
               (async function api() {
                    let list = await fetchList(userType, email, token);
                    // console.log("getList---", list);
                    setList(list);
               })();
          }
     }, [name]);

     useEffect(() => {
          let filtrList = list.filter((value) => value.status === "Pending");
          // console.log("initialRedner----filtrList", filtrList, "list", list);
          setFilteredList(filtrList);
     }, [list]);

     const handleRejectOrApprovedList = (newList) => {
          // console.log("newlist", list);
          let filterList = list.filter((value) => value._id !== newList._id);
          setList([...filterList, newList]);
     };

     const handleFilterList = (index) => {
          if (index === 0) {
               let filtrList = list.filter((value) => value.status === "Pending");
               setFilteredList(filtrList);
          } else if (index === 1) {
               let filtrList = list.filter((value) => value.status === "Approved");
               setFilteredList(filtrList);
          } else if (index === 2) {
               let filtrList = list.filter((value) => value.status === "Rejected");
               setFilteredList(filtrList);
          }
     };

     return (
          <Box flexDirection={"column"} display="flex" gap={4} alignItems={"center"}>
               <DisplayLayout role={userType} name={name} email={email} />
               <Divider />
               <Box w={["90%", "80%", "70%"]}>
                    <Tabs isFitted variant="line" onChange={handleFilterList}>
                         <TabList mb="1em">
                              <Tab>Pending</Tab>
                              <Tab>Approved</Tab>
                              <Tab>Rejected</Tab>
                         </TabList>
                    </Tabs>
               </Box>

               <Flex gap={3} m={3} flexWrap={"wrap"}>
                    {filteredList.length !== 0 &&
                         filteredList.map((value) => <TaskList {...value} userType={userType} key={value._id} handleRejectOrApprovedList={handleRejectOrApprovedList} />)}
                    {filteredList.length === 0 && <Heading size="sm">No List Found</Heading>}
               </Flex>
          </Box>
     );
};

export default Management;
