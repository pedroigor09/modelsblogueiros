'use client';
import { useEffect, useState } from 'react';

interface CardLoaderProps {
  onComplete: () => void;
}

export const CardLoader: React.FC<CardLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 100); 
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="card-loader">
      <div className="stack">
        <div className="stack__card"></div>
        <div className="stack__card"></div>
        <div className="stack__card"></div>
      </div>
      
      <style jsx>{`
        .card-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #1a1f36 0%, #2d3561 100%);
          display: grid;
          place-items: center;
          z-index: 9999;
          animation: fadeOut 0.5s ease-out 2.5s forwards;
        }

        .stack {
          --stack-dur: 2s;
          --stack-delay: 0.05;
          --stack-spacing: 15%;
          
          overflow: hidden;
          position: relative;
          width: 14em;
          height: 32em;
        }

        .stack__card {
          aspect-ratio: 1;
          position: absolute;
          inset: 0;
          top: var(--stack-spacing);
          margin: auto;
          width: 70%;
          transform: rotateX(45deg) rotateZ(-45deg);
          transform-style: preserve-3d;
        }

        .stack__card::before {
          animation: card var(--stack-dur) infinite;
          background-color: hsl(223, 90%, 55%);
          border-radius: 7.5%;
          box-shadow: -0.5em 0.5em 1.5em rgba(15, 23, 42, 0.3);
          content: "";
          display: block;
          position: absolute;
          inset: 0;
        }

        .stack__card:nth-child(2) {
          top: 0;
        }

        .stack__card:nth-child(2)::before {
          animation-delay: calc(var(--stack-dur) * (-1 + var(--stack-delay)));
          background-color: hsl(223, 90%, 75%);
        }

        .stack__card:nth-child(3) {
          top: calc(var(--stack-spacing) * -1);
        }

        .stack__card:nth-child(3)::before {
          animation-delay: calc(var(--stack-dur) * (-1 + var(--stack-delay) * 2));
          background-color: hsl(223, 90%, 95%);
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 0L1.03553 6.96447C0.372492 7.62751 0 8.52678 0 9.46447V9.54584C0 11.4535 1.54648 13 3.45416 13C4.1361 13 4.80278 12.7981 5.37019 12.4199L7.125 11.25L6 15V16H10V15L8.875 11.25L10.6298 12.4199C11.1972 12.7981 11.8639 13 12.5458 13C14.4535 13 16 11.4535 16 9.54584V9.46447C16 8.52678 15.6275 7.62751 14.9645 6.96447L8 0Z' fill='hsl(0 0% 0% / 0.9)' /%3E%3C/svg%3E");
          background-position: center;
          background-repeat: no-repeat;
          background-size: 45% 45%;
        }

        @keyframes card {
          0%, 100% {
            animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
            transform: translateZ(0);
          }
          11% {
            animation-timing-function: cubic-bezier(0.32, 0, 0.67, 0);
            opacity: 1;
            transform: translateZ(0.125em);
          }
          34% {
            animation-timing-function: steps(1);
            opacity: 0;
            transform: translateZ(-12em);
          }
          48% {
            animation-timing-function: linear;
            opacity: 0;
            transform: translateZ(12em);
          }
          57% {
            animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
            opacity: 1;
            transform: translateZ(0);
          }
          61% {
            animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
            transform: translateZ(-1.8em);
          }
          74% {
            animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
            transform: translateZ(0.6em);
          }
          87% {
            animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
            transform: translateZ(-0.2em);
          }
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
};