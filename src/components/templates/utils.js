export function formatDate(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
}

export function formatAddress(address) {
  if (!address) return '';
  let trimmed = address.trim();
  if (/Dist\.?\s*Beed/i.test(trimmed) && !/431517/.test(trimmed)) {
    trimmed = `${trimmed}, Maharashtra - 431517`;
  }
  const parts = trimmed
    .split(/,|\n/)
    .map(part => part.trim())
    .filter(part => part.length > 0);

  if (parts.length < 4) return parts.join(', ');

  const breakAfter = Math.ceil(parts.length / 2);
  return `${parts.slice(0, breakAfter).join(', ')}\n${parts.slice(breakAfter).join(', ')}`;
}
