import React from 'react';
import { formatDate, formatAddress } from './utils';

const s = {
  // âš ï¸ A4 à¤¸à¤¾à¤ˆà¤œ à¤«à¤¿à¤•à¥à¤¸ à¤ à¥‡à¤µà¤²à¥€ à¤†à¤¹à¥‡ à¤œà¥‡à¤£à¥‡à¤•à¤°à¥‚à¤¨ à¤®à¥à¤–à¥à¤¯ à¥²à¤ªà¤šà¥‡ Scaling à¤®à¥…à¤¥ à¤ªà¤°à¤«à¥‡à¤•à¥à¤Ÿ à¤•à¤¾à¤® à¤•à¤°à¥‡à¤²
  page: { 
    fontFamily: "'Times New Roman', serif", 
    fontSize: 15, 
    padding: '30px 34px 32px', 
    background: 'white', 
    width: '210mm',      // à¤«à¤¿à¤•à¥à¤¸ A4 à¤°à¥à¤‚à¤¦à¥€
    minHeight: '297mm',  // à¤«à¤¿à¤•à¥à¤¸ A4 à¤²à¤¾à¤‚à¤¬à¥€
    color: '#1a1a1a', 
    lineHeight: 1.45,
    boxSizing: 'border-box',
    margin: '0 auto'
  },
  title: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', textDecoration: 'underline', marginBottom: 10, letterSpacing: 2 },
  headerGrid: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, marginBottom: 8, alignItems: 'flex-start' },
  headerGridNoPhoto: { marginBottom: 8 },
  name: { fontSize: 52, fontWeight: 'bold', margin: 0 },
  subtitle: { fontSize: 16, color: '#444', margin: '2px 0 2px' },
  contactBlock: { display: 'grid', gap: 4, fontSize: 14, marginTop: 2 },
  contactRow: { display: 'flex', alignItems: 'flex-start', marginBottom: 4 },
  contactLabel: { fontWeight: 'bold', width: 70, minWidth: 70 },
  contactValue: { display: 'inline', whiteSpace: 'pre-line', lineHeight: 1.4, overflowWrap: 'break-word', wordBreak: 'break-word' },
  photoWrapper: { width: 120, minWidth: 120, maxWidth: 120, height: 150, overflow: 'hidden', border: '1px solid #ccc', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  photo: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  sectionTitle: { background: '#e0e0e0', padding: '4px 8px', fontWeight: 'bold', marginTop: 9, marginBottom: 5, fontSize: 15, borderBottom: '1px solid #bbb' },
  table: { width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', marginBottom: 12, fontSize: 14 },
  tableWrapper: { width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
  th: { border: '1px solid #ccc', padding: '5px 4px', background: '#f0f0f0', fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', wordBreak: 'break-word' },
  td: { border: '1px solid #ccc', padding: '5px 4px', textAlign: 'left', wordBreak: 'break-word' },
  tdCenter: { border: '1px solid #ccc', padding: '5px 4px', textAlign: 'center', wordBreak: 'break-word' },
  yearCell: { whiteSpace: 'nowrap', wordBreak: 'normal', overflowWrap: 'normal' },
  ul: { margin: '0 0 10px 20px', padding: 0, fontSize: 15 },
  li: { marginBottom: 2 },
  detailsGrid: { display: 'grid', gridTemplateColumns: 'max-content 12px minmax(140px, 1fr)', gap: '4px 12px', fontSize: '11.5pt', marginBottom: 4, alignItems: 'center' },
  detailRow: { display: 'contents' },
  detailLabel: { textAlign: 'left', fontWeight: 'bold', whiteSpace: 'nowrap', minWidth: 0 },
  detailColon: { textAlign: 'center', width: 12 },
  detailValue: { minWidth: 0, overflowWrap: 'anywhere', wordBreak: 'break-word' },
  bold: { fontWeight: 'bold' },
  declaration: { fontStyle: 'italic', fontSize: 15, marginTop: 4 },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12, paddingTop: 4 },
};

export default function ClassicTemplate({ data }) {
  const hasPhoto = !!data.photo;
  const addressText = formatAddress(data.address);
  const nameStyle = s.name;

  return (
    <div style={s.page}>
      <div style={s.title}>RESUME</div>
      <div style={hasPhoto ? s.headerGrid : s.headerGridNoPhoto} className={hasPhoto ? 'classic-header-grid' : undefined}>
        <div>
          <div className='resume-person-name' style={nameStyle}>{data.fullName}</div>
          {data.profileTitle && <div style={s.subtitle}>{data.profileTitle}</div>}
          
          <div style={s.contactBlock}>
            {/* à¥²à¤¡à¥à¤°à¥‡à¤¸ à¥ªà¥«% à¤µà¤¿à¤¡à¥à¤¥ à¤†à¤£à¤¿ à¤ªà¤°à¤«à¥‡à¤•à¥à¤Ÿ à¤‡à¤¨à¤²à¤¾à¤ˆà¤¨ à¤«à¥à¤²à¥‹ */}
            <div className='resume-address' style={{ maxWidth: '70%', lineHeight: 1.45 }}>
              <b>Address: </b>
              <span style={s.contactValue}>{addressText}</span>
            </div>
            <div className='resume-contact-detail'><b>Mobile:</b> {data.mobile}</div>
            {data.email && <div className='resume-contact-detail'><b>Email:</b> {data.email}</div>}
          </div>
        </div>
        {hasPhoto && (
          <div style={s.photoWrapper}>
            <img className="classic-photo" src={data.photo} alt="Profile" style={s.photo} />
          </div>
        )}
      </div>

      {data.careerObjective && (
        <>
          <div style={s.sectionTitle}>CAREER OBJECTIVE</div>
          <p style={{ textAlign: 'justify', fontSize: 15, marginBottom: 6 }}>{data.careerObjective}</p>
        </>
      )}

      {data.qualifications.some(q => q.qualification) && (
        <>
          <div style={s.sectionTitle}>ACADEMIC QUALIFICATION</div>
          <div style={s.tableWrapper}>
            <table style={s.table}>
              <colgroup>
                <col style={{ width: '7%' }} />
                <col style={{ width: '22%' }} />
                <col style={{ width: '46%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '15%' }} />
              </colgroup>
              <thead>
                <tr>
                  {['Sr. No.', 'Qualification', 'University / Board', 'Year', 'Percentage / CGPA'].map(h => (
                    <th key={h} style={h === 'Year' ? { ...s.th, ...s.yearCell } : s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.qualifications.filter(q => q.qualification).map((q, i) => (
                  <tr key={i}>
                    <td style={s.tdCenter}>{i + 1}</td>
                    <td style={s.td}>{q.qualification}</td>
                    <td style={s.td}>{q.university}</td>
                    <td style={{ ...s.tdCenter, ...s.yearCell }}>{q.year}</td>
                    <td style={s.tdCenter}>{q.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {data.otherQualifications.some(o => o) && (
        <>
          <div style={s.sectionTitle}>OTHER QUALIFICATION</div>
          <ul style={s.ul}>{data.otherQualifications.filter(o => o).map((o, i) => <li key={i} style={s.li}>{o}</li>)}</ul>
        </>
      )}

      {data.experiences.some(e => e) && (
        <>
          <div style={s.sectionTitle}>WORK EXPERIENCE</div>
          <ul style={s.ul}>{data.experiences.filter(e => e).map((e, i) => <li key={i} style={s.li}>{e}</li>)}</ul>
        </>
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
          <div style={s.detailsGrid} className="classic-details-grid">
            {data.fatherName && (
              <div style={s.detailRow} className="classic-detail-row">
                <div style={s.detailLabel}>Father's Name</div>
                <div style={s.detailColon}>:</div>
                <div style={s.detailValue}>{data.fatherName}</div>
              </div>
            )}
            {data.motherName && (
              <div style={s.detailRow} className="classic-detail-row">
                <div style={s.detailLabel}>Mother's Name</div>
                <div style={s.detailColon}>:</div>
                <div style={s.detailValue}>{data.motherName}</div>
              </div>
            )}
            {data.dob && (
              <div style={s.detailRow} className="classic-detail-row">
                <div style={s.detailLabel}>Date of Birth</div>
                <div style={s.detailColon}>:</div>
                <div style={s.detailValue}>{formatDate(data.dob)}</div>
              </div>
            )}
            {data.gender && (
              <div style={s.detailRow} className="classic-detail-row">
                <div style={s.detailLabel}>Gender</div>
                <div style={s.detailColon}>:</div>
                <div style={s.detailValue}>{data.gender}</div>
              </div>
            )}
            {data.nationality && (
              <div style={s.detailRow} className="classic-detail-row">
                <div style={s.detailLabel}>Nationality</div>
                <div style={s.detailColon}>:</div>
                <div style={s.detailValue}>{data.nationality}</div>
              </div>
            )}
            {data.maritalStatus && (
              <div style={s.detailRow} className="classic-detail-row">
                <div style={s.detailLabel}>Marital Status</div>
                <div style={s.detailColon}>:</div>
                <div style={s.detailValue}>{data.maritalStatus}</div>
              </div>
            )}
            {data.languages && (
              <div style={s.detailRow} className="classic-detail-row">
                <div style={s.detailLabel}>Languages Known</div>
                <div style={s.detailColon}>:</div>
                <div style={s.detailValue}>{data.languages}</div>
              </div>
            )}
            {data.customPersonalDetails.filter(d => d.key && d.value).map((d, i) => (
              <div key={i} style={s.detailRow} className="classic-detail-row">
                <div style={s.detailLabel}>{d.key}</div>
                <div style={s.detailColon}>:</div>
                <div style={s.detailValue}>{d.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.declaration && (
        <>
          <div style={s.sectionTitle}>DECLARATION</div>
          <p className='resume-declaration' style={s.declaration}>{data.declaration}</p>
        </>
      )}

      <div style={s.footer}>
        <div>
          {data.date && <p style={{ margin: 0 }}><b>Date:</b> {formatDate(data.date)}</p>}
          {data.place && <p style={{ margin: 0 }}><b>Place:</b> {data.place}</p>}
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 0', fontSize: 15 }}>({data.fullName})</p>
        </div>
      </div>
    </div>
  );
}




