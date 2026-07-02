# Automatic deployment after Sanity content changes

Flow: Sanity published post change -> Sanity webhook -> Vercel Deploy Hook -> npm run build -> sitemap generation -> CRA build -> production deployment.

No additional npm package is required.

## 1. Verify the Vercel project

Commit and push package.json, scripts/generate-sitemap.js, public/sitemap.xml, vercel.json, and this file to the production branch.

This repository contains the app in a nested folder. In Vercel, select the project serving resumebiodata.in, then open Settings -> Build and Deployment and verify:

- Root Directory: resume-builder
- Framework Preset: Create React App
- Build Command: npm run build
- Output Directory: build
- Production Branch: the branch serving resumebiodata.in (normally main)
- Ignored Build Step: do not configure it to skip Deploy Hook builds

The checked-in vercel.json is valid for this application: it selects Create React App, runs npm run build, publishes build, and provides the SPA fallback rewrite.

## 2. Add Vercel build environment variables

Open Vercel Project -> Settings -> Environment Variables. Add these for Production (and Preview if desired):

| Name | Value |
| --- | --- |
| REACT_APP_SANITY_PROJECT_ID | i3f05hhs |
| REACT_APP_SANITY_DATASET | production |
| REACT_APP_SANITY_API_VERSION | 2026-06-22 |
| SITE_URL | https://resumebiodata.in |
| GENERATE_SOURCEMAP | false |

The first three are required. SITE_URL is explicit documentation of the production origin, although the generator has the same default.

## 3. Create the Vercel Deploy Hook

1. Go to https://vercel.com/dashboard and select the project serving resumebiodata.in.
2. Open Settings -> Git.
3. Scroll to Deploy Hooks.
4. Name the hook Sanity production content.
5. Select the production branch (normally main).
6. Click Create Hook.
7. Copy the generated https://api.vercel.com/v1/integrations/deploy/... URL.

Treat this URL as a secret. Do not commit it or put it in an environment file.

## 4. Create the Sanity webhook

1. Go to https://www.sanity.io/manage and select project i3f05hhs.
2. Open Settings -> API -> Webhooks.
3. Click Create webhook or Add webhook.
4. Enter these exact settings:

| Sanity field | Value |
| --- | --- |
| Name | Deploy resumebiodata.in on post changes |
| Description | Triggers a Vercel production rebuild and sitemap refresh when a published post changes. |
| URL | Paste the Vercel Deploy Hook URL here |
| Dataset | production |
| Trigger on | Create, Update, and Delete |
| Filter | _type == "post" |
| Projection | {_id, _type, "slug": slug.current} (optional) |
| Drafts | Disabled |
| Versions | Disabled |
| Secret | Leave empty |

5. Save or enable the webhook.

The URL field above is exactly where the copied Deploy Hook URL belongs. Vercel accepts the POST without authentication and ignores the payload. Drafts should remain disabled to avoid rebuilding on editor keystrokes. Publishing, changing a published post, deleting, or unpublishing triggers a deployment.

## 5. Verify the automation

1. Publish a small change to a Sanity post.
2. In Sanity Manage, inspect the webhook's latest attempt; it should return a successful 2xx response.
3. In Vercel, open Deployments and confirm a Deploy Hook deployment appeared.
4. In its build log, confirm npm run generate:sitemap runs before react-scripts build and reports Sitemap updated with N published blog article(s).
5. After deployment, open https://resumebiodata.in/sitemap.xml and confirm the post URL and lastmod date.

## Build and sitemap verification

package.json defines generate:sitemap as node scripts/generate-sitemap.js and build as npm run generate:sitemap && react-scripts build. vercel.json invokes npm run build. Therefore every Vercel build rewrites public/sitemap.xml first; Create React App then copies it into build/sitemap.xml. If sitemap generation fails, the && prevents deployment of a stale build.

## Troubleshooting

- No deployment: verify the hook targets the production branch and vercel.json does not set github.enabled to false.
- Missing Sanity configuration: recheck the three REACT_APP_SANITY variables in Vercel Production.
- Authorization failure: production must permit public reads because this project intentionally uses a token-free client.
- Too many builds: keep Drafts and Versions disabled and use exactly the post filter above.
- Missing article: it must be published, have slug.current and publishedAt, and not have a future publishedAt.

Official references:

- Vercel Deploy Hooks: https://vercel.com/docs/deploy-hooks
- Sanity GROQ-powered webhooks: https://www.sanity.io/docs/content-lake/webhooks