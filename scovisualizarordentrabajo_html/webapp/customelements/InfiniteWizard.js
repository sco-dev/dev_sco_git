// @ts-nocheck
sap.ui.define([
    "sap/m/Wizard"
], function(Wizard) {
    "use strict";

    return Wizard.extend("sapui5agendar.scovisualizarordentrabajo_html.customelements.InfiniteWizard", {

        renderer: {},

        addStep: function (wizardStep) {
            this._incrementStepCount();
            return this.addAggregation("steps", wizardStep);
        },


    });
});