# ResumeBiodata.in

ResumeBiodata.in is a browser-based React resume builder. Users can enter professional details, compare three A4 templates, preview the result, and download a PDF.

## Local development

```bash
npm install
npm start
```

## Production verification

```bash
npm run build
npm test -- --watchAll=false
```

The production output is written to `build/`. Vercel configuration includes clean public routes, cache rules, HTTPS security headers, and a Content Security Policy compatible with the current site and future Google advertising tags.

## Public pages

- `/` — home and original resume guidance
- `/resume-builder` — resume creation workflow
- `/blog` — resume and career guides
- `/about`
- `/contact`
- `/privacy-policy`
- `/terms-and-conditions`
- `/disclaimer`

`robots.txt`, `sitemap.xml`, the web app manifest, favicon, and static 404 page are stored in `public/`.

## Privacy

Resume details and uploaded photos are processed in the browser to generate the preview and PDF. The app does not require an account or intentionally send resume contents to an application server.

## Sanity-powered blog

The `/blog` and `/blog/:slug` pages read published posts from Sanity using a public CDN client. The resume builder remains on Create React App and its existing form, templates, preview, and PDF flow are unchanged.

See [SANITY_BLOG_SETUP.md](./SANITY_BLOG_SETUP.md) for environment variables, CORS configuration, schemas, publishing, deployment, SEO, and AdSense guidance.