import React from 'react';
import {Helmet} from 'react-helmet-async';
import {resumeBuilderFaqs} from './FAQSection';
import {SITE_URL} from '../lib/seoConfig';

function ToolSchema() {
  const toolUrl = `${SITE_URL}/resume-builder`;
  const schemas = [
    {'@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: resumeBuilderFaqs.map(({question, answer}) => ({'@type': 'Question', name: question, acceptedAnswer: {'@type': 'Answer', text: answer}}))},
    {'@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL},
      {'@type': 'ListItem', position: 2, name: 'Resume Builder', item: toolUrl},
    ]},
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication',
      name: 'ResumeBiodata.in Free Resume Builder', url: toolUrl,
      applicationCategory: 'BusinessApplication', applicationSubCategory: 'Resume Builder',
      operatingSystem: 'Any', browserRequirements: 'Requires JavaScript and a modern web browser',
      description: 'Create a professional resume online, preview it, and download a high-quality PDF for free.',
      offers: {'@type': 'Offer', price: '0', priceCurrency: 'INR'},
    },
  ];

  return (
    <Helmet>
      {schemas.map((schema) => <script type="application/ld+json" key={schema['@type']}>{JSON.stringify(schema)}</script>)}
    </Helmet>
  );
}

export default ToolSchema;
