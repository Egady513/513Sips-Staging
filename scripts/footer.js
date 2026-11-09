/**
 * 513Sips Shared Footer
 * Single source of truth for the site footer. Every public page uses this one footer.
 * Built the same way as scripts/nav.js, but it lives in its own file because nav.js runs at the top
 * of the page, before the footer spot exists. This script sits at the footer spot and draws the
 * footer right there, so nothing flashes and nothing depends on another script.
 *
 * Usage (root pages):    <div id="site-footer"></div><script src="scripts/footer.js?v=1"></script>
 * Usage (subdir pages): <div id="site-footer"></div><script src="../scripts/footer.js?v=1"></script>
 * Home and Partners add data-phone-links="hide" to the div to hide the link columns on phones.
 *
 * Links are worked out from this script's own address (one folder up from /scripts/), so the footer
 * works on production, on the staging site (which lives in a sub-folder) and in any new folder
 * without editing a list of folder names.
 */
(function () {
  var thisScript = document.currentScript || document.querySelector('script[src*="scripts/footer.js"]');
  if (!thisScript) return;

  // Site root = the folder above /scripts/. Always ends in a slash, so it is also the home page address.
  var siteRoot = new URL('../', thisScript.src).href;
  var at = function (path) { return new URL(path, siteRoot).href; };

  var LOGO = 'https://res.cloudinary.com/dkfypt2cb/image/upload/v1774966027/can_you_recreate_this_so_that_i_have_an_upscaled_v_019d442b-f054-7f42-b500-7cea6b3a3998_pb1nhn.png';
  var PHONE_HREF = 'tel:+15133222645';
  var PHONE_TEXT = '(513)&nbsp;322&#8209;2645';
  var EMAIL = 'contact@513sips.com';

  var FOOTER_CSS = `
    .sf-footer { background: #12121f; color: #fff; padding: 4rem 2rem 2rem; font-family: 'Montserrat', sans-serif; line-height: 1.6; text-align: left; clear: both; }
    .sf-inner { max-width: 1400px; margin: 0 auto; }
    .sf-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
    .sf-logo { display: inline-block; margin-bottom: 1rem; text-decoration: none; }
    .sf-logo img { display: inline-block; height: 50px; width: auto; max-width: none; vertical-align: middle; filter: brightness(0) invert(1); }
    .sf-blurb { color: rgba(255, 255, 255, 0.7); font-size: 0.95rem; line-height: 1.7; margin: 0 0 1.5rem; }
    .sf-dock { display: flex; gap: 1rem; padding: 0.75rem 1.5rem; background: rgba(255, 255, 255, 0.05); border-radius: 9999px; border: 1px solid rgba(184, 115, 51, 0.2); width: fit-content; }
    .sf-dock a { position: relative; width: 48px; height: 48px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; color: #fff; text-decoration: none; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .sf-dock a:hover, .sf-dock a:focus-visible { background: #b87333; color: #1a1a2e; transform: scale(1.2) translateY(-5px); }
    .sf-dock a::before { content: attr(data-label); position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; opacity: 0; transition: opacity 0.3s ease; white-space: nowrap; color: #b87333; }
    .sf-dock a:hover::before, .sf-dock a:focus-visible::before { opacity: 1; }
    .sf-heading { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 600; line-height: 1.3; margin: 0 0 1.5rem; color: #fff; }
    .sf-links { list-style: none; margin: 0; padding: 0; }
    .sf-links li { margin: 0 0 0.75rem; padding: 0; }
    .sf-links a { display: inline-block; color: rgba(255, 255, 255, 0.7); font-size: 1rem; text-decoration: none; transition: all 0.3s ease; }
    .sf-links a:hover, .sf-links a:focus-visible { color: #b87333; transform: translateX(5px); }
    .sf-bottom { border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 2rem; }
    .sf-bottom p { margin: 0; color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; }
    @media (max-width: 900px) {
      .sf-grid { grid-template-columns: 1fr 1fr; }
      .sf-brand { grid-column: 1 / -1; }
    }
    @media (max-width: 560px) {
      .sf-footer { padding: 2rem 1.25rem 1.25rem; }
      /* Brand full width on top, the link columns two across */
      .sf-grid { grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
      .sf-brand { grid-column: 1 / -1; text-align: center; }
      .sf-logo { margin-bottom: 0.5rem; }
      .sf-logo img { height: 44px; }
      .sf-blurb { font-size: 0.85rem; line-height: 1.5; margin-bottom: 0.75rem; }
      .sf-dock { margin: 0 auto; padding: 0.4rem 1.1rem; gap: 0.75rem; }
      .sf-dock a { width: 40px; height: 40px; }
      .sf-heading { font-size: 1.1rem; margin-bottom: 0.45rem; }
      .sf-links li { margin-bottom: 0.3rem; }
      .sf-links a { font-size: 0.9rem; overflow-wrap: anywhere; }
      .sf-bottom { padding-top: 1.25rem; text-align: center; }
      /* data-phone-links="hide" (Home and Partners, which have their own phone menu): brand only, no link columns */
      .sf-footer.sf-hide-phone-links .sf-grid { grid-template-columns: 1fr; margin-bottom: 1.5rem; }
      .sf-footer.sf-hide-phone-links .sf-column { display: none; }
      /* Pages with a fixed bottom button leave room so it never covers the last line */
      .sf-footer.sf-has-sticky { padding-bottom: 5.5rem; }
    }
  `;

  if (!document.getElementById('site-footer-styles')) {
    var styleEl = document.createElement('style');
    styleEl.id = 'site-footer-styles';
    styleEl.textContent = FOOTER_CSS;
    document.head.appendChild(styleEl);
  }

  var ICON_INSTAGRAM = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>';
  var ICON_FACEBOOK = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>';

  // One link list for every page.
  var columns = [
    { title: 'Services', links: [
      { text: 'Weddings',         href: at('weddings/') },
      { text: 'Private Parties',  href: at('private-parties/'), analytics: 'private_party_learn_more_click' },
      { text: 'Corporate Events', href: at('#services') },
      { text: 'Packages',         href: at('#pricing') }
    ] },
    { title: 'Company', links: [
      { text: 'About Us',               href: at('#about') },
      { text: 'Gallery',                href: at('gallery.html') },
      { text: 'For Venues &amp; Planners', href: at('partners.html') },
      { text: 'Blog',                   href: at('blog/') }
    ] },
    { title: 'Support', links: [
      { text: 'FAQ',            href: at('faq.html') },
      { text: 'Contact',        href: at('#contact') },
      { text: EMAIL,            href: 'mailto:' + EMAIL },
      { text: PHONE_TEXT,       href: PHONE_HREF },
      { text: 'Privacy Policy', href: at('privacy.html') }
    ] }
  ];

  var columnsHtml = columns.map(function (col) {
    var items = col.links.map(function (l) {
      var analytics = l.analytics ? ' data-analytics-event="' + l.analytics + '"' : '';
      return '<li><a href="' + l.href + '"' + analytics + '>' + l.text + '</a></li>';
    }).join('');
    return '<div class="sf-column"><p class="sf-heading">' + col.title + '</p><ul class="sf-links">' + items + '</ul></div>';
  }).join('');

  var html =
    '<footer class="sf-footer">' +
      '<div class="sf-inner">' +
        '<div class="sf-grid">' +
          '<div class="sf-brand">' +
            '<a href="' + siteRoot + '" class="sf-logo"><img src="' + LOGO + '" alt="513Sips mobile bartending logo"></a>' +
            '<p class="sf-blurb">Elevating celebrations throughout Cincinnati with craft cocktails and professional bartending services.</p>' +
            '<div class="sf-dock">' +
              '<a href="https://www.instagram.com/513sips/" target="_blank" rel="noopener" data-label="Instagram" aria-label="513Sips on Instagram">' + ICON_INSTAGRAM + '</a>' +
              '<a href="https://www.facebook.com/people/513Sips/61581731595256/" target="_blank" rel="noopener" data-label="Facebook" aria-label="513Sips on Facebook">' + ICON_FACEBOOK + '</a>' +
            '</div>' +
          '</div>' +
          columnsHtml +
        '</div>' +
        '<div class="sf-bottom"><p>&copy; <span class="sf-year"></span> 513Sips. All rights reserved.</p></div>' +
      '</div>' +
    '</footer>';

  var target = document.getElementById('site-footer');
  var wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  var footerEl = wrapper.firstChild;
  footerEl.id = 'site-footer'; // keep the id so pages and tests can still find the footer
  // Optional: <div id="site-footer" data-phone-links="hide"> drops the link columns at 560px and below.
  // Only for pages that have their own phone menu (Home and Partners). Every other page keeps the links.
  if (target && target.getAttribute('data-phone-links') === 'hide') footerEl.classList.add('sf-hide-phone-links');
  footerEl.querySelector('.sf-year').textContent = new Date().getFullYear();

  // Pages with a fixed bottom button (the sticky CTA) come after the footer in the page, so look again once the page is read
  var markSticky = function () { footerEl.classList.toggle('sf-has-sticky', !!document.querySelector('.sticky-cta')); };
  markSticky();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', markSticky);

  if (target) {
    target.replaceWith(footerEl);
  } else {
    // Fallback: append to body if the placeholder is missing
    document.body.appendChild(footerEl);
  }
})();
