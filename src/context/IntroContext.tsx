"use client";

import React, { createContext, useContext, useState } from "react";

export type IntroStage = "intro" | "travel" | "docked" | "hero" | "done";

interface IntroContextType {
  stage: IntroStage;
  setStage: (stage: IntroStage) => void;
  isHeroReady: boolean;
  isNavbarReady: boolean;
}

const IntroContext = createContext<IntroContextType>({
  stage: "intro",
  setStage: () => {},
  isHeroReady: false,
  isNavbarReady: false,
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<IntroStage>("intro");

  const isNavbarReady = stage === "docked" || stage === "hero" || stage === "done";
  const isHeroReady = stage === "hero" || stage === "done";

  return (
    <IntroContext.Provider value={{ stage, setStage, isHeroReady, isNavbarReady }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
