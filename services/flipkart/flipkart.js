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
		'priceTagClass1' : 'product-details .selling-price'
}

function startOnFlipkart(page,flipkartUrl){
	var done = false;
	console.log('here in start FLIPKART');
	page.open(flipkartUrl);

	page.onLoadFinished = function(status) {
		if(!done){
			console.log('====================================================='+status);
			page.render('./downloaded/flipkartItem.png');

			var finalP = pageOpener.flipkart.forGettingPrice(page);
			console.log('","actual" : "price on flipkart : '+finalP+'"}');
			phantom.exit();
			// need to do processing

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
exports.startOnFlipkart = startOnFlipkart;
exports.forSearching = forSearching;
exports.forGettingItemFromList = forGettingItemFromList;
exports.forGettingPrice = forGettingPrice;