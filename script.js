/* ==========================================
   CHINMAY DESHPANDE - PORTFOLIO SCRIPT
   ========================================== */

// ── Typed Text Effect ─────────────────────
const roles = [
  "C / C++ Programmer",
  "CS Student @ MIT Manipal",
  "Full-Stack Developer",
  "AI & ML Enthusiast",
  "Open to Internships"
];

let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById("typedText");

function typeEffect() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 50 : 80);
}
typeEffect();

// ── Particle Canvas ───────────────────────
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [], W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function createParticles() {
  particles = [];
  const count = Math.floor(W / 18);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.05
    });
  }
}
createParticles();
window.addEventListener("resize", createParticles);

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,201,167,${p.alpha})`;
    ctx.fill();
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
  });

  // draw subtle connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,201,167,${0.06 * (1 - dist/100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── Navbar: Scroll & Active ───────────────
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // shrink on scroll
  navbar.classList.toggle("scrolled", window.scrollY > 60);

  // active link
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

// ── Mobile Menu ───────────────────────────
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  const spans = hamburger.querySelectorAll("span");
  if (navMenu.classList.contains("open")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    spans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  }
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.querySelectorAll("span").forEach(s => {
      s.style.transform = ""; s.style.opacity = "";
    });
  });
});

// ── Smooth Scroll ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ── Reveal on Scroll ──────────────────────
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  entries => entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(i % 4) * 100}ms`;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

// ── Scroll Indicator Hide ─────────────────
const scrollIndicator = document.getElementById("scroll-indicator");
window.addEventListener("scroll", () => {
  if (scrollIndicator) {
    scrollIndicator.style.opacity = window.scrollY > 50 ? "0" : "1";
  }
});

// ── Tilt effect on project cards ─────────
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `
      translateY(-6px)
      perspective(600px)
      rotateX(${(-y / rect.height) * 5}deg)
      rotateY(${(x / rect.width) * 5}deg)
    `;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.transition = "transform 0.5s ease";
    setTimeout(() => { card.style.transition = ""; }, 500);
  });
});

// ── Counter animation ─────────────────────
function animateCounter(el, target, suffix = "") {
  let start = 0;
  const step = target / 50;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.ceil(start) + suffix;
    }
  }, 30);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll(".stat-num");
      nums.forEach(num => {
        const text = num.textContent;
        if (text.includes("5")) animateCounter(num, 5, "+");
        else if (text.includes("8")) animateCounter(num, 8, "+");
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.getElementById("about");
if (aboutSection) statObserver.observe(aboutSection);

// ── Highlight active nav on click ─────────
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});
