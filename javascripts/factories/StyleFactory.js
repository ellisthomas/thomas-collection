app.factory("StyleFactory", function($http, $q, FIREBASE_CONFIG) {
	console.log("inside the StyleFactory app.factory");

    let getUserLook = (userId) => {
        // console.log("are we here", userId);
        let stylez = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/userLook.json?orderBy="uid"&equalTo="${userId}"`)
                .then((resultz) => {
                    let styleCollection = resultz.data;
                    if (styleCollection !== null) {
                        Object.keys(styleCollection).forEach((key) => {
                            styleCollection[key].id = key;
                            stylez.push(styleCollection[key]);
                        });
                    }
                    console.log("stylez", stylez);
                    resolve(stylez);
                }).catch((error) => {
                    console.log("error in getUserLook", error);
                });

        });
    };

  
    let deletzStyle = (id) => {
            return $q((resolve, reject) => {
                $http.delete(`${FIREBASE_CONFIG.databaseURL}/userLook/${id}.json`)
                    .then((resultz) => {
                        resolve(resultz);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        };



    return {getUserLook:getUserLook, deletzStyle:deletzStyle};


});









