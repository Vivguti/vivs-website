import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Global Components
import Navbar from './components/Navbar';
import PageWrapper from './components/PageWrapper';

// Initial Load Page (Keep static to avoid flash on first visit)
// Pages
import Home from './pages/Home';
import About from './pages/About';
import SelectedWorks from './pages/SelectedWorks';
import Contact from './pages/Contact';
import LivingInfrastructure from './pages/LivingInfrastructure';

// Lazy Loaded Heavy Pages
const Portfolio = lazy(() => import('./pages/Portfolio'));

import './index.css';

// AnimatePresence requires the location object to track route changes,
// so we extract the routing logic into a child component inside the Router.
function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
        <Route
          path="/selected-works"
          element={
            <PageWrapper>
              <SelectedWorks />
            </PageWrapper>
          }
        />
        <Route
          path="/portfolio"
          element={
            <Suspense fallback={
              <div className="w-full h-screen flex flex-col items-center justify-center bg-[#e5e5e5]">
                <div className="w-8 h-8 border-2 border-gray-400 border-t-gray-900 rounded-full animate-spin mb-4" />
                <span className="text-gray-500 text-xs font-semibold tracking-widest uppercase">Loading Portfolio...</span>
              </div>
            }>
              <Portfolio />
            </Suspense>
          }
        />
        <Route
          path="/project/living-infrastructure"
          element={
            <PageWrapper>
              <LivingInfrastructure />
            </PageWrapper>
          }
        />
        <Route
          path="/flipbook"
          element={<Navigate to="/portfolio" replace />}
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <main className="w-full relative z-0">
        <AnimatedRoutes />
      </main>
    </Router>
  );
}

export default App;
