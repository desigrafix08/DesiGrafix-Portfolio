import * as THREE from "three";

interface DesignToolSpec {
  name: string;
  short: string;
  sphereBg: string;
  textColor: string;
  isCustomDraw?: (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) => void;
}

const designTools: DesignToolSpec[] = [
  {
    name: "Photoshop",
    short: "Ps",
    sphereBg: "#0d1b2a",
    textColor: "#38b6ff",
  },
  {
    name: "Illustrator",
    short: "Ai",
    sphereBg: "#1c1106",
    textColor: "#ff9a00",
  },
  {
    name: "After Effects",
    short: "Ae",
    sphereBg: "#120e29",
    textColor: "#9d95ff",
  },
  {
    name: "Premiere Pro",
    short: "Pr",
    sphereBg: "#1e0b1f",
    textColor: "#f075ff",
  },
  {
    name: "InDesign",
    short: "Id",
    sphereBg: "#220815",
    textColor: "#ff3366",
  },
  {
    name: "Cinema 4D",
    short: "C4D",
    sphereBg: "#091728",
    textColor: "#2bd9fe",
  },
  {
    name: "Blender",
    short: "3D",
    sphereBg: "#14161c",
    textColor: "#ea7600",
    isCustomDraw: (ctx, cx, cy, size) => {
      // Draw clean Blender 3D emblem without box
      const r = size * 0.38;
      // Orange outer circle
      ctx.beginPath();
      ctx.arc(cx, cy - 8, r, 0, Math.PI * 2);
      ctx.fillStyle = "#ea7600";
      ctx.fill();
      // White ring
      ctx.beginPath();
      ctx.arc(cx, cy - 8, r * 0.62, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      // Blue pupil
      ctx.beginPath();
      ctx.arc(cx, cy - 8, r * 0.34, 0, Math.PI * 2);
      ctx.fillStyle = "#25537b";
      ctx.fill();
      // Top stylized rays
      ctx.strokeStyle = "#ea7600";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx, cy - 8 - r);
      ctx.lineTo(cx, cy - 8 - r - 22);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + r * 0.72, cy - 8 - r * 0.72);
      ctx.lineTo(cx + r * 0.72 + 18, cy - 8 - r * 0.72 - 18);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.72, cy - 8 - r * 0.72);
      ctx.lineTo(cx - r * 0.72 - 18, cy - 8 - r * 0.72 - 18);
      ctx.stroke();
    },
  },
  {
    name: "Figma",
    short: "Fg",
    sphereBg: "#151518",
    textColor: "#ffffff",
    isCustomDraw: (ctx, cx, cy, size) => {
      // Clean Figma 5-pill vector icon without any box
      const pillW = size * 0.32;
      const pillH = size * 0.32;
      const r = pillW / 2;
      const colors = ["#f24e1e", "#ff7262", "#a259ff", "#1abcfe", "#0acf83"];
      const ox = cx - pillW / 2;
      const oy = cy - size * 0.42;

      // top-left
      ctx.fillStyle = colors[0];
      ctx.beginPath();
      ctx.roundRect(ox - pillW, oy, pillW, pillH, [r, 0, 0, r]);
      ctx.fill();
      // top-right
      ctx.fillStyle = colors[1];
      ctx.beginPath();
      ctx.roundRect(ox, oy, pillW, pillH, [0, r, r, 0]);
      ctx.fill();
      // mid-left
      ctx.fillStyle = colors[2];
      ctx.beginPath();
      ctx.roundRect(ox - pillW, oy + pillH, pillW, pillH, [r, 0, 0, r]);
      ctx.fill();
      // mid-right
      ctx.fillStyle = colors[3];
      ctx.beginPath();
      ctx.arc(ox + r, oy + pillH + r, r, 0, Math.PI * 2);
      ctx.fill();
      // bot-left
      ctx.fillStyle = colors[4];
      ctx.beginPath();
      ctx.roundRect(ox - pillW, oy + pillH * 2, pillW, pillH, [r, 0, r, r]);
      ctx.fill();
    },
  },
];

function drawCleanText(
  ctx: CanvasRenderingContext2D,
  spec: DesignToolSpec,
  cx: number,
  cy: number
) {
  if (spec.isCustomDraw) {
    spec.isCustomDraw(ctx, cx, cy, 280);
  } else {
    ctx.fillStyle = spec.textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // Bold, sleek, modern clean letterforms with optical kerning
    const fontSize = spec.short.length > 2 ? 160 : 210;
    ctx.font = `800 ${fontSize}px "Syne", "Outfit", "Segoe UI", sans-serif`;
    ctx.fillText(spec.short, cx, cy);
  }
}

export function createDesignTextures(): THREE.CanvasTexture[] {
  return designTools.map((spec) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // Seamless smooth dark background with subtle radial gradient
    const bgGrad = ctx.createRadialGradient(512, 256, 50, 512, 256, 512);
    bgGrad.addColorStop(0, spec.sphereBg);
    bgGrad.addColorStop(1, "#07080b");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // Front mark at cx = 256 (no borders, no boxes - pure clean logo like reference image)
    drawCleanText(ctx, spec, 256, 256);

    // Back mark at cx = 768 (so ball looks clean from all sides during rotation)
    drawCleanText(ctx, spec, 768, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  });
}
