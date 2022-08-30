
sap.ui.define([
    
], function() {
    "use strict";
    return {
        success: function(mensaje,data) {
            return {
                c: "s",
                m : mensaje,
                data : data
            };
        },
        error: function(mensaje,error) {
            return {
                c: "e",
                m : mensaje,
                data : error
            };
        },
        merror: function(mensaje,errors) {
            return {
                c: "me",
                m : mensaje,
                data : errors
            };
        },
        exception: function(mensaje,errors) {
            return {
                c: "ex",
                m : mensaje,
                data : errors
            };
        }
    };
});