import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    // Fetch education data
    fetch('http://localhost:8000/getEdu')
      .then((response) => response.json())
      .then((data) => setEducation(data))
      .catch((error) => console.error('Error fetching education:', error));

    // Fetch experience data
    fetch('http://localhost:8000/getExp')
      .then((response) => response.json())
      .then((data) => setExperience(data))
      .catch((error) => console.error('Error fetching experience:', error));

    // Fetch overview data
    fetch('http://localhost:8000/getOverview')
      .then((response) => response.json())
      .then((data) => setOverview(data))
      .catch((error) => console.error('Error fetching overview:', error));
  }, []);

  return (
    <div className="container">
      {overview && (
        <div className="overview">
          <h1>{overview.name}</h1>
          <p>Cell: {overview.contact.cell}</p>
          <p>Email: {overview.contact.email}</p>
          <h2>Skills</h2>
          <ul>
            {overview.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="education">
        <h1>Education:</h1>
        {education.map((edu, index) => (
          <div key={index}>
            <h5>{edu.degree}</h5>
            <p>{edu.institution}, {edu.year}</p>
          </div>
        ))}
      </div>

      <div className="experience">
        <h1>Experience:</h1>
        {experience.map((exp, index) => (
          <div key={index}>
            <h5>{exp.title}</h5>
            <p>{exp.company}, {exp.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;