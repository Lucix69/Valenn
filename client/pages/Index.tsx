import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "@/context/AudioContext";
import { useEffect } from "react";

export default function Index() {
  const [noClickCount, setNoClickCount] = useState(0);
  const navigate = useNavigate();
  const { audioRef, savedTime } = useAudio();

  // Index page: Resume from saved time (from Intro page) or continue playing
  useEffect(() => {
    if (audioRef.current) {
      // If we have a saved time from Intro page, resume from there
      if (savedTime > 0) {
        audioRef.current.currentTime = savedTime;
      }
      // Continue playing if paused
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {
          // If autoplay fails, we can handle it silently
        });
      }
    }
  }, [audioRef, savedTime]);

  const handleNoClick = () => {
    setNoClickCount(noClickCount + 1);
  };

  const handleYesClick = () => {
    document.documentElement.style.opacity = "1";
    document.documentElement.style.transition = "opacity 1.5s ease-in-out";
    document.documentElement.style.opacity = "0";

    setTimeout(() => {
      navigate("/congratulations");
      document.documentElement.style.opacity = "1";
    }, 1500);
  };

  // Calculate the scale multiplier based on no clicks
  const yesScale = 1 + noClickCount * 0.3;

  // Get the No button text based on click count
  const getNoButtonText = () => {
    switch (noClickCount) {
      case 1:
        return "Are you sure ?";
      case 2:
        return "Dekhlo, aur nhi puchunga";
      case 3:
        return "Ill fuck you up , CLICK YES";
      case 4:
        return "Bro istg, click yes rn";
      case 5:
        return "Ye im done now, bye";
      case 6:
        return "You broke my heart";
      default:
        return noClickCount > 6 ? "bye" : "No";
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-16 sm:pt-20 bg-pink-100 overflow-hidden">
      {/* Decorative hearts in corners */}
      <div className="absolute top-6 left-6 text-pink-300 text-4xl opacity-70">♥</div>
      <div className="absolute top-12 right-10 text-pink-300 text-3xl opacity-70">♥</div>
      <div className="absolute bottom-10 left-8 text-pink-300 text-3xl opacity-70">♥</div>
      <div className="absolute bottom-6 right-6 text-pink-300 text-4xl opacity-70">♥</div>

      {/* Main content */}
      <div className="text-center px-4 sm:px-6 md:px-8 relative z-10">
        <div className="mb-8">
          <img src="https://media.tenor.com/OzxBMWtxNWsAAAAM/panda-love.gif" alt="Panda love" className="inline-block w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-6 animate-float-heart" style={{ animationDelay: "0.25s", filter: "brightness(1.1) saturate(1.2)" }} />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-12 leading-tight">
          Will you be my Valentine , love ?
        </h1>

        {/* Yes/No Options in Large Light Pink Cloud */}
        <div className="relative w-full max-w-4xl mx-auto mt-8">
          {/* Large Light Pink Cloud Container */}
          <div className="relative bg-pink-200 rounded-full shadow-xl p-12 sm:p-16 md:p-20 flex flex-col items-center justify-center gap-8">
            {/* Buttons Container */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-10">
              {/* Yes Cloud Button */}
              <button
                className="relative group cursor-pointer transition-all duration-300"
                onClick={handleYesClick}
                style={{ transform: `scale(${yesScale})` }}
              >
                <div className="relative w-40 h-24 sm:w-48 sm:h-28 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group-hover:bg-pink-50 flex flex-col items-center justify-center gap-1" style={{ backgroundColor: 'transparent', backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 50%)' }}>
                  <span className="text-2xl sm:text-3xl font-bold text-pink-600 group-hover:text-pink-700">
                    Yes
                  </span>
                  <img src="https://media.tenor.com/tl2_Qj0L4R8AAAAM/panda-dance.gif" alt="panda dance" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
                </div>
                {/* Cloud bumps - Outside the main shape */}
                <div className="absolute -left-3 top-1/2 w-4 h-4 bg-white rounded-full shadow-md"></div>
                <div className="absolute -right-3 top-1/4 w-5 h-5 bg-white rounded-full shadow-md"></div>
                <div className="absolute -bottom-3 left-1/4 w-3 h-3 bg-white rounded-full shadow-md"></div>
              </button>

              {/* No Cloud Button */}
              <button
                className="relative group cursor-pointer transition-all duration-300"
                onClick={handleNoClick}
              >
                <div className="relative w-40 h-24 sm:w-48 sm:h-28 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group-hover:bg-pink-50 flex flex-col items-center justify-center gap-1" style={{ backgroundColor: 'transparent', backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 50%)' }}>
                  <span className="text-2xl sm:text-3xl font-bold text-pink-600 group-hover:text-pink-700 text-center px-2">
                    {getNoButtonText()}
                  </span>
                  <img src="https://i.pinimg.com/originals/ba/05/84/ba05848aa94062e65b730304a4c20cfb.gif" alt="sad" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
                </div>
                {/* Cloud bumps - Outside the main shape */}
                <div className="absolute -left-3 top-1/2 w-4 h-4 bg-white rounded-full shadow-md"></div>
                <div className="absolute -right-3 top-1/4 w-5 h-5 bg-white rounded-full shadow-md"></div>
                <div className="absolute -bottom-3 left-1/4 w-3 h-3 bg-white rounded-full shadow-md"></div>
              </button>
            </div>

            {/* Warning text inside cloud */}
            <p className="text-sm sm:text-base text-gray-600 italic text-center max-w-xs">
              Try clicking No .. and its not gonna end well
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Heart(props: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={props.size || 24}
      height={props.size || 24}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
