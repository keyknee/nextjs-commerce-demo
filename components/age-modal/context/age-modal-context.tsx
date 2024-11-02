'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AgeConfirmationContextType {
  ageConfirmed: boolean;
  confirmAge: () => void;
}

const AgeConfirmationContext = createContext<AgeConfirmationContextType | undefined>(undefined);

export const AgeConfirmationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ageConfirmed, setAgeConfirmed] = useState<boolean>(false);

  useEffect(() => {
    const storedAgeConfirmation = sessionStorage.getItem('ageConfirmed');
    if (storedAgeConfirmation === 'true') {
      setAgeConfirmed(true);
    }
  }, []);

  function confirmAge() {
    setAgeConfirmed(true);
    sessionStorage.setItem('ageConfirmed', 'true');
  }

  return (
    <AgeConfirmationContext.Provider value={{ ageConfirmed, confirmAge }}>
      {children}
    </AgeConfirmationContext.Provider>
  );
};

export const useAgeConfirmation = (): AgeConfirmationContextType => {
  const context = useContext(AgeConfirmationContext);
  if (!context) {
    throw new Error('useAgeConfirmation must be used within AgeConfirmationProvider');
  }
  return context;
};
