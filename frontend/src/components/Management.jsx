import { Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Select, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import DisplayLayout from "./DisplayLayout";
import { fetchList } from "../apiHandler/apiHandler";
import { useLocation } from "react-router-dom";
import { wrap } from "framer-motion";
const Management = () => {
     const [list, setList] = useState([]);
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

     const handleRejectOrApprovedList = (newList) => {
          // console.log("newlist", list);
          let filterList = list.filter((value) => value._id !== newList._id);
          setList([...filterList, newList]);
     };

     return (
          <Box flexDirection={"column"} display="flex" gap={4} alignItems={"center"}>
               <DisplayLayout role={userType} name={name} email={email} />
               <Divider />
               <Flex gap={3} m={3} flexWrap={"wrap"}>
                    {list.map((value) => (
                         <TaskList {...value} userType={userType} key={value._id} handleRejectOrApprovedList={handleRejectOrApprovedList} />
                    ))}
               </Flex>
          </Box>
     );
};

export default Management;
