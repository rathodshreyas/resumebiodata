import React from 'react';
import './ModernHomePage.css';

const features = [
  ['01', 'ATS-friendly layouts', 'Clean, readable templates designed to keep your experience easy to scan.'],
  ['02', 'Built in minutes', 'A guided editor keeps every section simple, focused, and quick to complete.'],
  ['03', 'Live preview', 'See every change as you make it and switch templates before you download.'],
  ['04', 'PDF ready', 'Export a polished, high-quality PDF that is ready to share with recruiters.'],
];

function ResumeVisual() {
  return <div className="visual-stage" aria-label="Resume builder interface preview">
    <div className="visual-toolbar"><span><i></i><i></i><i></i></span><small>Live preview</small><b>100%</b></div>
    <div className="visual-canvas">
      <div className="visual-side-panel"><span className="visual-panel-label">Sections</span>{['Personal info','Experience','Education','Skills'].map((item,index)=><div className={`visual-field ${index===0?'active':''}`} key={item}><i>0{index+1}</i><span>{item}</span></div>)}<div className="visual-progress"><span></span></div><small>Profile 80% complete</small></div>
      <div className="resume-sheet" aria-hidden="true"><div className="sheet-top"><div className="sheet-avatar">AR</div><div><strong>ARJUN RAO</strong><span>PRODUCT DESIGNER</span></div></div><div className="sheet-contact"><span>arjun@example.com</span><span>+91 98765 43210</span></div><div className="sheet-rule"></div><div className="sheet-section-title">PROFILE</div><p className="sheet-copy">Creative professional focused on thoughtful, useful digital experiences.</p><div className="sheet-columns"><div><div className="sheet-section-title">EXPERIENCE</div><b>Senior Product Designer</b><small>Studio North · 2022 — Present</small><p className="sheet-lines"></p><p className="sheet-lines short"></p><b>Visual Designer</b><small>Creative Co. · 2020 — 2022</small><p className="sheet-lines"></p></div><div><div className="sheet-section-title">SKILLS</div>{['Strategy','Research','Design','Systems'].map(skill=><span className="skill-pill" key={skill}>{skill}</span>)}<div className="sheet-section-title education-title">EDUCATION</div><b>B.Des, Communication</b><small>Design Institute · 2020</small></div></div></div>
    </div>
    <div className="floating-note note-top"><span>✓</span><div><b>ATS ready</b><small>Optimized format</small></div></div><div className="floating-note note-bottom"><span>↓</span><div><b>PDF exported</b><small>Your resume is ready</small></div></div>
  </div>;
}

export default function ModernLanding({onSelectOption}) {
  const start=()=>onSelectOption('resume');
  return <div className="homepage-shell modern-home">
    <section className="hero-new" aria-labelledby="home-title"><div className="hero-glow glow-one"></div><div className="hero-glow glow-two"></div><div className="hero-copy"><div className="eyebrow"><span></span> Free online resume builder</div><h1 id="home-title">Create Your Professional Resume &amp; Biodata in <em>5 Minutes</em></h1><p>Build a job-ready resume with a guided editor and clean, professional templates.<br className="desktop-break" /> Preview every detail instantly, then download your polished PDF.</p><div className="hero-actions"><button className="primary-action" onClick={start}>Create my resume <span>→</span></button><a className="secondary-action" href="#how-it-works">See how it works <span>↓</span></a></div><div className="trust-row"><div className="trust-faces"><i>AK</i><i>SM</i><i>RP</i><i>+</i></div><div><strong>Simple. Fast. Free.</strong><span>No sign-up required to get started</span></div></div></div><ResumeVisual /></section>
    <section className="value-strip" aria-label="Product highlights"><span>ATS-friendly</span><i></i><span>Professional templates</span><i></i><span>Instant preview</span><i></i><span>PDF download</span></section>
    <section className="features-new" id="how-it-works" aria-labelledby="features-heading"><div className="section-heading"><div><span className="section-kicker">Everything you need</span><h2 id="features-heading">A better resume, without the busywork.</h2></div><p>We stripped away the clutter so you can focus on what matters: presenting your experience clearly and professionally.</p></div><div className="feature-cards">{features.map(([number,title,copy])=><article className="feature-card-new" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><i>↗</i></article>)}</div></section>
    <section className="process-section" aria-labelledby="process-title"><div className="process-copy"><span className="section-kicker">How it works</span><h2 id="process-title">From blank page to job-ready.</h2><p>Three focused steps. No complicated formatting, no design skills needed.</p></div><ol className="process-list"><li><span>1</span><div><h3>Add your details</h3><p>Follow simple prompts to enter your experience, education, skills, and personal information.</p></div></li><li><span>2</span><div><h3>Choose your style</h3><p>Pick a professional template and check your content in the live preview.</p></div></li><li><span>3</span><div><h3>Download and apply</h3><p>Export a crisp PDF, ready to send with your next job application.</p></div></li></ol></section>
    <section className="final-cta"><span>YOUR NEXT OPPORTUNITY STARTS HERE</span><h2>Make a resume that<br />opens doors.</h2><button onClick={start}>Build my resume — it’s free <b>→</b></button><p>No account required · Download as PDF · Edit anytime</p></section>
  </div>;
}
