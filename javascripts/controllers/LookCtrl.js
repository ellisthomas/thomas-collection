app.controller("LookCtrl", function($rootScope, $http, $location, $q, $scope, FIREBASE_CONFIG, ClothingFactory) {
	
	$scope.addNewLook = () => {
		$scope.newLook.uid = $rootScope.user.uid;
		ClothingFactory.postNewLook($scope.newLook).then((response) => {
			$scope.newLook = {};
			$location.url("/look");
		}).catch((error) => {
			console.log("add look error", error);
		});
	};
});