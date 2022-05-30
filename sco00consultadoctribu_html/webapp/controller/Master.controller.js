// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sapui5agendar/sco00consultadoctribu_html/utils/utils",
    "sapui5agendar/sco00consultadoctribu_html/model/models",
    "sapui5agendar/sco00consultadoctribu_html/utils/validator",
], function (Controller, utils, models, Validator) {
    "use strict";

    return Controller.extend("sapui5agendar.sco00consultadoctribu_html.controller.Master", {
        onInit: function () {
            this._basicInit();
        },

        handleSearch: function () {
            let validator = new Validator();
            let valid = validator.validate(this.byId("app"));
            if (valid) {
                var oModel = this.getView().getModel();
                var folios = Array.from(oModel.getProperty('/filters/ms/folios'));
                var empresa = oModel.getProperty('/filters/selectedEmpresa');
                var tipoDocumento = oModel.getProperty('/filters/selectedTipoDocumento');
                var folioDesde = oModel.getProperty('/filters/folioDesde');
                var folioHasta = oModel.getProperty('/filters/folioHasta');

                if ((folioDesde && (folioDesde != parseInt(folioDesde))) || (folioHasta && (folioHasta != parseInt(folioHasta)))) {
                    this.addMessage("Introduzca un número válido.", "e");
                    return;
                }

                if (!folioDesde && folios.length == 0) {
                    this.addMessage("Seleccione al menos un número de folio.", "e");
                } else {
                    var foliosFilter = [];
                    if (folioDesde !== "" && folioHasta !== "" && folioDesde !== undefined && folioHasta !== undefined) {
                        foliosFilter.push({ LOW: folioDesde, HIGH: folioHasta, OPTIONS: "BT", SIGN: "I" });
                    }

                    for (var i = 0; i < folios.length; i++) {
                        foliosFilter.push({ LOW: folios[i].Folio, OPTIONS: "EQ", SIGN: "I" });
                    }

                    if (folioDesde !== "" && folioDesde !== undefined && (folioHasta === "" || folioHasta === undefined)) {
                        foliosFilter.push({ LOW: folioDesde, OPTIONS: "EQ", SIGN: "I" })
                    }

                    var oFilters = {
                        P_EMPRESA: empresa,
                        P_TIPO_DOCUMENTO: tipoDocumento,
                        P_FOLIO: foliosFilter
                    };

                    let RESULTADO = [];

                    RESULTADO.push({
                        EMPRESA: "91502000-3",
                        FECHA_DOCUMENTO: "2021-06-01",
                        FLAG_CLIENTE: "",
                        FLAG_ORIGINAL: "",
                        FLAG_URL: "X",
                        FOLIO: "        3422235",
                        IMPUESTO: "29670",
                        MONTO_EXENTO: "0",
                        MONTO_NETO: "156160",
                        MONTO_TOTAL: "185830",
                        NOMBRE_CLIENTE: "JORGE ERNESTO CONTADOR RIVERA",
                        RUT_ENVIA: "91502000-3",
                        RUT_RECEPTOR: "5408374-2",
                        TIPO_DOCUMENTO: "33",
                        URL_DOCU_CLIENTE: "http://sseamv-feapp.salfa.cl:8091/pdfs/91502000/FacturaElectronica/2021/06/30/3422235-cedible.pdf",
                        URL_DOCU_ORIGINAL: "http://sseamv-feapp.salfa.cl:8091/pdfs/91502000/FacturaElectronica/2021/06/30/3422235.pdf",

                    });

                    RESULTADO.push({
                        EMPRESA: "91502002-3",
                        FECHA_DOCUMENTO: "2022-06-01",
                        FLAG_CLIENTE: "",
                        FLAG_ORIGINAL: "",
                        FLAG_URL: "X",
                        FOLIO: "        3422236",
                        IMPUESTO: "30000",
                        MONTO_EXENTO: "0",
                        MONTO_NETO: "200000",
                        MONTO_TOTAL: "230000",
                        NOMBRE_CLIENTE: "JOSE VILLEGAS CLODOMIRO DEL VALLE",
                        RUT_ENVIA: "91502002-3",
                        RUT_RECEPTOR: "5408374-2",
                        TIPO_DOCUMENTO: "33",
                        URL_DOCU_CLIENTE: "http://sseamv-feapp.salfa.cl:8091/pdfs/91502000/FacturaElectronica/2021/06/30/3422235-cedible.pdf",
                        URL_DOCU_ORIGINAL: "http://sseamv-feapp.salfa.cl:8091/pdfs/91502000/FacturaElectronica/2021/06/30/3422235.pdf",

                    });


                    oModel.setProperty("/documentos", RESULTADO);
                    /*
					utils.httpCall({
						service : "ZMF_SIGNATURE_OBTENER_URL",
						query : oFilters,
						type : "post",
						success : function (result, status, xhr) {
							for(var i= 0; i<result.RESULTADO.length;i++){
								result.RESULTADO[i].EMPRESA = empresa;
								result.RESULTADO[i].TIPO_DOCUMENTO = tipoDocumento;
								
								result.RESULTADO[i].MONTO_NETO = result.RESULTADO[i].MONTO_NETO.trim();
								result.RESULTADO[i].MONTO_EXENTO = result.RESULTADO[i].MONTO_EXENTO.trim();
								result.RESULTADO[i].IMPUESTO = result.RESULTADO[i].IMPUESTO.trim();
								result.RESULTADO[i].MONTO_TOTAL = result.RESULTADO[i].MONTO_TOTAL.trim();
							}
							oModel.setProperty("/documentos", result.RESULTADO);
						}
					});

                    */
                }
            }
        },

        handleOpenMultiselect: function (evt) {
            let model = this.getView().getModel();
            model.setProperty('/filters/msValue', undefined);
            model.setProperty('/filters/msSelectedIndex', undefined);

            let fieldName = "folio";
            let listModel = '/filters/ms/folios';
            let inputModel = '/filters/folio-ms';
            let key = this.fieldMetadata[fieldName].key;

            if (this.multiSelect) {
                this.multiSelect.destroy()
            }
            this.multiSelect = new sap.m.Dialog({
                contentWidth: '600px',
                title: 'Selección múltiple',
                content: new sap.ui.table.Table({
                    rows: '{' + listModel + '}',
                    selectedIndex: '{/filters/msSelectedIndex}',
                    visibleRowCount: 10,
                    noData: 'No se han agregado folios.',
                    toolbar: new sap.m.Toolbar({
                        content: [
                            new sap.m.Label({
                                text: 'Folio: '
                            }),
                            new sap.m.Input({
                                value: '{' + inputModel + '}',
                                width: '20rem',
                                submit: () => this.handleAddToMultiselect(listModel, inputModel, key),
                            }),
                            new sap.m.Button({
                                icon: "sap-icon://add",
                                press: () => this.handleAddToMultiselect(listModel, inputModel, key),
                                width: '2rem'
                            }),
                            new sap.m.ToolbarSpacer(),
                            new sap.m.Button({
                                icon: "sap-icon://sys-minus",
                                press: () => this.handleRemoveFromMultiselect(listModel),
                                width: '2rem'
                            })
                        ]
                    }),
                    selectionMode: "Single",
                    selectionBehavior: "Row",
                    columns: [
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: this.fieldMetadata[fieldName].msCol
                            }),
                            template: new sap.m.Text({
                                text: '{' + key + '}'
                            })
                        })
                    ],
                }).setModel(model),
                beginButton:
                    new sap.m.Button({
                        text: 'Aceptar',
                        press: () => {
                            this.multiSelect.close();
                        }
                    })
            }).addStyleClass('sapUiSizeCompact sapUiContentPadding');
            this.multiSelect.open();
        },
        handleAddToMultiselect: function (listModel, inputModel, key) {
            let model = this.getView().getModel();
            let newItem = model.getProperty(inputModel);
            if (newItem == parseInt(newItem, 10)) {
                newItem = parseInt(newItem, 10);
                let rows = model.getProperty(listModel);
                if (!rows.find(x => x[key] === newItem)) {
                    let newRow = {};
                    newRow[key] = newItem;
                    rows.push(newRow);
                    model.setProperty(listModel, rows);
                }
                model.setProperty(inputModel, undefined);
            } else {
                sap.m.MessageBox.information("Introduzca un número válido.", { title: "Información" });
            }
        },
        handleRemoveFromMultiselect: function (listModel) {
            let model = this.getView().getModel();
            let selectedIndex = model.getProperty('/filters/msSelectedIndex');
            if (selectedIndex > -1) {
                let rows = model.getProperty(listModel);
                rows.splice(selectedIndex, 1);
                model.setProperty(listModel, rows);
                model.setProperty('/filters/msSelectedIndex', -1);
            }
        },
        handleURLCliente: function (evt) {
            let that = this;

            if (evt.getSource().data("flagurl") === "X") {
                var win = window.open(evt.getSource().data("url"), '_blank');
                win.focus();
            } else {

                var oFilters = {
                    I_RUTEMPRESA: evt.getSource().data("empresa"),
                    I_TIPODOCUMENTO: evt.getSource().data("tipodocumento"),
                    I_FOLIO: evt.getSource().data("folio")
                };

                utils.httpCall({
                    service: "Z229R_OBTENER_CEDIBLE",
                    query: oFilters,
                    type: "post",
                    success: function (result, status, xhr) {
                        if (result.E_RETORNO.TYPE == "") {
                            utils.openPdfFromBase64(result.E_PDFXSTRING);
                        } else {
                            that._manageMessages(result.E_RETORNO);
                        }
                    }
                });

            }

        },
        handleURLOriginal: function (evt) {
            var win = window.open(evt.getSource().data("url"), '_blank');
            win.focus();
        },
        _manageMessages: function (RETORNO) {
            if (RETORNO.TYPE == "E") {
                sap.m.MessageBox.warning(RETORNO.MESSAGE, { title: "Información" });
            } else if (RETORNO.TYPE == "I") {
                this.addMessage(RETORNO.MESSAGE, "i");
            }
        },
        _basicInit: function () {
            let model = models.createLocalModel();
            let view = this.getView();
            model.setProperty('/filters',
                {
                    ms: {
                        folios: []
                    }
                });


            view.setModel(model);
            utils.view = view;

            let that = this;

            let GT_TIPODTE = [];


            GT_TIPODTE.push({
                CODIGO: "33",
                DESCRIPCION: "FACTURA AFECTA ELE.",
                ESTADO: "A",
                MANDT: "300"
            });

            GT_TIPODTE.push({
                CODIGO: "34",
                DESCRIPCION: "FACTURA EXENTA ELE.",
                ESTADO: "A",
                MANDT: "300"
            });

            GT_TIPODTE.push({
                CODIGO: "39",
                DESCRIPCION: "BOLETA ELECTRONICA.",
                ESTADO: "A",
                MANDT: "300"
            });

            GT_TIPODTE.push({
                CODIGO: "52",
                DESCRIPCION: "GUÍA DE DESPACHO",
                ESTADO: "A",
                MANDT: "300"
            });

            GT_TIPODTE.push({
                CODIGO: "56",
                DESCRIPCION: "NOTA DE DÉBITO",
                ESTADO: "A",
                MANDT: "300"
            });

            GT_TIPODTE.push({
                CODIGO: "61",
                DESCRIPCION: "NOTA DE CRÉDITO",
                ESTADO: "A",
                MANDT: "300"
            });

            model.setProperty("/tiposDocumentos", GT_TIPODTE);
            /*
            utils.httpCall({
				service : "Zrsd_102_R_Tiposdte",
				type : "post",
				success : function (result, status, xhr) {
					if(result.GT_RETURN[0].TYPE=="S"){
						model.setProperty("/tiposDocumentos", GT_TIPODTE);
					}else{
						that._manageMessages(result.GT_RETURN[0]);
					}
				}
			});
            */

            let GT_SOCELE = [];

            GT_SOCELE.push({
                CODIGO: "76134066-2",
                DESCRIPCION: "Capacita",
                ESTADO: "A",
                MANDT: "300"
            });

            GT_SOCELE.push({
                CODIGO: "77225200-5",
                DESCRIPCION: "Rent a Car",
                ESTADO: "A",
                MANDT: "300"
            });

            GT_SOCELE.push({
                CODIGO: "77248290-6",
                DESCRIPCION: "Servicios y Arriendos Limitada",
                ESTADO: "A",
                MANDT: "300"
            });

            GT_SOCELE.push({
                CODIGO: "77480780-2",
                DESCRIPCION: "Inversiones Automotrices Limit",
                ESTADO: "A",
                MANDT: "300"
            });

            GT_SOCELE.push({
                CODIGO: "91502000-3",
                DESCRIPCION: "Salinas y Fabres",
                ESTADO: "A",
                MANDT: "300"
            });


            model.setProperty("/empresas", GT_SOCELE);
			/*
			utils.httpCall({
				service : "Zrsd_102_R_Socelect",
				type : "post",
				success : function (result, status, xhr) {
					if(result.GT_RETURN[0].TYPE=="S"){
						model.setProperty("/empresas", result.GT_SOCELE);
					}else{
						that._manageMessages(result.GT_RETURN[0]);
					}
				}
			});

            */

            this.fieldMetadata = { folio: { msCol: "Folio", key: "Folio" } };


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
        },

        handleMessagePopoverPress: function (oEvent) {
            this._oMessagePopover.openBy(oEvent.getSource());
        },

        addMessage: function (msg, type) {
            type = type || 'e';
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

            setTimeout(() => this._oMessagePopover.openBy(this.byId('errorPopover')), 0);
        },
    });

});