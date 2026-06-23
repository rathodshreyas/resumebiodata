import React from 'react';
import { formatDate, formatAddress } from './utils';

const s = {
  page: { fontFamily: 'Arial, Helvetica, sans-serif', background: 'white', minHeight: '297mm', color: '#0f172a', padding: '34px 40px 36px', fontSize: 15, lineHeight: 1.5 },
  title: { textAlign: 'center', fontSize: 18, fontWeight: 800, textDecoration: 'underline', letterSpacing: 2, marginBottom: 10 },
  name: { fontSize: 46, fontWeight: 900, letterSpacing: -1, color: '#0f172a', marginBottom: 0 },
  profileTitle: { fontSize: 16, color: '#64748b', fontWeight: 400, marginBottom: 4 },
  contactRow: { display: 'grid', gap: 4, fontSize: 14, color: '#64748b', marginBottom: 12, marginTop: 0 },
  divider: { borderTop: '2px solid #0f172a', marginBottom: 10 },
  sectionTitle: { fontSize: 15, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: '#0f172a', marginTop: 10, marginBottom: 5 },
  thinLine: { borderTop: '1px solid #f1f5f9', marginBottom: 8 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 10, fontSize: 14 },
  tableWrapper: { width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
  th: { padding: '4px 6px', background: '#f8fafc', fontWeight: 700, color: '#0f172a', borderBottom: '1.5px solid #0f172a', textAlign: 'left' },
  td: { padding: '4px 6px', borderBottom: '1px solid #f1f5f9' },
  tdCenter: { padding: '4px 6px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' },
  ul: { margin: '0 0 6px 16px', padding: 0, listStyle: 'disc' },
  li: { marginBottom: 2, fontSize: 15 },
  detailsGrid: { display: 'grid', gridTemplateColumns: 'minmax(120px, max-content) 12px minmax(140px, 1fr)', gap: '4px 12px', fontSize: '11.5pt', alignItems: 'start' },
  detailLabel: { textAlign: 'left', paddingRight: 6, whiteSpace: 'nowrap' },
  detailColon: { textAlign: 'center' },
  detailValue: { color: '#0f172a' },
  footer: { display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', marginTop: 8, minHeight: 54, padding: '0 8px 4px', background: 'transparent', color: '#111', fontSize: 14 },
  declaration: { fontStyle: 'italic', color: '#475569', fontSize: 15 },
};

export default function MinimalTemplate({ data }) {
  const addressText = formatAddress(data.address);
  const nameStyle = s.name;
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
      <div style={s.title}>RESUME</div>
      {data.photo && <img className="minimal-photo" src={data.photo} alt="Profile" style={{ float: 'right', width: 90, height: 110, objectFit: 'cover', marginLeft: 20, marginBottom: 12 }} />}
      <div className='resume-person-name' style={nameStyle}>{data.fullName}</div>
      {data.profileTitle && <div style={s.profileTitle}>{data.profileTitle}</div>}
      <div style={s.contactRow}>
        <div className='resume-address'><b>Address:</b> <span style={{ whiteSpace: 'pre-line' }}>{addressText}</span></div>
        <div className='resume-contact-detail'><b>Mobile:</b> {data.mobile}</div>
        {data.email && <div className='resume-contact-detail'><b>Email:</b> {data.email}</div>}
      </div>
      <div style={s.divider} />

      {data.careerObjective && (
        <>
          <div style={s.sectionTitle}>Career Objective</div>
          <p style={{ textAlign: 'justify', marginBottom: 6, color: '#334155' }}>{data.careerObjective}</p>
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

      {allDetails.length > 0 && (
        <div>
          <div style={s.sectionTitle}>Personal Details</div>
          <div style={s.detailsGrid}>
            {allDetails.map((d, i) => (
              <React.Fragment key={i}>
                <div style={s.detailLabel}>{d.label}</div>
                <div style={s.detailColon}>:</div>
                <div style={s.detailValue}>{d.value}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {data.declaration && (
        <>
          <div style={{ ...s.sectionTitle, marginTop: 10 }}>Declaration</div>
          <p className='resume-declaration' style={s.declaration}>{data.declaration}</p>
        </>
      )}

      <div style={s.footer}>
        <div>
          {data.date && <p style={{ margin: 0, width: 142, padding: '2px 0' }}><b>Date:</b> {formatDate(data.date)}</p>}
          {data.place && <p style={{ margin: 0 }}><b>Place:</b> {data.place}</p>}
        </div>
        <div><p style={{ margin: 0 }}>({data.fullName})</p></div>
      </div>
    </div>
  );
}



