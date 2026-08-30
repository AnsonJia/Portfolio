import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import ScrollHint from '../components/ScrollHint/ScrollHint';

export default function Home() {
  const navigate = useNavigate();
  const navigating = useRef(false);//track nav

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && !navigating.current) {//check is scroll down and havent started nav yet
        navigating.current = true;//currently navigating to prevent repeated nav
        navigate('/explore');//navigate to the explore page on scroll down
      }
    };

    window.addEventListener('wheel', handleWheel);//listener for scrollwheel

    return () => {//cleanup
      window.removeEventListener('wheel', handleWheel);
    };
  }, [navigate]);//run effect if navigate changes
  
  return (
    <section className="page">
      <ScrollHint />
    </section>
  );
}