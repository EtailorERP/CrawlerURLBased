var pageOpener = require('./../pageOpener.js');


var forSearching = {
		'form' : true,	
		'inputBoxID' : 'twotabsearchtextbox' ,
		'formClass' : 'nav-searchbar'
}

var forGettingItemFromList = {
		'uoSearchList' : 's-results-list-atf',	
		'firstItem' : 'result_0',
		'tagToOpen' : 'a'
}

var forGettingPrice = {
		'priceTagId1' : 'priceblock_saleprice',
		'priceTagId2' : 'priceblock_ourprice'
}

function startOnAmazon(page,amazonUrl){
	var done =false;
	console.log('Amazon Started');
	page.open(amazonUrl);
	page.onLoadFinished = function(status) {
		if(!done){
			console.log('========================================'+status);
			page.render('./downloaded/amazonItem.png');

			var finalP = pageOpener.amazon.forGettingPrice(page);
			console.log('","actual" : "price on amazon : '+finalP+'"}');
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

exports.startOnAmazon = startOnAmazon;
exports.forSearching = forSearching;
exports.forGettingItemFromList = forGettingItemFromList;
exports.forGettingPrice = forGettingPrice;