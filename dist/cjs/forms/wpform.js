"use strict";
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
exports.WPForm = exports.wpMultipleMediaFrame = exports.wpSingleMediaFrame = void 0;
var axios_1 = __importDefault(require("axios"));
var form_1 = require("./form");
var singlemedia_1 = __importDefault(require("./singlemedia"));
var multiplemedia_1 = __importDefault(require("./multiplemedia"));
var toaster_1 = __importDefault(require("../components/toaster"));
exports.wpSingleMediaFrame = singlemedia_1.default.wpFrame;
exports.wpMultipleMediaFrame = multiplemedia_1.default.wpFrame;
var WPForm = /** @class */ (function () {
    function WPForm(formId, toasterId, rules, formatter, group) {
        var _this = this;
        if (group === void 0) { group = false; }
        this._rules = {};
        this._group = false;
        this.actions = {};
        var defFormatter = function (data) { return _this._applyData(data); };
        this._toaster = new toaster_1.default(toasterId);
        this._rules = rules;
        this._form = this._loadForm(formId, formatter !== null && formatter !== void 0 ? formatter : defFormatter, rules);
        this._group = group;
    }
    WPForm.prototype.toaster = function () {
        return this._toaster;
    };
    WPForm.prototype.form = function () {
        return this._form;
    };
    WPForm.prototype.isOnPost = function () {
        var _this = this;
        var _a;
        this._postForm =
            (_a = document.querySelector('form[name="post"]')) !== null && _a !== void 0 ? _a : undefined;
        if (this._postForm && !this._group) {
            this._postForm.addEventListener('submit', function (e) {
                var _a;
                e.preventDefault();
                if (_this._form) {
                    _this._form.submit('POST', _this._form.dataset().action, _this._form.prepare(_this._rules));
                    return;
                }
                (_a = _this._postForm) === null || _a === void 0 ? void 0 : _a.submit();
            });
        }
    };
    WPForm.prototype.inOnMetabox = function (inputName, loadUrl, editUrl, xSecurity, view, rules) {
        var _this = this;
        var group = this._form.get(inputName);
        group.options({
            view: view,
            labels: {
                edit: 'Editar',
                remove: 'Remover',
            },
            rules: rules,
        });
        group.asynchronous(function () { return __awaiter(_this, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post(loadUrl, {
                                id: this._form.dataset().postId,
                                x_security: xSecurity,
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        if (!data.success) {
                            this._onError({ error: data.data });
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, data.data];
                    case 2:
                        err_1 = _a.sent();
                        this._onError({ error: err_1 });
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        var action = function (url, data, onSuccess, onError) {
            return function (_a) {
                var item = _a.item, origin = _a.origin;
                if (origin === 'load') {
                    return;
                }
                console.log(item);
                group.loader().prepare();
                new Promise(function (res, rej) {
                    var inputs = {};
                    Object.keys(item.inputs).forEach(function (key) {
                        inputs[key] = item.inputs[key].value;
                    });
                    axios_1.default
                        .post(url, __assign(__assign({ id: _this._form.dataset().postId, x_security: xSecurity }, data), inputs))
                        .then(function (response) {
                        res(response.data);
                    })
                        .catch(function (err) {
                        rej(err);
                    });
                })
                    .then(function (_data) {
                    var _a;
                    if (!_data.success) {
                        _this._onError({ error: _data });
                        onError(item);
                        return;
                    }
                    _this._onSuccess({ response: _data });
                    onSuccess(item, (_a = data.data.id) !== null && _a !== void 0 ? _a : undefined);
                })
                    .catch(function (err) {
                    _this._onError({ error: err });
                    onError(item);
                })
                    .finally(function () { return group.loader().done(); });
            };
        };
        group.on('loadError', function (_a) {
            var err = _a.err;
            _this._onError({ error: err });
        });
        group.on('added', action(editUrl, { action: 'add' }, function (item, id) {
            group.items().updateId(item.uid, parseInt(id, 10));
        }, function (item) {
            group.items().remove(item.uid);
        }));
        group.on('updated', action(editUrl, { action: 'update' }, function () { return null; }, function () { return null; }));
        group.on('removed', action(editUrl, { action: 'remove' }, function () { return null; }, function () { return null; }));
        group.on('error', this._error.bind(this));
    };
    WPForm.prototype.enableAction = function (action, callback) {
        var _this = this;
        this.form()
            .formEl()
            .addEventListener('click', function (e) {
            if (!e.target)
                return;
            var target = e.target;
            if (target.classList.contains("pgly-form--" + action)) {
                e.preventDefault();
                callback(_this);
            }
        });
        var urlParams = new URLSearchParams(window.location.search);
        var _action = urlParams.get('action');
        if (action === _action) {
            callback(this);
        }
    };
    WPForm.prototype.getUrl = function (base, action) {
        return base + "?action=" + action;
    };
    WPForm.prototype.applyToFinder = function (field, url, xSecurity) {
        var _this = this;
        field.options({
            load: function (query) { return __awaiter(_this, void 0, void 0, function () {
                var data, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1.default.post(url, {
                                    query: query,
                                    x_security: xSecurity,
                                })];
                        case 1:
                            data = (_a.sent()).data;
                            if (data.data.length === 0) {
                                this._toaster.launch('Nenhum resultado encontrado...', {
                                    type: 'danger',
                                    timer: 2000,
                                });
                            }
                            return [2 /*return*/, data.data];
                        case 2:
                            err_2 = _a.sent();
                            this._onError(err_2);
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            }); },
            labels: {
                select: 'Selecionar',
                unselect: 'Remover',
            },
        });
    };
    WPForm.prototype._loadForm = function (id, formatter, rules) {
        var form = new form_1.PglyAsyncFormEngine(id, {
            rules: rules !== null && rules !== void 0 ? rules : {},
        });
        form.formatter(formatter.bind(this));
        form.on('error', this._error.bind(this));
        form.on('requestSuccess', this._onSuccess.bind(this));
        form.on('requestError', this._onError.bind(this));
        form.auto();
        return form;
    };
    WPForm.prototype._applyData = function (data) {
        if (!this._form)
            return data;
        var _data = __assign({}, data);
        if (this._form.dataset().recordId)
            _data.id = this._form.dataset().recordId;
        if (this._form.dataset().postId)
            _data.post_id = this._form.dataset().postId;
        if (this._form.dataset().xSecurity)
            _data.x_security = this._form.dataset().xSecurity;
        return _data;
    };
    WPForm.prototype._error = function () {
        this._toaster.launch('Campos inválidos, verifique antes de continuar', {
            type: 'danger',
            timer: 5000,
        });
    };
    WPForm.prototype._onSuccess = function (_a) {
        var response = _a.response;
        if (!response.success) {
            this._toaster.launch(response.data.message, {
                type: 'danger',
                timer: 5000,
            });
            return;
        }
        this._toaster.launch(response.data.message, {
            type: 'success',
            timer: 5000,
        });
        if (this._postForm)
            this._postForm.submit();
        if (response.data.id)
            this._updateRecordId(response.data.id);
    };
    WPForm.prototype._onError = function (_a) {
        var _b, _c, _d, _e, _f;
        var error = _a.error;
        this._toaster.launch((_f = (_e = (_d = (_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) !== null && _e !== void 0 ? _e : error.message) !== null && _f !== void 0 ? _f : 'Erro de execução do script', {
            type: 'danger',
            timer: 5000,
        });
    };
    WPForm.prototype._getRecordId = function () {
        if (!this._form)
            return undefined;
        return this._form.dataset().recordId;
    };
    WPForm.prototype._updateRecordId = function (id) {
        if (!id || !this._form)
            return;
        this._form.formEl().dataset.recordId = id;
    };
    return WPForm;
}());
exports.WPForm = WPForm;
