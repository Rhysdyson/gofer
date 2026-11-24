(function () {
  var started = false;
  function start() {
    if (started) return;
    started = true;
    init();
  }
  if (document.readyState !== 'loading') start();
  else document.addEventListener('DOMContentLoaded', start);
  try { window.dmAPI.runOnReady('gofer-footer', start); } catch (e) {}

  function init() {
    var BAR_ID = 'custom-preview-publish-message-mobile';
    var mq = window.matchMedia('(max-width: 767px)');

    function getEnv() {
        try {
            if (typeof window.dmAPI.getCurrentEnvironment === 'function') {
                return String(window.dmAPI.getCurrentEnvironment()).toLowerCase();
            }
        } catch (e) {}
        var h = window.location.hostname + window.location.search;
        if (/preview|editor|dudaone|multiscreensite|mobile-preview/i.test(h)) return 'preview';
        return 'live';
    }

    function isMobile() {
        try {
            if (typeof window.dmAPI.getCurrentDeviceType === 'function') {
                var d = String(window.dmAPI.getCurrentDeviceType()).toLowerCase();
                if (d) return d === 'mobile';
            }
        } catch (e) {}
        return mq.matches;
    }

    function remove() {
        var el = document.getElementById(BAR_ID);
        if (el) el.parentNode.removeChild(el);
        document.body.style.paddingBottom = '';
    }

    function render() {
        var env = getEnv();
        var show = env !== 'live' && isMobile();
        var existing = document.getElementById(BAR_ID);
        if (!show) { remove(); return; }
        if (existing) return;
        var bar = document.createElement('div');
        bar.id = BAR_ID;
        bar.innerHTML = '<span>Ready to launch?</span> <a href="https://receptionist.gofer.tech/website/signup">Claim my website now</a>';
        document.body.appendChild(bar);
        document.body.style.paddingBottom = bar.offsetHeight + 'px';
    }

    render();
    if (mq.addEventListener) mq.addEventListener('change', render);
    else if (mq.addListener) mq.addListener(render);
    window.addEventListener('resize', render);
  }
})();
