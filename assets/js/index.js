(async  e => {
  let response = null;
  try {
    response = await axios.get("./assets/js/data.json");
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
  response.data.index.forEach((v,i) => {
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
    img.setAttribute("src", response.data.index[i].img);
    img.setAttribute("alt", response.data.index[i].alt);
    h1.setAttribute("class", "part-one-h1");
    divBtn.setAttribute("class", "divBtn");

    h1.innerHTML = response.data.index[i].title;
    btn1.innerHTML = response.data.index[i].button1;
    
    if (i===0 || i===3) {
      const btn2 = document.createElement("button");
      divBtn.appendChild(btn2);
      btn2.innerHTML = response.data.index[i].button2;
    }

    if (i===3) { //height 440px
      figure.setAttribute("class", "figure401");
      const btn3 = document.createElement("button");
      divBtn.appendChild(btn3);
      btn3.innerHTML = response.data.index[i].button3;
    }
  });

  //part-two
  const filteredData1 = response.data.Goods[0].Women.filter(
    data => data["category"] === "customized & new arrivals"
  );
  const filteredData2 = response.data.Goods[1].Boys.filter(
    data => data["category"] === "customized & new arrivals"
  );
  const filteredData3 = response.data.Goods[2].Girls.filter(
    data => data["category"] === "customized & new arrivals"
  );
  const filteredDataTotal = [...filteredData1, ...filteredData2, ...filteredData3];

  function shuffle(array) {
    let currentIndex = array.length;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
  
  shuffle(filteredDataTotal);
  console.log(filteredDataTotal);

  //div to ul
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 2; i++) {
      const div = document.createElement("div");
      const ul = document.createElement("ul");
      document.querySelectorAll(".loop")[j].appendChild(div);
      div.appendChild(ul);
      div.setAttribute("class", "glide__slide");
      ul.setAttribute("class", "glide-ul");
    }
  }

  //li
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < ((j<4)?5:4); i++) {
      const li = document.createElement("li");
      document.querySelectorAll(".glide-ul")[j].appendChild(li);
      li.setAttribute("class", "bunchOfLis");
    }
  }

  //div > ul > li > a > figure, p1, p2
  filteredDataTotal.forEach((v,i) => {
    const a = document.createElement("a");
    const figure = document.createElement("figure");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");

    document.querySelectorAll(".bunchOfLis")[i].appendChild(a);
    a.appendChild(figure);
    a.appendChild(p1);
    a.appendChild(p2);
    p2.appendChild(span1);
    p2.appendChild(span2);

    const img = document.createElement("img");

    figure.appendChild(img);

    a.setAttribute("class", "part-two-a");
    a.setAttribute("href", `item.html?select=${v.select}&id=${v.id}`);
    figure.setAttribute("class", "part-two-figure");
    img.setAttribute("src", v.img);
    img.setAttribute("alt", v.alt);
    span1.setAttribute("class", "span1");

    p1.innerHTML = v.title;
    span1.innerHTML = v.price1;
    span2.innerHTML = v.price2;
  });

  let sliders = document.querySelectorAll('.glide');
  for (let i = 0; i < sliders.length; i++) {
    var glide = new Glide(sliders[i], {
      gap: 15,
    });
    glide.mount();
  }
})();

