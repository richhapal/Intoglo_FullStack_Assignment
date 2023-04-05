import { Button, Card, CardBody, Flex, FormControl, FormLabel, Heading, Input, Radio, RadioGroup, Stack, Tab, TabList, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const SignPage = () => {
     const [email, setEmail] = useState("");
     const [name, setName] = useState("");
     const [user, setUser] = useState("user");
     const [password, setPassword] = useState("");
     const [isSubmitting, setSubmitting] = useState(false);
     const [whichTab, setWhichTab] = useState("signin");

     const handleEmailChange = (e) => setEmail(e.target.value);
     const handleNameChange = (e) => setName(e.target.value);
     const handlePasswordChange = (e) => setPassword(e.target.value);

     const handleSignInSubmit = (e) => {
          e.preventDefault();
          setSubmitting(true);
          setTimeout(() => {
               setSubmitting(false);
          }, 1500);
     };
     const handleSignUpSubmit = (e) => {
          e.preventDefault();
          setSubmitting(true);
          setTimeout(() => {
               setSubmitting(false);
          }, 1500);
     };

     return (
          <Flex height="100vh" justifyContent="center" alignItems="center">
               <Card w="md">
                    <CardBody>
                         <Tabs
                              isFitted
                              variant="enclosed"
                              colorScheme="teal"
                              onChange={(value) => {
                                   setWhichTab(value === 0 ? "signin" : "signup");
                              }}
                         >
                              <TabList mb="1em">
                                   <Tab>
                                        <Heading size="md">SignIn</Heading>
                                   </Tab>
                                   <Tab>
                                        <Heading size="md">SignUp</Heading>
                                   </Tab>
                              </TabList>
                         </Tabs>
                    </CardBody>
                    <CardBody>
                         <form onSubmit={whichTab === "signin" ? handleSignInSubmit : handleSignUpSubmit}>
                              {whichTab === "signup" && (
                                   <FormControl isRequired>
                                        <FormLabel htmlFor="name">Name</FormLabel>
                                        <Input type="text" id="name" placeholder="Enter Your FullName" value={name} onChange={handleNameChange} />
                                   </FormControl>
                              )}

                              <FormControl isRequired>
                                   <FormLabel htmlFor="email">Email</FormLabel>
                                   <Input type="email" id="email" placeholder="Enter Your Email" value={email} onChange={handleEmailChange} />
                              </FormControl>

                              <FormControl isRequired>
                                   <FormLabel htmlFor="password">Password</FormLabel>
                                   <Input type="password" id="password" placeholder="Enter Your Password" value={password} onChange={handlePasswordChange} />
                              </FormControl>

                              {whichTab === "signup" && (
                                   <FormControl isRequired>
                                        <FormLabel htmlFor="userType">Registered As</FormLabel>
                                        <RadioGroup onChange={setUser} value={user} id="userType">
                                             <Stack direction="row">
                                                  <Radio value="user" defaultChecked>
                                                       User
                                                  </Radio>
                                                  <Radio value="admin">Admin</Radio>
                                                  <Radio value="manager">Manager</Radio>
                                             </Stack>
                                        </RadioGroup>
                                   </FormControl>
                              )}

                              <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                                   {whichTab === "signin" ? "SignIn" : "SignUp"}
                              </Button>
                         </form>
                    </CardBody>
               </Card>
          </Flex>
     );
};
export default SignPage;
