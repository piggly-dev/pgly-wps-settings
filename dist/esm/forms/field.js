var PglyField = /** @class */ (function () {
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
            label: this._label,
        });
    };
    PglyField.prototype.get = function () {
        return this._value;
    };
    return PglyField;
}());
export default PglyField;
