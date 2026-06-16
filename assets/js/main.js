(function () {
  "use strict";

  /* ---- Année footer ---- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---- Nav : fond au scroll ---- */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Menu mobile ---- */
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");
  function setMenu(open) {
    links.classList.toggle("open", open);
    burger.classList.toggle("x", open);
    nav.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", function () {
    setMenu(!links.classList.contains("open"));
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });

  /* ---- Parallaxe hero ---- */
  var heroBg = document.getElementById("heroBg");
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = "scale(1.08) translateY(" + y * 0.18 + "px)";
    }
  }, { passive: true });

  /* ---- Galerie : génération + lightbox ---- */
  var grid = document.getElementById("galerieGrid");
  var total = 20;
  var sources = [];
  for (var i = 1; i <= total; i++) {
    var src = "assets/img/galerie-" + i + ".jpg";
    sources.push(src);
    var fig = document.createElement("figure");
    var img = document.createElement("img");
    img.src = src;
    img.loading = "lazy";
    img.alt = "Création culinaire de L'Écluse — photo " + i;
    img.dataset.index = i - 1;
    fig.appendChild(img);
    grid.appendChild(fig);
  }

  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var current = 0;

  function openLb(idx) {
    current = idx;
    lbImg.src = sources[current];
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLb() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function step(d) {
    current = (current + d + total) % total;
    lbImg.src = sources[current];
  }

  grid.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") openLb(+e.target.dataset.index);
  });
  document.getElementById("lbClose").addEventListener("click", closeLb);
  document.getElementById("lbNext").addEventListener("click", function () { step(1); });
  document.getElementById("lbPrev").addEventListener("click", function () { step(-1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });

  /* ---- Reveal au scroll ---- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---- Compteurs animés ---- */
  var counted = false;
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll(".stat__num").forEach(function (el) {
          var target = +el.dataset.count, t0 = null;
          function tick(ts) {
            if (!t0) t0 = ts;
            var p = Math.min((ts - t0) / 1100, 1);
            el.textContent = Math.round(p * target);
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      }
    });
  }, { threshold: 0.4 });
  var statsEl = document.querySelector(".stats");
  if (statsEl) cio.observe(statsEl);

  /* ---- Toast annonce jardin ---- */
  var toast = document.getElementById("gardenToast");
  if (toast) {
    var toastClose = document.getElementById("toastClose");
    var hideTimer;
    function hideToast() {
      clearTimeout(hideTimer);
      toast.classList.remove("show");
      setTimeout(function () { toast.hidden = true; }, 650);
    }
    function showToast() {
      toast.hidden = false;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { toast.classList.add("show"); });
      });
      hideTimer = setTimeout(hideToast, 18000); // reste bien visible
    }
    toastClose.addEventListener("click", hideToast);
    setTimeout(showToast, 2200); // apparaît après l'arrivée sur la page
  }
})();
