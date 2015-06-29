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
				if($('#'+priceRules.priceTagId1) != null){
					return $('#'+priceRules.priceTagId1).html();
				}
			},getPriceRules);
			console.log('price on snapdeal'+price);
			var finalP = parser.getNumbersFromString(price);

			return finalP;
		},
		'forGettingProductName' : function(page){
			var productNameRules = sd.forGettingProductName;
			console.log(imageRules);
			var productName =   page.evaluate(function(productNameRules) {
				var block = document.getElementsByClassName(productNameRules.mainBlockClass);
				block = block[productNameRules.mainBlockIndex].getElementsByTagName(productNameRules.tagsName);
				var name = block[productNameRules.tagsNameIndex].innerHTML;
				
				return name;
			},productNameRules);
			console.log(productName);
			return productName;
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
			console.log(getPriceRules);
			var price =   page.evaluate(function(priceRules) {
				if($('.'+priceRules.priceTagClass1) != null){
					return $('.'+priceRules.priceTagClass1).html();
				}
			},getPriceRules);
			console.log('price on flipkart'+price);
			var finalP = parser.getNumbersFromString(price);
			return finalP;

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
				console.log(price);
				var finalP = parser.getNumbersFromString(price);
				cb(finalP);
			});
		}
}

exports.amazon = amazon;
exports.snapdeal = snapdeal;
exports.flipkart = flipkart;
exports.paytm = paytm;