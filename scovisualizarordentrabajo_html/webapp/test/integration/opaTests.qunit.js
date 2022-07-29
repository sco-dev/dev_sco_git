/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sapui5agendar/scovisualizarordentrabajo_html/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
