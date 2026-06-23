export default function BlogSidebar({recentPosts, categories, popularPosts, activeCategory, onCategoryChange}) {
  const renderPostLinks = (posts) => (
    <ul className="cms-blog-sidebar-links">
      {posts.map((post) => (
        <li key={post._id}>
          <a href={`/blog/${encodeURIComponent(post.slug)}`}>{post.title}</a>
        </li>
      ))}
    </ul>
  );

  return (
    <aside className="cms-blog-sidebar" aria-label="Blog sidebar">
      <section>
        <h2>Recent Posts</h2>
        {renderPostLinks(recentPosts)}
      </section>

      <section>
        <h2>Categories</h2>
        <ul className="cms-blog-category-list">
          <li>
            <button
              type="button"
              className={!activeCategory ? 'active' : ''}
              aria-pressed={!activeCategory}
              onClick={() => onCategoryChange?.('')}
            >
              All Categories
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.slug || category.title}>
              <button
                type="button"
                className={activeCategory === category.slug ? 'active' : ''}
                aria-pressed={activeCategory === category.slug}
                onClick={() => onCategoryChange?.(category.slug)}
              >
                <span>{category.title}</span><span>{category.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Popular Posts</h2>
        {renderPostLinks(popularPosts)}
      </section>
    </aside>
  );
}
