document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".glide").forEach((v,i) => {
    v.insertAdjacentHTML('beforeend',`
          <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left one-arrow-left" data-glide-dir="<">
              <img src="./assets/img/icons/arrow.gif" alt="left arrow" class="left-arrow"/>
            </button>
            <button class="glide__arrow glide__arrow--right one-arrow-right" data-glide-dir=">">
              <img src="./assets/img/icons/arrow.gif" alt="right arrow"/>
            </button>
          </div>`);
  });
});
