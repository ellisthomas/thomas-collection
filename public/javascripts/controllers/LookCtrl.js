app.controller("LookCtrl", function($rootScope, $http, $location, $q, $scope, FIREBASE_CONFIG, ClothingFactory) {

    let lastSelectedShirt = ClothingFactory.getLastSelectedShirt();
    ClothingFactory.getSingleShirt(lastSelectedShirt).then((results) => {
        $scope.shirt = results;
    }).catch((error) => {
        console.log("error in lastSelectedShirt", error);
    });

    let lastSelectedPant = ClothingFactory.getLastSelectedPant();
    console.log("lastSelectedPant", lastSelectedPant);
    ClothingFactory.getSinglePant(lastSelectedPant).then((results) => {
        $scope.pant = results;
    }).catch((error) => {
        console.log("error in lastSelectedPant", error);
    });


  
    $scope.title = "";

    $scope.addNewStyle = (title) => {
        let userLook = {
			title: title,
            uid: $rootScope.user.uid,
            userpantId: $scope.pant.id,
            usershirtId: $scope.shirt.id
            };
        ClothingFactory.postNewLook(userLook).then((response) => {
            $location.url("/style");
        }).catch((error) => {
            console.log("add look error", error);
        });
    };
});
