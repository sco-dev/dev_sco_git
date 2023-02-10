// @ts-nocheck
sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "sapui5agendar/sco00timerecording_html/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("sapui5agendar.sco00timerecording_html.Component", {
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
                var oModel = new sap.ui.model.json.JSONModel();

                try {
                    oModel.setData({
                        tipo: "totem",
                        centro: "1SA1",
                        ptoTrab: "MESECP",
                        trabajador: "12037713",
                        tipoTrab: "c",
                        tecnico: this.oComponentData.startupParameters.tecnico[0],
                        jefe: this.oComponentData.startupParameters.jefe[0]
                    });
    
                } catch (e) {
                    oModel.setData({
                        tipo: "totem",
                        centro: "1SA1",
                        ptoTrab: "MESECP",
                        trabajador: "12037713",
                        tipoTrab: "c"
                        
                    });
                }
                sap.ui.getCore().setModel(oModel, "globalModel");                
            }
        });
    }
);