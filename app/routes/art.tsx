import { MetaFunction, redirect } from 'remix';

import type { InstaResponse } from '~/instagram';
import type { ArtPageContent } from '~/cms';

import { LoaderFunction, useLoaderData } from 'remix';
import { instagram } from '~/instagram';
import { cms } from '~/cms';
import { Shape1 } from '~/svgs';
import { Grid } from '../components/Grid';

import styles from '~/styles/grid.css';

type Content = {
  drawings: InstaResponse[];
  content: ArtPageContent;
};

export const loader: LoaderFunction = async (): Promise<Content> => {
  const drawings = await instagram.getDrawings();
  const content = await cms.getGridPageContent('art-page');

  if (!drawings || !content) {
    redirect('https://www.instagram.com/zacurich/');
  }

  return {
    drawings,
    content,
  };
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = ({ data }) => {
  return { title: 'Art - zachurich.com', description: data?.content?.intro };
};

export default function Drawings() {
  const { drawings, content } = useLoaderData<Content>();

  if (!drawings) return null;

  return (
    <>
      <Shape1 />
      <section>
        <h1 id="page-header">{content.header}</h1>
        <p>{content.intro}</p>
      </section>
      <Grid<InstaResponse[]> grid={drawings} columns={2} />
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
