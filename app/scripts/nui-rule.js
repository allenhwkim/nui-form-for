/* global nuiPrefix, nuiFormFor */
(function(){
  'use strict';
  var mapping = {
    'required'  : 'ng-required',
    'minlength' : 'ng-minlength',
    'maxlength' : 'ng-maxlength',
    'min'       : 'min',
    'max'       : 'max',
    'pattern'   : 'pattern',
    'type'      : 'type'
  };

  nuiFormFor.directive(nuiPrefix + "Rule", function($compile) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs) {
        var el = element[0];
        var ruleName = attrs.ngRule || attrs.name;
        var elRules = scope.validationRule[attrs[nuiPrefix+"Rule"]];
        elRules.required = elRules.required || "true";
        for (var rule in elRules) {
          var attrKey = mapping[rule], attrVal = elRules[rule];
          if (el.getAttribute(attrKey)) {
            console.log(attrKey, 'is already defined. skipping', el);
          } else {
            if (attrVal) {
              (typeof attrVal == "object") && (attrVal = attrVal.value);
              el.setAttribute(attrKey, attrVal);
            } 
          }
        }
        el.removeAttribute(nuiPrefix +  "-rule"); // IMPORTANT to prevent loop
        $compile(el)(scope);
      } // link
    }; // return
  });

})();
