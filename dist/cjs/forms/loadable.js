"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PglyLoadable = /** @class */ (function () {
    function PglyLoadable(parent) {
        this._loading = false;
        this._parent = parent;
    }
    PglyLoadable.prototype.prepare = function () {
        this._parent.emit('beforeLoad', { loading: false });
        this._loading = true;
    };
    PglyLoadable.prototype.done = function () {
        this._loading = false;
        this._parent.emit('afterLoad', { loading: false });
    };
    PglyLoadable.prototype.isLoading = function () {
        return this._loading;
    };
    return PglyLoadable;
}());
exports.default = PglyLoadable;
