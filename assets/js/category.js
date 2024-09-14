(async () => {
  class util {
    getQuery() {
      const query = new URLSearchParams(location.search);
      return Object.fromEntries(query);
    }
  }
  
  const utilHelper = new util();
  
  const params = utilHelper.getQuery();

  console.log(params);

  // if (!params.select) {
  //   alert("no select para");
  //   history.back();
  //   return;
  // }

  console.log("get data");
  console.log(params.select)
;
  let response = null;
  const url = "http://localhost:3001/partCat";
  try {
    response = await axios.get(url, {
      params: {
        ...(params.select ? { select: params.select } : {})
      }
    });  //`?select=${params.select}`
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

  response.data.forEach((v,i) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");

    document.querySelector("#items").appendChild(li);
    li.appendChild(a);
    a.appendChild(figure);
    figure.appendChild(img);
    a.appendChild(p1);
    a.appendChild(p2);
    p2.appendChild(span1);
    p2.appendChild(span2);

    a.setAttribute("class", "part-two-a");
    a.setAttribute("href", `item.html?id=${v.id}/`);
    figure.setAttribute("class", "part-two-figure");
    img.setAttribute("src", v.img);
    img.setAttribute("alt", v.alt);
    span1.setAttribute("class", "price1");

    p1.innerHTML = v.title;
    span1.innerHTML = v.price1;
    span2.innerHTML = v.price2;
  });

  document.querySelector("#num-items").innerHTML = `${response.data.length} items`;
})();
