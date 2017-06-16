app.controller("HomeCtrl", function($rootScope, $location, $scope, ClothingFactory) {
    $scope.shirts = [];
    $scope.pants = [];
    $scope.outfit = {
    	shirt: false,
    	pants: false
    };

    let getShirts = () => {
        ClothingFactory.getShirtsList($rootScope.user.uid).then((shirtz) => {
            $scope.shirts = shirtz;
            // console.log("shirtz", shirtz);
        }).catch((error) => {
            console.log("get shirt error", error);
        });
    };

    getShirts();

    let getPants = () => {
        ClothingFactory.getPantsList($rootScope.user.uid).then((pantz) => {
            $scope.pants = pantz;
            // console.log("pantz", pantz);
        }).catch((error) => {
            console.log("get pants error", error);
        });
    };

    getPants();

    $scope.shirtLook = [];
    $scope.pantLook = [];

    $scope.addShirtLook = (shirt) => {
        ClothingFactory.setLastSelectedShirt(shirt.id);
        $scope.outfit.shirt = true;
    };

    $scope.addPantLook = (pant) => {
        ClothingFactory.setLastSelectedPant(pant.id);
        $scope.outfit.pants = true;
    };

    $scope.viewLookBook = () => {
    	$location.url("/look");
    };

});
