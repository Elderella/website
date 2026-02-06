/**
 * Customer.io JavaScript SDK initialization and auto-identify
 *
 * Auto-identifies users when they click links from Customer.io emails
 * that include the ajs_uid=cio_{{customer.cio_id}} parameter.
 *
 * Docs: https://docs.customer.io/integrations/data-in/connections/javascript/js-source/#auto-identify
 */
(function() {
  // Customer.io Site ID (public - designed to be in browser)
  var SITE_ID = '7edf18231172ee69b9bc';

  // Initialize Customer.io SDK (official snippet)
  var _cio = window._cio = window._cio || [];
  (function() {
    var a,b,c;
    a=function(f){return function(){_cio.push([f].concat(Array.prototype.slice.call(arguments,0)))}};
    b=["load","identify","sidentify","track","page"];
    for(c=0;c<b.length;c++){_cio[b[c]]=a(b[c])};
    var t = document.createElement('script'),
        s = document.getElementsByTagName('script')[0];
    t.async = true;
    t.id = 'cio-tracker';
    t.setAttribute('data-site-id', SITE_ID);
    t.src = 'https://assets.customer.io/assets/track.js';
    s.parentNode.insertBefore(t, s);
  })();

  // Auto-identify from URL parameter
  function autoIdentifyFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var cioId = params.get('ajs_uid');
    if (cioId && cioId.startsWith('cio_')) {
      // Remove 'cio_' prefix to get the customer.cio_id
      var customerId = cioId.substring(4);
      _cio.identify({ id: customerId });
    }
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoIdentifyFromUrl);
  } else {
    autoIdentifyFromUrl();
  }
})();
