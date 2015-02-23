'use strict';
angular.module('AppName')
  .directive('simpleValidation', function ($parse) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ngModel) {
        element.parent().append('<div class="simple-validation-message"></div>');

        var getValidationMessage = function (key) {
          switch (key) {
          case 'required':
            return 'This field is required.';
          case 'email':
            return 'Please enter a vaild email address';
          case 'number':
            return 'Please enter a valid number.';
          case 'minlength':
            return 'This field is too short.';
          case 'maxlength':
            return 'This field is too long.';
          default:
            return 'A validation error occurred: ' + key;
          }
        };

        var performValidation = function (key, value) {
          if (value === true) {
            var attrKey = 'message' + key.charAt(0).toUpperCase() + key.slice(1);
            var validationMessage = attrs[attrKey] || getValidationMessage(key);
            element.parent().addClass('has-error');
            element.parent().children('.simple-validation-message').html(validationMessage);
          }
        };

        var checkValidation = function () {
          element.parent().removeClass('has-error');
          element.parent().children('.simple-validation-message').html('');

          var expressionHandler = $parse(attrs.customValidation);
          var custom = expressionHandler(scope, {
            value: ngModel.$viewValue || ''
          });

          angular.forEach(custom, function (customValue) {
            ngModel.$setValidity(customValue.key, customValue.value);
          });

          for (var key in ngModel.$error) {
            var value = ngModel.$error[key];
            performValidation(key, value);
          }
        };

        element.querySelectorAll('input.ui-select-offscreen').on('focus', function() {
          checkValidation();
        });

        element.bind('blur', function() {
          checkValidation();
        });
      }
    };
  });