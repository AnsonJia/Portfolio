import { useEffect } from 'react';
import CodeTag from '../../components/CodeTag/CodeTag';
import ActionButton from '../../components/ActionButton/ActionButton';
import { Link } from 'react-router-dom';
import './About.scss';

export default function About() {

  useEffect(() => {
    document.body.className = 'enable-scroll fixed-webgl';//allow scroll while keeping the webgl render in place

    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <section className="page">
      <div className="container-xxxl">
        <div className="row mt-0 mt-lg-6">
          <main className="d-flex flex-column">
            <div className="col-12 col-md-8 col-lg-7 col-xl-6 col-xxl-5 mb-0">
              <Link
                className="back-link mouse-md mt-4 mt-lg-0"
                to="/"
              >
                <i className="fa-solid fa-chevron-left fa-2x " />
                Back
              </Link>

              <CodeTag className="mt-5 mb-5 d-none d-lg-block">
                about
              </CodeTag>

              <div className="d-flex flex-row align-items-center mb-5">
                <img
                  src="/headshot.jpg"
                  alt="Hey I'm Anson"
                  className="headshot me-4 me-lg-5"
                />
              </div>

              <h2 className="my-4">
                Hey I'm Anson — An Interactive Software Developer.
              </h2>

              <div>
                <p>
                  I'm a Computer Science graduate and software developer focused on building modern web applications.
                </p>

                <p>
                  I like working across the stack, building interfaces, designing APIs, working with data, and figuring out the problems that inevitably come along the way. 
                  Over the past few years, I've had the opportunity to work on real-world applications using React, Java, Spring Boot, and SQL.
                </p>

                <p>
                  I'm currently continuing my Computer Science journey at NYU and seeing where that takes me.
                </p>
              </div>
            </div>

            <div className='col-12 col-md-8 col-lg-7 col-xl-6 col-xxl-5 mb-0'>
              <hr className="mb-0" />
            </div>

            <div className="col-12 col-md-8 col-lg-7 col-xl-6 col-xxl-5 mb-4 mb-lg-8">
              <h3 className="mt-5 mb-4">Availability</h3>

              <p>
                I'm always open to connecting with people, discussing interesting ideas, and exploring new opportunities.
              </p>

              <p className="mb-5">
                If you have a project in mind, want to collaborate, or simply want to get in touch, feel free to reach out.
              </p>

              <ActionButton
                to="mailto:aj5351@nyu.edu"
                target="_blank"
                className="mb-6"
              >
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                Let's chat
              </ActionButton>
            </div>

          </main>
        </div>
      </div>
    </section>
  );
}