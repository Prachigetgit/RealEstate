import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
// import useFavourites from "../../hooks/useFavourites";
// import useBookings from "../../hooks/useBookings";

const Layout = () => {
  // useFavourites()
  // useBookings()

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegsiter = async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email",
        },
      });
      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));
      mutate(res);
    };

    isAuthenticated && getTokenAndRegsiter();
  }, [isAuthenticated]);
  //   const getTokenAndRegister = async () => {
  //     try {
  //       const res = await getAccessTokenWithPopup({
  //         authorizationParams: {
  //           audience: "http://localhost:8000",
  //           scope: "openid profile email",
  //         },
  //       });

  //       const decodedToken = JSON.parse(atob(res.split(".")[1]));
  //       console.log("Decoded Token:", decodedToken);
  //       console.log("User Email (direct):", user.email); // ✅ Get from user object

  //       // ✅ Send user.email & token directly to backend
  //       mutate({ email: user.email, token: res });
  //     } catch (error) {
  //       console.error("Auth0 Token Error:", error);
  //     }
  //   };
  //   isAuthenticated && getTokenAndRegister();
  // }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;

// // Layout.js
// import React, { useContext, useEffect } from 'react';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
// import { Outlet } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
// import UserDetailContext from '../../context/UserDetailContext';
// import { useMutation } from 'react-query';
// import { createUser } from '../../utils/api';

// const Layout = () => {

//   const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
//   const { setUserDetails } = useContext(UserDetailContext);

//   const { mutate } = useMutation({
//     mutationKey: [user?.email],
//     mutationFn: (token) => createUser(user?.email, token),
//   });

//   useEffect(() => {

//      const getTokenAndRegsiter = async () => {
//       const res = await getAccessTokenWithPopup({
//         authorizationParams: {
//           audience: "http://localhost:8000",
//           scope: "openid profile email",
//         },
//       });
//       localStorage.setItem("access_token", res)
//       setUserDetails((prev) => ({...prev, token: res}))
//       mutate(res)
//      }

//     isAuthenticated && getTokenAndRegsiter()
//   }, [isAuthenticated]);

//   return (
//     <>
//       <div style={{ background: "var(--black)", overflow: "hidden" }}>
//         <Header />
//         <Outlet />
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Layout;
