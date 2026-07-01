import React, { useState, useRef } from 'react';
import HomePage from './components/HomePage';
import ResumeForm from './components/ResumeForm';
import TemplateSelector from './components/TemplateSelector';
import ResumePreview from './components/ResumePreview';
import SEOContent from './components/SEOContent';
import ToolSchema from './components/ToolSchema';
import Seo from './components/blog/Seo';
import {CONTACT_EMAIL, MAIN_SEO_KEYWORDS, PAGE_PATHS, PAGE_SEO, SITE_URL} from './lib/seoConfig';
import './App.css';

const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

const contactEmail = CONTACT_EMAIL;
const siteUrl = SITE_URL;
const pagePaths = PAGE_PATHS;
const pageSeo = PAGE_SEO;
const pathPages = Object.fromEntries(Object.entries(pagePaths).map(([page, path]) => [path, page]));

const faqItems = [
  {
    question: 'Is ResumeBiodata.in free to use?',
    answer: 'Yes. You can create, preview, and download a professional resume PDF for free.',
  },
  {
    question: 'Can I make an ATS-friendly resume online?',
    answer: 'Yes. The builder uses clean sections and readable templates that are suitable for many applicant tracking systems.',
  },
  {
    question: 'Can I download my resume as a PDF?',
    answer: 'Yes. After choosing a template, you can preview your resume and download it as a high-quality PDF.',
  },
  {
    question: 'Do I need an account to create a resume?',
    answer: 'No. The resume builder runs in your browser and does not require an account.',
  },
];

const getPageTitle = (activePage, step, seo) => {
  if (activePage === 'builder' && step === 2) return 'Choose a Resume Template | ResumeBiodata.in';
  if (activePage === 'builder' && step === 3) return 'Preview and Download Resume PDF | ResumeBiodata.in';
  return seo.title;
};

const buildSiteSchemas = ({activePage, title, description, canonicalPath, canonicalUrl}) => {
  const breadcrumbName = activePage === 'home' ? 'Home' : title.replace(' | ResumeBiodata.in', '');
  const schemas = activePage === 'builder' ? [] : [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Home', item: siteUrl},
        ...(canonicalPath === '/' ? [] : [{'@type': 'ListItem', position: 2, name: breadcrumbName, item: canonicalUrl}]),
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'ResumeBiodata.in Resume Builder',
      url: `${siteUrl}/resume-builder`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description,
      offers: {'@type': 'Offer', price: '0', priceCurrency: 'INR'},
    },
  ];

  if (activePage === 'home') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {'@type': 'Answer', text: item.answer},
      })),
    });
  }

  return schemas;
};

const normalizePath = (path) => {
  const cleanPath = (path || '/').split('?')[0].split('#')[0].replace(/\/+$/, '');
  return cleanPath || '/';
};

const getPageFromPath = () => {
  const path = normalizePath(window.location.pathname);
  if (/^\/blog\/[^/]+$/.test(path)) return 'blog-post';
  return pathPages[path] || 'not-found';
};

const getBlogSlugFromPath = () => {
  const slug = normalizePath(window.location.pathname).split('/')[2] || '';
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};


const defaultData = {
  fullName: 'Rahul Patil',
  profileTitle: '',
  address: 'Kothrud, Pune, Maharashtra - 411038',
  mobile: '+91 98765 43210',
  email: 'rahul.patil@example.com',
  careerObjective: 'Motivated and detail-oriented graduate seeking an opportunity to apply my technical skills, learn new technologies, and contribute to the growth of the organization.',
  qualifications: [
    { qualification: '10th (SSC)', university: 'Maharashtra State Board', year: '2019', percentage: '84.60%' },
    { qualification: '12th (HSC)', university: 'Maharashtra State Board', year: '2021', percentage: '78.40%' },
    { qualification: 'B.Sc. Computer Science', university: 'Savitribai Phule Pune University', year: '2024', percentage: '8.2 CGPA' },
  ],
  otherQualifications: ['MS-CIT'],
  experiences: ['2 years of experience in Office Admin, Data Entry, and Tally.'],
  fatherName: 'Suresh Patil',
  motherName: 'Sunita Patil',
  dob: '2003-05-14',
  languages: 'Marathi, Hindi, English',
  gender: 'Male',
  nationality: 'Indian',
  maritalStatus: 'Unmarried',
  customPersonalDetails: [{ key: 'Hobbies', value: 'Reading, Cricket, Travelling' }],
  customSections: [
    {
      title: 'Skills',
      items: [
        'MS Office Suite: MS Excel, MS Word, MS PowerPoint, Outlook',
        'Accounting: Tally Prime / ERP 9 (Invoicing, GST, Bookkeeping)',
        'Typing Skills: English Typing (40 WPM), Marathi Typing',
      ],
    },
  ],
  declaration: 'I hereby declare that the information provided above is correct and true to the best of my knowledge.',
  place: 'Pune',
  date: new Date().toISOString().split('T')[0],
  photo: null,
};

