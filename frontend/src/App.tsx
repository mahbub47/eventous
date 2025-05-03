import "./App.css";
import Footer from "./components/footer/Footer";
import HeroEvents from "./components/hero-events/HeroEvents";
import HeroEnding from "./components/hero/HeroEnding";
import HeroTitle from "./components/hero/HeroTitle";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="bg-white w-full min-h-100 absolute">
      <Navbar />
      <HeroTitle />
      <HeroEvents />
      <HeroEnding />
      <Footer />
    </div>
  );
}

export default App;
