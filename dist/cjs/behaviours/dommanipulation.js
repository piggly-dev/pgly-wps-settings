"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOMManipulation = /** @class */ (function () {
    function DOMManipulation() {
    }
    DOMManipulation.getElement = function (el) {
        if (typeof el === 'string') {
            var wrapper = document.getElementById(el);
            if (!wrapper)
                throw new Error("Cannot find element id #" + el + " on DOM...");
            return wrapper;
        }
        return el;
    };
    DOMManipulation.findElement = function (wrapper, query) {
        var el = wrapper.querySelector(query);
        if (!query)
            throw new Error("Cannot find element with query " + query + " on wrapper...");
        return el;
    };
    DOMManipulation.createHiddenInput = function (parent, name, value) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        parent.appendChild(input);
        return input;
    };
    return DOMManipulation;
}());
exports.default = DOMManipulation;
