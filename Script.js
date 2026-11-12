(function () {
  'use strict';

  // Tell the CSS that JavaScript is running.
  // Animations / collapsed menu only apply when this class exists,
  // so the page is never left invisible if this file fails to load.
  document.documentElement.classList.add('js');

  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('main-nav');

  // Mobile menu
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active nav link on scroll (home page only)
  if (nav && 'IntersectionObserver' in window) {
    var links = {};
    nav.querySelectorAll('a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var hash = href.indexOf('#') > -1 ? href.split('#')[1] : '';
      if (hash) links[hash] = a;
    });

    var sections = document.querySelectorAll('main section[id]');
    if (sections.length && Object.keys(links).length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
          if (links[e.target.id]) links[e.target.id].classList.add('active');
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { spy.observe(s); });
    }
  }

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          rev.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    items.forEach(function (el) { rev.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
