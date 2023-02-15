const slugify = require('slugify');
export function addTagsToString(title: string, tags: string[] | string) {
  if (typeof tags === 'string') {
    tags = JSON.parse(tags);
  }
  if (Array.isArray(tags)) {
    tags = tags.map((tag) => `#${slugify(tag.trim(), '')}`);
    return `${title.trim()} \r\n ${tags.join(' ')}`;
  }
  return title.trim();
}
