var pageOpener = require('./../pageOpener.js');
var jsonParser = require('./../jsonParser.js')

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

var forGettingUserRating = {
	'ratingBlockId' : 'revSum',
	'listOfRatings' : 'tr',
	'ratingDivClass' : 'a-nowrap',
	'indexForRatingDiv' : 1,
	'tagToFetch' : 'a'
		
}

var forGettingProductImage = {
	'mainBlockId' : 'product-slider',
	'tagsName' : 'img'
}

var forGettingProductName = {
	'titleId' : 'productTitle'
}

var forGettingProductDescription = {
	'mainDivId' : 'productDescription',
	'contentClass' : 'productDescriptionWrapper',
	'contentIndex' : 0
}

var forGettingSellerName = {
		'mainBlockId' : 'merchant-info',
		'tagsName' : 'a',
		'tagsNameIndex' : 0
}

function startOnAmazon(page,amazonUrl,cb){
	var done =false;
	console.log('Amazon Started');
	page.open(amazonUrl);
	page.onLoadFinished = function(status) {
		if(!done){
			console.log('========================================'+status);
			page.render('./downloaded/amazonItem.png');

			var price,userRating,name,description;
			price = pageOpener.amazon.forGettingPrice(page);
			userRating = pageOpener.amazon.forGettingUserRatings(page);
			name = pageOpener.amazon.forGettingProductName(page);
			description = pageOpener.amazon.forGettingProductDescription(page);
			var seller = pageOpener.amazon.forGettingSellerName(page);
			
			var jsonResponse = {
					'name' : name ,
					'price' : price,
					'rating' : userRating,
					'description' : description,
					'seller' : seller,
					'lineGraph' : true
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

exports.startOnAmazon = startOnAmazon;
exports.forSearching = forSearching;
exports.forGettingItemFromList = forGettingItemFromList;
exports.forGettingPrice = forGettingPrice;
exports.forGettingUserRating = forGettingUserRating;
exports.forGettingProductImage = forGettingProductImage;
exports.forGettingProductDescription = forGettingProductDescription;
exports.forGettingProductName = forGettingProductName;
exports.forGettingSellerName = forGettingSellerName;