// (async () => {
//   document.querySelector("#boys").setAttribute("href", );
// })();

let lastScroll = document.documentElement.scrollTop || 0
document.addEventListener('scroll', function(){
  let scrollTop = document.documentElement.scrollTop
  const scrollup = document.querySelector("#scrollup");
  if(scrollTop > lastScroll) {
    //down
    console.log("scroll down");
    scrollup.classList.remove("scrollup");
  } else {
    //up
    console.log("scroll up");
    scrollup.classList.add("scrollup");
  }
  lastScroll = scrollTop;
})