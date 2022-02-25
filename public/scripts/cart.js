function cont() {
  window.location.href = "../products/products.html";
}
function update() {
  window.location.href = "/cart";
}
function payment() {
  window.location.href = "../Payment/Address.html";
}
let main = document.querySelector("#cart_section");
let arr = JSON.parse(localStorage.getItem("cart_data")) || [];
//  let arr = [
//   {
//  "id": "1",
//  "image1": "https://cdn.shopify.com/s/files/1/0258/2485/4100/products/Azure8_1800x1800.jpg",
//  "image2": "https://cdn.shopify.com/s/files/1/0258/2485/4100/products/Azure9_1800x1800.jpg?v=1636735906",
//  "title": "Luft Azure Blue Melange",
//  "original_price": "3999",
//  "final_price": "3329",
//  "offer": "Save 17%",

// },
// {
//  "id": "2",
//  "image1": "https://cdn.shopify.com/s/files/1/0258/2485/4100/products/Cocoa8_1800x1800.jpg",
//  "image2": "https://cdn.shopify.com/s/files/1/0258/2485/4100/products/Cocoa9_1800x1800.jpg?v=1636735954",
//  "title": "Luft Cocoa Brown",
//  "original_price": "3999",
//  "final_price": "3329",
//  "offer": "Save 17%",

// },
// {
//  "id": "2",
//  "image1": "https://cdn.shopify.com/s/files/1/0258/2485/4100/products/Cocoa8_1800x1800.jpg",
//  "image2": "https://cdn.shopify.com/s/files/1/0258/2485/4100/products/Cocoa9_1800x1800.jpg?v=1636735954",
//  "title": "Luft Cocoa Brown",
//  "original_price": "3999",
//  "final_price": "3329",
//  "offer": "Save 17%",

// },

// ]
append_data(arr);

function append_data(arr) {
  let total_pr = 0;
  document.querySelector("#cart_section").innerHTML = "";

  arr.map((elm, index) => {
    let count = 1;
    total_pr += Number(elm.final_price);
    document.querySelector("#show_sub").innerText = `Rs.${total_pr}.00 `;

    let div = document.createElement("div");
    div.setAttribute("id", "cart_box");
    main.append(div);
    let image = document.createElement("img");
    image.src = elm.image1;
    image.style.height = "70%";
    image.style.width = "10%";
    image.style.marginLeft = "2%";

    image.style.marginTop = "3%";
    let title_div = document.createElement("div");
    title_div.setAttribute("id", "title_div");
    title_div.innerText = elm.title;
    let size = document.createElement("p");
    size.setAttribute("id", "size_para");
    size.innerText = Math.ceil(Math.random() * 10);

    let remove = document.createElement("button");
    remove.addEventListener("click", function () {
      arr.splice(index, 1);
      console.log(arr);
      // main.innerText = "";

      localStorage.setItem("cart_data", JSON.stringify(arr));
      append_data(arr);
      let total_arr =
        JSON.parse(localStorage.getItem("cart_data", JSON.stringify(arr))) || [];

      console.log(total_arr);
      let total_price = 0;
      total_arr.map((elm) => {
        total_price += Number(elm.final_price);
      });
    });

    remove.setAttribute("id", "remove_btn");
    remove.innerText = "REMOVE";
    title_div.append(size, remove);
    let div_right = document.createElement("div");
    div_right.addEventListener("mouseover", showArr);
    div_right.addEventListener("mouseout", removeArr);
    function showArr() {
      change_div.style.display = "flex";
    }
    function removeArr() {
      change_div.style.display = "none";
    }
    div_right.setAttribute("id", "right_div");
    let price = document.createElement("p");
    price.setAttribute("id", "price");
    price.innerText = `Rs.${elm.final_price}.00`;

    let quantity = document.createElement("div");

    quantity.setAttribute("id", "quantity");

    let val_div = document.createElement("div");
    val_div.setAttribute("id", "val_div");
    val_div.innerText = `${count}`;
    let total = document.createElement("p");
    total.innerText = `Rs.${elm.final_price}.00`;
    total.setAttribute("id", "total");
    let change_div = document.createElement("div");

    change_div.setAttribute("id", "changeDiv");
    let add_div = document.createElement("div");
    add_div.setAttribute("id", "add_div");
    add_div.addEventListener("click", add_val);

    //// increasing quantity////

    function add_val() {
      count++;

      console.log(count);
      val_div.innerText = "";
      val_div.innerText = `${count}`;
      total.innerText = "";
      let total_val = count * Number(elm.final_price);

      console.log(total_val);

      total.innerText = `Rs.${total_val}.00`;

      ////sub-total value////
      document.querySelector("#show_sub").innerText = "";
      document.querySelector("#show_sub").innerText = `Rs.${
        total_pr + total_val
      }.00 `;
    }
    let img_up = document.createElement("img");
    img_up.src = "./pics/up.svg";
    img_up.setAttribute("id", "up_img");

    let min_div = document.createElement("div");
    min_div.setAttribute("id", "min_div");
    min_div.addEventListener("click", min_val);

    //// decreasing quantity////

    function min_val() {
      count--;
      //  total_val = total_val - Number(final_price);
      //  console.log(total_val);
      if (count == 0) {
        total_pr = total_pr - Number(elm.final_price);
        arr.splice(index, 1);
        console.log(arr);
        localStorage.setItem("cart_data", JSON.stringify(arr));
        if (arr.length == 0) {
          total_pr = 0;
        }
        append_data(arr);

        localStorage.setItem("final_data", JSON.stringify(arr));
      }
      console.log(count);
      //  val_div.innerText = "";
      val_div.innerText = `${count}`;
      total.innerText = "";

      let total_val = count * Number(elm.final_price);
      console.log(total_val);

      ////total val////
      total.innerText = `Rs.${total_val}.00`;

      ////sub-total value////
      document.querySelector("#show_sub").innerText = "";
      document.querySelector("#show_sub").innerText = `Rs.${
        total_pr + total_val
      }.00 `;
    }

    let img_down = document.createElement("img");
    img_down.src = "./pics/down.svg";
    img_down.setAttribute("id", "down_img");

    add_div.append(img_up);
    min_div.append(img_down);
    change_div.append(add_div, min_div);
    div_right.append(price, quantity, total);
    quantity.append(val_div, change_div);
    div.append(image, title_div, div_right);
  });
}
