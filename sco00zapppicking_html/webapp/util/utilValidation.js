/* global moment:true */
sap.ui.define([
    
], function() {
    "use strict";
    return {
        isPhone: function() {
            return window.innerWidth < 600;
        }
    };
});