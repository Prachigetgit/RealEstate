import { Suspense, useState } from "react";
import "./App.css";
import Website from "./pages/website";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Properties from "./pages/Properties/Properties";
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";
import UserDetailContext from "./context/UserDetailContext";
function App() {
  const queryClient = new QueryClient()
  const [userDetails, setUserDetails] = useState({
    favouites: [],
    bookings: [],
    token: null
  })
  
  return (
    <UserDetailContext.Provider value={{userDetails, setUserDetails}}>

 
    <QueryClientProvider client={queryClient}>
      <Router>
    <Suspense fallback= {<div>Loading...</div>}>
    <Routes>
    <Route path="/" element={<Layout />}>
      <Route  index element={<Website />} />
      <Route path="/properties">
      <Route index element={<Properties/>} />      
           <Route path=":propertyId" element={<Property/>} />
       </Route>
    </Route>
    </Routes>
       </Suspense>   
    </Router>
    <ToastContainer/>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </UserDetailContext.Provider>
   
  );
}


export default App;
