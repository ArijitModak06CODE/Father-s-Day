(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let W, H, particles;

  const COLORS = ['#C0445E', '#4A7A62', '#B8892A', '#C8784A'];
  const COUNT  = 55;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomParticle() {
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 1.8 + 0.4,
      dx:   (Math.random() - 0.5) * 0.35,
      dy:   -(Math.random() * 0.4 + 0.15),
      alpha: Math.random() * 0.5 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, randomParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

     
      if (p.y < -5)  p.y = H + 5;
      if (p.x < -5)  p.x = W + 5;
      if (p.x > W+5) p.x = -5;
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();



const slide1 = document.getElementById('slide-1');
const slide2 = document.getElementById('slide-2');
const startBtn  = document.getElementById('start-btn');
const replayBtn = document.getElementById('replay-btn');

function goToSlide2() {

  slide1.classList.remove('active');
  slide1.classList.add('exit');

  setTimeout(() => {
    slide1.classList.remove('exit');
    slide2.classList.add('active');
    triggerReveal();
  }, 500);
}

function goToSlide1() {

  document.querySelectorAll('#slide-2 .reveal').forEach(el => {
    el.classList.remove('visible');
  });

  slide2.classList.remove('active');
  slide2.classList.add('exit');

  setTimeout(() => {
    slide2.classList.remove('exit');
    slide1.classList.add('active');
  }, 500);
}


function triggerReveal() {
  const els = document.querySelectorAll('#slide-2 .reveal');
 
  setTimeout(() => {
    els.forEach(el => el.classList.add('visible'));
  }, 150);
}

startBtn.addEventListener('click', goToSlide2);
replayBtn.addEventListener('click', goToSlide1);


document.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    if (slide1.classList.contains('active')) {
      e.preventDefault();
      goToSlide2();
    }
  }
  if (e.key === 'Escape') {
    if (slide2.classList.contains('active')) goToSlide1();
  }
});