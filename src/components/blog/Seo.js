import {useEffect} from 'react';
import {SITE_URL} from '../../lib/blogUtils';

function setMeta(attribute, key, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export default function Seo({
  title,
  description,
  canonicalPath,
  image,
  type = 'website',
  robots = 'index, follow, max-image-preview:large',
  schemas = [],
}) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const socialImage = image || `${SITE_URL}/images/Social%20Logo.png`;

    document.title = title;
    document.documentElement.lang = 'en';
    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);
    setMeta('property', 'og:site_name', 'ResumeBiodata.in');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', socialImage);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', socialImage);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let structuredData = document.head.querySelector('#blog-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'blog-structured-data';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(schemas);

    return () => {
      document.head.querySelector('#blog-structured-data')?.remove();
    };
  }, [canonicalPath, description, image, robots, schemas, title, type]);

  return null;
}
