const menus = document.querySelectorAll(".menu-container");
menus.forEach((v,i) => {
  const button = document.querySelector(".menu-button");
  button.addEventListener('click', (e) => {
    const sub = v.querySelectorAll(".menu")[i];
    const btnSpan = button.querySelector("span");
    if (sub.style.maxHeight === '0px') {
      sub.style.maxHeight = sub.scrollHeight + 'px';
      btnSpan.innerHTML = "-";
      console.log("click open");
    } else {
      sub.style.maxHeight = '0px';
      btnSpan.innerHTML = "+";
    }
  });
});
