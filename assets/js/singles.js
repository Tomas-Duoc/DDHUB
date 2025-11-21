const nav = document.getElementById("nav-header");

function heightScroll() {
  const navHeight = nav.getBoundingClientRect().height;
  const paddingMain = document.getElementById("padding-main");

  paddingMain.style.paddingTop = `${navHeight * 2}px`;
  paddingMain.style.paddingBottom = `${navHeight * 2}px`;
}

window.addEventListener("resize", heightScroll);
heightScroll();
