import { ExternalLink } from 'lucide-react';
import { UnifiedTashiroArticle } from '../lib/tashiro';
import { formatDate } from '../lib/cms';

export function TashiroArticleCard({
  article,
}: {
  article: UnifiedTashiroArticle;
}) {
  return (
    <a
      className="bg-white border transition-all group flex flex-col h-full overflow-hidden cursor-pointer"
      style={{ borderColor: '#e5e1d6' }}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#050A14';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#e5e1d6';
      }}
    >
      <div
        className="w-full flex items-center justify-center relative overflow-hidden"
        style={{ aspectRatio: '16/9', backgroundColor: '#fafaf7' }}
      >
        {article.image ? (
          <img
            src={article.image.url}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '2.25rem', color: '#cbd5e1' }}
          >
            image
          </span>
        )}
      </div>
      <div
        className="flex-grow flex flex-col"
        style={{ padding: '1.75rem 1.75rem 1.875rem' }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: '1.5rem' }}
        >
          <span
            className="font-medium uppercase"
            style={{
              fontSize: '10px',
              letterSpacing: '0.18em',
              color: '#64748b',
            }}
          >
            {article.media}
          </span>
          <time
            className="font-light"
            style={{
              fontSize: '11px',
              color: '#94a3b8',
              fontFamily: '"Cormorant Garamond", serif',
              letterSpacing: '0.1em',
            }}
          >
            {formatDate(article.date)}
          </time>
        </div>
        <h3
          className="text-base line-clamp-2"
          style={{
            color: '#050A14',
            fontWeight: 600,
            lineHeight: 1.65,
            letterSpacing: '0.02em',
            marginBottom: '1.5rem',
          }}
        >
          {article.title}
        </h3>
        <div
          className="flex items-center"
          style={{
            marginTop: 'auto',
            paddingTop: '0.5rem',
            borderTop: '1px solid #f1ede0',
            color: '#94a3b8',
            fontSize: '11px',
            letterSpacing: '0.18em',
            fontWeight: 500,
            justifyContent: 'space-between',
          }}
        >
          <span className="uppercase">Read More</span>
          <ExternalLink
            className="shrink-0"
            style={{ color: '#94a3b8', width: '14px', height: '14px' }}
          />
        </div>
      </div>
    </a>
  );
}
