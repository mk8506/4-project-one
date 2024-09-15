window.addEventListener("load", async e => {

  let response = null;
  try {
    response = await axios.get("http://localhost:3001/partDul");
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

  //dul
  response.data.forEach((v,i) => {
    document.querySelectorAll(".dul-photos")[i].setAttribute("src", v.img);
    document.querySelectorAll(".dul-title")[i].innerHTML = v.title;
    document.querySelectorAll(".dul-a")[i].setAttribute("href", `item.html?id=${v.id}&page=item`);
  });
});

window.addEventListener("load", async e => {
  //hana

  class util {
    getQuery() {
      const query = new URLSearchParams(location.search);
      return Object.fromEntries(query);
    }
  }
  
  const utilHelper = new util();

  const params = utilHelper.getQuery();

  console.log("params: " +params);

  if (!params.id) {
    alert("no select para");
    history.back();
    return;
  }

  console.log("get data");

  let url;  // Declare the variable outside the blocks

  if (params.page && params.page === "list") {
    url = `http://localhost:3001/partThird/${params.id}`;
  } else if (params.page && params.page === "item") {
    url = `http://localhost:3001/partDul/${params.id}`;
  } else if (params.page && params.page === "category") {
    url = `http://localhost:3001/partCat/${params.id}`;
  } else {
    throw new error;
  }

  console.log(url);

  let response = null;
  try {
    response = await axios.get(url);
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

  document.querySelectorAll(".main-img").forEach((v,i) => {
    v.setAttribute("src", response.data.img);
  });

  document.querySelector("#title").innerHTML = response.data.title;
  document.querySelector("#price1").innerHTML = response.data.price1;
  document.querySelector("#price2").innerHTML = " " + response.data.price2;

});

document.querySelector("#review").addEventListener("click", e => {
  e.preventDefault();

  //popup;
  new Swal({
    title: "Write a Review",
    html: "new review",
    showCloseButton: true,
    confirmButtonText: "Submit Review",
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
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
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      }

      );
    } else {
      new Swal("Write review?");
    }
  });
})