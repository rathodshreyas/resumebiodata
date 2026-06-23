import React from 'react';
import { formatDate, formatAddress } from './utils';

const BLUE = '#2b6cb0';
const SIDEBAR_W = 240;

const s = {
  page: { fontFamily: "'Segoe UI', Arial, sans-serif", display: 'flex', background: 'white', minHeight: '297mm', color: '#1a202c', fontSize: 15 },
  sidebar: { width: SIDEBAR_W, minWidth: SIDEBAR_W, background: 'linear-gradient(180deg, #1b3b82 0%, #2b6cb0 100%)', color: 'white', padding: '32px 18px', flexShrink: 0 },
  main: { flex: 1, padding: '28px 24px' },
  photoCircle: { width: 100, height: 100, borderRadius: '50%', background: '#bee3f8', margin: '0 auto 18px', overflow: 'hidden', border: '3px solid #bee3f8', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  photoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  photoPlaceholder: { fontSize: 32 },
  sideSection: { marginBottom: 18 },
  sideSectionTitle: { fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: '#bee3f8', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 4, marginBottom: 8 },
  sideItem: { fontSize: 14, marginBottom: 4, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 },
  sideLabel: { color: '#bee3f8', fontWeight: 600, display: 'block', fontSize: 14, textTransform: 'uppercase' },
  personalDetailGrid: { display: 'grid', gap: 10, fontSize: 14, marginTop: 8 },
  personalDetailItem: { display: 'grid', gap: 4 },
  personalDetailLabel: { color: '#bee3f8', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', wordBreak: 'break-word' },
  personalDetailValue: { color: 'rgba(255,255,255,0.95)', lineHeight: 1.5, minWidth: 0, wordBreak: 'break-word' },
  sidebarDecoration: { marginTop: 18, paddingBottom: 4, borderBottom: '1px solid rgba(255,255,255,0.2)', marginBottom: 10 },
  decorationText: { color: '#d6eeff', fontSize: 14, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' },
  name: { fontSize: 40, fontWeight: 700, color: BLUE, marginBottom: 2 },
  profileTitle: { fontSize: 16, color: '#718096', marginBottom: 16 },
  sectionTitle: { fontSize: 15, fontWeight: 700, color: BLUE, textTransform: 'uppercase', letterSpacing: 1, borderLeft: `4px solid ${BLUE}`, paddingLeft: 8, marginTop: 16, marginBottom: 8 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 10, fontSize: 14 },
  tableWrapper: { width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
  th: { padding: '4px 6px', background: '#ebf8ff', fontWeight: 700, borderBottom: '2px solid #bee3f8', textAlign: 'left', color: BLUE },
  td: { padding: '4px 6px', borderBottom: '1px solid #ebf8ff' },
  tdCenter: { padding: '4px 6px', borderBottom: '1px solid #ebf8ff', textAlign: 'center' },
  ul: { margin: '0 0 8px 16px', padding: 0, fontSize: 15 },
  li: { marginBottom: 3 },
  detailsGrid: { display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 12px', fontSize: '13pt' },
  footer: { display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 14, borderTop: `2px solid ${BLUE}`, paddingTop: 6 },
  declaration: { fontStyle: 'italic', fontSize: 15 },
};

export default function ModernTemplate({ data }) {
  const nameStyle = s.name;
  const addressText = formatAddress(data.address);
  return (
    <div style={s.page}>
      {/* SIDEBAR */}
      <div style={s.sidebar}>
        <div style={s.photoCircle}>
          {data.photo
            ? <img src={data.photo} alt="Profile" style={s.photoImg} />
            : <span style={s.photoPlaceholder}>👤</span>
          }
        </div>

        <div style={s.sideSection}>
          <div style={s.sideSectionTitle}>Contact</div>
          <span style={s.sideLabel}>Address</span>
          <div className='resume-address' style={s.sideItem}>{addressText}</div>
          <span style={s.sideLabel}>Mobile</span>
          <div className='resume-contact-detail' style={s.sideItem}>{data.mobile}</div>
          {data.email && <><span style={s.sideLabel}>Email</span><div className='resume-contact-detail' style={s.sideItem}>{data.email}</div></>}
        </div>

        <div style={s.sidebarDecoration}>
          <div style={s.decorationText}>Personal Details</div>
        </div>

        {(data.fatherName || data.motherName || data.dob || data.gender || data.nationality || data.maritalStatus || data.languages || data.customPersonalDetails.length > 0) && (
          <div style={s.personalDetailGrid}>
            {data.fatherName && (
              <div style={s.personalDetailItem}>
                <div style={s.personalDetailLabel}>Father's Name</div>
                <div style={s.personalDetailValue}>{data.fatherName}</div>
              </div>
            )}
            {data.motherName && (
              <div style={s.personalDetailItem}>
                <div style={s.personalDetailLabel}>Mother's Name</div>
                <div style={s.personalDetailValue}>{data.motherName}</div>
              </div>
            )}
            {data.dob && (
              <div style={s.personalDetailItem}>
                <div style={s.personalDetailLabel}>Date of Birth</div>
                <div style={s.personalDetailValue}>{formatDate(data.dob)}</div>
              </div>
            )}
            {data.gender && (
              <div style={s.personalDetailItem}>
                <div style={s.personalDetailLabel}>Gender</div>
                <div style={s.personalDetailValue}>{data.gender}</div>
              </div>
            )}
            {data.nationality && (
              <div style={s.personalDetailItem}>
                <div style={s.personalDetailLabel}>Nationality</div>
                <div style={s.personalDetailValue}>{data.nationality}</div>
              </div>
            )}
            {data.maritalStatus && (
              <div style={s.personalDetailItem}>
                <div style={s.personalDetailLabel}>Marital Status</div>
                <div style={s.personalDetailValue}>{data.maritalStatus}</div>
              </div>
            )}
            {data.languages && (
              <div style={s.personalDetailItem}>
                <div style={s.personalDetailLabel}>Languages</div>
                <div style={s.personalDetailValue}>{data.languages}</div>
              </div>
            )}
            {data.customPersonalDetails.filter(d => d.key && d.value).map((d, i) => (
              <div key={i} style={s.personalDetailItem}>
                <div style={s.personalDetailLabel}>{d.key}</div>
                <div style={s.personalDetailValue}>{d.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MAIN */}
      <div style={s.main}>
        <div className='resume-person-name' style={nameStyle}>{data.fullName}</div>
        {data.profileTitle && <div style={s.profileTitle}>{data.profileTitle}</div>}


        {data.careerObjective && (
          <>
            <div style={s.sectionTitle}>Career Objective</div>
            <p style={{ textAlign: 'justify', fontSize: 15, marginBottom: 6 }}>{data.careerObjective}</p>
          </>
        )}

        {data.qualifications.some(q => q.qualification) && (
          <>
            <div style={s.sectionTitle}>Academic Qualification</div>
            <div style={s.tableWrapper}>
              <table style={s.table}>
                <thead><tr>{['Sr.', 'Qualification', 'University / Board', 'Year', '%/CGPA'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
                <tbody>
                  {data.qualifications.filter(q => q.qualification).map((q, i) => (
                    <tr key={i}><td style={s.tdCenter}>{i + 1}</td><td style={s.td}>{q.qualification}</td><td style={s.td}>{q.university}</td><td style={s.tdCenter}>{q.year}</td><td style={s.tdCenter}>{q.percentage}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {data.otherQualifications.some(o => o) && (
          <>
            <div style={s.sectionTitle}>Other Qualification</div>
            <ul style={s.ul}>{data.otherQualifications.filter(o => o).map((o, i) => <li key={i} style={s.li}>{o}</li>)}</ul>
          </>
        )}

        {data.experiences.some(e => e) && (
          <>
            <div style={s.sectionTitle}>Work Experience</div>
            <ul style={s.ul}>{data.experiences.filter(e => e).map((e, i) => <li key={i} style={s.li}>{e}</li>)}</ul>
          </>
        )}

        {data.customSections.filter(sec => sec.title && sec.items.some(item => item)).map((sec, i) => (
          <div key={i}>
            <div style={s.sectionTitle}>{sec.title}</div>
            <ul style={s.ul}>{sec.items.filter(item => item).map((item, j) => <li key={j} style={s.li}>{item}</li>)}</ul>
          </div>
        ))}

        {data.declaration && (
          <>
            <div style={s.sectionTitle}>Declaration</div>
            <p className='resume-declaration' style={s.declaration}>{data.declaration}</p>
          </>
        )}

        <div style={s.footer}>
          <div>
            {data.date && <p style={{ margin: 0 }}><b>Date:</b> {formatDate(data.date)}</p>}
            <p style={{ margin: '4px 0 0 0' }}><b>Place:</b> Ambajogai</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontWeight: 700 }}>{data.fullName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
