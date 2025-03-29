import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-42zikpyg3s56sq76.us.auth0.com"
      clientId="HA64EkPmwp6I3nayWq5HiPNZKZShcKTk"
      authorizationParams={{
        redirect_uri: "http://localhost:5173",
      }}
      audience="https://dev-42zikpyg3s56sq76.us.auth0.com/api/v2/" //"http://localhost:8000"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
