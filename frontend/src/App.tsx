import "./App.css";
import HeroEvents from "./components/hero-events/HeroEvents";
import HeroTitle from "./components/hero/HeroTitle";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="bg-white w-full min-h-100 absolute">
      <Navbar />
      <HeroTitle />
      <HeroEvents />
    </div>
  );
}

export default App;
