import { useNavigate } from "react-router-dom";

export default function UserDropDown({
  user,
  action,
  isVisible,
  logout,
  isAdmin = false,
}) {
  const navigate = useNavigate();

  function toggleHidden() {
    document.getElementById("mobile-menu-2").classList.toggle("hidden");
  }

  return user ? (
    <div className="flex items-center md:order-2">
      <button
        onClick={() => action(!isVisible)}
        type="button"
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-rose-800"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      >
        <span className="sr-only">Open User Menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src={user.avatar}
          alt="user photo"
        />
      </button>
      {/* <!-- Dropdown menu --> */}
      {isVisible ? (
        <div
          className="z-50 absolute xs:right-10 xs:top-10 sm:right-4 sm:top-10 md:right-[3.25rem] md:top-[1.75rem] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              {user.name}
            </span>
            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
              {user.email}
            </span>
          </div>
          <ul className="py-1" aria-labelledby="user-menu-button">
            {isAdmin ? (
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
            ) : null}
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Account
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a onClick={logout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      ) : null}
      <button
        onClick={() => toggleHidden()}
        data-collapse-toggle="mobile-menu-2"
        type="button"
        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="mobile-menu-2"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  ) : (
    <div className="flex items-center md:order-2">
      <button
        onClick={() => navigate("/auth")}
        type="button"
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-rose-800"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      >
        <span className="sr-only">Open User Menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="/test.png"
          alt="user photo"
        />
      </button>
    </div>
  );
}
