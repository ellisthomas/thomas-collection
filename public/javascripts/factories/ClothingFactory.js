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
        let singleShirtz = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/shirts/${id}.json`)
                .then((resultz) => {
                    let singleShirt = resultz.data;
                    if (singleShirt !== null) {
                        singleShirt.id = id;
                    }
                    resolve(resultz.data);
                }).catch((error) => {
                    reject(error);
                });
        });
    };

    let getSinglePant = (id) => {
        let singlePantz = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/pants/${id}.json`)
                .then((resultz) => {
                    let singlePant = resultz.data;
                    if (singlePant !== null) {
                        singlePant.id = id;
                    }
                    resolve(resultz.data);
                }).catch((error) => {
                    reject(error);
                });
        });
    };

    let editLook = (userLook) => {
        console.log("userLook", userLook);
        return $q((resolve, reject) => {
            $http.put(`${FIREBASE_CONFIG.databaseURL}/userLook/${userLook.id}.json`,
             JSON.stringify(userLook)
           ).then((resultz) => {
                resolve(resultz);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    let postNewLook = (userLook) => {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/userLook.json`,
                JSON.stringify(userLook)
            ).then((resultz) => {
                resolve(resultz);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    let deleteLook = (id) => {
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




    return {getShirtsList: getShirtsList, getPantsList: getPantsList, getSingleShirt: getSingleShirt, postNewLook: postNewLook, setLastSelectedShirt: setLastSelectedShirt, getSinglePant: getSinglePant, setLastSelectedPant: setLastSelectedPant, getLastSelectedShirt: getLastSelectedShirt, getLastSelectedPant: getLastSelectedPant, editLook:editLook, deleteLook:deleteLook};
});
