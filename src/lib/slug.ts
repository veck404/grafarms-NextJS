const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export const toProductSlug = (name: string) => slugify(name);

export const fromProductSlug = (slug: string) => slug.replace(/-/g, " ");
