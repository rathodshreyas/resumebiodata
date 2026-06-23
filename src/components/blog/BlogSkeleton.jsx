export default function BlogSkeleton({count = 9, article = false}) {
  if (article) {
    return (
      <div className="cms-blog-article-skeleton" role="status" aria-label="Loading article">
        <span className="cms-skeleton cms-skeleton-kicker" />
        <span className="cms-skeleton cms-skeleton-title" />
        <span className="cms-skeleton cms-skeleton-title short" />
        <span className="cms-skeleton cms-skeleton-hero" />
        {Array.from({length: 7}, (_, index) => <span className="cms-skeleton cms-skeleton-line" key={index} />)}
      </div>
    );
  }

  return (
    <div className="cms-blog-grid" role="status" aria-label="Loading blog posts">
      {Array.from({length: count}, (_, index) => (
        <div className="cms-blog-card cms-blog-skeleton-card" key={index}>
          <span className="cms-skeleton cms-skeleton-card-image" />
          <div className="cms-blog-card-body">
            <span className="cms-skeleton cms-skeleton-line short" />
            <span className="cms-skeleton cms-skeleton-card-title" />
            <span className="cms-skeleton cms-skeleton-line" />
            <span className="cms-skeleton cms-skeleton-line short" />
          </div>
        </div>
      ))}
    </div>
  );
}
