import React, { useEffect, useRef } from "react";

const TeamNetworkBackground: React.FC = () => {
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

    const NODE_COUNT = 24;
    const nodes: any[] = [];

    class Node {
      x = Math.random() * w;
      y = Math.random() * h;
      vx = (Math.random() - 0.5) * 0.25;
      vy = (Math.random() - 0.5) * 0.25;
      r = Math.random() * 2 + 2;

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);

        // Slightly darker but not overpowering
        ctx.fillStyle = "rgba(15,23,42,0.35)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(37,99,235,0.35)";
        ctx.fill();
      }
    }

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push(new Node());
    }

    const drawConnections = (t: number) => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 220) {
            const alpha = 1 - dist / 220;

            ctx.strokeStyle = `rgba(37,99,235,${alpha * 0.22})`;
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Energy pulse traveling across connection
            const pulsePos = (t * 0.0004) % 1;

            const px =
              nodes[i].x +
              (nodes[j].x - nodes[i].x) * pulsePos;
            const py =
              nodes[i].y +
              (nodes[j].y - nodes[i].y) * pulsePos;

            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(56,189,248,0.6)";
            ctx.fill();
          }
        }
      }
    };

    const animate = (t: number) => {
      // MUCH lighter trail fade (prevents UI wash)
      ctx.fillStyle = "rgba(248,250,252,0.08)";
      ctx.fillRect(0, 0, w, h);

      nodes.forEach((n) => {
        n.update();
        n.draw();
      });

      drawConnections(t);

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

export default TeamNetworkBackground;
