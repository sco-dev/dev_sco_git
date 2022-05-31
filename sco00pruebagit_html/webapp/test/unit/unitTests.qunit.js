/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sapui5agendar/sco00pruebagit_html/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
