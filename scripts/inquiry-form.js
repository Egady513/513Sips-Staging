(function () {
  function initializeInquiryForm(form) {
    var referralSource = form.querySelector('[name="referral-source"]');
    var referralOtherGroup = form.querySelector('[data-referral-other]');
    var referralOtherInput = form.querySelector('[name="referral-source-other"]');

    if (!referralSource || !referralOtherGroup || !referralOtherInput) return;

    function syncReferralOther() {
      var showOther = referralSource.value === 'Other';
      referralOtherGroup.hidden = !showOther;
      referralOtherInput.disabled = !showOther;
      if (!showOther) referralOtherInput.value = '';
    }

    referralSource.addEventListener('change', syncReferralOther);
    form.addEventListener('reset', function () {
      window.setTimeout(syncReferralOther, 0);
    });
    syncReferralOther();
  }

  document.querySelectorAll('form[data-inquiry-form]').forEach(initializeInquiryForm);
})();
