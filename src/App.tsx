import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Hero from './components/Hero/Hero';
import Cursor from './components/Cursor/Cursor';
import DefaultLayout from './layouts/DefaultLayout';
import Home from './pages/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Explore from './pages/Explore/Explore';
import NotFound from './pages/NotFound/NotFound';

function AnimatedRoutes() {//function to set all pages to have page transition animation
  const location = useLocation();//get current page location

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('page-enter-active');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {//if page changes, set leave transition
      setTransitionStage('page-leave-active page-leave-to');

      const timeout = setTimeout(() => {//wait before changing pages
        setDisplayLocation(location);//switch to new location and set enter transition
        setTransitionStage('page-enter-active page-enter-from');

        requestAnimationFrame(() => {//wait until ready to render next frame
          setTransitionStage('page-enter-active');//switch to active page from enter
        });
      }, 1000);

      return () => clearTimeout(timeout);//cleanup
    }
  }, [location, displayLocation]);//run whenever location changes

  return ( //set all routes to be part of the transition
    <div className={`page-transition ${transitionStage}`}> {/*transition css + whatever stage its on*/}
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default function App() { //return the layout
  return (
    <DefaultLayout>
      <Hero />
      <Cursor />

      <AnimatedRoutes /> {/*all page transition routes*/}
    </DefaultLayout>
  );
}