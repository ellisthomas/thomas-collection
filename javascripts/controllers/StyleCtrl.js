app.controller("StyleCtrl", function($rootScope, $http, $location, $q, $scope, FIREBASE_CONFIG, StyleFactory, ClothingFactory) {
		
	    let getLooks = (userLook) => {
        StyleFactory.getUserLook($rootScope.user.uid).then((lookz) => {
            $scope.looks = lookz;
            console.log("lookz", lookz);
        }).catch((error) => {
            console.log("get look error", error);
        });
    };
    
    $scope.viewUserLooks = () => {
    	$location.url("/style");
    };


    getLooks();
});






