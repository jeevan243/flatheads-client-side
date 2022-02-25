const express = require("express");
const connect = require("./config/db");
require("dotenv").config();
const {register,signin} = require("./controllers/auth.controller");
const passport = require("./config/google_oauth")
const productsContrller = require("./controllers/product.controller");

const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

const checksum_lib = require("./Paytm/checksum");
const config = require("./Paytm/config");

const Port1 = process.env.Port || 1234;
const app = express();
app.use(express.json());
app.get("/register",async(req,res)=>{
  return res.render("register.ejs")
});
app.use("/products", productsContrller);

app.post("/login",register);
app.post("/homepage",signin);


app.use(express.static("public"));

// app.set("views", "views");
app.set("view Engine", "ejs");

// all page redirection
//home pager
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
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
app.get('/auth/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));
 
app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
      
        failureRedirect: '/auth/google/failure'
}),(req,res) =>{
    console.log(req.user)
    res.render("homepage.ejs");
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
    params["CALLBACK_URL"] = "http://localhost:3000/callback";
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

//thankyou page
app.get("/thankyou", async (req, res) => {
  return res.render("thankyou.ejs");
});

//Error Page
app.get("*", async (req, res) => {
  return res.render("404.ejs");
});

app.listen(Port1, async (req, res) => {
  try {
    await connect();
    console.log(`Connected to the ${Port1}`);
  } catch (error) {
    console.log(error.message);
  }
});
