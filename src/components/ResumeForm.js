import React, { useState } from 'react';

function ResumeForm({ initialData, onSubmit }) {
  const [data, setData] = useState(initialData);
  const [photoError, setPhotoError] = useState('');

  const update = (field, value) => setData(prev => ({ ...prev, [field]: value }));

  // Qualifications
  const addQual = () => update('qualifications', [...data.qualifications, { qualification: '', university: '', year: '', percentage: '' }]);
  const updateQual = (i, field, value) => {
    const q = [...data.qualifications];
    q[i] = { ...q[i], [field]: value };
    update('qualifications', q);
  };
  const removeQual = (i) => update('qualifications', data.qualifications.filter((_, idx) => idx !== i));

  // Other qualifications
  const addOther = () => update('otherQualifications', [...data.otherQualifications, '']);
  const updateOther = (i, v) => { const a = [...data.otherQualifications]; a[i] = v; update('otherQualifications', a); };
  const removeOther = (i) => update('otherQualifications', data.otherQualifications.filter((_, idx) => idx !== i));

  // Experience
  const addExp = () => update('experiences', [...data.experiences, '']);
  const updateExp = (i, v) => { const a = [...data.experiences]; a[i] = v; update('experiences', a); };
  const removeExp = (i) => update('experiences', data.experiences.filter((_, idx) => idx !== i));

  // Custom personal details
  const addCustomDetail = () => update('customPersonalDetails', [...data.customPersonalDetails, { key: '', value: '' }]);
  const updateCustomDetail = (i, field, v) => { const a = [...data.customPersonalDetails]; a[i] = { ...a[i], [field]: v }; update('customPersonalDetails', a); };
  const removeCustomDetail = (i) => update('customPersonalDetails', data.customPersonalDetails.filter((_, idx) => idx !== i));

  // Custom sections
  const addCustomSection = () => update('customSections', [...data.customSections, { title: '', items: [''] }]);
  const updateCustomSectionTitle = (i, v) => { const a = [...data.customSections]; a[i] = { ...a[i], title: v }; update('customSections', a); };
  const addCustomSectionItem = (si) => { const a = [...data.customSections]; a[si].items.push(''); update('customSections', a); };
  const updateCustomSectionItem = (si, ii, v) => { const a = [...data.customSections]; a[si].items[ii] = v; update('customSections', a); };
  const removeCustomSectionItem = (si, ii) => { const a = [...data.customSections]; a[si].items = a[si].items.filter((_, idx) => idx !== ii); update('customSections', a); };
  const removeCustomSection = (i) => update('customSections', data.customSections.filter((_, idx) => idx !== i));

  // Photo
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setPhotoError('Please choose a JPG, PNG, or WebP image.');
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setPhotoError('Please choose an image smaller than 5 MB.');
        e.target.value = '';
        return;
      }
      setPhotoError('');
      const reader = new FileReader();
      reader.onload = (ev) => update('photo', ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form className="form-page" aria-describedby="resume-form-intro" onSubmit={handleSubmit}>
      <div className="form-card">
        <h1>Fill Your Resume Details</h1>
        <p id="resume-form-intro">Enter your information below. You can choose a template on the next step.</p>

        {/* Personal Info */}
        <div className="form-section">
          <div className="section-title">Personal Information</div>
          <div className="form-row cols-2">
            <div className="form-group">
              <label htmlFor="full-name">Full Name *</label>
              <input id="full-name" type="text" autoComplete="name" maxLength="100" placeholder="Full name" value={data.fullName} onChange={e => update('fullName', e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="profile-title">Profile / Job Title</label>
              <input id="profile-title" type="text" placeholder="Profile / Job Title" value={data.profileTitle} onChange={e => update('profileTitle', e.target.value)} />
            </div>
          </div>
          <div className="form-group" style={{marginBottom:12}}>
            <label htmlFor="profile-photo">Profile Photo</label>
            <input id="profile-photo" type="file" accept="image/png,image/jpeg,image/webp" onChange={handlePhoto} />
            {photoError && <p className="field-error" role="alert">{photoError}</p>}
          </div>
        </div>

        {/* Contact */}
        <div className="form-section">
          <div className="section-title">Contact Information</div>
          <div className="form-group" style={{marginBottom:12}}>
            <label htmlFor="address">Address</label>
            <textarea id="address" autoComplete="street-address" placeholder="Full address" value={data.address} onChange={e => update('address', e.target.value)} rows={2} />
          </div>
          <div className="form-row cols-2">
            <div className="form-group">
              <label htmlFor="mobile">Mobile *</label>
              <input id="mobile" type="tel" autoComplete="tel" inputMode="tel" pattern="[+0-9 ()-]{7,20}" title="Enter a valid phone number using 7 to 20 digits and common phone symbols" placeholder="Mobile number" value={data.mobile} onChange={e => update('mobile', e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" autoComplete="email" placeholder="name@example.com" value={data.email} onChange={e => update('email', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Career Objective */}
        <div className="form-section">
          <div className="section-title">Career Objective</div>
          <textarea rows={4} aria-label="Career objective" placeholder="Write a concise career objective" value={data.careerObjective} onChange={e => update('careerObjective', e.target.value)} />
        </div>

        {/* Academic Qualifications */}
        <div className="form-section">
          <div className="section-title">Academic Qualification</div>
          {data.qualifications.map((q, i) => (
            <div className="qual-row" key={i}>
              <input type="text" aria-label={`Qualification ${i + 1}`} placeholder="Qualification" value={q.qualification} onChange={e => updateQual(i, 'qualification', e.target.value)} />
              <input type="text" aria-label={`University or board ${i + 1}`} placeholder="University / Board" value={q.university} onChange={e => updateQual(i, 'university', e.target.value)} />
              <input type="text" inputMode="numeric" aria-label={`Passing year ${i + 1}`} placeholder="Year" value={q.year} onChange={e => updateQual(i, 'year', e.target.value)} />
              <input type="text" aria-label={`Percentage or CGPA ${i + 1}`} placeholder="% / CGPA" value={q.percentage} onChange={e => updateQual(i, 'percentage', e.target.value)} />
              <button type="button" className="btn-danger" aria-label={`Remove qualification ${i + 1}`} onClick={() => removeQual(i)}>✕</button>
            </div>
          ))}
          <button type="button" className="btn-success" onClick={addQual}>+ Add Qualification</button>
        </div>

        {/* Other Qualifications */}
        <div className="form-section">
          <div className="section-title">Other Qualifications</div>
          {data.otherQualifications.map((o, i) => (
            <div className="dynamic-row" key={i}>
              <input type="text" aria-label={`Other qualification ${i + 1}`} placeholder="e.g. MS-CIT, Tally" value={o} onChange={e => updateOther(i, e.target.value)} />
              <button type="button" className="btn-danger" aria-label={`Remove other qualification ${i + 1}`} onClick={() => removeOther(i)}>✕</button>
            </div>
          ))}
          <button type="button" className="btn-success" onClick={addOther}>+ Add</button>
        </div>

        {/* Work Experience */}
        <div className="form-section">
          <div className="section-title">Work Experience</div>
          {data.experiences.map((ex, i) => (
            <div className="dynamic-row" key={i}>
              <input type="text" aria-label={`Work experience ${i + 1}`} placeholder="Describe your experience" value={ex} onChange={e => updateExp(i, e.target.value)} />
              <button type="button" className="btn-danger" aria-label={`Remove work experience ${i + 1}`} onClick={() => removeExp(i)}>✕</button>
            </div>
          ))}
          <button type="button" className="btn-success" onClick={addExp}>+ Add Experience</button>
        </div>

        {/* Custom Sections */}
        <div className="form-section">
          <div className="section-title">Custom Sections (Skills, Hobbies, etc.)</div>
          {data.customSections.map((sec, si) => (
            <div className="custom-section-block" key={si}>
              <div className="custom-section-header">
                <input type="text" aria-label={`Custom section ${si + 1} title`} placeholder="Section title, such as Skills" value={sec.title} onChange={e => updateCustomSectionTitle(si, e.target.value)} />
                <button type="button" className="btn-danger" onClick={() => removeCustomSection(si)}>Remove</button>
              </div>
              {sec.items.map((item, ii) => (
                <div className="dynamic-row" key={ii}>
                  <input type="text" aria-label={`Custom section ${si + 1} item ${ii + 1}`} placeholder="Section item" value={item} onChange={e => updateCustomSectionItem(si, ii, e.target.value)} />
                  <button type="button" className="btn-danger" aria-label={`Remove custom section item ${ii + 1}`} onClick={() => removeCustomSectionItem(si, ii)}>✕</button>
                </div>
              ))}
              <button type="button" className="btn-success" onClick={() => addCustomSectionItem(si)}>+ Add Item</button>
            </div>
          ))}
          <button type="button" className="btn-blue" onClick={addCustomSection}>+ Add Custom Section</button>
        </div>

        {/* Personal Details */}
        <div className="form-section">
          <div className="section-title">Personal Details</div>
          <div className="form-row cols-2">
            <div className="form-group">
              <label htmlFor="father-name">Father's Name</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input id="father-name" type="text" placeholder="Father's name" value={data.fatherName} onChange={e => update('fatherName', e.target.value)} />
                <button type="button" className="btn-danger" aria-label="Clear father's name" style={{ height: 32, padding: '0 10px' }} onClick={() => update('fatherName', '')}>✕</button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="mother-name">Mother's Name</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input id="mother-name" type="text" placeholder="Mother's name" value={data.motherName} onChange={e => update('motherName', e.target.value)} />
                <button type="button" className="btn-danger" aria-label="Clear mother's name" style={{ height: 32, padding: '0 10px' }} onClick={() => update('motherName', '')}>✕</button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="date-of-birth">Date of Birth</label>
              <input id="date-of-birth" type="date" value={data.dob} onChange={e => update('dob', e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" value={data.gender} onChange={e => update('gender', e.target.value)}>
                <option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="marital-status">Marital Status</label>
              <select id="marital-status" value={data.maritalStatus} onChange={e => update('maritalStatus', e.target.value)}>
                <option value="">Select status</option><option>Unmarried</option><option>Married</option><option>Widowed</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="nationality">Nationality</label>
              <input id="nationality" type="text" placeholder="Nationality" value={data.nationality} onChange={e => update('nationality', e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="languages">Languages Known</label>
              <input id="languages" type="text" placeholder="Languages known" value={data.languages} onChange={e => update('languages', e.target.value)} />
            </div>
          </div>
          <div style={{marginTop:12}}>
            <div className="section-title" style={{fontSize:'0.7rem'}}>Extra Details</div>
            {data.customPersonalDetails.map((d, i) => (
              <div className="custom-detail-row" key={i}>
                <input type="text" aria-label={`Extra detail ${i + 1} label`} placeholder="Label, such as Religion" value={d.key} onChange={e => updateCustomDetail(i, 'key', e.target.value)} />
                <input type="text" aria-label={`Extra detail ${i + 1} value`} placeholder="Value" value={d.value} onChange={e => updateCustomDetail(i, 'value', e.target.value)} />
                <button type="button" className="btn-danger" aria-label={`Remove extra detail ${i + 1}`} onClick={() => removeCustomDetail(i)}>✕</button>
              </div>
            ))}
            <button type="button" className="btn-success" onClick={addCustomDetail}>+ Add Item</button>
          </div>
        </div>

        {/* Declaration */}
        <div className="form-section">
          <div className="section-title">Declaration</div>
          <textarea rows={3} aria-label="Declaration" value={data.declaration} onChange={e => update('declaration', e.target.value)} />
          <div className="form-row cols-2" style={{marginTop:12}}>
            <div className="form-group">
              <label htmlFor="declaration-place">Place</label>
              <input id="declaration-place" type="text" placeholder="City name" value={data.place} onChange={e => update('place', e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="declaration-date">Date</label>
              <input id="declaration-date" type="date" value={data.date} onChange={e => update('date', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="form-submit-area">
          <button type="submit" className="btn-primary">Next: Choose Template →</button>
        </div>
      </div>
    </form>
  );
}

export default ResumeForm;
