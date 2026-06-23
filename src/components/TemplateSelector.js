import React from 'react';

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional black & white, suitable for all fields',
    badge: 'Most Popular',
    bg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    accent: '#1a202c',
    preview: (
      <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="200" height="160" fill="#f8fafc" />
        <rect x="0" y="0" width="200" height="28" fill="#1a202c" />
        <text x="100" y="18" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">RESUME</text>
        <rect x="14" y="38" width="100" height="5" rx="2" fill="#1a202c" />
        <rect x="14" y="48" width="70" height="3" rx="1.5" fill="#718096" />
        <rect x="14" y="58" width="172" height="2" rx="1" fill="#e2e8f0" />
        <rect x="14" y="64" width="50" height="3" rx="1.5" fill="#1a202c" />
        <rect x="14" y="71" width="172" height="2" rx="1" fill="#e2e8f0" />
        <rect x="14" y="77" width="55" height="3" rx="1.5" fill="#1a202c" />
        <rect x="14" y="84" width="172" height="2" rx="1" fill="#e2e8f0" />
        <rect x="14" y="90" width="40" height="3" rx="1.5" fill="#1a202c" />
        <rect x="14" y="97" width="160" height="2" rx="1" fill="#cbd5e0" />
        <rect x="14" y="101" width="140" height="2" rx="1" fill="#cbd5e0" />
        <rect x="14" y="112" width="50" height="3" rx="1.5" fill="#1a202c" />
        <rect x="14" y="119" width="172" height="2" rx="1" fill="#e2e8f0" />
        <rect x="14" y="130" width="172" height="2" rx="1" fill="#e2e8f0" />
        <rect x="14" y="140" width="160" height="2" rx="1" fill="#e2e8f0" />
      </svg>
    )
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Gold accent lines, sophisticated & professional',
    badge: 'Premium',
    bg: 'linear-gradient(135deg, #fffff0 0%, #fefcbf 100%)',
    accent: '#744210',
    preview: (
      <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="200" height="160" fill="#fffff0" />
        <rect x="0" y="0" width="200" height="40" fill="#744210" />
        <text x="100" y="18" textAnchor="middle" fill="#fefcbf" fontSize="9" fontWeight="bold" letterSpacing="3">RESUME</text>
        <rect x="14" y="24" width="172" height="1" fill="#d69e2e" />
        <text x="100" y="35" textAnchor="middle" fill="white" fontSize="8">Your Name</text>
        <rect x="14" y="48" width="172" height="1.5" fill="#d69e2e" />
        <rect x="14" y="54" width="55" height="3" rx="1.5" fill="#744210" />
        <rect x="14" y="61" width="172" height="1.5" fill="#d69e2e" />
        <rect x="14" y="67" width="160" height="2" rx="1" fill="#92400e" opacity="0.5" />
        <rect x="14" y="72" width="140" height="2" rx="1" fill="#92400e" opacity="0.5" />
        <rect x="14" y="80" width="55" height="3" rx="1.5" fill="#744210" />
        <rect x="14" y="87" width="172" height="1.5" fill="#d69e2e" />
        <rect x="14" y="93" width="172" height="2" rx="1" fill="#92400e" opacity="0.4" />
        <rect x="14" y="98" width="155" height="2" rx="1" fill="#92400e" opacity="0.4" />
        <rect x="14" y="108" width="55" height="3" rx="1.5" fill="#744210" />
        <rect x="14" y="115" width="172" height="1.5" fill="#d69e2e" />
        <rect x="14" y="121" width="172" height="2" rx="1" fill="#92400e" opacity="0.4" />
        <rect x="14" y="126" width="120" height="2" rx="1" fill="#92400e" opacity="0.4" />
        <rect x="14" y="138" width="172" height="1" fill="#d69e2e" />
        <rect x="14" y="143" width="55" height="2" rx="1" fill="#92400e" opacity="0.4" />
      </svg>
    )
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean white, ultra-minimal typography',
    badge: '',
    bg: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
    accent: '#0f172a',
    preview: (
      <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="200" height="160" fill="white" />
        <text x="100" y="11" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">RESUME</text>
        <rect x="14" y="14" width="90" height="7" rx="2" fill="#0f172a" />
        <rect x="14" y="26" width="60" height="3" rx="1.5" fill="#94a3b8" />
        <rect x="14" y="34" width="172" height="0.8" fill="#0f172a" />
        <rect x="14" y="42" width="40" height="2.5" rx="1" fill="#0f172a" />
        <rect x="14" y="49" width="172" height="1.8" rx="0.9" fill="#f1f5f9" />
        <rect x="14" y="54" width="172" height="1.8" rx="0.9" fill="#f1f5f9" />
        <rect x="14" y="64" width="40" height="2.5" rx="1" fill="#0f172a" />
        <rect x="14" y="71" width="172" height="1.8" rx="0.9" fill="#f1f5f9" />
        <rect x="14" y="76" width="130" height="1.8" rx="0.9" fill="#f1f5f9" />
        <rect x="14" y="86" width="40" height="2.5" rx="1" fill="#0f172a" />
        <rect x="14" y="93" width="172" height="1.8" rx="0.9" fill="#f1f5f9" />
        <rect x="14" y="98" width="160" height="1.8" rx="0.9" fill="#f1f5f9" />
        <rect x="14" y="108" width="40" height="2.5" rx="1" fill="#0f172a" />
        <rect x="14" y="115" width="172" height="1.8" rx="0.9" fill="#f1f5f9" />
        <rect x="14" y="120" width="172" height="1.8" rx="0.9" fill="#f1f5f9" />
        <rect x="14" y="125" width="120" height="1.8" rx="0.9" fill="#f1f5f9" />
        <rect x="14" y="143" width="172" height="0.8" fill="#0f172a" />
      </svg>
    )
  }
];

function TemplateSelector({ formData, onSelect, onBack }) {
  return (
    <div className="template-page">
      <div className="template-back">
        <button className="btn-secondary" onClick={onBack}>← Back to Form</button>
      </div>
      <h1>Choose Your Template</h1>
      <p>Select a design for your resume. You can go back and change it anytime.</p>
      <div className="templates-grid">
        {templates.map(t => (
          <button type="button" className="template-card" key={t.id} onClick={() => onSelect(t.id)} aria-label={`Choose ${t.name} resume template`}>
            <div className="template-thumb" style={{ background: t.bg }}>
              <span className="template-preview-art" aria-hidden="true">{t.preview}</span>
              {t.badge && <span className="template-badge">{t.badge}</span>}
            </div>
            <div className="template-info">
              <h3>{t.name}</h3>
              <p>{t.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;
