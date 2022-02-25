var userdata = JSON.parse(localStorage.getItem("userdatabase")) || [];

document.querySelector(".addressform").addEventListener("submit", adddata);

//const path = require("path")
//const path = require("path")

//document.querySelector(".myform").addEventListener("submit", adddata);

//console.log(path.join(__dirname, "../views/shipping"))

function adddata(event) {
  event.preventDefault();

  var email = document.getElementById("email").value;
  var firstname = document.getElementById("firstname").value;
  var address = document.getElementById("address").value;
  var city = document.getElementById("city").value;
  //  var state = document.getElementById("select_state").value;
  var pincode = document.getElementById("pincode").value;
  var phone = document.getElementById("phone").value;

  if (email == "") {
    document.getElementById("emailid").innerHTML = "Enter a valid email";
    return false;
  } else if (firstname == "") {
    document.getElementById("firstnamediv").innerHTML = "Enter an First name";
    return false;
  } else if (address == "") {
    document.getElementById("youraddress").innerHTML = "**Enter an address ";
    return false;
  } else if (city == "") {
    document.getElementById("citydiv").innerHTML = " Enter a city";
    return false;
  } else if (pincode == "") {
    document.getElementById("pincodediv").innerHTML = "Enter a PIN code";
    return false;
  } else if (phone == "") {
    document.getElementById("phonediv").innerHTML =
      "Enter a phone number to use this delivery method";
    return false;
  }

  console.log("success");

  var email = document.querySelector("#email").value;
  var address = document.querySelector("#address").value;

  var userinformation = {
    email: email,
    address: address,
  };

  console.log(userinformation);
  userdata.push(userinformation);

  localStorage.setItem("userdatabase", JSON.stringify(userdata));
  console.log("here");

  window.location.href = "/shipping";
}

//checking

// document.querySelector("#checkbtn").addEventListener("click", crosscheck);

// var registeruser = JSON.parse(localStorage.getItem("userdatabase"))

// function crosscheck() {

//   console.log("successbtn")

// }
//     var checkemail = document.querySelector("#emailcheck").value;

//     var checkaddress= document.querySelector("#addresscheck").value;

//     if(checkemail == "admin@123"  && checkaddress == "@123"){

//         window.location.href = "main.html"

//     }

//     else{

//         for(var i = 0; i < registeruser.length; i++){

//             if(registeruser[i].email == checkemail  &&  registeruser[i].password == checkpassword ){

//                 window.location.href = "slideshow.html"

//                 var flag = true;
//                 break;

//             }

//         }

//             if(flag){
//              alert("login Successful")
//             }

//             else{
//                 alert("your data is not registered")
//             }

//         }

//    // console.log("loginsuccessful")

//appending the items

let container = document.getElementById("cart_section");

let items = JSON.parse(localStorage.getItem("cart_data")) || [];

append_data(items);

var price1 = document.getElementById("show_sub");

function append_data(arr) {
  let total_pr = 0;
  document.getElementById("cart_section").innerHTML = "";

  arr.map((elm, index) => {
    let count = 1;
    total_pr += Number(elm.final_price);
    console.log(total_pr);

    // price1.innerText = total_pr;

    let div = document.createElement("div");
    div.setAttribute("id", "cart_box");

    container.append(div);
    let image = document.createElement("img");
    image.src = elm.image1;
    image.style.height = "50%";
    image.style.width = "20%";
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
      container.innerText = "";

      localStorage.setItem("new_data", JSON.stringify(arr));
      append_data(arr);
      let total_arr =
        JSON.parse(localStorage.getItem("new_data", JSON.stringify(arr))) || [];

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
      let total_val = count * elm.final_price;

      console.log(total_val);

      total.innerText = `Rs.${total_val}.00`;

      ////sub-total value////
      document.querySelector("#show_sub").innerText = "";
      document.querySelector("#show_sub").innerText = `Rs.${
        total_pr + total_val
      }.00 `;
    }

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

      let total_val = count * elm.final_price;
      console.log(total_val);

      ////total val////
      total.innerText = `Rs.${total_val}.00`;

      ////sub-total value////
      document.querySelector("#show_sub").innerText = "";
      document.querySelector("#show_sub").innerText = `Rs.${
        total_pr + total_val
      }.00 `;
    }

    change_div.append(add_div, min_div);
    div_right.append(price, quantity, total);
    quantity.append(val_div, change_div);

    div.append(image, title_div, div_right);
    container.append(div);
  });
}

// document.querySelector(".submit").addEventListener("click", () => {
//   window.location.href = "/shipping";
// });
