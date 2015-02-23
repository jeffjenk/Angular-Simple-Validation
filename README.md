# Angular-Simple-Validation
Simple form validation for AngularJS using ngMessages. Works with Bootstrap and Angular UI Select. Also supports custom validation methods.

# About
This is a simple angular directive that allows you to easily add ngMessages validation to basic form inputs. 

# Getting set up (Manual right now but Bower package coming soon)
[AngularJS](https://github.com/angular/angular) is required of course. Since the directive leverages ngMessages [you need to install that too](https://github.com/angular/bower-angular-messages). To use Angular-Simple-Validation add the directive (js/angular-simple-validation.js) and the stylesheet (css/angular-simple-validation.css) to your project and reference them in your index.html

```html
<script src="/path-to-directives/angular-simple-validation.js"></script>
<link rel="stylesheet" href="/path-to-css/angular-simple-validation.css">
```

Rename the module in the directive (angular-simple-validation.js) to match your app:
```Javascript
'use strict';
angular.module('AppName') //rename to your app module name in your app.js
  .directive('simpleValidation', function ($parse) {
  ...
```

Now you should be good to go.

# Basic usage

To add basic validation to an input you need to do 3 things:

1. Make sure to specify a model for your field as this is how we get access to those useful ngMessages: 
⋅⋅⋅```
⋅⋅⋅<input name="validation-example" ng-model="validate-me" />
⋅⋅⋅```

2. Add the attribute `simple-validation` to the field you would like to validate: 
⋅⋅⋅```
⋅⋅⋅<input name="validation-example" simple-validation simple-validation />
⋅⋅⋅```

3. Add input attributes to define what sort of vlaidtion you would like to perform. Specifying `reqiured` will fire if the field is empty. Specifying type such as `number` or email will validate on type. Adding a `maxlength` or `minlength` will validate on character length:
⋅⋅⋅```
⋅⋅⋅<input name="validation-example" ng-model="validate-me" simple-validation type="email" required />
⋅⋅⋅```

This field will now validate on blur.

# Advanced usage
## Custom validation methods
You can pass a custom method to the directive from your controller with relative ease. The directive expects an array of objects with a key and a value. For example if I wanted to validate a number as even I could define the following function in my controller:
```
$scope.checkIfEven = function (value) {
  var response = [{
    key: 'even', //you can call the key anything just watch out for existing keys such as required, email, etc...
    value: true
  }]; // set value to true so validation will be cleared once satisfied
  if (value % 2 !== 0) {
    response = [{
      key: 'even',
      value: false
    }]; // set value to false to trigger validation
  }
  return response;
};
```

Then you can pass the method to the directive using the `custom-validation` attribute:
```
<input name="validation-example" type="number" ng-model="validate-me" simple-validation  custom-validation="checkIfEven(value)" />
``` 

## Custom messages

You can add custom messages for existing validation messages such as`required` or custom validation messages such as the `even` example above by matching the validation `key` and appending it with `-message` and adding it as an attribute to the field. For example you can override the `required` message like this:
```
<input name="validation-example" ng-model="validate-me" simple-validation type="email" required required-message="This is a custom required message." />
```

or for our even example above:
```
<input name="validation-example" type="number" ng-model="validate-me" simple-validation  custom-validation="checkIfEven(value)" even-message="The number must be even." />
``` 

# Coming soon
I just wanted to get the basic code up quick. I will be creating a Bower package and example page very soon.