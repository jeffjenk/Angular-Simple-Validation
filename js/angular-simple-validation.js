(function () {
  'use strict';

  angular.module('AppName').directive('simpleValidation', simpleValidation)
  simpleValidation.$inject = ['$parse', '$timeout'];
  function simpleValidation($parse, $timeout) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ngModel) {
        var validateOnBlur = attrs.validateOnBlur || 'true',
          validateOnFormSubmit = attrs.validateOnFormSubmit || 'true',
          validated = false,
          uniqueSelectorId = attrs.id || '',
          errorMessageSelector = (attrs.id) ? '.form-validation-field.' + attrs.id : '.form-validation-field',
          errorContainer = angular.element('<div class="form-validation-field ' + uniqueSelectorId + '"></div>');

        element.after(errorContainer);

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
            case 'unique':
              return 'This field id already in use.';
            case 'custom':
              return 'This field has custom validation requirements.';
            default:
              return 'A validation error occurred: ' + key;
          }
        };

        var displayErrors = function () {
          angular.forEach(ngModal.$error, function (error, key) {
            var attrKey = 'message' + key.charAt(0).toUpperCase() + key.slice(1);
            var validationMessage = attrs[attrKey] || getValidationMessage(key);

            element.addClass('has-error');
            element.parent().children('.select2-container').addClass('has-error');
            var messageContainer = angular.element('<div class="label label-danger">' + validationMessage + '</div>');
            element.parent().children(errorMessageSelector).html(messageContainer);
          });
        };

        var clearValidation = function (element) {
          element.removeClass('has-error');
          element.parent().children('.select2-container').removeClass('has-error');
          element.parent().children(errorMessageSelector).html('');
        };

        var setValidationClass = function (element) {
          validated = true;
          clearValidation(element);
          if (attrs.validate != '') {
            var expressionHandler = $parse(attrs.validate);
            var custom = expressionHandler(scope, {
              value: ngModel.$viewValue || ''
            });

            custom.then(function (customValue) {
              ngModel.$setValidity("custom", !customValue);
            });

            displayErrors(element);
          }
        };

        element.bind('focus', function (event) {
          scope.$apply(function () {
            clearValidation(element);
          });
        });

        element.bind('select2-focus', function () {
          scope.$apply(function () {
            clearValidation(element);
          });
        });

        element.bind('blur', function (event) {
          scope.$apply(function () {
            if (validateOnBlur != 'false') {
              scope.$apply(function () {
                setValidationClass(element);
              });
            }
            ;
          });
        });

        element.on('select2-blur select2-selecting select2-removing', function () {
          $timeout(function () {
            scope.$apply(function () {
              if (validateOnBlur != 'false') {
                setValidationClass(element);
              }
            });
          });
        });

        scope.$on('force-validate', function (event, args) {
          $timeout(function () {
            scope.$apply(function () {
              if (validateOnFormSubmit != 'false') {
                var validationTarget = (args) ? args[0] : {};

                if (validationTarget.fieldName === element.context.name && validationTarget.formName === element.context.form.name) {
                  setValidationClass(element);
                } else if (validationTarget.formName === element.context.form.name && (!validationTarget.fieldName || validationTarget.fieldName === '')) {
                  setValidationClass(element);
                } else if ((!validationTarget.formName || validationTarget.formName === '') && (!validationTarget.fieldName || validationTarget.fieldName === '')) {
                  setValidationClass(element);
                }
              }
            });
          });
        });

        scope.$on('clear-validation', function (event, args) {
          $timeout(function () {
            scope.$apply(function () {
              if (validateOnFormSubmit != 'false') {
                var validationTarget = (args) ? args[0] : {};

                if (validationTarget.fieldName === element.context.name && validationTarget.formName === element.context.form.name) {
                  clearValidation(element);
                } else if (validationTarget.formName === element.context.form.name && (!validationTarget.fieldName || validationTarget.fieldName === '')) {
                  clearValidation(element);
                } else if ((!validationTarget.formName || validationTarget.formName === '') && (!validationTarget.fieldName || validationTarget.fieldName === '')) {
                  clearValidation(element);
                }
              }
            });
          });
        });

        //var performValidation = function (key, value) {
        //  if (value === true) {
        //    var attrKey = 'message' + key.charAt(0).toUpperCase() + key.slice(1);
        //    var validationMessage = attrs[attrKey] || getValidationMessage(key);
        //    element.parent().addClass('has-error');
        //    element.parent().children('.simple-validation-message').html(validationMessage);
        //  }
        //};
        //
        //var checkValidation = function () {
        //  element.parent().removeClass('has-error');
        //  element.parent().children('.simple-validation-message').html('');
        //
        //  var expressionHandler = $parse(attrs.customValidation);
        //  var custom = expressionHandler(scope, {
        //    value: ngModel.$viewValue || ''
        //  });
        //
        //  angular.forEach(custom, function (customValue) {
        //    ngModel.$setValidity(customValue.key, customValue.value);
        //  });
        //
        //  for (var key in ngModel.$error) {
        //    var value = ngModel.$error[key];
        //    performValidation(key, value);
        //  }
        //};
        //
        //element.querySelectorAll('input.ui-select-offscreen').on('focus', function() {
        //  checkValidation();
        //});
        //
        //element.bind('blur', function() {
        //  checkValidation();
        //});
      }
    }
  };
})();