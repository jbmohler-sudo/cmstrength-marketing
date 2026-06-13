/* Center Mass Strength — homepage motion.
   Ambient chalk dust, cursor glow, stat count-up, and marquee skew-on-scroll.
   Keyed off DOM attributes so it's resilient to load order. Plain JS, no deps. */
(function () {
  if (window.__cmsMotion) return;
  window.__cmsMotion = true;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var dust = { ok: false, parts: [], w: 0, h: 0, dpr: 1, ctx: null, c: null };
  var scrollDelta = 0, skew = 0, lastY = (window.scrollY || 0);

  function resizeDust() {
    var c = dust.c; if (!c) return;
    dust.dpr = Math.min(2, window.devicePixelRatio || 1);
    dust.w = c.width = window.innerWidth * dust.dpr;
    dust.h = c.height = window.innerHeight * dust.dpr;
    var n = Math.round((window.innerWidth * window.innerHeight) / 13000);
    var P = [];
    for (var i = 0; i < n; i++) {
      P.push({
        x: Math.random() * dust.w, y: Math.random() * dust.h,
        r: (Math.random() * 1.7 + 0.3) * dust.dpr,
        vy: -(Math.random() * 0.28 + 0.05) * dust.dpr,
        vx: (Math.random() - 0.5) * 0.12 * dust.dpr,
        a: Math.random() * 0.38 + 0.05,
        ph: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.018 + 0.004,
        em: Math.random() < 0.08
      });
    }
    dust.parts = P;
  }

  function initDust() {
    var c = document.getElementById('cms-dust'); if (!c) return false;
    dust.c = c; dust.ctx = c.getContext('2d'); resizeDust();
    window.addEventListener('resize', resizeDust, { passive: true });
    dust.ok = true; return true;
  }

  function drawDust() {
    if (!dust.ok) return;
    var ctx = dust.ctx, w = dust.w, h = dust.h, dpr = dust.dpr, P = dust.parts;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < P.length; i++) {
      var p = P[i];
      p.ph += p.sp;
      p.x += p.vx + Math.sin(p.ph) * 0.18 * dpr;
      p.y += p.vy;
      if (p.y < -12) { p.y = h + 12; p.x = Math.random() * w; }
      if (p.x < -12) p.x = w + 12; else if (p.x > w + 12) p.x = -12;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fillStyle = p.em ? 'rgba(226,69,42,' + p.a + ')' : 'rgba(236,231,219,' + p.a + ')';
      ctx.fill();
    }
  }

  function startCount(el) {
    el.setAttribute('data-run', '1');
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suf = el.getAttribute('data-suffix') || '';
    var dur = 1500, start = Date.now();
    var id = setInterval(function () {
      var t = Math.min(1, (Date.now() - start) / dur);
      var e = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(e * target) + suf;
      if (t >= 1) clearInterval(id);
    }, 38);
  }

  function counters() {
    var vh = window.innerHeight || 800;
    var els = document.querySelectorAll('[data-count]:not([data-run])');
    for (var i = 0; i < els.length; i++) {
      if (els[i].getBoundingClientRect().top < vh * 0.92) startCount(els[i]);
    }
  }

  function marquee() {
    skew += (scrollDelta * 0.22 - skew) * 0.12;
    scrollDelta *= 0.85;
    var sk = Math.max(-5, Math.min(5, skew));
    var els = document.querySelectorAll('.mqv');
    for (var i = 0; i < els.length; i++) els[i].style.transform = 'skewX(' + sk.toFixed(2) + 'deg)';
  }

  window.addEventListener('mousemove', function (e) {
    var g = document.getElementById('cms-glow'); if (!g) return;
    g.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
    if (g.style.opacity !== '1') g.style.opacity = '1';
  }, { passive: true });

  window.addEventListener('scroll', function () {
    var y = window.scrollY; scrollDelta = y - lastY; lastY = y;
    counters();
  }, { passive: true });

  // Counters — enhancement; falls back to the value already in the DOM.
  setInterval(function () { try { counters(); } catch (e) {} }, 120);

  // Decorative dust + marquee skew — skipped entirely under reduced-motion.
  if (!reduce) {
    setInterval(function () {
      try {
        if (!dust.ok) initDust();
        drawDust();
        marquee();
      } catch (e) {}
    }, 33);
  }
})();
