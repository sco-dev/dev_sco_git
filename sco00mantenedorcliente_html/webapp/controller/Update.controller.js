// @ts-nocheck
sap.ui.define([
    "sapui5agendar/sco00mantenedorcliente_html/controller/EditForm.controller",
    "sapui5agendar/sco00mantenedorcliente_html/utils/utils",
    "sapui5agendar/sco00mantenedorcliente_html/model/models",
    "sapui5agendar/sco00mantenedorcliente_html/utils/validator",
], function (Controller, utils, models, Validator) {
    "use strict";

    return Controller.extend("sapui5agendar.sco00mantenedorcliente_html.controller.Update", {
        _basicInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("update").attachMatched(this._onRouteMatched, this);
        },

        _initUpdate(rut) {
            let that = this;
            this._fragmentInit();
            this.set('/Modo', 'U');
            /*
                        let oFilters = {
                            T_KNA1: {
                                KUNNR: rut
                            },
                            T_BAPIADDR1: {},
                            T_KNVV: {},
                            T_ACTUALIZ: 'S'
                        };
            
                        */
            //       let cliente = localStorage['rut'];

      //      $.when(that._opcionesLoaded).done(function () {

                this.set('/DatosGenerales/Rut', rut);
                this.set('/DatosGenerales/i_Ciudad', 'Ciudad 1');
                this.set('/DatosGenerales/i_Comuna', 'Comuna 1');
                this.set('/DatosGenerales/i_Pais', 'Pais 1');
                this.set('/DatosGenerales/i_Region', 'Region 1');
                this.set('/DatosGenerales/i_GrupoCuenta', '01');
                this.set('/DatosGenerales/TelefonoMovil', '591565987');
                this.set('/DatosGenerales/i_Tratamiento', 'Tratamiento 1');

                this.set('/DatosGenerales/Nombres', 'Alvaro');
                this.set('/DatosGenerales/Apellidos', 'Gomez');

                that.set('/DatosGenerales/Telefono', '591565987');
                that.set('/DatosGenerales/Anexo', '501');
                that.set('/DatosGenerales/Numero', '38');
                that.set('/DatosGenerales/Comentarios', 'Cliente Premium');
                that.set('/DatosGenerales/Email', 'cliente1@gmail.com');
                that.set('/DatosGenerales/Direccion', 'Las condes, Chile');
                that.set('/DatosGenerales/Giro', 'Frente al CC La Cascada');

                that.set('/DatosGenerales/i_Pais', 'Pais 1');
                that.set('/DatosGenerales/i_Region', 'Region 1');
                that.set('/DatosGenerales/i_EsquemaCliente', '01');
                that.set('/DatosGenerales/i_GrupoCliente', '01');
                that.set('/DatosGenerales/i_ListaPrecio', '01');

    //        });
            /*
                        utils.httpCall({
                            service: "ZNW_CLIENTES_VENDOR",
                            query: oFilters,
                            type: "post",
                            success: function (result, status, xhr) {
                                $.when(that._opcionesLoaded).done(function () {
                                    that.set('/DatosGenerales/Rut', result.E_KNA1.KUNNR);
                                    that.set('/DatosGenerales/i_Ciudad', result.E_KNA1.COUNC);
                                    that.set('/DatosGenerales/i_Comuna', result.E_KNA1.CITYC);
                                    that.set('/DatosGenerales/i_Pais', result.E_KNA1.LAND1);
                                    that.set('/DatosGenerales/i_Region', result.E_KNA1.REGIO);
                                    that.set('/DatosGenerales/i_GrupoCuenta', result.E_KNA1.KTOKD);
                                    that.set('/DatosGenerales/TelefonoMovil', result.E_KNA1.TELF2);
            
                                    let tratamientos = that.get('/Opciones/Tratamientos');
                                    tratamientos.forEach(function (t) {
                                        if (t.TITLE_MEDI == result.E_KNA1.ANRED) {
                                            that.set('/DatosGenerales/i_Tratamiento', t.TITLE);
                                        }
                                    });
            
                                    that.set('/DatosGenerales/Nombres', result.E_KNA1.NAME1);
                                    that.set('/DatosGenerales/Apellidos', result.E_KNA1.NAME2);
            
                                    that.set('/DatosGenerales/Telefono', result.E_BAPIADDR1.TEL1_NUMBR);
                                    that.set('/DatosGenerales/Anexo', result.E_BAPIADDR1.TEL1_EXT);
                                    that.set('/DatosGenerales/Numero', result.E_BAPIADDR1.HOUSE_NO);
                                    that.set('/DatosGenerales/Comentarios', result.E_BAPIADDR1.ADR_NOTES);
                                    that.set('/DatosGenerales/Email', result.E_BAPIADDR1.E_MAIL);
                                    that.set('/DatosGenerales/Direccion', result.E_BAPIADDR1.STREET);
                                    that.set('/DatosGenerales/Giro', result.E_BAPIADDR1.STR_SUPPL3);
                                    //that.set('/DatosGenerales/Rut', result.E_BAPIADDR1.SORT1);
                                    that.set('/DatosGenerales/i_Pais', result.E_BAPIADDR1.COUNTRY);
                                    that.set('/DatosGenerales/i_Region', result.E_BAPIADDR1.REGION);
                                    that.set('/DatosGenerales/i_EsquemaCliente', result.E_KNVV.KALKS);
                                    that.set('/DatosGenerales/i_GrupoCliente', result.E_KNVV.KDGRP);
                                    that.set('/DatosGenerales/i_ListaPrecio', result.E_KNVV.PLTYP);
                                });
                            }
                        });
            
                        */

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
                //               let validator = new Validator();
                //               validator.validate(this.byId("app"));
                this._initUpdate(rut);
            }
        },

        handleSave: function () {

            sap.m.MessageBox.success('El cliente fue modificado', {
                title: "Éxito"
            });

            /*
            let model = this.getView().getModel();
            let that = this;

            let validator = new Validator();
            let valid = validator.validate(this.byId("formCliente"));
            if (valid) {
                utils.getUserData(function (userData) {
                    let oFilters = {
                        T_KNA1: {
                            KUNNR: that.get('/DatosGenerales/Rut')
                        },
                        T_BAPIADDR1: {},
                        T_KNVV: {},
                        T_ACTUALIZ: 'S'
                    };

                    utils.httpCall({
                        service: "ZNW_CLIENTES_VENDOR",
                        query: oFilters,
                        type: "post",
                        success: function (result, status, xhr) {

                            let oFilters = {
                                T_KNA1: {
                                    KUNNR: that.get('/DatosGenerales/Rut'),
                                    COUNC: that.get('/DatosGenerales/i_Ciudad'),
                                    CITYC: that.get('/DatosGenerales/i_Comuna'),
                                    LAND1: that.get('/DatosGenerales/i_Pais'),
                                    BRSCH: result.E_KNA1.BRSCH,
                                    BRAN1: result.E_KNA1.BRAN1,
                                    KUKLA: result.E_KNA1.KUKLA,
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
                                    SORT2: result.E_BAPIADDR1.SORT2,
                                    LANGU: result.E_BAPIADDR1.LANGU,
                                    COUNTRY: that.get('/DatosGenerales/i_Pais'),
                                    REGION: that.get('/DatosGenerales/i_Region')
                                },
                                T_KNVV: {
                                    KALKS: that.get('/DatosGenerales/i_EsquemaCliente'),
                                    KDGRP: that.get('/DatosGenerales/i_GrupoCliente'),
                                    PLTYP: that.get('/DatosGenerales/i_ListaPrecio'),
                                    VKBUR: result.E_KNVV.VKBUR,
                                    VKGRP: result.E_KNVV.VKGRP,
                                    VKORG: (userData.T_DATEMPR.find(x => (x.ID_TIPO === 'VKORG' && x.DEFECTO === 'X'))) ? userData.T_DATEMPR.find(x => (x.ID_TIPO === 'VKORG' && x.DEFECTO === 'X')).VALOR : "",
                                    VTWEG: (userData.T_DATEMPR.find(x => (x.ID_TIPO === 'VTWEG' && x.DEFECTO === 'X'))) ? userData.T_DATEMPR.find(x => (x.ID_TIPO === 'VTWEG' && x.DEFECTO === 'X')).VALOR : "",
                                    SPART: (userData.T_DATEMPR.find(x => (x.ID_TIPO === 'SPART' && x.DEFECTO === 'X'))) ? userData.T_DATEMPR.find(x => (x.ID_TIPO === 'SPART' && x.DEFECTO === 'X')).VALOR : ""
                                },
                                T_ACTUALIZ: 'U'
                            };

                            utils.httpCall({
                                service: "ZNW_CLIENTES_VENDOR",
                                query: oFilters,
                                type: "post",
                                success: function (result, status, xhr) {
                                    result.T_RETURN.forEach(m => {
                                        if (m.TYPE == "S") {

                                            if (result.T_RETURN.length > 1) {
                                                that.addMessage(m.MESSAGE, (m.TYPE != 'Z' ? m.TYPE : 'E'));
                                            } else {
                                                sap.m.MessageBox.success(m.MESSAGE, {
                                                    title: "Éxito"
                                                });
                                            }
                                        } else {
                                            that.addMessage(m.MESSAGE, (m.TYPE != 'Z' ? m.TYPE : 'E'));
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            }

            */
        }

    });

});