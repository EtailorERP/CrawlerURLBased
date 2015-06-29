var app = angular.module("priceFetcher", []);

app.controller("mainController", function($scope,ajaxCall,parser) {

	$scope.amazonWait = 0;
	$scope.flipkartWait = 0;
	$scope.snapdealWait = 0;
	$scope.paytmWait = 0;



	$scope.fetchAmazon = function(){
		var dataToSend = {
				'amazonUrl' : $scope.amazonUrl
		}
		var data = {
				'scope' : $scope,
				'url' : 'amazonPrice',
				'data' : dataToSend,
				'success' : function(scope,data){
					console.log(data);
					scope.amazonWait = 0;
					scope.amazonPrice = data;
				}
		}
		console.log(data);
		if(parser.checkEmpty(dataToSend.amazonUrl)){
			$scope.amazonWait = 1;
			ajaxCall.ajaxPost(data);
		}
	}

	$scope.fetchSnapdeal = function(){
		var dataToSend = {
				'snapdealUrl' : $scope.snapdealUrl
		}
		var data = {
				'scope' : $scope,
				'url' : 'snapdealPrice',
				'data' : dataToSend,
				'success' : function(scope,data){
					console.log(data);
					scope.snapdealWait = 0;
					scope.snapdealPrice = data;
				}
		}
		console.log(data);
		if(parser.checkEmpty(dataToSend.snapdealUrl)){
			$scope.snapdealWait = 1;
			ajaxCall.ajaxPost(data);
		}
	}

	$scope.fetchFlipkart = function(){
		var dataToSend = {
				'flipkartUrl' : $scope.flipkartUrl
		}
		var data = {
				'scope' : $scope,
				'url' : 'flipkartPrice',
				'data' : dataToSend,
				'success' : function(scope,data){
					console.log(data);
					scope.flipkartWait = 0;
					scope.flipkartPrice = data;
				}
		}
		console.log(data);
		if(parser.checkEmpty(dataToSend.flipkartUrl)){
			$scope.flipkartWait = 1;
			ajaxCall.ajaxPost(data);
		}
	}

	$scope.fetchPaytm = function(){
		var dataToSend = {
				'paytmUrl' : $scope.paytmUrl
		}
		var data = {
				'scope' : $scope,
				'url' : 'paytmPrice',
				'data' : dataToSend,
				'success' : function(scope,data){
					console.log(data);
					scope.paytmWait = 0;
					scope.paytmPrice = data;
				}
		}
		console.log(data);
		if(parser.checkEmpty(dataToSend.paytmUrl)){
			$scope.paytmWait = 1;
			ajaxCall.ajaxPost(data);
		}
	}

});