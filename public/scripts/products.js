let products1 = document.getElementById("products");

async function callProudcts() {
  try {
    let responce = await fetch("https://flatheads.herokuapp.com/products");

    let products = await responce.json();
    let arr = products.Product;
    displayProducts(arr);
  } catch (error) {
    return res.send(error);
  }
}

callProudcts();

//Price Sorting
function handlePricesort() {
  let selected = document.getElementById("priceSort").value;
  if (selected == "low") {
    arr.sort(function (a, b) {
      return Number(a.final_price) - Number(b.final_price);
      // console.log(a.final_price)
    });
  }
  if (selected == "high") {
    arr.sort(function (a, b) {
      return Number(b.final_price) - Number(a.final_price);
    });
  }
  displayProducts(arr);
}

//Name Sorting
function handleNamesort() {
  var selected = document.querySelector("#nameSort").value;
  if (selected == "asc") {
    arr.sort(function (a, b) {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    });
  }
  if (selected == "dsc") {
    arr.sort(function (a, b) {
      if (a.title > b.title) return -1;
      if (a.title < b.title) return 1;
      return 0;
    });
  }

  displayProducts(arr);
}

//function for display the products
function displayProducts(data) {
  products1.textContent = "";

  data.map((el) => {
    let div = document.createElement("div");

    div.addEventListener("click", () => {
      productsAdded(el);
    });

    var img1 = document.createElement("img");
    let start = (img1.src = el.image2);
    let hover = (img1.src = el.image1);

    //movesover images
    img1.onmouseover = () => {
      img1.src = start;
    };
    img1.onmouseout = () => {
      img1.src = hover;
    };

    let name = document.createElement("h3");
    name.textContent = el.title;

    let sub_div = document.createElement("div");
    sub_div.setAttribute("id", "sub_div");

    let ori_price = document.createElement("p");
    ori_price.textContent = `₹ Rs.${el.original_price}`;
    ori_price.style.textDecoration = "line-through";

    let fin_price = document.createElement("p");
    fin_price.textContent = `₹ Rs. ${el.final_price}`;

    let off = document.createElement("p");
    off.textContent = el.offer;
    off.style.color = "tomato";

    sub_div.append(ori_price, fin_price, off);

    div.append(img1, name, sub_div);
    products1.append(div);
  });
}

//setting Items in localStorage

function productsAdded(el) {
  var addedProducts = [];

  addedProducts.push(el);
  console.log(addedProducts);
  localStorage.setItem("myProducts", JSON.stringify(addedProducts));

  window.location.href = "/Productpage";
}

//CheckBox filter

//luft Checkbox Filter
document.getElementById("luft").addEventListener("change", myLuft);

function myLuft() {
  let luft = document.getElementById("luft").checked;

  if (luft === true) {
    let luft_products = arr.filter(function (el) {
      var k = el.title;
      for (var i = 0; i < k.length; k++) {
        if (k[i] + k[i + 1] + k[i + 2] + k[i + 3] === "Luft") {
          return el;
        }
      }
    });
    displayProducts(luft_products);
  } else {
    displayProducts(arr);
  }
}

//Drift Checkbox Filter
document.getElementById("drift").addEventListener("change", myDrift);

function myDrift() {
  let drift = document.getElementById("drift").checked;
  let new_troos = document.getElementById("new_troos").checked;

  if (drift === true) {
    let drift_products = arr.filter(function (el) {
      var k = el.title;
      for (var i = 0; i < k.length; k++) {
        if (k[i] + k[i + 1] + k[i + 2] + k[i + 3] + k[i + 4] === "Drift") {
          return el;
        }
      }
    });
    displayProducts(drift_products);
  } else {
    displayProducts(arr);
  }
}

//Troos checkbox Filter

document.getElementById("new_troos").addEventListener("change", myTroos);

function myTroos() {
  let new_troos = document.getElementById("new_troos").checked;

  if (new_troos === true) {
    let troos_products = arr.filter(function (el) {
      var k = el.title;
      for (var i = 0; i < k.length; k++) {
        if (k[i] + k[i + 1] + k[i + 2] === "New") {
          return el;
        }
      }
    });
    displayProducts(troos_products);
  } else {
    displayProducts(arr);
  }
}

//checkBox Sort Based on Size

document.getElementById("sizeChart").addEventListener("change", onInput);

function onInput() {
  let id1 = document.getElementById("6").checked;
  let id2 = document.getElementById("7").checked;
  let id3 = document.getElementById("8").checked;
  let id4 = document.getElementById("9").checked;
  let id5 = document.getElementById("10").checked;
  let id6 = document.getElementById("11").checked;
  let id7 = document.getElementById("12").checked;

  if (id1 == true) {
    let items1 = arr.filter((el) => {
      let k = el.id;
      if (k == "6" || k == "9") {
        return el;
      }
    });
    displayProducts(items1);
  } else if (id2 == true) {
    let items2 = arr.filter((el) => {
      let k = el.id;
      if (k == "8" || k == "10" || k == "6") {
        return el;
      }
    });
    displayProducts(items2);
  } else if (id3 == true) {
    let items3 = arr.filter((el) => {
      let k = el.id;
      if (k == "7" || k == "11") {
        return el;
      }
    });
    displayProducts(items3);
  } else if (id4 == true) {
    let items4 = arr.filter((el) => {
      let k = el.id;
      if (k == "12" || k == "13" || k == "15") {
        return el;
      }
    });
    displayProducts(items4);
  } else if (id5 == true) {
    let items5 = arr.filter((el) => {
      let k = el.id;
      if (k == "14") {
        return el;
      }
    });
    displayProducts(items5);
  } else if (id6 == true) {
    let items6 = arr.filter((el) => {
      let k = el.id;
      if (k == "6" || k == "10") {
        return el;
      }
    });
    displayProducts(items6);
  } else if (id7 == true) {
    let items7 = arr.filter((el) => {
      let k = el.id;
      if (k == "9" || k == "15") {
        return el;
      }
    });
    displayProducts(items7);
  } else {
    displayProducts(arr);
  }
}
