import { useEffect } from 'react';
import CodeTag from '../../components/CodeTag/CodeTag';
import ActionButton from '../../components/ActionButton/ActionButton';
import { Link } from 'react-router-dom';
import './Contact.scss';


export default function Contact() {
  useEffect(() => {
    document.body.className = 'enable-scroll fixed-webgl';//allow scroll while keeping the webgl render in place

    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <section className="page">
      <div className="container-xxxl">
        <div className="row mt-0 mt-lg-6 justify-content-end">
          <div className="col-12 col-md-8 col-lg-7 col-xl-5 col-xxl-4 mb-4">
            <Link
              className="back-link mouse-md mt-4 mt-lg-0"
              to="/"
            >
              <i className="fa-solid fa-chevron-left fa-2x" />
              Back
            </Link>

            <CodeTag className="mt-5 mb-3">contact</CodeTag>

            <h1 className="mb-4">Let's Chat</h1>

            <p className="mb-4">
              Whether you are looking to build something interesting or simply want to connect, I'd love to hear from you. 
              Feel free to reach out and start a conversation.
            </p>

            <ActionButton
              to="mailto:aj5351@nyu.edu"
              target="_blank"
              className="mb-6"
            >
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
              Let's chat
            </ActionButton>

            <hr className="mb-6" />

            <h3 className="mb-3">Alternate contact options</h3>

            <p className="mb-4">
              You can find me on{' '}
              <a
                href="https://www.linkedin.com/in/anson-jia-043135342/"
                target="_blank"
                className="article__followlink mouse-sm"
                style={{ color: '#7A4FEE' }}
              >
                LinkedIn @anson-jia-043135342
              </a>{' '}
              <br/>
              or call me at{' '}
              <a
                href="tel:+13322720401"
                className="mouse-sm"
                style={{ color: '#7A4FEE' }}
              >
                +1 (332) 272-0401
              </a>
              .
            </p>
          </div>

          <div className="col-1 d-none d-xl-block" />
        </div>
      </div>
    </section>
  );
}