import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white w-full min-h-[100vh] absolute">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
