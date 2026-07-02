const fs = require('node:fs/promises');
const path = require('node:path');

const SITE_URL = (process.env.SITE_URL || 'https://resumebiodata.in').replace(/\/$/, '');
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

const escapeXml = (value) =>
  String(value).replace(/[<>&"']/g, (character) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  })[character]);

const toDate = (value) => new Date(value).toISOString().slice(0, 10);

async function generateSitemap() {
  const projectId = process.env.REACT_APP_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.REACT_APP_SANITY_DATASET?.trim();
  const apiVersion = process.env.REACT_APP_SANITY_API_VERSION?.trim();

  if (!projectId || !dataset || !apiVersion) {
    throw new Error(
      'Missing REACT_APP_SANITY_PROJECT_ID, REACT_APP_SANITY_DATASET, or REACT_APP_SANITY_API_VERSION.'
    );
  }

  const {createClient} = await import('@sanity/client');
  const client = createClient({projectId, dataset, apiVersion, useCdn: false});
  const posts = await client.fetch(`
    *[
      _type == "post" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current) &&
      defined(publishedAt) &&
      publishedAt <= now()
    ] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }
  `);

  const currentSitemap = await fs.readFile(SITEMAP_PATH, 'utf8');
  const staticEntries = [...currentSitemap.matchAll(/<url>\s*([\s\S]*?)\s*<\/url>/g)]
    .map((match) => match[0].trim())
    .filter((entry) => {
      const location = entry.match(/<loc>(.*?)<\/loc>/)?.[1];
      return location && !location.startsWith(`${SITE_URL}/blog/`);
    });

  const articleEntries = posts.map(({slug, publishedAt, _updatedAt}) => {
    const encodedSlug = slug.split('/').map(encodeURIComponent).join('/');
    const location = escapeXml(`${SITE_URL}/blog/${encodedSlug}`);
    const lastModified = toDate(_updatedAt || publishedAt);
    return `  <url><loc>${location}</loc><lastmod>${lastModified}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
  });

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries.map((entry) => `  ${entry}`),
    ...articleEntries,
    '</urlset>',
    '',
  ].join('\n');

  await fs.writeFile(SITEMAP_PATH, sitemap, 'utf8');
  console.log(`Sitemap updated with ${posts.length} published blog article(s).`);
}

generateSitemap().catch((error) => {
  console.error('Failed to generate sitemap:', error.message);
  process.exitCode = 1;
});
