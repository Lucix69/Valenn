import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAudio } from "@/context/AudioContext";

const NotFound = () => {
  const location = useLocation();
  const { audioRef } = useAudio();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  // Keep "Understand - Keshi" playing on the NotFound page too
  useEffect(() => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current
        .play()
        .catch(() => {
          // Autoplay might be blocked; ignore
        });
    }
  }, [audioRef]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
