import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAudio } from "@/context/AudioContext";

export default function Landing() {
  const navigate = useNavigate();
  const { audioRef } = useAudio();

  useEffect(() => {
    // Landing page: Reset to 0 only if audio hasn't started yet (first visit from First page)
    // Otherwise, continue playing from current position (e.g., coming from NotFound)
    if (audioRef.current) {
      // Only reset to 0 if audio is at the very beginning and paused (first time)
      // If audio has progressed or is playing, continue from current position
      if (audioRef.current.currentTime < 0.5 && audioRef.current.paused) {
        audioRef.current.currentTime = 0;
      }
      // Continue playing if paused
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {
          // If autoplay fails, we can handle it silently
        });
      }
    }
  }, [audioRef]);

  const handleNextPage = () => {
    document.documentElement.style.opacity = "1";
    document.documentElement.style.transition = "opacity 1.5s ease-in-out";
    document.documentElement.style.opacity = "0";

    setTimeout(() => {
      navigate("/intro");
      document.documentElement.style.opacity = "1";
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-pink-100 overflow-hidden">
      {/* Decorative hearts in corners */}
      <div className="absolute top-6 left-6 text-pink-300 text-4xl opacity-70">♥</div>
      <div className="absolute top-12 right-10 text-pink-300 text-3xl opacity-70">♥</div>
      <div className="absolute bottom-10 left-8 text-pink-300 text-3xl opacity-70">♥</div>
      <div className="absolute bottom-6 right-6 text-pink-300 text-4xl opacity-70">♥</div>

      {/* Main content */}
      <div className="text-center px-4 sm:px-6 md:px-8 relative z-10 w-full flex flex-col items-center justify-center gap-8">
        {/* Text box with pink border */}
        <div className="max-w-4xl mx-auto">
          <div className="border-4 border-pink-400 rounded-xl p-10 sm:p-12 bg-white bg-opacity-50 backdrop-blur-sm max-h-screen overflow-y-auto">
            <p className="text-gray-800 text-sm sm:text-base leading-relaxed whitespace-pre-line text-left">
              {`Hi love,
This is going to be cheesy, I know .. but I truly hope you like it. I've spent sleepless nights making this, so I hope you take your time going though the entire thing and feel even a fraction of how much I love you.

Even though it's only been a few months since we started talking, getting closer to you has felt easy and real. Whatever I do, I do it simply because I want to. I've been in relationships before, yet I've never put in this much effort for anyone the way I do for you. Not because I'm trying to compete with the past or prove anything ... every single thing I do comes purely from love.

From giving flowers to a girl for the first time, to going on dates for the first time, to sharing my very first kiss .. so many of my "firsts" are with you. And that alone tells me how special you truly are to me. More than anything, I want you to always feel safe being yourself with me without any pressure, just honesty and comfort. 

I just love how you make me smile without even trying, talking to you or just walking silently with you makes me comfortable. 

I don't want to rush feelings or put any pressure on you. I just wanted you to know how special you are to me and how much I value what we share. I am really grateful to have you in my life. I don't know what the future looks like, but I do know that I enjoy the idea of discovering it slowly.. one moment at a time.. with you. `}
            </p>
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={handleNextPage}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
