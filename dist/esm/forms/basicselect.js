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
import DOMManipulation from '../behaviours/dommanipulation';
import PglyBaseComponent from './base';
import PglyLoadable from './loadable';
var PglyBasicSelectComponent = /** @class */ (function (_super) {
    __extends(PglyBasicSelectComponent, _super);
    function PglyBasicSelectComponent(el) {
        var _this = _super.call(this, el) || this;
        _this._changeEvent = false;
        _this._input = DOMManipulation.findElement(_this._wrapper, 'select');
        _this._loader = new PglyLoadable(_this);
        _this._bind();
        _this._default();
        return _this;
    }
    PglyBasicSelectComponent.prototype.loader = function () {
        return this._loader;
    };
    PglyBasicSelectComponent.prototype.synchronous = function (items) {
        this.loader().prepare();
        this._render(items);
        this.loader().done();
    };
    PglyBasicSelectComponent.prototype.asynchronous = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.loader().prepare();
                        _a = this._render;
                        return [4 /*yield*/, callback()];
                    case 1:
                        _a.apply(this, [_b.sent()]);
                        this.loader().done();
                        return [2 /*return*/];
                }
            });
        });
    };
    PglyBasicSelectComponent.prototype.emptyValue = function () {
        this.field().set('');
    };
    PglyBasicSelectComponent.prototype.cleanItems = function () {
        this._render([]);
    };
    PglyBasicSelectComponent.prototype.reflect = function (select, values) {
        var _this = this;
        this.on('change', function (_a) {
            var value = _a.value;
            select.emptyValue();
            if (values[value]) {
                select.field().set(values[value][0].value, values[value][0].label);
                select.synchronous(values[value]);
                _this.emit('reflectedTo', {
                    origin: _this,
                    destination: select,
                    values: values[value],
                });
            }
        });
    };
    PglyBasicSelectComponent.prototype._render = function (items) {
        var _this = this;
        var placeholder = DOMManipulation.findElement(this._input, '.placeholder');
        while (this._input.firstChild) {
            this._input.removeChild(this._input.firstChild);
        }
        if (placeholder)
            this._input.appendChild(placeholder);
        items.forEach(function (item) {
            var op = document.createElement('option');
            op.value = item.value;
            op.textContent = item.label;
            if (item.selected)
                op.selected = true;
            _this._input.appendChild(op);
        });
    };
    PglyBasicSelectComponent.prototype._bind = function () {
        var _this = this;
        this.on('beforeLoad', function () {
            _this._input.disabled = true;
        });
        this.on('afterLoad', function () {
            _this._input.disabled = false;
        });
        this.on('change', function () {
            if (_this._changeEvent)
                return;
            _this._input.value = _this.field().get();
        });
        this._input.addEventListener('change', function (e) {
            _this._changeEvent = true;
            _this._field.set(e.target.value);
            _this._changeEvent = false;
        });
    };
    PglyBasicSelectComponent.prototype._default = function () {
        this.field().set(this._input.value);
    };
    return PglyBasicSelectComponent;
}(PglyBaseComponent));
export default PglyBasicSelectComponent;
