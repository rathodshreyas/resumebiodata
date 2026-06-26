import {Helmet} from 'react-helmet-async';
import {SITE_URL} from '../../lib/blogUtils';

export default function Seo({
  title,
  description,
  canonicalPath,
  image,
  type = 'website',
  robots = 'index, follow, max-image-preview:large',
  keywords = '',
  schemas = [],
}) {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const socialImage = image || `${SITE_URL}/images/Social%20Logo.png`;
  const baseSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ResumeBiodata.in',
      url: SITE_URL,
      logo: `${SITE_URL}/images/Navbar%20Logo.png`,
      email: 'support@resumebiodata.in',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ResumeBiodata.in',
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/blog?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];
  const pageSchemas = Array.isArray(schemas) ? schemas.filter(Boolean) : [schemas].filter(Boolean);
  const schemaItems = [...baseSchemas, ...pageSchemas];

  return (
    <Helmet htmlAttributes={{lang: 'en'}}>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" href="/images/Favicon.png" type="image/png" />
      <link rel="apple-touch-icon" href="/images/Favicon.png" />
      <link rel="manifest" href="/manifest.json" />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="ResumeBiodata.in" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="ResumeBiodata.in resume builder preview" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content="ResumeBiodata.in resume builder preview" />

      {schemaItems.map((schema, index) => (
        <script type="application/ld+json" key={`schema-${index}`}>
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
