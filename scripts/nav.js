/**
 * 513Sips — Shared Navigation
 * Single source of truth for the site nav and mobile menu.
 * Include this script on every page; it detects the path depth automatically.
 *
 * Usage (root pages):    <div id="site-nav"></div><script src="scripts/nav.js"></script>
 * Usage (blog/ pages):   <div id="site-nav"></div><script src="../scripts/nav.js"></script>
 */
(function () {
  // ── Inject nav CSS ──────────────────────────────────────────────────────────
  const NAV_CSS = `
    /* Tubelight Navbar */
    .tubelight-nav { position: fixed; top: 1.5rem; left: 50%; transform: translateX(-50%); z-index: 1000; background: rgba(245, 242, 235, 0.7); backdrop-filter: blur(20px); border-radius: 9999px; padding: 0.75rem 1.5rem; border: 1px solid rgba(184, 115, 51, 0.2); box-shadow: 0 8px 32px rgba(26, 26, 46, 0.1); transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    .tubelight-nav.scrolled { background: rgba(245, 242, 235, 0.95); box-shadow: 0 8px 32px rgba(26, 26, 46, 0.15); }
    .tubelight-container { display: flex; align-items: center; gap: 0.5rem; position: relative; }
    .tubelight-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: #1a1a2e; text-decoration: none; margin-right: 1.5rem; flex-shrink: 0; display: flex; align-items: center; }
    .tubelight-links { display: flex; position: relative; gap: 0.25rem; }
    .tubelight-link { padding: 0.6rem 0.8rem; font-size: 0.85rem; font-weight: 500; color: #2d3748; text-decoration: none; border-radius: 9999px; position: relative; z-index: 2; transition: color 0.3s ease; white-space: nowrap; }
    .tubelight-link:hover, .tubelight-link.active { color: #1a1a2e; }
    .tubelight-highlight { position: absolute; height: 100%; background: linear-gradient(135deg, rgba(184, 115, 51, 0.25), rgba(212, 145, 90, 0.15)); border-radius: 9999px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1; box-shadow: 0 2px 12px rgba(184, 115, 51, 0.3); border: 1px solid rgba(184, 115, 51, 0.3); }
    .mobile-menu-btn { display: none; background: none; border: none; cursor: pointer; padding: 0.5rem; color: #1a1a2e; }
    .nav-back-link { display: none; align-items: center; gap: 0.4rem; font-size: 0.85rem; font-weight: 600; color: #b87333; text-decoration: none; transition: color 0.3s ease; }
    .nav-back-link:hover { color: #d4915a; }
    .nav-back-link svg { flex-shrink: 0; }
    /* Mobile Menu */
    .mobile-menu { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #1a1a2e; z-index: 999; display: flex; flex-direction: column; opacity: 0; pointer-events: none; transform: translateX(100%); transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
    .mobile-menu.active { opacity: 1; pointer-events: all; transform: translateX(0); }
    .mobile-menu-header { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 1.5rem; border-bottom: 1px solid rgba(184,115,51,0.15); }
    .mobile-menu-logo { height: 36px; width: auto; }
    .mobile-menu-close { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 50%; width: 44px; height: 44px; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease; }
    .mobile-menu-close:hover { background: #b87333; }
    .mobile-menu-links { flex: 1; display: flex; flex-direction: column; padding: 1rem 0; }
    .mobile-menu-links a { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; color: rgba(245,242,235,0.85); font-family: 'Montserrat', sans-serif; font-size: 1.1rem; font-weight: 500; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.06); transition: all 0.25s ease; }
    .mobile-menu-links a:hover { color: white; padding-left: 2rem; background: rgba(184,115,51,0.08); }
    .mobile-menu-links a .link-arrow { color: #b87333; opacity: 0; transition: opacity 0.25s ease; }
    .mobile-menu-links a:hover .link-arrow { opacity: 1; }
    .mobile-menu-footer { padding: 1.5rem; border-top: 1px solid rgba(184,115,51,0.15); }
    .mobile-menu-cta { display: block; width: 100%; padding: 1rem; background: linear-gradient(135deg, #b87333, #d4915a); color: #12121f; font-family: 'Montserrat', sans-serif; font-size: 0.95rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; text-align: center; text-decoration: none; border-radius: 50px; border: none; cursor: pointer; transition: all 0.3s ease; }
    .mobile-menu-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(184,115,51,0.4); }
    @media (max-width: 768px) {
      .tubelight-nav { top: 1rem; padding: 0.6rem 1rem; width: auto; }
      .tubelight-links { display: none; }
      .mobile-menu-btn { display: none; }
      .tubelight-logo { display: none; }
      .nav-back-link { display: flex; }
    }
  `;
  if (!document.getElementById('nav-js-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'nav-js-styles';
    styleEl.textContent = NAV_CSS;
    document.head.appendChild(styleEl);
  }

  // ── Path detection ──────────────────────────────────────────────────────────
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  // GitHub Pages paths include the repo name as a segment, so blog posts are depth >= 2
  // Local: /blog/post.html = depth 2. Root: /index.html = depth 0 or 1.
  const inSubdir = window.location.pathname.includes('/blog/');
  const root     = inSubdir ? '../' : '';
  const homeAnchor = function(hash) { return inSubdir ? root + 'index.html' + hash : hash; };

  const LOGO = 'https://res.cloudinary.com/dkfypt2cb/image/upload/v1774966027/can_you_recreate_this_so_that_i_have_an_upscaled_v_019d442b-f054-7f42-b500-7cea6b3a3998_pb1nhn.png';
  const ARROW = '<svg class="link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';

  const navItems = [
    { label: 'Home',     href: homeAnchor('#home')    },
    { label: 'Services', href: homeAnchor('#services') },
    { label: 'About',    href: homeAnchor('#about')   },
    { label: 'Packages', href: homeAnchor('#pricing') },
    { label: 'Gallery',  href: root + 'gallery.html'  },
    { label: 'FAQ',      href: root + 'faq.html'      },
    { label: 'Blog',     href: root + 'blog/'         },
    { label: 'Contact',  href: homeAnchor('#contact') },
  ];

  const desktopLinks = navItems.map((item, i) =>
    `<a href="${item.href}" class="tubelight-link" data-index="${i}">${item.label}</a>`
  ).join('\n                ');

  const mobileLinks = navItems.map(item =>
    `<a href="${item.href}"><span>${item.label}</span>${ARROW}</a>`
  ).join('\n            ');

  const html = `
    <nav class="tubelight-nav" id="navbar">
      <div class="tubelight-container">
        <a href="${root}index.html" class="nav-back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </a>
        <a href="${root}index.html" class="tubelight-logo">
          <img src="${LOGO}" alt="513Sips logo — premium mobile bartending Cincinnati" style="height:40px;width:auto;display:block;">
        </a>
        <div class="tubelight-links" id="tubelight-links">
          <div class="tubelight-highlight" id="tubelight-highlight"></div>
          ${desktopLinks}
        </div>
        <button class="mobile-menu-btn" id="mobile-menu-btn">
          <i data-lucide="menu" style="width:24px;height:24px;"></i>
        </button>
      </div>
    </nav>

    <div class="mobile-menu" id="mobile-menu">
      <div class="mobile-menu-header">
        <img src="${LOGO}" alt="513Sips logo" class="mobile-menu-logo">
        <button class="mobile-menu-close" id="mobile-menu-close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="mobile-menu-links">
        ${mobileLinks}
      </div>
      <div class="mobile-menu-footer">
        <a href="${homeAnchor('#contact')}" class="mobile-menu-cta">Book Your Event</a>
      </div>
    </div>
  `;

  const target = document.getElementById('site-nav');
  if (target) {
    target.outerHTML = html;
  } else {
    // Fallback: prepend to body if placeholder missing
    document.body.insertAdjacentHTML('afterbegin', html);
  }

  // Re-run Lucide icon render after injection (in case icons script loaded first)
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // ── Navbar behaviors ────────────────────────────────────────────────────────
  // Tubelight highlight animation
  const tubelightLinks     = document.querySelectorAll('.tubelight-link');
  const tubelightHighlight = document.getElementById('tubelight-highlight');
  const tubelightContainer = document.getElementById('tubelight-links');
  if (tubelightLinks.length && tubelightHighlight && tubelightContainer) {
    function updateHighlight(link) {
      var rect = link.getBoundingClientRect();
      var cRect = tubelightContainer.getBoundingClientRect();
      tubelightHighlight.style.width = rect.width + 'px';
      tubelightHighlight.style.left  = (rect.left - cRect.left) + 'px';
    }
    tubelightLinks.forEach(function (link) {
      link.addEventListener('mouseenter', function () { updateHighlight(link); });
      link.addEventListener('click', function () {
        tubelightLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
        updateHighlight(link);
      });
    });
    tubelightContainer.addEventListener('mouseleave', function () {
      var active = document.querySelector('.tubelight-link.active');
      if (active) updateHighlight(active);
    });
  }

  // Scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Mobile menu open/close
  const mobileMenuBtn   = document.getElementById('mobile-menu-btn');
  const mobileMenu      = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
    const openMenu  = function () { mobileMenu.classList.add('active');    document.body.style.overflow = 'hidden'; };
    const closeMenu = function () { mobileMenu.classList.remove('active'); document.body.style.overflow = '';       };
    mobileMenuBtn.addEventListener('click',   openMenu);
    mobileMenuClose.addEventListener('click', closeMenu);
    // Close when a nav link is clicked (navigates away or scrolls to anchor)
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    // Close on backdrop tap (outside menu content)
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) { closeMenu(); }
    });
  }
})();
