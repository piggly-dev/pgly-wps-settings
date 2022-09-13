"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dommanipulation_1 = __importDefault(require("@/behaviours/dommanipulation"));
var PglyNotification = /** @class */ (function () {
    function PglyNotification(el) {
        this._container = dommanipulation_1.default.getElement(el);
        this._bind();
    }
    PglyNotification.prototype.launch = function (message, options) {
        var _this = this;
        var op = __assign({ timer: 2000, type: 'regular', light: false }, options);
        var notification = document.createElement('div');
        notification.classList.add('pgly-wps--notification', "pgly-wps-is-" + op.type);
        if (op.light) {
            notification.classList.add("pgly-wps-is-light");
        }
        var del = document.createElement('button');
        del.classList.add('pgly-wps--delete');
        var msg = document.createElement('div');
        msg.textContent = message;
        notification.appendChild(del);
        notification.appendChild(msg);
        this._container.appendChild(notification);
        var removed = false;
        setTimeout(function () {
            if (!removed)
                _this._container.removeChild(notification);
        }, op.timer);
        del.addEventListener('click', function () {
            _this._container.removeChild(notification);
            removed = true;
        });
    };
    PglyNotification.prototype._bind = function () {
        document
            .querySelectorAll('.pgly-wps--notification .pgly-wps--delete')
            .forEach(function (el) {
            var _a;
            var notification = el.parentNode;
            var timer = parseInt((_a = notification.dataset.timer) !== null && _a !== void 0 ? _a : '0', 10);
            var removed = false;
            if (timer > 0) {
                setTimeout(function () {
                    var _a;
                    if (!removed)
                        (_a = notification === null || notification === void 0 ? void 0 : notification.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(notification);
                }, timer);
            }
            el.addEventListener('click', function () {
                var _a;
                removed = true;
                (_a = notification === null || notification === void 0 ? void 0 : notification.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(notification);
            });
        });
    };
    return PglyNotification;
}());
exports.default = PglyNotification;
