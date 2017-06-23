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
            style.shirtimage = shirtData.image;
        }).catch((error) => {
            console.log("error in getUserShirt", error);
        });
    };

    let getUserPant = (style) => {
        ClothingFactory.getSinglePant(style.userpantId).then((pantData) => {
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
                    stylez.forEach((style) => {
                        getUserShirt(style);
                        getUserPant(style);
                    });
                    resolve(stylez);
                }).catch((error) => {
                    console.log("error in getUserLook", error);
                });
        });
    };

  let displayUserLooks = (userId) => {
    let outfitz = [];
    return $q((resolve, reject)=>{
      $http.get(`${FIREBASE_CONFIG.databaseURL}/userLook.json`)
    .then((resultz)=>{
      let outfitCollection = resultz.data;
      console.log("resultz.data", resultz.data);
        if (outfitCollection !== null) {
          Object.keys(outfitCollection).forEach((key) =>{
            outfitCollection[key].id=key;
            outfitz.push(outfitCollection[key]);
          });
        }
        outfitz.forEach((outfit) => {
            getUserShirt(outfit);
            getUserPant(outfit);
        });
      resolve(outfitz);
    }).catch((error)=>{
      console.log("error in viewoutfit", error);
    });
  });
};

    
    let getSingleUserLook = (id) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/userLook/${id}.json`)
            .then((resultz) => {
                resultz.data.id = id;
                resolve(resultz.data);
            }).catch((error) => {
            reject(error);
            });
        });
    };




    return {getUserLook:getUserLook, getUserPant:getUserPant, getUserShirt:getUserShirt, setUserSelectedShirt:setUserSelectedShirt, setUserSelectedPant:setUserSelectedPant, getUserSelectedShirt:getUserSelectedShirt, getUserSelectedPant:getUserSelectedPant, getSingleUserLook:getSingleUserLook, displayUserLooks:displayUserLooks};


});









