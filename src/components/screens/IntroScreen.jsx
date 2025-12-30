"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef } from "react";

export default function IntroScreen({ onNext }) {
    const conf = useRef(false)
    const intervalRef = useRef(null);

    const handleclick = () => {
        if (window.confetti) {
            window.confetti({
                particleCount: 100,
                spread: 100,
                startVelocity: 40,
                origin: { y: 0.7 },

            });
        }
        const duration = 5000; // 5 seconds – change if you want longer
        const end = Date.now() + duration;

        function frame() {
            // Corners blast
            window.confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.9 },
                colors : ['#bb0000']
            });

            window.confetti({
                particleCount: 2,
                angle: 110,
                spread: 50,
                origin: { x: 1, y: 0.9 },
                colors : ['#ffff']

            });

            // ⬇️ THIS LINE decides if loop continues
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }

            requestAnimationFrame(frame);
        onNext()
    }
    return (
        <div>
            {/* <audio src="/music.mp3"  ref={audio}/> */}
            <div className="place-items-center max-w-3xl text-center">
                <motion.div
                    className="mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, }}
                >
                    <div className="w-36 h-36 mx-auto rounded-full bg-linear-to-br from-pink-700/15 to-rose-700/15 flex items-end justify-center border-2 border-pink-400/25 backdrop-blur-sm overflow-hidden">
                        <motion.div>
                            <img loading="lazy" src="/gifs/waving.gif" className="h-28 -mb-2" alt="waving" />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl w-full font-bold mb-4 bg-linear-to-r from-pink-400 via-rose-400 to-pink-400 bg-clip-text text-transparent font-dancing-script leading-tight"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Hey Beautiful
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-foreground/90 mb-8"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    There’s something I want you to know.
                </motion.p>

                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <motion.button
                        className="bg-linear-to-r from-pink-500 via-rose-500 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-pink-500/25 transition-all relative overflow-hidden flex items-center gap-2 will-change-transform"
                        onClick={handleclick}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}

                    >
                        <span className="relative z-10">Open My Heart </span> <Heart size={20} className="fill-current" />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}