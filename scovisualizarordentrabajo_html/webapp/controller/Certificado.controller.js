sap.ui.define([
    "sapui5agendar/scovisualizarordentrabajo_html/controller/Root.controller",
    "sapui5agendar/scovisualizarordentrabajo_html/utils/utils",
    "sapui5agendar/scovisualizarordentrabajo_html/model/models",
    "sapui5agendar/scovisualizarordentrabajo_html/utils/validator",
    "sap/ui/generic/app/navigation/service/NavigationHandler",
    "sap/ui/generic/app/navigation/service/NavType",
    "sap/ui/core/routing/History"
], function (Controller, utils, models, Validator, NavigationHandler, NavType) {
    "use strict";

    return Controller.extend("sapui5agendar.scovisualizarordentrabajo_html.controller.Certificado", {

		/**
		 * Init
		 */
        onInit: function () {
            this._basicInit();
        },
        _basicInit: function () {
            var model = models.createLocalModel();
            var view = this.getView();
            this.model = model;
            model.setProperty('/filters', {});
            view.setModel(model);
            utils.view = view;
            utils.controller = this;

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
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("certificado").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            utils.view = this.getView();
            utils.controller = this;

            var that = this;
            var nroOrden = '';
            try {
                nroOrden = JSON.parse(localStorage['NroOrden']);
            } catch (e) {

            }
            Object.keys(localStorage).forEach(function (key) {
                if (key == 'NroOrden') {
                    localStorage.removeItem(key);
                }
            });

            if (nroOrden) {


                let T_AVISO = [];

                T_AVISO.push({
                    AVISO: "67645462",
                    CLASE_AVISO: "MC",
                    CLASE_ORDEN: "ZRMC",
                    CLIENTE: "60910000-1",
                    CL_VEHICULO: "1010",
                    CODI: "",
                    EQUIPO: "3N6BD31A6LK802214R",
                    GRUPO_CODI: "",
                    HOROMTETRO: "",
                    INTERNO: "",
                    MATERIAL: "840695",
                    NOMB_CLIENTE: "UNIVERSIDAD DE CHILE",
                    ODOMETRO: "    49612",
                    ORDEN: "67623011",
                    PATENTE: "LKPW10",
                    STATUS_AVISO: "MECE ORAS",
                    STATUS_ORDEN: "CTEC FENA KKMP NLIQ PREC",
                    TEXTO1: "MONTAJE NEUMATICOS",
                    TEXTO2: "MONTAJE NEUMATICOS",
                    TEXT_AVISO: "",
                    TXT_CLASE: "",
                    TXT_CLASE_VEHI: "Camioneta",
                    TXT_CLIENTE: "UNIVERSIDAD DE CHILE",
                    TXT_CODI: "",
                    TXT_MATERIAL: "NP300 CS 4x2 2.3TDI",
                });

                let T_RETORNO = [];

                T_RETORNO.push({
                    CODE: "",
                    LOG_MSG_NO: "000000",
                    LOG_NO: "",
                    MESSAGE: "Si Existe Aviso 000067645462",
                    MESSAGE_V1: "Si Existe Aviso 000067645462",
                    MESSAGE_V2: "",
                    MESSAGE_V3: "",
                    MESSAGE_V4: "",
                    TYPE: "S"
                });


                let result = {

                    E_ASESOR: "24725178",
                    E_ASESOR_TXT: "VICTOR JAVIER DUARTE",
                    E_CLIENTE: "60910000-1",
                    E_CLIENTE_TXT: " UNIVERSIDAD DE CHILE",
                    E_JEFE: "",
                    E_JEFE_TXT: "",
                    E_SOLICITADO: "",
                    T_AVISO: T_AVISO,
                    T_RETORNO: T_RETORNO,
                    T_TEXTO: [],

                };

                var documento = utils.copyObject(
                    ['AVISO', 'CLASE_AVISO', 'CLASE_ORDEN', 'TEXTO1', 'TEXTO2', 'HOROMTETRO', 'ODOMETRO', 'ORDEN', 'STATUS_AVISO',
                        'STATUS_ORDEN'
                    ], ['Aviso', 'ClaseAviso', 'ClaseOrden', 'DescAviso', 'DescOrden', 'Horometro', 'Odometro', 'Orden', 'StatusAviso',
                    'StatusOrden'
                ],
                    result.T_AVISO[0]
                );

                var objetoReferencia = utils.copyObject(
                    ['EQUIPO', 'MATERIAL', 'PATENTE', 'TXT_MATERIAL', 'CL_VEHICULO', 'TXT_CLASE_VEHI', 'TXT_CLIENTE', 'CLIENTE',
                        'TXT_MATERIAL', 'INTERNO'
                    ], ['Equipo', 'Material', 'Patente', 'MaterialDesc', 'ClaseVehiculo', 'ClaseVehiculoDesc', 'ClienteNombre', 'Cliente',
                    'MaterialDesc', 'NumInterno'
                ],
                    result.T_AVISO[0]
                );

                objetoReferencia.SolicitadoPor = result.E_SOLICITADO;

                var certificado = utils.copyObject(
                    ['CODI', 'TXT_CODI', 'GRUPO_CODI'], ['Codificacion', 'CodificacionDesc', 'CodificacionGrupo'],
                    result.T_AVISO[0]
                );

                var interlocutor = utils.copyObject(
                    ['E_ASESOR', 'E_ASESOR_TXT', 'E_CLIENTE', 'E_CLIENTE_TXT', 'E_JEFE', 'E_JEFE_TXT'], ['Asesor', 'AsesorDesc', 'Cliente',
                    'ClienteDesc', 'Responsable', 'ResponsableDesc'
                ],
                    result
                );

                var notas = utils.copyObjectArray(
                    ['POSNR', 'TEXTO', 'ERNAM', 'ERDAT'], ['NUMERO', 'TEXTO', 'CREADO_POR', 'CREADO_EL'],
                    result.T_TEXTO,
                    false
                );

                var df = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: 'dd/MM/yyyy',
                    source: {
                        pattern: 'dd/MM/yyyy'
                    }
                });
                notas.forEach(function (nota) {
                    nota.CREADO_EL = df.parse(nota.CREADO_EL);
                });

                that.set('/Documento', documento);
                that.set('/ObjetoReferencia', objetoReferencia);
                that.set('/Certificado', certificado);
                that.set('/Interlocutores', interlocutor);
                that.set('/Notas', notas);
                that.set('/i_Nota', -1);

                /*
				utils.httpCall({
					service: 'Z353R_OBTENER_AVISO',
					query: {
						I_ORDEN: nroOrden
					},
					type: 'POST',
					success: function (result) {
						if (!result.T_RETORNO.find(function (r) {
								return r.TYPE === 'E'
							})) {
							var documento = utils.copyObject(
								['AVISO', 'CLASE_AVISO', 'CLASE_ORDEN', 'TEXTO1', 'TEXTO2', 'HOROMTETRO', 'ODOMETRO', 'ORDEN', 'STATUS_AVISO',
									'STATUS_ORDEN'
								], ['Aviso', 'ClaseAviso', 'ClaseOrden', 'DescAviso', 'DescOrden', 'Horometro', 'Odometro', 'Orden', 'StatusAviso',
									'StatusOrden'
								],
								result.T_AVISO[0]
							);

							var objetoReferencia = utils.copyObject(
								['EQUIPO', 'MATERIAL', 'PATENTE', 'TXT_MATERIAL', 'CL_VEHICULO', 'TXT_CLASE_VEHI', 'TXT_CLIENTE', 'CLIENTE',
									'TXT_MATERIAL', 'INTERNO'
								], ['Equipo', 'Material', 'Patente', 'MaterialDesc', 'ClaseVehiculo', 'ClaseVehiculoDesc', 'ClienteNombre', 'Cliente',
									'MaterialDesc', 'NumInterno'
								],
								result.T_AVISO[0]
							);

							objetoReferencia.SolicitadoPor = result.E_SOLICITADO;

							var certificado = utils.copyObject(
								['CODI', 'TXT_CODI', 'GRUPO_CODI'], ['Codificacion', 'CodificacionDesc', 'CodificacionGrupo'],
								result.T_AVISO[0]
							);

							var interlocutor = utils.copyObject(
								['E_ASESOR', 'E_ASESOR_TXT', 'E_CLIENTE', 'E_CLIENTE_TXT', 'E_JEFE', 'E_JEFE_TXT'], ['Asesor', 'AsesorDesc', 'Cliente',
									'ClienteDesc', 'Responsable', 'ResponsableDesc'
								],
								result
							);

							var notas = utils.copyObjectArray(
								['POSNR', 'TEXTO', 'ERNAM', 'ERDAT'], ['NUMERO', 'TEXTO', 'CREADO_POR', 'CREADO_EL'],
								result.T_TEXTO,
								false
							);

							var df = sap.ui.core.format.DateFormat.getDateInstance({
								pattern: 'dd/MM/yyyy',
								source: {
									pattern: 'dd/MM/yyyy'
								}
							});
							notas.forEach(function (nota) {
								nota.CREADO_EL = df.parse(nota.CREADO_EL);
							});

							that.set('/Documento', documento);
							that.set('/ObjetoReferencia', objetoReferencia);
							that.set('/Certificado', certificado);
							that.set('/Interlocutores', interlocutor);
							that.set('/Notas', notas);
							that.set('/i_Nota', -1);
						}
					}
				});

                */
            } else {
                this.handleBack();
            }
        },

        handleOpenCodificacion: function () {
            var that = this;
            utils.httpCall({
                service: 'Z353R_COMBO_CODIFICACION',
                query: {
                    I_ORDEN: that.get('/Documento/Orden')
                },
                type: 'POST',
                success: function (result) {
                    var codificaciones = utils.copyObjectArray(['QCODEGRP', 'KURZTEXT1', 'CODE', 'KURZTEXT2'], ['GRUPO', 'DENOMINACION', 'CODIGO',
                        'DENOMINACION2'
                    ], result.T_CODIGO, false);
                    that.openDialog('certificado.Codificacion', {
                        Codificaciones: codificaciones,
                        i_Codificacion: -1
                    });
                }
            });
        },

        handleCodificacionSelectChange: function (e) {
            var that = this;
            var dialogName = that._getOpenedDialogName();
            var dialog = that._getOpenedDialogProperty();
            var row = e.getParameter("rowContext");
            if (row) {
                dialog.selectedCodificacion = row.sPath;
            } else {
                dialog.selectedCodificacion = '';
            }

            that.set('/' + dialogName, dialog);
        },

        handleSelectCodificacion: function () {
            var dialog = this._getOpenedDialogProperty();

            // var index = dialog.i_Codificacion;
            // var codificacion = dialog.Codificaciones[index];
            var codificacion = this.get(dialog.selectedCodificacion);

            this.set('/Certificado', {
                Codificacion: codificacion.CODIGO,
                CodificacionDesc: codificacion.DENOMINACION2,
                CodificacionGrupo: codificacion.GRUPO
            });
            if (this.get('/Documento/ClaseOrden') === 'ZSMP') {
                var notas = this.get('/Notas');
                if (notas.length > 0) {
                    notas[0].TEXTO = codificacion.DENOMINACION2 + " " +
                        ", según el Manual de mantenimiento Preventivo que detalla los  parámetros, estándares de calidad y especificaciones exigidos por el fabricante"
                }
                this.set('/Notas', notas);
            }
            this.closeDialog();
        },

        handleSelectResponsable: function () {
            var that = this;
            var opciones = [];
            var campoCodigo = 'PERNR';
            var campoDescripcion = 'VORNA';
            var campoDescripcionAdicional = 'NACHN';
            this._ejecutarF4IF('PREMN', opciones, campoCodigo, campoDescripcion, campoDescripcionAdicional, function (result) {
                if (result.length === 0) {
                    sap.ui.getCore().getMessageManager().removeAllMessages();
                    that.addMessage('No se encontraron datos', 'E');
                }
                var responsables = utils.copyObjectArray(['cod', 'desc'], ['RUT', 'NOMBRE'], result, false);
                that.openDialog('certificado.Responsable', {
                    Responsables: responsables,
                    i_Responsable: -1
                });
            });
        },

        handleOperacionesSelectChange: function (e) {
            var that = this;
            var dialogName = that._getOpenedDialogName();
            var dialog = that._getOpenedDialogProperty();
            var row = e.getParameter("rowContext");
            if (row) {
                dialog.selectedResponsable = row.sPath;
            } else {
                dialog.selectedResponsable = '';
            }

            that.set('/' + dialogName, dialog);
        },

        handleSetResponsable: function () {
            var dialog = this._getOpenedDialogProperty();

            // var index = dialog.i_Responsable;
            // var responsable = dialog.Responsables[index];
            var responsable = this.get(dialog.selectedResponsable);
            this.set('/Interlocutores/Responsable', responsable.RUT);
            this.set('/Interlocutores/ResponsableDesc', responsable.NOMBRE);
            this.closeDialog();
        },

        handleSelectAsesor: function () {
            var that = this;
            var opciones = [];
            var campoCodigo = 'PERNR';
            var campoDescripcion = 'VORNA';
            var campoDescripcionAdicional = 'NACHN';
            this._ejecutarF4IF('PREMN', opciones, campoCodigo, campoDescripcion, campoDescripcionAdicional, function (result) {
                if (result.length === 0) {
                    sap.ui.getCore().getMessageManager().removeAllMessages();
                    that.addMessage('No se encontraron datos', 'E');
                }
                var asesores = utils.copyObjectArray(['cod', 'desc'], ['RUT', 'NOMBRE'], result, false);
                that.openDialog('certificado.Asesor', {
                    Asesores: asesores,
                    i_Asesor: -1
                });
            });
        },

        handleAsesorSelectChange: function (e) {
            var that = this;
            var dialogName = that._getOpenedDialogName();
            var dialog = that._getOpenedDialogProperty();
            var row = e.getParameter("rowContext");
            if (row) {
                dialog.selectedAsesor = row.sPath;
            } else {
                dialog.selectedAsesor = '';
            }

            that.set('/' + dialogName, dialog);
        },

        handleSetAsesor: function () {
            var dialog = this._getOpenedDialogProperty();

            // var index = dialog.i_Asesor;
            // var asesor = dialog.Asesores[index];
            var asesor = this.get(dialog.selectedAsesor);
            this.set('/Interlocutores/Asesor', asesor.RUT);
            this.set('/Interlocutores/AsesorDesc', asesor.NOMBRE);
            this.closeDialog();
        },

        handleSelectCliente: function () {
            this.openDialog('certificado.Cliente', {
                Clientes: [],
                i_Cliente: -1,
                filters: {
                    Rut: '',
                    Nombre: ''
                }
            });
        },

        handleSearchCliente: function () {
            var that = this;

            var dialogName = this._getOpenedDialogName();
            var dialog = this._getOpenedDialogProperty();

            var rut = dialog.filters.Rut;
            var nombre = dialog.filters.Nombre;
            var cod = 0;
            if (rut) {
                cod = 2;
            }

            if (nombre) {
                cod = 1;
            }

            if (cod === 0) {
                sap.m.MessageBox.error('Debe ingresar datos para la búsqueda', {
                    title: "Error"
                });
            } else {
                var opciones = [{
                    SHLPNAME: "BBPH_DEBITOR_GENERAL",
                    SHLPFIELD: (cod === 1 ? "MCOD1" : 'KUNNR'),
                    SIGN: "I",
                    OPTION: "CP",
                    LOW: (cod === 1 ? '*' + nombre.toUpperCase() + '*' : rut + '*'),
                    HIGH: "",
                }];
                var campoCodigo = 'KUNNR';
                var campoDescripcion = 'NAME1';
                var campoDescripcionAdicional = 'NAME2';
                this._ejecutarF4IF('BBPH_DEBITOR_GENERAL', opciones, campoCodigo, campoDescripcion, campoDescripcionAdicional, function (result) {
                    if (result.length === 0) {
                        sap.ui.getCore().getMessageManager().removeAllMessages();
                        that.addMessage('No se encontraron datos', 'E');
                    }
                    var clientes = utils.copyObjectArray(['cod', 'desc'], ['RUT', 'NOMBRE'], result, false);
                    that.set('/' + dialogName + '/Clientes', clientes);
                });
            }

        },

        handleClienteSelectChange: function (e) {
            var that = this;
            var dialogName = that._getOpenedDialogName();
            var dialog = that._getOpenedDialogProperty();
            var row = e.getParameter("rowContext");
            if (row) {
                dialog.selectedCliente = row.sPath;
            } else {
                dialog.selectedCliente = '';
            }

            that.set('/' + dialogName, dialog);
        },

        handleSetCliente: function () {
            var dialog = this._getOpenedDialogProperty();

            // var index = dialog.i_Cliente;
            // var cliente = dialog.Clientes[index];
            var cliente = this.get(dialog.selectedCliente);
            this.set('/Interlocutores/Cliente', cliente.RUT);
            this.set('/Interlocutores/ClienteDesc', cliente.NOMBRE);
            this.closeDialog();
        },

        handleAddNota: function () {
            var notas = this.get('/Notas');
            var pos = 20;
            if (notas.length > 0) {
                pos = parseInt(notas[notas.length - 1].NUMERO);
                pos += 10;
            }
            notas.push({
                NUMERO: pos,
                TEXTO: '',
                CREADO_POR: utils.getUser(),
                CREADO_EL: new Date(),
                FLAG: true
            });
            this.set('/Notas', notas);
        },

        handleRemoveNota: function () {
            sap.ui.getCore().getMessageManager().removeAllMessages();

            var notas = this.get('/Notas');
            var index = this.get('/i_Nota');
            if (index > -1) {
                if (notas[index].FLAG) {
                    notas.splice(index, 1);
                    this.set('/i_Nota', index - 1);
                } else {
                    this.addMessage('No es posible eliminar el registro, ya que corresponde a un mantenimiento', 'E');
                }
            }
            this.set('/Notas', notas);
        },

        handleGrabar: function (e) {

            sap.ui.getCore().getMessageManager().removeAllMessages();
            this.addMessage('Se ha Guardado con éxito', 'S');
            //       this._grabarCertificado(e, null);
        },

        _grabarCertificado: function (e, success) {
            var that = this;
            var validator = new Validator();
            var valid = validator.validate(e.getSource().getParent().getParent());
            if (valid) {
                var notas = that.get('/Notas');
                var textos = [];
                var df = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: 'yyyyMMdd',
                    source: {
                        pattern: 'yyyy-MM-dd'
                    }
                });
				/*
				                notas.forEach(function (nota) {
				                    textos.push({
				                        Correlativo:nota.NUMERO,
				                        Fecha_Creado:df.format(nota.CREADO_EL),
				                        Texto:nota.TEXTO.substring(0,2885),
				                        Usuario:nota.CREADO_POR
				                    });
				                });
				*/

                /////////////////////////////////////////////////////////////
                ///// Namdher Colmenares 22/12/2021 /////////////////////////
                ///// Error en validacion, se excluye table /////////////////
                var arrValid = 0;
                notas.forEach(function (nota, index) {

                    if (nota.TEXTO === "") {
                        that.addMessage("Ingrese Valor en fila: " + index.toString(), 'E');
                        arrValid = arrValid + 1;
                    } else {
                        textos.push({
                            Correlativo: nota.NUMERO,
                            Fecha_Creado: df.format(nota.CREADO_EL),
                            Texto: nota.TEXTO.substring(0, 2885),
                            Usuario: nota.CREADO_POR
                        });
                    }

                });

                if (arrValid > 0) {
                    return false;
                }
                utils.httpCall({
                    service: 'Z353R_MODIFICAR_AVISO',
                    query: {
                        I_AVISO: that.get('/Documento/Aviso'),
                        I_JEFE: that.get('/Interlocutores/Responsable'),
                        I_ASESOR: that.get('/Interlocutores/Asesor'),
                        I_CLIENTE: that.get('/Interlocutores/Cliente'),
                        I_SOLICITADO: that.get('/ObjetoReferencia/SolicitadoPor'),
                        I_CODIGO: that.get('/Certificado/CodificacionGrupo'),
                        I_CODING: that.get('/Certificado/Codificacion'),
                        T_TEXTO: textos
                    },
                    type: 'POST',
                    success: function (result) {
                        var ok = true;
                        result.T_RETORNO.forEach(function (r) {
                            if (r.TYPE === 'E') {
                                ok = false;
                                that.addMessage(r.MESSAGE, 'E');
                            }
                        });
                        if (ok) {
                            sap.m.MessageBox.success('La grabación se realizo exitosamente', {
                                title: "Éxito"
                            });
                            if (typeof success === 'function') {
                                success();
                            }
                        }
                    }
                });
            }
        },

        handleImprimir: function (e) {

            sap.ui.getCore().getMessageManager().removeAllMessages();
            this.addMessage('Se ha impreso el aviso', 'S');
            /*
            var that = this;
            that._esJefeTaller(function () {
                that._grabarCertificado(e, function () {
                    that._getPdf();
                });
            });
            */
        },

        _getPdf: function () {
            var that = this;
            utils.httpCall({
                service: 'Z353R_PDF_CERTIFICADO',
                query: {
                    I_ORDEN: that.get('/Documento/Orden')
                },
                dataType: 'TEXT',
                type: 'POST',
                success: function (result) {
                    //Workarround json parse error
                    var index = result.indexOf(',"TEXTO_DIRECTO"');
                    result = result.substring(0, index) + '}';
                    var jsonResult = JSON.parse(result);
                    utils.openPdfFromBase64(jsonResult.E_PDF);
                }
            });
        },
    });

});