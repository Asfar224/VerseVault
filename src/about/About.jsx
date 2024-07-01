import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import './About.css';

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="about-page">
        <div className="about-container">
          <h1>Verse Vault</h1>
          <p>Welcome to our Quran app, your companion for reading and understanding the Holy Quran.</p>
          <p><strong>Features:</strong></p>
          <ul>
            <li>Access to the complete Quran </li>
            <li>Bookmark your favorite verses.</li>
            <li>Search for specific chapters and verses.</li>
            <li>Personalized user experience with authentication.</li>
          </ul>
          <p>Our goal is to provide an easy and accessible way for everyone to engage with the Quran. We hope this app enhances your spiritual journey.</p>
        </div>
      </div>
    </div>
  );
}
