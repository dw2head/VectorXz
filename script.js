// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('show');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.classList.toggle('active');
  });
}

// Reveal on scroll (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

// Simple client-side form handling (demo)
const form = document.querySelector('.form');
const note = document.querySelector('.form-note');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const budget = data.get('budget')?.toString().trim();

    if (!name || !email || !budget) {
      note.textContent = 'Please fill all required fields.';
      note.style.color = '#ffb3c7';
      return;
    }
    note.textContent = 'Thanks! Your message has been queued. We’ll reach out shortly.';
    note.style.color = '#b9aee5';
    form.reset();
  });
}

// Animated particle background (canvas)
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

let particles = [];
let w, h, rafId;
const DPI = window.devicePixelRatio || 1;

function resize() {
  w = canvas.width = Math.floor(innerWidth * DPI);
  h = canvas.height = Math.floor(innerHeight * DPI);
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  initParticles();
}
window.addEventListener('resize', resize);

function initParticles() {
  const count = Math.min(140, Math.floor((innerWidth * innerHeight) / 12000));
  particles = new Array(count).fill(0).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2.2 * DPI + 0.6,
    vx: (Math.random() - 0.5) * 0.25 * DPI,
    vy: (Math.random() - 0.5) * 0.25 * DPI,
    hue: 260 + Math.random() * 40
  }));
}

function step() {
  ctx.clearRect(0, 0, w, h);

  // Connect lines
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const dist2 = dx * dx + dy * dy;
      if (dist2 < (100 * DPI) ** 2) {
        ctx.globalAlpha = 0.05;
        ctx.strokeStyle = `hsl(270 80% 70%)`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }

  // Draw particles
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
    grd.addColorStop(0, `hsla(${p.hue},95%,75%,.9)`);
    grd.addColorStop(1, `hsla(${p.hue + 20},70%,50%,0)`);
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
    ctx.fill();
  }

  rafId = requestAnimationFrame(step);
}

resize();
step();

// Reduce animation on prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  cancelAnimationFrame(rafId);
  ctx.clearRect(0, 0, w, h);
}
document.getElementById("year").textContent = new Date().getFullYear();