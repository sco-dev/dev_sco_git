// @ts-nocheck
sap.ui.define([
    "sapui5agendar/sco00mantenedorcliente_html/controller/EditForm.controller",
    "sapui5agendar/sco00mantenedorcliente_html/utils/utils",
    "sapui5agendar/sco00mantenedorcliente_html/model/models",
    "sapui5agendar/sco00mantenedorcliente_html/utils/validator",
], function (Controller, utils, models, Validator) {
    "use strict";

    return Controller.extend("sapui5agendar.sco00mantenedorcliente_html.controller.Create", {

        _basicInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("create").attachMatched(this._onRouteMatched, this);
        },

        _initCreate() {
            let that = this;
            this._fragmentInit();
            this.set('/Modo', 'C');
            this.set('/DatosGenerales/i_Pais', 'CL');

            /*
            utils.getUserData(function (data) {
                let unidadNegocio = data.T_DATEMPR.find(function (d) { return d.DEFECTO === 'X' && d.ID_TIPO === 'UNNEG'; }).VALOR;
                if (unidadNegocio === 'NS01') {
                    that.set('/DatosGenerales/i_GrupoCliente', 'PB');
                    that.set('/DatosGenerales/ReadonlyGrupoCliente', true);
                } else {
                    that.set('/DatosGenerales/i_GrupoCliente', '00');
                    that.set('/DatosGenerales/ReadonlyGrupoCliente', false);
                }
            });

            */
            this.set('/DatosGenerales/i_GrupoCliente', '00');
            this.set('/DatosGenerales/i_EsquemaCliente', '1');
            this.set('/DatosGenerales/i_ListaPrecio', '02');
        },

        _onRouteMatched: function (oEvent) {
            var rut = localStorage['rut'];
            Object.keys(localStorage).forEach(function (key) {
                if (key == 'rut') {
                    localStorage.removeItem(key);
                }
            });

            if (typeof rut === 'undefined') {
                this.handleBack();
            } else {
                let validator = new Validator();
                validator.validate(this.byId("app"));
                this._initCreate();
                this.set('/DatosGenerales/Rut', rut);
            }
        },

        handleSave: function () {

            // Mensaje para guardar la información....

            sap.m.MessageBox.success("Se ha creado el cliente con éxito", { title: "Éxito" });

            /*
                        let model = this.getView().getModel();
                        let that = this;
            
                        let validator = new Validator();
                        let valid = validator.validate(this.byId("formCliente"));
                        if (valid) {
                            utils.getUserData(function (userData) {
                                let oFilters = {
                                    T_KNA1: {
                                        KUNNR: that.get('/DatosGenerales/Rut'),
                                        COUNC: that.get('/DatosGenerales/i_Ciudad'),
                                        CITYC: that.get('/DatosGenerales/i_Comuna'),
                                        LAND1: that.get('/DatosGenerales/i_Pais'),
                                        BRSCH: '0001',
                                        BRAN1: '0001',
                                        KUKLA: '00',
                                        REGIO: that.get('/DatosGenerales/i_Region'),
                                        KTOKD: that.get('/DatosGenerales/i_GrupoCuenta'),
                                        TELF2: that.get('/DatosGenerales/TelefonoMovil'),
                                        ERNAM: utils.getUser()
                                    },
                                    T_BAPIADDR1: {
                                        TEL1_NUMBR: that.get('/DatosGenerales/Telefono'),
                                        FORMOFADDR: that.get('/DatosGenerales/i_Tratamiento'),
                                        TEL1_EXT: that.get('/DatosGenerales/Anexo'),
                                        NAME: that.get('/DatosGenerales/Nombres'),
                                        NAME_2: that.get('/DatosGenerales/Apellidos'),
                                        HOUSE_NO: that.get('/DatosGenerales/Numero'),
                                        ADR_NOTES: that.get('/DatosGenerales/Comentarios'),
                                        E_MAIL: that.get('/DatosGenerales/Email'),
                                        STREET: that.get('/DatosGenerales/Direccion'),
                                        STR_SUPPL3: that.get('/DatosGenerales/Giro'),
                                        SORT1: that.get('/DatosGenerales/Rut'),
                                        SORT2: '',
                                        LANGU: 'S',
                                        COUNTRY: that.get('/DatosGenerales/i_Pais'),
                                        REGION: that.get('/DatosGenerales/i_Region')
                                    },
                                    T_KNVV: {
                                        KALKS: that.get('/DatosGenerales/i_EsquemaCliente'),
                                        KDGRP: that.get('/DatosGenerales/i_GrupoCliente'),
                                        PLTYP: that.get('/DatosGenerales/i_ListaPrecio'),
                                        VKGRP: (userData.T_DATEMPR.find(x => (x.ID_TIPO === 'VKGRP' && x.DEFECTO === 'X'))) ? userData.T_DATEMPR.find(x => (x.ID_TIPO === 'VKGRP' && x.DEFECTO === 'X')).VALOR : "",
                                        VKBUR: (userData.T_DATEMPR.find(x => (x.ID_TIPO === 'VKBUR' && x.DEFECTO === 'X'))) ? userData.T_DATEMPR.find(x => (x.ID_TIPO === 'VKBUR' && x.DEFECTO === 'X')).VALOR : "",
                                        VKORG: (userData.T_DATEMPR.find(x => (x.ID_TIPO === 'VKORG' && x.DEFECTO === 'X'))) ? userData.T_DATEMPR.find(x => (x.ID_TIPO === 'VKORG' && x.DEFECTO === 'X')).VALOR : "",
                                        VTWEG: (userData.T_DATEMPR.find(x => (x.ID_TIPO === 'VTWEG' && x.DEFECTO === 'X'))) ? userData.T_DATEMPR.find(x => (x.ID_TIPO === 'VTWEG' && x.DEFECTO === 'X')).VALOR : "",
                                        SPART: (userData.T_DATEMPR.find(x => (x.ID_TIPO === 'SPART' && x.DEFECTO === 'X'))) ? userData.T_DATEMPR.find(x => (x.ID_TIPO === 'SPART' && x.DEFECTO === 'X')).VALOR : ""
                                    },
                                    T_ACTUALIZ: 'I'
                                };
                                /*
                                                    utils.httpCall({
                                                        service: "ZNW_CLIENTES_VENDOR",
                                                        query: oFilters,
                                                        type: "post",
                                                        success: function (result, status, xhr) {
                                                            result.T_RETURN.forEach(m => {
                                                                if (m.TYPE == "S") {
                                                                    that.set('/EditEnabled', false);
                                
                                                                    if (result.T_RETURN.length > 1) {
                                                                        that.addMessage(m.MESSAGE, (m.TYPE != 'Z' ? m.TYPE : 'E'));
                                                                    } else {
                                                                        sap.m.MessageBox.success(m.MESSAGE, { title: "Éxito" });
                                                                    }
                                                                } else {
                                                                    that.addMessage(m.MESSAGE, (m.TYPE != 'Z' ? m.TYPE : 'E'));
                                                                }
                                                            });
                                                        }
                                                    });
                                
        });
}

*/
        },

        handleUpdate: function () {

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            localStorage['rut'] = this.get('/filters/Cliente');
            oRouter.navTo("update");
            /*
                        let that = this;
                        let validator = new Validator();
                        let valid = validator.validate(this.byId("filters"));
            
                        if (valid) {
                            let status = this._userStatus();
                            switch (status) {
                            case 'E':
                                sap.m.MessageBox.warning(
                                    "No se ha encontrado el cliente " + this.get('/filters/Cliente') + ". ¿Desea crearlo?", {
                                        actions: ["Crear", "Cancelar"],
                                        styleClass: "sapUiSizeCompact",
                                        onClose: function (sAction) {
                                            if (sAction === 'Crear') {
                                                that.handleCreate();
                                            }
                                        }
                                    }
                                );
                                break;
                            case 'S':
                                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                                localStorage['rut'] = this.get('/filters/Cliente');
                                oRouter.navTo("update");
                                break;
                            case 'Z':
                                this.addMessage("El cliente " + this.get('/filters/Cliente') + " no puede ser modificado (Grupo cuenta).", "W");
                                break;
                            }
                        }
            
                    }   
                    
                    */


        }

    });

});