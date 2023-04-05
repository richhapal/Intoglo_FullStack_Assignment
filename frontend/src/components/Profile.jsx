import { Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Select, Stack, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import TaskList from "./TaskList";
import DisplayLayout from "./DisplayLayout";

const Profile = () => {
     const [create, setcreate] = useState(false);
     return (
          <Box flexDirection={"column"} display="flex" gap={4}>
               <DisplayLayout />
               <Divider />
               <Stack alignItems="center" mb={2}>
                    <Button
                         variant="solid"
                         colorScheme="green"
                         onClick={() => {
                              setcreate(!create);
                         }}
                    >
                         Create Reimbursements
                    </Button>
                    {create && (
                         <Box w={"90%"}>
                              <Flex justifyContent="space-evenly" gap={4} alignItems="center">
                                   <FormControl isRequired>
                                        <HStack>
                                             <FormLabel>Amount</FormLabel>
                                             <Input type="number" min={"1"} placeholder="Enter Number" />
                                        </HStack>
                                   </FormControl>
                                   <FormControl isRequired>
                                        <HStack>
                                             <FormLabel>AssignTo</FormLabel>
                                             <Select placeholder="AssignTo">
                                                  <option value="Admin">Admin</option>
                                                  <option value="Manager">Manager</option>
                                             </Select>
                                        </HStack>
                                   </FormControl>
                                   <Button colorScheme="teal" type="submit">
                                        Create
                                   </Button>
                              </Flex>
                         </Box>
                    )}
               </Stack>
               <Divider />
               <Stack alignItems="center" mb={2}>
                    <TaskList />
                    <TaskList />
                    <TaskList />
               </Stack>
          </Box>
     );
};
export default Profile;
