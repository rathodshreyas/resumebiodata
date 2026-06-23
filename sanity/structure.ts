import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Posts').defaultOrdering([{field: 'publishedAt', direction: 'desc'}])),
      S.divider(),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('category').title('Categories'),
    ])
