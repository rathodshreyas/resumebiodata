export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    {name: 'title', title: 'Title', type: 'string', group: 'content', validation: (Rule) => Rule.required().max(120)},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96, isUnique: (value, context) => context.defaultIsUnique(value, context)},
      validation: (Rule) => Rule.required(),
    },
    {name: 'description', title: 'Short Description', type: 'text', rows: 3, group: 'content', validation: (Rule) => Rule.required().min(60).max(220)},
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [
        {name: 'alt', title: 'Alternative Text', type: 'string', validation: (Rule) => Rule.required().max(160)},
        {name: 'caption', title: 'Caption', type: 'string'},
      ],
      validation: (Rule) => Rule.required(),
    },
    {name: 'author', title: 'Author', type: 'reference', to: [{type: 'author'}], group: 'content', validation: (Rule) => Rule.required()},
    {name: 'category', title: 'Category', type: 'reference', to: [{type: 'category'}], group: 'content', validation: (Rule) => Rule.required()},
    {name: 'publishedAt', title: 'Published Date', type: 'datetime', group: 'content', initialValue: () => new Date().toISOString(), validation: (Rule) => Rule.required()},
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      group: 'content',
      description: 'Optional override. Leave empty to calculate automatically from the article body.',
      validation: (Rule) => Rule.integer().positive().max(180),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            annotations: [
              {name: 'link', type: 'object', title: 'Link', fields: [{name: 'href', type: 'url', title: 'URL', validation: (Rule) => Rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto']})}]},
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', title: 'Alternative Text', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'caption', title: 'Caption', type: 'string'},
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo', validation: (Rule) => Rule.max(60)},
    {name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, group: 'seo', validation: (Rule) => Rule.max(160)},
    {name: 'keywords', title: 'Keywords', type: 'array', group: 'seo', of: [{type: 'string'}], options: {layout: 'tags'}},
    {name: 'featured', title: 'Featured / Popular', type: 'boolean', group: 'content', initialValue: false},
  ],
  orderings: [
    {title: 'Published Date, Newest', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'category.title', media: 'featuredImage', publishedAt: 'publishedAt'},
    prepare({title, subtitle, media, publishedAt}) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Unscheduled';
      return {title, subtitle: `${subtitle || 'Uncategorised'} - ${date}`, media};
    },
  },
};
