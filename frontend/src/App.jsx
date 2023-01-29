import Header from "./components/Layout/HeaderComponent";
import HomePage from "./pages/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { Suspense } from "react";
import StationDetails from "./components/stations/StationDetails";


export default function App() {
  const Home = React.lazy(() => import("./pages/home/HomePage"));
  const Stations = React.lazy(() => import("./pages/stations/StationsPage"));

  return (
    <BrowserRouter>
      <div className="bg-[#F3F4FD] dark:bg-[#121212] dark:text-[#f3f4fd] w-full h-full box-border">
        {/* TODO: Make Loading Component */}
        <Suspense fallback={<div>Loading</div>}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stations" element={<Stations />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

{
  /* <div className="bg-[#F3F4FD] dark:bg-[#121212] dark:text-[#f3f4fd] w-full h-full box-border">
<Header/>
<HomePage/>
</div> */
}
