# Sanity Blog Setup (Create React App)

The resume builder remains on Create React App. Sanity is used only as a public, read-only content source for `/blog` and `/blog/:slug`.

## 1. Environment variables

Copy `.env.example` to `.env.local` in the project root:

```env
REACT_APP_SANITY_PROJECT_ID=i3f05hhs
REACT_APP_SANITY_DATASET=production
REACT_APP_SANITY_API_VERSION=2026-06-22
```

Restart `npm start` after changing local environment variables. Create React App embeds `REACT_APP_*` values at build time, so do not put a write token or any secret in these variables.

In Vercel, open **Project Settings → Environment Variables**, add the same three variables for Production, Preview, and Development, then redeploy.

## 2. Allow the website to read Sanity

In Sanity Manage, open project `i3f05hhs`, then **API → CORS origins**. Add these origins without credentials:

- `https://resumebiodata.in`
- `https://www.resumebiodata.in`
- `http://localhost:3000` for local development

The `production` dataset must permit public reads because the website intentionally uses a token-free client and the Sanity CDN.

## 3. Add the schemas to the existing Sanity Studio

This repository includes production schemas in `sanity/schemaTypes/`:

- `author.js`
- `category.js`
- `post.js`
- `index.js`

Copy that folder into the existing Studio, or import `schemaTypes` from its `index.js` into the Studio's `sanity.config.js`:

```js
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  // existing projectId, dataset, plugins, and other configuration
  schema: {types: schemaTypes},
})
```

Run the existing Studio locally to verify the forms, then deploy that Studio/schema using its normal Sanity deployment workflow.

## 4. Create and publish the first article

1. Create an **Author**, enter the name and biography, generate the slug, and publish it.
2. Create a **Category**, enter its title and description, generate the slug, and publish it.
3. Create a **Post**.
4. Enter the title and generate the post slug.
5. Write a unique 60–220 character description.
6. Upload the featured image and write meaningful alternative text.
7. Select the published author and category.
8. Set the published date and write the Portable Text body.
9. Leave Reading Time empty to let the website calculate it automatically, or enter an override.
10. Complete the SEO title, SEO description, and keywords. Mark Featured when the post should appear in Popular Posts.
11. Click **Publish**. Drafts are never returned by the website's `published` perspective.

Published content appears automatically after the Sanity CDN cache refresh. No website redeploy is required for article content changes.

## 5. Local verification

```bash
npm install
npm start
```

Verify:

- `/blog` loads published posts, search, categories, sidebar, and pagination.
- `/blog/your-post-slug` loads the article, metadata, Portable Text, related posts, and previous/next navigation.
- An unknown slug displays the blog 404 state.
- Missing or blocked Sanity configuration displays a retryable error without affecting the resume builder.

Create React App production verification remains:

```bash
npm run build
```

## 6. Vercel deployment

The existing `vercel.json` still uses `framework: create-react-app`, `npm run build`, and the `build/` output directory. Its rewrite for `/blog/:slug*` lets direct article links load the SPA. Push the changes or trigger a Vercel deployment after adding the environment variables.

No API route, server, token, or authentication layer is required for blog reads.

## 7. SEO and Google indexing

The blog index and each article set their own title, description, canonical URL, robots directive, Open Graph tags, Twitter Card tags, Article schema, and breadcrumb schema. Article links are ordinary crawlable anchors, `/blog` is already in `public/sitemap.xml`, and direct article URLs resolve through Vercel.

Google can discover the blog from the site's Guides link and `/blog` sitemap entry, render the CRA page, follow article links, and index the rendered title, body, metadata, and structured data. After publishing the first articles:

1. Submit `https://resumebiodata.in/sitemap.xml` in Google Search Console.
2. Inspect important article URLs and request indexing.
3. Keep titles, descriptions, image alt text, author information, and article bodies original and useful.
4. Avoid changing a published slug; if it must change, add a redirect in Vercel.

This is client-rendered SEO within the requested no-server CRA architecture. Search engines that do not execute JavaScript may see the static site-level metadata rather than article-specific metadata; server rendering or prerendering can be evaluated separately without coupling it to this Sanity integration.

## 8. Google AdSense readiness

The blog uses semantic articles, headings, dates, author/category information, internal navigation, accessible images, and stable content areas. Existing About, Contact, Privacy Policy, Terms, and Disclaimer pages remain unchanged. No ad placement or AdSense script was added; add ads only after the site has sufficient original published content and place them without obscuring navigation or article text.
