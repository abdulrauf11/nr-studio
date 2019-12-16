import React from "react"
import InstaLogo from "../images/social/instagram.svg"
import FbLogo from "../images/social/facebook.svg"

const Footer = () => (
  <footer className="footer">
    <div className="wrapper">
      <h2>contact</h2>
      <a className="mail" href="mailto:nabiharaufstudio@gmail.com">
        nabiharaufstudio@gmail.com
      </a>
      <div className="social">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/nabiharauf"
        >
          <img src={InstaLogo} alt="social" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/nabiharauf"
        >
          <img src={FbLogo} alt="social" />
        </a>
      </div>
    </div>

    <div className="copyright">
      <span className="left">
        &copy; Copyrights Nabiha Rauf Studio. All Rights Reserved.
      </span>
      <span className="right">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.rauftech.com"
          className="powered-by"
        >
          Website by{"  "}
          <span style={{ color: "var(--green)" }}>Rauf Tech</span>
        </a>
      </span>
    </div>
    <style jsx>{`
      .footer {
        height: 100vh;
        color: var(--white);
        background: var(--darkgreen);
      }
      .wrapper {
        height: 92vh;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      a {
        color: var(--white);
      }
      h2 {
        font-size: 6rem;
        color: var(--green);
        transition: all 0.5s;
      }
      .mail {
        font-size: 1.5rem;
      }
      .social {
        margin-top: 2rem;
      }
      .social img {
        width: 20px;
        margin: 0 1rem;
      }
      .copyright {
        display: flex;
        width: 70%;
        margin: 0 auto;
        font-size: 0.8rem;
      }
      .copyright .left {
        flex: 1;
      }
      .copyright .right {
        flex: 1;
        text-align: right;
      }
      @media only screen and (max-width: 600px) {
        .wrapper {
          height: 90vh;
        }
        h2 {
          font-size: 4rem;
        }
        .mail {
          font-size: 1rem;
        }
        .copyright {
          width: 90%;
          flex-direction: column;
          font-size: 0.7rem;
        }
        .copyright .left {
          text-align: center;
        }
        .copyright .right {
          margin-top: 0.3rem;
          text-align: center;
        }
      }
    `}</style>
  </footer>
)

export default Footer
