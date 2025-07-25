import { LazyMotion, domAnimation } from 'framer-motion';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function MotionLazy({ children }: Props) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}