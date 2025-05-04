import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <header className="flex justify-between items-center text-stone-900 px-8 py-1.5 bg-white border-b-yellow-200 border-2">
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
                href="#"
                className="text-md font-semibold text-stone-900 py-1.5 px-0.5 underline"
              >
                Create
              </a>
            </div>
            <div className="flex justify-center items-center px-4">
              <i className="bx bx-heart text-red-600"></i>
              <a href="#" className="text-md font-semibold text-stone-900 py-1.5 px-1">
                Likes
              </a>
            </div>
          </div>
          <div className="md:flex justify-self-end hidden">
            <button className="text-lg font-semibold py-1.5 px-3 mx-5 cursor-pointer hover:underline">
              Login
            </button>
            <button className="text-lg text-stone-900 font-semibold py-1.5 px-5 bg-yellow-300 rounded-sm cursor-pointer hover:bg-amber-400 transition-colors">
              Signup
            </button>
          </div>
        </nav>
        <div className="md:hidden">
          <i
            className="bx bx-menu text-3xl font-light cursor-pointer"
            onClick={() => setMenuOpen(!isMenuOpen)}
          ></i>
        </div>

        <div
          className={`z-10 absolute md:hidden top-12 w-full left-0 bg-amber-200 text-stone-900 flex flex-col items-center font-normal text-md transform transition-transform ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "transform 0.3 ease, opacity 0.3 ease" }}
        >
          <li className=" text-stone-900 list-none w-full cursor-pointer text-center p-4 hover:bg-amber-300 transition-all ">
            Create event
          </li>
          <li className="text-stone-900 list-none w-full cursor-pointer text-center p-4 hover:bg-amber-300 transition-all ">
            Likes
          </li>
          <li className=" text-stone-900 list-none w-full cursor-pointer text-center p-4 hover:bg-amber-300 transition-all ">
            Login/Signup
          </li>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
