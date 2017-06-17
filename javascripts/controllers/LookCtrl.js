app.controller("LookCtrl", function($rootScope, $http, $location, $q, $scope, FIREBASE_CONFIG, ClothingFactory) {

    let lastSelectedShirt = ClothingFactory.getLastSelectedShirt();
    ClothingFactory.getSingleShirt(lastSelectedShirt).then((results) => {
        // console.log("results in shirts", results);
        $scope.shirt = results;
    }).catch((error) => {
        console.log("error in lastSelectedShirt", error);
    });

    let lastSelectedPant = ClothingFactory.getLastSelectedPant();
    console.log("lastSelectedPant", lastSelectedPant);
    ClothingFactory.getSinglePant(lastSelectedPant).then((results) => {
        // console.log("results in pants", results);
        $scope.pant = results;
    }).catch((error) => {
        console.log("error in lastSelectedPant", error);
    });


    $scope.userLook = [];
  
    $scope.title = "";

    $scope.addNewStyle = (title, userLook) => {
        $scope.title = title;
        $scope.userLook = userLook;
        // $scope.userLook.uid = $rootScope.user.uid;
        ClothingFactory.postNewLook($rootScope.user.uid, $scope.title, $scope.userLook).then((response) => {
            // $scope.newShirt = {};
            // $scope.newPant = {};
            $location.url("/style");
        }).catch((error) => {
            console.log("add look error", error);
        });
    };
});
