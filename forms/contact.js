/**
 * Contact form handler - Netlify Forms (AJAX submission).
 *
 * The form itself is a static Netlify form (data-netlify="true") in index.html,
 * so it also works without JavaScript. This script only adds the loading /
 * success / error states on top of it - no extra backend required.
 */
(function() {
  "use strict";

  var form = document.getElementById('contact-form');
  if (!form) return;

  var loading = form.querySelector('.loading');
  var errorMessage = form.querySelector('.error-message');
  var sentMessage = form.querySelector('.sent-message');

  function setState(state) {
    if (loading) loading.style.display = state === 'loading' ? 'block' : 'none';
    if (errorMessage) errorMessage.style.display = state === 'error' ? 'block' : 'none';
    if (sentMessage) sentMessage.style.display = state === 'success' ? 'block' : 'none';
  }

  setState('idle');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Respect native browser validation for required fields (name, email, message)
    if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
      if (typeof form.reportValidity === 'function') form.reportValidity();
      return;
    }

    setState('loading');

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function(response) {
        if (!response.ok) throw new Error('Form submission failed with status ' + response.status);
        form.reset();
        setState('success');
      })
      .catch(function() {
        setState('error');
      });
  });
})();
