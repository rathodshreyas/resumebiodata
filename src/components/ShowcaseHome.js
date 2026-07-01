import React from 'react';
import './ShowcaseHome.css';

const benefits = [
  ['01', 'Professional & Clean Templates'],
  ['02', 'Easy to Edit & Customize'],
  ['03', 'Instant PDF Download'],
  ['04', '100% Free to Use'],
];

export default function ShowcaseHome({ onSelectOption }) {
  const start = () => onSelectOption('resume');
  return <div className="showcase-home">
    <section className="showcase-hero">
      <div className="showcase-copy">
        <span className="showcase-badge">100% FREE ONLINE RESUME MAKER</span>
        <h1>Create Professional <em>Resume</em> in Minutes</h1>
        <p>Choose a template, fill in your details, preview and download your resume as PDF instantly.</p>
        <ul>{benefits.map(([number,text])=><li key={number}><span>{number}</span><b>{text}</b></li>)}</ul>
        <div className="showcase-actions"><button onClick={start}>Create My Resume <span>&rarr;</span></button><a href="#templates"><span>&#9638;</span> View Templates</a></div>
      </div>

      <div className="showcase-templates" id="templates">
        <div className="showcase-title"><i></i><h2>Choose from Beautiful Resume Templates</h2><i></i></div>
        <div className="template-showcase-grid">
          {[["classic","Classic","/images/classic.jpg"],["elegant","Elegant","/images/Elegant.webp"],["minimal","Minimal","/images/minimal.webp"]].map(([id,label,image])=><article key={id} className={`showcase-template ${id}`}><div className="template-viewport"><img src={image} alt={`${label} resume template preview`} width="794" height="1123" loading={id === "classic" ? "eager" : "lazy"} decoding="async" /></div><span>{label}</span></article>)}
        </div>
      </div>
    </section>

    <section className="showcase-stats" aria-label="Resume builder highlights">
      <div><span className="stat-icon blue">&#9823;</span><p><b>Simple</b><small>Resume Builder</small></p></div>
      <div><span className="stat-icon green">&#10003;</span><p><b>Trusted</b><small>By Job Seekers</small></p></div>
      <div><span className="stat-icon purple">&#8659;</span><p><b>Instant</b><small>PDF Download</small></p></div>
      <div><span className="stat-icon orange">&#9734;</span><p><b>Professional</b><small>Templates</small></p></div>
      <button onClick={start}><span>&#10148;</span><b>Ready to build your perfect resume?</b><small>Get Started Now</small></button>
    </section>
  </div>;
}



