import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.ts";
import { Provider } from "react-redux";
import App from "./App.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import LandingPage from "./components/screens/LandingPage.tsx";
import LoginPage from "./components/screens/LoginPage.tsx";
import RegisterPage from "./components/screens/RegisterPage.tsx";
import ProfilePage from "./components/screens/ProfilePage.tsx";
import OtpPage from "./components/screens/OtpPage.tsx";
import HomePage from "./dashboard/HomePage.tsx";
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<OtpPage />} />
      <Route path="" element={<PrivateRoute />}>
      <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <GoogleOAuthProvider clientId={clientId}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </StrictMode>
  </Provider>
);
