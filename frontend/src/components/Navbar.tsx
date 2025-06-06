import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user-info");

    navigate("/signup");
  };
  return (
    <div>
      <header className="flex justify-between items-center text-stone-900 px-8 py-1.5 bg-white border-b-yellow-200 border-2">
        {/* Common navbar elements */}
        <div className="flex justify-start items-center">
          <a href="/">
            <h1 className="text-3xl font-light">Eventous</h1>
          </a>
          <div className="relative sm:flex bg-yellow-50 items-center mx-6 py-1.5 rounded-3xl xl:w-lg w-sm border-1 border-b-gray hidden">
            <i className="bx bx-search absolute m-2 text-xl text-gray-500"></i>
            <input
              type="text"
              className="ps-8 text-md text-md font-light focus:outline-none w-full pe-12"
              placeholder="search event"
            />
            <i className="bx bx-search absolute right-0 m-2 text-md cursor-pointer text-gray-500 bg-amber-300 rounded-2xl p-1.5"></i>
          </div>
        </div>

        <nav className="flex justify-between items-center">
          <div className="lg:flex justify-start items-center px-4 hidden">
            <div className="flex justify-center items-center px-4">
              <i className="bx bx-plus text-red-600 text-md"></i>
              <a
                href={user ? "/create-event" : "/login"}
                className="text-md font-semibold text-stone-900 py-1.5 px-0.5 underline"
              >
                Create
              </a>
            </div>
            <div className="flex justify-center items-center px-4">
              <i className="bx bx-heart text-red-600"></i>
              <a
                href={user ? "/contact" : "/login"}
                className="text-md font-semibold text-stone-900 py-1.5 px-1"
              >
                Likes
              </a>
            </div>
          </div>
          {user ? (
            <div className="md:flex justify-self-end hidden items-center">
              <div>
                <span
                  className="flex justify-self-end justify-center items-center text-stone-900 cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                  onMouseOver={() => setIsOpen(!isOpen)}
                >
                  <CgProfile className="w-6 h-6 pr-1" />
                  {user.email}
                </span>
                {isOpen && (
                  <div className="absolute mt-2 w-50 shadow-xl bg-white z-10">
                    <div className="py-1">
                      <a
                        href=""
                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </a>
                      <a
                        href=""
                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                      >
                        My Events
                      </a>
                      <a
                        href=""
                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </a>
                      <a
                        href=""
                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="md:flex justify-self-end hidden">
              <a
                href={"/login"}
                target="_blank"
                className="text-lg font-semibold py-1.5 px-3 mx-5 cursor-pointer hover:underline"
              >
                Login
              </a>
              <a
                href={"/signup"}
                target="_blank"
                className="text-lg text-stone-900 font-semibold py-1.5 px-5 bg-yellow-300 rounded-sm cursor-pointer hover:bg-amber-400 transition-colors"
              >
                Signup
              </a>
            </div>
          )}
        </nav>
        <div className="md:hidden">
          <i
            className="bx bx-menu text-3xl font-light cursor-pointer"
            onClick={() => setMenuOpen(!isMenuOpen)}
          ></i>
        </div>

        <div
          className={`z-10 absolute md:hidden top-12 w-full left-0 bg-yellow-200 text-stone-900 flex flex-col items-center font-normal text-md transform transition-transform ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "transform 0.3 ease, opacity 0.3 ease" }}
        >
          <li className=" text-stone-900 list-none w-full cursor-pointer text-center p-4 hover:bg-amber-300 transition-all ">
            <a href={"/signup"} target="_blank">
              Create event
            </a>
          </li>
          <li className="text-stone-900 list-none w-full cursor-pointer text-center p-4 hover:bg-amber-300 transition-all ">
            <a href={"/signup"} target="_blank">
              Likes
            </a>
          </li>

          {user ? (
            <li className=" text-stone-900 list-none w-full cursor-pointer text-center p-4 hover:bg-amber-300 transition-all ">
              <a href={"/signup"} target="_blank">
                Profile
              </a>
            </li>
          ) : (
            <li className=" text-stone-900 list-none w-full cursor-pointer text-center p-4 hover:bg-amber-300 transition-all ">
              <a href={"/signup"} target="_blank">
                Signup/login
              </a>
            </li>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
