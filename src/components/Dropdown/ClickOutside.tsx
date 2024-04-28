import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';

interface Props {
  onClick: () => void;
  enabled: boolean;
  className?: string;
}

export const ClickOutside = ({ className, enabled, onClick, children }: PropsWithChildren<Props>) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const clickHandler = (evt: MouseEvent) => {
      if (!ref?.current) {
        return;
      }

      if (!evt.target) {
        return;
      }

      const containerElem = ref.current as HTMLElement;
      const targetElem = evt.target as HTMLElement;

      if (containerElem.contains(targetElem)) {
        return;
      }

      onClick();
    };

    document.addEventListener('mousedown', clickHandler);

    return () => {
      document.removeEventListener('mousedown', clickHandler);
    };
  }, [enabled, onClick]);

  return (
    <span
      className={className}
      ref={ref}
    >
      {children}
    </span>
  );
};
