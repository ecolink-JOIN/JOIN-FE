import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PhotoContextType {
  photoUri: string | null;
  setPhotoUri: (uri: string | null) => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const usePhotoContext = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotoContext must be used within a PhotoProvider');
  }
  return context;
};

interface PhotoProviderProps {
  children: ReactNode;
}

export const PhotoProvider = ({ children }: PhotoProviderProps) => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  return <PhotoContext.Provider value={{ photoUri, setPhotoUri }}>{children}</PhotoContext.Provider>;
};
