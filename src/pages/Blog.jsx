import {useCallback, useEffect, useMemo, useState} from 'react';
import BlogCard from '../components/blog/BlogCard';
import BlogSidebar from '../components/blog/BlogSidebar';
import BlogSkeleton from '../components/blog/BlogSkeleton';
import Seo from '../components/blog/Seo';
import {allPostsQuery} from '../lib/blogQueries';
import {POSTS_PER_PAGE, SITE_URL, normalizeSearchValue} from '../lib/blogUtils';
import {sanityClient} from '../lib/sanityClient';
import '../styles/blog.css';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [requestKey, setRequestKey] = useState(0);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await sanityClient.fetch(allPostsQuery);
      setPosts(Array.isArray(result) ? result : []);
    } catch (loadError) {
      console.error('Unable to load Sanity blog posts:', loadError);
      setError(loadError?.message || 'The blog could not be loaded right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts, requestKey]);

  const categories = useMemo(() => {
    const counts = new Map();
    posts.forEach((post) => {
      if (!post.category?.title || !post.category?.slug) return;
      const current = counts.get(post.category.slug) || {title: post.category.title, slug: post.category.slug, count: 0};
      current.count += 1;
      counts.set(post.category.slug, current);
    });
    return [...counts.values()].sort((a, b) => a.title.localeCompare(b.title));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const term = normalizeSearchValue(search);
    return posts.filter((post) => {
      const matchesCategory = !category || post.category?.slug === category;
      if (!matchesCategory) return false;
      if (!term) return true;
      return [post.title, post.description, post.category?.title]
        .some((value) => normalizeSearchValue(value).includes(term));
    });
  }, [category, posts, search]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const visiblePosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const recentPosts = posts.slice(0, 5);
  const featuredPosts = posts.filter((post) => post.featured);
  const popularPosts = (featuredPosts.length ? featuredPosts : posts).slice(0, 5);

  useEffect(() => {
    setPage(1);
  }, [category, search]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const schemas = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Resume Writing Guides & Career Tips',
      description: 'Practical resume writing, ATS, education, skills, and job application guidance.',
      url: `${SITE_URL}/blog`,
      isPartOf: {'@type': 'WebSite', name: 'ResumeBiodata.in', url: SITE_URL},
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL},
        {'@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog`},
      ],
    },
  ], []);

  return (
    <>
      <Seo
        title="Resume Writing Guides & Career Tips | ResumeBiodata.in"
        description="Practical resume writing, ATS, education, skills, and job application guidance for students, freshers, and professionals."
        canonicalPath="/blog"
        schemas={schemas}
      />
      <section className="cms-blog-page" aria-labelledby="cms-blog-heading">
        <header className="cms-blog-hero">
          <span>Career Guides</span>
          <h1 id="cms-blog-heading">Resume &amp; Career Blog</h1>
          <p>Clear, practical guidance for building stronger resumes and making confident career decisions.</p>
        </header>

        <div className="cms-blog-toolbar" role="search">
          <div className="cms-blog-search">
            <label htmlFor="blog-search">Search articles</label>
            <input
              id="blog-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, description, or category"
              autoComplete="off"
            />
          </div>
          <div className="cms-blog-filter">
            <label htmlFor="blog-category">Category</label>
            <select id="blog-category" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="">All Categories</option>
              {categories.map((item) => <option value={item.slug} key={item.slug}>{item.title}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <BlogSkeleton />
        ) : error ? (
          <div className="cms-blog-state" role="alert">
            <h2>We couldn&apos;t load the blog</h2>
            <p>{error}</p>
            <button type="button" className="btn-primary" onClick={() => setRequestKey((key) => key + 1)}>Retry</button>
          </div>
        ) : posts.length === 0 ? (
          <div className="cms-blog-state">
            <h2>No published posts yet</h2>
            <p>Published Sanity posts will appear here automatically.</p>
          </div>
        ) : (
          <div className="cms-blog-layout">
            <div className="cms-blog-main" aria-live="polite">
              {visiblePosts.length ? (
                <div className="cms-blog-grid">
                  {visiblePosts.map((post) => <BlogCard post={post} key={post._id} />)}
                </div>
              ) : (
                <div className="cms-blog-state">
                  <h2>No matching articles</h2>
                  <p>Try another search term or select a different category.</p>
                  <button type="button" className="btn-secondary" onClick={() => { setSearch(''); setCategory(''); }}>Clear filters</button>
                </div>
              )}

              {totalPages > 1 && (
                <nav className="cms-blog-pagination" aria-label="Blog pagination">
                  <button type="button" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</button>
                  <span>Page {page} of {totalPages}</span>
                  <button type="button" disabled={page === totalPages} onClick={() => setPage((value) => value + 1)}>Next</button>
                </nav>
              )}
            </div>
            <BlogSidebar
              recentPosts={recentPosts}
              categories={categories}
              popularPosts={popularPosts}
              activeCategory={category}
              onCategoryChange={setCategory}
            />
          </div>
        )}
      </section>
    </>
  );
}
