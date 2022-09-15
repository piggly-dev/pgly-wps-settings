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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dommanipulation_1 = __importDefault(require("../behaviours/dommanipulation"));
var base_1 = __importDefault(require("./base"));
var loadable_1 = __importDefault(require("./loadable"));
var PglySelectComponent = /** @class */ (function (_super) {
    __extends(PglySelectComponent, _super);
    function PglySelectComponent(el) {
        var _this = _super.call(this, el) || this;
        _this.items = [];
        _this._comps = {
            selection: dommanipulation_1.default.findElement(_this._wrapper, '.selected'),
            value: dommanipulation_1.default.findElement(_this._wrapper, '.selected span'),
            items: dommanipulation_1.default.findElement(_this._wrapper, '.items'),
            container: dommanipulation_1.default.findElement(_this._wrapper, '.items .container'),
        };
        _this._loader = new loadable_1.default(_this);
        _this._options = {
            labels: {
                placeholder: 'Select an option...',
            },
        };
        _this._bind();
        _this._default();
        return _this;
    }
    PglySelectComponent.prototype.options = function (options) {
        this._options = __assign(__assign({}, this._options), options);
    };
    PglySelectComponent.prototype.loader = function () {
        return this._loader;
    };
    PglySelectComponent.prototype.synchronous = function (items) {
        this.loader().prepare();
        this.items = items;
        this._render();
        this.loader().done();
    };
    PglySelectComponent.prototype.asynchronous = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.loader().prepare();
                        _a = this;
                        return [4 /*yield*/, callback()];
                    case 1:
                        _a.items = _b.sent();
                        this._render();
                        this.loader().done();
                        return [2 /*return*/];
                }
            });
        });
    };
    PglySelectComponent.prototype.emptyValue = function () {
        this.field().set('', '');
    };
    PglySelectComponent.prototype._flush = function () {
        var _this = this;
        this._comps.items.querySelectorAll('.item').forEach(function (el) {
            el.classList.remove('current');
            if (el.dataset.value === _this.field().get())
                el.classList.add('current');
        });
    };
    PglySelectComponent.prototype._toggle = function () {
        this._comps.selection.classList.toggle('open');
        this._comps.items.classList.toggle('hidden');
    };
    PglySelectComponent.prototype._close = function () {
        this._comps.selection.classList.remove('open');
        this._comps.items.classList.add('hidden');
    };
    PglySelectComponent.prototype._renderSelection = function () {
        var _a, _b;
        if (this.field().get() !== '') {
            this._comps.selection.classList.remove('empty');
        }
        else {
            this._comps.selection.classList.add('empty');
        }
        this._comps.value.textContent =
            (_b = (_a = this.field().label()) !== null && _a !== void 0 ? _a : this._options.labels.placeholder) !== null && _b !== void 0 ? _b : '';
        this._flush();
        this._close();
    };
    PglySelectComponent.prototype._render = function () {
        var _this = this;
        while (this._comps.container.firstChild) {
            this._comps.container.removeChild(this._comps.container.firstChild);
        }
        this.items.forEach(function (item) {
            var _a;
            var el = document.createElement('div');
            el.className = 'item';
            el.dataset.value = item.value;
            el.textContent = item.label;
            if (item.selected) {
                el.className += ' current';
                _this.field().set(item.value, item.label);
                _this._comps.selection.classList.remove('empty');
                _this._comps.value.textContent = (_a = _this.field().label()) !== null && _a !== void 0 ? _a : '';
            }
            _this._comps.container.appendChild(el);
        });
    };
    PglySelectComponent.prototype._bind = function () {
        var _this = this;
        this.on('beforeLoad', function () {
            _this._comps.selection.classList.add('pgly-loading--state');
        });
        this.on('afterLoad', function () {
            _this._comps.selection.classList.remove('pgly-loading--state');
        });
        this.on('change', function () {
            _this._renderSelection();
        });
        this._comps.selection.addEventListener('click', function () {
            if (_this.loader().isLoading())
                return;
            _this._toggle();
        });
        this._comps.items.addEventListener('click', function (e) {
            var _a, _b;
            if (_this.loader().isLoading())
                return;
            var target = e.target;
            if (!target)
                return;
            e.preventDefault();
            if (target.classList.contains('item') ||
                target.classList.contains('clickable')) {
                var value = (_a = target.dataset.value) !== null && _a !== void 0 ? _a : '';
                var label = (_b = target.textContent) !== null && _b !== void 0 ? _b : '';
                _this.field().set(value, label);
            }
        });
    };
    PglySelectComponent.prototype._default = function () {
        if (!this._comps.selection.dataset.value)
            return;
        this.field().set(this._comps.selection.dataset.value, this._comps.selection.dataset.label);
    };
    return PglySelectComponent;
}(base_1.default));
exports.default = PglySelectComponent;
