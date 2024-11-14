import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CursorFollow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isCursorSupported, setIsCursorSupported] = useState(false);

  useEffect(() => {
    // Check if the device supports hover (e.g., desktops or laptops)
    const hasHover = window.matchMedia("(hover: hover)").matches;
    setIsCursorSupported(hasHover);

    if (!hasHover) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  // Only render the cursor follower if hover is supported
  if (!isCursorSupported) return null;

  return (
    <motion.div
      className="fixed w-8 h-8 pointer-events-none z-50"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
      }}
      transition={{
        type: "spring",
        mass: 0.2,
        stiffness: 100,
        damping: 10,
      }}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-sm" />
    </motion.div>
  );
};

export default CursorFollow;
