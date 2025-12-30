"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Welcome from "@/components/screens/IntroScreen";
import Compliment from "@/components/screens/ComplimentsScreen";
import Message from "@/components/screens/MessageScreen";
import Final from "@/components/screens/FinalScreen";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState("welcome");

  const handleNext = () => {
    if (currentScreen === "welcome") setCurrentScreen("compliment");
    else if (currentScreen === "compliment") setCurrentScreen("message");
    else if (currentScreen === "message") setCurrentScreen("final");
  };

  const bgMap = {
    welcome: "radial-gradient(125% 125% at 50% 10%, #1a0a0f 40%, #5c0018 100%)",
    compliment: "radial-gradient(125% 125% at 50% 10%, #0d0012 40%, #3e007a 100%)",
    message: "radial-gradient(125% 125% at 50% 10%, #050505 40%, #3f031cbb 100%)",
    final: "radial-gradient(125% 125% at 50% 10%, #0a0a2a 40%, #3b0a6bbb 100%)",
  };

  const screens = {
    welcome: <Welcome onNext={handleNext} />,
    compliment: <Compliment onNext={handleNext} />,
    message: <Message onNext={handleNext} />,
    final: <Final />,
  };

  const ScreenWrapper = ({ children, keyName }) => (
    <motion.div
      key={keyName}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1 }}
      className="relative z-10 flex items-center justify-center min-h-screen w-full"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen + "-bg"}
          className="absolute inset-0"
          style={{ background: bgMap[currentScreen] }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Screens */}
      <AnimatePresence mode="wait">
        {Object.entries(screens).map(([key, Component]) =>
          currentScreen === key ? (
            <ScreenWrapper keyName={key}>{Component}</ScreenWrapper>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
