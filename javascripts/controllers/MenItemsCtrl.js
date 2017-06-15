app.controller("MenItemsCtrl", function($routeParams, $scope, ClothingFactory) {
	$scope.selectedShirt = {};

	ClothingFactory.getSingleShirt($routeParams.id).then((results) => {
		$scope.selectedShirt = results.data;
	}).cathc((error) => {
		console.log("getSingleShirt", error);
	});

    
	
});

