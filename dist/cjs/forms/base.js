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
var handler_1 = __importDefault(require("@/events/handler"));
var engine_1 = __importDefault(require("@/validator/engine"));
var error_1 = __importDefault(require("./error"));
var field_1 = __importDefault(require("./field"));
var PglyBaseComponent = /** @class */ (function (_super) {
    __extends(PglyBaseComponent, _super);
    function PglyBaseComponent(el) {
        var _this = _super.call(this) || this;
        _this._wrapper = dommanipulation_1.default.getElement(el);
        var name = _this._wrapper.dataset.name;
        if (!name) {
            console.error('Wrapper has no data-name attribute', _this._wrapper);
            throw new Error('PglyBaseComponent.PglyField must have a data-name attribute in its wrapper...');
        }
        _this._error = new error_1.default(_this, _this._wrapper);
        _this._field = new field_1.default(_this, name, undefined);
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
        engine_1.default.apply(rules, this._field.get(), function (message) { return _this._error.apply(message); }, function () { return _this._error.flush(); });
    };
    return PglyBaseComponent;
}(handler_1.default));
exports.default = PglyBaseComponent;
