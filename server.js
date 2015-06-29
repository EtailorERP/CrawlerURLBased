var cluster = require('cluster');


if (cluster.isMaster) {

	var cpuCount = require('os').cpus().length;

	// Create a worker for each CPU
	for (var i = 0; i < cpuCount; i += 1) {
		cluster.fork();
	}
	cluster.on('exit', function (worker) {

		// Replace the dead worker,
		// we're not sentimental
		console.log('Worker ' + worker.id + ' died :(');
		cluster.fork();

	});
} else {



	var express = require('express');
	var bodyParser = require('body-parser');
	var app = express();
	var exec = require('child_process').exec;
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));


	var parser = require('./server/services/outputParser.js');

	app.use("/scripts",  express.static(__dirname + '/client/scripts/'));
	app.use("/images",express.static(__dirname + '/client/images/'));
	app.use("/styles",express.static(__dirname + '/client/styles/'));
	
	app.get('/',function(req,res){
		res.sendFile(__dirname+'/client/index.html');
		//res.end('done');
	});



	app.post('/amazonPrice',function(req,res){
		var data = {
				'amazonUrl' : req.body.amazonUrl
		}
		
		exec('phantomjs click.js AMAZON "'+data.amazonUrl+'"',function(err,out,code){
			console.log(out);
			var responseToSend = parser.outputFromScriptParser(out);
			res.send(responseToSend);
			console.log('============================================='+responseToSend.price);
		});
	});

	app.post('/snapdealPrice',function(req,res){
		var data = {
				'snapdealUrl' : req.body.snapdealUrl
		}

		exec('phantomjs click.js SD "'+data.snapdealUrl+'"',function(err,out,code){
			var responseToSend = parser.outputFromScriptParser(out);
			res.send(responseToSend);
			console.log('============================================='+responseToSend);
		});
		
	});

	app.post('/flipkartPrice',function(req,res){
		var data = {
				'flipkartUrl' : req.body.flipkartUrl
		}

		exec('phantomjs click.js FK "'+data.flipkartUrl+'"',function(err,out,code){
			var responseToSend = parser.outputFromScriptParser(out);
			res.send(responseToSend);
			console.log('============================================='+responseToSend);
		});


	});

	app.post('/paytmPrice',function(req,res){
		var data = {
				'paytmUrl' : req.body.paytmUrl
		}

		exec('phantomjs click.js PAYTM "'+data.paytmUrl+'"',function(err,out,code){
			var responseToSend = parser.outputFromScriptParser(out);
			res.send(responseToSend);
			console.log('============================================='+responseToSend);
		});
		
	});


	app.listen(3004,function(){
		console.log("App Started on PORT 3004");
	});
}