app.controller("StyleCtrl", function($rootScope, $http, $location, $q, $scope, FIREBASE_CONFIG, StyleFactory, ClothingFactory) {

    let getLooks = (userLook) => {
        StyleFactory.getUserLook($rootScope.user.uid).then((lookz) => {
            $scope.looks = lookz;
            // console.log("lookz", lookz);
        }).catch((error) => {
            console.log("get look error", error);
        });
    };


    $scope.viewUserLooks = () => {
        $location.url("/style");
    };


    getLooks();



    $scope.deleteLook = (id) => {

        ClothingFactory.deleteLook(id).then(() => {
                getLooks();
            })
            .catch((error) => {
                console.log("error on deleteLook", error);
            });
    };

///////// Getting data is not defined inside catch

    $scope.outfits = [];

    let getAllLooks = (userLook) => {
        StyleFactory.displayUserLooks($rootScope.user.uid).then((outfitz) => {
                $scope.outfits = outfitz;
                console.log("results $scope.outfits", $scope.outfits);
            }).catch((error) => {
                console.log("error", error);
            });
    };
    getAllLooks();
});


