# Sanity schema integration

The files in `schemaTypes/` define the Author, Category, and Post document types used by the website.

Add `schemaTypes` from `schemaTypes/index.js` to the `schema.types` array in your existing Sanity Studio configuration, then deploy the Studio/schema from that Studio project. The website itself remains a public Create React App client and does not require Sanity Studio at runtime.
