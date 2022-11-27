import { MetaFunction } from 'remix';

import type { ArtPageContent, GridImage } from '~/cms';

import { LoaderFunction, useLoaderData } from 'remix';
import { cms } from '~/cms';
import { Shape1 } from '~/svgs';
import { Grid } from '../components/Grid';

import styles from '~/styles/grid.css';

type Content = ArtPageContent;

export const loader: LoaderFunction = async (): Promise<Content> => {
  const cache = await cms.getGridPageContent('art-page');
  return cache;
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = ({ data }) => {
  return { title: 'Art - zachurich.com', description: data?.content?.intro };
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
