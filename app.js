var express = require("express"),
	bodyParser = require("body-parser"),
	ejs = require("ejs"),
	CryptoJS = require("crypto-js"),
	request = require("request");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//generate random order id
var oid = Math.floor(Math.random() * 100);
//parameters
var parameters = {
	live: 0,
	oid: oid,
	ttl: 10000,
	tel: "",
	eml: "",
	vid: "demo",
	curr: "KES",
	cbk: "http://localhost:3000/",
	crl: "0"
};

//hashkey generation function
var hash = dict => {
	var str = "";
	for (const key in dict) {
		if (dict.hasOwnProperty(key)) {
			str += dict[key];
		}
	}
	return CryptoJS.HmacSHA1(str, "demoCHANGED");
};
//our get route to the home page..
app.get("/", (req, res) => {
	res.render("index");
});

app.post("/", (req, res) => {
	res.render("index");
});
app.listen(process.env.PORT || 3000, process.env.IP || "localhost", () => {
	console.log("Server listening....");
});
