window.addEventListener("load", async e => {

  let response = null;
  try {
    response = await axios.get("../assets/js/dataList.json");
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
  response.data.partDul.forEach((v,i) => {
    document.querySelectorAll(".dul-photos")[i].setAttribute("src", v.img);
    document.querySelectorAll(".dul-title")[i].innerHTML = v.title;
  });

});

window.addEventListener("load", async e => {

  class util {
    getQuery() {
      const query = new URLSearchParams(location.search);
      return Object.fromEntries(query);
    }
  }
  
  const utilHelper = new util();

  const params = utilHelper.getQuery();

  console.log(params);

  if (!params.id) {
    alert("no select para");
    history.back();
    return;
  }

  console.log("get data");

  let response = null;
  try {
    response = await axios.get(`http://localhost:3001/partCat/${params.id}`);
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
  e.defaultPrevented();

  //popup;
})