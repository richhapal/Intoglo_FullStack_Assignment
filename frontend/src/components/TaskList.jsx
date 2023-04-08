import { Box, Button, Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { updateList } from "../apiHandler/apiHandler";
const TaskList = (props) => {
     const { name, amount, assignTo, status, comment, userType, date, _id, handleRejectOrApprovedList } = props;
     let token = localStorage.getItem("token");
     const handleApproved = async () => {
          const data = {
               listId: _id,
               status: "Approved",
               comment: `Approved by ${userType} on ${new Date().toDateString()} @ ${new Date().toLocaleTimeString()}`,
          };
          let list = await updateList(data, token);
          handleRejectOrApprovedList(list);
          // window.location.reload();
     };
     const handleRejected = async () => {
          const data = {
               listId: _id,
               status: "Rejected",
               comment: `Rejected by ${userType} on ${new Date().toDateString()} @ ${new Date().toLocaleTimeString()}`,
          };
          let list = await updateList(data, token);
          handleRejectOrApprovedList(list);
          // window.location.reload();
     };

     return (
          <Box border="2px" w={"xs"} borderRadius="md" padding={3}>
               <VStack align gap={1}>
                    <HStack>
                         <Text>UserName :</Text>
                         <Heading size="sm">{name}</Heading>
                    </HStack>
                    <HStack>
                         <Text>Amount :</Text>
                         <Heading size="sm">{amount}</Heading>
                    </HStack>
                    <HStack>
                         <Text>Date :</Text>
                         <Heading size="sm">{new Date(date).toDateString("en-IN")}</Heading>
                    </HStack>
                    <HStack>
                         <Text>AssignTo :</Text>
                         <Heading size="sm">{assignTo}</Heading>
                    </HStack>
                    {status === "Pending" && (
                         <HStack>
                              <Text>Status :</Text>
                              <Heading size="sm">{status}</Heading>
                         </HStack>
                    )}

                    {(status === "Approved" || status === "Rejected") && (
                         <HStack>
                              <Text>Status:</Text>
                              <Heading size="xs">{comment}</Heading>
                         </HStack>
                    )}
                    {userType !== "user" && status === "Pending" && (
                         <HStack>
                              <Button colorScheme="green" onClick={handleApproved}>
                                   Approve
                              </Button>
                              <Button colorScheme="red" onClick={handleRejected}>
                                   Reject
                              </Button>
                         </HStack>
                    )}
               </VStack>
          </Box>
     );
};
export default TaskList;
