import React from 'react';
import { formatDate, formatAddress } from './utils';

const s = {
  page: { fontFamily: "'Times New Roman', serif", fontSize: 15, padding: 30, background: 'white', minHeight: '297mm', color: '#1a1a1a', lineHeight: 1.45 },
  title: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', textDecoration: 'underline', marginBottom: 16, paddingBottom: 8, textUnderlineOffset: 5 },
  header: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'flex-start', marginBottom: 16 },
  headerNoPhoto: { display: 'block', marginBottom: 16 },
  name: { fontSize: 40, fontWeight: 'bold', margin: 0 },
  profileTitle: { fontSize: 16, fontWeight: '400', color: '#333', margin: '2px 0 8px' },
  contactGrid: { display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 8px', fontSize: 14, marginTop: 8 },
  photoBox: { width: 120, height: 150, border: '1px solid #ccc' },
  photo: { width: '100%', height: '100%', objectFit: 'cover' },
  sectionTitle: { background: '#e0e0e0', padding: '4px 8px', marginTop: 15, marginBottom: 10, fontWeight: 'bold', borderBottom: '1px solid #ccc', fontSize: 15 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 12, fontSize: 14 },
  tableWrapper: { width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
  th: { border: '1px solid #ccc', padding: '6px', background: '#f0f0f0', fontWeight: 'bold', textAlign: 'left' },
  td: { border: '1px solid #ccc', padding: '6px', textAlign: 'left' },
  tdCenter: { border: '1px solid #ccc', padding: '6px', textAlign: 'center' },
  ul: { listStyleType: 'disc', marginLeft: 20, paddingLeft: 5, marginBottom: 10 },
  li: { marginBottom: 4 },
  detailsGrid: { display: 'grid', gridTemplateColumns: 'minmax(120px, 1fr) 18px minmax(120px, 1fr)', gap: '4px 12px', fontSize: '13pt', alignItems: 'start' },
  detailLabel: { textAlign: 'left', paddingRight: 6 },
  detailColon: { textAlign: 'center' },
  declaration: { marginTop: 12, fontStyle: 'italic' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12 },
};

export default function HtmlTemplate({ data }) {
  const hasPhoto = !!data.photo;
  const nameStyle = s.name;
  const addressText = formatAddress(data.address);
  return (
    <div style={s.page}>
      <div style={s.title}>RESUME</div>

      <div style={hasPhoto ? s.header : s.headerNoPhoto}>
        <div>
          <h1 className='resume-person-name' style={nameStyle}>{data.fullName}</h1>
          {data.profileTitle && <h2 style={s.profileTitle}>{data.profileTitle}</h2>}
          <div style={s.contactGrid}>
            <b>Address:</b><span className='resume-address'>{addressText}</span>
            <b>Mobile:</b><span className='resume-contact-detail'>{data.mobile}</span>
            {data.email && <><b>Email:</b><span className='resume-contact-detail'>{data.email}</span></>}
          </div>
        </div>
        {hasPhoto && (
          <div style={s.photoBox}>
            <img src={data.photo} alt="Profile" style={s.photo} />
          </div>
        )}
      </div>

      {data.careerObjective && (
        <div>
          <div style={s.sectionTitle}>CAREER OBJECTIVE</div>
          <p style={{ textAlign: 'justify', fontSize: 15 }}>{data.careerObjective}</p>
        </div>
      )}

      {data.qualifications.some(q => q.qualification) && (
        <div>
          <div style={s.sectionTitle}>ACADEMIC QUALIFICATION</div>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Sr. No.</th>
                <th style={s.th}>Qualification</th>
                <th style={s.th}>University / Board</th>
                <th style={s.th}>Year</th>
                <th style={s.th}>Percentage / CGPA</th>
              </tr>
            </thead>
            <tbody>
              {data.qualifications.filter(q => q.qualification).map((q, i) => (
                <tr key={i}>
                  <td style={s.tdCenter}>{i + 1}</td>
                  <td style={s.td}>{q.qualification}</td>
                  <td style={s.td}>{q.university}</td>
                  <td style={s.tdCenter}>{q.year}</td>
                  <td style={s.tdCenter}>{q.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.otherQualifications.some(o => o) && (
        <div>
          <div style={s.sectionTitle}>OTHER QUALIFICATION</div>
          <ul style={s.ul}>{data.otherQualifications.filter(o => o).map((o, i) => <li key={i} style={s.li}>{o}</li>)}</ul>
        </div>
      )}

      {data.experiences.some(e => e) && (
        <div>
          <div style={s.sectionTitle}>WORK EXPERIENCE</div>
          <ul style={s.ul}>{data.experiences.filter(e => e).map((e, i) => <li key={i} style={s.li}>{e}</li>)}</ul>
        </div>
      )}

      {data.customSections.filter(sec => sec.title && sec.items.some(item => item)).map((sec, i) => (
        <div key={i}>
          <div style={s.sectionTitle}>{sec.title.toUpperCase()}</div>
          <ul style={s.ul}>{sec.items.filter(item => item).map((item, j) => <li key={j} style={s.li}>{item}</li>)}</ul>
        </div>
      ))}

      {(data.fatherName || data.motherName || data.dob || data.gender || data.nationality || data.maritalStatus || data.languages || data.customPersonalDetails.length > 0) && (
        <div>
          <div style={s.sectionTitle}>PERSONAL DETAILS</div>
          <div style={s.detailsGrid}>
            {data.fatherName && <><div style={s.detailLabel}>Father's Name</div><div style={s.detailColon}>:</div><div>{data.fatherName}</div></>}
            {data.motherName && <><div style={s.detailLabel}>Mother's Name</div><div style={s.detailColon}>:</div><div>{data.motherName}</div></>}
            {data.dob && <><div style={s.detailLabel}>Date of Birth</div><div style={s.detailColon}>:</div><div>{formatDate(data.dob)}</div></>}
            {data.gender && <><div style={s.detailLabel}>Gender</div><div style={s.detailColon}>:</div><div>{data.gender}</div></>}
            {data.nationality && <><div style={s.detailLabel}>Nationality</div><div style={s.detailColon}>:</div><div>{data.nationality}</div></>}
            {data.maritalStatus && <><div style={s.detailLabel}>Marital Status</div><div style={s.detailColon}>:</div><div>{data.maritalStatus}</div></>}
            {data.languages && <><div style={s.detailLabel}>Languages Known</div><div style={s.detailColon}>:</div><div>{data.languages}</div></>}
            {data.customPersonalDetails.filter(d => d.key && d.value).map((d, i) => (
              <React.Fragment key={i}><div style={s.detailLabel}>{d.key}</div><div style={s.detailColon}>:</div><div>{d.value}</div></React.Fragment>
            ))}
          </div>
        </div>
      )}

      {data.declaration && (
        <div>
          <div style={s.sectionTitle}>DECLARATION</div>
          <p className='resume-declaration' style={s.declaration}>{data.declaration}</p>
        </div>
      )}

      <div style={s.footer}>
        <div>
          {data.date && <p style={{ margin: 0 }}><b>Date:</b> {formatDate(data.date)}</p>}
          {data.place && <p style={{ margin: 0 }}><b>Place:</b> {data.place}</p>}
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 15 }}>({data.fullName})</p>
        </div>
      </div>
    </div>
  );
}
