var pageOpener = require('./../pageOpener.js');


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
		'priceTagId1' : 'selling-price-id'
}


var forGettingProductName = {
		'mainBlockClass' : 'pdpName',
		'mainBlockIndex' : 0,
		'tagsName' : 'h1',
		'tagsNameIndex' : 0
}

function startOnSnapdeal(page,snapdealUrl){
	console.log('here in start snapdeal');
	var done = false;
	page.open(snapdealUrl);
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
		if(!done){
			console.log('====================================================='+status);
			page.render('./downloaded/snapdealItem.png');

			finalP = pageOpener.snapdeal.forGettingPrice(page);
			productName = pageOpener.snapdeal.forGettingProductName(page);
			console.log(productName);
			console.log('","actual" : "price on snapdeal : '+finalP+'"}');
			phantom.exit();

		}
		done = true;
	}

	page.onResourceRequested = function(requestData, networkRequest) {
//		console.log(requestData.headers);
		var list = requestData.url.split(".");
		var len = list.length;
		var str = list[len-1];
		if(str.length == 3 && (str=='jpg' || str=='gif' || str=='png')){
			networkRequest.abort();
		}
	};

}
exports.startOnSnapdeal = startOnSnapdeal;
exports.forSearching = forSearching;
exports.forGettingItemFromList = forGettingItemFromList;
exports.forGettingPrice = forGettingPrice;
exports.forGettingProductName = forGettingProductName;