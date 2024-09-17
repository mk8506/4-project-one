// (async () => {
//   document.querySelector("#boys").setAttribute("href", );
// })();

let lastScroll = document.documentElement.scrollTop || 0
document.addEventListener('scroll', function(){
  let scrollTop = document.documentElement.scrollTop
  const scrollup = document.querySelector("#scrollup");
  if(scrollTop > lastScroll) {
    //down
    scrollup.classList.remove("scrollup");
  } else {
    //up
    scrollup.classList.add("scrollup");
  }
  lastScroll = scrollTop;
})