window.addEventListener("load", async e => {
  class util {
    getQuery() {
      const query = new URLSearchParams(location.search);
      return Object.fromEntries(query);
    }
  }
  const utilHelper = new util();
  const params = utilHelper.getQuery();
  if (!params.select) {
    params.select = "All";
  }
  if (!params.id) {
    window.back();
  }
  let id1;
  switch (params.select) {
    case "Women":
      id1 = 1;
      break;
    case "Boys":
      id1 = 2;
      break;
    case "Girls":
      id1 = 3;
      break;
    default:
      console.log("default");
      window.location = "./404.html";
  }
  let response = null;
  try {
    response = await axios.get(`http://localhost:3001/Goods/${id1}/`);
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

  //hana
  const dataFind = response.data[params.select].find(item => item.id == params.id);
  document.querySelectorAll(".main-img").forEach((v,i) => {
    v.setAttribute("src", dataFind.img);
  });

  document.querySelector("#title").innerHTML = dataFind.title;
  document.querySelector("#price1").innerHTML = dataFind.price1;
  document.querySelector("#price2").innerHTML = " " + dataFind.price2;

  //dul
  for (let i = 0; i < 5; i++) {
    document.querySelector(".customers-liked").insertAdjacentHTML("beforeend",
      `   <li>
            <a class="dul-a" href="#">
              <figure>
                <img class="dul-photos" src="" alt="photo"/>
              </figure>
              <p class="dul-title"></p>
              <p>Kids Sale Deal</p>
            </a>
            <button><img class="dul-button"/></button>
          </li>`
    );
  }
  
  for (let i = 0; i < 10; i++) {
    document.querySelector(".swiper-wrapper").insertAdjacentHTML("beforeend",
      `          <div class="swiper-slide">
              <a class="dul-a" href="#">
                <figure>
                  <img class="dul-photos" src="" alt="photo"/>
                </figure>
                <p class="dul-title"></p>
              </a>
              <button class="button1"><img class="dul-button"/></button>
            </div>`
    );
  }

  response.data[params.select].forEach((v,i) => {
    document.querySelectorAll(".dul-photos")[i].setAttribute("src", v.img);
    document.querySelectorAll(".dul-title")[i].innerHTML = v.title;
    document.querySelectorAll(".dul-a")[i].setAttribute("href", `item.html?id=${v.id}`);
    document.querySelectorAll(".dul-button")[i].setAttribute("src", "./assets/img/icons/bagplus.png");
  });

  //reviews
  let response1 = null;
  try {
    response1 = await axios.get(`http://localhost:3001/review/`);
    console.log(response1.data);
  } catch (error) {
    console.error(error.code +"\n"+ error.message);
    let alertThis = error.message;
    if (error.response1 !== undefined) {
      const add = error.response1.status +"\n"+ error.response1.statusText;
      console.error(add);
      alertThis += "\n"+ add;
    }
    alert(alertThis);
    return;
  }

  document.querySelector("#review-cnt").innerHTML = `${response1.data.length} Customer Review`;

  response1.data.forEach((v,i) => {
    const div = document.createElement("div");
    document.querySelector("#reviews").appendChild(div);
    const divStars = document.createElement("div");
    div.appendChild(divStars);
    divStars.setAttribute("class", "flex");
    let img = new Array(5);
    for (let i = 0; i < 5; i++) {
      img[i] = document.createElement("img");
      div.appendChild(img[i]);
      img[i].setAttribute("src", v.stars);
      img[i].setAttribute("alt", "stars");
    }
    const h1 = document.createElement("h1");
    div.appendChild(h1);
    h1.innerHTML = v.title;
    let p = new Array(3);
    for (let i = 0; i< 4; i++) {
      p[i] = document.createElement("p");
      div.appendChild(p[i]);
    }
    if (!v.name) {
      p[0].innerHTML = "anonymous";
    } else {
      p[0].innerHTML = v.name;
    }
    p[1].innerHTML = `${v.date}`;
    p[2].innerHTML = response.data.title;
    p[2].setAttribute("class", "review-data-title");
    p[3].innerHTML = v.content;
    p[3].setAttribute("class", "review-content");

    div.insertAdjacentHTML("beforeend",
      `<p><b>Was this review helpful to you? <i></i> <i></i> </b></p>
      <a href=#>Flag this review</a>
      <p style="padding-top: 12px;"><i></i>Verified Buyer <i></i>Sweepstakes Entry</p>
      <hr/>`);
  });
});


const swiper = new Swiper(
  '.swiper', {
    slidesPerView: 5,
    spaceBetween: 14,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    direction: 'horizontal',
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  }
);

document.querySelector("#review").addEventListener("click", e => {
  e.preventDefault();

  //popup;
  new Swal({
    title: "Write a Review",
    html: "new review",
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "Submit Review",
    showLoaderOnConfirm: true,
    preConfirm: async e => {  //input.value
      let response = null;
      const url = `http://localhost:3001/review/`;
      try {
        response = await axios.post(url, {
          stars: "./assets/img/icons/bluestar.svg",
          title: e.slice(0, 15),
          date: new Date(),
          content: e
        });
        console.log(response.data.review);
      } catch (error) {
        console.error(error);
        alert(error.message);
        return;
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
    showClass: {
      popup: `
        animate__animated
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__faster
      `
    }
  }).then(re => {
    console.log(re);
    if (re.value) {
      new Swal({
        html: "Submit successful",
        showClass: {
          popup: `
            animate__animated
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__faster`
        }
      });
    }
  },
  re => {
    new Swal({
      html: "error, try again",
      showClass: {
        popup: `
          animate__animated
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__faster`
      }
    });
  });
});