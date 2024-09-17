
window.addEventListener("load",async  e => {
  //const extern = document.querySelector("#header-import").import;
  //document.querySelector("#header").insertAdjacentHTML('afterbegin', extern.getElementsByTagName("body")[0]);

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
  
  class util {
    getQuery() {
      const query = new URLSearchParams(location.search);
      return Object.fromEntries(query);
    }
  }

  const utilHelper = new util();
  const params = utilHelper.getQuery();
  document.querySelector(".part-first").querySelector("h1").innerHTML = `Shop for ${params.select}`;
   
  if (params.select === "boys") {
    response.data.partFirst.forEach((v,i) => {
      document.querySelectorAll(".main-photo")[i].style.backgroundImage = `url(${v.imgBoys})`;
    });
  } else if (params.select === "girls") {
    console.log("else if");
    response.data.partFirst.forEach((v,i) => {
      console.log("in the loop");
      document.querySelectorAll(".main-photo")[i].style.backgroundImage = `url(${v.imgGirls})`;
    });
  } else if (params.select || params.select === undefined) {
    console.log("select undefined or null");
    window.location = "./404.html";
  }

  response.data.partSecond.forEach((v,i) => {
    document.querySelectorAll(".second-photos")[i].setAttribute("src", v.img);
    document.querySelectorAll(".second-title")[i].innerHTML = v.title;
  });

  //~ul
  for (let i = 0; i < 2; i++) {
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    document.querySelector(".glide__slides").appendChild(div);
    div.appendChild(ul);
    div.setAttribute("class", "glide__slide");
    ul.setAttribute("class", "glide-ul");
  }

  //li~
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 5; i++) {
      const li = document.createElement("li");
      document.querySelectorAll(".glide-ul")[j].appendChild(li);
      li.setAttribute("class", "bunchOfLis");
    }
  }
  //in li
  response.data.partThird.forEach((v,i) => {
    //div > ul > li > a > figure, p1, p2
    //if (li 1~5) {div > ul > li 5개}
    //p2 > span1, span2
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
    a.setAttribute("href", `item.html?id=${v.id}&page=list`); //
    figure.setAttribute("class", "part-two-figure");

    /**/
    img.setAttribute("src", v.img);
    img.setAttribute("alt", v.alt);

    p1.innerHTML = v.title;
    span1.innerHTML = v.price1;
    span2.innerHTML = v.price2;
  });

  var sliders = document.querySelectorAll('.glide');

  for (var i = 0; i < sliders.length; i++) {
    var glide = new Glide(sliders[i], {
      gap: 15,
    });
    
    glide.mount();
  }
});