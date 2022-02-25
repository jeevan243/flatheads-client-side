// document.querySelector("#button").addEventListener("click",addItem);
var arr = JSON.parse(localStorage.getItem("myProducts")) || [];

var title;
var image_2;
var price;

manish_append(arr[0]);

function manish_append(data) {
  var image = document.createElement("img");
  image.setAttribute("class", "leftimgm");
  image_2 = document.createElement("img");
  image_2.setAttribute("class", "leftimgm");

  price = document.createElement("h3");
  var price_cut = document.createElement("p");

  title = document.createElement("h1");

  var image_same = document.createElement("img");
  // image_same.setAttribute('class', "leftimgm")
  image_same.src = data.image1;

  image.src = data.image1;
  image_2.src = data.image2;

  // console.log(image)

  var leftdiv = document.getElementById("leftimg");
  leftdiv.append(image, image_2);

  price_cut.textContent = data.original_price;
  price.textContent = data.final_price;

  var priceShows = document.getElementById("pricefix");
  var cutPrice = document.getElementById("cut_price");
  cutPrice.append(price_cut);
  priceShows.append(price);

  // id="priceShow"

  title.textContent = data.title;
  var name = document.getElementById("name");
  name.append(title);

  var right_img = document.getElementById("rightimg");
  // right_img.setAttribute('id', )

  right_img.append(image_same);
}

// document.querySelector("#button").addEventListener("click",addItem);
// function addItem(){
//     arr.push(data)
//     localStorage.setItem("manish",JSON.stringify(data))

// }

var arr12 = JSON.parse(localStorage.getItem("cart_data")) || [];

function addItem(event) {
  var qty = document.querySelector("#select").value;
  var color = document.querySelector("#colorselect").value;
  var size = document.querySelector("#sizechart").value;
  var obj = {
    title: title.innerHTML,
    image1: image_2.src,
    qty: qty,
    color: color,
    size: size,
    final_price: price.innerHTML,
  };
  arr12.push(obj);
  localStorage.setItem("cart_data", JSON.stringify(arr12));
  window.location.href = "/cart";
}

var accItem = document.getElementsByClassName("accordionItem");
var accHD = document.getElementsByClassName("accordionItemHeading");
for (i = 0; i < accHD.length; i++) {
  accHD[i].addEventListener("click", toggleItem, false);
}
function toggleItem() {
  var itemClass = this.parentNode.className;
  for (i = 0; i < accItem.length; i++) {
    accItem[i].className = "accordionItem close";
  }
  if (itemClass == "accordionItem close") {
    this.parentNode.className = "accordionItem open";
  }
}
// function a(){
//     // document.getElementById("right").src=""
//     document.getElementById("right").src="https://cdn.shopify.com/s/files/1/0258/2485/4100/products/Azure8_720x.jpg?v=1636735909"

// }
// function b(){
//     // document.getElementById("right").src=""
//     document.getElementById("right").src="https://cdn.shopify.com/s/files/1/0258/2485/4100/products/Azure9_720x.jpg?v=1636735906"

// }
// function c(){
//     // document.getElementById("right").src=""
//     document.getElementById("right").src="https://cdn.shopify.com/s/files/1/0258/2485/4100/products/Azure1_1800x1800.jpg?v=1636735907"

// }
// function d(){
//     // document.getElementById("right").src=""
//     document.getElementById("right").src="https://cdn.shopify.com/s/files/1/0258/2485/4100/products/Azure2_1800x1800.jpg?v=1636735907"

// }
// function e(){
//     // document.getElementById("right").src=""
//     document.getElementById("right").src="https://cdn.shopify.com/s/files/1/0258/2485/4100/products/Azure3_1800x1800.jpg?v=1637613646"

// }
// function f(){
//     // document.getElementById("right").src=""
//     document.getElementById("right").src="https://cdn.shopify.com/s/files/1/0258/2485/4100/products/Azure4_1800x1800.jpg?v=1637613646"

// }