function InfoPage({ title, eyebrow, children }) {
  return (
    <section className="site-page">
      <div className="site-page-header">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
      </div>
      <div className="site-page-body">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <InfoPage title="Privacy Policy" eyebrow="Your Privacy">
      <p><strong>Last updated:</strong> June 21, 2026</p>
      <section>
        <h2>Information You Enter</h2>
        <p>ResumeBiodata.in processes the resume details and photo you choose to enter so that your document can be previewed and downloaded. The builder runs in your browser. We do not require an account, and the current website does not intentionally transmit or store the contents of your resume on our servers.</p>
      </section>
      <section>
        <h2>Cookies, Analytics, and Advertising</h2>
        <p>We may use privacy-conscious analytics to understand page performance and may display advertising through services such as Google AdSense. Those providers may use cookies or similar technologies to measure traffic, prevent fraud, limit repeated ads, and personalize or contextualize advertising according to your consent and their policies.</p>
      </section>
      <section>
        <h2>Data Choices and Retention</h2>
        <p>You can clear entered information by refreshing or closing the browser session. Avoid adding identification numbers, financial details, health information, or other sensitive data that an employer has not legitimately requested. Uploaded photos remain part of the local browser session used to create your PDF.</p>
      </section>
      <section>
        <h2>Third-Party Links and Children</h2>
        <p>External services linked from this website have their own privacy practices. ResumeBiodata.in is a general-audience career tool and is not designed to knowingly collect personal information from children under the age required by applicable law.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>For privacy questions or requests, email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
      </section>
    </InfoPage>
  );
}

function TermsPage() {
  return (
    <InfoPage title="Terms & Conditions" eyebrow="Website Terms">
      <p><strong>Last updated:</strong> June 21, 2026</p>
      <section><h2>Acceptable Use</h2><p>By using ResumeBiodata.in, you agree to use the website only for lawful resume and career-document creation. You must not misuse the service, attempt to disrupt it, upload harmful material, impersonate another person, or create deceptive documents.</p></section>
      <section><h2>Your Content and Responsibilities</h2><p>You retain responsibility for the information and photo you enter. You must have the right to use that content and must verify spelling, dates, qualifications, claims, and contact details before sharing a downloaded document.</p></section>
      <section><h2>Service Availability</h2><p>The templates and tools are provided on an as-available basis. We work to keep the website reliable but cannot guarantee uninterrupted access, compatibility with every device, or acceptance of a resume by any employer or recruitment system.</p></section>
      <section><h2>Intellectual Property</h2><p>The website interface, original guidance, branding, and template implementation are protected by applicable intellectual-property laws. You may use PDFs you create for personal job applications, but you may not copy or resell the website itself.</p></section>
      <section><h2>Changes and Contact</h2><p>We may update website features or these terms when needed. Continued use after an update means you accept the revised terms. Questions can be sent to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p></section>
    </InfoPage>
  );
}

function AboutPage() {
  return (
    <InfoPage title="About Us" eyebrow="ResumeBiodata.in">
      <p>ResumeBiodata.in is an independent browser-based resume builder created to make professional document preparation simpler for students, freshers, job seekers, and working professionals.</p>
      <section><h2>What We Provide</h2><p>The builder guides users through contact information, education, experience, skills, personal details, and a declaration. Users can compare clean templates, review an instant preview, and export a PDF without creating an account.</p></section>
      <section><h2>Our Approach</h2><p>We prioritize readable typography, familiar section names, practical A4 layouts, and straightforward editing. The goal is not to promise employment, but to help users present accurate information in a clear and professional format.</p></section>
      <section><h2>Privacy and Feedback</h2><p>Resume content is processed in the browser for preview and PDF creation. We welcome corrections, accessibility feedback, and feature suggestions at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p></section>
    </InfoPage>
  );
}

