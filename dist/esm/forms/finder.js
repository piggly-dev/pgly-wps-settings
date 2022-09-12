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
import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';
import PglyLoadable from './loadable';
var PglyFinderComponent = /** @class */ (function (_super) {
    __extends(PglyFinderComponent, _super);
    function PglyFinderComponent(el) {
        var _this = _super.call(this, el) || this;
        _this._options = {
            labels: {
                select: 'Select',
                unselect: 'Unselect',
            },
        };
        _this._search = {
            wrapper: DOMManipulation.findElement(_this._wrapper, '.pgly-wps--field .pgly-wps--input'),
            input: DOMManipulation.findElement(_this._wrapper, '.pgly-wps--field input'),
            button: DOMManipulation.findElement(_this._wrapper, '.pgly-wps--field button'),
        };
        _this._selected = {
            wrapper: DOMManipulation.findElement(_this._wrapper, '.pgly-wps--field .pgly-wps--selected'),
            label: DOMManipulation.findElement(_this._wrapper, '.pgly-wps--field .pgly-wps--selected .pgly-wps--label'),
            button: DOMManipulation.findElement(_this._wrapper, '.pgly-wps--field .pgly-wps--selected button'),
        };
        _this._items = {
            loader: _this._wrapper.querySelector('.pgly-wps--loader'),
            list: _this._wrapper.querySelector('.pgly-wps--loader .pgly-wps--list'),
        };
        _this._response = [];
        _this._loader = new PglyLoadable(_this);
        _this._bind();
        _this._default();
        return _this;
    }
    PglyFinderComponent.prototype.options = function (options) {
        this._options = __assign(__assign({}, this._options), options);
    };
    PglyFinderComponent.prototype.loader = function () {
        return this._loader;
    };
    PglyFinderComponent.prototype.emptyValue = function () {
        this.field().set('', '');
    };
    PglyFinderComponent.prototype._select = function () {
        var hasValue = this.field().get() !== '';
        this._selected.label.textContent = this.field().label();
        this._search.input.value = '';
        if (hasValue !== undefined) {
            this._flush();
        }
        this._search.wrapper.style.display = hasValue ? 'none' : 'flex';
        this._selected.wrapper.style.display = hasValue ? 'flex' : 'none';
    };
    PglyFinderComponent.prototype._flush = function () {
        while (this._items.list.firstChild) {
            this._items.list.removeChild(this._items.list.firstChild);
        }
    };
    PglyFinderComponent.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._search.input.value.length === 0 ||
                            this.loader().isLoading() ||
                            !this._options.load) {
                            return [2 /*return*/];
                        }
                        this.loader().prepare();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._options.load(this._search.input.value)];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, this.loader().done()];
                    case 4:
                        this._flush();
                        response.forEach(function (item) {
                            _this._items.list.appendChild(_this._render(item));
                        });
                        return [2 /*return*/, this.loader().done()];
                }
            });
        });
    };
    PglyFinderComponent.prototype._bind = function () {
        var _this = this;
        this.on('change', function () {
            _this._select();
        });
        this.on('beforeLoad', function () {
            _this._search.button.classList.add('pgly-loading--state');
            _this._items.loader.classList.add('pgly-loading--state');
        });
        this.on('afterLoad', function () {
            _this._search.button.classList.remove('pgly-loading--state');
            _this._items.loader.classList.remove('pgly-loading--state');
        });
        this._search.button.addEventListener('click', function (e) {
            e.preventDefault();
            _this.load();
        });
        this._selected.button.addEventListener('click', function (e) {
            e.preventDefault();
            _this.currIndex = undefined;
            return _this.field().set('', '');
        });
        this._items.list.addEventListener('click', function (e) {
            var target = e.target;
            e.preventDefault();
            if (target.classList.contains('pgly-wps--button')) {
                var _a = target.dataset, _b = _a.label, label = _b === void 0 ? '' : _b, _c = _a.value, value = _c === void 0 ? '' : _c;
                return _this.field().set(value, label);
            }
        });
    };
    PglyFinderComponent.prototype._render = function (item) {
        var _a, _b;
        var row = document.createElement('div');
        row.className = 'pgly-wps--row';
        var col = document.createElement('div');
        col.className = 'pgly-wps--column pgly-wps-col--12 pgly-wps-is-compact';
        var card = document.createElement('div');
        card.className = 'pgly-wps--card pgly-wps-is-white pgly-wps-is-compact';
        var content = document.createElement('div');
        content.className = 'inside left';
        content.textContent = item.label;
        var actionBar = document.createElement('div');
        actionBar.className = 'pgly-wps--action-bar inside right';
        var button = document.createElement('button');
        button.className = 'pgly-wps--button pgly-wps-is-compact pgly-wps-is-primary';
        button.textContent = (_b = (_a = this._options.labels) === null || _a === void 0 ? void 0 : _a.select) !== null && _b !== void 0 ? _b : 'Select';
        button.dataset.label = item.label;
        button.dataset.value = item.value;
        actionBar.appendChild(button);
        card.appendChild(content);
        card.appendChild(actionBar);
        col.appendChild(card);
        row.appendChild(col);
        return row;
    };
    PglyFinderComponent.prototype._default = function () {
        if (!this._selected.wrapper.dataset.value)
            return;
        this.field().set(this._selected.wrapper.dataset.value, this._selected.wrapper.dataset.label);
    };
    return PglyFinderComponent;
}(PglyBaseComponent));
export default PglyFinderComponent;
