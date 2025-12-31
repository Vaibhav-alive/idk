import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Heart, HeartHandshake } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, ...props }) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export function NewYearWish() {
  const [showWish, setShowWish] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setConfetti(particles);

    const heartParticles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      size: 20 + Math.random() * 20,
    }));
    setHearts(heartParticles);
  }, []);

  const handleReveal = () => setShowWish(true);

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0a1a3b 40%, #4b0a8bbb 100%)",
      }}
    >
      <div className="absolute inset-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-200 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 2,
              repeat: 1,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {hearts.map((heart) => (
        <motion.div
          key={`bg-heart-${heart.id}`}
          className="absolute"
          style={{ left: `${heart.x}%`, top: "110%" }}
          animate={{
            y: ["0vh", "-120vh"],
            x: [0, Math.sin(heart.id) * 50, 0],
            opacity: [0, 0.3, 0.6, 0.3, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            delay: heart.delay,
            repeat: 2,
            ease: "linear",
          }}
        >
          <Heart
            className="text-purple-300 fill-purple-300"
            style={{ width: heart.size, height: heart.size }}
          />
        </motion.div>
      ))}

      {showWish &&
        confetti.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{ left: `${particle.x}%`, top: "-5%" }}
            animate={{
              y: ["0vh", "110vh"],
              rotate: [0, 360, 720],
              opacity: [1, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: particle.delay,
              ease: "linear",
            }}
          >
            <Heart className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </motion.div>
        ))}     


      {showWish && confetti.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: '-5%',
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, 360, 720],
            opacity: [1, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: particle.delay,
            ease: 'linear',
          }}
        >
          <Heart className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-2xl px-6">
        {!showWish ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-center"
          >
            <Card className="bg-white/10 backdrop-blur-lg border-pink-300/30 shadow-2xl">
              <CardContent className="p-12">
                <motion.div
                  animate={{ 
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    <Heart className="w-24 h-24 text-red-400 fill-red-400" />
                    <motion.div
                      animate={{ 
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Heart className="w-16 h-16 text-pink-300 fill-pink-300" />
                    </motion.div>
                  </div>
                </motion.div>
                
                <h1 className="mb-6 text-white bg-gradient-to-r from-pink-200 via-rose-200 to-red-200 bg-clip-text text-transparent">
                  Happy New Year 2026!
                </h1>
                
                <p className="mb-8 text-pink-100">
                  A special message awaits you...
                </p>
                
                <Button
                  onClick={handleReveal}
                  size="lg"
                  className="bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Heart className="w-5 h-5 mr-2 fill-white" />
                  Open Your Heart
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 4 }}
            className="text-center"
          >
            <Card className="bg-white/10 backdrop-blur-lg border-purple-400/30 shadow-2xl" style={{
              background: 'radial-gradient(125% 125% at 50% 10%, #0d0d1f 40%, #9b0a8cbb 100%)'
            }}>
              <CardContent className="p-12">
                {/* Person Photos - 4 Images in Creative Layout */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-8 flex justify-center"
                >
                  <div className="relative w-full max-w-4xl">
                    {/* Massive glowing background effect */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: 1,
                        ease: 'linear'
                      }}
                      className="absolute inset-0 opacity-60 blur-3xl"
                      style={{
                        background: 'radial-gradient(125% 125% at 50% 10%, #1a0a2f 40%, #ffcc33bb 100%)'
                      }}
                    />
                    
                    {/* Giant pulsing glow */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.8, 0.4]
                      }}
                      transition={{ 
                        duration: 1, 
                        repeat: 1,
                      }}
                      className="absolute -inset-20 bg-gradient-to-r from-yellow-300 via-purple-400 to-pink-400 rounded-full blur-3xl"
                    />
                    
                    {/* Grid layout for 4 images */}
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                      {/* Image 1 - Top Left */}
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="relative group"
                      >
                        <motion.div
                          // animate={{ 
                          //   rotate: [0, 360],
                          //   scale: [1, 1.05, 1]
                          // }}
                          transition={{ 
                            duration: 2, 
                            repeat: 2,
                            ease: 'linear'
                          }}
                          className="absolute -inset-4 rounded-2xl opacity-70"
                          style={{
                            background: 'radial-gradient(125% 125% at 50% 10%, #1a0a2f 40%, #ffcc33bb 100%)'
                          }}
                        />
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          animate={{
                            boxShadow: [
                              '0 0 40px rgba(255, 204, 51, 0.6)',
                              '0 0 60px rgba(255, 51, 153, 0.8)'
                            ],
                            rotate: [0, 10, -10, 0],

                          }}
                          transition={{
                            duration: 3,
                            repeat: 2,
                          }}
                          className="relative overflow-hidden rounded-2xl"
                        >
                          <img
                            src="/img1.jpg"
                            alt="Happy moment 1"
                            className="w-full aspect-[5/4] sm:h-58 md:h-64 object-cover border-4 border-yellow-200/50 rounded-2xl"
                            loading="lazy"
                          />
                        </motion.div>
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -top-3 -right-3"
                        >
                          <Heart className="w-10 h-10 text-red-500 fill-red-500 drop-shadow-2xl" />
                        </motion.div>
                      </motion.div>

                      {/* Image 2 - Top Right */}
                      <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, type: 'spring' }}
                        className="relative group"
                      >
                        <motion.div
                          // animate={{ 
                          //   rotate: [360, 0],
                          //   scale: [1, 1.05, 1]
                          // }}
                          transition={{ 
                            duration: 4, 
                            repeat: 1,
                            ease: 'linear'
                          }}
                          className="absolute -inset-4 rounded-2xl opacity-70"
                          style={{
                            background: 'radial-gradient(125% 125% at 50% 10%, #1a0a2f 40%, #ffcc33bb 100%)'
                          }}
                        />
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          animate={{
                            boxShadow: [
                              '0 0 40px rgba(255, 51, 153, 0.6)',
                              '0 0 60px rgba(138, 43, 226, 0.8)'
                            ],
                            rotate: [0, 10, -10, 0],

                          }}
                          transition={{
                            duration: 2,
                            repeat: 2,
                            delay: 1,
                          }}
                          className="relative overflow-hidden rounded-2xl"
                        >
                          <img
                            src="/img2.jpg"
                            alt="Happy moment 2"
                            className="w-full aspect-[4/5] object-cover border-4 border-pink-200/50 rounded-2xl"
                            loading="lazy"
                          />
                        </motion.div>
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 6, repeat: Infinity, delay: 0.3 }}
                          className="absolute -top-3 -left-3"
                        >
                          <Sparkles className="w-10 h-10 text-yellow-300 drop-shadow-2xl" />
                        </motion.div>
                      </motion.div>

                      {/* Image 3 - Bottom Left */}
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="relative group"
                      >
                        <motion.div
                          // animate={{ 
                          //   rotate: [0, 360],
                          //   scale: [1, 1.05, 1]
                          // }}
                          transition={{ 
                            duration: 2, 
                            repeat: 1,
                            ease: 'linear'
                          }}
                          className="absolute -inset-4 rounded-2xl opacity-70"
                          style={{
                            background: 'radial-gradient(125% 125% at 50% 10%, #1a0a2f 40%, #ffcc33bb 100%)'
                          }}
                        />
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          animate={{
                            boxShadow: [
                              '0 0 40px rgba(138, 43, 226, 0.6)',
                              '0 0 60px rgba(255, 204, 51, 0.8)'
                            ],
                            rotate: [0, 10, -10, 0],

                          }}
                          transition={{
                            
                            duration: 2,
                            repeat: 1,
                            delay: 2,
                          }}
                          className="relative overflow-hidden rounded-2xl"
                        >
                          <img
                            src="/img3.jpg"
                            alt="Happy moment 3"
                            className="w-full aspect-[5/4] object-cover border-4 border-purple-200/50 rounded-2xl"
                          />
                        </motion.div>
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                          className="absolute -bottom-3 -right-3"
                        >
                          <Heart className="w-10 h-10 text-pink-400 fill-pink-400 drop-shadow-2xl" />
                        </motion.div>
                      </motion.div>

                      {/* Image 4 - Bottom Right */}
                      <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, type: 'spring' }}
                        className="relative group"
                      >
                        <motion.div
                          // animate={{ 
                          //   rotate: [360, 0],
                          //   scale: [1, 1.05, 1]
                          // }}
                          transition={{ 
                            duration: 2, 
                            repeat: 1,
                            ease: 'linear'
                          }}
                          className="absolute -inset-4 rounded-2xl opacity-70"
                          style={{
                            background: 'radial-gradient(125% 125% at 50% 10%, #1a0a2f 40%, #ffcc33bb 100%)'
                          }}
                        />
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          animate={{
                            boxShadow: [
                              '0 0 40px rgba(255, 204, 51, 0.6)',
                              '0 0 60px rgba(255, 51, 153, 0.8)'
                            ],
                            rotate: [0, 10, -10, 0],

                          }}
                          transition={{
                            duration: 3,
                            repeat: 2,
                            delay: 1,
                          }}
                          className="relative overflow-hidden rounded-2xl"
                        >
                          <img
                            src="/img4.jpg"
                            alt="Happy moment 4"
                            className="w-full aspect-[5/4] object-cover border-4 border-yellow-200/50 rounded-2xl"
                          />
                        </motion.div>
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], rotate: [0, -15, 15, 0] }}
                          transition={{ duration: 2.8, repeat: Infinity, delay: 0.7 }}
                          className="absolute -bottom-3 -left-3"
                        >
                          <Sparkles className="w-10 h-10 text-purple-300 drop-shadow-2xl" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Center floating heart */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.5, 1],
                        rotate: [0, 360],
                        y: [-10, 10, -10]
                      }}
                      transition={{ 
                        duration: 9, 
                        repeat: 2,
                      }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    >
                      <Heart className="w-20 h-20 text-red-500 fill-red-500 drop-shadow-2xl opacity-90" />
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4 text-pink-100"
                >
                  My Love, My Everything
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6"
                >
                  <div className="flex justify-center mb-4">
                    <HeartHandshake className="w-12 h-12 text-yellow-300" />
                  </div>
                  
                  <p className="text-pink-50 italic leading-relaxed">
                    "As we step into 2026, I want you to know that you are my greatest blessing. 
                    May this year fill our hearts with deeper love, our days with endless laughter, 
                    and our nights with sweet dreams of forever together."
                  </p>
                  
                  <p className="text-purple-200 italic">
                    "Every moment with you is a treasure, and I can't wait to create 
                    more beautiful memories in this new year."
                  </p>
                  
                  <motion.div
                    className="flex items-center justify-center gap-3 pt-6"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <p className="text-yellow-200">
                      Forever yours, always and forever
                    </p>
                    <Heart className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-8"
                >
                  <Button
                    onClick={() => setShowWish(false)}
                    variant="outline"
                    className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-100 border-purple-300/30 hover:border-purple-300/50"
                  >
                    <Heart className="w-4 h-4 mr-2 fill-purple-200" />
                    Read Again
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Floating Rose Petals Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute w-3 h-3 bg-rose-300 rounded-full opacity-40 blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: 1,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
