var pageOpener = require('./../pageOpener.js');
var jsonParser = require('./../jsonParser.js');

var forSearching = {
		'form' : false,	
		'inputBoxClass' : 'search-box-text-unactive' ,
		'buttonId' : 'searchBtn'
}

var forGettingItemFromList = {
		'uoSearchList' : 's-results-list-atf',	
		'firstItem' : 'result_0',
		'tagToOpen' : 'a'
}

var forGettingPrice = {
		'priceTagClass1' : 'text'
}

function startOnPaytm(page,paytmUrl,cb){
	console.log('here in start PAYTM');
	var done = false;
	page.open(paytmUrl);
	// page.onError = function(msg, trace) {
	// var msgStack = ['ERROR: ' + msg];
	// if (trace && trace.length) {
	// msgStack.push('TRACE:');
	// trace.forEach(function(t) {
	// msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
	// });
	// }
	// console.error(msgStack.join('\n'));
	// }

	page.onLoadFinished = function(status) {
		var cb1 = function(price){
			
			var jsonResponse = {
					'price' : price,
			}
			jsonResponse = jsonParser.jsonToString(jsonResponse);
			cb(jsonResponse);
		}

		if(!done){
			page.render('./downloaded/paytmItem.png');

			console.log('====================================================='+status);
			var finalP = pageOpener.paytm.forGettingPrice(page,cb1);
		}
		done = true;
		// need to do processing
	}
	
	page.onResourceRequested = function(requestData, networkRequest) {
//		console.log(requestData.headers);
		var list = requestData.url.split(".");
		var len = list.length;
		var str = list[len-1];
		if(str.length == 3 && (str=='jpg' || str=='png' || str=='css')){
			networkRequest.abort();
		}
	};
	
}
exports.startOnPaytm = startOnPaytm;
exports.forSearching = forSearching;
exports.forGettingItemFromList = forGettingItemFromList;
exports.forGettingPrice = forGettingPrice;