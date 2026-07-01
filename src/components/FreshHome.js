import React from 'react';
import './FreshHome.css';

const benefits = [
  { number: '01', title: 'Easy to create', text: 'Simple guided sections help you complete your resume without confusing tools.' },
  { number: '02', title: 'Beautiful templates', text: 'Choose a clean professional layout that presents your information clearly.' },
  { number: '03', title: 'Edit anytime', text: 'Review your details, make quick changes, and choose a different style whenever you want.' },
  { number: '04', title: 'Download as PDF', text: 'Save a polished PDF that is ready to share with employers and opportunities.' },
];

export default function FreshHome({ onSelectOption }) {
  const startBuilder = () => onSelectOption('resume');

  return (
    <div className="fresh-home">
      <section className="fresh-hero" aria-labelledby="fresh-home-title">
        <div className="fresh-orb fresh-orb-one" aria-hidden="true"></div>
        <div className="fresh-orb fresh-orb-two" aria-hidden="true"></div>
        <div className="fresh-hero-inner">
          <div className="fresh-badge"><span>âœ¦</span> Free online resume maker</div>
          <h1 id="fresh-home-title">Create a resume that feels <em>like you.</em></h1>
          <p>Turn your details into a clean, professional resume in just a few simple steps. No design experience needed.</p>
          <div className="fresh-actions">
            <button onClick={startBuilder}>Create your resume <span>â†—</span></button>
            <a href="#fresh-process">Explore how it works</a>
          </div>
          <div className="fresh-trust">
            <span><b>âœ“</b> Free to start</span>
            <span><b>âœ“</b> No sign-up</span>
            <span><b>âœ“</b> PDF download</span>
          </div>
        </div>
        <div className="fresh-hero-word" aria-hidden="true">RESUME</div>
      </section>

      <section className="fresh-intro" aria-labelledby="fresh-intro-title">
        <div className="fresh-section-tag">Made for your next step</div>
        <div className="fresh-intro-grid">
          <h2 id="fresh-intro-title">Your story.<br />Clearly presented.</h2>
          <div><p>Creating a resume should not feel complicated. Add your information, select a design, and download a document you will be confident to share.</p><button onClick={startBuilder}>Start building <span>â†’</span></button></div>
        </div>
      </section>

      <section className="fresh-benefits" aria-labelledby="fresh-benefits-title">
        <div className="fresh-benefits-head"><span>Why ResumeBiodata.in</span><h2 id="fresh-benefits-title">Everything you need.<br />Nothing you donâ€™t.</h2></div>
        <div className="fresh-benefit-grid">
          {benefits.map((benefit) => (
            <article key={benefit.number}>
              <span>{benefit.number}</span>
              <div className="fresh-card-icon" aria-hidden="true">{benefit.number === '04' ? 'â†“' : 'â—‡'}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="fresh-process" id="fresh-process" aria-labelledby="fresh-process-title">
        <div className="fresh-process-copy"><span>Three simple steps</span><h2 id="fresh-process-title">Ready before your coffee gets cold.</h2><p>A focused process that takes you from an empty page to a professional document.</p></div>
        <ol>
          <li><b>01</b><div><h3>Fill in your details</h3><p>Add your profile, education, experience, skills, and the information you want to include.</p></div></li>
          <li><b>02</b><div><h3>Pick your template</h3><p>Choose a clean design that matches your personality and career.</p></div></li>
          <li><b>03</b><div><h3>Download your PDF</h3><p>Review everything once, then save and share your finished document.</p></div></li>
        </ol>
      </section>

      <section className="fresh-cta">
        <div><span>LETâ€™S GET STARTED</span><h2>Your next chapter deserves a great introduction.</h2></div>
        <button onClick={startBuilder}>Create resume now <span>â†’</span></button>
      </section>
    </div>
  );
}

