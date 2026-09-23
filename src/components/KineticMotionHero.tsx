import { useEffect, useRef } from "react";
import "./styles/KineticMotionHero.css";

interface ShapeNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  type: "keyframe" | "anchor" | "cross" | "ring" | "text" | "cube" | "tag";
  label?: string;
  color: string;
  rotation: number;
  vRot: number;
  pulseSpeed: number;
  phase: number;
}

const PALETTE = [
  "#ff1e42", // Primary Crimson Red
  "#ff3b5c", // Vibrant Scarlet
  "#ff0038", // Electric Red
  "#ff6b81", // Soft Ruby Glow
  "#ffffff", // Clean White
  "#ff4757", // Bright Coral Red
  "#d63031", // Deep Carmine
];

const LABELS = [
  "60 FPS",
  "KEYFRAME",
  "BEZIER",
  "MOTION",
  "3D RENDER",
  "TYPOGRAPHY",
  "VECTOR",
  "TIMELINE",
];

const KineticMotionHero = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    prevX: -1000,
    prevY: -1000,
    vx: 0,
    vy: 0,
    isHovering: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initNodes();
    };

    window.addEventListener("resize", handleResize);

    // Create motion graphic nodes
    let nodes: ShapeNode[] = [];
    const trailParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;
    }> = [];

    const initNodes = () => {
      nodes = [];
      const nodeCount = Math.floor(Math.min(width, 1400) / 45);

      for (let i = 0; i < nodeCount; i++) {
        const xMin = width > 800 ? width * 0.35 : width * 0.1;
        const xMax = width * 0.95;
        const x = xMin + Math.random() * (xMax - xMin);
        const y = height * 0.12 + Math.random() * (height * 0.76);

        const types: ShapeNode["type"][] = [
          "keyframe",
          "anchor",
          "cross",
          "ring",
          "text",
          "cube",
          "tag",
        ];
        const type = types[Math.floor(Math.random() * types.length)];
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        const label =
          type === "text" || type === "tag"
            ? LABELS[Math.floor(Math.random() * LABELS.length)]
            : undefined;

        nodes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          baseX: x,
          baseY: y,
          size:
            type === "ring"
              ? 22 + Math.random() * 26
              : type === "cube"
              ? 18 + Math.random() * 20
              : 14 + Math.random() * 16,
          type,
          label,
          color,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.02,
          pulseSpeed: 1 + Math.random() * 2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    initNodes();

    // Mouse handlers
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      mouseRef.current.vx = currentX - mouseRef.current.prevX;
      mouseRef.current.vy = currentY - mouseRef.current.prevY;
      mouseRef.current.prevX = currentX;
      mouseRef.current.prevY = currentY;
      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.isHovering = true;

      // Spawn fiery red motion trail particles
      const speed = Math.hypot(mouseRef.current.vx, mouseRef.current.vy);
      if (speed > 2) {
        for (let i = 0; i < Math.min(speed, 5); i++) {
          trailParticles.push({
            x: currentX + (Math.random() - 0.5) * 12,
            y: currentY + (Math.random() - 0.5) * 12,
            vx: -mouseRef.current.vx * 0.15 + (Math.random() - 0.5) * 1.5,
            vy: -mouseRef.current.vy * 0.15 + (Math.random() - 0.5) * 1.5,
            life: 1.0,
            color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
            size: 2 + Math.random() * 3,
          });
        }
      }
    };

    const onMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Burst of energetic red particles on click
      for (let i = 0; i < 24; i++) {
        const angle = (Math.PI * 2 * i) / 24;
        const vel = 3 + Math.random() * 5.5;
        trailParticles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel,
          life: 1.2,
          color: PALETTE[i % PALETTE.length],
          size: 3 + Math.random() * 4,
        });
      }

      // Disperse nearby nodes
      nodes.forEach((node) => {
        const dx = node.x - clickX;
        const dy = node.y - clickY;
        const dist = Math.hypot(dx, dy);
        if (dist < 220) {
          const force = (1 - dist / 220) * 15;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", onClick);

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw dynamic bezier connection lines between nearby nodes
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 140;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.strokeStyle = `rgba(255, 30, 66, ${alpha})`;
            ctx.beginPath();
            const mx = (a.x + b.x) / 2 + Math.sin(time + a.phase) * 10;
            const my = (a.y + b.y) / 2 + Math.cos(time + b.phase) * 10;
            ctx.moveTo(a.x, a.y);
            ctx.quadraticCurveTo(mx, my, b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw active mouse connector web if hovering
      if (mouseRef.current.isHovering) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const d = Math.hypot(n.x - mx, n.y - my);
          if (d < 180) {
            const alpha = (1 - d / 180) * 0.5;
            ctx.strokeStyle = `rgba(255, 30, 66, ${alpha})`;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // 3. Render and update trail particles
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const p = trailParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life -= 0.025;

        if (p.life <= 0) {
          trailParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Update and render graphic & motion designer nodes
      nodes.forEach((node) => {
        const hoverX = Math.sin(time * node.pulseSpeed + node.phase) * 18;
        const hoverY = Math.cos(time * (node.pulseSpeed * 0.8) + node.phase) * 18;

        if (mouseRef.current.isHovering) {
          const dx = node.x - mouseRef.current.x;
          const dy = node.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);
          const influenceRadius = 160;

          if (dist < influenceRadius && dist > 0) {
            const force = (1 - dist / influenceRadius) * 4;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }

        const targetX = node.baseX + hoverX;
        const targetY = node.baseY + hoverY;
        node.vx += (targetX - node.x) * 0.03;
        node.vy += (targetY - node.y) * 0.03;

        node.vx *= 0.9;
        node.vy *= 0.9;

        node.x += node.vx;
        node.y += node.vy;
        node.rotation += node.vRot;

        ctx.save();
        ctx.translate(node.x, node.y);
        ctx.rotate(node.rotation);

        switch (node.type) {
          case "keyframe": {
            const s = node.size;
            ctx.save();
            ctx.rotate(Math.PI / 4);
            ctx.shadowColor = node.color;
            ctx.shadowBlur = 14;
            ctx.fillStyle = "rgba(10, 8, 10, 0.9)";
            ctx.fillRect(-s / 2, -s / 2, s, s);
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 2;
            ctx.strokeRect(-s / 2, -s / 2, s, s);
            ctx.fillStyle = node.color;
            ctx.fillRect(-s / 5, -s / 5, (s * 2) / 5, (s * 2) / 5);
            ctx.restore();
            break;
          }

          case "anchor": {
            const r = node.size * 0.35;
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-node.size, 0);
            ctx.lineTo(node.size, 0);
            ctx.stroke();

            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(-node.size, 0, 2.5, 0, Math.PI * 2);
            ctx.arc(node.size, 0, 2.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "rgba(10, 8, 10, 0.9)";
            ctx.fillRect(-r, -r, r * 2, r * 2);
            ctx.strokeRect(-r, -r, r * 2, r * 2);
            break;
          }

          case "cross": {
            const s = node.size * 0.7;
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-s, 0);
            ctx.lineTo(s, 0);
            ctx.moveTo(0, -s);
            ctx.lineTo(0, s);
            ctx.stroke();

            ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
            ctx.strokeRect(-s * 0.4, -s * 0.4, s * 0.8, s * 0.8);
            break;
          }

          case "ring": {
            const s = node.size;
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(0, 0, s * 0.5, 0, Math.PI * 1.5);
            ctx.stroke();
            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(s * 0.5, 0, 3, 0, Math.PI * 2);
            ctx.fill();
            break;
          }

          case "cube": {
            const s = node.size * 0.7;
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.lineTo(s * 0.86, -s * 0.5);
            ctx.lineTo(0, 0);
            ctx.lineTo(-s * 0.86, -s * 0.5);
            ctx.closePath();
            ctx.moveTo(-s * 0.86, -s * 0.5);
            ctx.lineTo(-s * 0.86, s * 0.5);
            ctx.lineTo(0, s);
            ctx.lineTo(s * 0.86, s * 0.5);
            ctx.lineTo(s * 0.86, -s * 0.5);
            ctx.moveTo(0, 0);
            ctx.lineTo(0, s);
            ctx.stroke();
            break;
          }

          case "tag": {
            const label = node.label || "MOTION";
            ctx.font = '700 11px "Space Grotesk", sans-serif';
            const metrics = ctx.measureText(label);
            const w = metrics.width + 18;
            const h = 22;

            ctx.fillStyle = "rgba(18, 10, 12, 0.85)";
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(-w / 2, -h / 2, w, h, 6);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(-w / 2 + 7, 0, 2.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(label, 4, 0);
            break;
          }

          case "text": {
            const txt = node.label || "MOTION";
            ctx.font = '800 14px "Syne", sans-serif';
            ctx.letterSpacing = "2px";
            ctx.fillStyle = node.color;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.shadowColor = node.color;
            ctx.shadowBlur = 12;
            ctx.fillText(txt, 0, 0);
            break;
          }
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="kinetic-hero-wrapper" ref={containerRef}>
      <canvas ref={canvasRef} className="kinetic-hero-canvas" />
      <div className="kinetic-hero-badge">
        <span className="kinetic-badge-dot"></span>
        <span>Interactive Motion Graphics Canvas • Click & Move</span>
      </div>
    </div>
  );
};

export default KineticMotionHero;
