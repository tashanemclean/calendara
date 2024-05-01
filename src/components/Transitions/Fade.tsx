import { AnimatePresence, easeOut, motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

import { TransitionProps } from './types';

export const Fade = (props: PropsWithChildren<TransitionProps>) => {
  const config = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2, ease: easeOut } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: easeOut } },
  };

  return (
    <AnimatePresence>
      {props.enter && (
        <motion.div
          initial={config.initial}
          animate={config.animate}
          exit={config.exit}
        >
          {props.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
