import React, { createContext, useContext, useState } from 'react';


export const LoadingContext = createContext();

export default function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
  
    return (
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        {children}
      </LoadingContext.Provider>
    );
  }