function ContactPage() {
  return (
    <InfoPage title="Contact Us" eyebrow="Support">
      <p>If you have any questions, suggestions, or issues while using ResumeBiodata.in, feel free to contact us.</p>
      <p><strong>Email:</strong> <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
      <p>We usually respond within 24 hours.</p>
    </InfoPage>
  );
}

function DisclaimerPage() {
  return (
    <InfoPage title="Disclaimer" eyebrow="Important Information">
      <p><strong>Last updated:</strong> June 21, 2026</p>
      <section><h2>No Employment Guarantee</h2><p>ResumeBiodata.in provides document-building tools and general educational information. Using a template or following an article does not guarantee interviews, employment, admission, or successful processing by an applicant tracking system.</p></section>
      <section><h2>Accuracy of Documents</h2><p>You are solely responsible for reviewing the accuracy, legality, and suitability of every statement in your resume. Do not include false qualifications, copied achievements, confidential employer information, or personal data that is unnecessary for an application.</p></section>
      <section><h2>Professional Advice</h2><p>Content on this website is general information and is not legal, financial, immigration, or professional recruitment advice. Requirements vary by employer, industry, institution, and jurisdiction.</p></section>
      <section><h2>External Services</h2><p>Third-party browsers, fonts, analytics, advertising, or linked services may operate under separate terms. We are not responsible for third-party availability or content.</p></section>
    </InfoPage>
  );
}

function NotFoundPage({ onHome }) {
  return (
    <InfoPage title="Page Not Found" eyebrow="404 Error">
      <p>The page you requested does not exist or may have moved.</p>
      <p><button type="button" className="btn-primary" onClick={onHome}>Return to Home</button></p>
    </InfoPage>
  );
}
function RouteLoadingPage() {
  return (
    <section className="site-page" aria-live="polite" aria-busy="true">
      <div className="site-page-header"><span>Loading</span><h1>Preparing the blog...</h1></div>
    </section>
  );
}

