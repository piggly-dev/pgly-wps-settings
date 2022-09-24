"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PglyLoadable = /** @class */ (function () {
    function PglyLoadable(parent) {
        this._loading = false;
        this._parent = parent;
    }
    PglyLoadable.prototype.prepare = function (payload) {
        if (payload === void 0) { payload = undefined; }
        this._parent.emit('beforeLoad', { loading: false, payload: payload });
        this._loading = true;
    };
    PglyLoadable.prototype.done = function (payload) {
        if (payload === void 0) { payload = undefined; }
        this._loading = false;
        this._parent.emit('afterLoad', { loading: false, payload: payload });
    };
    PglyLoadable.prototype.isLoading = function () {
        return this._loading;
    };
    return PglyLoadable;
}());
exports.default = PglyLoadable;
