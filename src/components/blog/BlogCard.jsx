import {urlFor} from '../../lib/imageUrl';
import {calculateReadingTime, formatPublishedDate} from '../../lib/blogUtils';

export default function BlogCard({post, compact = false}) {
  const imageBuilder = urlFor(post.featuredImage);
  const imageUrl = imageBuilder
    ? imageBuilder.width(compact ? 480 : 760).height(compact ? 300 : 460).fit('crop').quality(82).url()
    : '';

  return (
    <article className={`cms-blog-card${compact ? ' cms-blog-card-compact' : ''}`}>
      <a className="cms-blog-card-image-link" href={`/blog/${encodeURIComponent(post.slug)}`} aria-label={`Read ${post.title}`}>
        <div className="cms-blog-card-media">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              width={compact ? 480 : 760}
              height={compact ? 300 : 460}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="cms-blog-card-no-image" aria-hidden="true">ResumeBiodata.in</span>
          )}
        </div>
      </a>
      <div className="cms-blog-card-body">
        <div className="cms-blog-card-meta">
          {post.category?.title && <span className="cms-blog-category">{post.category.title}</span>}
          <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
          <span>{calculateReadingTime(post.body, post.readingTime)} min read</span>
        </div>
        <h2><a href={`/blog/${encodeURIComponent(post.slug)}`}>{post.title}</a></h2>
        {!compact && post.description && <p>{post.description}</p>}
        <a className="cms-blog-read-more" href={`/blog/${encodeURIComponent(post.slug)}`} aria-label={`Read more about ${post.title}`}>
          Read More <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
