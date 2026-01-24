// NAV
document.addEventListener("DOMContentLoaded", function () {
  // sub-menu
  document.querySelectorAll(".drop-submenu").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      let submenu = this.nextElementSibling;
      if (!submenu || !submenu.classList.contains("sub-menu")) {
        submenu = this.parentElement.querySelector(".sub-menu");
      }
      if (!submenu || !submenu.classList.contains("sub-menu")) {
        const parent = this.closest("li, .menu-item, .nav-item");
        if (parent) submenu = parent.querySelector(".sub-menu");
      }

      if (submenu) {
        const isHidden = submenu.classList.contains("d-none");
        
        // // Cerrar otros submenus hermanos
        // const parentMenu = this.closest('.dropdown-menu');
        // if (parentMenu) {
        //   parentMenu.querySelectorAll('.sub-menu').forEach(sm => {
        //     sm.classList.add('d-none');
        //     sm.classList.remove('d-flex');
        //   });
        // }

        if (isHidden) {
          submenu.classList.remove("d-none");
          submenu.classList.add("d-flex");
        } else {
          submenu.classList.add("d-none");
          submenu.classList.remove("d-flex");
        }
      }
    });
  });

  // Cerrar sub-menus cuando el dropdown principal se oculta (aria-expanded="false")
  document.querySelectorAll('.dropdown').forEach(function (dropdown) {
    dropdown.addEventListener('hide.bs.dropdown', function () {
      this.querySelectorAll('.sub-menu').forEach(function (submenu) {
        submenu.classList.add('d-none');
        submenu.classList.remove('d-flex');
      });
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
        logo.classList.remove("logo-black"); // Ensure black class is removed in sticky
        if (logo.parentElement) logo.parentElement.style.margin = "0 0 0 1rem";
      }
    } else {
      navSecondary.style.display = "block";
      navPrimary.style.backgroundColor = "transparent";
      if (logo) {
        logo.classList.remove("logo-primary"); 
        checkLogoBackground(logo); 
        if (logo.parentElement)
          logo.parentElement.style.margin = "0 3.5rem 0 1rem";
      }
    }
  }
}

function checkLogoBackground(logo) {
  if (!logo) return;
  
  const rect = logo.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  logo.style.visibility = 'hidden';
  const elements = document.elementsFromPoint(x, y);
  logo.style.visibility = 'visible';

  for (let el of elements) {
    if (el.closest('.navbar') || el === logo) continue; 
    
    const style = window.getComputedStyle(el);
    const bgColor = style.backgroundColor;
    
    if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') continue;
    
    const rgb = bgColor.match(/\d+/g);
    if (rgb) {
      const brightness = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
      if (brightness > 250) {
        logo.classList.add('logo-black');
      } else {
        logo.classList.remove('logo-black');
      }
      return; 
    }
  }
   
   logo.classList.remove('logo-black');
}


document.addEventListener("DOMContentLoaded", function() {
    NavScrollAndResize();
    window.addEventListener('load', NavScrollAndResize); 
});
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

// Home 

const linksHover = document.querySelectorAll(".link-hover");

linksHover.forEach((link) => {
  link.addEventListener("mouseenter", function () {
    const prevLink = this.previousElementSibling;
    if (prevLink) {
      const img = prevLink.querySelector("img");
      if (img) {
        img.style.filter = "brightness(0.7)"; 
        img.style.transition = "filter 0.3s ease"; 
      }
    }
  });

  link.addEventListener("mouseleave", function () {
    const prevLink = this.previousElementSibling;
    if (prevLink) {
      const img = prevLink.querySelector("img");
      if (img) {
        img.style.filter = ""; 
      }
    }
  });
});

//Filtros 
document.addEventListener("DOMContentLoaded", function () {
  const filtros = document.getElementById("filtros");
  const btnFiltros = document.getElementById("btn-filtros");

  if (!filtros) return;

  function ajustarFiltros() {
    const ancho = window.innerWidth;
    if (ancho < 992) {
      filtros.classList.add("d-none");
      btnFiltros.classList.remove("d-none");
    } else {
      filtros.classList.remove("d-none");
      btnFiltros.classList.add("d-none");
    }
  }

  ajustarFiltros();
  window.addEventListener("resize", ajustarFiltros);
});
