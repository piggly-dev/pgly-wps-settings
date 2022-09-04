import PglyAsync from './behaviours/async';
import { PglyCheckbox, handlePglyCheckbox } from './forms/checkbox';
import {
	PglyNotification,
	handlePglyNotifications,
} from './components/notification';
import PglyToast from './components/toaster';
import PglySelectComponent from './forms/select';
import PglyFinderComponent from './forms/finder';

(window as any).PglyWpsToast = PglyToast;
(window as any).PglyWpsNotification = PglyNotification;
(window as any).PglyWpsAsync = PglyAsync;
(window as any).PglyWpsCheckbox = PglyCheckbox;
(window as any).PglySelectComponent = PglySelectComponent;
(window as any).PglyFinderComponent = PglyFinderComponent;

// Track all notification close buttons
document.addEventListener('DOMContentLoaded', () => {
	// Track all notifications
	handlePglyNotifications();
	// Track all checkboxes
	handlePglyCheckbox();
});
