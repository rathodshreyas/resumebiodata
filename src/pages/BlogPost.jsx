import {useCallback, useEffect, useMemo, useState} from 'react';
import BlogCard from '../components/blog/BlogCard';
import BlogSkeleton from '../components/blog/BlogSkeleton';
import PortableContent from '../components/blog/PortableContent';
import Seo from '../components/blog/Seo';
import {adjacentPostsQuery, postBySlugQuery, relatedPostsQuery} from '../lib/blogQueries';
import {calculateReadingTime, formatPublishedDate, SITE_URL} from '../lib/blogUtils';
import {urlFor} from '../lib/imageUrl';
import {sanityClient} from '../lib/sanityClient';
import '../styles/blog.css';

export default function BlogPost({slug}) {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [adjacent, setAdjacent] = useState({previous: null, next: null});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [requestKey, setRequestKey] = useState(0);

  const loadPost = useCallback(async () => {
    setLoading(true);
    setError('');
    setNotFound(false);
    try {
      const result = await sanityClient.fetch(postBySlugQuery, {slug});
      if (!result) {
        setPost(null);
        setNotFound(true);
        return;
      }
      setPost(result);

      const [relatedResult, adjacentResult] = await Promise.all([
        result.category?._id
          ? sanityClient.fetch(relatedPostsQuery, {id: result._id, categoryId: result.category._id})
          : Promise.resolve([]),
        sanityClient.fetch(adjacentPostsQuery, {publishedAt: result.publishedAt}),
      ]);
      setRelatedPosts(Array.isArray(relatedResult) ? relatedResult : []);
      setAdjacent(adjacentResult || {previous: null, next: null});
    } catch (loadError) {
      console.error('Unable to load Sanity blog post:', loadError);
      setError(loadError?.message || 'This article could not be loaded right now.');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadPost();
  }, [loadPost, requestKey]);

  const heroBuilder = post ? urlFor(post.featuredImage) : null;
  const heroImage = heroBuilder ? heroBuilder.width(1440).height(810).fit('crop').quality(86).url() : '';
  const title = post?.seoTitle || post?.title || 'Article Not Found | ResumeBiodata.in';
  const description = post?.seoDescription || post?.description || 'The requested blog article could not be found.';
  const canonicalPath = `/blog/${encodeURIComponent(slug)}`;

  const schemas = useMemo(() => {
    if (!post) return [];
    const articleUrl = `${SITE_URL}${canonicalPath}`;
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description,
        image: heroImage || undefined,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        mainEntityOfPage: {'@type': 'WebPage', '@id': articleUrl},
        author: {'@type': 'Person', name: post.author?.name || 'ResumeBiodata.in Editorial Team'},
        publisher: {'@type': 'Organization', name: 'ResumeBiodata.in', url: SITE_URL},
        articleSection: post.category?.title,
        keywords: post.keywords?.join(', '),
        wordCount: Math.round(calculateReadingTime(post.body, null) * 225),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {'@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL},
          {'@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog`},
          {'@type': 'ListItem', position: 3, name: post.title, item: articleUrl},
        ],
      },
    ];
  }, [canonicalPath, description, heroImage, post]);

  if (loading) return <div className="cms-blog-page"><BlogSkeleton article /></div>;

  if (error) {
    return (
      <section className="cms-blog-page cms-blog-state" role="alert">
        <Seo title="Blog unavailable | ResumeBiodata.in" description={description} canonicalPath={canonicalPath} robots="noindex, follow" />
        <h1>We couldn&apos;t load this article</h1>
        <p>{error}</p>
        <button type="button" className="btn-primary" onClick={() => setRequestKey((key) => key + 1)}>Retry</button>
        <a href="/blog">Return to Blog</a>
      </section>
    );
  }

  if (notFound || !post) {
    return (
      <section className="cms-blog-page cms-blog-state">
        <Seo title="Article Not Found | ResumeBiodata.in" description={description} canonicalPath={canonicalPath} robots="noindex, follow" />
        <span className="cms-blog-error-code">404</span>
        <h1>Article not found</h1>
        <p>The article may have moved, been unpublished, or the address may be incorrect.</p>
        <a className="btn-primary" href="/blog">Browse all articles</a>
      </section>
    );
  }

  return (
    <>
      <Seo
        title={`${title}${title.includes('ResumeBiodata.in') ? '' : ' | ResumeBiodata.in'}`}
        description={description}
        canonicalPath={canonicalPath}
        image={heroImage}
        type="article"
        schemas={schemas}
      />
      <article className="cms-blog-article">
        <nav className="cms-blog-breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/blog">Blog</a></li>
            <li aria-current="page">{post.title}</li>
          </ol>
        </nav>

        <header className="cms-blog-article-header">
          {post.category?.title && <span className="cms-blog-category">{post.category.title}</span>}
          <h1>{post.title}</h1>
          {post.description && <p>{post.description}</p>}
          <div className="cms-blog-byline">
            {post.author?.name && <span>By {post.author.name}</span>}
            <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
            <span>{calculateReadingTime(post.body, post.readingTime)} min read</span>
          </div>
        </header>

        {heroImage && (
          <figure className="cms-blog-hero-image">
            <img src={heroImage} alt={post.featuredImage?.alt || post.title} width="1440" height="810" decoding="async" fetchPriority="high" />
          </figure>
        )}

        <div className="cms-blog-article-layout">
          <div className="cms-blog-article-body">
            <PortableContent value={post.body} />
            {post.author?.name && (
              <aside className="cms-blog-author" aria-label="About the author">
                <h2>About {post.author.name}</h2>
                {post.author.bio && <p>{post.author.bio}</p>}
              </aside>
            )}
          </div>
        </div>

        <nav className="cms-blog-adjacent" aria-label="Previous and next articles">
          <div>{adjacent.previous && <><span>Previous article</span><a href={`/blog/${encodeURIComponent(adjacent.previous.slug)}`}>{adjacent.previous.title}</a></>}</div>
          <div>{adjacent.next && <><span>Next article</span><a href={`/blog/${encodeURIComponent(adjacent.next.slug)}`}>{adjacent.next.title}</a></>}</div>
        </nav>

        {relatedPosts.length > 0 && (
          <section className="cms-blog-related" aria-labelledby="related-posts-heading">
            <h2 id="related-posts-heading">Related Posts</h2>
            <div className="cms-blog-grid">
              {relatedPosts.map((relatedPost) => <BlogCard post={relatedPost} compact key={relatedPost._id} />)}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
