/* Scoop Demo — interactions */
(function () {
  "use strict";

  const SCOOPS = {
    1: {
      image: "assets/couple-walk.jpg",
      text: "Looks like a romantic getaway. Who's the mystery guy, Sarah? 👀",
    },
    2: {
      image: "assets/mystery-detail.jpg",
      text: "Spotted: the real reason Lisa left early — a midnight espresso run. Classic. ☕",
    },
  };

  // --- Scoopy tap ---
  const scoopyBtn = document.getElementById("scoopyBtn");
  const speechBubble = document.getElementById("speechBubble");
  let bubbleTimer = null;

  scoopyBtn.addEventListener("click", () => {
    scoopyBtn.classList.remove("tapped");
    void scoopyBtn.offsetWidth;
    scoopyBtn.classList.add("tapped");

    speechBubble.hidden = false;
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => {
      speechBubble.hidden = true;
    }, 3200);
  });

  // --- Caption expand ---
  const captionBtn = document.getElementById("captionBtn");
  const captionExpand = document.getElementById("captionExpand");

  captionBtn.addEventListener("click", () => {
    const open = captionBtn.getAttribute("aria-expanded") === "true";
    captionBtn.setAttribute("aria-expanded", String(!open));
    captionExpand.hidden = open;
  });

  // --- Spot hotspots ---
  const photoMain = document.getElementById("photoMain");
  const spotReveal = document.getElementById("spotReveal");
  const spotImage = document.getElementById("spotImage");
  const spotText = document.getElementById("spotText");
  const spotClose = document.getElementById("spotClose");

  document.querySelectorAll(".hotspot").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.spot;
      const scoop = SCOOPS[id];
      if (!scoop) return;
      spotImage.src = scoop.image;
      spotText.textContent = scoop.text;
      photoMain.classList.add("hidden");
      spotReveal.hidden = false;
    });
  });

  function closeSpot() {
    spotReveal.hidden = true;
    photoMain.classList.remove("hidden");
  }

  spotClose.addEventListener("click", closeSpot);

  // Escape closes spot
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !spotReveal.hidden) closeSpot();
  });

  // --- Like + heart rain ---
  const likeBtn = document.getElementById("likeBtn");
  const likeCount = document.getElementById("likeCount");
  const canvas = document.getElementById("heartCanvas");
  const ctx = canvas.getContext("2d");
  let liked = false;
  let count = 128;
  let hearts = [];
  let animating = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function spawnHearts(originX, originY) {
    const colors = ["#ff3b5c", "#ff6b8a", "#ff8dc7", "#ffe01b", "#ff5555", "#ff9e9e"];
    for (let i = 0; i < 48; i++) {
      hearts.push({
        x: originX + (Math.random() - 0.5) * 60,
        y: originY + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 4,
        vy: -2 - Math.random() * 5,
        size: 10 + Math.random() * 16,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.15,
        life: 1,
        decay: 0.008 + Math.random() * 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    if (!animating) {
      animating = true;
      requestAnimationFrame(tickHearts);
    }
  }

  function drawHeart(x, y, size, rot, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(size / 24, size / 24);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(-12, -4, -12, -14, 0, -10);
    ctx.bezierCurveTo(12, -14, 12, -4, 0, 6);
    ctx.fill();
    ctx.restore();
  }

  function tickHearts() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    hearts = hearts.filter((h) => h.life > 0);
    for (const h of hearts) {
      h.x += h.vx;
      h.y += h.vy;
      h.vy -= 0.04; // float up
      h.vx *= 0.99;
      h.rot += h.vr;
      h.life -= h.decay;
      drawHeart(h.x, h.y, h.size, h.rot, h.color, Math.max(0, h.life));
    }
    if (hearts.length) {
      requestAnimationFrame(tickHearts);
    } else {
      animating = false;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  likeBtn.addEventListener("click", () => {
    liked = !liked;
    likeBtn.classList.toggle("liked", liked);
    likeBtn.setAttribute("aria-pressed", String(liked));
    count += liked ? 1 : -1;
    likeCount.textContent = String(count);

    if (liked) {
      const rect = likeBtn.getBoundingClientRect();
      spawnHearts(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  });
})();
