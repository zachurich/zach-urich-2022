type Props<DataType> = {
  grid: DataType;
};

export function Grid<GridData>({ grid }: Props<GridData>) {
  if (!Array.isArray(grid)) return null;
  return (
    <ul className="grid">
      {grid.map((item) => {
        if (item.media_type === 'IMAGE') {
          return (
            <li className="grid-item" key={item.id}>
              <a href={item.permalink} target="_blank" rel="noreferrer">
                <img
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
  );
}
