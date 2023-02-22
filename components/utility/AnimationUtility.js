import { motion } from "framer-motion";

export function AnimOnHover({
  className,
  children,
  translate = false,
  speed = 0.2,
  scalar = 1.075,
  ...props
}) {
  return (
    <motion.button
      props={props}
      whileHover={{
        scale: translate == true ? 1.0 : scalar,
        transition: { duration: speed },
        y: translate == true ? scalar : 0.0
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export function AnimAppear({ className, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ x: 0, opacity: 0, duration: 1000, delay: delay }}
      animate={{ x: 0, opacity: 1, duration: 1000, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimAppearDirection({
  className,
  directionX = 300,
  directionY,
  speed = 1000,
  children
}) {
  return (
    <motion.div
      exit={{ x: 0, y: 0, opacity: 0, duration: speed }}
      initial={{ x: directionX, y: directionY, opacity: 0, duration: speed }}
      animate={{ x: 0, y: 0, opacity: 1, duration: speed }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
