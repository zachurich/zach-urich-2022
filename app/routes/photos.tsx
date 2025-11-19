import { type LoaderFunction, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import type { PageContent, GridImage } from '~/cms';

import { cms } from '~/cms';
import { Shape1 } from '~/svgs';
import { Grid } from '../components/Grid';

import '~/styles/grid.css';

export function headers() {
  return {
    'cache-control': 'max-age=604800, stale-while-revalidate=86400',
    'Netlify-CDN-Cache-Control': 'max-age=604800, stale-while-revalidate=86400',
  };
}

export const loader: LoaderFunction = async (): Promise<PageContent> => {
  const content = await cms.getGridPageContent('photos');
  return content;
};

// export function links() {
//   return [];
// }

export const meta: MetaFunction = ({ data }) => {
  return [
    // @ts-expect-error
    { title: 'Photos - zachurich.com', description: data?.content?.intro },
  ];
};

export default function Drawings() {
  const content = useLoaderData<PageContent>();

  const photos = content.images;

  if (!photos) return null;

  return (
    <>
      <Shape1 />
      <section>
        <h1 id="page-header">{content.header}</h1>
        <p>{content.intro}</p>
      </section>
      <Grid<GridImage[]> grid={photos} columns={2} />
      <a
        className="bottom-link"
        href={content.moreLink.url}
        target={content.moreLink.target}
      >
        See more
      </a>
    </>
  );
}
