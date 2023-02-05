import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const control = useAnimation()

  const [ref, inView, entry] = useInView({ threshold: 0 });

  const cardVariant = {
    left: {
      hidden: {
        x: -1000,
      },
      visible: {
        x: 0,
      },
    },
    center: {
      hidden: {
        y: 1000,
      },
      visible: {
        y: 0,
      },
    },
    right: {
      hidden: {
        x: 1000,
      },
      visible: {
        x: 0,
      },
    },
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <div className="_wrapper">
      <div className="inial-info flex items-center justify-center" id="hero">
        <section className="relative bg-[url(https://vadebike.es/sites/default/files/2020-09/estacion-hibrida-vadebike-barcelona.jpg)] bg-cover bg-center bg-no-repeat w-full">
          <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95. sm:to-white/25"></div>
          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
            <div className="max-w-xl text-center sm:text-left">
              <h1 className="text-3xl font-extrabold text-rose-700">
                Let us accompany you
                <strong className="block font-extrabold text-rose-700">
                  wherever you go
                </strong>
              </h1>
              <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed xs:text-black/70 sm:text-white">
                Welcome to OnBCycle, the application that will allow you to enjoy your city in a sustainable and comfortable way.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <Link to={"/auth"}
                  href="#"
                  className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                >
                  Get Started
                </Link>
                <Link to={"/stations"}
                  href=""
                  className="block w-full rounded dark:bg-[#212121] bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                >
                  Our Stations
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="_stations-info p-6" ref={ref}>
        <div className="flex flex-wrap xs:flex-col items-center basis-1/2 h-full gap-4 m-5 md:flex-row justify-center flex-1 overflow-hidden box-border">
          <motion.div
            variants={cardVariant.left}
            initial="hidden"
            animate={control}
            transition={{
              delay: 0.2,
              duration: 0.5,
            }}
            className="shadow-inner dark:bg-[#36B591] p-5 w-full h-full flex-1 m-0 rounded-lg box-border"
          >
            <h1>A</h1>
          </motion.div>
          <motion.div
            variants={cardVariant.center}
            animate={control}
            initial="hidden"
            transition={{
              delay: 0.5,
              duration: 0.5,
            }}
            className="block shadow-inner dark:bg-[#36B591] p-5 w-full h-full flex-1 m-0 rounded-lg box-border"
          >
            <h1>A</h1>
          </motion.div>
          <motion.div
            variants={cardVariant.right}
            animate={control}
            initial="hidden"
            transition={{
              delay: 0.7,
              duration: 0.7,
            }}
            className="block shadow-inner dark:bg-[#36B591] p-5 w-full h-full flex-1 m-0 rounded-lg box-border"
          >
            <h1>A</h1>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
