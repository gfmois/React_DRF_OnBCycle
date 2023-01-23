import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="_wrapper">
      <div className="inial-info flex items-center justify-center">
        <section className="relative bg-[url(https://vadebike.es/sites/default/files/2020-09/estacion-hibrida-vadebike-barcelona.jpg)] bg-cover bg-center bg-no-repeat w-full">
          <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95. sm:to-white/25"></div>
          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
            <div className="max-w-xl text-center sm:text-left">
              <h1 className="text-3xl font-extrabold text-rose-700">
                Let us find your
                <strong className="block font-extrabold text-rose-700">
                  Site
                </strong>
              </h1>
              <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nesciunt illo tenetur fuga ducimus numquam ea!
              </p>
              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <a
                  href="#"
                  className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                >
                  Get Started
                </a>
                <a
                  href=""
                  className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="_stations-info">
        <div className="flex flex-wrap xs:flex-col items-center basis-1/2 h-full gap-4 m-5 md:flex-row justify-center flex-1 overflow-hidden box-border">
          <motion.div
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
            }}
            className="shadow-inner dark:bg-[#36B591] p-5 w-full h-full flex-1 m-0 rounded-lg box-border"
          >
            <h1>A</h1>
          </motion.div>
          <motion.div
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
            }}
            className="block shadow-inner dark:bg-[#36B591] p-5 w-full h-full flex-1 m-0 rounded-lg box-border"
          >
            <h1>A</h1>
          </motion.div>
          <motion.div
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
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
