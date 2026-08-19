import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import './DefaultLayout.scss';

import NavMenu from '../components/NavMenu/NavMenu';
import BottomBar from '../components/BottomBar/BottomBar';

export default function DefaultLayout({
  children,//only accepts one prop (or {list, of, props}) placed inside <DefaultLayout>
}: {
  children: ReactNode;//must be a type of reactnode (generic anything)
}) {
  const location = useLocation();//url info
  const [loaded, setLoaded] = useState(false);//initialize loaded state to false

  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true));//set to loaded after the component loads
  }, []);//run only once on mount

  const showBottom = location.pathname === '/' || location.pathname === '/explore';//display bottom bar if homepage or explore page

  const showNav = !['/about', '/contact'].includes(location.pathname);//show nav if not about or contact

  return (
    <main> 
      {showNav && <NavMenu />}

      {children} {/* display the prop page content inside <DefaultLayout>*/}

      {showBottom && (
        <div id="bottom-bar" className="container-fluid">
          <BottomBar />
        </div>
      )}

      <div
        className={`preloader ${
          loaded ? 'preloader--loaded' : '' //conditional rendering based on if page is loaded
        }`}
      >
        <div className="preloader__overlay" />
      </div>
    </main>
  );
}