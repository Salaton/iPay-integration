const express = require("express"),
	bodyParser = require("body-parser"),
	ejs = require("ejs"),
	fs = require("fs"),
	path = require("path"),
	morgan = require("morgan"),
	rfs = require("rotating-file-stream"),
	crypto = require("crypto"),
	nexe = require('nexe'),
	Service = require('node-windows').Service;

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

//log file rotation
var logDirectory = path.join(__dirname, "log");
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
var accessLogStream = rfs("access.log", {
	interval: "1d", // rotate daily
	path: logDirectory
});

//create the .exe file
nexe.compile({
    flags: true,
    input: "app.js",
    output: "ipayafrica",
    nodeVersion: "v10.16.0",
    nodeTempDir: "nexe_node",
    framework: "node",
    resourceFiles: []
  },
  (error) => {
    if (error) {
      return console.error(error.message)
    }
  }
);


//running the code on windows as a service
// Create a new service object
var svc = new Service({
  name:'iPay Test',
  description: 'This is a simple NodeJS implementation that allows a user to successfully integrate with the iPay gateway.',
  script: 'C:\Users\ipayafrica\Documents\NodeSample\iPay-integration\app.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
const oid = Math.floor(Math.random() * 100);
console.log("The order ID is", oid);
//parameters
const parameters = {
	live: 0,
	oid: oid,
	ttl: 100000,
	tel: "254719158559",
	eml: "sala@sala.com",
	vid: "demo",
	curr: "KES",
	cbk: "http://localhost:8080/complete",
	crl: 0
};

//hashkey generation function
var text = `${parameters.live}${oid}${parameters.ttl}${parameters.tel}${parameters.eml}${parameters.vid}${parameters.curr}${parameters.cbk}${parameters.crl}`,
	key = "demoCHANGED",
	hash;
// var text = "050100000254719158559sala@sala.comdemoKEShttp://localhost:3000/complete0",
// 	key = "demoCHANGED",
// 	hash;

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
		crl: req.body.crl
	});
});
app.listen(process.env.PORT || 8080, process.env.IP || "localhost", () => {
	console.log("Server listening on port 8080....");
});
