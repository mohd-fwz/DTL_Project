import React, { useEffect, useRef } from "react";

interface Props {
  isRecording: boolean;
  isProcessing: boolean;
}

const AudioReactiveBackground: React.FC<Props> = ({
  isRecording,
  isProcessing
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getByteFrequencyData = (array: Uint8Array) => {
    if (analyserRef.current) {
      analyserRef.current.getByteFrequencyData(array as any);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const COUNT = 70;
    const particles: any[] = [];

    class Particle {
      x = Math.random() * width;
      y = Math.random() * height;

      vx = (Math.random() - 0.5) * 0.35;
      vy = (Math.random() - 0.5) * 0.35;

      baseSpeed = Math.random() * 0.5 + 0.3;

      r = Math.random() * 1.5 + 2.5;

      draw(brightness: number) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(30,64,175,${0.4 + brightness * 0.5})`;

        ctx.shadowBlur = 10 + brightness * 25;
        ctx.shadowColor = "rgba(30,64,175,0.8)";

        ctx.fill();
      }

      update(flowX: number, flowY: number) {
        this.vx += flowX;
        this.vy += flowY;

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.98;
        this.vy *= 0.98;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
    }

    for (let i = 0; i < COUNT; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.fillStyle = "rgba(249,251,253,0.35)";
      ctx.fillRect(0, 0, width, height);

      let intensity = 0;

      if (analyserRef.current && dataArrayRef.current) {
        getByteFrequencyData(dataArrayRef.current);

        const avg =
          dataArrayRef.current.reduce((a, b) => a + b, 0) /
          dataArrayRef.current.length;

        intensity = avg / 255;
      }

      const flowStrength = isRecording ? intensity * 0.12 : 0.005;

      const angle = Date.now() * 0.0002;

      const flowX = Math.cos(angle) * flowStrength;
      const flowY = Math.sin(angle) * flowStrength;

      const cx = width / 2;
      const cy = height / 2;

      particles.forEach((p) => {
        if (isProcessing) {
          const dx = p.x - cx;
          const dy = p.y - cy;

          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          p.x -= (dx / dist) * 0.8;
          p.y -= (dy / dist) * 0.8;
        } else {
          p.update(flowX, flowY);
        }

        p.draw(intensity);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [isRecording, isProcessing]);

  // AUDIO HOOK
  useEffect(() => {
    if (!isRecording) return;

    const initAudio = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });

      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();

      analyser.fftSize = 256;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      audioContextRef.current = audioCtx;
    };

    initAudio();

    return () => {
      audioContextRef.current?.close();
      analyserRef.current = null;
    };
  }, [isRecording]);

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

export default AudioReactiveBackground;
