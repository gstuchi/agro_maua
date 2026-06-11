/* ==========================================================================
   Agro Maúá — Scripts da página
   ========================================================================== */

(function () {
  "use strict";

  // Ícones (Lucide)
  if (window.lucide) lucide.createIcons();

  // Ano atual no rodapé
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Estilo do cabeçalho ao rolar a página
  var hdr = document.getElementById("hdr");
  function onScroll() {
    hdr.classList.toggle("scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Menu mobile (drawer)
  var drawer = document.getElementById("drawer");
  document.getElementById("menuOpen").addEventListener("click", function () {
    drawer.classList.add("open");
  });
  document.getElementById("menuClose").addEventListener("click", function () {
    drawer.classList.remove("open");
  });
  drawer.addEventListener("click", function (e) {
    if (e.target === drawer || e.target.hasAttribute("data-close")) {
      drawer.classList.remove("open");
    }
  });

  // Animação de entrada das seções (reveal on scroll)
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  reveals.forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i % 4, 4) * 60 + "ms";
  });
  function checkReveals() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < reveals.length; i++) {
      var el = reveals[i];
      if (el.classList.contains("in")) continue;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("in");
    }
  }
  checkReveals();
  window.addEventListener("scroll", checkReveals, { passive: true });
  window.addEventListener("resize", checkReveals);
  window.addEventListener("load", checkReveals);
  // Rede de segurança: garante que tudo apareça mesmo se os eventos falharem
  setTimeout(function () {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }, 2500);

  // Formulário de contato (demonstração)
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!this.checkValidity()) {
      this.reportValidity();
      return;
    }
    this.classList.add("sent");
    if (window.lucide) lucide.createIcons();
    this.querySelector("button[type=submit]").textContent = "Enviado ✓";
  });
})();
