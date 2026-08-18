import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F7F6F2]">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/" element={<About />} />
            <Route path="/programs/" element={<Programs />} />
            <Route path="/reviews/" element={<Reviews />} />
            <Route path="/contact-us/" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;