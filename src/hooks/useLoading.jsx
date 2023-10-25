
import React, { createContext, useContext, useState } from 'react';
import { LoadingContext } from '../contexts/LoadingContext.jsx';

export default function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) throw new Error('useLoading must be used within LoadingProvider');
    return context;
  }