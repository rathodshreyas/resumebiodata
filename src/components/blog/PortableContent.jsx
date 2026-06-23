import {PortableText} from '@portabletext/react';
import {urlFor} from '../../lib/imageUrl';

const components = {
  types: {
    image: ({value}) => {
      const imageBuilder = urlFor(value);
      if (!imageBuilder) return null;
      return (
        <figure className="cms-portable-image">
          <img
            src={imageBuilder.width(1200).fit('max').quality(84).url()}
            alt={value.alt || ''}
            width="1200"
            height="675"
            loading="lazy"
            decoding="async"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
  marks: {
    link: ({children, value}) => {
      const href = value?.href || '#';
      const external = /^https?:\/\//.test(href);
      return <a href={href} {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}>{children}</a>;
    },
  },
  block: {
    h2: ({children}) => <h2>{children}</h2>,
    h3: ({children}) => <h3>{children}</h3>,
    blockquote: ({children}) => <blockquote>{children}</blockquote>,
  },
};

export default function PortableContent({value}) {
  return <div className="cms-portable-content"><PortableText value={value || []} components={components} /></div>;
}
