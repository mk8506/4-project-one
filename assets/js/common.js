let lastScroll = document.documentElement.scrollTop || 0
document.addEventListener('scroll', function(){
  let scrollTop = document.documentElement.scrollTop
  const scrollup = document.querySelector("#scrollup");
  const scrollnav = document.querySelector(".sitewide-nav");
  if(scrollTop > lastScroll) {
    // down
    scrollup.classList.remove("scrollup");
    scrollnav.classList.remove("scrollup-nav");
  } else {
    //up
    scrollup.classList.add("scrollup");
    scrollnav.classList.add("scrollup-nav");
  }
  lastScroll = scrollTop
})