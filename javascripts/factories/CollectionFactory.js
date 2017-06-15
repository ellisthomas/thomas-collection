app.factory("CollectionFactory", function($http, $q, FIREBASE_CONFIG) {
	
	postNewCollection = (newCollection) => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/userLook.json`, JSON.stringify(newCollection))
			.then((resultz) => {
				resolve(resultz);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};



});



