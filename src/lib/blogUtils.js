export const SITE_URL = 'https://resumebiodata.in';
export const POSTS_PER_PAGE = 9;

export function calculateReadingTime(body, configuredMinutes) {
  if (Number.isFinite(configuredMinutes) && configuredMinutes > 0) {
    return Math.ceil(configuredMinutes);
  }

  const words = (Array.isArray(body) ? body : [])
    .filter((block) => block?._type === 'block')
    .flatMap((block) => block.children || [])
    .map((child) => child?.text || '')
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 225));
}

export function formatPublishedDate(date) {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function normalizeSearchValue(value) {
  return String(value || '').trim().toLocaleLowerCase('en-IN');
}

export function postImageUrl(image, width = 1200, height = 675) {
  return image ? {width, height} : null;
}
