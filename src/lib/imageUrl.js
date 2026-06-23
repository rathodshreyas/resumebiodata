import imageUrlBuilder from '@sanity/image-url';
import {hasSanityConfig, sanityEnv} from './sanityEnv';

const builder = hasSanityConfig
  ? imageUrlBuilder({projectId: sanityEnv.projectId, dataset: sanityEnv.dataset})
  : null;

export function urlFor(source) {
  if (!builder || !source) return null;
  return builder.image(source).auto('format');
}

export default urlFor;
