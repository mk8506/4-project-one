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
  
  class util {
    getQuery() {
      const query = new URLSearchParams(location.search);
      return Object.fromEntries(query);
    }
  }
  const utilHelper = new util();
  const params = utilHelper.getQuery();
  document.querySelector(".part-first").querySelector("h1").innerHTML = `Shop for ${params.select}`;
   
  //part-first :background img 
  switch (params.select) {
    case "Boys":
      response.data.listMain.forEach((v,i) => {
        document.querySelectorAll(".main-photo")[i].style.backgroundImage = `url(${v.imgBoys})`;
      });
      break;
    case "Girls":
      response.data.listMain.forEach((v,i) => {
        console.log("background img Girls");
        console.log(v.imgGirls);
        document.querySelectorAll(".main-photo")[i].style.backgroundImage = `url(${v.imgGirls})`;
      });
      break;
    default:
      window.location = "./404.html";
  }

  //part-second
  for (let i = 0; i < 8; i++) {
    document.querySelector(".part-second").querySelector("ul").insertAdjacentHTML("beforeend",
      ` <li>
          <a href="#">
            <figure>
              <img  class="second-photos" src="" alt="second-list-sub-img"/>
            </figure>
            <p class="second-title center"></p>
          </a>
        </li>`
    );
  }
  
  //8 categories
  response.data.listSub.forEach((v,i) => { 
    //for boys
    let img;
    switch (params.select) {
      case "Boys":
        img = v.img;
        break;
      case "Girls":
        img = v.img1;
        break;
      default:
        window.location = "./404.html";
    }
    document.querySelectorAll(".second-title")[i].innerHTML = v.title;
    document.querySelectorAll(".second-photos")[i].setAttribute("src", img);
    document.querySelector(".part-second").querySelectorAll("a")[i].setAttribute("href", `./category.html?select=${params.select}&category=${v.title}`);
  });

  //part-third
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
  let index;
  switch (params.select) {
    case "Women":
      index = 0;
      break;
    case "Boys":
      index = 1;
      break;
    case "Girls":
      index = 2;
      break;
    default:
      console.log("default");
      window.location = "./404.html";
  }
  response.data.Goods[index][params.select].forEach((v,i) => {
    if (i >= 10) {
      return;
    }

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
    a.setAttribute("href", `item.html?id=${v.id}&select=${params.select}`);
    figure.setAttribute("class", "part-two-figure");

    img.setAttribute("src", v.img);
    img.setAttribute("alt", v.alt);
    p1.innerHTML = v.title;
    span1.innerHTML = v.price1;
    span2.innerHTML = v.price2;
  });

  //dropdown
  const ddb = document.querySelector("#dropdown-button");
  ddb.innerHTML = `All for ${params.select}`;
  ddb.setAttribute("href", `./category.html?select=${params.select}`);

  //part-fourth
  const partFourth = document.querySelector(".part-fourth");
  partFourth.querySelector("h1").innerHTML = `${(params.select)}'s Clothings`;
  partFourth.querySelector("p").innerHTML = `At Old Navy, shopping for ${(params.select)}’ clothes is fun, easy and affordable. Find fashion essentials and back to school clothing staples, including ${(params.select)}' jeans, graphic t-shirts, hoodies and ${(params.select)}' school uniform basics like polo shirts and khaki uniform pants.<br/><br/>
        Discover ${(params.select)}' new arrivals to keep him cozy, from warm coats & jackets for ${(params.select)} to classic sweaters and pants. You'll also find his favorite ${(params.select)}' styles in a range of extended sizes, including ${(params.select)} slim and ${(params.select)} husky clothes.<br/><br/>
        Keep him moving with ${(params.select)}' workout clothes from Old Navy Active. Our basketball shorts, t-shirts, tank tops and athletic clothes combine classic comfort with the latest performance technology. And when it's time for a break, we've got him covered with cozy pajamas, sweatshirts, hoodies, & sweatpants.`;

  //glider
  var sliders = document.querySelectorAll('.glide');
  for (var i = 0; i < sliders.length; i++) {
    var glide = new Glide(sliders[i], {
      gap: 15,
    });
    
    glide.mount();
  }
});