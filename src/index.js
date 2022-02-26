const express = require("express");
const connect = require("./config/db");
const app = express();
app.use(express.json());
require("dotenv").config();

const passport = require("./config/google_oauth");

const productsContrller = require("./controllers/product.controller");

app.use(
  express.urlencoded({
    extended: true,
  })
);

const { register, signin } = require("./controllers/auth.controller");
var port = process.env.PORT || 1234;

const https = require("https");
const qs = require("querystring");
const userController = require("./controllers/user.controller");

const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

const checksum_lib = require("./paytm/checksum");
const config = require("./paytm/config");

app.get("/register", async (req, res) => {
  return res.render("register.ejs");
});
app.use("/products", productsContrller);

app.post("/login", register);
app.post("/home", signin);
app.use("/login", userController);
app.use(express.static("public"));

// app.set("views", "views");
app.set("view Engine", "ejs");

// all page redirection
//home pager//
app.get("", async (req, res) => {
  return res.render("home.ejs");
});

//product page
app.get("/product", (req, res) => {
  return res.render("product.ejs");
});

//single product page
app.get("/Productpage", (req, res) => {
  return res.render("Productpage.ejs");
});

//cart page
app.get("/cart", (req, res) => {
  return res.render("cart.ejs");
});

//payment page
app.get("/payment", async (req, res) => {
  return res.render("payment.ejs");
});
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//google auth
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    console.log(req.user);
    return res.render("home.ejs");
  }
);

//address page
app.get("/Address", function (req, res) {
  res.render("Address.ejs");
});

//shipping page
app.get("/shipping", function (req, res) {
  res.render("shipping.ejs");
});

//checkout page
app.get("/checkout", function (req, res) {
  res.render("checkout.ejs");
});

//paynow page
app.post("/paynow", [parseUrl, parseJson], (req, res) => {
  // Route for making payment

  //storing all the details of the user in the object
  var paymentDetails = {
    amount: req.body.amount,
    customerId: req.body.name,
    customerEmail: req.body.email,
    customerPhone: req.body.phone,
  };

  console.log(paymentDetails);

  if (
    !paymentDetails.amount ||
    !paymentDetails.customerId ||
    !paymentDetails.customerEmail ||
    !paymentDetails.customerPhone
  ) {
    res.status(400).send("Payment failed");
  } else {
    var params = {};
    params["MID"] = config.PaytmConfig.mid;
    params["WEBSITE"] = config.PaytmConfig.website;
    params["CHANNEL_ID"] = "WEB";
    params["INDUSTRY_TYPE_ID"] = "Retail";
    params["ORDER_ID"] = "TEST_" + new Date().getTime();
    params["CUST_ID"] = paymentDetails.customerId;
    params["TXN_AMOUNT"] = paymentDetails.amount;
    params["CALLBACK_URL"] = "https://flatheads-official.herokuapp.com";
    params["EMAIL"] = paymentDetails.customerEmail;
    params["MOBILE_NO"] = paymentDetails.customerPhone;

    checksum_lib.genchecksum(
      params,
      config.PaytmConfig.key,
      function (err, checksum) {
        var txn_url =
          "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
        // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

        var form_fields = "";
        for (var x in params) {
          form_fields +=
            "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
        }
        form_fields +=
          "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(
          '<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' +
            txn_url +
            '" name="f1">' +
            form_fields +
            '</form><script type="text/javascript">document.f1.submit();</script></body></html>'
        );
        // res.redirect("/thankyou.ejs");
        res.end();
      }
    );
  }
});

//route for paytm received and verification
app.post("/callback", (req, res) => {
  // Route for verifiying payment

  var body = "";

  req.on("data", function (data) {
    body += data;
  });

  req.on("end", function () {
    var html = "";
    var post_data = qs.parse(body);

    // received params in callback
    console.log("Callback Response: ", post_data, "\n");

    // verify the checksum
    var checksumhash = post_data.CHECKSUMHASH;
    // delete post_data.CHECKSUMHASH;
    var result = checksum_lib.verifychecksum(
      post_data,
      config.PaytmConfig.key,
      checksumhash
    );
    console.log("Checksum Result => ", result, "\n");

    // Send Server-to-Server request to verify Order Status
    var params = { MID: config.PaytmConfig.mid, ORDERID: post_data.ORDERID };

    checksum_lib.genchecksum(
      params,
      config.PaytmConfig.key,
      function (err, checksum) {
        params.CHECKSUMHASH = checksum;
        post_data = "JsonData=" + JSON.stringify(params);

        var options = {
          hostname: "securegw-stage.paytm.in", // for staging
          // hostname: 'securegw.paytm.in', // for production
          port: 443,
          path: "/merchant-status/getTxnStatus",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": post_data.length,
          },
        };

        // Set up the request
        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            console.log("S2S Response: ", response, "\n");

            var _result = JSON.parse(response);
            if (_result.STATUS == "TXN_SUCCESS") {
              // res.send("payment sucess");
              res.redirect("/thankyou");
            } else {
              // res.send("payment failed");
              res.send(
                '<!DOCTYPE html><html><head><title>Failed Transaction</title></head><body><h1>Transaction Failed, Please retry!!</h1><script>setTimeout(function () { window.location = "/checkout";}, 2000)</script></body></html>'
              );
            }
          });
        });

        // post the data
        post_req.write(post_data);
        post_req.end();
      }
    );
  });
});

//thankyou page
app.get("/thankyou", async (req, res) => {
  return res.render("thankyou.ejs");
});

//Error Page
app.get("*", async (req, res) => {
  return res.render("404.ejs");
});

app.listen(port, async (req, res) => {
  try {
    await connect();
    console.log(`Connected to the ${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
