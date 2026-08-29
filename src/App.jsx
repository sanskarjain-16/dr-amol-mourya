import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { initAttributionTracking } from "./utils/attribution";
import { HelmetProvider } from "react-helmet-async";

import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Contact = lazy(() => import("./pages/Contact"));
const Workshop = lazy(() => import("./pages/Workshop"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

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

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const LoadingFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-background">
    <div className="flex flex-col items-center">
      <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-slate-500 font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    initAttributionTracking();
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToAnchor />
        <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about/*" element={<About />} />
                <Route path="/programs/*" element={<Programs />} />
                <Route path="/reviews/*" element={<Reviews />} />
                <Route path="/contact/*" element={<Contact />} />
                <Route path="/workshop" element={<Workshop />} />
              </Route>
              
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;