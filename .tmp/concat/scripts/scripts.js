'use strict';

/**
 * @ngdoc overview
 * @name angularSimpleValidationApp
 * @description
 * # angularSimpleValidationApp
 *
 * Main module of the application.
 */
angular
  .module('angularSimpleValidationApp', [
    'ngMessages',
    'ngRoute',
    'ngSanitize'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name angularSimpleValidationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularSimpleValidationApp
 */
angular.module('angularSimpleValidationApp')
  .controller('MainCtrl', ["$scope", function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

'use strict';

/**
 * @ngdoc function
 * @name angularSimpleValidationApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularSimpleValidationApp
 */
angular.module('angularSimpleValidationApp')
  .controller('AboutCtrl', ["$scope", function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
