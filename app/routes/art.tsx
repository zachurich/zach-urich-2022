import { type LoaderFunction, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import type { PageContent, GridImage } from '~/cms';

import { cms } from '~/cms';
import { Shape1 } from '~/svgs';
import { Grid } from '../components/Grid';

import '~/styles/grid.css';

type Content = PageContent;

export const loader: LoaderFunction = async (): Promise<Content> => {
  const cache = await cms.getGridPageContent('art-page');
  return cache;
};

// export function links() {
//   return [];
// }

export const meta = ({ data }: { data: any }) => {
  return [{ title: 'Art - zachurich.com', description: data?.content?.intro }];
};

export default function Drawings() {
  const content = useLoaderData<Content>();

  const drawings = content.images;

  if (!drawings) return null;

  return (
    <>
      <Shape1 />
      <section>
        <h1 id="page-header">{content.header}</h1>
        <p>{content.intro}</p>
      </section>
      <Grid<GridImage[]> grid={drawings} columns={2} />
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
