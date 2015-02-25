'use strict';

/**
 * @ngdoc function
 * @name angularSimpleValidationApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularSimpleValidationApp
 */
angular.module('angularSimpleValidationApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
