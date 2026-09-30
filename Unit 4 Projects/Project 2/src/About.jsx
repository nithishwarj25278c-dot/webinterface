function About() {
  return (
    <div className="page">

      <section>
        <h1>About Me</h1>

        <p>
          I am Nithishwar J, a Computer Science and Engineering
          student specializing in Cybersecurity. I am interested
          in developing secure applications and learning modern
          technologies.
        </p>
      </section>

      <section>
        <h2>My Skills</h2>

        <div className="skills">
          <div>HTML</div>
          <div>CSS</div>
          <div>JavaScript</div>
          <div>React JS</div>
          <div>Java</div>
          <div>Python</div>
          <div>Cybersecurity</div>
          <div>SQL</div>
        </div>
      </section>

      <section>
        <h2>My Projects</h2>

        <div className="projects">

          <div className="project-card">
            <h3>Student Attendance System</h3>
            <p>
              A simple React application for marking student
              attendance and displaying present and absent counts.
            </p>
            <p><b>Technology:</b> React JS</p>
          </div>

          <div className="project-card">
            <h3>Student Profile</h3>
            <p>
              A simple student profile webpage displaying
              personal information, skills and career objective.
            </p>
            <p><b>Technology:</b> HTML, CSS, JavaScript</p>
          </div>

          <div className="project-card">
            <h3>Form Validation</h3>
            <p>
              A registration form with validation for email,
              phone number, password and other user details.
            </p>
            <p><b>Technology:</b> React JS</p>
          </div>

        </div>
      </section>

      <section>
        <h2>Career Objective</h2>

        <p>
          To build a successful career in cybersecurity and
          software development by continuously improving my
          technical skills and creating secure applications.
        </p>
      </section>

    </div>
  );
}

export default About;