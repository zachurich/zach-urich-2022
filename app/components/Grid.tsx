import classNames from 'classnames';
import type { InstaResponse } from '../instagram';
import { AnimatedImage } from './AnimatedImage';

type Props<DataType> = {
  grid: DataType;
  columns?: number;
};

function isInstagramImage(item: any): item is InstaResponse {
  return item?.media_type && item?.media_type === 'IMAGE';
}

export function Grid<GridData>({ grid, columns = 1 }: Props<GridData>) {
  if (!Array.isArray(grid)) return null;
  return (
    <div className="grid-wrapper">
      <ul
        className={classNames('grid', {
          'grid-two-column': columns === 2,
        })}
      >
        {grid.map((item) => {
          if (isInstagramImage(item)) {
            return (
              <li className="grid-item" key={item.id}>
                <a href={item.permalink} target="_blank" rel="noreferrer">
                  <AnimatedImage
                    src={item.media_url}
                    alt={`${item.caption}`}
                    loading="lazy"
                  />
                </a>
              </li>
            );
          } else {
            return (
              <li className="grid-item" key={item.title}>
                <AnimatedImage
                  src={item.url}
                  alt={`${item.title}`}
                  loading="lazy"
                >
                  <small>{item.title}</small>
                </AnimatedImage>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
