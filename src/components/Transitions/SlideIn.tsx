import { AnimatePresence, easeOut, motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

import { TransitionProps } from './types';

export const SlideIn = (props: PropsWithChildren<TransitionProps>) => {
  const config = {
    initial: { opacity: 0.2, transform: 'translate(0px, 20px)' },
    animate: { opacity: 1, transform: 'translate(2rem, 0rem)', transition: { duration: 0.2, ease: easeOut } },
    exit: { opacity: 0.2, transform: 'translate(2rem, 20em)', transition: { duration: 0.2, ease: easeOut } },
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
