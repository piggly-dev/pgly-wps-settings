import PglyAsync from './behaviours/async';
import { PglyCheckbox, handlePglyCheckbox } from './forms/checkbox';
import { PglyNotification, handlePglyNotifications } from './components/notification';
import PglyToast from './components/toaster';

// Track all notification close buttons
document.addEventListener('DOMContentLoaded', () => {
	(window as any).PglyWpsToast = PglyToast;
	(window as any).PglyWpsNotification = PglyNotification;
	(window as any).PglyWpsAsync = PglyAsync;
	(window as any).PglyWpsCheckbox = PglyCheckbox;

	// Track all notifications
	handlePglyNotifications();
	// Track all checkboxes
	handlePglyCheckbox();
});