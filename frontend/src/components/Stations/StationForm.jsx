import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MapComponent from "../Map/MapComponent";

export default function StationForm({ visible, item }) {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMap(!showMap);
    }, 600);
  }, []);

  return visible ? (
    <div className="h-[100vh] flex flex-col xs:items-center md:items-start justify-center">
      <div className="flex items-center justify-center mt-1">
        <Link
          to="/"
          className="xs:absolute xs:top-20 xs:z-50 xs:bg-black sm:z-0 sm:bg-transparent sm:static flex gap-4 items-center justify-center ml-6 text-[#2d2d2d] dark:text-white bg-transparent border border-[#2d2d2d] dark:border-white focus:ring-4 focus:ring-[#2d2d2d] rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          Back
        </Link>
      </div>

      <div className="xs:w-screen xs:h-screen md:w-full md:p-8 md:h-full grid grid-cols-1 xs:gap-2 md:gap-4 md:grid-cols-2">
        <motion.div
          className="xs:hidden sm:flex sm:flex-col w-full h-[85%] bg-rose-600 rounded-lg p-6"
          initial={{ x: -1000, y: 1000 }}
          animate={{ x: 0, y: 0 }}
          transition={{
            duration: 0.75,
          }}
        >
          <div className="border border-white w-full h-1/2 mb-1"></div>
          <div className="border border-black w-full h-1/2 mt-1">
            <div className="flex xs:flex-col sm:flex-row sm:gap-4 xs:gap-1 xs:bg-blue-500 sm:bg-rose-700 md:gap-5 p-6 items-center w-full h-full justify-center">
              <div className="border border-black rounded-full xs:w-16 xs:h-16 w-1/2 h-full p-6 flex items-center justify-center">
                A
              </div>
              <div className="border border-black rounded-full xs:w-16 xs:h-16 w-1/2 h-full p-6 flex items-center justify-center">
                A
              </div>
              <div className="border border-black rounded-full xs:w-16 xs:h-16 w-1/2 h-full p-6 flex items-center justify-center">
                A
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="xs:w-screen xs:h-screen sm:w-full sm:h-[85%] bg-rose-600 rounded-lg"
          initial={{ x: 1000, y: 1000 }}
          animate={{ x: 0, y: 0 }}
          transition={{
            duration: 0.45,
          }}
        >
          <MapComponent
            item={{ lat: 38.82444274016997, long: -0.6040024707834653 }}
          />
        </motion.div>
      </div>
    </div>
  ) : (
    ""
  );
}

{
  /* <MapComponent item={{ lat: 70, long: 70 }} /> */
}
