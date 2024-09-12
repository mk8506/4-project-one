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