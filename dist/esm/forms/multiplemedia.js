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
import DOMManipulation from '../behaviours/dommanipulation';
import PglyBaseComponent from './base';
var PglyMultipleMediaComponent = /** @class */ (function (_super) {
    __extends(PglyMultipleMediaComponent, _super);
    function PglyMultipleMediaComponent(el) {
        var _this = _super.call(this, el) || this;
        _this._images = DOMManipulation.findElement(_this._wrapper, '.pgly-wps--images');
        _this._options = {
            labels: {
                title: 'Select a media',
                button: 'Select',
            },
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
        if (!img)
            return;
        this._images.removeChild(img);
        this.field().set(this.field()
            .get()
            .filter(function (i) { return i != id; }));
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
        button.className =
            'pgly-wps--icon-button pgly-wps--remove pgly-wps-is-compact pgly-wps-is-rounded pgly-wps-is-danger pgly-wps--close';
        button.dataset.value = data.value;
        wrapper.appendChild(button);
        this._images.appendChild(wrapper);
    };
    PglyMultipleMediaComponent.prototype._bind = function () {
        var _this = this;
        this._wrapper.addEventListener('click', function (e) {
            var el = e.target;
            if (!el)
                return;
            e.preventDefault();
            if (el.classList.contains('pgly-wps--remove')) {
                var _a = el.dataset.value, value = _a === void 0 ? '' : _a;
                _this.emit('remove', { component: _this, value: value });
                _this.remove(value);
                return;
            }
            if (el.classList.contains('pgly-wps--select')) {
                _this.emit('select', { component: _this });
                return;
            }
            if (el.classList.contains('pgly-wps--clean')) {
                _this.emit('clean', { component: _this });
                _this.clean();
            }
        });
    };
    PglyMultipleMediaComponent.wpFrame = function (_a) {
        var component = _a.component;
        var frame = (wp.media.frames.metaImageFrame = wp.media({
            title: component._options.labels.title,
            library: {
                type: 'image',
            },
            button: { text: component._options.labels.button },
            multiple: true,
        }));
        frame.on('open', function () {
            var _a;
            (_a = component
                .field()
                .get()) === null || _a === void 0 ? void 0 : _a.forEach(function (id) {
                // Select media in wordpress library
                var selection = frame.state().get('selection');
                var att = wp.media.attachment(id);
                att.fetch();
                selection.add(att ? [att] : []);
            });
        });
        frame.on('select', function () {
            // multiple selection
            var selected = frame
                .state()
                .get('selection')
                .map(function (i) { return i.toJSON(); });
            while (component._images.firstChild) {
                component._images.removeChild(component._images.firstChild);
            }
            component.field().set([]);
            selected.forEach(function (i) {
                component.select({ value: i.id, src: i.url });
            });
        });
        frame.open();
    };
    PglyMultipleMediaComponent.prototype._default = function () {
        var _this = this;
        if (!this._images.dataset.values || !this._images.dataset.srcs)
            return;
        var values = this._images.dataset.values.split(',');
        var srcs = this._images.dataset.srcs.split(',');
        this.field().set(values);
        values.forEach(function (value, idx) {
            var _a;
            _this._render({ value: value, src: (_a = srcs[idx]) !== null && _a !== void 0 ? _a : '' });
        });
    };
    return PglyMultipleMediaComponent;
}(PglyBaseComponent));
export default PglyMultipleMediaComponent;
