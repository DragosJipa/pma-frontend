import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AssessmentProvider } from './context/assessmentContext';
// import ReactGA from "react-ga";

const StartPage = lazy(() => import('./components/startPage'));
const LandingPage = lazy(() => import('./components/landingPage'));
const ProductMaturityDesignForm = lazy(() => import('./components/productMaturityDesignForm'));
const Dashboard = lazy(() => import('./components/dashboard'));
const Disclaimer = lazy(() => import('./components/Disclaimer'));
const TRACKING_ID = "G-FJ96KMB5TG";
// ReactGA.initialize(TRACKING_ID);

function App() {

  // useEffect(() => {
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  // }, []);


  return (
    <AssessmentProvider>
      <Router>
        <Suspense fallback={<> </>}>
          <Routes>
            <Route path="/" element={<LandingPage />} /> Landing page route
            <Route path="/start" element={<StartPage />} />
            <Route path='/disclaimer' element={<Disclaimer />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assessment" element={<ProductMaturityDesignForm />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Suspense>
      </Router>
    </AssessmentProvider>
  );
}

export default App;
