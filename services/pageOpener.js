var amz = require('./amazon/amazon.js');
var sd = require('./snapdeal/snapdeal.js');
var fk = require('./flipkart/flipkart.js');
var pt = require('./paytm/paytm.js');
var parser = require('./services.js');

var amazon = {
		'searching' : function(page,item){
			var forSearchingRules = amz.forSearching;

			// don't use console inside here
			page.evaluate(function(forSearching,item) {
				document.getElementById(forSearching.inputBoxID).value = item;
				document.querySelector("."+forSearching.formClass).submit();
			},forSearchingRules,item);
		},

		'forGettingFromList' : function(page){
			var gettingFromListRules = amz.forGettingItemFromList;
			page.evaluate(function(forList) {
				var firstItem = document.getElementById(forList.firstItem);
				firstItem = firstItem.getElementsByTagName(forList.tagToOpen);
				// 0 but does not matter
				firstItem[0].click();
			},gettingFromListRules);
		},

		'forGettingPrice' : function(page){
			var getPriceRules = amz.forGettingPrice;

			var price =   page.evaluate(function(priceRules) {
				if(document.getElementById(priceRules.priceTagId1) != null){
					return document.getElementById(priceRules.priceTagId1).innerHTML;
				}else if(document.getElementById(priceRules.priceTagId2) != null){
					return document.getElementById(priceRules.priceTagId2).innerHTML;
				}else { 
					return 'not able to get';
				}
			},getPriceRules);
			var finalP = parser.getNumbersFromString(price);
			return finalP;

		},
		'forGettingUserRatings' : function(page){
			var userRatingRules = amz.forGettingUserRating;
			console.log('====amazonUserRating=====pageInject========'+page.injectJs('./services/amazon/amazonUserRatingFilter.js'));
			var ratings =   page.evaluate(function(ratingRules) {
				var block = document.getElementById(ratingRules.ratingBlockId);
				var list = block.getElementsByTagName(ratingRules.listOfRatings);
				var jsonObject = {
						'1' : '',
						'2' : '',
						'3' : '',
						'4' : '',
						'5' : ''
				};
				for(var i = 0; i < list.length ; i++){
					jsonObject[5-i]=getDataFromInnerHtmlOfTag(ratingRules.tagToFetch,list[i].getElementsByClassName(ratingRules.ratingDivClass)[ratingRules.indexForRatingDiv].innerHTML);
				}

				return jsonObject;
			},userRatingRules);
			return ratings;
		},
		'forGettingProductImage' : function(page){
			var imageRules = amz.forGettingProductImage;
			console.log(imageRules);
			var image =   page.evaluate(function(imageRules) {
				var block = document.getElementById('product-slider').getElementsByTagName('img');
//				var img = block.getElementsByTagName('img')[0];
//				var jsonObject = {
//				top : img.offsetTop,
//				left : img.offsetLeft,
//				width : img.width,
//				height : img.height
//				}
				return block;
			},imageRules);
			consosole.log(image);

		},
		'forGettingProductName' : function(page){
			var productNameRules = amz.forGettingProductName;
			var title = page.evaluate(function(productNameRules){
				var title = document.getElementById(productNameRules.titleId).innerHTML;
				return title;
			},productNameRules)
			
			return title;
		},
		'forGettingProductDescription' : function(page){
			var productDescRules = amz.forGettingProductDescription;
			var desc = page.evaluate(function(productDescRules){
				var main = document.getElementById(productDescRules.mainDivId);
				var desc = main.getElementsByClassName(productDescRules.contentClass)[productDescRules.contentIndex].innerHTML;
				return desc;
			},productDescRules)

			return desc;
		},
		'forGettingSellerName' : function(page){
			var getSellerRules = amz.forGettingSellerName;
			
			var seller = page.evaluate(function(getSellerRules){
				var main = document.getElementById(getSellerRules.mainBlockId);
				var seller = main.getElementsByTagName(getSellerRules.tagsName)[getSellerRules.tagsNameIndex].innerHTML;
				return seller;
			},getSellerRules);
			
			return seller;
		}
}

