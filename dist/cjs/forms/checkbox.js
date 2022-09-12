"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dommanipulation_1 = __importDefault(require("@/behaviours/dommanipulation"));
var base_1 = __importDefault(require("./base"));
var PglyCheckboxComponent = /** @class */ (function (_super) {
    __extends(PglyCheckboxComponent, _super);
    function PglyCheckboxComponent(el) {
        var _this = _super.call(this, el) || this;
        _this._checkbox = dommanipulation_1.default.findElement(_this._wrapper, '.pgly-wps--checkbox');
        _this._bind();
        _this._default();
        return _this;
    }
    PglyCheckboxComponent.prototype.emptyValue = function () {
        this.field().set(false);
    };
    PglyCheckboxComponent.prototype._select = function (v) {
        this._checkbox.classList.remove('pgly-checked--state');
        if (v)
            this._checkbox.classList.add('pgly-checked--state');
    };
    PglyCheckboxComponent.prototype._bind = function () {
        var _this = this;
        this.on('change', function (_a) {
            var value = _a.value;
            _this._select(value);
        });
        this._checkbox.addEventListener('click', function () {
            _this.field().set(!_this.field().get());
        });
    };
    PglyCheckboxComponent.prototype._default = function () {
        this.field().set(this._checkbox.dataset.value === 'true');
    };
    return PglyCheckboxComponent;
}(base_1.default));
exports.default = PglyCheckboxComponent;
