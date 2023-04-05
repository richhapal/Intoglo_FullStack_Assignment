import { Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Select, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import TaskList from "./TaskList";
import DisplayLayout from "./DisplayLayout";
const Management = () => {
     return (
          <Box flexDirection={"column"} display="flex" gap={4} alignItems={"center"}>
               <DisplayLayout />
               <Divider />
               <TaskList userType={"Admin"} status={"Pending"} />
          </Box>
     );
};

export default Management;
