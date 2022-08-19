const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");



const app = express();
app.use(express.static("public"));

app.use(bodyparser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apikey = "8c42f5278bde45d305c3747be24b7807";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      console.log(data);
      const mydata = JSON.parse(data);
      console.log(mydata);
      const desc = mydata.weather[0].description;
      console.log(desc);
      const con = mydata.sys.country;
      console.log(con);
      const temp = mydata.main.temp;
      const icon = mydata.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The current weather here is " + desc + " !</h1>");
      res.write("<h3>The Temperature in " + query + " is : " + temp + " degress " + unit + " !</h3>");
      res.write("<img src='" + imageurl + "'>");
      res.send();
    })
  })
  const object = {
    name: "bikshu",
    dish: "chicken",
  };
  console.log(JSON.stringify(object));
})

app.listen(process.env.PORT ||3000, function() {
  console.log("server is running on 3000");
});