function App() {
  const initialPage = getPageFromPath();
  const [step, setStep] = useState(initialPage === 'builder' ? 1 : 0); // 0=content, 1=form, 2=template, 3=preview
  const [sitePage, setSitePage] = useState(initialPage === 'builder' ? 'home' : initialPage);
  const [makerType, setMakerType] = useState(initialPage === 'builder' ? 'resume' : null);
  const [formData, setFormData] = useState(defaultData);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef(null);
  const navRef = useRef(null);

  React.useEffect(() => {
    const isEditableTarget = (target) => (
      target instanceof Element
      && Boolean(target.closest('input, textarea, select, [contenteditable=true], [role=textbox]'))
    );

    const blockContextMenu = (event) => {
      if (!isEditableTarget(event.target)) event.preventDefault();
    };

    const blockCopy = (event) => {
      if (!isEditableTarget(event.target)) event.preventDefault();
    };

    const blockImageDrag = (event) => {
      if (event.target instanceof Element && event.target.closest('img')) event.preventDefault();
    };

    document.addEventListener('contextmenu', blockContextMenu);
    document.addEventListener('copy', blockCopy);
    document.addEventListener('dragstart', blockImageDrag);

    return () => {
      document.removeEventListener('contextmenu', blockContextMenu);
      document.removeEventListener('copy', blockCopy);
      document.removeEventListener('dragstart', blockImageDrag);
    };
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  React.useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromPath();
      if (page === 'builder') {
        setSitePage('home');
        setMakerType('resume');
        setStep(1);
      } else {
        setSitePage(page);
        setMakerType(null);
        setSelectedTemplate(null);
        setStep(0);
      }
      setMenuOpen(false);
      window.scrollTo({ top: 0 });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);


  const showSitePage = (page) => {
    setSitePage(page);
    setStep(0);
    setMakerType(null);
    setSelectedTemplate(null);
    setMenuOpen(false);
    const nextPath = pagePaths[page] || '/';
    if (normalizePath(window.location.pathname) !== nextPath) {
      window.history.pushState({ page }, '', nextPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageLink = (event, page) => {
    event.preventDefault();
    showSitePage(page);
  };

  const handleSelectOption = (option) => {
    setSitePage('home');
    setMakerType(option);
    setStep(1);
    if (normalizePath(window.location.pathname) !== pagePaths.builder) {
      window.history.pushState({ page: 'builder' }, '', pagePaths.builder);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    showSitePage('home');
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setStep(2);
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setStep(3);
  };

  const handleDownloadPDF = async () => {
    if (isDownloading) return;

    const previewWrapper = previewRef.current;
    if (!previewWrapper) return;

    const pageElement = previewWrapper.querySelector('.resume-page-preview > div') || previewWrapper.firstElementChild || previewWrapper;
    if (!pageElement) return;

    setIsDownloading(true);
    let wrapper;

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      if (document.fonts?.ready) await document.fonts.ready;

      const elementClone = pageElement.cloneNode(true);
      elementClone.classList.add('pdf-export-page');
      elementClone.style.width = '210mm';
      elementClone.style.maxWidth = 'none';
      elementClone.style.border = '0';
      elementClone.style.boxShadow = 'none';

      const darkerPdfColors = new Map([
        ['#1a202c', '#101010'],
        ['#1a1a1a', '#101010'],
        ['#333', '#181818'],
        ['#718096', '#374151'],
        ['#64748b', '#334155'],
        ['#475569', '#1f2937'],
        ['#444', '#222222'],
      ]);
      elementClone.querySelectorAll('*').forEach((node) => {
        const color = node.style.color?.toLowerCase();
        if (darkerPdfColors.has(color)) node.style.color = darkerPdfColors.get(color);
      });

      wrapper = document.createElement('div');
      wrapper.className = 'pdf-export-root';
      wrapper.style.width = '210mm';
      wrapper.style.margin = '0';
      wrapper.style.padding = '0';
      wrapper.appendChild(elementClone);
      document.body.appendChild(wrapper);

      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      const images = Array.from(elementClone.querySelectorAll('img'));
      await Promise.all(images.map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        });
      }));

      const exportBounds = elementClone.getBoundingClientRect();
      const protectedElements = Array.from(elementClone.querySelectorAll('p, li, tr, .classic-detail-row, *'))
        .filter((node, index, nodes) => {
          if (!node.textContent?.trim()) return false;
          if (node.matches('p, li, tr, .classic-detail-row')) return true;
          if (node.childElementCount > 0) return false;
          return nodes.indexOf(node) === index;
        });

      const safeName = (formData.fullName || 'Resume')
        .trim()
        .replace(/[^a-zA-Z0-9_-]+/g, '_')
        .replace(/^_+|_+$/g, '') || 'Resume';

      const canvas = await html2canvas(elementClone, {
        scale: 2.25,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        width: elementClone.scrollWidth,
        height: elementClone.scrollHeight,
        windowWidth: elementClone.scrollWidth,
        windowHeight: elementClone.scrollHeight,
        logging: false,
        onclone: (clonedDocument) => {
          const exportRoot = clonedDocument.querySelector('.pdf-export-root');
          if (exportRoot) exportRoot.style.visibility = 'visible';
        },
      });

      if (!canvas.width || !canvas.height) {
        throw new Error('Resume preview could not be captured.');
      }

      const canvasContext = canvas.getContext('2d', { willReadFrequently: true });
      const pixels = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
      const contrast = 1.14;
      for (let index = 0; index < pixels.data.length; index += 4) {
        pixels.data[index] = Math.max(0, Math.min(255, (pixels.data[index] - 128) * contrast + 128));
        pixels.data[index + 1] = Math.max(0, Math.min(255, (pixels.data[index + 1] - 128) * contrast + 128));
        pixels.data[index + 2] = Math.max(0, Math.min(255, (pixels.data[index + 2] - 128) * contrast + 128));
      }
      canvasContext.putImageData(pixels, 0, 0);

      const renderScale = canvas.width / exportBounds.width;
      let lastContentRow = 0;
      const darkPixelThreshold = 242;
      const minimumInkPerRow = Math.max(10, Math.floor(canvas.width / 180));

      for (let row = canvas.height - 1; row >= 0; row -= 1) {
        let inkPixels = 0;
        for (let column = 0; column < canvas.width; column += 4) {
          const pixelIndex = ((row * canvas.width) + column) * 4;
          if (
            pixels.data[pixelIndex] < darkPixelThreshold
            || pixels.data[pixelIndex + 1] < darkPixelThreshold
            || pixels.data[pixelIndex + 2] < darkPixelThreshold
          ) {
            inkPixels += 1;
            if (inkPixels >= minimumInkPerRow) {
              lastContentRow = row;
              break;
            }
          }
        }
        if (lastContentRow) break;
      }

      const exportHeight = Math.min(
        canvas.height,
        lastContentRow + 1 + Math.round(18 * renderScale)
      );
      const protectedRanges = protectedElements
        .map((node) => {
          if (node.classList.contains('classic-detail-row') && !node.getBoundingClientRect().height) {
            const childBounds = Array.from(node.children).map((child) => child.getBoundingClientRect());
            if (!childBounds.length) return null;
            return {
              top: (Math.min(...childBounds.map((bounds) => bounds.top)) - exportBounds.top) * renderScale,
              bottom: (Math.max(...childBounds.map((bounds) => bounds.bottom)) - exportBounds.top) * renderScale,
            };
          }

          const bounds = node.getBoundingClientRect();
          if (!bounds.height) return null;
          return {
            top: (bounds.top - exportBounds.top) * renderScale,
            bottom: (bounds.bottom - exportBounds.top) * renderScale,
          };
        })
        .filter(Boolean);

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
      const pdfWidth = 210;
      const pdfHeight = 297;
      const pageHeightPx = Math.ceil(canvas.width * (pdfHeight / pdfWidth));
      let sourceY = 0;
      let pageNumber = 0;

      while (sourceY < exportHeight) {
        const remainingHeight = exportHeight - sourceY;
        const roundingTolerance = Math.max(12, Math.floor(pageHeightPx * 0.012));
        if (pageNumber > 0 && remainingHeight <= roundingTolerance) break;

        const isFinalPage = remainingHeight <= pageHeightPx + roundingTolerance;
        let sliceHeight = isFinalPage ? remainingHeight : pageHeightPx;
        const proposedBreak = sourceY + sliceHeight;

        if (!isFinalPage && proposedBreak < exportHeight) {
          const intersectingRanges = protectedRanges.filter(
            (range) => range.top < proposedBreak && range.bottom > proposedBreak
          );
          if (intersectingRanges.length) {
            const safeBreak = Math.min(...intersectingRanges.map((range) => range.top)) - (4 * renderScale);
            if (safeBreak - sourceY > pageHeightPx * 0.55) {
              sliceHeight = Math.floor(safeBreak - sourceY);
            }
          }
        }
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;

        const context = pageCanvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        context.drawImage(canvas, 0, sourceY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

        if (pageNumber > 0) pdf.addPage('a4', 'portrait');
        const renderedHeight = (sliceHeight * pdfWidth) / canvas.width;
        pdf.addImage(pageCanvas.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, pdfWidth, renderedHeight, undefined, 'MEDIUM');

        sourceY += sliceHeight;
        pageNumber += 1;
      }

      pdf.save(`${safeName}_Resume.pdf`);
    } catch (error) {
      console.error('PDF download failed:', error);
      window.alert('PDF download failed. Please try again.');
    } finally {
      wrapper?.remove();
      setIsDownloading(false);
    }
  };
  const renderSitePage = () => {
    if (sitePage === 'blog') {
      return <React.Suspense fallback={<RouteLoadingPage />}><Blog /></React.Suspense>;
    }
    if (sitePage === 'blog-post') {
      return <React.Suspense fallback={<RouteLoadingPage />}><BlogPost slug={getBlogSlugFromPath()} /></React.Suspense>;
    }
    if (sitePage === 'privacy') return <PrivacyPage />;
    if (sitePage === 'terms') return <TermsPage />;
    if (sitePage === 'contact') return <ContactPage />;
    if (sitePage === 'about') return <AboutPage />;
    if (sitePage === 'disclaimer') return <DisclaimerPage />;
    if (sitePage === 'not-found') return <NotFoundPage onHome={handleBackToHome} />;
    return <HomePage onSelectOption={handleSelectOption} />;
  };

  const activePage = step > 0 ? 'builder' : sitePage;
  const seo = pageSeo[activePage] || pageSeo['not-found'];
  const canonicalPath = pagePaths[activePage] || normalizePath(window.location.pathname);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const pageTitle = getPageTitle(activePage, step, seo);
  const appSeo = activePage === 'blog' || activePage === 'blog-post' ? null : (
    <Seo
      title={pageTitle}
      description={seo.description}
      canonicalPath={canonicalPath}
      robots={activePage === 'not-found' ? 'noindex, follow' : 'index, follow, max-image-preview:large'}
      keywords={MAIN_SEO_KEYWORDS}
      schemas={buildSiteSchemas({activePage, title: pageTitle, description: seo.description, canonicalPath, canonicalUrl})}
    />
  );

  return (
    <div className="app">
      {appSeo}
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <nav className="navbar" ref={navRef} aria-label="Primary navigation">
        <div className="nav-inner">
          <a className="nav-logo" href="/" onClick={(event) => handlePageLink(event, 'home')} aria-label="ResumeBiodata.in home"><img src="/images/Navbar Logo.png" alt="ResumeBiodata.in Logo" width="1827" height="469" decoding="async" /></a>
          {step === 0 ? (
            <>
              <button className="hamburger-menu" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu" aria-expanded={menuOpen} aria-controls="primary-menu">
                <span></span>
                <span></span>
                <span></span>
              </button>
              <div id="primary-menu" className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                <a className={`nav-menu-action ${sitePage === 'blog' || sitePage === 'blog-post' ? 'active' : ''}`} href="/blog" aria-current={sitePage === 'blog' || sitePage === 'blog-post' ? 'page' : undefined} onClick={(event) => handlePageLink(event, 'blog')}>Guides</a>
                <a className={`nav-menu-action ${sitePage === 'about' ? 'active' : ''}`} href="/about" aria-current={sitePage === 'about' ? 'page' : undefined} onClick={(event) => handlePageLink(event, 'about')}>About</a>
                <a className={`nav-menu-action ${sitePage === 'contact' ? 'active' : ''}`} href="/contact" aria-current={sitePage === 'contact' ? 'page' : undefined} onClick={(event) => handlePageLink(event, 'contact')}>Contact</a>
                <button className="btn-secondary nav-btn" onClick={() => handleSelectOption('resume')}>Start Now</button>
              </div>
            </>
          ) : (
            <div className="nav-steps">
              <span className={`nav-step ${step >= 1 ? 'active' : ''}`}>1. Fill Details</span>
              <span className="nav-arrow">&gt;</span>
              <span className={`nav-step ${step >= 2 ? 'active' : ''}`}>2. Choose Template</span>
              <span className="nav-arrow">&gt;</span>
              <span className={`nav-step ${step >= 3 ? 'active' : ''}`}>3. Download PDF</span>
            </div>
          )}
        </div>
      </nav>

      <div className="layout homepage-layout">
        <main id="main-content" className="main-content homepage" style={{ flex: '1', maxWidth: '100%', padding: '20px 0' }}>
          {step === 0 && renderSitePage()}
          {step === 1 && (
            <ResumeForm initialData={formData} onSubmit={handleFormSubmit} />
          )}
          {step === 2 && (
            <TemplateSelector
              formData={formData}
              onSelect={handleTemplateSelect}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <div className="preview-step">
              <h1 className="sr-only">Preview and Download Your Resume</h1>
              <div className="preview-actions">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button className="btn-secondary" onClick={() => setStep(2)}>Back to Templates</button>
                </div>
                <button className="btn-primary" onClick={handleDownloadPDF} disabled={isDownloading}>
                  {isDownloading ? 'Preparing PDF...' : 'Download PDF'}
                </button>
              </div>
              <div ref={previewRef} className="preview-container">
                <ResumePreview data={formData} templateId={selectedTemplate} type={makerType} />
              </div>
            </div>
          )}        </main>
      </div>

      {activePage === 'builder' && (
        <>
          <ToolSchema />
          <SEOContent />
        </>
      )}

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-brand">ResumeBiodata.in</span>
          <nav className="footer-menu" aria-label="Footer navigation">
            <a className={sitePage === 'about' ? 'active' : ''} aria-current={sitePage === 'about' ? 'page' : undefined} href="/about" onClick={(event) => handlePageLink(event, 'about')}>About Us</a>
            <a className={sitePage === 'privacy' ? 'active' : ''} aria-current={sitePage === 'privacy' ? 'page' : undefined} href="/privacy-policy" onClick={(event) => handlePageLink(event, 'privacy')}>Privacy Policy</a>
            <a className={sitePage === 'terms' ? 'active' : ''} aria-current={sitePage === 'terms' ? 'page' : undefined} href="/terms-and-conditions" onClick={(event) => handlePageLink(event, 'terms')}>Terms & Conditions</a>
            <a className={sitePage === 'disclaimer' ? 'active' : ''} aria-current={sitePage === 'disclaimer' ? 'page' : undefined} href="/disclaimer" onClick={(event) => handlePageLink(event, 'disclaimer')}>Disclaimer</a>
            <a className={sitePage === 'contact' ? 'active' : ''} aria-current={sitePage === 'contact' ? 'page' : undefined} href="/contact" onClick={(event) => handlePageLink(event, 'contact')}>Contact Us</a>
          </nav>
          <p>Copyright 2026 ResumeBiodata.in. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;










