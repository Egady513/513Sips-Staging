/**
 * 513Sips analytics and customer-journey events.
 *
 * Google Analytics 4 reports acquisition, page journeys and conversions.
 * Microsoft Clarity supplies heatmaps and privacy-masked session recordings.
 */
(function () {
  if (window.__sipsAnalyticsLoaded) return;
  window.__sipsAnalyticsLoaded = true;

  var GA_MEASUREMENT_ID = 'G-CN86E930T5';
  var CLARITY_PROJECT_ID = 'ypdt613hbr';
  var liveHosts = ['513sips.com', 'www.513sips.com'];
  var isLiveSite = liveHosts.indexOf(window.location.hostname.toLowerCase()) > -1;

  window.dataLayer = window.dataLayer || [];
  if (isLiveSite) {
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);

    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(gaScript);

    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);
  }

  function cleanParams(params) {
    return Object.keys(params || {}).reduce(function (result, key) {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        result[key] = params[key];
      }
      return result;
    }, {});
  }

  function track(eventName, params) {
    var eventParams = cleanParams(params || {});
    document.documentElement.dataset.lastAnalyticsEvent = eventName;

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }

    if (typeof window.clarity === 'function') {
      window.clarity('event', eventName);
    }

    document.dispatchEvent(new CustomEvent('513sips:analytics', {
      detail: { event: eventName, params: eventParams }
    }));
  }

  window.SipsAnalytics = { track: track };

  function initializeInquiryFormTracking() {
    var formStarted = false;
    var inquiryForm = document.getElementById('booking-form');
    if (inquiryForm) {
      inquiryForm.addEventListener('input', function () {
        if (!formStarted) {
          formStarted = true;
          track('inquiry_form_start', { page_path: window.location.pathname });
        }
      }, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeInquiryFormTracking, { once: true });
  } else {
    initializeInquiryFormTracking();
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link) return;

    var namedEvent = link.dataset.analyticsEvent;
    if (namedEvent) {
      track(namedEvent, {
        link_text: link.textContent.trim().replace(/\s+/g, ' '),
        link_url: link.href,
        page_path: window.location.pathname
      });
      return;
    }

    var href = link.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) {
      track('phone_click', { page_path: window.location.pathname });
    } else if (href.indexOf('mailto:') === 0) {
      track('email_click', { page_path: window.location.pathname });
    } else if (/instagram\.com|facebook\.com/.test(href)) {
      track('outbound_social_click', {
        destination: href.indexOf('instagram.com') > -1 ? 'instagram' : 'facebook',
        page_path: window.location.pathname
      });
    }
  });
})();


