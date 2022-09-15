var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import DOMManipulation from '../behaviours/dommanipulation';
import EventHandler from '../events/handler';
import ValidatorEngine from '../validator/engine';
import PglyFieldError from './error';
import PglyField from './field';
var PglyBaseComponent = /** @class */ (function (_super) {
    __extends(PglyBaseComponent, _super);
    function PglyBaseComponent(el) {
        var _this = _super.call(this) || this;
        _this._wrapper = DOMManipulation.getElement(el);
        var name = _this._wrapper.dataset.name;
        if (!name) {
            console.error('Wrapper has no data-name attribute', _this._wrapper);
            throw new Error('PglyBaseComponent.PglyField must have a data-name attribute in its wrapper...');
        }
        _this._error = new PglyFieldError(_this, _this._wrapper);
        _this._field = new PglyField(_this, name, undefined);
        return _this;
    }
    PglyBaseComponent.prototype.error = function () {
        return this._error;
    };
    PglyBaseComponent.prototype.field = function () {
        return this._field;
    };
    PglyBaseComponent.prototype.validate = function (rules) {
        var _this = this;
        ValidatorEngine.apply(rules, this._field.get(), function (message) { return _this._error.apply(message); }, function () { return _this._error.flush(); });
    };
    return PglyBaseComponent;
}(EventHandler));
export default PglyBaseComponent;
