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
exports.PglyGroupFormComponent = exports.PglyGroupFormItems = void 0;
var dommanipulation_1 = __importDefault(require("../behaviours/dommanipulation"));
var base_1 = __importDefault(require("./base"));
var checkbox_1 = __importDefault(require("./checkbox"));
var input_1 = __importDefault(require("./input"));
var textarea_1 = __importDefault(require("./textarea"));
var singlemedia_1 = __importDefault(require("./singlemedia"));
var multiplemedia_1 = __importDefault(require("./multiplemedia"));
var finder_1 = __importDefault(require("./finder"));
var select_1 = __importDefault(require("./select"));
var uuid_1 = __importDefault(require("../helpers/uuid"));
var loadable_1 = __importDefault(require("./loadable"));
var basicselect_1 = __importDefault(require("./basicselect"));
var PglyGroupFormItems = /** @class */ (function () {
    function PglyGroupFormItems(parent) {
        this._items = [];
        this._parent = parent;
    }
    PglyGroupFormItems.prototype.count = function () {
        return this._items.length;
    };
    PglyGroupFormItems.prototype.add = function (item, eventOrigin) {
        if (eventOrigin === void 0) { eventOrigin = 'add'; }
        this._items.push(item);
        this._parent.emit('added', { item: item, origin: eventOrigin });
    };
    PglyGroupFormItems.prototype.get = function (uid) {
        return this._items.find(function (i) { return i.uid === uid; });
    };
    PglyGroupFormItems.prototype.all = function () {
        return this._items.map(function (item) {
            var inputs = __assign({}, item.inputs);
            Object.keys(inputs).forEach(function (key) {
                inputs[key] = inputs[key].value;
            });
            return inputs;
        });
    };
    PglyGroupFormItems.prototype.updateId = function (uid, id, eventOrigin) {
        if (eventOrigin === void 0) { eventOrigin = 'updateId'; }
        var item = this._items.find(function (i) { return i.uid === uid; });
        if (!item)
            return;
        item.inputs.id = { value: id };
        this._parent.emit('updatedId', { item: item, origin: eventOrigin });
    };
    PglyGroupFormItems.prototype.update = function (item, eventOrigin) {
        var _this = this;
        if (eventOrigin === void 0) { eventOrigin = 'update'; }
        var index = this._items.findIndex(function (i) { return i.uid === item.uid; });
        if (index < 0)
            return;
        Object.keys(item.inputs).forEach(function (key) {
            _this._items[index].inputs[key] = item.inputs[key];
        });
        this._parent.emit('updated', { item: this._items[index], origin: eventOrigin });
    };
    PglyGroupFormItems.prototype.remove = function (uid, eventOrigin) {
        if (eventOrigin === void 0) { eventOrigin = 'remove'; }
        var item = this._items.find(function (i) { return i.uid === uid; });
        if (!item)
            return;
        this._items = this._items.filter(function (i) { return i.uid !== uid; });
        this._parent.emit('removed', { item: item, origin: eventOrigin });
    };
    return PglyGroupFormItems;
}());
exports.PglyGroupFormItems = PglyGroupFormItems;
var PglyGroupFormComponent = /** @class */ (function (_super) {
    __extends(PglyGroupFormComponent, _super);
    function PglyGroupFormComponent(el) {
        var _this = _super.call(this, el) || this;
        _this._inputs = {};
        _this._items = new PglyGroupFormItems(_this);
        _this._loader = new loadable_1.default(_this);
        _this._editing = false;
        _this._current = undefined;
        _this._comps = {
            items: dommanipulation_1.default.findElement(_this._wrapper, '.pgly-wps--items'),
        };
        _this._options = {
            view: {},
            labels: {
                edit: 'Edit',
                remove: 'Remove',
            },
        };
        _this._bind();
        return _this;
    }
    PglyGroupFormComponent.prototype.groupEl = function () {
        return this._wrapper;
    };
    PglyGroupFormComponent.prototype.dataset = function () {
        return this._wrapper.dataset;
    };
    PglyGroupFormComponent.prototype.options = function (options) {
        this._options = __assign(__assign({}, this._options), options);
    };
    PglyGroupFormComponent.prototype.loader = function () {
        return this._loader;
    };
    PglyGroupFormComponent.prototype.items = function () {
        return this._items;
    };
    PglyGroupFormComponent.prototype.add = function (input) {
        this._inputs[input.field().name()] = input;
    };
    PglyGroupFormComponent.prototype.synchronous = function (items) {
        var _this = this;
        this.loader().prepare({ action: 'items' });
        items.forEach(function (item) {
            return _this._items.add({ uid: uuid_1.default.generate(), inputs: item }, 'load');
        });
        this.loader().done({ action: 'items' });
    };
    PglyGroupFormComponent.prototype.asynchronous = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var items, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.loader().prepare({ action: 'items' });
                        return [4 /*yield*/, callback()];
                    case 1:
                        items = _a.sent();
                        items.forEach(function (item) {
                            return _this._items.add({ uid: uuid_1.default.generate(), inputs: item }, 'load');
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.emit('loadError', { error: err_1 });
                        return [3 /*break*/, 3];
                    case 3:
                        this.loader().done({ action: 'items' });
                        return [2 /*return*/];
                }
            });
        });
    };
    PglyGroupFormComponent.prototype.get = function (name) {
        return this._inputs[name];
    };
    PglyGroupFormComponent.prototype.remove = function (name) {
        delete this._inputs[name];
    };
    PglyGroupFormComponent.prototype.auto = function () {
        var _this = this;
        var prefix = "pgly-gform";
        this._wrapper.querySelectorAll("." + prefix + "--input").forEach(function (el) {
            if (el.classList.contains(prefix + "--text")) {
                var component = new input_1.default(el);
                var name_1 = component.field().name();
                _this._inputs[name_1] = component;
                return;
            }
            if (el.classList.contains(prefix + "--textarea")) {
                var component = new textarea_1.default(el);
                var name_2 = component.field().name();
                _this._inputs[name_2] = component;
                return;
            }
            if (el.classList.contains(prefix + "--checkbox")) {
                var component = new checkbox_1.default(el);
                var name_3 = component.field().name();
                _this._inputs[name_3] = component;
                return;
            }
            if (el.classList.contains(prefix + "--select")) {
                var component = new basicselect_1.default(el);
                var name_4 = component.field().name();
                _this._inputs[name_4] = component;
                return;
            }
            if (el.classList.contains(prefix + "--eselect")) {
                var component = new select_1.default(el);
                var name_5 = component.field().name();
                _this._inputs[name_5] = component;
                return;
            }
            if (el.classList.contains(prefix + "--finder")) {
                var component = new finder_1.default(el);
                var name_6 = component.field().name();
                _this._inputs[name_6] = component;
                return;
            }
            if (el.classList.contains(prefix + "--single-media")) {
                var component = new singlemedia_1.default(el);
                var name_7 = component.field().name();
                _this._inputs[name_7] = component;
                return;
            }
            if (el.classList.contains(prefix + "--multiple-media")) {
                var component = new multiplemedia_1.default(el);
                var name_8 = component.field().name();
                _this._inputs[name_8] = component;
            }
        });
    };
    PglyGroupFormComponent.prototype.prepare = function (rules) {
        var _this = this;
        if (rules === void 0) { rules = {}; }
        var inputs = {};
        var errors = [];
        Object.keys(this._inputs).forEach(function (name) {
            var el = _this._inputs[name];
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
            inputs[el.field().name()] = {
                label: el.field().label(),
                value: el.field().get(),
            };
        });
        return { inputs: inputs, errors: errors };
    };
    PglyGroupFormComponent.prototype.emptyValue = function () {
        throw new Error('Not implemented');
    };
    PglyGroupFormComponent.prototype._submit = function (data) {
        if (this._loader.isLoading())
            return;
        if (data.errors.length !== 0) {
            this.emit('error', { data: data.errors });
            return;
        }
        if (!this._editing) {
            this._items.add({ uid: uuid_1.default.generate(), inputs: data.inputs });
        }
        else if (this._current) {
            this._items.update({ uid: this._current, inputs: data.inputs });
            var card = dommanipulation_1.default.findElement(this._comps.items, ".pgly-wps--card[data-uid=\"" + this._current + "\"]");
            if (card)
                card.classList.remove('pgly-wps-is-warning');
        }
        this._editing = false;
        this._current = undefined;
        this._flushInputs();
    };
    PglyGroupFormComponent.prototype._cancel = function () {
        if (this._current) {
            var card = dommanipulation_1.default.findElement(this._comps.items, ".pgly-wps--card[data-uid=\"" + this._current + "\"]");
            if (card)
                card.classList.remove('pgly-wps-is-warning');
        }
        this._editing = false;
        this._current = undefined;
        this._flushInputs();
    };
    PglyGroupFormComponent.prototype._flushInputs = function () {
        var _this = this;
        Object.keys(this._inputs).forEach(function (k) {
            _this._inputs[k].emptyValue();
        });
    };
    PglyGroupFormComponent.prototype._updateInputs = function (uid) {
        var _this = this;
        var _a;
        var item = (_a = this._items.get(uid)) === null || _a === void 0 ? void 0 : _a.inputs;
        if (!item)
            return;
        Object.keys(item).forEach(function (key) {
            var input = _this._inputs[key];
            if (!input)
                return;
            input.field().set(item[key].value, item[key].label);
        });
        var card = dommanipulation_1.default.findElement(this._comps.items, ".pgly-wps--card[data-uid=\"" + uid + "\"]");
        if (card)
            card.classList.add('pgly-wps-is-warning');
    };
    PglyGroupFormComponent.prototype._addCard = function (item) {
        var _this = this;
        var card = document.createElement('div');
        card.className = 'pgly-wps--card pgly-wps-is-white pgly-wps-is-compact';
        card.dataset.uid = item.uid;
        var content = document.createElement('div');
        content.className = 'pgly-wps--content inside left';
        Object.keys(item.inputs).forEach(function (key) {
            var _a;
            if (!_this._options.view[key])
                return;
            var column = document.createElement('div');
            column.className = 'pgly-wps--item';
            var strong = document.createElement('strong');
            strong.textContent = _this._options.view[key];
            var span = document.createElement('span');
            span.textContent = ((_a = item.inputs[key].label) !== null && _a !== void 0 ? _a : item.inputs[key].value).toString();
            column.appendChild(strong);
            column.appendChild(span);
            content.appendChild(column);
        });
        var action = document.createElement('div');
        action.className = 'pgly-wps--action-bar inside right';
        var edit = document.createElement('button');
        edit.className =
            'pgly-wps--button pgly-wps-is-compact pgly-wps-is-primary pgly-wps--edit';
        edit.dataset.uid = item.uid;
        edit.textContent = this._options.labels.edit;
        var remove = document.createElement('button');
        remove.className =
            'pgly-wps--button pgly-wps-is-compact pgly-wps-is-danger pgly-wps--remove';
        remove.dataset.uid = item.uid;
        remove.textContent = this._options.labels.remove;
        action.appendChild(edit);
        action.appendChild(remove);
        card.appendChild(content);
        card.appendChild(action);
        this._comps.items.appendChild(card);
    };
    PglyGroupFormComponent.prototype._updateCard = function (item) {
        var _this = this;
        var card = dommanipulation_1.default.findElement(this._comps.items, ".pgly-wps--card[data-uid=\"" + item.uid + "\"]");
        if (!card)
            return;
        var content = dommanipulation_1.default.findElement(card, '.pgly-wps--content');
        if (!content)
            return;
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }
        Object.keys(item.inputs).forEach(function (key) {
            var _a;
            if (!_this._options.view[key])
                return;
            var column = document.createElement('div');
            column.className = 'pgly-wps--item';
            var strong = document.createElement('strong');
            strong.textContent = _this._options.view[key];
            var span = document.createElement('span');
            span.textContent = ((_a = item.inputs[key].label) !== null && _a !== void 0 ? _a : item.inputs[key].value).toString();
            column.appendChild(strong);
            column.appendChild(span);
            content.appendChild(column);
        });
    };
    PglyGroupFormComponent.prototype._removeCard = function (item) {
        var card = dommanipulation_1.default.findElement(this._comps.items, ".pgly-wps--card[data-uid=\"" + item.uid + "\"]");
        if (card)
            this._comps.items.removeChild(card);
    };
    PglyGroupFormComponent.prototype._bind = function () {
        var _this = this;
        this.on('beforeLoad', function () {
            _this._wrapper.classList.add('pgly-loading--state');
        });
        this.on('afterLoad', function () {
            _this._wrapper.classList.remove('pgly-loading--state');
        });
        this.on('submit', function () { var _a; return _this._submit(_this.prepare((_a = _this._options.rules) !== null && _a !== void 0 ? _a : {})); });
        this.on('cancel', function () { return _this._cancel(); });
        this.on('added', function (_a) {
            var item = _a.item;
            _this.field().set(_this._items.all());
            _this._addCard(item);
        });
        this.on('updated', function (_a) {
            var item = _a.item;
            _this.field().set(_this._items.all());
            _this._updateCard(item);
        });
        this.on('updatedId', function (_a) {
            var item = _a.item;
            _this.field().set(_this._items.all());
            _this._updateCard(item);
        });
        this.on('removed', function (_a) {
            var item = _a.item;
            _this.field().set(_this._items.all());
            _this._removeCard(item);
        });
        this._comps.items.addEventListener('click', function (e) {
            var target = e.target;
            if (!target.dataset.uid || _this._loader.isLoading())
                return;
            e.preventDefault();
            if (target.classList.contains('pgly-wps--edit')) {
                if (_this._editing)
                    return;
                _this._editing = true;
                _this._current = target.dataset.uid;
                _this._updateInputs(_this._current);
                return;
            }
            if (target.classList.contains('pgly-wps--remove')) {
                if (_this._editing)
                    return;
                _this._items.remove(target.dataset.uid);
            }
        });
        dommanipulation_1.default.findElement(this._wrapper, 'button.pgly-gform--submit').addEventListener('click', function (e) {
            e.preventDefault();
            _this.emit('submit', {});
        });
        dommanipulation_1.default.findElement(this._wrapper, 'button.pgly-gform--cancel').addEventListener('click', function (e) {
            e.preventDefault();
            _this.emit('cancel', {});
        });
    };
    PglyGroupFormComponent.prototype._default = function () {
        this.field().set([]);
    };
    return PglyGroupFormComponent;
}(base_1.default));
exports.PglyGroupFormComponent = PglyGroupFormComponent;
