import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-stone-900 text-gray-200 py-6 lg:px-20 px-5">
      <div className="max-w-8xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-light">Eventous</h2>
          <p className="text-xs mt-2">
            © {new Date().getFullYear()} Eventous. All rights reserved.
          </p>
        </div>

        <div>
          <ul className=" text-sm flex xl:gap-15 gap-5 md:justify-center">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex md:items-end flex-col">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/maashik.ahmed.7"
              className="hover:text-white"
              target="_blank"
            >
              Facebook
            </a>
            <a
              href="https://x.com/mahbub4b"
              className="hover:text-white"
              target="_blank"
            >
              Twitter
            </a>
            <a
              href="https://github.com/mahbub47"
              className="hover:text-white"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
