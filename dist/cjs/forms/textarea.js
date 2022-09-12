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
var PglyTextAreaComponent = /** @class */ (function (_super) {
    __extends(PglyTextAreaComponent, _super);
    function PglyTextAreaComponent(el) {
        var _this = _super.call(this, el) || this;
        _this._keyEvent = false;
        _this._input = dommanipulation_1.default.findElement(_this._wrapper, 'textarea');
        _this._bind();
        _this._default();
        return _this;
    }
    PglyTextAreaComponent.prototype.emptyValue = function () {
        this.field().set('');
    };
    PglyTextAreaComponent.prototype._bind = function () {
        var _this = this;
        this.on('change', function () {
            if (_this._keyEvent)
                return;
            _this._input.value = _this.field().get();
        });
        this._input.addEventListener('keyup', function (e) {
            _this._keyEvent = true;
            _this._field.set(e.target.value);
            _this._keyEvent = false;
        });
    };
    PglyTextAreaComponent.prototype._default = function () {
        this.field().set(this._input.value);
    };
    return PglyTextAreaComponent;
}(base_1.default));
exports.default = PglyTextAreaComponent;
