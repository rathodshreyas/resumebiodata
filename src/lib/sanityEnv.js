export const sanityEnv = Object.freeze({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID?.trim() || '',
  dataset: process.env.REACT_APP_SANITY_DATASET?.trim() || '',
  apiVersion: process.env.REACT_APP_SANITY_API_VERSION?.trim() || '',
});

export const hasSanityConfig = Boolean(
  sanityEnv.projectId && sanityEnv.dataset && sanityEnv.apiVersion
);

export const sanityConfigError = hasSanityConfig
  ? null
  : new Error(
      'Sanity is not configured. Add REACT_APP_SANITY_PROJECT_ID, REACT_APP_SANITY_DATASET, and REACT_APP_SANITY_API_VERSION to your environment.'
    );
