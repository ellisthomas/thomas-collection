app.factory("ClothingFactory", function($q, $http, FIREBASE_CONFIG) {
	let getShirtsList = (userId) => {
        let shirtz = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/shirts.json`)
                .then((fbItems) => {
                    let shirtCollection = fbItems.data;
                    if (shirtCollection !== null) {
                        Object.keys(shirtCollection).forEach((key) => {
                            shirtCollection[key].id = key;
                            shirtz.push(shirtCollection[key]);
                        });
                    }
                    resolve(shirtz);
                }).catch((error) => {
                    reject(error);
            });
        });
    };

    let getPantsList = (userId) => {
        let pantz = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/pants.json`)
            .then((fbItems) => {
                let pantCollecetion = fbItems.data;
                if(pantCollecetion !== null) {
                    Object.keys(pantCollecetion).forEach((key) => {
                        pantCollecetion[key].id = key;
                        pantz.push(pantCollecetion[key]);
                    });
                }
                resolve(pantz);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    let postNewLook = (newLook) => {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/shirts/.json`, JSON.stringify(newLook))
            .then((resultz) => {
                resolve(resultz);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    return {getShirtsList:getShirtsList, getPantsList:getPantsList, postNewLook:postNewLook};
});

