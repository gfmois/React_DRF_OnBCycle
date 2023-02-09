import Header from "./components/Layout/HeaderComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

import "./App.css";

// Context
import { StationContextProvider } from "./context/StationsContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToasterContext";
import LoadingComponent from "./components/Layout/LoadingComponent";
import ToastrComponent from "./components/Layout/ToasterComponent";

export default function App() {
  const Home = React.lazy(() => import("./pages/home/HomePage"));
  const Stations = React.lazy(() => import("./pages/stations/StationsPage"));
  const Auth = React.lazy(() => import("./pages/auth/AuthPage"));
  const Dashboard = React.lazy(() => import('./pages/dashboard/DashboardPage'))

  return (
    <BrowserRouter>
      <ToastContextProvider>
        <StationContextProvider>
          <AuthContextProvider>
            <ToastrComponent />
            <div className="bg-[#F3F4FD] dark:bg-[#121212] dark:text-[#f3f4fd] w-full h-full box-border">
              <Suspense fallback={<LoadingComponent />}>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/stations" element={<Stations />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard/>} />
                </Routes>
              </Suspense>
            </div>
          </AuthContextProvider>
        </StationContextProvider>
      </ToastContextProvider>
    </BrowserRouter>
  );
}
