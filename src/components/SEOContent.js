import React from 'react';
import FAQSection from './FAQSection';
import './SEOContent.css';

const resourceLinks = [
  ['Blog', '/blog'], ['About', '/about'], ['Contact', '/contact'],
  ['Resume Templates', '/blog?search=resume%20templates'],
  ['Career Objective', '/blog?search=career%20objective'],
  ['Skills for Resume', '/blog?search=skills%20for%20resume'],
  ['Work Experience', '/blog?search=work%20experience'],
];

function SEOContent() {
  return (
    <section className="resume-seo-card" aria-labelledby="resume-seo-heading">
      <div className="resume-seo-copy">
        <p className="resume-seo-eyebrow">Free online resume maker</p>
        <h2 id="resume-seo-heading">Free Resume Builder Online: Create a Professional Resume in Minutes</h2>
        <p>A strong resume should make your experience easy to understand at a glance. Our free resume builder helps you turn your education, skills, achievements, and work history into a clear professional document without complicated formatting. Enter your information once, choose a design that suits your role, review the live preview, and download a polished PDF in minutes. There is no account to create, so you can focus on presenting your qualifications with confidence.</p>
        <h3>Build a clear, recruiter-friendly resume</h3>
        <p>Each template provides familiar sections and readable typography to help recruiters find important details quickly. The guided form keeps contact information, qualifications, career objectives, skills, and experience organised while still giving you room to tailor the content. Whether you are a student preparing a first application, a fresher seeking an entry-level role, or an experienced professional planning a career move, you can include the sections that matter for your situation.</p>
        <h3>Choose a template, preview, and download</h3>
        <p>Begin by adding accurate, role-relevant information. Use concise phrases, measurable achievements where possible, and keywords found naturally in the job description. Next, compare the available resume templates and select the layout that best matches your industry and experience. The preview lets you check spelling, spacing, dates, and contact details before creating the final PDF. Your downloaded file is convenient to email, upload to job portals, or keep for future applications.</p>
        <h3>Make every application more focused</h3>
        <p>For better results, adjust your resume for each vacancy instead of sending the same version everywhere. Put the most relevant skills and recent experience first, remove details that do not support the role, and keep statements specific. Explore our practical resources on writing an effective career objective, choosing resume skills, and describing work experience. A few thoughtful edits can make your resume easier to scan and give employers a clearer reason to continue the conversation.</p>
        <nav className="resume-seo-links" aria-label="Resume and career resources">
          {resourceLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
        </nav>
      </div>
      <FAQSection />
    </section>
  );
}

export default SEOContent;