var snapdeal = {
		'searching' : function(page,item){
			var forSearchingRules = sd.forSearching;
			console.log(forSearchingRules.inputBoxClass);
			console.log('hrer in searching');
			// page.includeJs('http://code.jquery.com/jquery-2.1.4.min.js', function() {
			// don't use console inside here
			page.evaluate(function(forSearching,item) {
				$('.search-box-text-unactive').val(item);
				$('#searchBtn').click();
			},forSearchingRules,item);
			// });
		},

		'forGettingFromList' : function(page){
			var gettingFromListRules = sd.forGettingItemFromList;
			page.evaluate(function(forList) {
				var firstItem = document.getElementById(forList.firstItem);
				firstItem = firstItem.getElementsByTagName(forList.tagToOpen);
				// 0 but does not matter
				firstItem[0].click();
			},gettingFromListRules);
		},
		'forGettingPrice' : function(page){
			var getPriceRules = sd.forGettingPrice;
			console.log(getPriceRules);
			var price =   page.evaluate(function(priceRules) {
				if(document.getElementsByClassName(priceRules.priceTagClass) != null){
					return document.getElementsByClassName(priceRules.priceTagClass)[priceRules.priceIndex].innerHTML;
				}
				else return 'not able to fetch Price';
			},getPriceRules);
			var finalP = parser.getNumbersFromString(price);
			return finalP;
		},

		'forGettingUserRating' : function(page){
			var userRatingRules = sd.forGettingUserRating;

			var userRating =   page.evaluate(function(ratingRules) {
				var div = document.getElementById(ratingRules.userRatingBlockId);

				// there was single index so it really does not matter
				div = div.getElementsByClassName(ratingRules.userRating)[0];

				var list = div.getElementsByTagName(ratingRules.divForUserRating);

				var jsonObject = {
						'rating' : '',
						'usersRated' : ''
				};

				jsonObject['rating'] = list[0].innerHTML;
				jsonObject['usersRated'] = list[1].innerHTML;

				return jsonObject;

			},userRatingRules);
			return userRating;
		},
//		'forGettingProductImage' : function(page){
//		var imageRules = sd.forGettingProductImage;
//		console.log(imageRules);
//		var image =   page.evaluate(function(imageRules) {
//		var block = document.getElementById('product-slider');
//		var img = block.getElementsByTagName('img')[0];
//		var jsonObject = {
//		top : img.offsetTop,
//		left : img.offsetLeft,
//		width : img.width,
//		height : img.height
//		}
//		return jsonObject;
//		},imageRules);
//		return image;
//		},
//		'getBasicDetails' : function(page){

//		},
		'forGettingProductName' : function(page){
			var productNameRules = sd.forGettingProductName;
			console.log(productNameRules);
			var productName =   page.evaluate(function(productNameRules) {
				var block = document.getElementsByClassName(productNameRules.mainBlockClass);
				block = block[productNameRules.mainBlockIndex].getElementsByClassName(productNameRules.productNameClass);
				var name = block[productNameRules.productNameIndex].innerHTML;

				return name;
			},productNameRules);
			console.log(productName);
			return productName;
		},
		'forGettingProductDescription' : function(page){
			var productDescriptionRules = sd.forGettingProductDescription;
			console.log(productDescriptionRules);
			var productDescription = page.evaluate(function(productDesriptionRules){
				var block = document.getElementsByClassName(productDesriptionRules.mainBlockClass);
				block = block[productDesriptionRules.mainBlockIndex].innerHTML;
				//.getElementsByClassName(productDesriptionRules.detailDivClass);
				//var description = block[productDesriptionRules.detailDivIndex].getElementsByTagName(productDesriptionRules.tagsName)[productDesriptionRules.tagsNameIndex].innerHTML;
				return block;
			},productDescriptionRules);
			return productDescription;
		},
		'forGettingSellerName' : function(page){
			var getSellerRules = sd.forGettingSellerName;
			
			var seller = page.evaluate(function(getSellerRules){
				var seller = document.getElementsByClassName(getSellerRules.mainBlockClass)[getSellerRules.mainBlockIndex].innerHTML;
				return seller;
			},getSellerRules);
			
			return seller;
		}
}

