app.controller("StyleEditCtrl", function($location, $routeParams, $scope, ClothingFactory, StyleFactory) {
   
   let look;

    StyleFactory.getSingleUserLook($routeParams.id).then((results) => {
       $scope.title = results.data.title;
       look = results.data;
       // console.log("getSingleUserLook", results.data);
    }).catch((error) => {

    	console.log("getSingleUserLook", error);
    });


    $scope.editTitle = true;



    $scope.editLook = () => {
        look.title = $scope.title;
    	ClothingFactory.editLook(look).then((results) => {
            console.log("results", results);
    		$location.url("/style");
    	}).catch((error) => {
    		console.log("editLook", error);
    	});
    };



});