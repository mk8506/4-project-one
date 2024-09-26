// (async () => {
//   document.querySelector("#boys").setAttribute("href", );
// })();

// let lastScroll = document.documentElement.scrollTop || 0
// document.addEventListener('scroll', function(){
//   let scrollTop = document.documentElement.scrollTop
//   const scrollup = document.querySelector("#scrollup");
//   if(scrollTop > lastScroll) {
//     //down
//     scrollup.classList.remove("scrollup");
//   } else {
//     //up
//     scrollup.classList.add("scrollup");
//   }
//   lastScroll = scrollTop;
// })

//Sign in dropdown
const button = document.querySelector("#dd-btn");
button.addEventListener('click', (e) => {
  const sub = v.querySelectorAll("#dd");
  console.log(sub.style.maxHeight);
  if (sub.style.maxHeight === '0px' || sub.style.maxHeight === "") {
    sub.style.maxHeight = sub.scrollHeight + 'px';
  } else {
    sub.style.maxHeight = '0px';
  }
});