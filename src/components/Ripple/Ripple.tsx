import { useState } from 'react';

interface RippleObject {
  x: number;
  y: number;
  size: number;
  index: number;
}

interface RippleProps {
  duration?: number;
  color?: string;
}

export const Ripple = ({ color, duration }: RippleProps) => {
  const [rippleArray, setRippleArray] = useState<RippleObject[]>([]);

  const addRipple = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (!evt.currentTarget) {
      return;
    }

    const rippleContainer = evt.currentTarget.getBoundingClientRect();
    const size = rippleContainer.width > rippleContainer.height ? rippleContainer.width : rippleContainer.height;
    const x = evt.pageX - rippleContainer.x - size / 2;
    const y = evt.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      x,
      y,
      size,
    };

    setRippleArray((prev) => {
      return [...prev, { ...newRipple, index: prev.length }];
    });
  };

  return (
    <div
      className="ripple-container"
      onMouseDown={addRipple}
    >
      {rippleArray.map((ripple) => {
        return (
          <span
            key={ripple.index}
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
              background: color,
              animationDuration: `${duration}ms`,
            }}
          />
        );
      })}
    </div>
  );
};
