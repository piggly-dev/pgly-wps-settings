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
export default EventHandler;
