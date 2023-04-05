import { Box, Button, Flex, HStack, Heading, Text } from "@chakra-ui/react";
import React from "react";

const TaskList = (props) => {
     const { userName, amount, assignto, status, comment, userType } = props;
     const handleApproved = () => {};
     const handleRejected = () => {};

     return (
          <Box border="2px" w="90%" borderRadius="md" padding={3}>
               <Flex justifyContent="space-evenly">
                    <HStack>
                         <Text>UserName :</Text>
                         <Heading size="sm">{userName}</Heading>
                    </HStack>
                    <HStack>
                         <Text>Amount :</Text>
                         <Heading size="sm">{amount}</Heading>
                    </HStack>
                    <HStack>
                         <Text>AssignTo :</Text>
                         <Heading size="sm">{assignto}</Heading>
                    </HStack>
                    {userType === "User" && status === "Pending" && (
                         <HStack>
                              <Text>Status :</Text>
                              <Heading size="sm">{status}</Heading>
                         </HStack>
                    )}

                    {status === "Approved" && (
                         <HStack>
                              <Text>Approved By:</Text>
                              <Heading size="sm">{comment}</Heading>
                         </HStack>
                    )}
                    {userType !== "User" && status === "Pending" && (
                         <HStack>
                              <Button colorScheme="green" onClick={handleApproved}>
                                   Approve
                              </Button>
                              <Button colorScheme="red" onClick={handleRejected}>
                                   Reject
                              </Button>
                         </HStack>
                    )}
               </Flex>
          </Box>
     );
};
export default TaskList;
