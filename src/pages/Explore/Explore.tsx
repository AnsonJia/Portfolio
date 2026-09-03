import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Explore.scss';

export default function Explore() {
    const navigate = useNavigate();
    const navigating = useRef(false);
  
    useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY < 0 && !navigating.current) {
          navigating.current = true;
          navigate('/');
        }
      };
  
      window.addEventListener('wheel', handleWheel);
  
      return () => {
        window.removeEventListener('wheel', handleWheel);
      };
    }, [navigate]);

    //other things here




  
    return (
      <section className="page">
        <main className="explore-page">
        <div className="explore-content">
            <p className="explore-label">Explore</p>

            <h1>
            My Projects
            </h1>

            <p>
            A collection of projects I've worked on across software development,
            web applications, and other technologies.
            </p>

            <p style={{ color: "#ff0000", fontSize: 40}}>Page Is Under Construction Please Check Back Later</p>
            
        </div>
        </main>
      </section>
    );
  }