/*
 * Adapted from byoules/random-spinning-wheel (https://github.com/byoules/random-spinning-wheel)
 * Copyright (c) 2026 Brad Youles. Licensed under the MIT License.
 * See vendor/random-spinning-wheel-LICENSE for the full license text.
 */
(function (root) {
  const COLORS = ["#a78bfa", "#64c8d0", "#f1b96b", "#e78cb7", "#6d91dc", "#79c5a4", "#d390ec", "#d8a67f"];

  function createArcadiaWheel({ canvas, button, result, values, onFinish }) {
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 12;
    let rotation = 0;
    let spinning = false;
    let destroyed = false;
    let animationFrame = 0;

    function drawWheel() {
      if (destroyed) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const sliceAngle = (Math.PI * 2) / values.length;
      for (let i = 0; i < values.length; i++) {
        const startAngle = rotation + i * sliceAngle - Math.PI / 2;
        const endAngle = startAngle + sliceAngle;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.8)";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#17172c";
        const label = typeof values[i] === "string" ? values[i] : values[i].label;
        const fontSize = values.length > 8 ? 15 : 18;
        ctx.font = `700 ${fontSize}px sans-serif`;
        const words = label.split(/\s+/);
        const lines = [];
        let line = "";
        for (const word of words) {
          const next = line ? `${line} ${word}` : word;
          if (ctx.measureText(next).width > radius * 0.58 && line) {
            lines.push(line);
            line = word;
          } else line = next;
        }
        if (line) lines.push(line);
        const shown = lines.slice(0, 3);
        const lineHeight = fontSize * 1.1;
        const startY = -((shown.length - 1) * lineHeight) / 2;
        shown.forEach((text, lineIndex) => ctx.fillText(text, radius * 0.59, startY + lineIndex * lineHeight, radius * 0.62));
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, 34, 0, Math.PI * 2);
      ctx.fillStyle = "#19182e";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.9)";
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillStyle = "#fff0bd";
      ctx.font = "700 25px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("✦", centerX, centerY + 1);
    }

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function spinWheel() {
      if (spinning || destroyed) return;
      spinning = true;
      button.disabled = true;
      result.textContent = "Колесо набирает ход…";
      const winnerIndex = Math.floor(Math.random() * values.length);
      const sliceDegrees = 360 / values.length;
      const winnerCenter = winnerIndex * sliceDegrees + sliceDegrees / 2;
      const fullSpins = 6 + Math.floor(Math.random() * 4);
      const targetRadians = (fullSpins * 360 - winnerCenter) * Math.PI / 180;
      const startingRotation = rotation;
      const duration = 4800;
      const startTime = performance.now();

      function animate(currentTime) {
        if (destroyed) return;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        rotation = startingRotation + targetRadians * easeOutCubic(progress);
        drawWheel();
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
          return;
        }
        spinning = false;
        rotation %= Math.PI * 2;
        result.textContent = values[winnerIndex].label;
        if (onFinish) onFinish(winnerIndex, values[winnerIndex]);
      }

      animationFrame = requestAnimationFrame(animate);
    }

    button.addEventListener("click", spinWheel);
    drawWheel();
    return {
      destroy() {
        destroyed = true;
        cancelAnimationFrame(animationFrame);
        button.removeEventListener("click", spinWheel);
      }
    };
  }

  root.ArcadiaFortuneWheel = { create: createArcadiaWheel };
})(window);
