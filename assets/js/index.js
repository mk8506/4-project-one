//load event
window.addEventListener("load",async  e => {
  let response = null;
  try {
    response = await axios.get("../assets/js/data.json");
    console.log(response.data);
  } catch (error) {
    console.error(error.code +"\n"+ error.message);
    let alertThis = error.message;
    if (error.response !== undefined) {
      const add = error.response.status +"\n"+ error.response.statusText;
      console.error(add);
      alertThis += "\n"+ add;
    }
    alert(alertThis);
    return;
  }

  //part-one
  response.data.partOne.forEach((v,i) => {
    //div > a, h1, divBtn
    const div = document.createElement("div");
    const a = document.createElement("a");
    const figure = document.createElement("figure");
    const h1 = document.createElement("h1");
    const divBtn = document.createElement("div");

    document.querySelector(".part-one").appendChild(div);
    div.appendChild(a);
    div.appendChild(h1);
    div.appendChild(divBtn);

    const img = document.createElement("img");
    const btn1 = document.createElement("button");

    a.appendChild(figure);
    figure.appendChild(img);
    divBtn.appendChild(btn1);

    a.setAttribute("href", "#");
    figure.setAttribute("class", "part-one-figure");
    img.setAttribute("src", response.data.partOne[i].img);
    img.setAttribute("alt", response.data.partOne[i].alt);
    h1.setAttribute("class", "part-one-h1");
    divBtn.setAttribute("class", "divBtn");
    
    h1.innerHTML = response.data.partOne[i].title;
    btn1.innerHTML = response.data.partOne[i].button1;
    
    if (i===0 || i===3) {
      const btn2 = document.createElement("button");
      divBtn.appendChild(btn2);
      btn2.innerHTML = response.data.partOne[i].button2;
    }

    if (i===3) { //height 440px
      figure.setAttribute("class", "figure401");
      const btn3 = document.createElement("button");
      divBtn.appendChild(btn3);
      btn3.innerHTML = response.data.partOne[i].button3;
    }
  })



  //part-two
  //이것도 3번 돌아야함 two-a,b,c
  for (let i = 0; i < response.data.partTwo.length/5; i++) {
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    document.querySelector(".glide__slides").appendChild(div);
    div.appendChild(ul);
    div.setAttribute("class", "glide__slide");
    ul.setAttribute("class", "glide-ul")
  }
  response.data.partTwo.forEach((v,i) => {
    //div > ul > li > a > figure, p1, p2
    //if (li 1~5) {div > ul > li 5개}
    //p2 > span1, span2
    const li = document.createElement("li");
    const a = document.createElement("a");
    const figure = document.createElement("figure");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    
    //0->0, 5->1, 10->2
    document.querySelectorAll(".glide-ul")[Math.floor(i/5)].appendChild(li);
    li.appendChild(a);
    a.appendChild(figure);
    a.appendChild(p1);
    a.appendChild(p2);
    p2.appendChild(span1);
    p2.appendChild(span2);

    const img = document.createElement("img");

    figure.appendChild(img);

    a.setAttribute("class", "part-two-a");
    figure.setAttribute("class", "part-two-figure");
    img.setAttribute("src", response.data.partTwo[i].img);
    img.setAttribute("alt", response.data.partTwo[i].alt);

    p1.innerHTML = response.data.partTwo[i].title;
    span1.innerHTML = response.data.partTwo[i].price1;
    span2.innerHTML = response.data.partTwo[i].price2;
  })

  document.querySelectorAll(".glide").forEach((v,i) => {
    v.insertAdjacentHTML('beforeend',`
          <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left one-arrow-left" data-glide-dir="<">
              <img src="./assets/img/icons/arrow.svg" alt="left arrow"/>
            </button>
            <button class="glide__arrow glide__arrow--right one-arrow-right" data-glide-dir=">">
              <img src="./assets/img/icons/arrow.svg" alt="right arrow" class="right-arrow"/>
            </button>
          </div>`);
  })
  const glide = new Glide('.glide');
  glide.mount();
  // const splide = new Splide( '.splide' );
  // splide.mount();

  //most likely due to how and when the library attaches its event listeners.
});

