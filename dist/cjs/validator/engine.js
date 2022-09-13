"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidatorEngine = /** @class */ (function () {
    function ValidatorEngine() {
    }
    ValidatorEngine.apply = function (rules, value, onError, onSuccess) {
        try {
            rules.forEach(function (validator) { return validator(value); });
            onSuccess();
        }
        catch (err) {
            onError(err.message);
        }
    };
    return ValidatorEngine;
}());
exports.default = ValidatorEngine;
