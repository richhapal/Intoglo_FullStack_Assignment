import axios from "axios";
const URL = "http://localhost:8082";

export const signIn = async (userSignin) => {
     let response = await axios.post(
          URL + "/v1/auth/signin",
          { ...userSignin },
          {
               headers: {
                    "Content-Type": "application/json",
               },
          }
     );

     return response.data;
};

export const signUp = async (userSignUp) => {
     let response = await axios.post(
          URL + "/v1/auth/signup",
          { ...userSignUp },
          {
               headers: {
                    "Content-Type": "application/json",
               },
          }
     );

     return response.data;
};

export const fetchList = async (userType, email, token) => {
     //  console.log("name", token, email, userType);
     let response = await axios.post(
          URL + `/v1/list/${userType}`,
          { email },
          {
               headers: {
                    "Content-Type": "application/json",
                    authorization: token,
               },
          }
     );
     // console.log("fetchList", token, email, userType);

     return response.data;
};

export const addList = async (data, token) => {
     //  console.log(data);
     let response = await axios.post(
          URL + `/v1/list/add`,
          { ...data },
          {
               headers: {
                    "Content-Type": "application/json",
                    authorization: token,
               },
          }
     );
     //  console.log("addList", response.data);

     return response.data;
};

export const updateList = async (data, token) => {
     //  console.log(data);
     let response = await axios.patch(
          URL + `/v1/list/update`,
          { ...data },
          {
               headers: {
                    "Content-Type": "application/json",
                    authorization: token,
               },
          }
     );
     //  console.log("addList", response.data);

     return response.data;
};
