app.controller("CollecetionCtrl", function($rootScope, $location, $scope, ClothingFactory) {
		$scope.newCollection = [];

	$scope.addNewCollection = (newCollection) => {
		console.log("new collection here", newCollection);
		$scope.newCollection = shirt;
		$scope.newCollection.uid = $rootScope.user.uid;
		ClothingFactory.postNewCollection($scope.newCollection).then((response) => {
			$scope.newCollection = {};
			// $location.url("/look");
		}).catch((error) => {
			console.log("add look error", error);
		});
	};
});