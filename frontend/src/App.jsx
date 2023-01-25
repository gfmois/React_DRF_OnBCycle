import Header from "./components/Layout/HeaderComponent";
import HomePage from "./pages/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";

export default function App() {
  const Home = React.lazy(() => import("./pages/home/HomePage"));

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <div className="bg-[#F3F4FD] dark:bg-[#121212] dark:text-[#f3f4fd] w-full h-full box-border">
          <Route path="/">
            <Route path="/">
              <Home />
            </Route>
          </Route>
        </div>
      </Routes>
    </BrowserRouter>
  );
}

{
  /* <div className="bg-[#F3F4FD] dark:bg-[#121212] dark:text-[#f3f4fd] w-full h-full box-border">
<Header/>
<HomePage/>
</div> */
}
