document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".main-nav a");
  const panels = document.querySelectorAll(".panel");
  // tombol bisa .hero-button atau .btn-primary, ambil salah satu yang ada
  const heroButton = document.querySelector(".hero-button, .btn-primary");

  // === ANIMASI FADE-UP SETIAP GANTI SECTION ===
  function runFadeUp(panel) {
    const fades = panel.querySelectorAll(".fade-up");

    // reset semua fade-up
    fades.forEach(el => {
      el.classList.remove("show");
    });

    // tunggu 1 frame render
    requestAnimationFrame(() => {
      fades.forEach(el => {
        el.classList.add("show");
      });
    });
  }

  function showPanel(panelId) {
    if (!panelId) return;

    // matikan semua panel
    panels.forEach(panel => {
      panel.classList.remove("active-panel");
    });

    // nyalakan panel target
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.classList.add("active-panel");
      // setiap kali section aktif, jalankan animasi fade-up di dalamnya
      runFadeUp(targetPanel);
    } else {
      console.warn("Panel tidak ditemukan:", panelId);
    }

    // update nav aktif
    navLinks.forEach(link => {
      const target = (link.getAttribute("href") || "").replace("#", "");
      link.classList.toggle("active", target === panelId);
    });
  }

  // klik navigasi
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = (link.getAttribute("href") || "").replace("#", "");
      showPanel(target);
      history.pushState(null, "", "#" + target);
    });
  });

  // tombol GET STARTED → ke powerbi
  if (heroButton) {
    heroButton.addEventListener("click", () => {
      showPanel("powerbi");
      history.pushState(null, "", "#powerbi");
    });
  }

  // saat pertama kali load
  const initialHash = location.hash.replace("#", "") || "home";
  showPanel(initialHash);

  // tombol back/forward browser
  window.addEventListener("popstate", () => {
    const hash = location.hash.replace("#", "") || "home";
    showPanel(hash);
  });
});