var flipkart = {
		'searching' : function(page,item){
			var forSearchingRules = fk.forSearching;
			console.log(forSearchingRules.inputBoxClass);
			console.log('hrer in searching');
			// page.includeJs('http://code.jquery.com/jquery-2.1.4.min.js', function() {
			// don't use console inside here
			page.evaluate(function(forSearching,item) {
				$('.search-box-text-unactive').val(item);
				$('#searchBtn').click();
			},forSearchingRules,item);
			// });
		},

		'forGettingFromList' : function(page){
			var gettingFromListRules = fk.forGettingItemFromList;
			page.evaluate(function(forList) {
				var firstItem = document.getElementById(forList.firstItem);
				firstItem = firstItem.getElementsByTagName(forList.tagToOpen);
				// 0 but does not matter
				firstItem[0].click();
			},gettingFromListRules);
		},

		'forGettingPrice' : function(page){
			var getPriceRules = fk.forGettingPrice;
			var price =   page.evaluate(function(priceRules) {
				if($('.'+priceRules.priceTagClass1) != null){
					return $('.'+priceRules.priceTagClass1).html();
				}
			},getPriceRules);
			var finalP = parser.getNumbersFromString(price);
			return finalP;
		},
		'forGettingProductName' : function(page){
			var getProductNameRules = fk.forGettingProductName;
			
			var title = page.evaluate(function(ProductNameRules){
				var main = document.getElementsByClassName(ProductNameRules.mainBlockClass);
				var title = main[ProductNameRules.mainBlockIndex].getElementsByClassName(ProductNameRules.titleClass);
				title = title[ProductNameRules.titleIndex].innerHTML;
//				var subtitle = main[ProductNameRules.mainBlockIndex].getElementsByClassName(ProductNameRules.subtitle);
//				if(subtitle != undefined)
//					subtitle = subtitle[ProductNameRules.subtitleIndex].innerHTML;
//				
//				if(subtitle != undefined)
//					title = title+subtitle;
//				
				return title;
				
			},getProductNameRules);
			return title;
		},
		'getGettingUserRating' : function(page){
			var getUserRatingRules = fk.getGettingUserRating;
			
			var rating = page.evaluate(function(getUserRatingRules){
				var main = document.getElementsByClassName(getUserRatingRules.mainBlockClass)[getUserRatingRules.mainBlockIndex];
				main = main.getElementsByTagName(getUserRatingRules.itemListTag);
				var jsonObject = {
						'1' : '',
						'2' : '',
						'3' : '',
						'4' : '',
						'5' : ''
				}
				for(var i = 0;i<main.length ;i++){
					jsonObject[5-i] = main[i].getElementsByTagName(getUserRatingRules.tagsName)[getUserRatingRules.tagsNameIndex].getElementsByClassName(getUserRatingRules.userRatingClass)[getUserRatingRules.userRatingIndex].innerHTML;
				}

				return jsonObject;
			},getUserRatingRules)
			
			return rating;
		},		
		'forGettingSellerName' : function(page){
			var getSellerNameRules = fk.forGettingSellerName;
			
			var seller = page.evaluate(function(getSellerNameRules){
				var main = document.getElementsByClassName(getSellerNameRules.mainBlockClass);
				var seller = main[getSellerNameRules.mainBlockIndex].innerHTML;
				
				return seller;
			},getSellerNameRules);
			return seller;
		}
}

var paytm = {
		'searching' : function(page,item){
			var forSearchingRules = fk.forSearching;
			console.log(forSearchingRules.inputBoxClass);
			console.log('hrer in searching');
			// page.includeJs('http://code.jquery.com/jquery-2.1.4.min.js', function() {
			// don't use console inside here
			page.evaluate(function(forSearching,item) {
				$('.search-box-text-unactive').val(item);
				$('#searchBtn').click();
			},forSearchingRules,item);
			// });
		},

		'forGettingFromList' : function(page){
			var gettingFromListRules = fk.forGettingItemFromList;
			page.evaluate(function(forList) {
				var firstItem = document.getElementById(forList.firstItem);
				firstItem = firstItem.getElementsByTagName(forList.tagToOpen);
				// 0 but does not matter
				firstItem[0].click();
			},gettingFromListRules);
		},

		'forGettingPrice' : function(page,cb){
			var getPriceRules = pt.forGettingPrice;
			var price;
			price = page.includeJs('http://code.jquery.com/jquery-2.1.4.min.js', function() {
				price =   page.evaluate(function(priceRules) {
					if($('.'+priceRules.priceTagClass1) != null){
						return $('.'+priceRules.priceTagClass1).html();
					}
					else return 'not getting price';
				},getPriceRules);
				var finalP = parser.getNumbersFromString(price);
				cb(finalP);
			});
		}
}

exports.amazon = amazon;
exports.snapdeal = snapdeal;
exports.flipkart = flipkart;
exports.paytm = paytm;