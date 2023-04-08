import { Alert, AlertIcon, Button, Card, CardBody, Flex, FormControl, FormLabel, Heading, Input, Radio, RadioGroup, Stack, Tab, TabList, Tabs, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { signIn, signUp } from "../apiHandler/apiHandler";
import { Navigate, useNavigate } from "react-router-dom";

const SignPage = () => {
     const [email, setEmail] = useState("");
     const [name, setName] = useState("");
     const [userType, setUserType] = useState("user");
     const [password, setPassword] = useState("");
     const [isSubmitting, setSubmitting] = useState(false);
     const [whichTab, setWhichTab] = useState("signin");
     // const [navigateTo, setNavigateTo] = useState(false);
     const toast = useToast();
     const handleEmailChange = (e) => setEmail(e.target.value);
     const handleNameChange = (e) => setName(e.target.value);
     const handlePasswordChange = (e) => setPassword(e.target.value);
     const navigation = useNavigate();
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

     const loginHandling = (token, message, path, loginData) => {
          localStorage.setItem("token", token);
          toast({
               title: message,
               // description: "We've created your account for you.",
               position: "top-center",
               status: "success",
               duration: 1600,
               isClosable: true,
          });
          // setNavigateTo(path);
          // console.log("data---------", loginData);
          navigation(path, { state: { ...loginData, token } });
     };

     const handleAuth = async (authType) => {
          let userAuth = authType === "signin" ? await signIn({ email, password }) : await signUp({ name, email, password, userType });
          // console.log("userAuth", userAuth.loginUser.userType);
          const { message, loginUser, newUser, tokens } = userAuth;
          // console.log("userAuth", userAuth);

          if (message) {
               toast({
                    title: message,
                    // description: "We've created your account for you.",
                    position: "top-center",
                    status: "warning",
                    duration: 1600,
                    isClosable: true,
               });
          }

          // console.log("---------------------", newUser.userType, newUser.userType === "user");

          if (loginUser && loginUser.userType === "user") {
               loginHandling(tokens.token, "Login Successfully", "/profile", loginUser);
               // console.log("loginUser", userType);
          } else if (loginUser && loginUser.userType === "admin") {
               loginHandling(tokens.token, "Login Successfully", "/management", loginUser);
               // console.log("loginUser", userType);
          } else if (newUser && newUser.userType === "user") {
               // console.log("loginUser", loginUser.userType);
               loginHandling(tokens.token, "Login Successfully", "/profile", newUser);
          } else if ((newUser && newUser.userType === "admin") || newUser.userType === "manager") {
               // console.log("loginUser", loginUser.userType);
               loginHandling(tokens.token, "Login Successfully", "/management", newUser);
          }
     };

     return (
          <>
               {/* {navigateTo && <Navigate to={navigateTo} />} */}
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
                                             <RadioGroup onChange={setUserType} value={userType} id="userType">
                                                  <Stack direction="row">
                                                       <Radio value="user" defaultChecked>
                                                            User
                                                       </Radio>
                                                       <Radio value="admin">Admin</Radio>
                                                       {/* <Radio value="manager">Manager</Radio> */}
                                                  </Stack>
                                             </RadioGroup>
                                        </FormControl>
                                   )}

                                   <Button mt={4} onClick={() => handleAuth(whichTab)} colorScheme="teal" isLoading={isSubmitting} type="submit">
                                        {whichTab === "signin" ? "SignIn" : "SignUp"}
                                   </Button>
                              </form>
                         </CardBody>
                    </Card>
               </Flex>
          </>
     );
};
export default SignPage;
