import { useSpring, animated } from '@react-spring/web';
import { useContext, useEffect } from 'react';
import { AnimationContext, colors } from './animation';

export function Shape1() {
  const animationContext = useContext(AnimationContext);

  const [currentAnimation, animation] = useSpring(
    () => ({
      path: animationContext.path,
      color: animationContext.color,
    }),
    [],
  );

  useEffect(() => {
    const newPath = Math.floor(Math.random() * 100);

    // cycle colors until we hit the last one, start again
    const newColor =
      colors.indexOf(animationContext.color) < colors.length - 1
        ? colors[colors.indexOf(animationContext.color) + 1]
        : colors[0];

    setTimeout(() => {
      animation.start({
        path: newPath,
        color: newColor,
        config: { tension: 150, friction: 20 },
      });
    }, 200);

    animationContext.updateValues({
      path: newPath,
      color: newColor,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="shape" aria-hidden="true">
      <svg
        width="416"
        height="254"
        viewBox="0 0 416 254"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <animated.path
          fill={currentAnimation.color}
          d={currentAnimation.path.to({
            range: [0, 100],
            output: [
              'M177.043 0.885454L415.723 134.814L252.456 253.733L0.428537 242.751L100.309 162.075L177.043 0.885454Z',
              'M285 1.52588e-05L252.5 179.5L348 309.751L78.5 364L-3.01896e-06 240L285 1.52588e-05Z',
            ],
          })}
        />
      </svg>
    </div>
  );
}

export function Shape2() {
  return (
    <div className="shape" aria-hidden="true">
      <svg
        width="255"
        height="243"
        viewBox="0 0 255 243"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 169L169 0V109L255 209L74 243L0 169Z" fill="white" />
      </svg>
    </div>
  );
}
