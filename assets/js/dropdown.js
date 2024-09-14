const menus = document.querySelectorAll(".menu-container");
menus.forEach((v,i) => {
  const button = document.querySelector(".menu-button");
  button.addEventListener('click', (e) => {
    const sub = v.querySelectorAll(".menu")[i];
    const btnSpan = button.querySelector("span");
    console.log(sub.style.maxHeight);
    if (sub.style.maxHeight === '0px' || sub.style.maxHeight === "") {
      sub.style.maxHeight = sub.scrollHeight + 'px';
      btnSpan.innerHTML = "-";
      console.log("click open");
    } else {
      sub.style.maxHeight = '0px';
      btnSpan.innerHTML = "+";
      console.log("click close");
    }
  });
});
