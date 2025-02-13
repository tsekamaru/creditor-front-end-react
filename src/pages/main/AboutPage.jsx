import TechCard from "../../components/TechCard";
import bootstrapLogo from "../../assets/bootstrap-5-1.svg";
import CssLogo from "../../assets/css-3-svgrepo-com.svg";
import FireBaseLogo from "../../assets/firebase-svgrepo-com.svg";
import GitLogo from "../../assets/git-svgrepo-com.svg";
import GitHubLogo from "../../assets/github-color-svgrepo-com.svg";
import HtmlLogo from "../../assets/html-5-svgrepo-com.svg";
import JsLogo from "../../assets/js-svgrepo-com.svg";
import NodeJsLogo from "../../assets/node-js-svgrepo-com.svg";
import NpmLogo from "../../assets/npm-svgrepo-com.svg";
import ReactLogo from "../../assets/react.svg";
import ViteLogo from "../../assets/vite-svgrepo-com.svg";
import VsCodeLogo from "../../assets/vscode-svgrepo-com.svg";
import GoogleMapComponent from "../../components/googleMapComponent";

function AboutPage() {
  return (
    <div className="container mt-2 mb-5">
      <h1>About Me</h1>
      <p>
        Hi, I’m Tseka—a junior developer on a mission to master the back-end while crafting my way
        to full-stack development. Currently, I’m sharpening my skills at Ironhack, a bootcamp
        that’s pushing me to new heights. My goal? To become a back-end-oriented full-stack
        developer, ready to take on the challenges of a solo developer in a startup environment.
        I’ve always been a lone wolf, and this journey is no different—just me, my code, and the
        drive to build something great. Thanks for stopping by my site. Stick around—things are just
        getting started. 🚀
      </p>
      <h4 className="mb-3">Find me here</h4>
      <p className="fs-3">
        <a href="https://linkedin.com">
          <i className="bi bi-linkedin mx-5"></i>
        </a>
        <a href="https://github.com">
          <i className="bi bi-github"></i>
        </a>
      </p>
      <h4 className="mb-3">Used Technologies</h4>
      <div className="row row-cols-md-6 g-4">
        <TechCard title="HTML" logo={HtmlLogo} />
        <TechCard title="CSS" logo={CssLogo} />
        <TechCard title="JavaScript" logo={JsLogo} />
        <TechCard title="React" logo={ReactLogo} />
        <TechCard title="Vite" logo={ViteLogo} />
        <TechCard title="Bootstrap" logo={bootstrapLogo} />
        <TechCard title="NPM" logo={NpmLogo} />
        <TechCard title="Git" logo={GitLogo} />
        <TechCard title="GitHub" logo={GitHubLogo} />
        <TechCard title="FireBase" logo={FireBaseLogo} />
        <TechCard title="NodeJS" logo={NodeJsLogo} />
        <TechCard title="VSCode" logo={VsCodeLogo} />
      </div>
      <div className="mt-5">
        <h4 className="mb-3">My Location</h4>
        <GoogleMapComponent />
      </div>
    </div>
  );
}

export default AboutPage;
