import Header from "./components/Layout/HeaderComponent";
import HomePage from "./pages/home/HomePage";
import "./App.css";

export default function App() {
  return (
    <>
      <div className="bg-[#F3F4FD] dark:bg-[#121212] dark:text-[#f3f4fd] w-full h-full box-border">
        <Header/>
        <HomePage/>
      </div>
    </>
  );
}
