import React, { useState, useEffect } from 'react';

const typingWords = ['Modern', 'Professional', 'Impressive'];
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDelay = 1200;
const templateImages = [
  '/images/resume-sample-1.png',
  '/images/resume-sample-2.png',
  '/images/resume-sample-3.png',
];

function HomePage({ onSelectOption }) {
  const [displayWord, setDisplayWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentTemplate, setCurrentTemplate] = useState(0);

  useEffect(() => {
    const currentWord = typingWords[wordIndex % typingWords.length];
    let timeoutId;

    if (!isDeleting && displayWord === currentWord) {
      timeoutId = setTimeout(() => setIsDeleting(true), pauseDelay);
    } else if (isDeleting && displayWord === '') {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }, typingSpeed);
    } else {
      timeoutId = setTimeout(() => {
        const nextText = isDeleting
          ? currentWord.substring(0, displayWord.length - 1)
          : currentWord.substring(0, displayWord.length + 1);
        setDisplayWord(nextText);
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeoutId);
  }, [displayWord, isDeleting, wordIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTemplate((prev) => (prev + 1) % templateImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-shell">
      <section className="hero hero-landing">
        <div className="hero-left">
          <div className="hero-kicker">ResumeBiodata.in</div>
          <h1>Build Your <span className="heading-blue">Professional</span> Resume in Minutes</h1>
          <h2 className="hero-subtyped" aria-label="Modern, professional, and impressive resumes">
            <span aria-hidden="true" className="hero-typeword">{displayWord}</span><span aria-hidden="true" className="typewriter-cursor">|</span>
          </h2>
          <p>Create ATS-friendly, professional resumes in minutes. Stand out. Get noticed. Land your dream job.</p>
          <div className="hero-buttons">
            <button className="btn-primary hero-cta" onClick={() => onSelectOption('resume')}>Create Resume Now</button>

          </div>
          <div className="hero-proof-row" aria-label="Resume builder highlights">
            <div>
              <strong>{templateImages.length}</strong>
              <span>Templates</span>
            </div>
            <div>
              <strong>5 min</strong>
              <span>Quick build</span>
            </div>
            <div>
              <strong>PDF</strong>
              <span>Download</span>
            </div>
          </div>
          <div className="hero-checklist">
            <span>ATS friendly format</span>
            <span>Professional CV support</span>
            <span>Easy edit and instant preview</span>
          </div>
        </div>

        <div className="hero-right" id="template-preview">
          <div className="hero-preview-label">Live template preview</div>
          <div className="resume-file-collection">
            <img
              src={templateImages[currentTemplate]}
              alt={`Professional resume template preview ${currentTemplate + 1}`}
              className="resume-image-display"
              width="920"
              height="1300"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <div className="template-dots" aria-hidden="true">
            {templateImages.map((_, index) => (
              <span
                key={index}
                className={index === currentTemplate ? 'active' : ''}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="features-section" id="pdf-download">
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">OK</div>
            <h3>ATS Friendly</h3>
            <p>Optimized for ATS scanning systems</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">TP</div>
            <h3>Professional Templates</h3>
            <p>Choose from the available clean resume formats</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">EZ</div>
            <h3>Easy to Use</h3>
            <p>Build your resume in minutes</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">PDF</div>
            <h3>Download as PDF</h3>
            <p>Export a clear, shareable PDF</p>
          </div>
        </div>
      </section>

      <section className="home-guide-section" aria-labelledby="resume-builder-guide">
        <div className="home-guide-inner">
          <p className="home-guide-kicker">A practical resume workflow</p>
          <h2 id="resume-builder-guide">Create a resume that is clear, accurate, and easy to review</h2>
          <p>ResumeBiodata.in helps you organize the information recruiters commonly expect without forcing you into a complicated editor. Your entries are turned into a structured preview that you can check before downloading.</p>
          <div className="home-guide-grid">
            <article>
              <h3>Write for the role</h3>
              <p>Use a relevant profile title, describe experience honestly, and include skills that match the work you can perform. Specific, concise statements are more useful than generic claims.</p>
            </article>
            <article>
              <h3>Review every detail</h3>
              <p>Confirm your phone number, email, dates, education, spelling, and page breaks. Remove personal information that an employer has not requested.</p>
            </article>
            <article>
              <h3>Download with confidence</h3>
              <p>Compare the available layouts, choose the format that suits your content, and open the downloaded PDF once before sending it with an application.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;



