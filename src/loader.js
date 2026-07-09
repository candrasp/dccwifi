/**
 * Page Loader & FOUC Prevention
 * Runs early (defer) to animate the top progress bar and reveal the page
 * once all resources have fully loaded. Uses classList.add('page-loaded')
 * which is matched by the CSS rule in <head> that hides content until ready.
 */
(function () {
  function revealPage() {
    document.body.classList.add('page-loaded');
  }

  // ── Progress Bar animation ──
  var progress = 0;
  var interval = setInterval(function () {
    if (progress < 85) {
      progress += Math.random() * 15;
      if (progress > 85) progress = 85;
      var bar = document.getElementById('top-loader-progress');
      if (bar) bar.style.width = progress + '%';
    }
  }, 80);

  window.addEventListener('load', function () {
    clearInterval(interval);
    var bar = document.getElementById('top-loader-progress');
    var loader = document.getElementById('top-loader');
    if (bar && loader) {
      bar.style.width = '100%';
      // Wait a frame so 100% width paints before hiding
      requestAnimationFrame(function () {
        setTimeout(function () {
          revealPage();
          loader.style.opacity = '0';
          setTimeout(function () {
            loader.style.display = 'none';
          }, 400);
        }, 200);
      });
    } else {
      revealPage();
    }
  });

  // Fallback: if 'load' fires before this script (rare), reveal immediately
  if (document.readyState === 'complete') {
    clearInterval(interval);
    revealPage();
  }

  // ── Update current year in footer ──
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
