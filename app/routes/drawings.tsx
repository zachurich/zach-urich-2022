import { MetaFunction } from 'remix';

import type { InstaResponse } from '~/instagram';

import { LoaderFunction, useLoaderData } from 'remix';
import { instagram } from '~/instagram';
import { Shape1 } from '~/svgs';

import styles from '~/styles/drawings.css';

type Content = {
  drawings: InstaResponse[];
};

export const loader: LoaderFunction = async (): Promise<Content> => {
  const drawings = await instagram.getDrawings();
  return {
    drawings,
  };
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: 'zachurich.com' };
};

export default function Drawings() {
  const { drawings } = useLoaderData<InstaResponse[]>();

  if (!drawings) return null;

  return (
    <>
      <Shape1 />
      <ul className="drawings">
        {drawings.map((drawing) => {
          if (drawing.media_type === 'IMAGE') {
            return (
              <li key={drawing.id}>
                <a href={drawing.permalink} target="_blank" rel="noreferrer">
                  <img src={drawing.media_url} alt={`${drawing.caption} `} />
                </a>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}
