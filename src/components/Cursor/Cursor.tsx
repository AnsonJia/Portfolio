import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Cursor.scss';

export default function Cursor() {
  const location = useLocation(); //url route
  const cursorRef = useRef<HTMLDivElement>(null); //reference to cursor
  const pos = useRef({ x: 0, y: 0 }); //mouse position
  const output = useRef({ x: 0, y: 0 }); //custom cursor position to trail cursor
  const sizeRef = useRef(24); //current cursor size for animation
  const [visible, setVisible] = useState(false); //initial invisible
  const [size, setSize] = useState(24); //cursor size

  useEffect(() => {
    const move = (e: MouseEvent) => { //when mouse moves update position and make visible
      pos.current = {
        x: e.clientX,
        y: e.clientY,
      };
      setVisible(true);
    };

    window.addEventListener('mousemove', move); //run above effect everytime mouse moves

    const over = (e: MouseEvent) => { //special hover
      const el = e.target as HTMLElement | null; //examine the classname of each element
      if (!el) return;
      const cls = el.classList;
      const target = cls.contains('mouse-lg') //if these elements change cursor size
        ? 200
        : cls.contains('mouse-md')
          ? 100
          : cls.contains('mouse-sm')
            ? 60
            : null;

      if (target) {
        sizeRef.current = target;
        setSize(target);
      }
    };

    const out = (e: MouseEvent) => {//return back to normal size
      const el = e.target as HTMLElement | null;

      if (
        el?.classList.contains('mouse-lg') ||
        el?.classList.contains('mouse-md') ||
        el?.classList.contains('mouse-sm')
      ) {
        sizeRef.current = 24;
        setSize(24);
      }
    };

    document.body.addEventListener('mouseover', over); //listeners
    document.body.addEventListener('mouseout', out);

    let raf = 0;

    const tick = () => { //cursor animation easing
      output.current.x +=
        (pos.current.x - output.current.x) * 0.50;

      output.current.y +=
        (pos.current.y - output.current.y) * 0.50;

      if (cursorRef.current) {//cursor centering
        cursorRef.current.style.transform = `translate(
          ${Math.round(output.current.x - sizeRef.current / 2)}px,
          ${Math.round(output.current.y - sizeRef.current / 2 + 1)}px
        )`;
      }

      raf = requestAnimationFrame(tick); //loop next frame
    };

    raf = requestAnimationFrame(tick); //loop

    return () => {//cleanup
      window.removeEventListener('mousemove', move);
      document.body.removeEventListener('mouseover', over);
      document.body.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {//when url change, set cursor to default size
    sizeRef.current = 24;
    setSize(24);
  }, [location.pathname]);

  return (
    <div
      ref={cursorRef}
      className={`cursor d-none d-xl-block ${
        !visible ? 'cursor--hidden' : ''
      }`}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}