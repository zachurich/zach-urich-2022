import classNames from 'classnames';
import { AnimatedImage } from './AnimatedImage';

type Props<DataType> = {
  grid: DataType;
  columns?: number;
};

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
          if (item.media_type === 'IMAGE') {
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
          }
        })}
      </ul>
    </div>
  );
}
