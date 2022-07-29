sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sapui5agendar/scovisualizarordentrabajo_html/utils/utils",
    "sapui5agendar/scovisualizarordentrabajo_html/model/models",
    "sap/ui/core/routing/History"
], function (Controller, utils, models, History) {
    "use strict";

    return Controller.extend("sapui5agendar.scovisualizarordentrabajo_html.controller.Root", {

        _ejecutarF4IF: function (name, options, campoCodigo, campoDescripcion, campoDescripcionAdicional, success) {
            utils.httpCall({
                service: 'ZFDT_RFC_F4IF_SELECT_VALUES',
                query: {
                    CALL_SHLP_EXIT: '',
                    SORT: 'X',
                    MAXROWS: (name === 'BBPH_DEBITOR_GENERAL' ? 9999 : 999999),
                    SHLP: {
                        SHLPNAME: name,
                        SHLPTYPE: 'SH',
                        SELOPT: options
                    }
                },
                type: 'POST',
                success: function (result) {
                    let salida = [];
                    if (result.RECORD_TAB.length > 0) {
                        let cInicio = 0, cLargo = 0, dInicio = 0, dLargo = 0, daInicio = 0, daLargo = 0;

                        for (var i = 0; i < result.RECDESCR_TAB.length; i++) {
                            let field = result.RECDESCR_TAB[i];

                            if (field.FIELDNAME === campoCodigo) {
                                cInicio = parseInt(field.OFFSET);
                                cLargo = parseInt(field.LENG);
                            }

                            if (field.FIELDNAME === campoDescripcion) {
                                dInicio = parseInt(field.OFFSET);
                                dLargo = parseInt(field.LENG);
                            }

                            if (campoDescripcionAdicional && field.FIELDNAME === campoDescripcionAdicional) {
                                daInicio = parseInt(field.OFFSET);
                                daLargo = parseInt(field.LENG);
                            }
                        }

                        let cod = "", desc = "", descA = "";

                        for (var i = 0; i < result.RECORD_TAB.length; i++) {

                            let fila = result.RECORD_TAB[i].STRING;

                            if ((cInicio + cLargo) > fila.length) {
                                cod = fila.substring(cInicio, fila.length);
                            } else {
                                cod = fila.substring(cInicio, cInicio + cLargo);
                            }

                            if ((dInicio + dLargo) > fila.length) {
                                desc = fila.substring(dInicio, fila.length);
                            } else {
                                desc = fila.substring(dInicio, dInicio + dLargo);
                            }

                            if (campoDescripcionAdicional) {
                                if ((daInicio + daLargo) > fila.length) {
                                    descA = fila.substring(daInicio, fila.length);
                                } else {
                                    descA = fila.substring(daInicio, daInicio + daLargo);
                                }

                                salida.push({
                                    cod: cod.trim(),
                                    desc: desc.trim() + ' ' + descA.trim()
                                });
                            } else {
                                salida.push({
                                    cod: cod.trim(),
                                    desc: desc.trim()
                                });
                            }
                        }
                    }
                    success(salida);
                }
            });
        },
        /**
         * Generic dialog function
         */
        openDialog: function (fragment, result) {
            let model = this.getView().getModel();
            let oView = this.getView();
            for (var i = 0; this['openedDialog' + i] && !this['openedDialog' + i].bIsDestroyed; i++);
            let dialog = 'openedDialog' + i;
            model.setProperty("/" + dialog, result || {});

            this[dialog] = sap.ui.xmlfragment(oView.getId(), "sapui5agendar.scovisualizarordentrabajo_html.view." + fragment, this);
            oView.addDependent(this[dialog]);
            this[dialog].bindElement("/" + dialog);

            //Cargo modelo limpio
            if (this['clearDialogModel_' + fragment])
                this['clearDialogModel_' + fragment]();

            utils.view = this[dialog];

            this[dialog].open();
        },
        closeDialog: function () {
            for (var i = 0; this['openedDialog' + i] && !this['openedDialog' + i].bIsDestroyed; i++);
            let dialog = 'openedDialog' + (i - 1);
            this[dialog].close();
            this[dialog].destroy();
            utils.view = this[this.getCurrentDialogModel()] || this.getView();
        },
        getCurrentDialogModel: function () {
            for (var i = 0; this['openedDialog' + i] && !this['openedDialog' + i].bIsDestroyed; i++);
            return 'openedDialog' + (i - 1);
        },
        clearDialogModel_: function (cleanModel) {
            let model = this.getView().getModel();
            model.setProperty('/' + this.getCurrentDialogModel(), cleanModel)
        },
        getFromCurrentDialog: function (path) {
            let model = this.getView().getModel();
            return model.getProperty(`/${this.getCurrentDialogModel()}/${path}`);
        },
        setToCurrentDialog: function (path, data) {
            let model = this.getView().getModel();
            return model.setProperty(`/${this.getCurrentDialogModel()}/${path}`, data);
        },

        /**
         * Init
         */
        onInit: function () {
            this._basicInit();
        },
        _basicInit: function () {
            let model = models.createLocalModel();
            let view = this.getView();
            this.model = model;
            model.setProperty('/filters', {});
            view.setModel(model);
            utils.view = view;
            utils.controller = this;

            this._rol = this.getAppParam('rol', 'ROL_MON_SP_0210');

            this._oMessagePopover = new sap.m.MessagePopover({
                items: {
                    path: "message>/",
                    template: new sap.m.MessageItem({
                        description: "{message>description}",
                        type: "{message>type}",
                        title: "{message>message}"
                    })
                }
            });
            this.getView().addDependent(this._oMessagePopover);

            this.set('/callbackMessages', []);
        },

        /**
         * Other
         */
        getAppParam: function (param, defaultVal) {
            let ownerComponent = this.getOwnerComponent();
            let oComponentData = ownerComponent.getComponentData();
            let val = defaultVal;
            if (oComponentData && oComponentData.startupParameters[param] && oComponentData.startupParameters[param]) {
                val = oComponentData.startupParameters[param][0];
            } else {
                try {
                    let sParametros = window.location.href.split(param + "=");
                    val = sParametros[1].split("&")[0];
                } catch (ex) {
                }
            }
            return val;
        },
        get: function (path) {
            return this.model.getProperty(path);
        },
        set: function (path, value) {
            return this.model.setProperty(path, value);
        },


        handleBack: function () {

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("master", true);
            /*
                        let button = sap.ui.getCore().byId("backBtn");
                        if (button) {
                            sap.ui.getCore().byId("backBtn").onclick();
                        } else {
                            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                            oRouter.navTo("", true);
                        }
            */

        },


        /**
         * Error handling
         */
        handleMessagePopoverPress: function (oEvent) {
            this._oMessagePopover.openBy(oEvent.getSource());
        },
        addMessage: function (msg, type, openTray) {
            type = type || 'e';
            openTray = openTray !== undefined ? openTray : false;
            switch (type.toLowerCase()) {
                case 'w':
                    type = sap.ui.core.MessageType.Warning;
                    break;
                case 'i':
                    type = sap.ui.core.MessageType.Information;
                    break;
                case 'n':
                    type = sap.ui.core.MessageType.None;
                    break;
                case 's':
                    type = sap.ui.core.MessageType.Success;
                    break;
                case 'e':
                    type = sap.ui.core.MessageType.Error;
                    break;
                default:
                    type = sap.ui.core.MessageType.None;
            }
            sap.ui.getCore().getMessageManager().addMessages(
                new sap.ui.core.message.Message({
                    message: msg,
                    type
                })
            );
            if (openTray)
                setTimeout(() => this._oMessagePopover.openBy(this.byId('errorPopover')), 0);
        },

        _getOpenedDialogName: function () {
            let dialog = '';
            for (var i = 0; this['openedDialog' + i] && !this['openedDialog' + i].bIsDestroyed; i++) {
                dialog = 'openedDialog' + i;
            }

            return dialog;
        },

        _getOpenedDialogProperty: function () {
            let dialog = this._getOpenedDialogName();
            let property = this.get('/' + dialog);
            return property;
        },

        _accionesBloqueo: function (accion, tipoDoc, nroDoc, success) {
            let that = this;
            utils.httpCall({
                service: 'Z353R_BLOQUEO_USUARIO',
                query: {
                    I_TIPO_DOCUMENTO: tipoDoc,
                    I_ACCION: accion,
                    I_DOCUMENTO: nroDoc,
                    I_USUARIO: utils.getUser()
                },
                type: 'POST',
                success: function (result) {
                    if (result.E_RETURN.TYPE === 'E') {
                        that.addMessage(result.E_RETURN.MESSAGE, 'E');
                    } else if (typeof success === 'function') {
                        success();
                    }
                }
            });
        },

        _bloquearDocumento: function (tipoDoc, nroDoc, success) {
            this._accionesBloqueo('B', tipoDoc, nroDoc, success);
        },

        _desbloquearDocumento: function (tipoDoc, nroDoc, success) {
            this._accionesBloqueo('D', tipoDoc, nroDoc, success);
        },

        _consultaBloqueo: function (tipoDoc, nroDoc, unlocked) {
            this._accionesBloqueo('C', tipoDoc, nroDoc, unlocked);
        },

        _resizeTableColumns: function (tId, success) {
            let table = this.byId(tId);
            setTimeout(function () {
                let columns = table.getColumns();
                //de fin a inicio evita que el scroll se corra a la última columna
                for (var i = columns.length - 1; i >= 0; i--) {
                    table.autoResizeColumn(i);
                }
                if (typeof success === 'function') {
                    success();
                }
            }, 50);
        },

        _esJefeTaller: function (success, error) {
            var that = this;
            var esJefe = false;
            if (esJefe) {
                if (typeof success === 'function') {
                    success();
                }
            } else {
                if (typeof error === 'function') {
                    error();
                }
            }

            /*
            utils.getUserData(function (user) {
                var certsp = user.T_DATEMPR.filter(function (d) {
                    return d.ID_TIPO === 'CERTSP' && d.DEFECTO === 'X';
                }).VALOR;
                var esJefe = false;
                if (certsp) {
                    esJefe = certsp.toUpperCase() === 'SI';
                } else {
                    that.addMessage('No posee autorización para imprimir certificado.', 'E');
                    esJefe = false;
                }
                if (esJefe) {
                    if (typeof success === 'function') {
                        success();
                    }
                } else {
                    if (typeof error === 'function') {
                        error();
                    }
                }
            });

            */
        },

        _messageManager: function (messages, succesCallback, errorCallback) {
            let that = this;
            let success = true;
            let callback = false;
            messages.forEach(m => {
                if (m.TYPE == "S") {
                    if (messages.length > 1) {
                        that.addMessage(m.MESSAGE, m.TYPE);
                    } else {
                        callback = true;
                        sap.m.MessageBox.success(m.MESSAGE, {
                            title: "Éxito", onClose: function () {
                                if (typeof succesCallback === 'function') {
                                    succesCallback();
                                }
                            }
                        });
                    }
                } else if (m.TYPE !== '') {
                    if (m.TYPE === 'E') {
                        success = false;
                    }
                    that.addMessage(m.MESSAGE, m.TYPE);
                }
            });

            if ((success || messages.length === 0) && typeof succesCallback === 'function' && !callback) {
                succesCallback();
            } else if (typeof errorCallback === 'function' && !callback) {
                errorCallback();
            }
        },
    });

});