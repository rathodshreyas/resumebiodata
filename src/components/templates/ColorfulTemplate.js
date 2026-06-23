import React from 'react';
import { formatDate, formatAddress } from './utils';

const TEAL = '#285e61';
const TEAL_MID = '#2c7a7b';
const TEAL_LIGHT = '#b2f5ea';
const TEAL_PALE = '#e6fffa';

const s = {
  page: { fontFamily: "'Trebuchet MS', Arial, sans-serif", background: TEAL_PALE, minHeight: '297mm', color: '#1a202c', fontSize: 15, lineHeight: 1.5 },
  header: { background: TEAL, padding: '24px 32px', color: 'white', display: 'flex', alignItems: 'center', gap: 20 },
  headerText: { flex: 1 },
  name: { fontSize: 42, fontWeight: 800, letterSpacing: 0.5, marginBottom: 3 },
  profileTitle: { color: TEAL_LIGHT, fontSize: 16, marginBottom: 10 },
  contactRow: { display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 14, color: 'rgba(255,255,255,0.85)' },
  contactItem: { display: 'flex', alignItems: 'center', gap: 4 },
  photo: { width: 80, height: 100, objectFit: 'cover', borderRadius: 6, border: `3px solid ${TEAL_LIGHT}`, flexShrink: 0 },
  body: { padding: '20px 32px' },
  sectionRow: { display: 'flex', alignItems: 'center', gap: 0, marginTop: 16, marginBottom: 8 },
  sectionBar: { width: 5, height: 20, background: TEAL, borderRadius: 3, marginRight: 10, flexShrink: 0 },
  sectionTitle: { fontSize: 15, fontWeight: 800, color: TEAL, textTransform: 'uppercase', letterSpacing: 1.5 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 10, fontSize: 14 },
  tableWrapper: { width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
  th: { padding: '5px 8px', background: TEAL, color: 'white', fontWeight: 700, textAlign: 'left', fontSize: 14 },
  td: { padding: '5px 8px', borderBottom: `1px solid ${TEAL_LIGHT}`, background: 'white' },
  tdCenter: { padding: '5px 8px', borderBottom: `1px solid ${TEAL_LIGHT}`, textAlign: 'center', background: 'white' },
  ul: { margin: '0 0 8px 20px', padding: 0 },
  li: { marginBottom: 3 },
  detailsGrid: { display: 'grid', gridTemplateColumns: 'minmax(120px, 1fr) 18px minmax(120px, 1fr)', gap: '6px 20px', fontSize: '13pt', alignItems: 'start' },
  detailColon: { textAlign: 'center' },
  detailValue: { fontWeight: 500, color: '#1a202c' },
  detailCard: { background: 'white', borderRadius: 6, padding: '5px 10px', borderLeft: `3px solid ${TEAL_MID}` },
  detailLabel: { fontSize: 14, fontWeight: 700, color: TEAL_MID, textTransform: 'uppercase', letterSpacing: 1 },
  footer: { display: 'flex', justifyContent: 'space-between', marginTop: 12, background: TEAL, color: 'white', padding: '10px 32px', fontSize: 14 },
  declaration: { fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: `4px solid ${TEAL}`, fontSize: 15 },
};

function Section({ title }) {
  return (
    <div style={s.sectionRow}>
      <div style={s.sectionBar} />
      <div style={s.sectionTitle}>{title}</div>
    </div>
  );
}

export default function ColorfulTemplate({ data }) {
  const nameStyle = s.name;
  const addressText = formatAddress(data.address);
  const allDetails = [
    data.fatherName && { label: "Father's Name", value: data.fatherName },
    data.motherName && { label: "Mother's Name", value: data.motherName },
    data.dob && { label: "Date of Birth", value: formatDate(data.dob) },
    data.gender && { label: "Gender", value: data.gender },
    data.nationality && { label: "Nationality", value: data.nationality },
    data.maritalStatus && { label: "Marital Status", value: data.maritalStatus },
    data.languages && { label: "Languages", value: data.languages },
    ...data.customPersonalDetails.filter(d => d.key && d.value).map(d => ({ label: d.key, value: d.value })),
  ].filter(Boolean);

  return (
    <div style={s.page}>
      <div style={s.header}>
        {data.photo && <img src={data.photo} alt="Profile" style={s.photo} />}
        <div style={s.headerText}>
          <div className='resume-person-name' style={nameStyle}>{data.fullName}</div>
          {data.profileTitle && <div style={s.profileTitle}>{data.profileTitle}</div>}
          <div style={s.contactRow}>
            <span className='resume-address' style={s.contactItem}>📍 {addressText}</span>
            <span className='resume-contact-detail' style={s.contactItem}>📱 {data.mobile}</span>
            {data.email && <span className='resume-contact-detail' style={s.contactItem}>✉ {data.email}</span>}
          </div>
        </div>
      </div>

      <div style={s.body}>
        {data.careerObjective && (
          <>
            <Section title="Career Objective" />
            <p style={{ textAlign: 'justify', marginBottom: 6, background: 'white', padding: '8px 12px', borderRadius: 6 }}>{data.careerObjective}</p>
          </>
        )}

        {data.qualifications.some(q => q.qualification) && (
          <>
            <Section title="Academic Qualification" />
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
            <Section title="Other Qualification" />
            <ul style={s.ul}>{data.otherQualifications.filter(o => o).map((o, i) => <li key={i} style={s.li}>{o}</li>)}</ul>
          </>
        )}

        {data.experiences.some(e => e) && (
          <>
            <Section title="Work Experience" />
            <ul style={s.ul}>{data.experiences.filter(e => e).map((e, i) => <li key={i} style={s.li}>{e}</li>)}</ul>
          </>
        )}

        {data.customSections.filter(sec => sec.title && sec.items.some(item => item)).map((sec, i) => (
          <div key={i}>
            <Section title={sec.title} />
            <ul style={s.ul}>{sec.items.filter(item => item).map((item, j) => <li key={j} style={s.li}>{item}</li>)}</ul>
          </div>
        ))}

        {allDetails.length > 0 && (
          <>
            <Section title="Personal Details" />
            <div style={s.detailsGrid}>
              {allDetails.map((d, i) => (
                <React.Fragment key={i}>
                  <div style={s.detailLabel}>{d.label}</div>
                  <div style={s.detailColon}>:</div>
                  <div style={s.detailValue}>{d.value}</div>
                </React.Fragment>
              ))}
            </div>
          </>
        )}

        {data.declaration && (
          <>
            <Section title="Declaration" />
            <div className='resume-declaration' style={s.declaration}>{data.declaration}</div>
          </>
        )}
      </div>

      <div style={s.footer}>
        <div>
          {data.date && <p style={{ margin: 0 }}><b>Date:</b> {formatDate(data.date)}</p>}
          {data.place && <p style={{ margin: 0 }}><b>Place:</b> {data.place}</p>}
        </div>
        <div><p style={{ margin: 0 }}>({data.fullName})</p></div>
      </div>
    </div>
  );
}
