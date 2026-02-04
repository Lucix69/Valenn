import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useAudio } from "@/context/AudioContext";

export default function Intro() {
  const navigate = useNavigate();
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([null, null, null, null, null]);
  const { audioRef, savedTime, setSavedTime } = useAudio();

  useEffect(() => {
    // Page 3: Pause audio so users can listen to box audio clips
    if (audioRef.current && !audioRef.current.paused) {
      // Save time before pausing
      setSavedTime(audioRef.current.currentTime);
      audioRef.current.pause();
    }
  }, [audioRef, setSavedTime]);

  useEffect(() => {
    // Add floating text animation styles with bounce effect across full page
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float-full-page-1 {
        0% {
          transform: translateY(0px) translateX(0px);
          opacity: 0.8;
        }
        25% {
          transform: translateY(-40px) translateX(20px);
          opacity: 0.85;
        }
        50% {
          transform: translateY(-80px) translateX(0px);
          opacity: 0.85;
        }
        75% {
          transform: translateY(-40px) translateX(-20px);
          opacity: 0.85;
        }
        100% {
          transform: translateY(0px) translateX(0px);
          opacity: 0.8;
        }
      }

      @keyframes float-full-page-2 {
        0% {
          transform: translateY(0px) translateX(0px);
          opacity: 0.8;
        }
        25% {
          transform: translateY(40px) translateX(20px);
          opacity: 0.85;
        }
        50% {
          transform: translateY(80px) translateX(0px);
          opacity: 0.85;
        }
        75% {
          transform: translateY(40px) translateX(-20px);
          opacity: 0.85;
        }
        100% {
          transform: translateY(0px) translateX(0px);
          opacity: 0.8;
        }
      }

      .float-text-1 {
        animation: float-full-page-1 25s ease-in-out infinite;
      }
      .float-text-2 {
        animation: float-full-page-2 28s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const notes = [
    "Tera sharmana meri jaana kabhi , Rakh loon chupake teri yaadein sabhi , khwabon mei mere haye tu hi basi , tu hi basi ,  tu hi basi",
    "Tum jo samne ho aa beithe, bolo saansei yeh chalein kaise ? , dil yeh hosh mei rahe kaise , tum jo samne ho aa beithee",
    "Kitne phool dekhe mei ne, Tere jaisa koi, mehka hi nahii",
    "Tere liye mandir mei jau , tere hi naam ka diya jalau, hasta rahe tu chaahe jo ho, Teri hasi ko nazar na lage",
    "Meri banogi kya ? Meri rahogi kya ? , Puche dil mera tumse yehi..  Meri banogi kya ? Meri rahogi kya ? Ab toh aadat lagi hai teri"
  ];

  // Audio configuration: URL, start time (seconds), end time (seconds)
  const audioConfig: { [key: number]: { url: string; startTime: number; endTime: number } } = {
    0: {
      url: "https://cdn.builder.io/o/assets%2F23a59bea3b274062904a96d7772f123d%2Fcc6875d5b60246f5812e88ce8f392400?alt=media&token=6a6990f2-86a6-4a7c-82b2-bf6215278a08&apiKey=23a59bea3b274062904a96d7772f123d",
      startTime: 19,
      endTime: 50
    },
    1: {
      url: "https://cdn.builder.io/o/assets%2F23a59bea3b274062904a96d7772f123d%2F96a3d3adf13e43638118c1c8eb673865?alt=media&token=78eb205c-79b7-4618-863a-253ed498945a&apiKey=23a59bea3b274062904a96d7772f123d",
      startTime: 49,
      endTime: 66
    },
    2: {
      url: "https://cdn.builder.io/o/assets%2F23a59bea3b274062904a96d7772f123d%2Fcc6752bf62994bd0ac2bf88191199705?alt=media&token=f13cf13a-86ee-4619-9ff8-0ceadbcb1d2b&apiKey=23a59bea3b274062904a96d7772f123d",
      startTime: 14,
      endTime: 27
    },
    3: {
      url: "https://cdn.builder.io/o/assets%2F23a59bea3b274062904a96d7772f123d%2Ffa4d0f6c2bf44fb6b54df8429b468d4a?alt=media&token=3243a296-4e32-4277-b0f8-b9dacd96cc01&apiKey=23a59bea3b274062904a96d7772f123d",
      startTime: 129,
      endTime: 150
    },
    4: {
      url: "/meri-banogi-kya.mp3",
      startTime: 63,
      endTime: 86
    }
  };

  const handleBoxHover = (index: number) => {
    setHoveredBox(index);

    // Play audio if this box has audio configuration
    if (audioConfig[index]) {
      const audio = audioRefs.current[index];
      if (audio) {
        const config = audioConfig[index];
        audio.currentTime = config.startTime;
        audio.play().catch(err => console.log("Audio play failed:", err));

        // Stop audio at end time
        const checkInterval = setInterval(() => {
          if (audio.currentTime >= config.endTime) {
            audio.pause();
            clearInterval(checkInterval);
          }
        }, 100);
      }
    }
  };

  const handleBoxLeave = (index: number) => {
    setHoveredBox(null);

    // Stop audio
    const audio = audioRefs.current[index];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const handleNextPage = () => {
    // Navigate to valentine page with fade effect
    document.documentElement.style.opacity = "1";
    document.documentElement.style.transition = "opacity 1.5s ease-in-out";
    document.documentElement.style.opacity = "0";

    setTimeout(() => {
      navigate("/valentine");
      document.documentElement.style.opacity = "1";
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-16 sm:pt-20 bg-pink-100 overflow-hidden">
      {/* Decorative hearts in corners */}
      <div className="absolute top-6 left-6 text-pink-300 text-4xl opacity-70">♥</div>
      <div className="absolute top-12 right-10 text-pink-300 text-3xl opacity-70">♥</div>
      <div className="absolute bottom-10 left-8 text-pink-300 text-3xl opacity-70">♥</div>
      <div className="absolute bottom-6 right-6 text-pink-300 text-4xl opacity-70">♥</div>

      {/* Floating background texts - Fixed to viewport */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        {/* First floating text - Top Left */}
        <div className="fixed left-4 top-12 text-pink-600 opacity-75 text-xs sm:text-sm font-medium max-w-xs float-text-1">
          You are my first thought when I wake up and the last one before I sleep
        </div>
        {/* Second floating text - Top Right */}
        <div className="fixed right-4 top-20 text-pink-600 opacity-75 text-xs sm:text-sm font-medium max-w-xs float-text-2" style={{ animationDelay: "2s" }}>
          You will always have a special place in my heart
        </div>
        {/* Third floating text - Bottom Left */}
        <div className="fixed left-4 bottom-24 text-pink-600 opacity-75 text-xs sm:text-sm font-medium max-w-xs float-text-1" style={{ animationDelay: "1s" }}>
          Talking to you is my favourite part of the day
        </div>
        {/* Fourth floating text - Bottom Right */}
        <div className="fixed right-4 bottom-12 text-pink-600 opacity-75 text-xs sm:text-sm font-medium max-w-xs float-text-2" style={{ animationDelay: "3s" }}>
          Every love song I hear, reminds me of you
        </div>
      </div>

      {/* Main content */}
      <div className="text-center px-4 sm:px-6 md:px-8 relative z-10 w-full">
        {/* Note boxes - 5 box grid layout without overlap */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          {/* First row: 2 boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4">
            {notes.slice(0, 2).map((note, index) => (
              <div
                key={index}
                className="relative group cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleBoxHover(index)}
                onMouseLeave={() => handleBoxLeave(index)}
              >
                {/* Audio elements for boxes with audio */}
                {audioConfig[index] && (
                  <audio
                    ref={(el) => { audioRefs.current[index] = el; }}
                    src={audioConfig[index].url}
                    preload="auto"
                  />
                )}

                {/* New highlighted rectangular design */}
                <div
                  className="relative rounded-lg shadow-md transition-transform duration-300 group-hover:shadow-lg group-hover:scale-105 transform-gpu overflow-hidden w-full max-w-full"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,237,229,0.95), rgba(255,222,200,0.95))',
                    border: '2px solid rgba(244,114,54,0.85)'
                  }}
                >
                  <div className="relative p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center min-h-[96px] sm:min-h-[120px] md:min-h-[140px] overflow-auto max-h-[180px] sm:max-h-[220px] md:max-h-[260px]">
                    <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium text-center break-words">
                      {note}
                    </p>

                    {audioConfig[index] && hoveredBox === index && (
                      <div className="flex items-center justify-center gap-1 mt-2 text-orange-500 animate-pulse">
                        <span className="text-sm font-medium">🎵 Playing...</span>
                      </div>
                    )}
                  </div>
                  {/* decorative bottom stroke like the attachment */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-orange-300 rounded-full opacity-90"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Second row: 1 center box (5th box) */}
          <div className="flex justify-center mb-4">
            <div
              className="relative group cursor-pointer transition-all duration-300 w-full md:w-3/5"
              onMouseEnter={() => handleBoxHover(4)}
              onMouseLeave={() => handleBoxLeave(4)}
            >
              {/* Audio element for box 4 */}
              {audioConfig[4] && (
                <audio
                  ref={(el) => { audioRefs.current[4] = el; }}
                  src={audioConfig[4].url}
                  preload="auto"
                />
              )}

              {/* New centered highlighted box design */}
              <div
                className="relative rounded-lg shadow-md transition-transform duration-300 group-hover:shadow-lg group-hover:scale-105 transform-gpu overflow-hidden w-full max-w-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(255,237,229,0.95), rgba(255,222,200,0.95))',
                  border: '2px solid rgba(244,114,54,0.85)'
                }}
              >
                <div className="relative p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center min-h-[110px] sm:min-h-[140px] md:min-h-[160px] overflow-auto max-h-[200px] sm:max-h-[260px] md:max-h-[300px]">
                  <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium text-center break-words">
                    {notes[4]}
                  </p>
                </div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-orange-300 rounded-full opacity-90"></div>
              </div>
            </div>
          </div>

          {/* Third row: Last 2 boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {notes.slice(2, 4).map((note, index) => (
              <div
                key={index + 2}
                className="relative group cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleBoxHover(index + 2)}
                onMouseLeave={() => handleBoxLeave(index + 2)}
              >
                {/* Audio elements for boxes with audio */}
                {audioConfig[index + 2] && (
                  <audio
                    ref={(el) => { audioRefs.current[index + 2] = el; }}
                    src={audioConfig[index + 2].url}
                    preload="auto"
                  />
                )}

                {/* New highlighted rectangular design */}
                <div
                  className="relative rounded-lg shadow-md transition-transform duration-300 group-hover:shadow-lg group-hover:scale-105 transform-gpu overflow-hidden w-full max-w-full"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,237,229,0.95), rgba(255,222,200,0.95))',
                    border: '2px solid rgba(244,114,54,0.85)'
                  }}
                >
                  <div className="relative p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center min-h-[96px] sm:min-h-[120px] md:min-h-[140px] overflow-auto max-h-[180px] sm:max-h-[220px] md:max-h-[260px]">
                    <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium text-center break-words">
                      {note}
                    </p>

                    {audioConfig[index + 2] && hoveredBox === index + 2 && (
                      <div className="flex items-center justify-center gap-1 mt-2 text-orange-500 animate-pulse">
                        <span className="text-sm font-medium">🎵 Playing...</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-orange-300 rounded-full opacity-90"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next page button in cloud */}
        <div className="relative w-full max-w-sm mx-auto mt-6">
          {/* Large Light Pink Cloud Container */}
          <div className="relative bg-pink-200 rounded-full shadow-xl p-6 sm:p-8 flex items-center justify-center">
            {/* Next Page Button */}
            <button
              className="relative group cursor-pointer transition-all duration-300"
              onClick={handleNextPage}
            >
              <div className="relative w-32 h-20 sm:w-40 sm:h-24 bg-transparent rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group-hover:bg-pink-50 flex items-center justify-center">
                <span className="text-xs sm:text-base font-bold text-pink-600 group-hover:text-pink-700 text-center px-3">
                  Next page
                </span>
                {/* Cloud bumps */}
                <div className="absolute -left-2 top-1/2 w-3 h-3 bg-white rounded-full"></div>
                <div className="absolute -right-2 top-1/4 w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute -bottom-2 left-1/4 w-2 h-2 bg-white rounded-full"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
