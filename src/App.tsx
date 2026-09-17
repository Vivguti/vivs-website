import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Global Components
import Navbar from './components/Navbar';
import PageWrapper from './components/PageWrapper';

// Initial Load Page (Keep static to avoid flash on first visit)
import Home from './pages/Home';

// Lazy Loaded Pages
const About = lazy(() => import('./pages/About'));
const SelectedWorks = lazy(() => import('./pages/SelectedWorks'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const LivingInfrastructure = lazy(() => import('./pages/LivingInfrastructure'));

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
              <Suspense fallback={<div className="w-full h-screen bg-transparent" />}>
                <About />
              </Suspense>
            </PageWrapper>
          }
        />
        <Route
          path="/selected-works"
          element={
            <PageWrapper>
              <Suspense fallback={<div className="w-full h-screen bg-transparent" />}>
                <SelectedWorks />
              </Suspense>
            </PageWrapper>
          }
        />
        <Route
          path="/portfolio"
          element={
            <Suspense fallback={<div className="w-full h-screen bg-transparent" />}>
              <Portfolio />
            </Suspense>
          }
        />
        <Route
          path="/project/living-infrastructure"
          element={
            <PageWrapper>
              <Suspense fallback={<div className="w-full h-screen bg-transparent" />}>
                <LivingInfrastructure />
              </Suspense>
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
              <Suspense fallback={<div className="w-full h-screen bg-transparent" />}>
                <Contact />
              </Suspense>
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
