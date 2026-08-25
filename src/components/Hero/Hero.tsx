import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap'; //animation library
import './Hero.scss';
import js from '../../assets/Images/js.svg';
import react from '../../assets/Images/react.svg';


import CodeLine from '../CodeLine/CodeLine';
import CodeTag from '../CodeTag/CodeTag';
import { createProgram, createShader } from '../../shaders/shaderHelpers';

import vertex from '../../shaders/hero/vertex';//vertices positioning
import fragment from '../../shaders/hero/fragment';//pixel/colour rendering

export default function Hero() {
  const location = useLocation();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [size, setSize] = useState({//track window size 
    w: window.innerWidth,
    h: window.innerHeight,
  });

  const mouse = useRef({//track mouse (ref instead of state to prevent re-rendering everything on movement)
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const initial = useRef({ value: 1 });

  const zoom = useRef({//check to see if we are on explore url for diff zoom effect
    value: location.pathname === '/explore' ? 1 : 0
  });

  useEffect(() => {//update size based on browser
    const resize = () => {
      setSize({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };

    const move = (e: MouseEvent) => {//save mouse coordinates 
      mouse.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', move);

    return () => {//cleanup when component is removed
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', move);
    };
  }, []);

  useEffect(() => {
    gsap.to(initial.current, {
      duration: 10,
      value: 0,
      ease: 'expo.out',
    });

    gsap.to(zoom.current, {//zoom animation
      duration: 10,
      value://diff values on diff pages
        location.pathname === '/explore' ||
        location.pathname === '/portfolio'
          ? 1
          : 0,
      ease: 'power1.inOut',//smoothness of animation
    });
  }, [location.pathname]);

  useEffect(() => {//WebGL
    const canvas = canvasRef.current;
    if (!canvas) return;//stop if react hasnt create a canvas yet

    const gl = canvas.getContext('webgl');//get webgl context
    if (!gl) return;

    const vs = createShader(//compile vertex shader
      gl,
      gl.VERTEX_SHADER,
      vertex
    );

    const fs = createShader(//compile fragment shader
      gl,
      gl.FRAGMENT_SHADER,
      fragment
    );

    if (!vs || !fs) return;//check if success

    const program = createProgram(gl, vs, fs);//shader program
    if (!program) return;

    const position = gl.getAttribLocation(//position var in the shader
      program,
      'position'
    );

    const buffer = gl.createBuffer();//gpu buffer to hold vertex data

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);//working buffer

    gl.bufferData(//6 vertices into the buffer (2 triangles forming a full screen rectangle)
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const loc = {//location of vars in shader
      time: gl.getUniformLocation(program, 'iTime'),
      resolution: gl.getUniformLocation(
        program,
        'iResolution'
      ),
      mouse: gl.getUniformLocation(
        program,
        'iMouse'
      ),
      zoom: gl.getUniformLocation(
        program,
        'iZoomOffset'
      ),
      initial: gl.getUniformLocation(
        program,
        'iInitialXOffset'
      ),
      portfolio: gl.getUniformLocation(
        program,
        'iPortfolioScrollPercentage'
      ),
    };

    let frame = 0;
    let time = 0;
    let last = 0;

    let ox = mouse.current.x;//smoth mouse movement for shader
    let oy = mouse.current.y;

    const render = (now: number) => {//rendering
      if (now - last > 16) {//60fps
        last = now;

        gl.viewport(//window render size
          0,
          0,
          size.w,
          size.h
        );

        gl.clearColor(0, 0, 0, 0);//clear canvas
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);//use the program to draw the next

        gl.enableVertexAttribArray(position);//enable position

        gl.bindBuffer(//select the buffer
          gl.ARRAY_BUFFER,
          buffer
        );

        gl.vertexAttribPointer(//tell webgl how to interpret the buffer
          position,
          2,
          gl.FLOAT,
          false,
          0,
          0
        );

        time++;//inc time and send to shader

        gl.uniform1f(
          loc.time,
          time * 0.01
        );

        gl.uniform2f(//send screen dim
          loc.resolution,
          size.w,
          size.h
        );
        //mouse smoothing
        ox += (mouse.current.x - ox) * 0.1;
        oy += (mouse.current.y - oy) * 0.1;

        gl.uniform2f(//send mouse pointer
          loc.mouse,
          ox / size.w,
          oy / size.h
        );

        gl.uniform1f(//send zoom
          loc.zoom,
          zoom.current.value
        );

        gl.uniform1f(//initial animation
          loc.initial,
          initial.current.value
        );

        gl.uniform1f(//port scroll (currently does nothing)
          loc.portfolio,
          0
        );

        gl.drawArrays(//draw triangles
          gl.TRIANGLES,
          0,
          6
        );
      }

      frame = requestAnimationFrame(render);//make another frame
    };

    frame = requestAnimationFrame(render);//starts the first frame

    return () => {//cleanup
      cancelAnimationFrame(frame);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [size.w, size.h]);

  const cls = (//css class
    location.pathname === '/about'
      ? 'hero--about '
      : location.pathname === '/contact'
        ? 'hero--contact '
        : location.pathname.startsWith('/portfolio/')
          ? 'hero--portfolio-single '
          : location.pathname.startsWith('/article/')
            ? 'hero--article-single '
            : ''
  ).trim();

  const special =//is it a special page
    location.pathname === '/about' ||
    location.pathname === '/contact';

  return (//rendering the page
    <section//css tag
      id="hero-element"
      className={cls}
    >
      {location.pathname === '/about' && (//about page rendering content above 
        <>
          <CodeLine
            number="00"
            className="hello-world"
          >
            <span className="code--purple">
              console
            </span>

            <span className="code--white">
              .
            </span>

            <span className="code--yellow">
              log
            </span>

            <span className="code--white">
              (
            </span>

            <span className="code--green">
              "hello world"
            </span>

            <span className="code--white">
              )
            </span>

            <span className="code--orange">
              ;
            </span>
          </CodeLine>

          <CodeLine
            number="01"
            className="import-from-orlando"
          >
            <span className="code--orange">
              const
            </span>

            <span className="code--yellow">
              &nbsp;expertise&nbsp;
            </span>

            <span className="code--white">
              = [...
            </span>

            <span className="code--purple">
              ux
            </span>

            <span className="code--white">
              , ...
            </span>

            <span className="code--purple">
              dev&nbsp;
            </span>

            <span className="code--white">
              ]
            </span>

            <span className="code--orange">
              ;
            </span>
          </CodeLine>
        </>
      )}

      {location.pathname === '/contact' && (//contact page rendering content above
        <>
          <CodeLine
            number="02"
            className="await-fetch-contact"
          >
            <span className="code--blue">
              await
            </span>

            <span className="code--orange">
              &nbsp;fetch
            </span>

            <span className="code--white">
              (
            </span>

            <span className="code--green">
              "/api/contact"
            </span>

            <span className="code--white">
              )
            </span>

            <span className="code--orange">
              ;
            </span>
          </CodeLine>

          <CodeLine
            number="03"
            className="click-discovery"
          >
            <span className="code--orange">
              onClick&nbsp;
            </span>

            <span className="code--yellow">
              {`{`}
            </span>
            <span className="code--white">
              ( 
              <span className="code--yellow">
                e
              </span>) 
              =&gt;&nbsp;
            </span>
            <span className="code--pink">
            {`{`}&nbsp;
            </span>
            <span className="code--yellow">
              new
            </span>

            <span className="code--purple">
              &nbsp;DiscoverySession
            </span>

            <span className="code--white">
              ( 
              <span className="code--yellow">
                e
              </span>
              ) 
            </span>

            <span className="code--pink">
              &nbsp;{`}`}
            </span>
            <span className="code--yellow">
              {`}`}
            </span>
            
            <span className="code--orange">
              ;
            </span>
          </CodeLine>
        </>
      )}

      {special && (//special case rendering
        <div>
          <div className="orange-bar" />
          <div className="purple-bar" />
        </div>
      )}

      {special && (
        <img
          src={js}
          className="js-icon"
          alt="JavaScript Icon"
        />
      )}

      {special && (
        <img
          src={react}
          className="react-icon"
          alt="React Icon"
        />
      )}

      <div
        id="hero-canvas__container"
        className={cls}
      >
        <div
          className={`hero-canvas__sidebar ${cls}`}//side bar
        >
          <CodeTag>WebGL</CodeTag>
        
          <div className="line-numbers">
            {Array.from(//line nums down the side bar
              { length: 50 },
              (_, i) => (
                <span
                  className="line-number__line"
                  key={i}
                >
                  {i < 9 ? '0' : ''}
                  {i + 1}
                </span>
              )
            )}
          </div>
        </div>

        <canvas
          id="hero-canvas"//render the webgl effects
          ref={canvasRef}
          width={size.w}
          height={size.h}
        />
      </div>
    </section>
  );
}