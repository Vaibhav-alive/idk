import { motion } from "framer-motion"
import Image from "next/image"

const slideVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: "0%", opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
}

export default function FinalScreen({ onNext }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full w-full text-center px-2"
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* GIF */}
      <motion.div
        className="w-40 h-40 p-4 rounded-full bg-pink-900/10 border-2 border-pink-400/25 backdrop-blur-sm flex items-center justify-center overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Image
          loading="lazy"
          src='/gifs/cute.gif'
          width={130}
          height={130}
          alt='cute gif'
          className='object-contain'
          unoptimized
        />
      </motion.div>

      {/* Final Text */}
      <motion.h2
        className="mt-8 text-3xl md:text-4xl font-dancing-script text-zinc-50 font-medium leading-tight"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        You’ll always be special to me
      </motion.h2>

      {/* Button */}
      <motion.button
        onClick={onNext}
        className="mt-8 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-red-500"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        One More Thing!!!
      </motion.button>
    </motion.div>
  )
}
