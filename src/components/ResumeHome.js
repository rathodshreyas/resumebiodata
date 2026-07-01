import React from 'react';
import './ReferenceHome.css';
import ResumePreview from './ResumePreview';

const features = [
  ['\u270E', 'Simple Form', 'Fill in your personal details, education, skills, and work experience with an easy guided form.'],
  ['\u2606', 'Made for Freshers', 'A clear resume format for students, freshers, and first-time job seekers.'],
  ['\u26A1', 'Quick Editing', 'Review your information and make changes whenever you need before downloading.'],
  ['\u21E9', 'PDF Download', 'Download a clear PDF file that is ready for printing, sharing, and job applications.'],
];

const previewData = {
  fullName: 'Rahul Patil', profileTitle: 'Office Administrator', address: 'Pune, Maharashtra', mobile: '+91 98765 43210', email: 'rahul.patil@example.com',
  careerObjective: 'Motivated graduate seeking an opportunity to apply my skills and contribute to the growth of the organization.',
  qualifications: [{ qualification: 'B.Sc. Computer Science', university: 'Pune University', year: '2024', percentage: '8.2 CGPA' }, { qualification: '12th (HSC)', university: 'Maharashtra Board', year: '2021', percentage: '78.40%' }],
  otherQualifications: ['MS-CIT'], experiences: ['Experience in Office Administration, Data Entry, and Tally.'], fatherName: 'Suresh Patil', motherName: 'Sunita Patil', dob: '2003-05-14', languages: 'Marathi, Hindi, English', gender: 'Male', nationality: 'Indian', maritalStatus: 'Unmarried', customPersonalDetails: [], customSections: [{ title: 'Skills', items: ['MS Office', 'Tally Prime', 'Communication'] }], declaration: 'I hereby declare that the information provided above is true to the best of my knowledge.', place: 'Pune', date: '2026-07-01', photo: null,
};

export default function ResumeHome({ onSelectOption }) {
  const start = () => onSelectOption('resume');
  return <div className="ref-home">
    <section className="ref-hero">
      <div className="ref-hero-copy">
        <span className="ref-badge">FREE ONLINE RESUME MAKER</span>
        <h1>Build a <em>Job-Ready Resume</em> in Just Minutes</h1>
        <p>Create a clean and professional resume online. Add your details, choose a template, and download a high-quality PDF in a few simple steps.</p>
        <div className="ref-buttons"><button className="ref-primary" onClick={start}>Create Resume Free <span aria-hidden="true">&rarr;</span></button><a className="ref-secondary" href="#resume-features">Explore Features</a></div>
        <div className="ref-trust"><span><b aria-hidden="true">&#10003;</b> 100% Free</span><span><b aria-hidden="true">&#10003;</b> Easy Editing</span><span><b aria-hidden="true">&#10003;</b> PDF Download</span><span><b aria-hidden="true">&#10003;</b> Mobile Friendly</span></div>
      </div>
      <div className="ref-resume-card" aria-label="Professional resume preview">
        <div className="ref-card-bar"><i></i><i></i><i></i><span>Professional Resume</span></div>
        <div className="ref-actual-preview" aria-label="Actual resume template preview"><ResumePreview data={previewData} templateId="classic" /></div><span className="ref-ready"><b aria-hidden="true">&#10003;</b> Ready to download</span>
      </div>
    </section>
    <section className="ref-section" id="resume-features" aria-labelledby="ref-features-title">
      <span className="ref-section-label">RESUME MAKER FEATURES</span><h2 id="ref-features-title">Create a Resume Without<br />Any Design Skills</h2><p className="ref-section-lead">Built for students, freshers, and job seekers who want a simple, clean, and professional resume quickly.</p>
      <div className="ref-card-grid">{features.map(([icon,title,text])=><article key={title}><div className="ref-icon">{icon}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className="ref-section ref-steps" aria-labelledby="ref-steps-title"><span className="ref-section-label">HOW IT WORKS</span><h2 id="ref-steps-title">Make Your Resume in<br />3 Easy Steps</h2><div className="ref-step-grid"><article><span>1</span><h3>Enter Details</h3><p>Add your name, contact information, education, skills, and experience.</p></article><article><span>2</span><h3>Choose a Template</h3><p>Select a professional design that presents your information clearly.</p></article><article><span>3</span><h3>Download PDF</h3><p>Save your completed resume and use it for your job applications.</p></article></div></section>
    <section className="ref-cta"><h2>Create Your Professional Resume Today</h2><p>Start with a simple resume maker and download your resume in PDF format within minutes.</p><button onClick={start}>Start Resume Maker <span aria-hidden="true">&rarr;</span></button></section>
  </div>;
}




