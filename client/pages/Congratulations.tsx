import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAudio } from "@/context/AudioContext";

// Global URL for "Understand - Keshi" (same as in AudioContext)
const UNDERSTAND_KESHI_URL =
  "https://cdn.builder.io/o/assets%2F23a59bea3b274062904a96d7772f123d%2Fc3d0bc52c3ca4f0d9626749e3b358878?alt=media&token=5797d0a0-a4eb-43f6-965c-dcde5f496a62&apiKey=23a59bea3b274062904a96d7772f123d";

export default function Congratulations() {
  const navigate = useNavigate();
  const { audioRef } = useAudio();

  // On Congratulations page: stop previous song and play "Love Me" from 0:33
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Stop whatever was playing (e.g., "Understand - Keshi")
    audio.pause();

    // Configure and start the new song
    audio.loop = false;
    audio.src =
      "/Lil Wayne - Love Me (Explicit Version⧸Closed Captioned) ft. Drake, Future.mp3";
    audio.currentTime = 33; // start from 0:33

    audio
      .play()
      .catch(() => {
        // If autoplay fails (e.g., due to browser policies), fail silently
      });

    // When leaving this page, restore "Understand - Keshi"
    return () => {
      audio.pause();
      audio.src = UNDERSTAND_KESHI_URL;
      audio.loop = true;
      audio.currentTime = 0;
    };
  }, [audioRef]);

  const handleStartOver = () => {
    document.documentElement.style.opacity = "1";
    document.documentElement.style.transition = "opacity 1.5s ease-in-out";
    document.documentElement.style.opacity = "0";

    setTimeout(() => {
      navigate("/");
      document.documentElement.style.opacity = "1";
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Main content */}
      <div className="text-center px-4 sm:px-6 md:px-8 relative z-10 max-w-2xl">
        {/* Main heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="text-green-700 font-bold">
            Congrats,
          </span>
          <br />
          <span className="text-green-700">You are now</span>
        </h1>

        {/* Your GIF */}
        <div className="mb-6 relative z-10">
          <img
            src="https://i.pinimg.com/originals/ba/94/2d/ba942d0f325b049159c994ee531b63e2.gif"
            alt="Congratulations"
            className="inline-block w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-lg"
          />
        </div>

        {/* Completion message */}
        <p className="text-lg sm:text-xl text-green-700 mb-10 leading-relaxed">
          Valentine of the <span className="font-bold text-green-700 tracking-widest">G O A T</span>
        </p>

        {/* Button to go back */}
        <button
          onClick={handleStartOver}
          className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
