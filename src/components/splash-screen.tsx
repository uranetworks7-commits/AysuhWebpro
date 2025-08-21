
"use client";

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const text = "Welcome To Ayush Server";

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500); // Increased duration for animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <style jsx>{`
        .animated-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(20px) scale(0.9);
          animation: letter-animation 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes letter-animation {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .word {
          margin: 0 0.5rem; /* Space between words */
        }
      `}</style>
      <h1 className="text-3xl font-bold text-primary md:text-5xl text-center">
        {text.split(' ').map((word, wordIndex) => (
          <span key={wordIndex} className="word inline-block">
            {word.split('').map((letter, letterIndex) => {
              const totalIndex = text.split(' ').slice(0, wordIndex).join('').length + letterIndex;
              return (
                <span
                  key={letterIndex}
                  className="animated-letter"
                  style={{ animationDelay: `${totalIndex * 0.05}s` }}
                >
                  {letter}
                </span>
              );
            })}
          </span>
        ))}
      </h1>
    </div>
  );
}
