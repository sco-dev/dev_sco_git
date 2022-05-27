sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sapui5agendar/sco00crearanticipo_html/model/models",
	"sapui5agendar/sco00crearanticipo_html/customelements/ExtendedString",
	"sapui5agendar/sco00crearanticipo_html/customelements/ExtendedDate"
], function(UIComponent, Device, models, ExtendedString, ExtendedDate) {
	"use strict";

	return UIComponent.extend("sapui5agendar.sco00crearanticipo_htm.Component", {

		metadata: {
			manifest: "json",
			handleValidation: true
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// set the messaging model
			var oMessageModel = sap.ui.getCore().getMessageManager().getMessageModel();
			oMessageModel.setData({});
			this.setModel(oMessageModel, "message");
			//set enums model
			this.setModel(models.createDeviceModel(), "enums");
		}
	});

});