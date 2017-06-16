app.controller("StyleCtrl", function($rootScope, $http, $location, $q, $scope, FIREBASE_CONFIG, ClothingFactory) {
		$scope.newStyle = [];

	$scope.addNewStyle = (newStyle) => {
		console.log("new style here", newStyle);
		$scope.newStyle = shirt;
		$scope.newStyle.uid = $rootScope.user.uid;
		ClothingFactory.postNewStyle($scope.newStyle).then((response) => {
			$scope.newStyle = {};
			// $location.url("/look");
		}).catch((error) => {
			console.log("add look error", error);
		});
	};
});






