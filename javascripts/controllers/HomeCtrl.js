app.controller("HomeCtrl", function($rootScope, $location, $scope, ClothingFactory) {
	$scope.shirts = [];
	$scope.pants = [];

	let getShirts = () => {
		ClothingFactory.getShirtsList($rootScope.user.uid).then((shirtz) => {
			$scope.shirts = shirtz;
		console.log("shirtz", shirtz);
		}).catch((error) => {
			console.log("get shirt error", error);
		});
	};

	getShirts();

	let getPants = () => {
		ClothingFactory.getPantsList($rootScope.user.uid).then((pantz) => {
			$scope.pants = pantz;
			console.log("pantz", pantz);
		}).catch((error) => {
			console.log("get pants error", error);
		});
	};

	getPants();

	$scope.newLook = [];

	$scope.addNewLook = (shirt) => {
		console.log("what is shirt", shirt);
		$scope.newLook = shirt;
		$scope.newLook.uid = $rootScope.user.uid;
		ClothingFactory.postNewLook($scope.newLook).then((response) => {
			$scope.newLook = {};
			// $location.url("/look");
		}).catch((error) => {
			console.log("add look error", error);
		});
	};


});