import React, { useEffect, useRef } from "react";

const DiseaseBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const verticalLines = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * w,
      speed: Math.random() * 0.6 + 0.3,
      opacity: Math.random() * 0.15 + 0.05
    }));

    const focusZones = [
      { x: 0.2, y: 0.3 },
      { x: 0.7, y: 0.3 },
      { x: 0.3, y: 0.7 },
      { x: 0.7, y: 0.7 }
    ];

    let focusIndex = 0;

    setInterval(() => {
      focusIndex = (focusIndex + 1) % focusZones.length;
    }, 9000);

    const drawVerticalSignals = () => {
      verticalLines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x, 0);
        ctx.lineTo(line.x, h);

        ctx.strokeStyle = `rgba(37,99,235,${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        line.x += line.speed;

        if (line.x > w) {
          line.x = 0;
        }
      });
    };

    const drawBrainWaves = (t: number) => {
      ctx.strokeStyle = "rgba(56,189,248,0.08)";
      ctx.lineWidth = 1;

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();

        for (let x = 0; x < w; x += 8) {
          const y =
            h * (0.25 + i * 0.2) +
            Math.sin(x * 0.01 + t * 0.001) * 20;

          ctx.lineTo(x, y);
        }

        ctx.stroke();
      }
    };

    const drawFocusGlow = () => {
      const f = focusZones[focusIndex];

      const gx = w * f.x;
      const gy = h * f.y;

      const gradient = ctx.createRadialGradient(
        gx,
        gy,
        0,
        gx,
        gy,
        320
      );

      gradient.addColorStop(0, "rgba(56,189,248,0.12)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    };

    const animate = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      drawFocusGlow();
      drawVerticalSignals();
      drawBrainWaves(t);

      requestAnimationFrame(animate);
    };

    animate(0);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none"
      }}
    />
  );
};

export default DiseaseBackground;
