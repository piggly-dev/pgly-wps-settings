
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios')) :
    typeof define === 'function' && define.amd ? define(['exports', 'axios'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.pglyWps = {}, global.axios));
})(this, (function (exports, axios) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var has = Object.prototype.hasOwnProperty;

    /**
     * Stringify an object for use in a query string.
     *
     * @param {Object} obj - The object.
     * @param {string} prefix - When nesting, the parent key.
     *     keys in `obj` will be stringified as `prefix[key]`.
     * @returns {string}
     */

    var qsStringify = function queryStringify (obj, prefix) {
      var pairs = [];
      for (var key in obj) {
        if (!has.call(obj, key)) {
          continue
        }

        var value = obj[key];
        var enkey = encodeURIComponent(key);
        var pair;
        if (typeof value === 'object') {
          pair = queryStringify(value, prefix ? prefix + '[' + enkey + ']' : enkey);
        } else {
          pair = (prefix ? prefix + '[' + enkey + ']' : enkey) + '=' + encodeURIComponent(value);
        }
        pairs.push(pair);
      }
      return pairs.join('&')
    };

    var DOMManipulation = /** @class */ (function () {
        function DOMManipulation() {
        }
        DOMManipulation.getElement = function (el) {
            if (typeof el === 'string') {
                var wrapper = document.getElementById(el);
                if (!wrapper)
                    throw new Error("Cannot find element id #" + el + " on DOM...");
                return wrapper;
            }
            return el;
        };
        DOMManipulation.findElement = function (wrapper, query) {
            var el = wrapper.querySelector(query);
            if (!query)
                throw new Error("Cannot find element with query " + query + " on wrapper...");
            return el;
        };
        DOMManipulation.createHiddenInput = function (parent, name, value) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            parent.appendChild(input);
            return input;
        };
        return DOMManipulation;
    }());

    var EventHandler = /** @class */ (function () {
        function EventHandler() {
            this.events = {};
        }
        EventHandler.prototype.on = function (id, callback) {
            if (!this.events[id])
                this.events[id] = [];
            this.events[id].push(callback);
        };
        EventHandler.prototype.remove = function (id, callback) {
            if (!this.events[id])
                return;
            this.events[id] = this.events[id].filter(function (cn) { return cn !== callback; });
        };
        EventHandler.prototype.removeAll = function (id) {
            this.events[id] = [];
        };
        EventHandler.prototype.emit = function (id, data) {
            var _this = this;
            if (!this.events[id])
                return;
            this.events[id].forEach(function (cn) {
                cn.call(_this, data);
            });
        };
        return EventHandler;
    }());

    var ValidatorEngine = /** @class */ (function () {
        function ValidatorEngine() {
        }
        ValidatorEngine.apply = function (rules, value, onError, onSuccess) {
            try {
                rules.forEach(function (rule) { return rule.apply(value); });
                onSuccess();
            }
            catch (err) {
                onError(err.message);
            }
        };
        return ValidatorEngine;
    }());

    var PglyFieldError = /** @class */ (function () {
        function PglyFieldError(parent, wrapper) {
            this._state = false;
            this._parent = parent;
            this._comp = {
                wrapper: wrapper,
                message: DOMManipulation.findElement(wrapper, '.pgly-wps--message'),
            };
        }
        PglyFieldError.prototype.apply = function (message) {
            this._state = true;
            this._message = message;
            this._emit('error');
        };
        PglyFieldError.prototype.flush = function () {
            this._state = false;
            this._message = undefined;
            this._emit('errorFlush');
        };
        PglyFieldError.prototype.has = function () {
            return this._state;
        };
        PglyFieldError.prototype.message = function () {
            return this._message;
        };
        PglyFieldError.prototype._render = function () {
            var _a;
            this._comp.wrapper.classList.toggle('pgly-wps--error');
            this._comp.message.textContent = (_a = this._message) !== null && _a !== void 0 ? _a : '';
        };
        PglyFieldError.prototype._emit = function (id) {
            this._render();
            this._parent.emit(id, {
                component: this._parent,
                state: this._state,
                message: this._message,
            });
        };
        return PglyFieldError;
    }());

    var PglyField = /** @class */ (function () {
        function PglyField(parent, name, def) {
            this._parent = parent;
            this._value = def;
            this._name = name;
        }
        PglyField.prototype.name = function () {
            return this._name;
        };
        PglyField.prototype.set = function (value) {
            this._value = value;
            this._parent.emit('change', { component: this._parent, value: this._value });
        };
        PglyField.prototype.get = function () {
            return this._value;
        };
        return PglyField;
    }());

    var PglyBaseComponent = /** @class */ (function (_super) {
        __extends(PglyBaseComponent, _super);
        function PglyBaseComponent(el) {
            var _this = _super.call(this) || this;
            _this._wrapper = DOMManipulation.getElement(el);
            var _a = _this._wrapper.dataset, name = _a.name, _b = _a.def, def = _b === void 0 ? undefined : _b;
            if (!name) {
                console.error('Wrapper has no data-name attribute', _this._wrapper);
                throw new Error('PglyBaseComponent.PglyField must have a data-name attribute in its wrapper...');
            }
            _this._error = new PglyFieldError(_this, _this._wrapper);
            _this._field = new PglyField(_this, name, def);
            return _this;
        }
        PglyBaseComponent.prototype.error = function () {
            return this._error;
        };
        PglyBaseComponent.prototype.field = function () {
            return this._field;
        };
        PglyBaseComponent.prototype.validate = function (rules) {
            ValidatorEngine.apply(rules, this._field.get(), this._error.apply, this._error.flush);
        };
        return PglyBaseComponent;
    }(EventHandler));

    var PglyCheckboxComponent = /** @class */ (function (_super) {
        __extends(PglyCheckboxComponent, _super);
        function PglyCheckboxComponent(el) {
            var _this = _super.call(this, el) || this;
            _this.checkbox = DOMManipulation.findElement(_this._wrapper, '.pgly-wps--checkbox');
            _this.field().set(_this.checkbox.classList.contains('pgly-checked--state'));
            _this._bind();
            return _this;
        }
        PglyCheckboxComponent.prototype._select = function (v) {
            this.checkbox.classList.remove('pgly-checked--state');
            if (v)
                this.checkbox.classList.add('pgly-checked--state');
        };
        PglyCheckboxComponent.prototype._bind = function () {
            var _this = this;
            this.on('change', function (_a) {
                var value = _a.value;
                _this._select(value);
            });
            this.checkbox.addEventListener('click', function () {
                _this.field().set(!_this.field().get());
            });
        };
        return PglyCheckboxComponent;
    }(PglyBaseComponent));

    var PglyInputComponent = /** @class */ (function (_super) {
        __extends(PglyInputComponent, _super);
        function PglyInputComponent(el) {
            var _this = _super.call(this, el) || this;
            DOMManipulation.findElement(_this._wrapper, 'input').addEventListener('keyup', function (e) {
                _this._field.set(e.target.value);
            });
            return _this;
        }
        return PglyInputComponent;
    }(PglyBaseComponent));

    var PglyTextAreaComponent = /** @class */ (function (_super) {
        __extends(PglyTextAreaComponent, _super);
        function PglyTextAreaComponent(el) {
            var _this = _super.call(this, el) || this;
            DOMManipulation.findElement(_this._wrapper, 'textarea').addEventListener('keyup', function (e) {
                _this._field.set(e.target.value);
            });
            return _this;
        }
        return PglyTextAreaComponent;
    }(PglyBaseComponent));

    var PglyBaseFormEngine = /** @class */ (function (_super) {
        __extends(PglyBaseFormEngine, _super);
        function PglyBaseFormEngine(el, options) {
            var _this = _super.call(this) || this;
            _this.loading = false;
            _this.wrapper = DOMManipulation.getElement(el);
            _this.button = DOMManipulation.findElement(_this.wrapper, 'button.pgly-form--submit');
            _this.inputs = [];
            _this.options = options;
            return _this;
        }
        PglyBaseFormEngine.prototype.add = function (input) {
            this.inputs.push(input);
        };
        PglyBaseFormEngine.prototype.auto = function () {
            var _this = this;
            var prefix = ".pgly-form";
            this.wrapper.querySelectorAll(prefix + "--input").forEach(function (el) {
                if (el.classList.contains(prefix + "--text")) {
                    _this.inputs.push(new PglyInputComponent(el));
                    return;
                }
                if (el.classList.contains(prefix + "--textarea")) {
                    _this.inputs.push(new PglyTextAreaComponent(el));
                    return;
                }
                if (el.classList.contains(prefix + "--checkbox")) {
                    _this.inputs.push(new PglyCheckboxComponent(el));
                    return;
                }
            });
        };
        PglyBaseFormEngine.prototype.prepare = function (rules) {
            if (rules === void 0) { rules = {}; }
            var inputs = {};
            var errors = [];
            this.inputs.forEach(function (el) {
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
            return this.loading;
        };
        PglyBaseFormEngine.prototype.loadState = function (loading) {
            this.loading = loading;
            this.button.classList.toggle('pgly-loading--state');
        };
        PglyBaseFormEngine.prototype.bind = function () {
            var _this = this;
            this.wrapper.addEventListener('submit', function (e) {
                e.preventDefault();
                _this.submit(_this.prepare());
            });
            this.button.addEventListener('click', function (e) {
                e.preventDefault();
                _this.submit(_this.prepare());
            });
        };
        return PglyBaseFormEngine;
    }(EventHandler));
    var PglyAsyncFormEngine = /** @class */ (function (_super) {
        __extends(PglyAsyncFormEngine, _super);
        function PglyAsyncFormEngine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PglyAsyncFormEngine.prototype.submit = function (data) {
            var _this = this;
            if (this.loading) {
                return;
            }
            if (data.errors.length !== 0) {
                this.emit('error', { data: data.errors });
                return;
            }
            this.loadState(true);
            data.inputs.xSecurity = this.options.x_security;
            this.emit('prepared', data);
            axios__default["default"]
                .post(this.wrapper.action, qsStringify(data.inputs))
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
    exports.PglyInputComponent = PglyInputComponent;
    exports.PglyTextAreaComponent = PglyTextAreaComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
