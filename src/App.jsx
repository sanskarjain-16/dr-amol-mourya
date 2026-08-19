import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Reviews from "./pages/Reviews";

function ScrollToAnchor() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, useLocation().pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToAnchor />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/programs/*" element={<Programs />} />
          <Route path="/reviews/*" element={<Reviews />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;