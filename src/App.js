import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Muhammad Ibtehaj Ali</h1>
        <p>Computer Science Student</p>
        <div className="contact-info">
          <p><a href="mailto:ibtehaj572@gmail.com">ibtehaj572@gmail.com</a></p>
          <p>+92-302-5410301</p>
          <p><a href="https://linkedin.com/in/ibtehajali" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          <p><a href="https://github.com/ibtehaj-3" target="_blank" rel="noopener noreferrer">GitHub</a></p>
        </div>
      </header>
      <main>
        <section className="App-section">
          <h2>Profile</h2>
          <p>
            Motivated professional seeking hands-on experience in software development, effective communication, and creative problem-solving. I aspire to stay updated on industry trends, contribute to open-source projects, and enhance my leadership skills. Committed to continuous learning and adding value to collaborative team environments.
          </p>
        </section>
        <section className="App-section">
          <h2>Work Experience</h2>
          <h3>.NET Developer Intern | Air University, Islamabad</h3>
          <p>June 2023 - Present</p>
          <p>Immersed myself in the dynamic world of ASP.NET development, acquiring hands-on experience in API integration, frontend development with Blazor, and database management using Microsoft SQL Server.</p>
        </section>
        <section className="App-section">
          <h2>Education History</h2>
          <h3>BS Computer Science | Air University, Islamabad</h3>
          <p>Sept 2021 - Present</p>
          <h3>F.Sc Pre- Engineering | Fauji Foundation College, Pindigheb</h3>
          <p>Class of 2019</p>
        </section>
        <section className="App-section">
          <h2>Skills & Specialization</h2>
          <ul>
            <li>C++, C#</li>
            <li>HTML / CSS / Bootstrap</li>
            <li>Microsoft SQL Server</li>
            <li>ASP.NET Core</li>
            <li>Blazor Server/ Wasm</li>
            <li>MVC/ 3-Tier Architecture</li>
            <li>Object Oriented Programming / DSA</li>
            <li>REST APIs / Microservices</li>
            <li>Git & GitHub</li>
          </ul>
        </section>
        <section className="App-section">
          <h2>Projects</h2>
          <h3>Dodge Em | C++</h3>
          <p>A 2D racing game written in C++ using the GLUT library.</p>
          <h3>Cyber Threat Library Using Treaps Data Structure | C++</h3>
          <p>Implemented concepts of Treap data structure, a hybrid of a binary search tree and a heap.</p>
          <h3>Supermarket Billing Management System | C++</h3>
          <p>Developed console-based system & implemented concepts of OOP.</p>
          <h3>Mario Run Clone | Assembly Language</h3>
          <p>Mario Run Clone with 3 different levels.</p>
          <h3>UniFiesta | .NetCore7</h3>
          <p>Created a full stack web application to help university students keep track of past and upcoming university events.</p>
        </section>
      </main>
      <footer className="App-footer">
        <p>© 2024 Muhammad Ibtehaj Ali. All rights reserved.</p>
      </footer>
      <style jsx>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #f0f2f5;
        }

        .App {
          text-align: center;
          color: #333;
        }

        .App-header {
          background-color: #282c34;
          padding: 20px;
          color: white;
        }

        .App-header h1 {
          margin: 0;
          font-size: 2.5em;
        }

        .App-header p {
          margin: 10px 0;
          font-size: 1.2em;
        }

        .contact-info a {
          color: #61dafb;
          text-decoration: none;
        }

        .contact-info a:hover {
          text-decoration: underline;
        }

        main {
          padding: 20px;
        }

        .App-section {
          margin: 40px auto;
          padding: 20px;
          max-width: 800px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          text-align: left;
        }

        .App-section h2 {
          border-bottom: 2px solid #61dafb;
          padding-bottom: 10px;
          margin-bottom: 20px;
          font-size: 1.5em;
        }

        .App-section ul {
          list-style-type: none;
          padding: 0;
        }

        .App-section li {
          background: #f9f9f9;
          margin: 10px 0;
          padding: 10px;
          border-radius: 4px;
        }

        .App-footer {
          background: #282c34;
          color: white;
          padding: 20px;
          margin-top: 40px;
        }

        .App-footer p {
          margin: 0;
        }
      `}</style>
    </div>
  );
}

export default App;
