console.log('{ "default" : "here in phantomjs');

var system = require('system');
var args = system.args;

// when exits with error
phantom.onError = function(msg, trace) {
	var msgStack = ['PHANTOM ERROR: ' + msg];
	if (trace && trace.length) {
			msgStack.push('TRACE:');
			trace.forEach(function(t) {
			msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
			});
	}
	console.log(msgStack.join('\n'));
	phantom.exit(1);
}


//var urls = [];
//args.forEach(function(arg, i) {
//	 urls[i] = arg;
//});

//var MARKET_PLACE = urls[1];
//var URL = urls[2];

var MARKET_PLACE = 'PAYTM';
var URL ='https://paytm.com/shop/p/micromax-aq5001-canvas-juice-2-silver-MOBMICROMAX-AQ5SHOP245619C3FBD31';
console.log('url REACHED IN SCRIPT'+URL);


var amazonService = require('./services/amazon/amazon.js');
var snapdealService = require('./services/snapdeal/snapdeal.js');
var flipkartService = require('./services/flipkart/flipkart.js');
var paytmService = require('./services/paytm/paytm.js');

var cb = function(response){
//	var eTime = new Date();
//	console.log(eTime-stime);
	console.log('","actual" : '+response+'}');			
	phantom.exit(0);
}

function searchItemOnMP(mp){
	switch(mp){
		case 'AMAZON' :
		{
			
			var page = require('webpage').create();
			amazonService.startOnAmazon(page,URL,cb);	
		}
		break;
		case 'SD':
		{
			var page = require('webpage').create();
			snapdealService.startOnSnapdeal(page,URL,cb);	
		}
		break;
		case 'FK':
		{
			var page = require('webpage').create();
			flipkartService.startOnFlipkart(page,URL,cb);	
		}
		break;
		case 'PAYTM':
		{
			var page = require('webpage').create();
			paytmService.startOnPaytm(page,URL,cb);	
		}
		break;
	}
}


searchItemOnMP(MARKET_PLACE);