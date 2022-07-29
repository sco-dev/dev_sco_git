sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
	"sapui5agendar/scovisualizarordentrabajo_html/model/models",
    "sapui5agendar/scovisualizarordentrabajo_html/customelements/ExtendedString",
    "sapui5agendar/scovisualizarordentrabajo_html/customelements/ExtendedDate",
    "sapui5agendar/scovisualizarordentrabajo_html/customelements/ExtendedTime"
], function(UIComponent, Device, models, ExtendedString) {
    "use strict";

    return UIComponent.extend("sapui5agendar.scovisualizarordentrabajo_html.Component", {

        metadata: {
            manifest: "json"
        },

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
        init: function () {

            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);
            // enable routing
            this.getRouter().initialize();
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
