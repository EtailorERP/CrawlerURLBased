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
		'priceTagId1' : 'selling-price-id'
}


var forGettingUserRating = {
		'userRatingBlockId' : 'ratingOverReview',
		'userRating' : 'rating',
		'divForUserRating' : 'span'
}

var forGettingProductImage = {
		'mainBlockId' : 'product-slider',
		'tagsName' : 'img'
}

var forGettingProductName = {
		'mainBlockClass' : 'pdpName',
		'mainBlockIndex' : 0,
		'tagsName' : 'h1',
		'tagsNameIndex' : 0
}

var forGettingProductDescription = {
		'mainBlockClass' : 'details-content',
		'mainBlockClassIndex' : 0,
		'detailDivClass' : 'MsoNormal',
		'detailDivIndex' : 1,
		'tagsName' : 'span',
		'tagsNameIndex' : 0
}

var forGettingSellerName = {
		'mainBlockId' : 'vendorName'
}

function startOnSnapdeal(page,snapdealUrl,cb){
	console.log('here in start snapdeal');
	var done = false;
	page.open(snapdealUrl);
	
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
			page.render('./downloaded/snapdealItem.png');

			var price,userRating,productName,productDescription,seller;
			price = pageOpener.snapdeal.forGettingPrice(page);
			userRating = pageOpener.snapdeal.forGettingUserRating(page);
			productName = pageOpener.snapdeal.forGettingProductName(page);
			productDescription = pageOpener.snapdeal.forGettingProductDescription(page);
			seller = pageOpener.snapdeal.forGettingSellerName(page);
//			image = pageOpener.amazon.forGettingProductImage(page);
			// need to do processing
			var jsonResponse = {
					'name' : productName,
					'price' : price,
					'rating' : userRating,
					'description' : productDescription,
					'seller' : seller,
					'lineGraph' : false
			}
			jsonResponse = jsonParser.jsonToString(jsonResponse);
			cb(jsonResponse);
		}
		done = true;
	}

	page.onResourceRequested = function(requestData, networkRequest) {
//		console.log(requestData.headers);
		var list = requestData.url.split(".");
		var len = list.length;
		var str = list[len-1];
		if(str.length == 3 && (str=='jpg' || str=='png' || str=='gif')){
			networkRequest.abort();
		}
	};

}
exports.startOnSnapdeal = startOnSnapdeal;
exports.forSearching = forSearching;
exports.forGettingItemFromList = forGettingItemFromList;
exports.forGettingPrice = forGettingPrice;
exports.forGettingUserRating = forGettingUserRating;
exports.forGettingProductImage = forGettingProductImage;
exports.forGettingProductName = forGettingProductName;
exports.forGettingProductDescription = forGettingProductDescription;
exports.forGettingSellerName = forGettingSellerName;