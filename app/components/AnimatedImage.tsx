import { useSpring, animated, config } from '@react-spring/web';
import { useEffect, useState } from 'react';

const placeholderSrc = '/placeholder.png';

type Props = {
  src: string;
  alt?: string;
  className?: string;
  loading?: HTMLImageElement['loading'];
  width?: number;
  height?: number;
};

export const AnimatedImage = ({ src, ...rest }: Props) => {
  const [styles, animation] = useSpring(() => ({
    opacity: 0,
    y: -2,
    config: config.gentle,
  }));

  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setLoadedSrc(src);
    };
  }, [src]);

  useEffect(() => {
    setTimeout(async () => {
      await animation.start({ opacity: 1, y: 1 });
    }, 500);
  }, [loadedSrc, animation]);

  if (!loadedSrc) {
    return <img src={placeholderSrc} {...rest} />;
  }

  return <animated.img src={loadedSrc} {...rest} style={styles} />;
};
