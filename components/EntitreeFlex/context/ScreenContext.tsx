"use client"
import React, { useEffect, useState } from 'react';
import { createContext, useContext, ReactNode } from 'react';

interface ScreenContextProps {
  screenWidth: number | null;
  setScreenWidth: React.Dispatch<React.SetStateAction<number | null>>;

  screenHeight: number | null;
  setScreenHeight: React.Dispatch<React.SetStateAction<number | null>>;
}

const ScreenContext = createContext<ScreenContextProps | undefined>(undefined);

export const ScreenContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  const [screenHeight, setScreenHeight] = useState<number | null>(null);
  useEffect(() => {
    const updateScreenWidthHight = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    updateScreenWidthHight();

    window.addEventListener('resize', updateScreenWidthHight);

    return () => {
      window.removeEventListener('resize', updateScreenWidthHight);
    };
  }, []);

  return (
    <ScreenContext.Provider value={{ screenWidth, setScreenWidth, screenHeight, setScreenHeight }}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreenContext = () => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error('useScreenContext must be used within a ScreenContextProvider');
  }
  return context;
};
