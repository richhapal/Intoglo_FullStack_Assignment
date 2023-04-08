import { Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Select, Spacer, Stack, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import TaskList from "./TaskList";
import DisplayLayout from "./DisplayLayout";
import { useLocation } from "react-router-dom";
import { fetchList, addList } from "../apiHandler/apiHandler";
import moment from "moment";
const Profile = () => {
     const [createList, setcreateList] = useState(false);
     const refAmount = useRef("");
     const refAssign = useRef("");
     const [list, setList] = useState([]);
     const location = useLocation();
     const { name, userType, email, _id, token } = location.state;
     const toast = useToast();
     useEffect(() => {
          if (name) {
               (async function api() {
                    let list = await fetchList(userType, email, token);
                    // console.log("getList---", list);
                    setList(list);
               })();
          }
     }, [name]);

     const handleListSubmit = async (e) => {
          e.preventDefault();
          const data = {
               name: name,
               amount: refAmount.current.value,
               assignTo: refAssign.current.value,
               email: email,
               date: new Date().toLocaleDateString("en-In", { year: "numeric", month: "2-digit", day: "2-digit" }).split("/").reverse().join("-"),
          };
          let newList = await addList(data, token);

          if (newList.details || newList.message) {
               let message = newList.message || newList.details[0].message;
               // console.log("newList-message", newList.message);
               // console.log("message", message);
               toast({
                    title: message,
                    // description: "We've created your account for you.",
                    position: "top-center",
                    status: "error",
                    duration: 1600,
                    isClosable: true,
               });
          } else {
               setList((prevList) => [...prevList, newList]);
               setcreateList(false);
          }
     };

     return (
          <Box flexDirection={"column"} display="flex" gap={4}>
               <DisplayLayout role={userType} name={name} email={email} />
               <Divider />
               <Stack alignItems="center" mb={2}>
                    <Button
                         variant="solid"
                         colorScheme="green"
                         onClick={() => {
                              setcreateList(!createList);
                         }}
                    >
                         Create List Reimbursements
                    </Button>
                    {createList && (
                         <Box w={"90%"}>
                              <Flex justifyContent="space-evenly" gap={4} alignItems="center">
                                   <form onSubmit={handleListSubmit}>
                                        <FormControl isRequired>
                                             <FormLabel>Amount</FormLabel>
                                             <Input type="number" ref={refAmount} placeholder="Enter Amount" />
                                        </FormControl>
                                        <br />
                                        <FormControl isRequired>
                                             <FormLabel>AssignTo</FormLabel>
                                             <Select placeholder="Select to assign" ref={refAssign}>
                                                  <option value="admin">Admin</option>
                                                  <option value="manager">Manager</option>
                                             </Select>
                                        </FormControl>
                                        <br />
                                        <Button colorScheme="teal" type="submit">
                                             Create
                                        </Button>
                                   </form>
                              </Flex>
                         </Box>
                    )}
               </Stack>
               <Divider />
               <Flex gap={3} m={3} flexWrap={"wrap"}>
                    {list.map((value) => (
                         <TaskList {...value} userType={userType} key={value._id} />
                    ))}
               </Flex>
               <Stack alignItems="center" mb={2}>
                    {/* userName, amount, assignto, status, comment, userType */}
               </Stack>
          </Box>
     );
};
export default Profile;
