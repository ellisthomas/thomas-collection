app.controller("StyleCtrl", function($rootScope, $http, $location, $q, $scope, FIREBASE_CONFIG, ClothingFactory) {
		$scope.newStyle = [];

	$scope.addNewStyle = (newStyle) => {
		console.log("new style here", newStyle);
		$scope.newStyle = shirt;
		$scope.newStyle.uid = $rootScope.user.uid;
		ClothingFactory.postNewStyle($scope.newStyle).then((response) => {
			$scope.newStyle = {};
			// $location.url("/look");
		}).catch((error) => {
			console.log("add look error", error);
		});
	};
});





// app.controller("NewBoardCtrl", function( BoardFactory){	
// 	$scope.addNewBoard = () =>{
// 		$scope.newBoard.uid = $rootScope.user.uid;
// 		BoardFactory.postNewBoard($scope.newBoard)
// 		.then((response)=>{
// 			$scope.newBoard = {};
// 			$location.url("/userProfile-Board");
// 			console.log("new board response", response);
// 		}).catch((error)=>{
// 			console.log("error in new board response", error);
// 		});
// 	};


//     $scope.deleteBoard = (boardId) => {
//        BoardFactory.deletz(boardId).then(() => {
//             addNewBoard();
//         }).catch((error) => {
//             console.log("deleteItem error", error);
//         });
//     };	
// });

