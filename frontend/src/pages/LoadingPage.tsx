import { motion } from "framer-motion";

function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 border-4 border-yellow-200 border-dashed rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-4 border-4 border-t-transparent border-yellow-300 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}

export default LoadingPage;
