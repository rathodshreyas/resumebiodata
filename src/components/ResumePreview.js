import React, { forwardRef } from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

const templateMap = {
  classic: ClassicTemplate,
  elegant: ElegantTemplate,
  minimal: MinimalTemplate,
};

const ResumePreview = forwardRef(({ data, templateId, fontClass }, ref) => {
  const Template = templateMap[templateId] || ClassicTemplate;
  const cls = `resume-page-preview ${fontClass || 'font-normal'}`;
  return (
    <div ref={ref} className={cls}>
      <Template data={data} />
    </div>
  );
});

export default ResumePreview;
