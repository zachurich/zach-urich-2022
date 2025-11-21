import { useSpring, animated, config } from '@react-spring/web';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

const placeholderSrc = '/placeholder.png';

type Props = {
  src: string;
  alt?: string;
  className?: string;
  loading?: HTMLImageElement['loading'];
  width?: number;
  height?: number;
  randomized?: boolean;
  children?: ReactNode | ReactNode[];
};

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

export const AnimatedImage = ({
  src,
  children,
  randomized = true,
  ...rest
}: Props) => {
  const offsetImage = 200 + (randomized ? randomInt(0, 500) : 0);
  const offsetChildren = 400 + (randomized ? randomInt(0, 500) : 0);

  const [styles, animation] = useSpring(
    () => ({
      opacity: 0,
      y: -2,
      config: config.gentle,
    }),
    [],
  );

  const [childStyles, childAnimation] = useSpring(
    () => ({
      opacity: 0,
      x: 10,
      config: config.gentle,
    }),
    [],
  );

  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setLoadedSrc(src);
    };
  }, [src]);

  useEffect(() => {
    if (loadedSrc) {
      setTimeout(async () => {
        await animation.start({ opacity: 1, y: 0 });
      }, offsetImage);

      setTimeout(async () => {
        await childAnimation.start({ opacity: 1, x: 0 });
      }, offsetChildren);
    }

    return () => {
      animation.stop();
      childAnimation.stop();
    };
  }, [loadedSrc, animation, childAnimation]);

  if (!loadedSrc) {
    return <img src={placeholderSrc} {...rest} />;
  }

  const image = <animated.img src={loadedSrc} {...rest} style={styles} />;

  if (children) {
    return (
      <>
        {image}
        <animated.div style={childStyles}>{children}</animated.div>
      </>
    );
  }

  return image;
};
