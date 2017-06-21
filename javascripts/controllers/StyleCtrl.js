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


    $scope.inputChange = (userLook) => {
        ClothingFactory.editLook(userLook).then(() => {
            console.log("userLook", userLook);
        }).catch((error) => {
            console.log("inputChange error", error);
        });
    };

    $scope.deleteLook = (id) => {

        ClothingFactory.deleteLook(id).then(() => {
                getLooks();
            })
            .catch((error) => {
                console.log("error on deleteLook", error);
            });
    };
});
