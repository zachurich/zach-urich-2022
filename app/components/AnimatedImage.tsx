import { useSpring, animated, config } from '@react-spring/web';

type Props = {
  src?: string;
  alt?: string;
  className?: string;
  loading?: HTMLImageElement['loading'];
};

export const AnimatedImage = (props: Props) => {
  const styles = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: config.slow,
  });
  return <animated.img {...props} style={styles} />;
};
