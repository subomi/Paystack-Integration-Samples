var http = require("http");
var urlparser = require("url").parse;
var paystack = require("paystack")("input your secret key here"); 
var fs = require("fs");

// Easy access
var Transactions = paystack.transaction;
// retrieving files like this is actually not perfomance optimum, use streams instead
var index = fs.readFileSync("./index.html");

http.createServer(function(request, response) {
var url = urlparser(request.url, true);
	// index route
	if(url.pathname === "/") {
		response.setHeader("Content-Type", "text/html");
		response.end(index);
		return;
	}

	/* 	
	// For jquery
	if(url.pathname === "/jquery.js") {
		console.log("Loading jquery.js");
		response.setHeader("Content-Type", "application/javascript");
		response.end(jquery);
		return;
	}
	*/
	
	// payment route
	if(url.pathname === "/makepayment") {
		// process variables
		var productId = url.query.productId;
		var email = url.query.email;
		
		if(!email) {
			// email is complusory	
			response.end('<h2>Error: Email is a complusory field</h2>');
			return;
		}
		// call paystack
		Transactions.initialize({
			email: email,
			amount: 500000
		}, function(error, body) {
			if(!error) {
				response.setHeader("Content-Type", "application/javascript");
				response.end(JSON.stringify(body));
				return;	
			}
			response.writeHead(400, {"Content-Type": "application/javascript"});
			response.end(error.toString());
		})
	}
	
}).listen(8080, function(err) {
	if(!err) console.log("Listening at 8080");
});
