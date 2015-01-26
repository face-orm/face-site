;(function ($, window, appLang) {
        'use strict';


        var $doc = $(document),
            Modernizr = window.Modernizr;


        $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
        $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
        $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
        $('input, textarea').placeholder();


        $.fn.foundationButtons          ? $doc.foundationButtons() : null;


        $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;


        $.fn.foundationTopBar           ? $doc.foundationTopBar({breakPoint: 940}) : null;


        $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;


        $.fn.foundationTabs             ? $doc.foundationTabs() : null;



        $("#featured").orbit();


        // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
        // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
        // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
        // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
        // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

        // Hide address bar on mobile devices
        if (Modernizr.touch) {
            $(window).load(function () {
                setTimeout(function () {
                    window.scrollTo(0, 1);
                }, 0);
            });
        }



    var app = new FaceS({
        language : appLang, // defined in index.html
        ngApp    : "app"
    });


    var userLanguage = FaceS.detectLanguage();

    // check if the user has already a session : do nothing
    // if the users comes for the fist time we start the session and we redirect it to the good language.
    if(!FaceS.hasSession()){
        FaceS.startSession();
        // if currently we are not in the good language, we redirect (only the first time)
        if(userLanguage !== app.language){
            window.location.replace("/langs/" + userLanguage + "/");
        }
    }


    // configure our routes
    app.angular.config(function($routeProvider, $locationProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : app.getTemplate('pages/home.html'),
                controller  : 'mainController'
            })

            // route for the about page
            .when('/team', {
                templateUrl : app.getTemplate('pages/team.html'),
                controller  : 'teamController'
            })

            .when('/get-started', {
                templateUrl : app.getTemplate('pages/get-started.html'),
                controller  : 'getStartedController'
            });

        $locationProvider.html5Mode(true);
    });

    app.angular.controller('mainController', function($scope, $http) {
        $http.get('https://api.github.com/repos/phalcon/zephir/releases').then(function(result) {
            $scope.latestRelease = result.data[0];
        });
    });

    app.angular.controller('teamController', function($scope) {
    });

    app.angular.controller('getStartedController', function($scope) {
    });



})(jQuery, this, appLang);