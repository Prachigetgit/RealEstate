import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "http://localhost:8000", // ✅ Must match the new API Identifier
  issuerBaseURL: "https://dev-42zikpyg3s56sq76.us.auth0.com",
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
