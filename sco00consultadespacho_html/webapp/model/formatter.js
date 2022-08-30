sap.ui.define([], function () {
	"use strict";
	return {
		stateText: function (e) {
			var t;
			switch (e) {
			case 1:
				t = "Activo";
				break;
			case 0:
				t = "Inactivo";
				break
			}
			return t
		},
		stateValue: function (e) {
			var t;
			switch (e) {
			case 1:
				t = "Success";
				break;
			case 0:
				t = "Error";
				break
			}
			return t
		}
	}
});