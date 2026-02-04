import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../context/AudioContext";

export default function First() {
  const navigate = useNavigate();
  const { audioRef } = useAudio();

  // Ensure "Understand - Keshi" is playing (or keeps playing) on this page
  useEffect(() => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current
        .play()
        .catch(() => {
          // Autoplay might be blocked; fail silently
        });
    }
  }, [audioRef]);

  const handleNavigateWithFade = () => {
    document.documentElement.style.opacity = "1";
    document.documentElement.style.transition = "opacity 1.5s ease-in-out";
    document.documentElement.style.opacity = "0";

    setTimeout(() => {
      navigate("/landing");
      document.documentElement.style.opacity = "1";
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative bg-gradient-to-b from-pink-50 via-pink-100 to-rose-100">
      {/* Falling hearts background */}
      <style>{`
        @keyframes fall-heart {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .falling-heart {
          position: fixed;
          top: -10vh;
          font-size: 2rem;
          opacity: 0.6;
          pointer-events: none;
          animation: fall-heart 8s infinite;
        }
      `}</style>

      {/* Generate falling hearts */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="falling-heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}
        >
          ❤️
        </div>
      ))}

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 sm:px-8 gap-8">
        {/* Label AIEN */}
        <div className="text-center">
          <p className="text-pink-600 font-bold" style={{ fontSize: "72px" }}>AIEN</p>
        </div>

        {/* Cloud button container */}
        <div className="relative w-48 h-32 sm:w-56 sm:h-40">
          {/* Cloud shape background */}
          <div
            className="absolute inset-0 rounded-full shadow-lg"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(10px)",
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
            }}
          ></div>
          {/* GIF display */}
          <div className="absolute inset-4 flex items-center justify-center">
            <img
              src="/cdcdbf9dc201fbfbf768a4c090e37056.gif"
              alt="Let's Begin"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          {/* Cloud bumps (white circles) */}
          <div className="absolute -left-4 top-1/2 w-5 h-5 bg-white rounded-full shadow-md transform -translate-y-1/2"></div>
          <div className="absolute -right-4 top-1/2 w-5 h-5 bg-white rounded-full shadow-md transform -translate-y-1/2"></div>
          <div className="absolute left-1/2 -top-5 w-5 h-5 bg-white rounded-full shadow-md transform -translate-x-1/2"></div>
          <div className="absolute left-1/2 -bottom-5 w-5 h-5 bg-white rounded-full shadow-md transform -translate-x-1/2"></div>

          {/* Clickable button */}
          <button
            onClick={handleNavigateWithFade}
            className="absolute inset-0 w-full h-full rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer hover:shadow-xl transition-shadow"
            aria-label="Continue"
          ></button>
        </div>
      </div>
    </div>
  );
}
