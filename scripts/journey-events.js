/**
 * 513Sips customer-journey events.
 *
 * This file intentionally contains no GA4 Measurement ID, GTM container ID or
 * Microsoft Clarity project ID. Once an approved provider snippet is present,
 * events are forwarded to it. Until then, the event names can be QA'd without
 * inventing account credentials.
 */
(function () {
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

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, eventParams));

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
