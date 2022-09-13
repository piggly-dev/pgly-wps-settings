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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

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
        var name = _this._wrapper.dataset.name;

        if (!name) {
          console.error('Wrapper has no data-name attribute', _this._wrapper);
          throw new Error('PglyBaseComponent.PglyField must have a data-name attribute in its wrapper...');
        }

        _this._error = new PglyFieldError(_this, _this._wrapper);
        _this._field = new PglyField(_this, name, undefined);
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

        _this._checkbox = DOMManipulation.findElement(_this._wrapper, '.pgly-wps--checkbox');

        _this._bind();

        _this._default();

        return _this;
      }

      PglyCheckboxComponent.prototype.emptyValue = function () {
        this.field().set(false);
      };

      PglyCheckboxComponent.prototype._select = function (v) {
        this._checkbox.classList.remove('pgly-checked--state');

        if (v) this._checkbox.classList.add('pgly-checked--state');
      };

      PglyCheckboxComponent.prototype._bind = function () {
        var _this = this;

        this.on('change', function (_a) {
          var value = _a.value;

          _this._select(value);
        });

        this._checkbox.addEventListener('click', function () {
          _this.field().set(!_this.field().get());
        });
      };

      PglyCheckboxComponent.prototype._default = function () {
        this.field().set(this._checkbox.dataset.value === 'true');
      };

      return PglyCheckboxComponent;
    }(PglyBaseComponent);

    var PglyInputComponent =
    /** @class */
    function (_super) {
      __extends(PglyInputComponent, _super);

      function PglyInputComponent(el) {
        var _this = _super.call(this, el) || this;

        _this._keyEvent = false;
        _this._input = DOMManipulation.findElement(_this._wrapper, 'input');

        _this._bind();

        _this._default();

        return _this;
      }

      PglyInputComponent.prototype.emptyValue = function () {
        this.field().set('');
      };

      PglyInputComponent.prototype._bind = function () {
        var _this = this;

        this.on('change', function () {
          if (_this._keyEvent) return;
          _this._input.value = _this.field().get();
        });

        this._input.addEventListener('keyup', function (e) {
          _this._keyEvent = true;

          _this._field.set(e.target.value);

          _this._keyEvent = false;
        });
      };

      PglyInputComponent.prototype._default = function () {
        this.field().set(this._input.value);
      };

      return PglyInputComponent;
    }(PglyBaseComponent);

    var PglyTextAreaComponent =
    /** @class */
    function (_super) {
      __extends(PglyTextAreaComponent, _super);

      function PglyTextAreaComponent(el) {
        var _this = _super.call(this, el) || this;

        _this._keyEvent = false;
        _this._input = DOMManipulation.findElement(_this._wrapper, 'textarea');

        _this._bind();

        _this._default();

        return _this;
      }

      PglyTextAreaComponent.prototype.emptyValue = function () {
        this.field().set('');
      };

      PglyTextAreaComponent.prototype._bind = function () {
        var _this = this;

        this.on('change', function () {
          if (_this._keyEvent) return;
          _this._input.value = _this.field().get();
        });

        this._input.addEventListener('keyup', function (e) {
          _this._keyEvent = true;

          _this._field.set(e.target.value);

          _this._keyEvent = false;
        });
      };

      PglyTextAreaComponent.prototype._default = function () {
        this.field().set(this._input.value);
      };

      return PglyTextAreaComponent;
    }(PglyBaseComponent);

    var PglyLoadable =
    /** @class */
    function () {
      function PglyLoadable(parent) {
        this._loading = false;
        this._parent = parent;
      }

      PglyLoadable.prototype.prepare = function () {
        this._parent.emit('beforeLoad', {
          loading: false
        });

        this._loading = true;
      };

      PglyLoadable.prototype.done = function () {
        this._loading = false;

        this._parent.emit('afterLoad', {
          loading: false
        });
      };

      PglyLoadable.prototype.isLoading = function () {
        return this._loading;
      };

      return PglyLoadable;
    }();

    var PglySelectComponent =
    /** @class */
    function (_super) {
      __extends(PglySelectComponent, _super);

      function PglySelectComponent(el) {
        var _this = _super.call(this, el) || this;

        _this.items = [];
        _this._comps = {
          selection: DOMManipulation.findElement(_this._wrapper, '.selected'),
          value: DOMManipulation.findElement(_this._wrapper, '.selected span'),
          items: DOMManipulation.findElement(_this._wrapper, '.items'),
          container: DOMManipulation.findElement(_this._wrapper, '.items .container')
        };
        _this._loader = new PglyLoadable(_this);
        _this._options = {
          labels: {
            placeholder: 'Select an option...'
          }
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
                return [4
                /*yield*/
                , callback()];

              case 1:
                _a.items = _b.sent();

                this._render();

                this.loader().done();
                return [2
                /*return*/
                ];
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
          if (el.dataset.value === _this.field().get()) el.classList.add('current');
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
        } else {
          this._comps.selection.classList.add('empty');
        }

        this._comps.value.textContent = (_b = (_a = this.field().label()) !== null && _a !== void 0 ? _a : this._options.labels.placeholder) !== null && _b !== void 0 ? _b : '';

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
          if (_this.loader().isLoading()) return;

          _this._toggle();
        });

        this._comps.items.addEventListener('click', function (e) {
          var _a, _b;

          if (_this.loader().isLoading()) return;
          var target = e.target;
          if (!target) return;
          e.preventDefault();

          if (target.classList.contains('item') || target.classList.contains('clickable')) {
            var value = (_a = target.dataset.value) !== null && _a !== void 0 ? _a : '';
            var label = (_b = target.textContent) !== null && _b !== void 0 ? _b : '';
            return _this.field().set(value, label);
          }
        });
      };

      PglySelectComponent.prototype._default = function () {
        if (!this._comps.selection.dataset.value) return;
        this.field().set(this._comps.selection.dataset.value, this._comps.selection.dataset.label);
      };

      return PglySelectComponent;
    }(PglyBaseComponent);

    var PglyFinderComponent =
    /** @class */
    function (_super) {
      __extends(PglyFinderComponent, _super);

      function PglyFinderComponent(el) {
        var _this = _super.call(this, el) || this;

        _this._options = {
          labels: {
            select: 'Select',
            unselect: 'Unselect'
          }
        };
        _this._search = {
          wrapper: DOMManipulation.findElement(_this._wrapper, '.pgly-wps--field .pgly-wps--input'),
          input: DOMManipulation.findElement(_this._wrapper, '.pgly-wps--field input'),
          button: DOMManipulation.findElement(_this._wrapper, '.pgly-wps--field button')
        };
        _this._selected = {
          wrapper: DOMManipulation.findElement(_this._wrapper, '.pgly-wps--field .pgly-wps--selected'),
          label: DOMManipulation.findElement(_this._wrapper, '.pgly-wps--field .pgly-wps--selected .pgly-wps--label'),
          button: DOMManipulation.findElement(_this._wrapper, '.pgly-wps--field .pgly-wps--selected button')
        };
        _this._items = {
          loader: _this._wrapper.querySelector('.pgly-wps--loader'),
          list: _this._wrapper.querySelector('.pgly-wps--loader .pgly-wps--list')
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
          var response;

          var _this = this;

          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (this._search.input.value.length === 0 || this.loader().isLoading() || !this._options.load) {
                  return [2
                  /*return*/
                  ];
                }

                this.loader().prepare();
                _a.label = 1;

              case 1:
                _a.trys.push([1, 3,, 4]);

                return [4
                /*yield*/
                , this._options.load(this._search.input.value)];

              case 2:
                response = _a.sent();
                return [3
                /*break*/
                , 4];

              case 3:
                _a.sent();
                return [2
                /*return*/
                , this.loader().done()];

              case 4:
                this._flush();

                response.forEach(function (item) {
                  _this._items.list.appendChild(_this._render(item));
                });
                return [2
                /*return*/
                , this.loader().done()];
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
            var _a = target.dataset,
                _b = _a.label,
                label = _b === void 0 ? '' : _b,
                _c = _a.value,
                value = _c === void 0 ? '' : _c;
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
        if (!this._selected.wrapper.dataset.value) return;
        this.field().set(this._selected.wrapper.dataset.value, this._selected.wrapper.dataset.label);
      };

      return PglyFinderComponent;
    }(PglyBaseComponent);

    var PglySingleMediaComponent =
    /** @class */
    function (_super) {
      __extends(PglySingleMediaComponent, _super);

      function PglySingleMediaComponent(el) {
        var _this = _super.call(this, el) || this;

        _this._options = {
          labels: {
            title: 'Select a media',
            button: 'Select'
          }
        };
        _this._image = DOMManipulation.findElement(_this._wrapper, 'img');

        _this._bind();

        _this._default();

        return _this;
      }

      PglySingleMediaComponent.prototype.options = function (options) {
        this._options = __assign(__assign({}, this._options), options);
      };

      PglySingleMediaComponent.prototype.select = function (data) {
        this.field().set(data.value, data.src);
      };

      PglySingleMediaComponent.prototype.clean = function () {
        this.field().set('', '');
      };

      PglySingleMediaComponent.prototype.emptyValue = function () {
        this.clean();
      };

      PglySingleMediaComponent.prototype._bind = function () {
        var _this = this;

        this.on('change', function () {
          var _a;

          _this._image.src = (_a = _this.field().label()) !== null && _a !== void 0 ? _a : '';
        });

        this._wrapper.addEventListener('click', function (e) {
          var el = e.target;
          if (!el) return;
          e.preventDefault();

          if (el.classList.contains('pgly-wps--select')) {
            return _this.emit('select', {
              component: _this
            });
          }

          if (el.classList.contains('pgly-wps--clean')) {
            _this.emit('clean', {
              component: _this
            });

            return _this.clean();
          }
        });
      };

      PglySingleMediaComponent.prototype._default = function () {
        if (!this._image.dataset.value) return;
        this.field().set(this._image.dataset.value, this._image.dataset.src);
      };

      PglySingleMediaComponent.wpFrame = function (_a) {
        var component = _a.component;
        var frame = wp.media.frames.metaImageFrame = wp.media({
          title: component._options.labels.title,
          library: {
            type: 'image'
          },
          button: {
            text: component._options.labels.button
          },
          multiple: false
        });
        frame.on('open', function () {
          var value = component.field().get();
          if (value.length <= 0) return; // Select media in wordpress library

          var selection = frame.state().get('selection');
          var att = wp.media.attachment(value);
          att.fetch();
          selection.add(att ? [att] : []);
        });
        frame.on('select', function () {
          var _a = frame.state().get('selection').first().toJSON(),
              id = _a.id,
              url = _a.url;

          component.select({
            value: id,
            src: url
          });
        });
        frame.open();
      };

      return PglySingleMediaComponent;
    }(PglyBaseComponent);

    var PglyMultipleMediaComponent =
    /** @class */
    function (_super) {
      __extends(PglyMultipleMediaComponent, _super);

      function PglyMultipleMediaComponent(el) {
        var _this = _super.call(this, el) || this;

        _this._images = DOMManipulation.findElement(_this._wrapper, '.pgly-wps--images');
        _this._options = {
          labels: {
            title: 'Select a media',
            button: 'Select'
          }
        };

        _this.field().set([]);

        _this._bind();

        _this._default();

        return _this;
      }

      PglyMultipleMediaComponent.prototype.options = function (options) {
        this._options = __assign(__assign({}, this._options), options);
      };

      PglyMultipleMediaComponent.prototype.select = function (data) {
        this.field().get().push(data.value);

        this._render(data);
      };

      PglyMultipleMediaComponent.prototype.remove = function (id) {
        var img = document.getElementById(this.field().name() + "-img-" + id);
        if (!img) return;

        this._images.removeChild(img);

        this.field().set(this.field().get().filter(function (i) {
          return i != id;
        }));
      };

      PglyMultipleMediaComponent.prototype.clean = function () {
        this.field().set([]);

        while (this._images.firstChild) {
          this._images.removeChild(this._images.firstChild);
        }
      };

      PglyMultipleMediaComponent.prototype.emptyValue = function () {
        this.clean();
      };

      PglyMultipleMediaComponent.prototype._render = function (data) {
        var wrapper = document.createElement('div');
        wrapper.id = this.field().name() + "-img-" + data.value;
        wrapper.className = 'pgly-wps--image';
        wrapper.style.backgroundImage = "url(" + data.src + ")";
        var button = document.createElement('button');
        button.className = 'pgly-wps--icon-button pgly-wps--remove pgly-wps-is-compact pgly-wps-is-rounded pgly-wps-is-danger pgly-wps--close';
        button.dataset.value = data.value;
        wrapper.appendChild(button);

        this._images.appendChild(wrapper);
      };

      PglyMultipleMediaComponent.prototype._bind = function () {
        var _this = this;

        this._wrapper.addEventListener('click', function (e) {
          var el = e.target;
          if (!el) return;
          e.preventDefault();

          if (el.classList.contains('pgly-wps--remove')) {
            var _a = el.dataset.value,
                value = _a === void 0 ? '' : _a;

            _this.emit('remove', {
              component: _this,
              value: value
            });

            return _this.remove(value);
          }

          if (el.classList.contains('pgly-wps--select')) {
            return _this.emit('select', {
              component: _this
            });
          }

          if (el.classList.contains('pgly-wps--clean')) {
            _this.emit('clean', {
              component: _this
            });

            return _this.clean();
          }
        });
      };

      PglyMultipleMediaComponent.wpFrame = function (_a) {
        var component = _a.component;
        var frame = wp.media.frames.metaImageFrame = wp.media({
          title: component._options.labels.title,
          library: {
            type: 'image'
          },
          button: {
            text: component._options.labels.button
          },
          multiple: true
        });
        frame.on('open', function () {
          component.field().get().forEach(function (id) {
            // Select media in wordpress library
            var selection = frame.state().get('selection');
            var att = wp.media.attachment(id);
            att.fetch();
            selection.add(att ? [att] : []);
          });
        });
        frame.on('select', function () {
          // multiple selection
          var selected = frame.state().get('selection').map(function (i) {
            return i.toJSON();
          });

          while (component._images.firstChild) {
            component._images.removeChild(component._images.firstChild);
          }

          component.field().set([]);
          selected.forEach(function (i) {
            component.select({
              value: i.id,
              src: i.url
            });
          });
        });
        frame.open();
      };

      PglyMultipleMediaComponent.prototype._default = function () {
        var _this = this;

        if (!this._images.dataset.values || !this._images.dataset.srcs) return;

        var values = this._images.dataset.values.split(',');

        var srcs = this._images.dataset.srcs.split(',');

        this.field().set(values);
        values.forEach(function (value, idx) {
          var _a;

          _this._render({
            value: value,
            src: (_a = srcs[idx]) !== null && _a !== void 0 ? _a : ''
          });
        });
      };

      return PglyMultipleMediaComponent;
    }(PglyBaseComponent);

    var UUID =
    /** @class */
    function () {
      function UUID() {}
      /**
       * @link https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
       */


      UUID.generate = function () {
        if (UUID.lut.length === 0) {
          for (var i = 0; i < 256; i++) {
            UUID.lut[i] = (i < 16 ? '0' : '') + i.toString(16);
          }
        }

        var d0 = Math.random() * 0xffffffff | 0;
        var d1 = Math.random() * 0xffffffff | 0;
        var d2 = Math.random() * 0xffffffff | 0;
        var d3 = Math.random() * 0xffffffff | 0;
        return UUID.lut[d0 & 0xff] + UUID.lut[d0 >> 8 & 0xff] + UUID.lut[d0 >> 16 & 0xff] + UUID.lut[d0 >> 24 & 0xff] + '-' + UUID.lut[d1 & 0xff] + UUID.lut[d1 >> 8 & 0xff] + '-' + UUID.lut[d1 >> 16 & 0x0f | 0x40] + UUID.lut[d1 >> 24 & 0xff] + '-' + UUID.lut[d2 & 0x3f | 0x80] + UUID.lut[d2 >> 8 & 0xff] + '-' + UUID.lut[d2 >> 16 & 0xff] + UUID.lut[d2 >> 24 & 0xff] + UUID.lut[d3 & 0xff] + UUID.lut[d3 >> 8 & 0xff] + UUID.lut[d3 >> 16 & 0xff] + UUID.lut[d3 >> 24 & 0xff];
      };

      UUID.lut = [];
      return UUID;
    }();

    var PglyBasicSelectComponent =
    /** @class */
    function (_super) {
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

      PglyBasicSelectComponent.prototype.asynchronous = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
          var _a;

          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                this.loader().prepare();
                _a = this._render;
                return [4
                /*yield*/
                , callback()];

              case 1:
                _a.apply(this, [_b.sent()]);

                this.loader().done();
                return [2
                /*return*/
                ];
            }
          });
        });
      };

      PglyBasicSelectComponent.prototype.emptyValue = function () {
        this.field().set('');
      };

      PglyBasicSelectComponent.prototype._render = function (items) {
        var _this = this;

        var placeholder = DOMManipulation.findElement(this._input, '.placeholder');

        while (this._input.firstChild) {
          this._input.removeChild(this._input.firstChild);
        }

        if (placeholder) this._input.appendChild(placeholder);
        items.forEach(function (item) {
          var op = document.createElement('option');
          op.value = item.value;
          op.textContent = item.label;
          if (item.selected) op.selected = true;

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
          if (_this._changeEvent) return;
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
    }(PglyBaseComponent);

    var PglyGroupFormItems =
    /** @class */
    function () {
      function PglyGroupFormItems(parent) {
        this._items = [];
        this._parent = parent;
      }

      PglyGroupFormItems.prototype.count = function () {
        return this._items.length;
      };

      PglyGroupFormItems.prototype.add = function (item) {
        this._items.push(item);

        this._parent.emit('added', {
          item: item
        });
      };

      PglyGroupFormItems.prototype.get = function (uid) {
        return this._items.find(function (i) {
          return i.uid === uid;
        });
      };

      PglyGroupFormItems.prototype.all = function () {
        return this._items.map(function (item) {
          var inputs = __assign({}, item.inputs);

          Object.keys(inputs).map(function (key) {
            inputs[key] = inputs[key].value;
          });
          return inputs;
        });
      };

      PglyGroupFormItems.prototype.update = function (item) {
        var index = this._items.findIndex(function (i) {
          return i.uid === i.uid;
        });

        this._items[index] = __assign(__assign({}, this._items[index]), item);

        this._parent.emit('updated', {
          item: item
        });
      };

      PglyGroupFormItems.prototype.remove = function (uid) {
        this._items = this._items.filter(function (i) {
          return i.uid !== uid;
        });

        this._parent.emit('removed', {
          uid: uid
        });
      };

      return PglyGroupFormItems;
    }();

    var PglyGroupFormComponent =
    /** @class */
    function (_super) {
      __extends(PglyGroupFormComponent, _super);

      function PglyGroupFormComponent(el) {
        var _this = _super.call(this, el) || this;

        _this._inputs = {};
        _this._items = new PglyGroupFormItems(_this);
        _this._loader = new PglyLoadable(_this);
        _this._editing = false;
        _this._current = undefined;
        _this._comps = {
          button: DOMManipulation.findElement(_this._wrapper, 'button.pgly-gform--submit'),
          items: DOMManipulation.findElement(_this._wrapper, '.pgly-wps--items')
        };
        _this._options = {
          view: {},
          labels: {
            edit: 'Edit',
            remove: 'Remove'
          }
        };

        _this._bind();

        return _this;
      }

      PglyGroupFormComponent.prototype.options = function (options) {
        this._options = __assign(__assign({}, this._options), options);
      };

      PglyGroupFormComponent.prototype.loader = function () {
        return this._loader;
      };

      PglyGroupFormComponent.prototype.add = function (input) {
        this._inputs[input.field().name()] = input;
      };

      PglyGroupFormComponent.prototype.synchronous = function (items) {
        var _this = this;

        this.loader().prepare();
        items.forEach(function (item) {
          return _this._items.add({
            uid: UUID.generate(),
            inputs: item
          });
        });
        this.loader().done();
      };

      PglyGroupFormComponent.prototype.asynchronous = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
          var items;

          var _this = this;

          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                this.loader().prepare();
                return [4
                /*yield*/
                , callback()];

              case 1:
                items = _a.sent();
                items.forEach(function (item) {
                  return _this._items.add({
                    uid: UUID.generate(),
                    inputs: item
                  });
                });
                this.loader().done();
                return [2
                /*return*/
                ];
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
            var component = new PglyInputComponent(el);
            var name_1 = component.field().name();
            _this._inputs[name_1] = component;
            return;
          }

          if (el.classList.contains(prefix + "--textarea")) {
            var component = new PglyTextAreaComponent(el);
            var name_2 = component.field().name();
            _this._inputs[name_2] = component;
            return;
          }

          if (el.classList.contains(prefix + "--checkbox")) {
            var component = new PglyCheckboxComponent(el);
            var name_3 = component.field().name();
            _this._inputs[name_3] = component;
            return;
          }

          if (el.classList.contains(prefix + "--select")) {
            var component = new PglyBasicSelectComponent(el);
            var name_4 = component.field().name();
            _this._inputs[name_4] = component;
            return;
          }

          if (el.classList.contains(prefix + "--eselect")) {
            var component = new PglySelectComponent(el);
            var name_5 = component.field().name();
            _this._inputs[name_5] = component;
            return;
          }

          if (el.classList.contains(prefix + "--finder")) {
            var component = new PglyFinderComponent(el);
            var name_6 = component.field().name();
            _this._inputs[name_6] = component;
            return;
          }

          if (el.classList.contains(prefix + "--single-media")) {
            var component = new PglySingleMediaComponent(el);
            var name_7 = component.field().name();
            _this._inputs[name_7] = component;
            return;
          }

          if (el.classList.contains(prefix + "--multiple-media")) {
            var component = new PglyMultipleMediaComponent(el);
            var name_8 = component.field().name();
            _this._inputs[name_8] = component;
            return;
          }
        });
      };

      PglyGroupFormComponent.prototype.prepare = function (rules) {
        var _this = this;

        if (rules === void 0) {
          rules = {};
        }

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
                message: el.error().message()
              });
            }
          }

          inputs[el.field().name()] = {
            label: el.field().label(),
            value: el.field().get()
          };
        });
        return {
          inputs: inputs,
          errors: errors
        };
      };

      PglyGroupFormComponent.prototype.emptyValue = function () {};

      PglyGroupFormComponent.prototype._submit = function (data) {
        if (!this._editing) {
          this._items.add({
            uid: UUID.generate(),
            inputs: data.inputs
          });
        } else if (this._current) {
          this._items.update({
            uid: this._current,
            inputs: data.inputs
          });

          var card = DOMManipulation.findElement(this._comps.items, ".pgly-wps--card[data-uid=\"" + this._current + "\"]");
          if (card) card.classList.remove('pgly-wps-is-warning');
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
        if (!item) return;
        Object.keys(item).forEach(function (key) {
          var input = _this._inputs[key];
          if (!input) return;
          input.field().set(item[key].value, item[key].label);
        });
        var card = DOMManipulation.findElement(this._comps.items, ".pgly-wps--card[data-uid=\"" + uid + "\"]");
        if (card) card.classList.add('pgly-wps-is-warning');
      };

      PglyGroupFormComponent.prototype._addCard = function (item) {
        var _this = this;

        var card = document.createElement('div');
        card.className = 'pgly-wps--card pgly-wps-is-white pgly-wps-is-compact';
        card.dataset.uid = item.uid;
        var content = document.createElement('div');
        content.className = 'pgly-wps--content inside left';
        Object.keys(item.inputs).forEach(function (key) {
          if (!_this._options.view[key]) return;
          var column = document.createElement('div');
          column.className = 'pgly-wps--item';
          var strong = document.createElement('strong');
          strong.textContent = _this._options.view[key];
          var span = document.createElement('span');
          span.textContent = item.inputs[key].value.toString();
          column.appendChild(strong);
          column.appendChild(span);
          content.appendChild(column);
        });
        var action = document.createElement('div');
        action.className = 'pgly-wps--action-bar inside right';
        var edit = document.createElement('button');
        edit.className = 'pgly-wps--button pgly-wps-is-compact pgly-wps-is-primary pgly-wps--edit';
        edit.dataset.uid = item.uid;
        edit.textContent = this._options.labels.edit;
        var remove = document.createElement('button');
        remove.className = 'pgly-wps--button pgly-wps-is-compact pgly-wps-is-danger pgly-wps--remove';
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

        var card = DOMManipulation.findElement(this._comps.items, ".pgly-wps--card[data-uid=\"" + item.uid + "\"]");
        if (!card) return;
        var content = DOMManipulation.findElement(card, '.pgly-wps--content');
        if (!content) return;

        while (content.firstChild) {
          content.removeChild(content.firstChild);
        }

        Object.keys(item.inputs).forEach(function (key) {
          if (!_this._options.view[key]) return;
          var column = document.createElement('div');
          column.className = 'pgly-wps--item';
          var strong = document.createElement('strong');
          strong.textContent = _this._options.view[key];
          var span = document.createElement('span');
          span.textContent = item.inputs[key].value.toString();
          column.appendChild(strong);
          column.appendChild(span);
          content.appendChild(column);
        });
      };

      PglyGroupFormComponent.prototype._removeCard = function (uid) {
        var card = DOMManipulation.findElement(this._comps.items, ".pgly-wps--card[data-uid=\"" + uid + "\"]");
        if (card) this._comps.items.removeChild(card);
      };

      PglyGroupFormComponent.prototype._bind = function () {
        var _this = this;

        this.on('submit', function () {
          var _a;

          return _this._submit(_this.prepare((_a = _this._options.rules) !== null && _a !== void 0 ? _a : {}));
        });
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
        this.on('removed', function (_a) {
          var uid = _a.uid;

          _this.field().set(_this._items.all());

          _this._removeCard(uid);
        });

        this._comps.items.addEventListener('click', function (e) {
          var target = e.target;
          if (!target.dataset.uid) return;
          e.preventDefault();

          if (target.classList.contains('pgly-wps--edit')) {
            if (_this._editing) return;
            _this._editing = true;
            _this._current = target.dataset.uid;
            return _this._updateInputs(_this._current);
          }

          if (target.classList.contains('pgly-wps--remove')) {
            if (_this._editing) return;
            return _this._items.remove(target.dataset.uid);
          }
        });

        this._comps.button.addEventListener('click', function (e) {
          e.preventDefault();

          _this.emit('submit', {});
        });
      };

      PglyGroupFormComponent.prototype._default = function () {
        this.field().set([]);
      };

      return PglyGroupFormComponent;
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

        _this._formatter = function (data) {
          return qsStringify(data);
        };

        _this._bind();

        return _this;
      }

      PglyBaseFormEngine.prototype.formatter = function (func) {
        this._formatter = func;
      };

      PglyBaseFormEngine.prototype.add = function (input) {
        this._inputs.push(input);
      };

      PglyBaseFormEngine.prototype.get = function (name) {
        return this._inputs.find(function (i) {
          return i.field().name() === name;
        });
      };

      PglyBaseFormEngine.prototype.remove = function (name) {
        this._inputs = this._inputs.filter(function (i) {
          return i.field().name() !== name;
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

          if (el.classList.contains(prefix + "--select")) {
            _this._inputs.push(new PglyBasicSelectComponent(el));

            return;
          }

          if (el.classList.contains(prefix + "--eselect")) {
            _this._inputs.push(new PglySelectComponent(el));

            return;
          }

          if (el.classList.contains(prefix + "--finder")) {
            _this._inputs.push(new PglyFinderComponent(el));

            return;
          }

          if (el.classList.contains(prefix + "--single-media")) {
            _this._inputs.push(new PglySingleMediaComponent(el));

            return;
          }

          if (el.classList.contains(prefix + "--multiple-media")) {
            _this._inputs.push(new PglyMultipleMediaComponent(el));

            return;
          }

          if (el.classList.contains(prefix + "--group")) {
            var comp = new PglyGroupFormComponent(el);
            comp.auto();

            _this._inputs.push(comp);

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
        var _a = this._wrapper,
            _b = _a.method,
            method = _b === void 0 ? 'POST' : _b,
            action = _a.action;
        var request = method.toUpperCase() === 'POST' ? axios__default["default"].post(action, this._formatter(data.inputs)) : axios__default["default"].get(action, this._formatter(data.inputs));
        request.then(function (res) {
          _this.emit('requestSuccess', {
            data: data.inputs,
            response: res.data
          });
        }).catch(function (err) {
          _this.emit('requestError', {
            data: data.inputs,
            error: err
          });
        }).finally(function () {
          _this.loadState(false);

          _this.emit('requestEnd', {
            data: data.inputs
          });
        });
      };

      return PglyAsyncFormEngine;
    }(PglyBaseFormEngine);

    var PglyNotification =
    /** @class */
    function () {
      function PglyNotification(el) {
        this._container = DOMManipulation.getElement(el);

        this._bind();
      }

      PglyNotification.prototype.launch = function (message, options) {
        var _this = this;

        var op = __assign({
          timer: 2000,
          type: 'regular',
          light: false
        }, options);

        var notification = document.createElement('div');
        notification.classList.add('pgly-wps--notification', "pgly-wps-is-" + op.type);

        if (op.light) {
          notification.classList.add("pgly-wps-is-light");
        }

        var del = document.createElement('button');
        del.classList.add('pgly-wps--delete');
        var msg = document.createElement('div');
        msg.textContent = message;
        notification.appendChild(del);
        notification.appendChild(msg);

        this._container.appendChild(notification);

        var removed = false;
        setTimeout(function () {
          if (!removed) _this._container.removeChild(notification);
        }, op.timer);
        del.addEventListener('click', function () {
          _this._container.removeChild(notification);

          removed = true;
        });
      };

      PglyNotification.prototype._bind = function () {
        document.querySelectorAll('.pgly-wps--notification .pgly-wps--delete').forEach(function (el) {
          var _a;

          var notification = el.parentNode;
          var timer = parseInt((_a = notification.dataset.timer) !== null && _a !== void 0 ? _a : '0');
          var removed = false;

          if (timer > 0) {
            setTimeout(function () {
              var _a;

              if (!removed) (_a = notification === null || notification === void 0 ? void 0 : notification.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(notification);
            }, timer);
          }

          el.addEventListener('click', function () {
            var _a;

            removed = true;
            (_a = notification === null || notification === void 0 ? void 0 : notification.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(notification);
          });
        });
      };

      return PglyNotification;
    }();

    var PglyToast =
    /** @class */
    function () {
      function PglyToast(el) {
        this._container = DOMManipulation.getElement(el);
      }

      PglyToast.prototype.launch = function (message, options) {
        var _this = this;

        var op = __assign({
          timer: 2000,
          type: 'regular',
          light: false
        }, options);

        var toast = document.createElement('div');
        toast.classList.add('pgly-wps--toast', "pgly-wps-is-" + op.type);

        if (op.light) {
          toast.classList.add("pgly-wps-is-light");
        }

        var del = document.createElement('button');
        del.classList.add('pgly-wps--delete');
        var msg = document.createElement('div');
        msg.textContent = message;
        toast.appendChild(del);
        toast.appendChild(msg);

        this._container.appendChild(toast);

        var removed = false;
        setTimeout(function () {
          if (!removed) _this._container.removeChild(toast);
        }, op.timer);
        del.addEventListener('click', function () {
          _this._container.removeChild(toast);

          removed = true;
        });
      };

      return PglyToast;
    }();

    exports.PglyAsyncFormEngine = PglyAsyncFormEngine;
    exports.PglyBasicSelectComponent = PglyBasicSelectComponent;
    exports.PglyCheckboxComponent = PglyCheckboxComponent;
    exports.PglyFinderComponent = PglyFinderComponent;
    exports.PglyGroupFormComponent = PglyGroupFormComponent;
    exports.PglyInputComponent = PglyInputComponent;
    exports.PglyMultipleMediaComponent = PglyMultipleMediaComponent;
    exports.PglyNotification = PglyNotification;
    exports.PglySelectComponent = PglySelectComponent;
    exports.PglySingleMediaComponent = PglySingleMediaComponent;
    exports.PglyTextAreaComponent = PglyTextAreaComponent;
    exports.PglyToast = PglyToast;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
