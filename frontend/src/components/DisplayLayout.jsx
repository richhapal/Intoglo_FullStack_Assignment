import { HStack, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

const DisplayLayout = (props) => {
     const { role, name, email } = props;
     return (
          <>
               <Stack align="center">
                    <HStack>
                         <Text>UserType :</Text>
                         <Heading size="sm">{role}</Heading>
                    </HStack>
                    <HStack>
                         <Text>UserName :</Text>
                         <Heading size="sm">{name}</Heading>
                    </HStack>
                    <HStack>
                         <Text>UserEmail :</Text>
                         <Heading size="sm">{email}</Heading>
                    </HStack>
               </Stack>
          </>
     );
};
export default DisplayLayout;
