export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required().max(80)},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    },
    {name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.max(240)},
  ],
  preview: {select: {title: 'title', subtitle: 'description'}},
};
