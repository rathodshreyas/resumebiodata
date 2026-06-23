import {createClient} from '@sanity/client';
import {hasSanityConfig, sanityConfigError, sanityEnv} from './sanityEnv';

const configuredClient = hasSanityConfig
  ? createClient({
      projectId: sanityEnv.projectId,
      dataset: sanityEnv.dataset,
      apiVersion: sanityEnv.apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null;

export const sanityClient = configuredClient || {
  fetch() {
    return Promise.reject(sanityConfigError);
  },
};

export default sanityClient;
