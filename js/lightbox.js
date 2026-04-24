(function () {
  function init() {
    const imgs = Array.from(document.querySelectorAll(".research-img img"));
    if (!imgs.length) return;

    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML = `
      <button class="lb-close" type="button" aria-label="Close">×</button>
      <button class="lb-nav lb-prev" type="button" aria-label="Previous">‹</button>
      <img alt="" />
      <button class="lb-nav lb-next" type="button" aria-label="Next">›</button>
    `;
    document.body.appendChild(lb);

    const lbImg = lb.querySelector("img");
    const btnClose = lb.querySelector(".lb-close");
    const btnPrev = lb.querySelector(".lb-prev");
    const btnNext = lb.querySelector(".lb-next");

    if (imgs.length <= 1) {
      btnPrev.style.display = "none";
      btnNext.style.display = "none";
    }

    let current = 0;

    function show() {
      lbImg.src = imgs[current].src;
      lbImg.alt = imgs[current].alt || "";
    }
    function open(i) {
      current = i;
      show();
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
    }
    function navigate(delta) {
      current = (current + delta + imgs.length) % imgs.length;
      show();
    }

    imgs.forEach((img, i) => {
      img.addEventListener("click", () => open(i));
    });
    btnClose.addEventListener("click", close);
    btnPrev.addEventListener("click", (e) => { e.stopPropagation(); navigate(-1); });
    btnNext.addEventListener("click", (e) => { e.stopPropagation(); navigate(1); });
    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") navigate(-1);
      else if (e.key === "ArrowRight") navigate(1);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
