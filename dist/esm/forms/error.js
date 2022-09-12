import DOMManipulation from '@/behaviours/dommanipulation';
var PglyFieldError = /** @class */ (function () {
    function PglyFieldError(parent, wrapper) {
        this._state = false;
        this._parent = parent;
        this._comp = {
            wrapper: wrapper,
            message: DOMManipulation.findElement(wrapper, '.pgly-wps--message'),
        };
    }
    PglyFieldError.prototype.apply = function (message) {
        this._state = true;
        this._message = message;
        this._emit('error');
    };
    PglyFieldError.prototype.flush = function () {
        this._state = false;
        this._message = undefined;
        this._emit('errorFlush');
    };
    PglyFieldError.prototype.has = function () {
        return this._state;
    };
    PglyFieldError.prototype.message = function () {
        return this._message;
    };
    PglyFieldError.prototype._render = function () {
        var _a;
        this._comp.wrapper.classList.remove('pgly-wps--error');
        if (this._state)
            this._comp.wrapper.classList.add('pgly-wps--error');
        this._comp.message.textContent = (_a = this._message) !== null && _a !== void 0 ? _a : '';
    };
    PglyFieldError.prototype._emit = function (id) {
        this._render();
        this._parent.emit(id, {
            component: this._parent,
            state: this._state,
            message: this._message,
        });
    };
    return PglyFieldError;
}());
export default PglyFieldError;
