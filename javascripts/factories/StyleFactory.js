app.factory("StyleFactory", function($http, $q, FIREBASE_CONFIG) {
	console.log("inside the StyleFactory app.factory");

    let displayUserStyle = (userId) => {
        let stylez = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/userLook.json?orderBy="uid"&equalTo="${userId}"`)
                .then((fbItems) => {
                    let styleCollection = fbItems.data;
                    if (styleCollection !== null) {
                        Object.keys(styleCollection).forEach((key) => {
                            styleCollection[key].id = key;
                            stylez.push(boardsCollection[key]);
                        });
                    }
                    resolve(stylez);
                }).catch((error) => {
                    console.log("error in displayUserStyle", error);
                });

        });
    };

    let postNewStyle = (newStyle) => {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/userLook.json`, JSON.stringify(newStyle))
                .then((resultz) => {
                    resolve(resultz);
                    console.log("newStyleResults", newStyleResults);
                }).catch((error) => {
                    reject("postNewStyle error", error);
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



    return {displayUserStyle:displayUserStyle, postNewStyle:postNewStyle, deletzStyle:deletzStyle};


});









