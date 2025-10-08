export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u017F]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
