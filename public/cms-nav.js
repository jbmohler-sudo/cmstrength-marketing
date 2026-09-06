/* Center Mass Strength — shared primary nav.
   Keeps desktop links + mobile overlay consistent across marketing pages.
   Overlay is appended to <body> so header's backdrop-filter cannot clip it. */
(function () {
  if (window.__cmsNav) return;
  window.__cmsNav = true;

  function pathNorm() {
    return (location.pathname || '/').replace(/\/+$/, '') || '/';
  }
  function isHome() {
    var p = pathNorm();
    return p === '/' || p === '/index' || p === '/index.html';
  }

  var INNER_LINKS = [
    { href: '/index#system', label: 'THE SYSTEM' },
    { href: '/index#programs', label: 'TRACKS' },
    { href: '/index#pricing', label: 'PRICING' },
    { href: '/index#inside', label: 'INSIDE' },
    { href: '/index#proof', label: 'PROOF' },
    { href: '/blog', label: 'BLOG' }
  ];

  function ensureDesktopLinks(actions, home) {
    if (home) return;
    if (actions.querySelector('a[href*="pricing"], a[href="#pricing"]')) return;
    var cta = actions.querySelector('.btn-nav');
    var hamburger = actions.querySelector('.nav-hamburger');
    var keep = {};
    if (cta) keep.cta = cta;
    if (hamburger) keep.hamburger = hamburger;
    [].slice.call(actions.children).forEach(function (el) {
      if (el !== cta && el !== hamburger) actions.removeChild(el);
    });
    INNER_LINKS.forEach(function (item) {
      var a = document.createElement('a');
      a.className = 'nav-link';
      a.href = item.href;
      a.textContent = item.label;
      actions.insertBefore(a, cta || hamburger || null);
    });
    if (cta) {
      cta.href = 'https://app.cmstrength.fit';
      cta.innerHTML = 'OPEN APP &rarr;';
    }
  }

  function ensureHamburger(actions) {
    if (document.getElementById('nav-hamburger')) return;
    var b = document.createElement('button');
    b.className = 'nav-hamburger';
    b.type = 'button';
    b.id = 'nav-hamburger';
    b.setAttribute('aria-expanded', 'false');
    b.setAttribute('aria-controls', 'nav-overlay');
    b.setAttribute('aria-label', 'Open menu');
    b.innerHTML = '&#9776;';
    actions.appendChild(b);
  }

  function overlayMarkup(home) {
    var inside = home
      ? '<button type="button" data-inside-open>Inside</button>'
      : '<a href="/index#inside">Inside</a>';
    var homeHref = home ? '#top' : '/index#top';
    var sys = home ? '#system' : '/index#system';
    var tracks = home ? '#programs' : '/index#programs';
    var pricing = home ? '#pricing' : '/index#pricing';
    var proof = home ? '#proof' : '/index#proof';
    return (
      '<button class="nav-overlay-close" type="button" id="nav-overlay-close" aria-label="Close menu">&times;</button>' +
      '<div class="nav-overlay-links">' +
        '<a href="' + homeHref + '">Home</a>' +
        '<a href="' + sys + '">The System</a>' +
        '<a href="' + tracks + '">Tracks</a>' +
        '<a href="' + pricing + '">Pricing</a>' +
        inside +
        '<a href="' + proof + '">Proof</a>' +
        '<a href="/blog">Blog</a>' +
      '</div>' +
      '<div class="nav-overlay-actions">' +
        '<a class="btn btn-primary" href="https://app.cmstrength.fit/signup">Start Free Trial</a>' +
        '<a class="btn btn-secondary" href="https://app.cmstrength.fit/login">Log In</a>' +
      '</div>'
    );
  }

  function ensureOverlay(home) {
    var existing = document.getElementById('nav-overlay');
    if (existing) {
      if (existing.parentElement !== document.body) {
        document.body.appendChild(existing);
      }
      if (!existing.querySelector('a[href*="proof"], a[href="#proof"]')) {
        var links = existing.querySelector('.nav-overlay-links');
        if (links) {
          var proof = document.createElement('a');
          proof.href = home ? '#proof' : '/index#proof';
          proof.textContent = 'Proof';
          var blog = links.querySelector('a[href="/blog"]');
          links.insertBefore(proof, blog || null);
        }
      }
      return existing;
    }
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.id = 'nav-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = overlayMarkup(home);
    document.body.appendChild(overlay);
    return overlay;
  }

  function bind(overlay) {
    var hamburger = document.getElementById('nav-hamburger');
    var closeBtn = document.getElementById('nav-overlay-close');
    if (!overlay || !hamburger) return;

    function open() {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }
    function close() {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburger.focus();
    }

    hamburger.addEventListener('click', function () {
      if (overlay.classList.contains('open')) close();
      else open();
    });
    if (closeBtn) closeBtn.addEventListener('click', close);

    overlay.querySelectorAll('a[href], button[data-inside-open]').forEach(function (el) {
      el.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
  }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    var actions = document.querySelector('.nav-actions');
    if (!actions) return;
    var home = isHome();
    ensureDesktopLinks(actions, home);
    ensureHamburger(actions);
    bind(ensureOverlay(home));
  });
})();
