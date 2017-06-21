app.factory("StyleFactory", function($http, $q, FIREBASE_CONFIG, ClothingFactory) {
	

    let userSelectedShirt = "";
    let userSelectedPant = "";

    let setUserSelectedShirt = (shirtId) => {
        userSelectedShirt = shirtId;
    };
    let setUserSelectedPant = (pantId) => {
        userSelectedPant = pantId;
    };

    let getUserShirt = (style) => {
        ClothingFactory.getSingleShirt(style.usershirtId).then((shirtData) => {
            // console.log("shirtData", shirtData);
            style.shirtimage = shirtData.image;
        }).catch((error) => {
            console.log("error in getUserShirt", error);
        });
    };

    let getUserPant = (style) => {
        ClothingFactory.getSinglePant(style.userpantId).then((pantData) => {
            // console.log("pantData", pantData);
            style.pantimage = pantData.image;
        }).catch((error) => {
            console.log("error in getUserPant", error);
        });
    };

    let getUserSelectedShirt = () => {
        return userSelectedShirt;
    };

    let getUserSelectedPant= () => {
        return userSelectedPant;
    };



    let getUserLook = (userId) => {
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
                    // console.log("stylez", stylez);
                    stylez.forEach((style) => {
                        getUserShirt(style);
                        getUserPant(style);
                        // console.log("style.userpantId", style.userpantId);
                        // console.log("style.usershirtId", style.usershirtId);
                    });
                    resolve(stylez);
                }).catch((error) => {
                    console.log("error in getUserLook", error);
                });
        });
    };

    let getSingleUserLook = (id) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/userLook/${id}.json`)
            .then((resultz) => {
                resultz.data.id = id;
                console.log("resultz", resultz);
                resolve(resultz.data);
            }).catch((error) => {
            reject(error);
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



    return {getUserLook:getUserLook, getUserPant:getUserPant, getUserShirt:getUserShirt, deletzStyle:deletzStyle, setUserSelectedShirt:setUserSelectedShirt, setUserSelectedPant:setUserSelectedPant, getUserSelectedShirt:getUserSelectedShirt, getUserSelectedPant:getUserSelectedPant, getSingleUserLook:getSingleUserLook};


});









