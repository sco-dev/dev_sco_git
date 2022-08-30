// @ts-nocheck
/* global moment:true */
sap.ui.define([
    
], function() {
    "use strict";
    return {
        FechaHoraToString: function(date) {
            return moment(date).format('DD/MM/YYYY hh:mm:ss');
        },
        FechaToString: function(date) {
            return moment(date).format('DD/MM/YYYY');
        }
    };
});