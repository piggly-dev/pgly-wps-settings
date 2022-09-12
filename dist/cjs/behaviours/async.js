"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var qs = require('qs');
function PglyAsync(options) {
    if (!options.url) {
        throw new Error('`url` is required to async actions.');
    }
    if (!options.x_security) {
        throw new Error('`x_security` is required to async actions.');
    }
    if (!options.container) {
        throw new Error('`container` is required to async actions.');
    }
    options.responseContainer =
        options.responseContainer || options.container + "--response";
    options.debug = options.debug || false;
    this.options = options;
    this._init();
}
PglyAsync.prototype._init = function () {
    var _this = this;
    document
        .querySelectorAll(this.options.container + " .pgly-async--behaviour")
        .forEach(function ($el) {
        var $button = $el;
        $button.dataset.loading = 'false';
        $button.addEventListener('click', function (e) {
            var _a;
            _this._consoleLog('Clicked at async button...');
            e.preventDefault();
            if ($button.dataset.loading === 'true') {
                return;
            }
            // Start loading
            _this._startLoad($button);
            var data = $button.dataset;
            var refresh = data.refresh || false;
            var responseContainer = data.responseContainer || _this.options.responseContainer;
            if (_this.options.form && data.form) {
                _this._consoleLog('Button has form', data.form);
                var form = _this.options.form[data.form] || [];
                var error_1 = false;
                form.forEach(function (i) {
                    var $el = document.getElementById(i.id);
                    var val = $el ? $el.value : '';
                    if (i.required && val.length === 0) {
                        error_1 = true;
                        return;
                    }
                    data[i.name] = val;
                });
                if (error_1) {
                    var _window = window;
                    if (_window.PglyWpsNotification) {
                        new _window.PglyWpsNotification({
                            message: ((_a = _this.options.messages) === null || _a === void 0 ? void 0 : _a.invalid_fields) ||
                                'Invalid fields',
                            type: data.success ? 'success' : 'danger',
                            container: responseContainer,
                            timer: 5000,
                        });
                    }
                    _this._consoleError('Cannot send, invalid fields detected', data.form);
                    _this._stopLoad($button);
                    return;
                }
            }
            data.xSecurity = _this.options.x_security;
            _this._consoleLog('Request body', data);
            axios_1.default
                .post(_this.options.url, qs.stringify(data))
                .then(function (res) {
                var _window = window;
                var data = res.data;
                _this._consoleLog('Success', data);
                if (_window.PglyWpsNotification) {
                    new _window.PglyWpsNotification({
                        message: data.data.message,
                        type: data.success ? 'success' : 'danger',
                        container: responseContainer,
                        timer: 5000,
                    });
                }
                if (refresh) {
                    setTimeout(function () { return document.location.reload(); }, 3000);
                }
            })
                .catch(function (err) {
                var _a;
                var _window = window;
                _this._consoleError('Error', err);
                if (_window.PglyWpsNotification) {
                    new _window.PglyWpsNotification({
                        message: ((_a = _this.options.messages) === null || _a === void 0 ? void 0 : _a.request_error) ||
                            'Something went wrong',
                        type: data.success ? 'success' : 'danger',
                        container: responseContainer,
                        timer: 5000,
                    });
                }
            })
                .finally(function () {
                _this._stopLoad($button);
            });
        });
    });
};
PglyAsync.prototype._consoleLog = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (this.options.debug)
        console.log.apply(console, args);
};
PglyAsync.prototype._consoleError = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (this.options.debug)
        console.error.apply(console, args);
};
PglyAsync.prototype._startLoad = function ($button) {
    $button.classList.add('pgly-loading--state');
    $button.dataset.loading = 'true';
};
PglyAsync.prototype._stopLoad = function ($button) {
    $button.classList.remove('pgly-loading--state');
    $button.dataset.loading = 'false';
};
exports.default = PglyAsync;
