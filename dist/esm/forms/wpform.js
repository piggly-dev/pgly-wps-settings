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
import { PglyAsyncFormEngine } from './form';
import PglySingleMediaComponent from './singlemedia';
import PglyMultipleMediaComponent from './multiplemedia';
import PglyToast from '../components/toaster';
export var wpSingleMediaFrame = PglySingleMediaComponent.wpFrame;
export var wpMultipleMediaFrame = PglyMultipleMediaComponent.wpFrame;
var WPForm = /** @class */ (function () {
    function WPForm(formId, toasterId, rules, formatter, group) {
        var _this = this;
        if (group === void 0) { group = false; }
        this._rules = {};
        this._group = false;
        this._actions = {};
        var defFormatter = function (data) { return _this._applyData(data); };
        this._toaster = new PglyToast(toasterId);
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
    WPForm.prototype._loadForm = function (id, formatter, rules) {
        var form = new PglyAsyncFormEngine(id, {
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
export { WPForm };
