app.factory("ClothingFactory", function($q, $http, FIREBASE_CONFIG) {

    let lastSelectedShirt = "";
    let lastSelectedPant = "";

    let setLastSelectedShirt = (shirtId) => {
        lastSelectedShirt = shirtId;
    };

    let setLastSelectedPant = (pantId) => {
        lastSelectedPant = pantId;
    };

    let getLastSelectedShirt = () => {
        return lastSelectedShirt;
    };

    let getLastSelectedPant = () => {
        return lastSelectedPant;
    };


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
                    if (pantCollecetion !== null) {
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

    let getSingleShirt = (id) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/shirts/${id}.json`)
                .then((resultz) => {
                    resolve(resultz);
                }).catch((error) => {
                    reject(error);
                });
        });
    };

    let getSinglePant = (id) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/pants/${id}.json`)
                .then((resultz) => {
                    resolve(resultz);
                }).catch((error) => {
                    reject(error);
                });
        });
    };

    let postNewLook = (newLook) => {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/userShirt.json`,
                JSON.stringify({
                    shirtId: newLook.shirtId,
                    uid: newLook.uid,
                    image: newLook.image
                })
            ).then((resultz) => {
                resolve(resultz);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    return { getShirtsList: getShirtsList, getPantsList: getPantsList, getSingleShirt: getSingleShirt, postNewLook: postNewLook, setLastSelectedShirt: setLastSelectedShirt, getSinglePant: getSinglePant, setLastSelectedPant: setLastSelectedPant, getLastSelectedShirt: getLastSelectedShirt, getLastSelectedPant: getLastSelectedPant };
});
