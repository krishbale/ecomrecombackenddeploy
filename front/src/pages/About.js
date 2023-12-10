import React from "react";
import "../styles/About.css";
import p1 from "../assets/p1.jpg";

import p2 from "../assets/p2.jpg";
import p5 from "../assets/p5.jpg";
const About = () => (
  <>
    <div className="about-section">
      <h1>Happy Shopping</h1>

      <p>
        We provide our services and also provide the recommendation to our
        customer.
      </p>
    </div>

    <h2 style={{ textAlign: "center" }}>Our Team</h2>
    <div className="row">
      <div className="column">
        <div className="card">
          <img src={p5} alt="Jane" style={{ width: "100%" }} />
          <div className="item">
            <h2>Jane Doe</h2>
            <p className="title">Project Members</p>
            <p> Designers</p>
            <p>jane@example.com</p>
            <p>
              <button className="button">Contact</button>
            </p>
          </div>
        </div>
      </div>

      <div className="column">
        <div className="card">
          <img src={p2} alt="Mike" style={{ width: "100%" }} />
          <div className="container">
            <h2>Mike Ross</h2>
            <p className="title">Project Members</p>
            <p>Develpers</p>
            <p>mike@example.com</p>
            <p>
              <button className="button">Contact</button>
            </p>
          </div>
        </div>
      </div>

      <div className="column">
        <div className="card">
          <img src={p1} alt="John" style={{ width: "100%" }} />
          <div className="container">
            <h2>John Doe</h2>
            <p className="title">Project Member</p>
            <p> Manager</p>
            <p>john@example.com</p>
            <p>
              <button className="button">Contact</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default About;
