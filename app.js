var express = require("express"),
	bodyParser = require("body-parser"),
	ejs = require("ejs"),
	CryptoJS = require("crypto-js"),
	crypto = require("crypto"),
	request = require("request");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//generate random order id
// var oid = Math.floor(Math.random() * 100);

//parameters
var parameters = {
	live: 0,
	oid: 50,
	ttl: 1500,
	tel: "254719158559",
	eml: "sala@sala.com",
	vid: "demo",
	curr: "KES",
	cbk: "http://localhost:3000/",
	crl: "0"
};

//hashkey generation function

var text = "0501500254719158559sala@sala.comdemoKESlocalhost:3000",
	key = "demoCHANGED",
	hash;

hash = crypto
	.createHmac("sha1", key)
	.update(text)
	.digest("hex");
console.log(hash);

app.get("/", (req, res) => {
	res.render("index", {
		live: parameters.live,
		oid: parameters.oid,
		ttl: parameters.ttl,
		tel: parameters.tel,
		eml: parameters.eml,
		vid: parameters.vid,
		curr: parameters.curr,
		cbk: parameters.cbk,
		crl: parameters.crl,
		hsh: hash
	});
});
app.get("/complete", (req, res) => {
	res.render("complete", {
		oid: parameters.oid
	});
});
app.post("https://payments.ipayafrica.com/v3/ke", (req, res) => {
	res.send({
		live: req.body.live,
		oid: req.body.oid,
		ttl: req.body.ttl,
		tel: req.body.tel,
		eml: req.body.eml,
		vid: req.body.vid,
		curr: req.body.curr,
		cbk: req.body.cbk,
		crl: req.body.crl,
		hash: req.body.hsh
	});
});
app.listen(process.env.PORT || 3000, process.env.IP || "localhost", () => {
	console.log("Server listening....");
});
