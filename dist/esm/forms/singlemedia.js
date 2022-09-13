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
import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';
var PglySingleMediaComponent = /** @class */ (function (_super) {
    __extends(PglySingleMediaComponent, _super);
    function PglySingleMediaComponent(el) {
        var _this = _super.call(this, el) || this;
        _this._options = {
            labels: {
                title: 'Select a media',
                button: 'Select',
            },
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
            if (!el)
                return;
            e.preventDefault();
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
    PglySingleMediaComponent.prototype._default = function () {
        if (!this._image.dataset.value)
            return;
        this.field().set(this._image.dataset.value, this._image.dataset.src);
    };
    PglySingleMediaComponent.wpFrame = function (_a) {
        var component = _a.component;
        var frame = (wp.media.frames.metaImageFrame = wp.media({
            title: component._options.labels.title,
            library: {
                type: 'image',
            },
            button: { text: component._options.labels.button },
            multiple: false,
        }));
        frame.on('open', function () {
            var value = component.field().get();
            if (value.length <= 0)
                return;
            // Select media in wordpress library
            var selection = frame.state().get('selection');
            var att = wp.media.attachment(value);
            att.fetch();
            selection.add(att ? [att] : []);
        });
        frame.on('select', function () {
            var _a = frame.state().get('selection').first().toJSON(), id = _a.id, url = _a.url;
            component.select({ value: id, src: url });
        });
        frame.open();
    };
    return PglySingleMediaComponent;
}(PglyBaseComponent));
export default PglySingleMediaComponent;
