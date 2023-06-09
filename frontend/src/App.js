import { Heading } from "@chakra-ui/react";

import SignPage from "./components/SignPage";
import Profile from "./components/Profile";
import Management from "./components/Management";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
     {
          path: "/",
          element: <SignPage />,
     },
     {
          path: "/profile",
          element: <Profile />,
          errorElement: <Heading size={"sm"}>Please SingUp</Heading>,
     },
     {
          path: "/management",
          errorElement: <Heading size={"sm"}>Unauthorized</Heading>,
          element: <Management />,
     },
]);

function App() {
     return (
          <>
               <RouterProvider router={router} />
               {/* <SignPage /> */}
               {/* <Profile /> */}
               {/* <Management /> */}
          </>
     );
}

export default App;
