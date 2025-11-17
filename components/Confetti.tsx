
import React from 'react';

const ConfettiPiece: React.FC<{ initialX: number; initialY: number; delay: number; color: string }> = ({ initialX, initialY, delay, color }) => {
  const animationDuration = 2 + Math.random() * 2;
  const rotateX = Math.random() * 360;
  const rotateY = Math.random() * 360;
  const rotateZ = Math.random() * 360;

  return (
    <div
      className="absolute w-2 h-4"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        backgroundColor: color,
        animation: `fall ${animationDuration}s linear ${delay}s infinite`,
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
      }}
    />
  );
};

const Confetti: React.FC = () => {
  const pieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: -10 - Math.random() * 20,
    delay: Math.random() * 3,
    color: ['#fecaca', '#fce7f3', '#d8b4fe', '#fef3c7'][Math.floor(Math.random() * 4)],
  }));

  return (
    <>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {pieces.map(p => (
          <ConfettiPiece key={p.id} {...p} />
        ))}
      </div>
    </>
  );
};

export default Confetti;
