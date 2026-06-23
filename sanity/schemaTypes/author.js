export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required().max(100)},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative Text', type: 'string', validation: (Rule) => Rule.required()}],
    },
    {name: 'bio', title: 'Biography', type: 'text', rows: 4, validation: (Rule) => Rule.max(500)},
  ],
  preview: {select: {title: 'name', media: 'image'}},
};
