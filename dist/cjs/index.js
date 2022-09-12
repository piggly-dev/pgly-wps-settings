"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PglyToast = exports.PglyNotification = exports.PglyAsyncFormEngine = exports.PglyGroupFormComponent = exports.PglyMultipleMediaComponent = exports.PglySingleMediaComponent = exports.PglySelectComponent = exports.PglyTextAreaComponent = exports.PglyFinderComponent = exports.PglyCheckboxComponent = exports.PglyInputComponent = void 0;
var form_1 = require("./forms/form");
Object.defineProperty(exports, "PglyAsyncFormEngine", { enumerable: true, get: function () { return form_1.PglyAsyncFormEngine; } });
var input_1 = __importDefault(require("./forms/input"));
exports.PglyInputComponent = input_1.default;
var checkbox_1 = __importDefault(require("./forms/checkbox"));
exports.PglyCheckboxComponent = checkbox_1.default;
var finder_1 = __importDefault(require("./forms/finder"));
exports.PglyFinderComponent = finder_1.default;
var select_1 = __importDefault(require("./forms/select"));
exports.PglySelectComponent = select_1.default;
var singlemedia_1 = __importDefault(require("./forms/singlemedia"));
exports.PglySingleMediaComponent = singlemedia_1.default;
var multiplemedia_1 = __importDefault(require("./forms/multiplemedia"));
exports.PglyMultipleMediaComponent = multiplemedia_1.default;
var group_1 = require("./forms/group");
Object.defineProperty(exports, "PglyGroupFormComponent", { enumerable: true, get: function () { return group_1.PglyGroupFormComponent; } });
var textarea_1 = __importDefault(require("./forms/textarea"));
exports.PglyTextAreaComponent = textarea_1.default;
var notification_1 = __importDefault(require("./components/notification"));
exports.PglyNotification = notification_1.default;
var toaster_1 = __importDefault(require("./components/toaster"));
exports.PglyToast = toaster_1.default;
// import PglyAsync from './behaviours/async';
// import { PglyCheckbox, handlePglyCheckbox } from './forms/checkbox';
// import {
// 	PglyNotification,
// 	handlePglyNotifications,
// } from './components/notification';
// import PglyToast from './components/toaster';
// import PglySelectComponent from './forms/select';
// import PglyFinderComponent from './forms/finder';
// (window as any).PglyWpsToast = PglyToast;
// (window as any).PglyWpsNotification = PglyNotification;
// (window as any).PglyWpsAsync = PglyAsync;
// (window as any).PglyWpsCheckbox = PglyCheckbox;
// (window as any).PglySelectComponent = PglySelectComponent;
// (window as any).PglyFinderComponent = PglyFinderComponent;
// // Track all notification close buttons
// document.addEventListener('DOMContentLoaded', () => {
// 	// Track all notifications
// 	handlePglyNotifications();
// 	// Track all checkboxes
// 	handlePglyCheckbox();
// });
