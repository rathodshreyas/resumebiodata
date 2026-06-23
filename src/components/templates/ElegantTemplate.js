import React from 'react';
import { formatDate, formatAddress } from './utils';

const DARK = '#744210';
const GOLD = '#d69e2e';
const LIGHT_GOLD = '#fefcbf';

const s = {
  page: { fontFamily: 'Georgia, serif', background: '#fffff0', minHeight: '297mm', color: DARK, fontSize: 15, lineHeight: 1.4 },
  header: { background: DARK, color: 'white', padding: '18px 28px 14px', textAlign: 'left' },
  cv: { fontSize: 14, letterSpacing: 2, color: LIGHT_GOLD, textTransform: 'uppercase', textAlign: 'center', marginBottom: 1 },
  name: { fontSize: 36, fontWeight: 700, fontFamily: 'Georgia, serif', marginBottom: 1 },
  profileTitle: { color: LIGHT_GOLD, fontSize: 16, marginBottom: 0 },
  headerLine: { borderBottom: `1px solid ${GOLD}`, margin: '4px 0' },
  contactRow: { display: 'grid', gap: 2, fontSize: 14, color: 'rgba(255,255,255,0.95)', marginTop: 2 },
  body: { padding: '18px 28px 22px' },
  sectionTitle: { color: DARK, fontWeight: 700, fontSize: 15, textTransform: 'uppercase', letterSpacing: 1, marginTop: 8, marginBottom: 4 },
  goldLine: { borderBottom: `1.5px solid ${GOLD}`, marginBottom: 4 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 6, fontSize: 14 },
  tableWrapper: { width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
  th: { padding: '4px 6px', background: '#fefcbf', fontWeight: 700, color: DARK, borderBottom: `2px solid ${GOLD}`, textAlign: 'left', fontSize: 14 },
  td: { padding: '4px 6px', borderBottom: `1px solid ${LIGHT_GOLD}`, fontSize: 14 },
  tdCenter: { padding: '4px 6px', borderBottom: `1px solid ${LIGHT_GOLD}`, textAlign: 'center', fontSize: 14 },
  ul: { margin: '0 0 3px 16px', padding: 0 },
  li: { marginBottom: 2, fontSize: 15 },
  detailsGrid: { display: 'grid', gridTemplateColumns: 'minmax(110px, max-content) 10px minmax(120px, 1fr)', gap: '3px 8px', fontSize: '11.5pt', alignItems: 'start' },
  detailLabel: { textAlign: 'left', paddingRight: 3, whiteSpace: 'nowrap' },
  detailColon: { textAlign: 'center' },
  footer: { display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', marginTop: 8, minHeight: 54, padding: '0 8px 4px', background: 'transparent', color: DARK, fontSize: 14 },
  declaration: { fontStyle: 'italic', fontSize: 15 },
};

export default function ElegantTemplate({ data }) {
  const addressText = formatAddress(data.address);
  const nameStyle = s.name;
  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.cv}>RESUME</div>
        <div style={s.headerLine} />
        <div className='resume-person-name' style={nameStyle}>{data.fullName}</div>
        {data.profileTitle && <div style={s.profileTitle}>{data.profileTitle}</div>}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={s.contactRow}>
              <div className='resume-address'><b>Address:</b> <span style={{ whiteSpace: 'pre-line' }}>{addressText}</span></div>
              <div className='resume-contact-detail'><b>Mobile:</b> {data.mobile}</div>
              {data.email && <div className='resume-contact-detail'><b>Email:</b> {data.email}</div>}
            </div>
          </div>
          <div style={{ minWidth: 85, flexShrink: 0 }}>
            {data.photo && <img className="elegant-photo" src={data.photo} alt="Profile" style={{ width: 75, height: 95, objectFit: 'cover', border: `2px solid ${GOLD}`, display: 'block', marginBottom: 4 }} />}
          </div>
        </div>
      </div>

      <div style={s.body}>
        {data.careerObjective && (
          <>
            <div style={s.sectionTitle}>Career Objective</div>
            <div style={s.goldLine} />
            <p style={{ textAlign: 'justify', marginBottom: 6 }}>{data.careerObjective}</p>
          </>
        )}

        {data.qualifications.some(q => q.qualification) && (
          <>
            <div style={s.sectionTitle}>Academic Qualification</div>
            <div style={s.goldLine} />
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
            <div style={s.goldLine} />
            <ul style={s.ul}>{data.otherQualifications.filter(o => o).map((o, i) => <li key={i} style={s.li}>{o}</li>)}</ul>
          </>
        )}

        {data.experiences.some(e => e) && (
          <>
            <div style={s.sectionTitle}>Work Experience</div>
            <div style={s.goldLine} />
            <ul style={s.ul}>{data.experiences.filter(e => e).map((e, i) => <li key={i} style={s.li}>{e}</li>)}</ul>
          </>
        )}

        {data.customSections.filter(sec => sec.title && sec.items.some(item => item)).map((sec, i) => (
          <div key={i}>
            <div style={s.sectionTitle}>{sec.title}</div>
            <div style={s.goldLine} />
            <ul style={s.ul}>{sec.items.filter(item => item).map((item, j) => <li key={j} style={s.li}>{item}</li>)}</ul>
          </div>
        ))}

        {(data.fatherName || data.motherName || data.dob || data.gender || data.nationality || data.maritalStatus || data.languages || data.customPersonalDetails.length > 0) && (
          <div>
            <div style={s.sectionTitle}>Personal Details</div>
            <div style={s.goldLine} />
            <div style={s.detailsGrid}>
              {data.fatherName && <><div style={s.detailLabel}>Father&apos;s Name</div><div style={s.detailColon}>:</div><div>{data.fatherName}</div></>}
              {data.motherName && <><div style={s.detailLabel}>Mother&apos;s Name</div><div style={s.detailColon}>:</div><div>{data.motherName}</div></>}
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
          <>
            <div style={s.sectionTitle}>Declaration</div>
            <div style={s.goldLine} />
            <p className='resume-declaration' style={s.declaration}>{data.declaration}</p>
          </>
        )}

        <div style={s.footer}>
          <div>
            {data.date && <p style={{ margin: 0, minWidth: 180, padding: '2px 0', whiteSpace: 'nowrap' }}><b>Date:</b> {formatDate(data.date)}</p>}
            {data.place && <p style={{ margin: 0 }}><b>Place:</b> {data.place}</p>}
          </div>
          <div><p style={{ margin: 0 }}>({data.fullName})</p></div>
        </div>
      </div>
    </div>
  );
}



