(async () => {
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

  //get data
  let id;
  switch (params.select) {
    case "Women":
      id = 1;
      break;
    case "Boys":
      id = 2;
      break;
    case "Girls":
      id = 3;
      break;
    default:
      console.log("default");
      window.location = "./404.html";
  }
  let response = null;
  const url = `http://localhost:3001/Goods/${id}/`;
  console.log(url);
  try {
    response = await axios.get(url, {
      params: {
        ...(params.category ? { category: params.category } : {})
      }
    });
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

  let filteredData;
  if (params.category != undefined) {
    filteredData = response.data[params.select].filter(
      data => data["cat"] === params.category
    );
  } else {
    filteredData = response.data[params.select];
  }

  filteredData.forEach((v,i) => {
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
    a.setAttribute("href", `item.html?select=${params.select}&id=${v.id}`);
    figure.setAttribute("class", "part-two-figure");
    img.setAttribute("src", v.img);
    img.setAttribute("alt", v.alt);
    span1.setAttribute("class", "price1");

    p1.innerHTML = v.title;
    span1.innerHTML = v.price1;
    span2.innerHTML = v.price2;
  });

  document.querySelector("#num-items").innerHTML = `${filteredData.length} items`;
})();
