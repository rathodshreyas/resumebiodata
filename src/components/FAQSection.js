import React from 'react';

export const resumeBuilderFaqs = [
  { question: 'Is this online resume builder free to use?', answer: 'Yes. You can enter your details, choose a professional template, preview the result, and download your resume as a PDF without paying a fee.' },
  { question: 'Do I need to create an account?', answer: 'No account is required. You can start building your resume immediately and complete the process directly in your browser.' },
  { question: 'Can I download my resume as a PDF?', answer: 'Yes. After selecting a template and checking the preview, use the download button to save a high-quality PDF that is ready to share.' },
  { question: 'Are the resume templates ATS-friendly?', answer: 'The templates use clear headings, readable typography, and familiar resume sections designed to be easy for recruiters and many applicant tracking systems to review.' },
  { question: 'Can freshers and experienced professionals use the builder?', answer: 'Yes. The flexible sections work for students, freshers, and experienced candidates. Add only the education, skills, experience, and personal details relevant to your application.' },
];

function FAQSection({items = resumeBuilderFaqs}) {
  return (
    <section className="seo-faq" aria-labelledby="resume-builder-faq-heading">
      <h2 id="resume-builder-faq-heading">Frequently asked questions</h2>
      <div className="seo-faq-list">
        {items.map(({question, answer}) => (
          <details key={question} className="seo-faq-item">
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
