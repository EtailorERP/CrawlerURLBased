var pageOpener = require('./../pageOpener.js');
var jsonParser = require('./../jsonParser.js')

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

var forGettingProductName = {
		'mainBlockClass' : 'title-wrap',
		'mainBlockIndex' : 0,
		'titleClass' : 'title',
		'titleIndex' : 0,
		'subtitle' : 'subtitle',
		'subtitleIndex' : 0
}

var forGettingSellerName = {
		'mainBlockClass' : 'seller-name',
		'mainBlockIndex' : 0
}

var getGettingUserRating = {
		'mainBlockClass' :  'ratingsDistribution',
		'mainBlockIndex' :  0,
		'itemListTag' : 'li',
		'tagsName' : 'a',
		'tagsNameIndex' : 0,
		'userRatingClass' : 'progress',
		'userRatingIndex' : 0,
}

function startOnFlipkart(page,flipkartUrl,cb){
	var done = false;
	console.log('here in start FLIPKART');
	page.open(flipkartUrl);
	 page.onError = function(msg, trace) {
	 var msgStack = ['ERROR: ' + msg];
	 if (trace && trace.length) {
	 msgStack.push('TRACE:');
	 trace.forEach(function(t) {
	 msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
	 });
	 }
	 console.error(msgStack.join('\n'));
	 }
	page.onLoadFinished = function(status) {
		if(!done){
			console.log('====================================================='+status);
			page.render('./downloaded/flipkartItem.png');
			var name,price,seller;
			name = pageOpener.flipkart.forGettingProductName(page);
			price = pageOpener.flipkart.forGettingPrice(page);
			seller = pageOpener.flipkart.forGettingSellerName(page);
			rating = pageOpener.flipkart.getGettingUserRating(page);
			var jsonResponse = {
					'name' : name,
					'price' : price,
					'seller' : seller,
					'rating' : rating
			}
			jsonResponse = jsonParser.jsonToString(jsonResponse);
			cb(jsonResponse);
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
exports.forGettingProductName = forGettingProductName;
exports.forGettingSellerName = forGettingSellerName;
exports.getGettingUserRating = getGettingUserRating;