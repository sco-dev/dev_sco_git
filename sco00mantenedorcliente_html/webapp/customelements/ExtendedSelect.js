//permite agregar propiedad required para los select
sap.ui.define([
    "sap/m/Select"
], function (Select) {
    "use strict";

    return Select.extend("sapui5agendar.sco00mantenedorcliente_html.customelements.ExtendedSelect", {
        metadata:{
          properties:{
              required : {type : "boolean", group : "Misc", defaultValue : false}
          }
        },
        renderer: {	}
    });
});