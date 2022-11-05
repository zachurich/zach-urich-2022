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
  photos: InstaResponse[];
  content: ArtPageContent;
};

export const loader: LoaderFunction = async (): Promise<Content> => {
  const photos = await instagram.getPhotos();
  const content = await cms.getGridPageContent('photos');

  if (!photos || !content) {
    redirect('https://www.instagram.com/zachurich/');
  }

  return {
    photos,
    content,
  };
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = ({ data }) => {
  return { title: 'Photos - zachurich.com', description: data?.content?.intro };
};

export default function Drawings() {
  const { photos, content } = useLoaderData<Content>();

  if (!photos) return null;

  return (
    <>
      <Shape1 />
      <section>
        <h1 id="page-header">{content.header}</h1>
        <p>{content.intro}</p>
      </section>
      <Grid<InstaResponse[]> grid={photos} />
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
