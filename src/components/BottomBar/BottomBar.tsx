//import Icon from './Icon';
import './BottomBar.scss';

export default function BottomBar() {
  return (
    <div className="bottom-bar row pb-2 pb-md-3 align-items-end d-flex justify-content-between">  {/*bottom bar container bootstrap padding*/}
      <div className="col-auto d-flex align-items-center"> {/*bottom bar left side*/}
        {/*<Icon size={45} />*/}

        <h1 className="bottom-navigation__title ms-4">
          <span>Anson Jia</span>
          <br />
          <span>Interactive Software Developer</span>
        </h1>
      </div>

      <div className="col-auto mb-3 d-flex align-items-center"> {/*bottom bar right side*/}
      <a
        href="mailto:aj5351@nyu.edu"
        className="me-4 text-decoration-none"
      >
        <i className="fa-solid fa-envelope fa-xl email-icon mouse-sm d-none d-xl-inline" />
      </a>
        {/*<a
          //href=""
          target="_blank"
          className="me-4 text-decoration-none"
        >
          <i className="fa-brands fa-x-twitter fa-xl twitter-icon mouse-sm d-none d-xl-inline" />
        </a>*/}

        <a
          href="https://github.com/AnsonJia"
          target="_blank"
          className="me-4 text-decoration-none"
        >
          <i className="fa-brands fa-github fa-xl github-icon mouse-sm d-none d-xl-inline" />
        </a>

        <a
          href="https://www.linkedin.com/in/anson-jia-043135342"
          target="_blank"
          className="me-5 text-decoration-none"
        >
          <i className="fa-brands fa-linkedin fa-xl linkedin-icon mouse-sm d-none d-xl-inline" />
        </a>
        

        <div className="status-indicator"> 
          <span className="status-indicator__light" /> 
          Available to work 
        </div>
      </div>
    </div>
  );
}