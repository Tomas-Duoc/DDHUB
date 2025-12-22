// NAV
document.addEventListener("DOMContentLoaded", function () {
  // sub-menu
  document.querySelectorAll(".drop-submenu").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const submenu = document.querySelector(".sub-menu");
      if (submenu.classList.contains("d-none")) {
        submenu.classList.remove("d-none");
        submenu.classList.add("d-flex");
      } else {
        submenu.classList.remove("d-flex");
        submenu.classList.add("d-none");
      }
    });
  });
});

function NavScrollAndResize() {
  const ancho = window.innerWidth;
  const scrollY = window.scrollY;
  const ninetyVH = window.innerHeight * 0.1;
  const logo = document.querySelector(".logo-scroll");

  const navPrimary = document.querySelector(".nav-primary");
  const navSecondary = document.querySelector(".nav-secondary");

  if (!navPrimary || !navSecondary) return;

  if (ancho < 1200) {
    // NAV MOBILE: intercambio de navs para lectores de pantallas
    if (navPrimary.nextElementSibling !== navSecondary) {
      navPrimary.parentNode.insertBefore(navSecondary, navPrimary.nextSibling);
    }

    navSecondary.style.display = "block";
    navPrimary.style.backgroundColor = "transparent";
  } else {
    // NAV DESKTOP: orden correcto
    if (navSecondary.nextElementSibling !== navPrimary) {
      navSecondary.parentNode.insertBefore(
        navPrimary,
        navSecondary.nextSibling
      );
    }

    // Cambio de navs al scrollear en desktop
    if (scrollY > ninetyVH) {
      navSecondary.style.display = "none";
      navPrimary.style.backgroundColor = "#000";
      if (logo) {
        logo.classList.add("logo-primary");
         logo.src = "assets/img/logo-duoc-light.webp"; 
        if (logo.parentElement) logo.parentElement.style.margin = "0 0 0 1rem";
      }
    } else {
      navSecondary.style.display = "block";
      navPrimary.style.backgroundColor = "transparent";
      if (logo) {
        logo.classList.remove("logo-primary");
        logo.src = "assets/img/logo-duoc-light.webp"; 
        if (logo.parentElement)
          logo.parentElement.style.margin = "0 3.5rem 0 1rem";
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", NavScrollAndResize);
window.addEventListener("resize", NavScrollAndResize);
window.addEventListener("scroll", NavScrollAndResize);
// NAV

// FOOTER
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".footer-toggle").forEach(function (button) {
    const targetId = button.getAttribute("data-bs-target");
    const target = document.querySelector(targetId);

    if (!target) return;

    target.addEventListener("show.bs.collapse", function () {
      button.classList.add("active-toggle");
    });

    target.addEventListener("hide.bs.collapse", function () {
      button.classList.remove("active-toggle");
    });
  });
});
