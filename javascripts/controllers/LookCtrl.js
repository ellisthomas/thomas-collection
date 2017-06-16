app.controller("LookCtrl", function($rootScope, $http, $location, $q, $scope, FIREBASE_CONFIG, ClothingFactory) {
	
	let lastSelectedShirt = ClothingFactory.getLastSelectedShirt();
	ClothingFactory.getSingleShirt(lastSelectedShirt).then((results) => {
		console.log("results", results);
	}).catch((error) => {
		console.log("error in lastSelectedShirt", error);
	});

	// let lastSelectedPant = ClothingFactory.getLastSelectedPant();
	// ClothingFactory.getSinglePant(lastSelectedPant).then((results) => {
	// 	console.log("results", results);
	// }).catch((error) => {
	// 	console.log("error in lastSelectedPant", error);
	// });

});