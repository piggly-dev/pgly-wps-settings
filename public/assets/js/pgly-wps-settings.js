
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

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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

    var DOMManipulation =
    /** @class */
    function () {
      function DOMManipulation() {}

      DOMManipulation.getElement = function (el) {
        if (typeof el === 'string') {
          var wrapper = document.getElementById(el);
          if (!wrapper) throw new Error("Cannot find element id #" + el + " on DOM...");
          return wrapper;
        }

        return el;
      };

      DOMManipulation.findElement = function (wrapper, query) {
        var el = wrapper.querySelector(query);
        if (!query) throw new Error("Cannot find element with query " + query + " on wrapper...");
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
    }();

    var EventHandler =
    /** @class */
    function () {
      function EventHandler() {
        this.events = {};
      }

      EventHandler.prototype.on = function (id, callback) {
        if (!this.events[id]) this.events[id] = [];
        this.events[id].push(callback);
      };

      EventHandler.prototype.remove = function (id, callback) {
        if (!this.events[id]) return;
        this.events[id] = this.events[id].filter(function (cn) {
          return cn !== callback;
        });
      };

      EventHandler.prototype.removeAll = function (id) {
        this.events[id] = [];
      };

      EventHandler.prototype.emit = function (id, data) {
        var _this = this;

        if (!this.events[id]) return;
        this.events[id].forEach(function (cn) {
          cn.call(_this, data);
        });
      };

      return EventHandler;
    }();

    var ValidatorEngine =
    /** @class */
    function () {
      function ValidatorEngine() {}

      ValidatorEngine.apply = function (rules, value, onError, onSuccess) {
        try {
          rules.forEach(function (validator) {
            return validator(value);
          });
          onSuccess();
        } catch (err) {
          onError(err.message);
        }
      };

      return ValidatorEngine;
    }();

    var PglyFieldError =
    /** @class */
    function () {
      function PglyFieldError(parent, wrapper) {
        this._state = false;
        this._parent = parent;
        this._comp = {
          wrapper: wrapper,
          message: DOMManipulation.findElement(wrapper, '.pgly-wps--message')
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

        this._comp.wrapper.classList.remove('pgly-wps--error');

        if (this._state) this._comp.wrapper.classList.add('pgly-wps--error');
        this._comp.message.textContent = (_a = this._message) !== null && _a !== void 0 ? _a : '';
      };

      PglyFieldError.prototype._emit = function (id) {
        this._render();

        this._parent.emit(id, {
          component: this._parent,
          state: this._state,
          message: this._message
        });
      };

      return PglyFieldError;
    }();

    var PglyField =
    /** @class */
    function () {
      function PglyField(parent, name, def) {
        this._parent = parent;
        this._value = def;
        this._name = name;
      }

      PglyField.prototype.name = function () {
        return this._name;
      };

      PglyField.prototype.label = function () {
        return this._label;
      };

      PglyField.prototype.set = function (value, label) {
        this._value = value;
        this._label = label;

        this._parent.emit('change', {
          component: this._parent,
          value: this._value,
          label: this._label
        });
      };

      PglyField.prototype.get = function () {
        return this._value;
      };

      return PglyField;
    }();

    var PglyBaseComponent =
    /** @class */
    function (_super) {
      __extends(PglyBaseComponent, _super);

      function PglyBaseComponent(el) {
        var _this = _super.call(this) || this;

        _this._wrapper = DOMManipulation.getElement(el);
        var _a = _this._wrapper.dataset,
            name = _a.name,
            _b = _a.def,
            def = _b === void 0 ? undefined : _b;

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
        var _this = this;

        ValidatorEngine.apply(rules, this._field.get(), function (message) {
          return _this._error.apply(message);
        }, function () {
          return _this._error.flush();
        });
      };

      return PglyBaseComponent;
    }(EventHandler);

    var PglyCheckboxComponent =
    /** @class */
    function (_super) {
      __extends(PglyCheckboxComponent, _super);

      function PglyCheckboxComponent(el) {
        var _this = _super.call(this, el) || this;

        _this.checkbox = DOMManipulation.findElement(_this._wrapper, '.pgly-wps--checkbox');

        _this._bind();

        _this.field().set(_this._wrapper.dataset.def === 'true');

        return _this;
      }

      PglyCheckboxComponent.prototype._select = function (v) {
        this.checkbox.classList.remove('pgly-checked--state');
        if (v) this.checkbox.classList.add('pgly-checked--state');
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
    }(PglyBaseComponent);

    var PglyInputComponent =
    /** @class */
    function (_super) {
      __extends(PglyInputComponent, _super);

      function PglyInputComponent(el) {
        var _this = _super.call(this, el) || this;

        DOMManipulation.findElement(_this._wrapper, 'input').addEventListener('keyup', function (e) {
          _this._field.set(e.target.value);
        });
        return _this;
      }

      return PglyInputComponent;
    }(PglyBaseComponent);

    var PglyTextAreaComponent =
    /** @class */
    function (_super) {
      __extends(PglyTextAreaComponent, _super);

      function PglyTextAreaComponent(el) {
        var _this = _super.call(this, el) || this;

        DOMManipulation.findElement(_this._wrapper, 'textarea').addEventListener('keyup', function (e) {
          _this._field.set(e.target.value);
        });
        return _this;
      }

      return PglyTextAreaComponent;
    }(PglyBaseComponent);

    var PglySelectComponent =
    /** @class */
    function (_super) {
      __extends(PglySelectComponent, _super);

      function PglySelectComponent(el) {
        var _this = _super.call(this, el) || this;

        _this.items = [];
        _this.loading = false;
        _this._comps = {
          selection: DOMManipulation.findElement(_this._wrapper, '.selected'),
          value: DOMManipulation.findElement(_this._wrapper, '.selected span'),
          items: DOMManipulation.findElement(_this._wrapper, '.items'),
          container: DOMManipulation.findElement(_this._wrapper, '.items .container')
        };

        _this._bind();

        return _this;
      }

      PglySelectComponent.prototype.synchronous = function (items) {
        this.loading = false;
        this.items = items;

        this._render();
      };

      PglySelectComponent.prototype.asynchronous = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
          var _a;

          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                this.loading = true;

                this._comps.selection.classList.add('pgly-loading--state');

                _a = this;
                return [4
                /*yield*/
                , callback()];

              case 1:
                _a.items = _b.sent();

                this._render();

                this.loading = false;

                this._comps.selection.classList.remove('pgly-loading--state');

                return [2
                /*return*/
                ];
            }
          });
        });
      };

      PglySelectComponent.prototype.select = function (el) {
        var _a, _b, _c;

        this._comps.selection.classList.remove('empty');

        this.field().set((_a = el.dataset.value) !== null && _a !== void 0 ? _a : '', (_b = el.textContent) !== null && _b !== void 0 ? _b : '');
        this._comps.value.textContent = (_c = this.field().label()) !== null && _c !== void 0 ? _c : '';

        if (this.field().get() === '') {
          this._comps.selection.classList.add('empty');
        }

        this._flush(el);

        this._close();
      };

      PglySelectComponent.prototype.empty = function (label) {
        var _a;

        this.field().set('', label);
        this._comps.value.textContent = (_a = this.field().label()) !== null && _a !== void 0 ? _a : '';

        this._comps.selection.classList.add('empty');

        this._flush();

        this._close();
      };

      PglySelectComponent.prototype._flush = function (selected) {
        this._comps.items.querySelectorAll('.item').forEach(function (el) {
          el.classList.remove('current');
        });

        if (selected) selected.classList.add('current');
      };

      PglySelectComponent.prototype._toggle = function () {
        this._comps.selection.classList.toggle('open');

        this._comps.items.classList.toggle('hidden');
      };

      PglySelectComponent.prototype._close = function () {
        this._comps.selection.classList.remove('open');

        this._comps.items.classList.add('hidden');
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

        this._comps.selection.addEventListener('click', function () {
          if (_this.loading) return;

          _this._toggle();
        });

        this._comps.items.addEventListener('click', function (el) {
          if (_this.loading) return;
          var target = el.target;

          if (target.classList.contains('item')) {
            _this.select(target);

            return;
          }

          if (target.classList.contains('clickable')) {
            _this.empty(target.textContent);

            return;
          }
        });
      };

      return PglySelectComponent;
    }(PglyBaseComponent);

    var PglyBaseFormEngine =
    /** @class */
    function (_super) {
      __extends(PglyBaseFormEngine, _super);

      function PglyBaseFormEngine(el, options) {
        if (options === void 0) {
          options = {};
        }

        var _a;

        var _this = _super.call(this) || this;

        _this._loading = false;
        _this._wrapper = DOMManipulation.getElement(el);
        _this._button = DOMManipulation.findElement(_this._wrapper, 'button.pgly-form--submit');
        _this._inputs = (_a = options.inputs) !== null && _a !== void 0 ? _a : [];
        _this._options = options;

        _this._bind();

        return _this;
      }

      PglyBaseFormEngine.prototype.add = function (input) {
        this._inputs.push(input);
      };

      PglyBaseFormEngine.prototype.get = function (name) {
        return this._inputs.find(function (i) {
          return i.field().name() === name;
        });
      };

      PglyBaseFormEngine.prototype.auto = function () {
        var _this = this;

        var prefix = "pgly-form";

        this._wrapper.querySelectorAll("." + prefix + "--input").forEach(function (el) {
          if (el.classList.contains(prefix + "--text")) {
            _this._inputs.push(new PglyInputComponent(el));

            return;
          }

          if (el.classList.contains(prefix + "--textarea")) {
            _this._inputs.push(new PglyTextAreaComponent(el));

            return;
          }

          if (el.classList.contains(prefix + "--checkbox")) {
            _this._inputs.push(new PglyCheckboxComponent(el));

            return;
          }

          if (el.classList.contains(prefix + "--eselect")) {
            _this._inputs.push(new PglySelectComponent(el));

            return;
          }
        });
      };

      PglyBaseFormEngine.prototype.prepare = function (rules) {
        if (rules === void 0) {
          rules = {};
        }

        var inputs = {};
        var errors = [];

        this._inputs.forEach(function (el) {
          if (rules[el.field().name()]) {
            el.validate(rules[el.field().name()]);

            if (el.error().has()) {
              errors.push({
                name: el.field().name(),
                value: el.field().get(),
                message: el.error().message()
              });
            }
          }

          inputs[el.field().name()] = el.field().get();
        });

        return {
          inputs: inputs,
          errors: errors
        };
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
    }(EventHandler);

    var PglyAsyncFormEngine =
    /** @class */
    function (_super) {
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
          this.emit('error', {
            data: data.errors
          });
          return;
        }

        this.loadState(true);
        data.inputs.xSecurity = this._options.x_security;
        this.emit('prepared', data);
        axios__default["default"].post(this._wrapper.action, qsStringify(data.inputs)).then(function (res) {
          _this.emit('submitted', {
            data: data.inputs,
            response: res.data
          });
        }).catch(function (err) {
          _this.emit('unsubmitted', {
            data: data.inputs,
            error: err
          });
        }).finally(function () {
          _this.loadState(false);

          _this.emit('finished', {
            data: data.inputs
          });
        });
      };

      return PglyAsyncFormEngine;
    }(PglyBaseFormEngine);

    exports.PglyAsyncFormEngine = PglyAsyncFormEngine;
    exports.PglyInputComponent = PglyInputComponent;
    exports.PglyTextAreaComponent = PglyTextAreaComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
