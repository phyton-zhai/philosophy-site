(function () {
  var path = location.pathname.split('/').pop() || 'index.html';

  // 页面级导航高亮：根据当前文件名高亮左侧一级章节
  document.querySelectorAll('.sidenav > ul > li > a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    }
  });

  // 页内锚点高亮：仅在当前页面有页内锚点时启用
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.sidenav a[href^="#"]')
  );

  var targets = links
    .map(function (link) {
      var id = link.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      return el ? { link: link, el: el } : null;
    })
    .filter(Boolean);

  if (targets.length) {
    function update() {
      var threshold = 100;
      var active = null;

      for (var i = 0; i < targets.length; i++) {
        var rect = targets[i].el.getBoundingClientRect();
        if (rect.top <= threshold) {
          active = targets[i];
        }
      }

      if (!active) active = targets[0];

      links.forEach(function (l) {
        l.classList.remove('active');
      });
      active.link.classList.add('active');
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
})();