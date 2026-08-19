import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.scss';

export default function NavMenu() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const f = (e: MouseEvent) =>//re render when mouse event
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });

    window.addEventListener('mousemove', f);

    return () => window.removeEventListener('mousemove', f);//cleanup
  }, []);//run once on mount

  const open =//should the menu be open
    mouse.y < 180 &&
    mouse.x > Math.min(window.innerWidth / 2, window.innerWidth - 800);

  return (
    <div //conditional styling
      className={`nav-container ${
        open ? 'nav-container--open' : ''
      }`}
    >
      <div className="nav-icon"> {/* hamburger icon*/}
        <div className="nav-icon__line" />
        <div className="nav-icon__line" />
        <div className="nav-icon__line" />
      </div>

      <nav className="nav-links">
        <Link to="/about" className="mouse-md">
          About
        </Link>

        <Link to="/explore" className="mouse-md">
          Explore
        </Link>

        <Link to="/contact" className="mouse-md">
          Contact
        </Link>
      </nav>
    </div>
  );
}