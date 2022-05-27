// @ts-nocheck
sap.ui.define([
    "sap/ui/model/type/String",
    "sap/ui/model/SimpleType",
    'sap/ui/model/ValidateException'
], function (String, SimpleType, ValidateException) {
    "use strict";

    var stringValidateValue = String.prototype.validateValue;

    /**
     * Valida la correctitud del digito verificador del RUT chileno
     */
    let validarRut = function (rut) {
        var dVerif = rut.split("-")[1],
            multiplos = [2, 3, 4, 5, 6, 7];
        rut = rut.split("-")[0].split("").reverse();

        var suma = 0;
        for (var i in rut) {
            suma += rut[i] * multiplos[i % 6];
        }
        suma = suma % 11;
        suma = 11 - suma;

        if (suma == 11)
            return dVerif == 0;
        else if (suma == 10)
            return dVerif == "k" || dVerif == "K";
        else
            return dVerif == suma;
    };


    return String.extend("sapui5agendar.sco00grafocup_html.customelements.ExtendedString", {
        constructor: function () {
            SimpleType.apply(this, arguments);
            this.sName = "String";
        },

        validateValue: function (value) {
            stringValidateValue.apply(this, [value]);

            if (this.oConstraints) {
                var aViolatedConstraints = [],
                    aMessages = [];
                jQuery.each(this.oConstraints, function (sName, oContent) {
                    switch (sName) {
                        case "regex":
                            let regex = new RegExp(oContent.regex);
                            if(!regex.test(value)){
                                aViolatedConstraints.push('regex');
                                aMessages.push(oContent.text);
                            }
                            break;
                        case "type":
                            switch (oContent) {
                                case "optionalRut":
                                case "rut":
                                    if((oContent != 'optionalRut' || oContent == 'optionalRut' && value) && !validarRut(value)) {
                                        aViolatedConstraints.push('type');
                                        aMessages.push("Rut inválido");
                                    }
                                    break;
                                case "date":
                                    if (!validarRut(value)) {
                                        aViolatedConstraints.push('type');
                                        aMessages.push("Rut inválido");
                                    }
                                    break;
                                case "optionalEmail":
                                case "email":
                                    let mailregex = /^\w+[\w-+.]*@\w+([-.]\w+)*\.[a-zA-Z]{2,}$/;

                                    if ((oContent != 'optionalEmail' || oContent == 'optionalEmail' && value) && !mailregex.test(value)) {
                                        aViolatedConstraints.push('type');
                                        aMessages.push("Email inválido");
                                    }
                                    break;
                                case "optionalInt":
                                    if (value && (parseInt(value).toString() !== value.replace(/^0+/,""))) {
                                        aViolatedConstraints.push('type');
                                        aMessages.push("Número inválido");
                                    }
                                    break;
                                case "required":
                                    if(value == null || value.trim() == ''){
                                        aViolatedConstraints.push('type');
                                        aMessages.push("Ingrese un valor");
                                    }
                                    break;
                                case "requiredSelect":
                                    if(value == null || value.trim() == ''){
                                        aViolatedConstraints.push('type');
                                        aMessages.push("Seleccione una opción");
                                    }
                                    break;
                                case "optionalPhone":
                                case "phone":
                                    let regex = /^[0-9]{9}$/;

                                    if((oContent != 'optionalPhone' || oContent == 'optionalPhone' && value) && !regex.test(value)){
                                        aViolatedConstraints.push('type');
                                        aMessages.push('Teléfono inválido');
                                    }
                                    break;
                                default:
                                    aViolatedConstraints.push('type');
                                    aMessages.push("Validacion de tipo inválido:" + oContent);
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