// @ts-nocheck
sap.ui.define([
    "sap/ui/model/type/Date",
    "sap/ui/model/SimpleType",
    'sap/ui/model/ValidateException'
], function (Type, SimpleType, ValidateException) {
    "use strict";

    var originalValidateValue = Type.prototype.validateValue;

    return Type.extend("sapui5agendar.sco00consultadoctribu_html.customelements.ExtendedDate", {
        constructor: function () {
            SimpleType.apply(this, arguments);
            this.sName = "Date";
        },

        validateValue: function (oValue) {
            originalValidateValue.apply(this, [oValue]);

            if (this.oConstraints) {
                var aViolatedConstraints = [],
                    aMessages = [],
                    oInputFormat = this.oInputFormat,
                    that = this;

                // convert date into date object to compare
                if (oInputFormat && this.oFormatOptions.source.pattern != "timestamp") {
                    oValue = oInputFormat.parse(oValue);
                }

                jQuery.each(this.oConstraints, function(sName, oContent) {
                    switch (sName) {
                        case "required":
                            if (oContent==='true' && !oValue) {
                                aViolatedConstraints.push("required");
                                aMessages.push('Debes ingresar una fecha válida');
                            }
                            break;
                    }
                });
                if (aViolatedConstraints.length > 0) {
                    throw new ValidateException(aMessages.join(" "), aViolatedConstraints);
                }
            }
        }
    });
});