import { useLoaderData } from 'react-router';

import type { PageContent, GridImage } from '~/cms';

import { cms } from '~/cms';
import { Shape1 } from '~/svgs';
import { Grid } from '../components/Grid';
import type { Route } from './+types/_index';

import '~/styles/grid.css';

export const loader = async (): Promise<PageContent> => {
  const content = await cms.getGridPageContent('photos');
  return content;
};

export const meta = ({ loaderData }: Route.MetaArgs) => {
  return [
    { title: 'Photos - zachurich.com', description: loaderData?.content?.intro },
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
