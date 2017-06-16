app.controller("LookCtrl", function($rootScope, $http, $location, $q, $scope, FIREBASE_CONFIG, ClothingFactory) {

    let lastSelectedShirt = ClothingFactory.getLastSelectedShirt();
    ClothingFactory.getSingleShirt(lastSelectedShirt).then((results) => {
        console.log("results in shirts", results);
    }).catch((error) => {
        console.log("error in lastSelectedShirt", error);
    });

    let lastSelectedPant = ClothingFactory.getLastSelectedPant();
    console.log("lastSelectedPant", lastSelectedPant);
    ClothingFactory.getSinglePant(lastSelectedPant).then((results) => {
        console.log("results in pants", results);
    }).catch((error) => {
        console.log("error in lastSelectedPant", error);
    });

});
