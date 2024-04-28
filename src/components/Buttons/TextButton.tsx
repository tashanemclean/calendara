import { CSSProperties, ReactNode } from 'react';
import { Ripple } from '../Ripple';

interface Props {
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  text: string;
  overrideTextColor?: string;
  onClick: () => void;
}

export const TextButton = ({ className, iconLeft, iconRight, text, overrideTextColor, onClick }: Props) => {
  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
    >
      {iconLeft && <span className="btn-icon">{iconLeft}</span>}
      <span style={{ color: overrideTextColor }}>{text}</span>
      {iconRight && iconRight}
    </button>
  );
};
