const postProjection = `
  _id,
  title,
  "slug": slug.current,
  description,
  featuredImage{
    ...,
    alt
  },
  "author": author->{name, "slug": slug.current, bio, image{..., alt}},
  "category": category->{_id, title, "slug": slug.current},
  publishedAt,
  readingTime,
  body,
  seoTitle,
  seoDescription,
  keywords,
  featured
`;

export const allPostsQuery = `
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc) {${postProjection}}
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {${postProjection}}
`;

export const relatedPostsQuery = `
  *[
    _type == "post" &&
    _id != $id &&
    defined(slug.current) &&
    defined(publishedAt) &&
    category._ref == $categoryId
  ] | order(featured desc, publishedAt desc)[0...3] {${postProjection}}
`;

export const adjacentPostsQuery = `{
  "previous": *[
    _type == "post" &&
    defined(slug.current) &&
    publishedAt < $publishedAt
  ] | order(publishedAt desc)[0] {title, "slug": slug.current},
  "next": *[
    _type == "post" &&
    defined(slug.current) &&
    publishedAt > $publishedAt
  ] | order(publishedAt asc)[0] {title, "slug": slug.current}
}`;
