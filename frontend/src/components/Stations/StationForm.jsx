import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MapComponent from "../Map/MapComponent";

export default function StationForm({ visible, item }) {
    const [showMap, setShowMap] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShowMap(!showMap)
        }, 600)
    }, [])

  return visible ? (
    <div className="p-6 flex flex-col items-start">
      <Link
        to="/"
        className="flex gap-4 items-center justify-center ml-6 text-white bg-transparent border focus:ring-4 focus:ring-white rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-white"
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

      <div className="w-full p-6 h-[100vh] grid grid-cols-1 gap-4 md:grid-cols-2">
        <motion.div
          className=" w-full h-[85%] bg-rose-600 rounded-lg"
          initial={{ x: -1000, y: 1000 }}
          animate={{ x: 0, y: 0 }}
          transition={{
            duration: 0.75,
          }}
        ></motion.div>
        <motion.div
          className=" w-full h-[85%] bg-rose-600 rounded-lg"
          initial={{ x: 1000, y: 1000}}
          animate={{ x: 0, y: 0}}
          transition={{
            duration: 0.45,
          }}
        >
          <MapComponent item={{ lat: 38.82444274016997, long: -0.6040024707834653 }} />
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
