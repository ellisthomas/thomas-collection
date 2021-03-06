let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    // console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    // console.log("User is not authenticated, reject route promise");
    reject();
  }
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthFactory) {
  firebase.initializeApp(FIREBASE_CONFIG);

  //watch method that fires on change of a route.  3 inputs. 
  //event is a change event
  //currRoute is information about your current route
  //prevRoute is information about the route you came from
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
    // checks to see if there is a current user
    var logged = AuthFactory.isAuthenticated();

    var appTo;

    // to keep error from being thrown on page refresh
    if (currRoute.originalPath) {
      // check if the user is going to the auth page = currRoute.originalPath
      // if user is on auth page then appTo is true
      // if it finds something other than /auth it return a -1 and -1!==-1 so resolves to false
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }

    //if not on /auth page AND not logged in redirect to /auth
    if (!appTo && !logged) {
      event.preventDefault();
      $location.path('/auth');
    }
  });
});

app.config(function($routeProvider) {
    $routeProvider
        .when("/auth", {
            templateUrl: "partials/auth.html",
            controller: "AuthCtrl"
        })
        .when("/home", {
          templateUrl: "partials/home.html",
          controller: "HomeCtrl",
          resolve: {isAuth}
        })
        .when("/men/items", {
            templateUrl: "partials/men-items.html",
            controller: "MenItemsCtrl",
            resolve: {isAuth}
        })
        .when("/women/items", {
            templateUrl: "partials/women-items.html",
            controller: "WomenItemsCtrl",
            resolve: {isAuth}
        })
        .when("/look", {
            templateUrl: "partials/look.html",
            controller: "LookCtrl",
            resolve: {isAuth}
          })
        .when("/lookbook", {
            templateUrl: "partials/lookbook.html",
            controller: "StyleCtrl",
            resolve: {isAuth}
        })
        .when("/style", {
            templateUrl: "partials/style.html",
            controller: "StyleCtrl",
            resolve: {isAuth}
        })
        .when("/style/edit/:id", {
            templateUrl: "partials/look.html",
            controller: "StyleEditCtrl",
            resolve: {isAuth}
        })
        .when("/logout", {
            templateUrl: "partials/auth.html",
            controller: "AuthCtrl",
            resolve: {isAuth}
        })
        .otherwise("/auth");
});