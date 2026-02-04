import React, { createContext, useContext, useRef, useEffect, useState } from "react";

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  savedTime: number;
  setSavedTime: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedTime, setSavedTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.loop = true;
      
      // Track playing state
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);

      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
      };
    }
  }, []);

  return (
    <AudioContext.Provider value={{ audioRef, isPlaying, savedTime, setSavedTime }}>
      {/* Global audio element */}
      <audio
        ref={audioRef}
        src="https://cdn.builder.io/o/assets%2F23a59bea3b274062904a96d7772f123d%2Fc3d0bc52c3ca4f0d9626749e3b358878?alt=media&token=5797d0a0-a4eb-43f6-965c-dcde5f496a62&apiKey=23a59bea3b274062904a96d7772f123d"
        style={{ display: "none" }}
      />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
};
