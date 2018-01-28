var blogApp = angular.module('blogApp', ['ui.router', 'ngDialog']);

blogApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
      // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'modules/home/home.html',
            controller: "homeCtrl"
        })

        .state('about', {
            url: '/about',
            templateUrl: 'modules/about/about.html',
            controller: "aboutCtrl"
        })

        .state('post', {
            url: '/post',
            templateUrl: 'modules/post/post.html',
            controller: "postCtrl"
        })

        .state('detail', {
            url: '/detail/:id',
            templateUrl: 'modules/detail/detail.html',
            controller: "detailCtrl"
        })

        .state('contact', {
            url: '/contact',
            templateUrl: 'modules/contact/contact.html',
            controller: "contactCtrl"
        });
        
});

blogApp.directive('paging', function() {
        return {
            restrict: 'E',
            template: '',
            replace: true,
            link: function(scope, element, attrs) {
                scope.$watch('numPages', function(value) {
                    scope.pages = [];
                    for (var i = 1; i <= value; i++) {
                        scope.pages.push(i);
                    }
                    alert(scope.currentPage )
                    if (scope.currentPage > value) {
                        scope.selectPage(value);
                    }
                });
                scope.isActive = function(page) {
                    return scope.currentPage === page;
                };
                scope.selectPage = function(page) {
                    if (!scope.isActive(page)) {
                        scope.currentPage = page;
                        scope.onSelectPage(page);
                    }
                };
                scope.selectPrevious = function() {
                    if (!scope.noPrevious()) {
                        scope.selectPage(scope.currentPage - 1);
                    }
                };
                scope.selectNext = function() {
                    if (!scope.noNext()) {
                        scope.selectPage(scope.currentPage + 1);
                    }
                };
                scope.noPrevious = function() {
                    return scope.currentPage == 1;
                };
                scope.noNext = function() {
                    return scope.currentPage == scope.numPages;
                };

            }
        };
    });


blogApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

blogApp.constant('CONSTANTS', {
    baseUrl: 'http://localhost:3000/'
});

