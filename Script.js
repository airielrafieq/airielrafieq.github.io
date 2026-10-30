(function () {
  // Mobile menu
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('main-nav');

  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link on scroll
  var links = {};
  nav.querySelectorAll('a').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        Object.values(links).forEach(function (l) {
          l.classList.remove('active');
        });
        if (links[e.target.id]) {
          links[e.target.id].classList.add('active');
        }
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main section[id]').forEach(function (s) {
    spy.observe(s);
  });

  // Reveal on scroll
  var rev = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        rev.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    rev.observe(el);
  });
})();