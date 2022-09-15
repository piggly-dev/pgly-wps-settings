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
import DOMManipulation from '../behaviours/dommanipulation';
var PglyToast = /** @class */ (function () {
    function PglyToast(el) {
        this._container = DOMManipulation.getElement(el);
    }
    PglyToast.prototype.launch = function (message, options) {
        var _this = this;
        var op = __assign({ timer: 2000, type: 'regular', light: false }, options);
        var toast = document.createElement('div');
        toast.classList.add('pgly-wps--toast', "pgly-wps-is-" + op.type);
        if (op.light) {
            toast.classList.add("pgly-wps-is-light");
        }
        var del = document.createElement('button');
        del.classList.add('pgly-wps--delete');
        var msg = document.createElement('div');
        msg.textContent = message;
        toast.appendChild(del);
        toast.appendChild(msg);
        this._container.appendChild(toast);
        var removed = false;
        setTimeout(function () {
            if (!removed)
                _this._container.removeChild(toast);
        }, op.timer);
        del.addEventListener('click', function () {
            _this._container.removeChild(toast);
            removed = true;
        });
    };
    return PglyToast;
}());
export default PglyToast;
