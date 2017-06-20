app.factory("StyleFactory", function($http, $q, FIREBASE_CONFIG, ClothingFactory) {
	console.log("inside the StyleFactory app.factory");


    let userSelectedShirt = "";
    let userSelectedPant = "";

    let setUserSelectedShirt = (shirtId) => {
        userSelectedShirt = shirtId;
    };
    let setUserSelectedPant = (pantId) => {
        userSelectedPant = pantId;
    };

    let getUserShirt = (shirt) => {
        ClothingFactory.getSingleShirt(shirt.usershirtId).then((shirtData) => {
            console.log("shirtData", shirtData);
            shirt.image = shirtData.image;
        }).catch((error) => {
            console.log("error in getUserShirt", error);
        });
    };

    let getUserSelectedShirt = () => {
        return userSelectedShirt;
    };

    let getUserSelectedPant= () => {
        return userSelectedPant;
    };



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
                    stylez.forEach((style) => {
                        getUserShirt(style);
                        // console.log("style.userpantId", style.userpantId);
                        // console.log("style.usershirtId", style.usershirtId);
                    });
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



    return {getUserLook:getUserLook, deletzStyle:deletzStyle, setUserSelectedShirt:setUserSelectedShirt, setUserSelectedPant:setUserSelectedPant, getUserSelectedShirt:getUserSelectedShirt, getUserSelectedPant:getUserSelectedPant};


});









