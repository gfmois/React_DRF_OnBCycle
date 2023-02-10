import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth"
import UserDropDown from "./UserDropDown";

export default function Header() {
  const [isUserDropVisible, setIsUserDropVisible] = useState(false);
  const { user, isAdmin, logout } = useAuth()

  return (
    <nav className="bg-rose-600 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-rose-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="http://localhost:5173" className="flex items-center">
          <img
            src="/logo_onbcycle.png"
            className="h-6 mr-3 sm:h-9"
            alt="OnBCycle Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white dark:text-white">
            OnBCycle
          </span>
        </a>
        <UserDropDown logout={logout} isAdmin={isAdmin} user={user} action={setIsUserDropVisible} isVisible={isUserDropVisible} />
        <div
          className="items-center hidden justify-between w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-[#212121] md:dark:bg-[#212121] dark:border-rose-700">
            {!user ? <li>
              <Link
                to="/"
                aria-current="page"
                className="block py-2 pl-3 pr-4 text-rose-600 rounded md:bg-transparent md:p-0 dark:text-white"
              >
                Home
              </Link>
            </li> : null}
            <li>
              <Link
                to="/stations"
                aria-current="page"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Stations
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            {!user ? <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Pricing
              </a>
            </li> : <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                My Wallet
              </a>
            </li>}
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact with us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
