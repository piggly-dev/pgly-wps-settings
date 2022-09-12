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
exports.PglyAsyncFormEngine = exports.PglyBaseFormEngine = void 0;
var axios_1 = __importDefault(require("axios"));
var qs_stringify_1 = __importDefault(require("qs-stringify"));
var checkbox_1 = __importDefault(require("./checkbox"));
var input_1 = __importDefault(require("./input"));
var textarea_1 = __importDefault(require("./textarea"));
var handler_1 = __importDefault(require("@/events/handler"));
var dommanipulation_1 = __importDefault(require("@/behaviours/dommanipulation"));
var select_1 = __importDefault(require("./select"));
var finder_1 = __importDefault(require("./finder"));
var singlemedia_1 = __importDefault(require("./singlemedia"));
var multiplemedia_1 = __importDefault(require("./multiplemedia"));
var group_1 = require("./group");
var PglyBaseFormEngine = /** @class */ (function (_super) {
    __extends(PglyBaseFormEngine, _super);
    function PglyBaseFormEngine(el, options) {
        if (options === void 0) { options = {}; }
        var _a;
        var _this = _super.call(this) || this;
        _this._loading = false;
        _this._wrapper = dommanipulation_1.default.getElement(el);
        _this._button = dommanipulation_1.default.findElement(_this._wrapper, 'button.pgly-form--submit');
        _this._inputs = (_a = options.inputs) !== null && _a !== void 0 ? _a : [];
        _this._options = options;
        _this._bind();
        return _this;
    }
    PglyBaseFormEngine.prototype.add = function (input) {
        this._inputs.push(input);
    };
    PglyBaseFormEngine.prototype.get = function (name) {
        return this._inputs.find(function (i) { return i.field().name() === name; });
    };
    PglyBaseFormEngine.prototype.remove = function (name) {
        this._inputs = this._inputs.filter(function (i) { return i.field().name() !== name; });
    };
    PglyBaseFormEngine.prototype.auto = function () {
        var _this = this;
        var prefix = "pgly-form";
        this._wrapper.querySelectorAll("." + prefix + "--input").forEach(function (el) {
            if (el.classList.contains(prefix + "--text")) {
                _this._inputs.push(new input_1.default(el));
                return;
            }
            if (el.classList.contains(prefix + "--textarea")) {
                _this._inputs.push(new textarea_1.default(el));
                return;
            }
            if (el.classList.contains(prefix + "--checkbox")) {
                _this._inputs.push(new checkbox_1.default(el));
                return;
            }
            if (el.classList.contains(prefix + "--eselect")) {
                _this._inputs.push(new select_1.default(el));
                return;
            }
            if (el.classList.contains(prefix + "--finder")) {
                _this._inputs.push(new finder_1.default(el));
                return;
            }
            if (el.classList.contains(prefix + "--single-media")) {
                _this._inputs.push(new singlemedia_1.default(el));
                return;
            }
            if (el.classList.contains(prefix + "--multiple-media")) {
                _this._inputs.push(new multiplemedia_1.default(el));
                return;
            }
            if (el.classList.contains(prefix + "--group")) {
                var comp = new group_1.PglyGroupFormComponent(el);
                comp.auto();
                _this._inputs.push(comp);
                return;
            }
        });
    };
    PglyBaseFormEngine.prototype.prepare = function (rules) {
        if (rules === void 0) { rules = {}; }
        var inputs = {};
        var errors = [];
        this._inputs.forEach(function (el) {
            if (rules[el.field().name()]) {
                el.validate(rules[el.field().name()]);
                if (el.error().has()) {
                    errors.push({
                        name: el.field().name(),
                        value: el.field().get(),
                        message: el.error().message(),
                    });
                }
            }
            inputs[el.field().name()] = el.field().get();
        });
        return { inputs: inputs, errors: errors };
    };
    PglyBaseFormEngine.prototype.isLoading = function () {
        return this._loading;
    };
    PglyBaseFormEngine.prototype.loadState = function (loading) {
        this._loading = loading;
        this._button.classList.toggle('pgly-loading--state');
    };
    PglyBaseFormEngine.prototype._bind = function () {
        var _this = this;
        this._wrapper.addEventListener('submit', function (e) {
            var _a;
            e.preventDefault();
            _this.submit(_this.prepare((_a = _this._options.rules) !== null && _a !== void 0 ? _a : {}));
        });
        this._button.addEventListener('click', function (e) {
            var _a;
            e.preventDefault();
            _this.submit(_this.prepare((_a = _this._options.rules) !== null && _a !== void 0 ? _a : {}));
        });
    };
    return PglyBaseFormEngine;
}(handler_1.default));
exports.PglyBaseFormEngine = PglyBaseFormEngine;
var PglyAsyncFormEngine = /** @class */ (function (_super) {
    __extends(PglyAsyncFormEngine, _super);
    function PglyAsyncFormEngine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PglyAsyncFormEngine.prototype.submit = function (data) {
        var _this = this;
        console.table(data.inputs);
        if (this._loading) {
            return;
        }
        if (data.errors.length !== 0) {
            this.emit('error', { data: data.errors });
            return;
        }
        this.loadState(true);
        data.inputs.xSecurity = this._options.x_security;
        this.emit('prepared', data);
        axios_1.default
            .post(this._wrapper.action, qs_stringify_1.default(data.inputs))
            .then(function (res) {
            _this.emit('submitted', { data: data.inputs, response: res.data });
        })
            .catch(function (err) {
            _this.emit('unsubmitted', { data: data.inputs, error: err });
        })
            .finally(function () {
            _this.loadState(false);
            _this.emit('finished', { data: data.inputs });
        });
    };
    return PglyAsyncFormEngine;
}(PglyBaseFormEngine));
exports.PglyAsyncFormEngine = PglyAsyncFormEngine;
