'use client';

import { useEffect, useRef } from 'react';

type HeroCanvasProps = {
  text: string;
  lang?: 'ar' | 'en';
};

export default function HeroCanvas({
  text,
  lang = 'ar',
}: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const DPR = window.devicePixelRatio || 1;
    const W = 900;
    const H = 420;

    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(DPR, DPR);

    let glow = 0;
    let dir = 1;

    const drawBackground = () => {
      const g = ctx.createRadialGradient(
        W / 2,
        H / 2,
        50,
        W / 2,
        H / 2,
        500
      );
      g.addColorStop(0, '#020617');
      g.addColorStop(1, '#000000');

      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    };
    const drawPanels = () => {
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = '#1E3A8A';

      for (let i = 0; i < 4; i++) {
        ctx.strokeRect(
          W * 0.55 + i * 30,
          60 + i * 25,
          160,
          60
        );
      }
      ctx.restore();
    };

    const drawText = () => {
      ctx.save();
      ctx.textAlign = lang === 'ar' ? 'right' : 'left';
      ctx.textBaseline = 'middle';
      ctx.direction = lang === 'ar' ? 'rtl' : 'ltr';
      ctx.font =
        lang === 'ar'
          ? 'bold clamp(0.8rem, 1.5vw, 1.5rem) "Cairo", sans-serif'
          : 'bold clamp(0.8rem, 1.5vw, 1.5rem) "Inter", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#2563EB';
      ctx.shadowBlur = 25;
      const x = lang === 'ar' ? W * 0.65 : 250;
      ctx.fillText(text, x, H / 2);
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      drawBackground();
      drawPanels();
      drawText();
      glow += 0.02 * dir;
      if (glow > 1) dir = -1;
      if (glow < 0) dir = 1;

      requestAnimationFrame(animate);
    };

    animate();
  }, [text, lang]);

  return <canvas ref={canvasRef} />;
}
