function Navbar() {
  return (
    <div>
      <header className="flex justify-between items-center text-black px-8 py-1.5 bg-white border-b-yellow-200 border-2">
        <div className="flex justify-start items-center">
          <a href="#">
            <h1 className="text-2xl font-light">Eventous</h1>
          </a>
          <div className="relative sm:flex bg-amber-50 items-center mx-6 py-1.5 rounded-3xl xl:w-lg w-sm border-1 border-b-gray hidden">
            <i className="bx bx-search absolute m-2 text-xl text-gray-500"></i>
            <input
              type="text"
              className="ps-8 text-md text-sm font-light focus:outline-none"
              placeholder="search event"
            />
            <i className="bx bx-search absolute right-0 m-2 text-md text-gray-500 bg-amber-300 rounded-2xl p-1"></i>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="lg:flex justify-start items-center px-4 hidden">
            <div className="flex justify-center items-center px-4">
              <i className="bx bx-plus text-red-600 text-md"></i>
              <a href="#" className="text-sm text-black py-1 px-1 underline">
                Create event
              </a>
            </div>
            <div className="flex justify-center items-center px-4">
              <i className="bx bx-heart text-red-600"></i>
              <a href="#" className="text-sm text-black py-1 px-1">
                Likes
              </a>
            </div>
          </div>
          <div className="md:flex justify-self-end hidden">
            <button className="text-sm font-semibold py-2 px-3 mx-5 cursor-pointer">Login</button>
            <button className="text-sm font-semibold py-2 px-5 bg-amber-300 rounded-sm cursor-pointer hover:bg-amber-100 transform">Signup</button>
          </div>
        </div>
        <div className="md:hidden">
          <i className="bx bx-menu text-3xl font-light cursor-pointer"></i>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
