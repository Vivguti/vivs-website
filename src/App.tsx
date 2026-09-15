import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Global Components
import Navbar from './components/Navbar';
import PageWrapper from './components/PageWrapper';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import SelectedWorks from './pages/SelectedWorks';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import LivingInfrastructure from './pages/LivingInfrastructure';

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
            <Portfolio />
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

import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <main className="w-full relative z-0">
          <AnimatedRoutes />
        </main>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
