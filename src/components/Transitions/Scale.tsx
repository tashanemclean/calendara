import { AnimatePresence, easeOut, motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

import { TransitionProps } from './types';

export const Scale = (props: PropsWithChildren<TransitionProps>) => {
  const config = {
    initial: { transform: 'scale(0.2)' },
    animate: { transform: 'scale(1)', transition: { duration: 0.2, ease: easeOut } },
    exit: { transform: 'scale(0.2)', transition: { duration: 0.2, ease: easeOut } },
  };

  return (
    <AnimatePresence>
      {props.enter && (
        <motion.div
          initial={config.initial}
          animate={config.animate}
          exit={config.exit}
          className={props.className}
        >
          {props.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
