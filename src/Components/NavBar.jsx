import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom"; // Fixed import for React Router
import { UserContext } from "../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faE } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const { token, setToken , setCartId} = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle navbar visibility

  function logout() {
    setToken(null);
    setCartId(null);
    localStorage.removeItem("token");
  }

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center rtl:space-x-reverse">
            <FontAwesomeIcon icon={faE} size="lg" style={{ color: "#74C0FC" }} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap m-0 text-specialBlue dark:text-white">
              -Commrence
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!token && (
              <>
                <Link
                  to="/Login"
                  className="text-white bg-specialBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 mx-2 dark:hover:bg-specialBlue dark:focus:ring-blue-800"
                >
                  Log in
                </Link>
                <Link
                  to="/Signup"
                  className="text-white bg-specialBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-specialBlue dark:focus:ring-blue-800"
                >
                  Signup
                </Link>
              </>
            )}
            {token && (
              <>
                <Link
                  onClick={logout}
                  to="/Login"
                  className="text-white bg-specialBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 mx-2 dark:hover:bg-specialBlue dark:focus:ring-blue-800"
                >
                  Log Out
                </Link>
                <Link
                  to="/resetpass"
                  className="text-white bg-specialBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 mx-2 dark:hover:bg-specialBlue dark:focus:ring-blue-800"
                >
                  Reset Password
                </Link>
              </>
            )}
            <button
              onClick={toggleMenu}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {token && (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className="block py-2 px-3 text-specialBlue rounded md:bg-transparent md:p-0 md:dark:text-blue-500"
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/brands"
                      className="block py-2 px-3 text-specialBlue rounded md:bg-transparent md:p-0 md:dark:text-blue-500"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/products"
                      className="block py-2 px-3 text-specialBlue rounded md:bg-transparent md:p-0 md:dark:text-blue-500"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/categories"
                      className="block py-2 px-3 text-specialBlue rounded md:bg-transparent md:p-0 md:dark:text-blue-500"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/wishlist"
                      className="block py-2 px-3 text-specialBlue rounded md:bg-transparent md:p-0 md:dark:text-blue-500"
                    >
                      Wishlist
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/cart"
                      className="block py-2 px-3 text-specialBlue rounded md:bg-transparent md:p-0 md:dark:text-blue-500"
                    >
                      Cart
                    </NavLink>
                  </li>
                  
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
