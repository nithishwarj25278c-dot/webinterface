import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <p className="welcome">WELCOME TO MY PORTFOLIO</p>

        <h1>
          Hi, I'm <span>Nithishwar J</span>
        </h1>

        <h2>CSE Cybersecurity Student</h2>

        <p className="intro">
          I am passionate about cybersecurity, programming and
          web development. I enjoy learning new technologies
          and building useful projects.
        </p>

        <Link to="/about" className="explore-btn">
          Explore My Portfolio
        </Link>
      </div>
    </div>
  );
}

export default Home;