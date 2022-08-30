// @ts-nocheck
jQuery.sap.require("sapui5agendar.sco00consultadespacho_html.js.FileSaver");
jQuery.sap.require("sapui5agendar.sco00consultadespacho_html.js.jspdf_debug");
jQuery.sap.require("sapui5agendar.sco00consultadespacho_html.js.jspdf_plugin_text_align");
jQuery.sap.require("sapui5agendar.sco00consultadespacho_html.js.jspdf_plugin_autotable");

sap.ui.define([
    "sapui5agendar/sco00consultadespacho_html/controller/BaseController",
    "sapui5agendar/sco00consultadespacho_html/model/formatter",
    "sap/ui/model/json/JSONModel",
    'sap/ui/model/Filter',
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/export/Spreadsheet"
], function (BaseController, formatter, JSONModel,
    //PersoService, TablePersoController, Filter,
    MessageBox, MessageToast, Spreadsheet) {
    "use strict";
    //	var dataCsv = [];

    return BaseController.extend("sapui5agendar.sco00consultadespacho_html.controller.Home", {
        formatter: formatter,

        onInit: function () {
            //			this.generarMensaje();
            var oViewModel = new JSONModel({
                busy: false,
                delay: 0,
                Rut: '',
                Patente: '',
                Clave: '',
                FolioSearch: '',
                DespachoEstado: '',
                DespachoEstadoTxt: '',
                DespachoFolio: '',
                DespachoNombreChofer: '',
                DespachoCentro: '',
                DespachoCentroTxt: '',
                FoliosDepacho: [],
                FCFolio: '',
                FCCliente: '',
                FCClienteTxt: '',
                FCEstado: '',
                FCEstadoTxt: '',
                FCTab: '',
                Vacios: [],
                Llenos: [],
                Fallidos: [],
                Vales: [],
                VisibleLogin: true,
                VisibleDespacho: false,
                VisibleFolioCliente: false,
                VisibleBuscarFolio: false,
                VisibleFinDespacho: false,
                VisibleFCAceptar: false,
                VisibleSalir: false,
                lineItemTableTitle: this.getResourceBundle().getText("detailLineItemTableHeading")
            });
            this.setModel(oViewModel, "mainView");
            //	this.handleLogin();
        },

        //----------------------------------------- LOGIN TRANSPORTISTA - DETALLE DESPACHO ----------------------------------------------------//						

        handleLogin: function () {
            var retono = "";
            var mensaje = "";
            var oViewModel = this.getModel("mainView");
            var andFilters = [];

            var rut = oViewModel.getProperty('/Rut');
            if (rut.length > 1) {
                if (rut.indexOf("-") < 0) {
                    var tRut = rut.length;
                    rut = rut.substring(0, tRut - 1) + "-" + rut.substring(tRut - 1, tRut);
                    oViewModel.setProperty('/Rut', rut);
                }
            }

            var patente = oViewModel.getProperty('/Patente');
            patente = patente.toUpperCase();
            oViewModel.setProperty('/Patente', patente);

            var clave = oViewModel.getProperty('/Clave');

            //----------------------------------------- Verificar transportista ----------------------------------------------------//						

            andFilters.push(new sap.ui.model.Filter({
                path: "IClave",
                operator: sap.ui.model.FilterOperator.EQ,
                value1: clave
            }));

            andFilters.push(new sap.ui.model.Filter({
                path: "IPatente",
                operator: sap.ui.model.FilterOperator.EQ,
                value1: patente
            }));

            andFilters.push(new sap.ui.model.Filter({
                path: "IRut",
                operator: sap.ui.model.FilterOperator.EQ,
                value1: rut
            }));

            andFilters.push(new sap.ui.model.Filter({
                path: "IAccion",
                operator: sap.ui.model.FilterOperator.EQ,
                value1: 'C'
            }));

			/*			var idDetalle = '';
						var idTD = '';
						var url = "/HANA_DEV/GESTOR_DOCUMENTAL/XSJS/getModelDocumentos.xsjs?cmd=getInfoDocObl&idDet=" + idDetalle + "&idTD=" + idTD;
						//var oModelDetalle = new JSONModel();
						//oModelDetalle.loadData(url, null, false);
						//var oModelDetalleDocObl = new JSONModel(oModelDetalle.getData());
						
						$.ajax({
							url: url,
							type: "GET",
							crossDomain: true,
							async: false,
							dataType: "json",
							error: function (err) {
								console.log(err);
							},
							success: function (obj, response) {
								console.log(response);
							}
						});*/
            let results = [];


            results.push({
                IAccion: "",
                IClave: "1234",
                IFolio: "",
                IPatente: "DZGF35",
                IRut: "10905378-3",
                OEstado: "8SM",
                OEstadoTxt: "Salida MCia Realizad",
                OFolio: "10810",
                ONombre: "CHRISTHOPHER VALDERAS",
                OReturn: {
                    Mensaje: "Ejeuciónm exitosa",
                    Retorno: "0"
                },
                OWerks: "7110",
                OWerksTxt: "Maipú y Oficina Central (GLP)"
            });

            retono = results[0].OReturn.Retorno.trim();
            mensaje = results[0].OReturn.Mensaje.trim();

            if (retono == "0" || retono == "2") {

                oViewModel.setProperty('/VisibleLogin', false);
                oViewModel.setProperty('/VisibleSalir', true);
                oViewModel.setProperty('/VisibleBuscarFolio', true);
                oViewModel.setProperty('/DespachoEstado', results[0].OEstado.trim());
                oViewModel.setProperty('/DespachoEstadoTxt', results[0].OEstadoTxt.trim());
                oViewModel.setProperty('/DespachoFolio', results[0].OFolio.trim());
                oViewModel.setProperty('/DespachoNombreChofer', results[0].ONombre.trim());
                oViewModel.setProperty('/DespachoCentro', results[0].OWerks.trim());
                oViewModel.setProperty('/DespachoCentroTxt', results[0].OWerksTxt.trim());

                //----------------------------------------- INICIO Consultar Folio transportista ----------------------------------------------------//						
                if (retono == "0") {

                    if (results[0].OEstado.trim() == '1CP') {
                        oViewModel.setProperty('/VisibleFinDespacho', false);
                    } else {
                        oViewModel.setProperty('/VisibleFinDespacho', true);
                    }

                    oViewModel.setProperty('/VisibleDespacho', true);
                    oViewModel.setProperty('/VisibleFolioCliente', false);

                    andFilters = [];
                    andFilters.push(new sap.ui.model.Filter({
                        path: "FolioCliente",
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: results[0].OFolio.trim()
                    }));

                    let results1 = [];

                    results1.push({
                        Cliente: "12293070",
                        Estado: "PAT",
                        EstadoTxt: "Cliente por atender",
                        FolioCliente: "10811",
                        Nombre: "DISTRIBUIDORA 1",
                    });

                    results1.push({
                        Cliente: "12293071",
                        Estado: "PAT",
                        EstadoTxt: "Cliente por atender",
                        FolioCliente: "10812",
                        Nombre: "DISTRIBUIDORA 2",
                    });


                    results1.push({
                        Cliente: "12293072",
                        Estado: "PAT",
                        EstadoTxt: "Cliente por atender",
                        FolioCliente: "10813",
                        Nombre: "DISTRIBUIDORA 3",
                    });

                    results1.push({
                        Cliente: "12293073",
                        Estado: "PAT",
                        EstadoTxt: "Cliente por atender",
                        FolioCliente: "10814",
                        Nombre: "DISTRIBUIDORA 4",
                    });

                    var foliosDespacho = results1;

                    for (var i = 0; i < foliosDespacho.length; i++) {
                        foliosDespacho[i].EstadoTxt = foliosDespacho[i].Estado + " - " + foliosDespacho[i].EstadoTxt;
                        foliosDespacho[i].VisibleAceptar = false;
                        if (foliosDespacho[i].Estado == 'CLA') {
                            foliosDespacho[i].EstadoColor = "Success";
                        } else {
                            foliosDespacho[i].EstadoColor = "Error";
                            if (foliosDespacho[i].Estado != 'NAT') {
                                foliosDespacho[i].VisibleAceptar = true;
                            }
                        }

                        foliosDespacho[i].Cliente = foliosDespacho[i].Cliente + " - " + foliosDespacho[i].Nombre;
                        foliosDespacho[i].Selected = false;

                    }
                    oViewModel.setProperty('/FoliosDepacho', foliosDespacho);

                    /*

                    this.getOwnerComponent().getModel("oModelDespacho").read("/FoliosClienteSet?", {
                        filters: andFilters,
                        success: function (oResult2) {
                            //	retono = oResult2.results[0].OReturn.Retorno.trim();
                            //	mensaje = oResult2.results[0].OReturn.Mensaje.trim();
                            //	if (retono == "0") {
                            var foliosDespacho = oResult2.results;

                            for (var i = 0; i < foliosDespacho.length; i++) {
                                foliosDespacho[i].EstadoTxt = foliosDespacho[i].Estado + " - " + foliosDespacho[i].EstadoTxt;
                                foliosDespacho[i].VisibleAceptar = false;
                                if (foliosDespacho[i].Estado == 'CLA') {
                                    foliosDespacho[i].EstadoColor = "Success";
                                } else {
                                    foliosDespacho[i].EstadoColor = "Error";
                                    if (foliosDespacho[i].Estado != 'NAT') {
                                        foliosDespacho[i].VisibleAceptar = true;
                                    }
                                }

                                foliosDespacho[i].Cliente = foliosDespacho[i].Cliente + " - " + foliosDespacho[i].Nombre;
                                foliosDespacho[i].Selected = false;

                            }
                            oViewModel.setProperty('/FoliosDepacho', foliosDespacho);
                            //	}else{
                            //	alert(mensaje);	
                            //	}

                        }.bind(this),
                        error: function () {
                            //	this._oViewAddProyectoDialog.setBusy(false);
                        }.bind(this)
                    });

                    */
                } else {
                    sap.m.MessageBox.success('No tiene folios vigentes', {
                        title: "Información",
                        onClose: null,
                        styleClass: "",
                        initialFocus: null,
                        textDirection: sap.ui.core.TextDirection.Inherit
                    });
                }
                //----------------------------------------- FIN Consultar Folio transportista ----------------------------------------------------//											

            } else {
                sap.m.MessageBox.error(mensaje, {
                    title: "Error",
                    onClose: null,
                    styleClass: "",
                    initialFocus: null,
                    textDirection: sap.ui.core.TextDirection.Inherit
                });
            }

            /*
                        this.getOwnerComponent().getModel("oModelDespacho").read("/DespachoSet", {
                            filters: andFilters,
                            success: function (oResult) {
                                retono = oResult.results[0].OReturn.Retorno.trim();
                                mensaje = oResult.results[0].OReturn.Mensaje.trim();
            
                                if (retono == "0" || retono == "2") {
                                    oViewModel.setProperty('/VisibleLogin', false);
                                    oViewModel.setProperty('/VisibleSalir', true);
                                    oViewModel.setProperty('/VisibleBuscarFolio', true);
                                    oViewModel.setProperty('/DespachoEstado', oResult.results[0].OEstado.trim());
                                    oViewModel.setProperty('/DespachoEstadoTxt', oResult.results[0].OEstadoTxt.trim());
                                    oViewModel.setProperty('/DespachoFolio', oResult.results[0].OFolio.trim());
                                    oViewModel.setProperty('/DespachoNombreChofer', oResult.results[0].ONombre.trim());
                                    oViewModel.setProperty('/DespachoCentro', oResult.results[0].OWerks.trim());
                                    oViewModel.setProperty('/DespachoCentroTxt', oResult.results[0].OWerksTxt.trim());
            
                                    //----------------------------------------- INICIO Consultar Folio transportista ----------------------------------------------------//						
                                    if (retono == "0") {
            
                                        if (oResult.results[0].OEstado.trim() == '1CP') {
                                            oViewModel.setProperty('/VisibleFinDespacho', false);
                                        } else {
                                            oViewModel.setProperty('/VisibleFinDespacho', true);
                                        }
            
                                        oViewModel.setProperty('/VisibleDespacho', true);
                                        oViewModel.setProperty('/VisibleFolioCliente', false);
            
                                        andFilters = [];
                                        andFilters.push(new sap.ui.model.Filter({
                                            path: "FolioCliente",
                                            operator: sap.ui.model.FilterOperator.EQ,
                                            value1: oResult.results[0].OFolio.trim()
                                        }));
            
                                        this.getOwnerComponent().getModel("oModelDespacho").read("/FoliosClienteSet?", {
                                            filters: andFilters,
                                            success: function (oResult2) {
                                                //	retono = oResult2.results[0].OReturn.Retorno.trim();
                                                //	mensaje = oResult2.results[0].OReturn.Mensaje.trim();
                                                //	if (retono == "0") {
                                                var foliosDespacho = oResult2.results;
            
                                                for (var i = 0; i < foliosDespacho.length; i++) {
                                                    foliosDespacho[i].EstadoTxt = foliosDespacho[i].Estado + " - " + foliosDespacho[i].EstadoTxt;
                                                    foliosDespacho[i].VisibleAceptar = false;
                                                    if (foliosDespacho[i].Estado == 'CLA') {
                                                        foliosDespacho[i].EstadoColor = "Success";
                                                    } else {
                                                        foliosDespacho[i].EstadoColor = "Error";
                                                        if (foliosDespacho[i].Estado != 'NAT') {
                                                            foliosDespacho[i].VisibleAceptar = true;
                                                        }
                                                    }
            
                                                    foliosDespacho[i].Cliente = foliosDespacho[i].Cliente + " - " + foliosDespacho[i].Nombre;
                                                    foliosDespacho[i].Selected = false;
            
                                                }
                                                oViewModel.setProperty('/FoliosDepacho', foliosDespacho);
                                                //	}else{
                                                //	alert(mensaje);	
                                                //	}
            
                                            }.bind(this),
                                            error: function () {
                                                //	this._oViewAddProyectoDialog.setBusy(false);
                                            }.bind(this)
                                        });
                                    } else {
                                        sap.m.MessageBox.success('No tiene folios vigentes', {
                                            title: "Información",
                                            onClose: null,
                                            styleClass: "",
                                            initialFocus: null,
                                            textDirection: sap.ui.core.TextDirection.Inherit
                                        });
                                    }
                                    //----------------------------------------- FIN Consultar Folio transportista ----------------------------------------------------//											
            
                                } else {
                                    sap.m.MessageBox.error(mensaje, {
                                        title: "Error",
                                        onClose: null,
                                        styleClass: "",
                                        initialFocus: null,
                                        textDirection: sap.ui.core.TextDirection.Inherit
                                    });
                                }
            
                            }.bind(this),
                            error: function () {
                                //	this._oViewAddProyectoDialog.setBusy(false);
                            }.bind(this)
                        });
            
                        */

        },

        //----------------------------------------- LOGIN TRANSPORTISTA - DETALLE DESPACHO ----------------------------------------------------//						

        handleSalir: function () {
            var retono = "";
            var mensaje = "";
            var oViewModel = this.getModel("mainView");
            var andFilters = [];

            oViewModel.setProperty('/Rut', "");
            oViewModel.setProperty('/Patente', "");
            oViewModel.setProperty('/Clave', "");
            oViewModel.setProperty('/VisibleLogin', true);
            oViewModel.setProperty('/VisibleSalir', false);
            oViewModel.setProperty('/VisibleBuscarFolio', false);
            oViewModel.setProperty('/DespachoEstado', "");
            oViewModel.setProperty('/DespachoEstadoTxt', "");
            oViewModel.setProperty('/DespachoFolio', "");
            oViewModel.setProperty('/DespachoNombreChofer', "");
            oViewModel.setProperty('/DespachoCentro', "");
            oViewModel.setProperty('/DespachoCentroTxt', "");
            oViewModel.setProperty('/VisibleDespacho', false);
            oViewModel.setProperty('/VisibleFolioCliente', false);
            oViewModel.setProperty('/VisibleFinDespacho', false);
            oViewModel.setProperty('/FoliosDepacho', []);

        },

        //----------------------------------------- DETALLE DESPACHO ----------------------------------------------------//						

        handleGetDespacho: function () {
			/*	var retono = "";
			var mensaje = "";
			var oViewModel = this.getModel("mainView");
			var andFilters = [];
			
			oViewModel.setProperty('/Rut',"4265856-1");
			oViewModel.setProperty('/Patente',"DRBL89");
			oViewModel.setProperty('/Clave',"8561");

			
//----------------------------------------- Verificar transportista ----------------------------------------------------//						
						
			andFilters.push(new sap.ui.model.Filter({
				path: "IClave",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: clave
			}));
			
			andFilters.push(new sap.ui.model.Filter({
				path: "IPatente",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: patente
			}));
			
			andFilters.push(new sap.ui.model.Filter({
				path: "IRut",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: rut
			}));
			
			this.getOwnerComponent().getModel("oModelDespacho").read("/DespachoSet", {
				filters: andFilters,
				success: function (oResult) {
					retono = oResult.results[0].OReturn.Retorno.trim();
					mensaje = oResult.results[0].OReturn.Mensaje.trim();
					
					if (retono == "0") {
						oViewModel.setProperty('/VisibleLogin',false);
						oViewModel.setProperty('/VisibleDespacho',true);
						oViewModel.setProperty('/VisibleFolioCliente',false);
						oViewModel.setProperty('/DespachoEstado',oResult.results[0].OEstadoTxt.trim());
						oViewModel.setProperty('/DespachoFolio',oResult.results[0].OFolio.trim());
						oViewModel.setProperty('/DespachoNombreChofer',oResult.results[0].ONombre.trim());
						oViewModel.setProperty('/DespachoCentro',oResult.results[0].OWerks.trim());
						oViewModel.setProperty('/DespachoCentroTxt',oResult.results[0].OWerksTxt.trim());
					
//----------------------------------------- INICIO Consultar Folio transportista ----------------------------------------------------//						
					andFilters = [];
					andFilters.push(new sap.ui.model.Filter({
						path: "FolioCliente",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: oResult.results[0].OFolio.trim()
					}));
			
					this.getOwnerComponent().getModel("oModelDespacho").read("/FoliosClienteSet?", {
						filters: andFilters,        
						success: function (oResult2) {
					//	retono = oResult2.results[0].OReturn.Retorno.trim();
					//	mensaje = oResult2.results[0].OReturn.Mensaje.trim();
						//	if (retono == "0") {
								var foliosDespacho  = oResult2.results;
								oViewModel.setProperty('/FoliosDepacho', foliosDespacho);
						//	}else{
						//	alert(mensaje);	
						//	}
							
						}.bind(this),
						error: function () {
						//	this._oViewAddProyectoDialog.setBusy(false);
						}.bind(this)
					});
//----------------------------------------- FIN Consultar Folio transportista ----------------------------------------------------//											
						
					}else{
				//	alert(mensaje);	
					}
					
				}.bind(this),
				error: function () {
				//	this._oViewAddProyectoDialog.setBusy(false);
				}.bind(this)
			});*/

        },

        //----------------------------------------- DETALLE DE FOLIO CLIENTE ----------------------------------------------------//						

        onEditDespacho: function (oEvent) {
            var oFolio = oEvent.getSource().getBindingContext("mainView").getObject().FolioCliente;
            var oViewModel = this.getModel("mainView");
            var retono = "";
            var mensaje = "";
            var andFilters = [];
            var FCEAceptar = false;

            FCEAceptar = oEvent.getSource().getBindingContext("mainView").getObject().VisibleAceptar;
            oViewModel.setProperty('/FCTab', "Vacios");
            oViewModel.setProperty('/FCFolio', oFolio);
            oViewModel.setProperty('/FCCliente', oEvent.getSource().getBindingContext("mainView").getObject().Cliente);
            oViewModel.setProperty('/FCClienteTxt', oEvent.getSource().getBindingContext("mainView").getObject().ClienteTxt);
            oViewModel.setProperty('/FCEstado', oEvent.getSource().getBindingContext("mainView").getObject().Estado);
            oViewModel.setProperty('/FCEstadoTxt', oEvent.getSource().getBindingContext("mainView").getObject().EstadoTxt);
            //	oViewModel.setProperty('/FCVisibleAceptar',oEvent.getSource().getBindingContext("mainView").getObject().VisibleAceptar);
            oViewModel.setProperty('/VisibleLogin', false);
            oViewModel.setProperty('/VisibleDespacho', false);
            oViewModel.setProperty('/VisibleFolioCliente', true);
            oViewModel.setProperty('/VisibleFinDespacho', false);
            oViewModel.setProperty('/VisibleBuscarFolio', false);
            andFilters.push(new sap.ui.model.Filter({
                path: "Folio",
                operator: sap.ui.model.FilterOperator.EQ,
                value1: oFolio
            }));

            oViewModel.setProperty('/FCVisibleAceptar', false);
            //----------------------------------------- Obtener Vacios ----------------------------------------------------//						

            let results = [];

            results.push({
                Folio: "0",
                Formato: "02",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000",
            });

            results.push({
                Folio: "0",
                Formato: "05",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results.push({
                Folio: "0",
                Formato: "11",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000",
            });

            results.push({
                Folio: "0",
                Formato: "15",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results.push({
                Folio: "0",
                Formato: "45",
                Total: "80",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "80",
                VaciosOtc: "",
                Version: "000"
            });

            results.push({
                Folio: "0",
                Formato: "H15",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results.push({
                Folio: "0",
                Formato: "H15_AL",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results.push({
                Folio: "0",
                Formato: "PALLET_15",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });


            results.push({
                Folio: "0",
                Formato: "PALLET_45",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results.push({
                Folio: "0",
                Formato: "PALLET_GH",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });




            let results1 = [];

            results1.push({
                Folio: "0",
                Formato: "02",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000",
            });

            results1.push({
                Folio: "0",
                Formato: "05",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results1.push({
                Folio: "0",
                Formato: "11",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000",
            });

            results1.push({
                Folio: "0",
                Formato: "15",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results1.push({
                Folio: "0",
                Formato: "45",
                Total: "80",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "80",
                VaciosOtc: "",
                Version: "000"
            });

            results1.push({
                Folio: "0",
                Formato: "H15",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results1.push({
                Folio: "0",
                Formato: "H15_AL",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results1.push({
                Folio: "0",
                Formato: "PALLET_15",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });


            results1.push({
                Folio: "0",
                Formato: "PALLET_45",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results1.push({
                Folio: "0",
                Formato: "PALLET_GH",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });


            let results2 = [];

            results2.push({
                Folio: "0",
                Formato: "02",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000",
            });

            results2.push({
                Folio: "0",
                Formato: "05",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results2.push({
                Folio: "0",
                Formato: "11",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000",
            });

            results2.push({
                Folio: "0",
                Formato: "15",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results2.push({
                Folio: "0",
                Formato: "45",
                Total: "80",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "80",
                VaciosOtc: "",
                Version: "000"
            });

            results2.push({
                Folio: "0",
                Formato: "H15",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results2.push({
                Folio: "0",
                Formato: "H15_AL",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results2.push({
                Folio: "0",
                Formato: "PALLET_15",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });


            results2.push({
                Folio: "0",
                Formato: "PALLET_45",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            results2.push({
                Folio: "0",
                Formato: "PALLET_GH",
                Total: "",
                VaciosAba: "",
                VaciosLip: "",
                VaciosNor: "",
                VaciosOtc: "",
                Version: "000"
            });

            let results3 = [];

            var Vacios = results;
            if (Vacios.length > 0 && FCEAceptar) {
                oViewModel.setProperty('/FCVisibleAceptar', true);
            }

            oViewModel.setProperty('/Vacios', Vacios);

            /*
                        this.getOwnerComponent().getModel("oModelDespacho").read("/VaciosSet", {
                            filters: andFilters,
                            success: function (oResult2) {
                                //	retono = oResult2.results[0].OReturn.Retorno.trim();
                                //	mensaje = oResult2.results[0].OReturn.Mensaje.trim();
                                //	if (retono == "0") {
                                var Vacios = oResult2.results;
                                if (Vacios.length > 0 && FCEAceptar) {
                                    oViewModel.setProperty('/FCVisibleAceptar', true);
                                }
            
                                oViewModel.setProperty('/Vacios', Vacios);
                                //	}else{
                                //	alert(mensaje);	
                                //	}
            
                            }.bind(this),
                            error: function () {
                                //	this._oViewAddProyectoDialog.setBusy(false);
                            }.bind(this)
                        });
            
                        */

            //----------------------------------------- Obtener Llenos ----------------------------------------------------//						
            var Llenos = results1;

            if (Llenos.length > 0 && FCEAceptar) {
                oViewModel.setProperty('/FCVisibleAceptar', true);
            }

            oViewModel.setProperty('/Llenos', Llenos);
            /*
                        this.getOwnerComponent().getModel("oModelDespacho").read("/LlenosSet", {
                            filters: andFilters,
                            success: function (oResult2) {
                                //	retono = oResult2.results[0].OReturn.Retorno.trim();
                                //	mensaje = oResult2.results[0].OReturn.Mensaje.trim();
                                //	if (retono == "0") {
                                var Llenos = oResult2.results;
            
                                if (Llenos.length > 0 && FCEAceptar) {
                                    oViewModel.setProperty('/FCVisibleAceptar', true);
                                }
            
                                oViewModel.setProperty('/Llenos', Llenos);
                                //	}else{
                                //	alert(mensaje);	
                                //	}
            
                            }.bind(this),
                            error: function () {
                                //	this._oViewAddProyectoDialog.setBusy(false);
                            }.bind(this)
                        });
            
                        */

            //----------------------------------------- Obtener Fallidos ----------------------------------------------------//						


            var Fallidos = results2;

            if (Fallidos.length > 0 && FCEAceptar) {
                oViewModel.setProperty('/FCVisibleAceptar', true);
            }

            oViewModel.setProperty('/Fallidos', Fallidos);
            /*
                        this.getOwnerComponent().getModel("oModelDespacho").read("/FallidosSet", {
                            filters: andFilters,
                            success: function (oResult2) {
                                //	retono = oResult2.results[0].OReturn.Retorno.trim();
                                //	mensaje = oResult2.results[0].OReturn.Mensaje.trim();
                                //	if (retono == "0") {
                                var Fallidos = oResult2.results;
            
                                if (Fallidos.length > 0 && FCEAceptar) {
                                    oViewModel.setProperty('/FCVisibleAceptar', true);
                                }
            
                                oViewModel.setProperty('/Fallidos', Fallidos);
                                //	}else{
                                //	alert(mensaje);	
                                //	}
            
                            }.bind(this),
                            error: function () {
                                //	this._oViewAddProyectoDialog.setBusy(false);
                            }.bind(this)
                        });
            
                        */

            //----------------------------------------- Obtener Vales----------------------------------------------------//						


            var Vales = results3;
            if (Vales.length > 0 && FCEAceptar) {
                oViewModel.setProperty('/FCVisibleAceptar', true);
            }

            oViewModel.setProperty('/Vales', Vales);

            /*
                        this.getOwnerComponent().getModel("oModelDespacho").read("/ValesSet", {
                            filters: andFilters,
                            success: function (oResult2) {
                                //	retono = oResult2.results[0].OReturn.Retorno.trim();
                                //	mensaje = oResult2.results[0].OReturn.Mensaje.trim();
                                //	if (retono == "0") {
                                var Vales = oResult2.results;
                                if (Vales.length > 0 && FCEAceptar) {
                                    oViewModel.setProperty('/FCVisibleAceptar', true);
                                }
            
                                oViewModel.setProperty('/Vales', Vales);
                                //	}else{
                                //	alert(mensaje);	
                                //	}
            
                            }.bind(this),
                            error: function () {
                                //	this._oViewAddProyectoDialog.setBusy(false);
                            }.bind(this)
                        });
            
                        */
            //----------------------------------------- FIN Consultar Folio transportista ----------------------------------------------------//											

        },

        onPressFinalizarDespacho: function (oEvent) {
            var retono = "";
            var mensaje = "";
            var oViewModel = this.getModel("mainView");
            var andFilters = [];
            var rut = oViewModel.getProperty('/Rut');
            var patente = oViewModel.getProperty('/Patente');
            var clave = oViewModel.getProperty('/Clave');

            var foliosDespacho = [];
            var clientesNoAtendidos = false;
            foliosDespacho = oViewModel.getProperty('/FoliosDepacho');

            for (var i = 0; i < foliosDespacho.length; i++) {
                if (foliosDespacho[i].Estado != 'CLA') {
                    if (!foliosDespacho[i].Selected) {
                        clientesNoAtendidos = true;
                    }
                }
            }

            //----------------------------------------- Verificar transportista ----------------------------------------------------//						
            if (clientesNoAtendidos) {
                sap.m.MessageBox.error('Favor marque el check "NAT" para los folios de clientes que no serán atendidos', {
                    title: "Error",
                    onClose: null,
                    styleClass: "",
                    initialFocus: null,
                    textDirection: sap.ui.core.TextDirection.Inherit
                });
            } else {
                andFilters.push(new sap.ui.model.Filter({
                    path: "IClave",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: clave
                }));

                andFilters.push(new sap.ui.model.Filter({
                    path: "IPatente",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: patente
                }));

                andFilters.push(new sap.ui.model.Filter({
                    path: "IRut",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: rut
                }));

                andFilters.push(new sap.ui.model.Filter({
                    path: "IFolio",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: oViewModel.getProperty('/DespachoFolio')
                }));

                andFilters.push(new sap.ui.model.Filter({
                    path: "IAccion",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: 'F'
                }));

                this.onSearch();

                sap.m.MessageBox.success('Folio finalizado correctamente', {
                    title: "Información",
                    onClose: null,
                    styleClass: "",
                    initialFocus: null,
                    textDirection: sap.ui.core.TextDirection.Inherit
                });
                /*
                                this.getOwnerComponent().getModel("oModelDespacho").read("/DespachoSet", {
                                    filters: andFilters,
                                    success: function (oResult) {
                                        retono = oResult.results[0].OReturn.Retorno.trim();
                                        mensaje = oResult.results[0].OReturn.Mensaje.trim();
                
                                        if (retono == "0") {
                
                                            oViewModel.setProperty('/FolioSearch', oViewModel.getProperty('/DespachoFolio'));
                                            this.onSearch();
                
                                            sap.m.MessageBox.success('Folio finalizado correctamente', {
                                                title: "Información",
                                                onClose: null,
                                                styleClass: "",
                                                initialFocus: null,
                                                textDirection: sap.ui.core.TextDirection.Inherit
                                            });
                
                                        } else {
                                            sap.m.MessageBox.error(mensaje, {
                                                title: "Error",
                                                onClose: null,
                                                styleClass: "",
                                                initialFocus: null,
                                                textDirection: sap.ui.core.TextDirection.Inherit
                                            });
                                        }
                
                                    }.bind(this),
                                    error: function () {
                                        //	this._oViewAddProyectoDialog.setBusy(false);
                                    }.bind(this)
                                });
                
                                */
            }

        },

        onPressAceptarFC: function (oEvent) {

            var oViewModel = this.getModel("mainView");
            var retono = "";
            var mensaje = "";
            var oFolio = oViewModel.getProperty('/FCFolio');
            var andFilters = [];

            andFilters.push(new sap.ui.model.Filter({
                path: "IFolio",
                operator: sap.ui.model.FilterOperator.EQ,
                value1: oFolio
            }));


            this.handleLogin();

            sap.m.MessageBox.success('Se ha actualizado el Folio', {
                title: "Información",
                onClose: null,
                styleClass: "",
                initialFocus: null,
                textDirection: sap.ui.core.TextDirection.Inherit
            });

            /*
            
                        this.getOwnerComponent().getModel("oModelDespacho").read("/FolioClienteDetalleSet", {
                            filters: andFilters,
                            success: function (oResult2) {
            
                                retono = oResult2.results[0].ORetorno.Retorno.trim();
                                mensaje = oResult2.results[0].ORetorno.Mensaje.trim();
                                if (retono == "0") {
                                    this.handleLogin();
                                    sap.m.MessageBox.success(mensaje, {
                                        title: "Información",
                                        onClose: null,
                                        styleClass: "",
                                        initialFocus: null,
                                        textDirection: sap.ui.core.TextDirection.Inherit
                                    });
                                } else {
                                    sap.m.MessageBox.error(mensaje, {
                                        title: "Error",
                                        onClose: null,
                                        styleClass: "",
                                        initialFocus: null,
                                        textDirection: sap.ui.core.TextDirection.Inherit
                                    });
                                }
            
                            }.bind(this),
                            error: function () {
            
                            }.bind(this)
                        });
            
                        */
        },

        onPressVolver: function (oEvent) {
            var oViewModel = this.getModel("mainView");
            oViewModel.setProperty('/FCFolio', "");
            oViewModel.setProperty('/VisibleLogin', false);
            oViewModel.setProperty('/VisibleDespacho', true);
            oViewModel.setProperty('/VisibleFolioCliente', false);
            oViewModel.setProperty('/VisibleBuscarFolio', true);

            var RefreshTable = [];
            oViewModel.setProperty('/Vacios', RefreshTable);
            oViewModel.setProperty('/Llenos', RefreshTable);
            oViewModel.setProperty('/Fallidos', RefreshTable);
            oViewModel.setProperty('/Vales', RefreshTable);

            if (oViewModel.getProperty('/DespachoEstado') == '1CP') {
                oViewModel.setProperty('/VisibleFinDespacho', false);
            } else {
                oViewModel.setProperty('/VisibleFinDespacho', true);
            }

        },

        onTableUpdateFinished: function (oEvent) {
            //Actualiza el numero de registros
            var sTitle,
                iTotalItems = oEvent.getParameter("total"),
                oViewModel = this.getModel("mainView");
            if (iTotalItems) {
                sTitle = this.getResourceBundle().getText("detailLineItemTableHeadingCount", [iTotalItems]);
            } else {
                //Display 'Proyectos' en vez de 'Proyectos (0)'
                sTitle = this.getResourceBundle().getText("detailLineItemTableHeading");
            }
            oViewModel.setProperty("/lineItemTableTitle", sTitle);

            //Actualizar los campos del Facet Filter
            //	this._feedFacetFilter();

        },

        addMessage: function (msg, type) {
            type = type || 'e';
            switch (type.toLowerCase()) {
                case 'W':
                    type = sap.ui.core.MessageType.Warning;
                    break;
                case 'I':
                    type = sap.ui.core.MessageType.Information;
                    break;
                case 'N':
                    type = sap.ui.core.MessageType.None;
                    break;
                case 'S':
                    type = sap.ui.core.MessageType.Success;
                    break;
                case 'E':
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
            // setTimeout(() => this._oMessagePopover.openBy(this.byId('errorPopover')), 0);
        },
        _onMetadataLoaded: function () {
			/*			if (!this._oTablePersonControl) {
							this._oTablePersonControl = new TablePersoController({
								table: this.byId("idProyectosTable"),
								componentName: "sapui5agendar.sco00consultadespacho_html",
								persoService: PersoService
							}).activate();
						}
						this.readUsuario();
						this.consultarSociedades();*/
        },

        readUsuario: function () {
			/*			this.getOwnerComponent().getModel("oModelSap").read("/InfoSyUnameSet", {
							success: function (oResult) {
								this.usuario = oResult.results[0].NameText.trim();
							}.bind(this),
							error: function (oError) {
								this.usuario = "DEFAULT_USER";
							}.bind(this)
						});*/

        },

        consultarSociedades: function () {
			/*			this.getOwnerComponent().getModel("oModelSap").read("/ListaSociedadSet", {
							success: function (oResult) {
								var DatosAllSociedad = oResult.results;
								var oModelSociedades = new JSONModel(DatosAllSociedad);
								this.setModel(oModelSociedades, "oModelSociedades");
							}.bind(this),
							error: function () {}.bind(this)
						});*/
        },

        ListaOrdenesCo: function () {
			/*			var andFilters = [];
						andFilters.push(new sap.ui.model.Filter({
							path: "IBukrs",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: this.sociedadValue
						}));
						this._oViewAddProyectoDialog.setBusy(true);
						this.getOwnerComponent().getModel("oModelSap").read("/ListaOrdenesCoSet", {
							filters: andFilters,
							success: function (oResult) {
								this._oViewAddProyectoDialog.setBusy(false);
								var DatosAllOrdenCo = oResult.results;
								var oModelOrdenCo = new JSONModel(DatosAllOrdenCo);
								this.setModel(oModelOrdenCo, "oModelOrdenCo");
								if (!this._oViewOrdenCoDialog) {
									this._oViewOrdenCoDialog = sap.ui.xmlfragment("sapui5agendar.sco00consultadespacho_html.view.fragments.selectDialogOrdenCo", this);
									this.getView().addDependent(this._oViewOrdenCoDialog);
								}
								this._oViewOrdenCoDialog.open();
							}.bind(this),
							error: function () {
								this._oViewAddProyectoDialog.setBusy(false);
							}.bind(this)
						});*/
        },

        onShowDialogSociedad: function () {
			/*			if (!this._oViewSociedadDialog) {
							this._oViewSociedadDialog = sap.ui.xmlfragment("sapui5agendar.sco00consultadespacho_html.view.fragments.selectDialogSociedad", this);
							this.getView().addDependent(this._oViewSociedadDialog);
						}
						this._oViewSociedadDialog.open();
						sap.ui.getCore().byId("idSelectSoc").setValueState("None");*/
        },

        cofirmarSociedad: function (oEvent) {
			/*			var aContexts = oEvent.getParameter("selectedContexts");
						var valor = aContexts[0].getObject().Bukrs;
						this.sociedadValue = valor;
						sap.ui.getCore().byId("idSelectSoc").setValue(valor);
						oEvent.getSource().getBinding("items").filter([]);
						//	sap.ui.getCore().byId("ipORDENCOCrear").setEnabled(true);
						sap.ui.getCore().byId("ipORDENCOCrear").setValue();*/
        },

        handleSearchSociedad: function (oEvent) {
			/*			var andFilters = [];
						var sociedad = oEvent.getParameter("value");
						if (sociedad !== "" && sociedad !== null) {
							andFilters.push(new sap.ui.model.Filter({
								path: "Bukrs",
								operator: sap.ui.model.FilterOperator.Contains,
								value1: sociedad
							}));
						}
						sap.ui.getCore().byId("listaSociedades").getBinding("items").filter(andFilters);*/
        },

        onShowDialogOrdenCo: function () {
			/*			if (this.sociedadValue !== "" && this.sociedadValue !== null) {
							this.ListaOrdenesCo();
							sap.ui.getCore().byId("ipORDENCOCrear").setValueState("None");
						} else {
							sap.ui.getCore().byId("ipORDENCOCrear").setEnabled(false);
						}
			*/
        },

        handleSearchCtaCont: function (oEvent) {
			/*			var andFilters = [];
						var ctaCont = oEvent.getParameter("value");
						if (ctaCont !== "" && ctaCont !== null) {
							andFilters.push(new sap.ui.model.Filter({
								path: "Aufnr",
								operator: sap.ui.model.FilterOperator.Contains,
								value1: ctaCont
							}));
						}
						sap.ui.getCore().byId("listaOrdenCo").getBinding("items").filter(andFilters);
			*/
        },

        cofirmarOrdenCo: function (oEvent) {
			/*			var aContexts = oEvent.getParameter("selectedContexts");
						var valor = aContexts[0].getObject().Aufnr;
						sap.ui.getCore().byId("ipORDENCOCrear").setValue(valor);
						oEvent.getSource().getBinding("items").filter([]);*/
        },

        onPersoButtonPressed: function () {
			/*			console.log("openDialog");
						//Abre el dialogo de personControl
						this._oTablePersonControl.openDialog();*/
        },

        onXlsx: function () {
			/*			var aBoundProperties, aCols, oProperties, oRowBinding, oSettings, oTable, oController;
						oController = this;
						if (!this._oTable) {
							this._oTable = this.byId("idProyectosTable");
						}
						oTable = this._oTable;
						oRowBinding = oTable.getBinding("items");
						aCols = this.createColumnConfig();
						var oModel = oRowBinding.getModel();
						var oModelInterface = oModel.getInterface();
						oSettings = {
							workbook: {
								columns: aCols,
								hierarchyLevel: 'Level'
							},
							dataSource: {
								type: "oData",
								dataUrl: oRowBinding.getDownloadUrl ? oRowBinding.getDownloadUrl() : null,
								serviceUrl: oModelInterface.sServiceUrl,
								headers: oModelInterface.getHeaders ? oModelInterface.getHeaders() : null,
								count: oRowBinding.getLength ? oRowBinding.getLength() : null,
								useBatch: true,
								sizeLimit: oModelInterface.iSizeLimit
							},
							worker: true
						};
						new Spreadsheet(oSettings).build();*/
        },

        createColumnConfig: function () {
			/*			var aCols = [];
						aCols.push({
							property: "SOCIEDAD",
							type: 'string'
						});
						aCols.push({
							property: "TITULO",
							type: 'string'
						});
						aCols.push({
							property: "DESCRIPCION",
							type: 'string'
						});

						aCols.push({
							property: "ORDENCO",
							type: 'string'
						});
						aCols.push({
							property: "ACTIVO",
							type: 'string'
						});

						return aCols;*/
        },

        onDeleteProyecto: function (oEvent) {
			/*			var oSelectedItems = this.byId("idProyectosTable").getSelectedItems();
						if (oSelectedItems.length > 0) {
							var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
							MessageBox.show("Esta a punto de eliminar el(los) elemento(s) seleccionado(s)", {
								icon: sap.m.MessageBox.Icon.QUESTION,
								title: "Eliminar",
								styleClass: bCompact ? "sapUiSizeCompact" : "",
								actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
								onClose: function (sAction) {
									if (sAction === 'CANCEL') {
										return;
									} else {
										for (var i = 0; i < oSelectedItems.length; i++) {
											var path = oSelectedItems[i].getBindingContext().getPath();
											this.deleteProyecto(path);
										}
										MessageToast.show("Se ha(n) eliminado el(los) elemento(s) seleccionado(s)");
									}
								}.bind(this)
							});
						} else {
							MessageToast.show("Debe seleccionar registros de la tabla para eliminar.");
						}*/
        },

        deleteProyecto: function (path) {
			/*			this.getModel().remove(path, {
							success: function (oResult) {
								this.registrarLogAct("Proyecto", "Borrar");
							}.bind(this),
							error: function (oError) {
								var codeError = oError.responseText.toString().substring(oError.responseText.toString().indexOf('Service exception:') + 20,
									oError.responseText.toString().indexOf('Service exception:') + 23);
								if (codeError === "462") {

								}
							}.bind(this)
						});*/
        },

		/**
		 * Manejo de dialogos Agregar y Editar
		 * @public
		 */

        //Dialogo Crear
        onAddProyecto: function () {
			/*			if (!this._oViewAddProyectoDialog) {
							this._oViewAddProyectoDialog = sap.ui.xmlfragment("sapui5agendar.sco00consultadespacho_html.view.fragments.AddProyecto", this);
							this.getView().addDependent(this._oViewAddProyectoDialog);
						} else {
							this.vaciarDialogo();
						}
						this._oViewAddProyectoDialog.open();
						//	sap.ui.getCore().byId("ipORDENCOCrear").setEnabled(false);*/
        },

        vaciarDialogo: function () {
			/*			sap.ui.getCore().byId("idSelectSoc").setValue();
						sap.ui.getCore().byId("ipTITULOCrear").setValue();
						sap.ui.getCore().byId("ipDESCRIPCIONCrear").setValue();
						sap.ui.getCore().byId("ipORDENCOCrear").setValue();
						sap.ui.getCore().byId("idSelectSoc").setValueState("None");
						sap.ui.getCore().byId("ipTITULOCrear").setValueState("None");
						sap.ui.getCore().byId("ipDESCRIPCIONCrear").setValueState("None");
						sap.ui.getCore().byId("ipORDENCOCrear").setValueState("None");*/
        },

        _dialogProyectoGuardar: function () {
            var Titulo = sap.ui.getCore().byId("ipTITULOCrear").getValue();
            var Descripcion = sap.ui.getCore().byId("ipDESCRIPCIONCrear").getValue();
            var Ordenco = sap.ui.getCore().byId("ipORDENCOCrear").getValue();
            var sociedad = sap.ui.getCore().byId("idSelectSoc").getValue();
            if (!this.validarCrear()) {

                this.validarProyectoExiste(sociedad, Ordenco).then(function (res) {
                    if (res.error === false) {
                        if (res.existe === false) {
                            this.getModel().createEntry('Proyecto', {
                                properties: {
                                    ID_PROYECTO: 1,
                                    SOCIEDAD: sociedad,
                                    TITULO: Titulo,
                                    DESCRIPCION: Descripcion,
                                    ACTIVO: 1,
                                    ORDENCO: Ordenco
                                }
                            });
                            this.getModel().submitChanges({
                                success: function (oResult) {
                                    this.registrarLogAct("Proyecto", "Crear");
                                    MessageToast.show("Se ha creado un nuevo registro de Proyecto");
                                    this._dialogProyectoClose();
                                }.bind(this),
                                error: function (oError) { }.bind(this)
                            });
                        } else {
                            MessageBox.show("La orden CO ingresada ya existe para esta sociedad.", {
                                icon: sap.m.MessageBox.Icon.ERROR,
                                title: "Error",
                                actions: [sap.m.MessageBox.Action.OK],
                                onClose: function (sAction) {

                                }.bind(this)
                            });
                        }
                    } else {
                        MessageBox.show("Error al crear el registro, intente nuevamente.", {
                            icon: sap.m.MessageBox.Icon.ERROR,
                            title: "Error",
                            actions: [sap.m.MessageBox.Action.OK],
                            onClose: function (sAction) {

                            }.bind(this)
                        });
                    }
                }.bind(this));

            }
        },

        validarProyectoExiste: function (sociedad, ordenco) {
            return new Promise(function (resolve) {
                var filters = [];
                var data = {};

                filters.push(new Filter({
                    path: "SOCIEDAD",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: sociedad
                }));
                filters.push(new Filter({
                    path: "ORDENCO",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: ordenco
                }));

                this.getModel().read("/Proyecto", {
                    filters: filters,
                    success: function (oResult) {
                        data.error = false;
                        if (oResult.results.length > 0) {
                            data.existe = true;
                        } else {
                            data.existe = false;
                        }
                        resolve(data);
                    }.bind(this),
                    error: function (oError) {
                        data.error = true;
                        resolve(data);
                    }.bind(this)
                });

            }.bind(this));
        },

        validarCrear: function () {
            var fields = [{
                id: 'idSelectSoc',
                tipo: "1"
            }, {
                id: 'ipTITULOCrear',
                tipo: "1"
            }, {
                id: 'ipDESCRIPCIONCrear',
                tipo: "1"
            }, {
                id: 'ipORDENCOCrear',
                tipo: "1"
            }

            ];
            return this.validar(fields);
        },

        validarEditar: function () {

            var fields = [{
                id: 'ipTITULOEditar',
                tipo: "1"
            }, {
                id: 'ipDESCRIPCIONEditar',
                tipo: "1"
            }

            ];
            return this.validar(fields);
        },

        validar: function (fields) {
            var error = false;
            for (var i = 0; i < fields.length; i++) {

                var input = sap.ui.getCore().byId(fields[i].id);
                var tipo = fields[i].tipo;

                if (tipo === "2") {

                    var value = input.getSelectedKey();
                } else {
                    var value = input.getValue();
                }
                if (value.length === 0) {
                    input.setValueState("Error");
                    error = true;
                }
            }
            return error;
        },

        liveChange: function (oEvent) {
            var _oInput = oEvent.getSource();
            _oInput.setValueState("None");
        },

        _dialogProyectoClose: function () {
            this._oViewAddProyectoDialog.close();
        },

        _dialogProyectoGuardarEditar: function () {
            if (!this.validarEditar()) {
                var cambios = this.getModel().getPendingChanges();
                if (Object.keys(cambios).length === 0 && cambios.constructor === Object) {
                    this._dialogProyectoEditarClose();
                } else {
                    this.getModel().submitChanges({
                        success: function (oResult) {
                            this.registrarLogAct("Proyecto", "Editar");
                            MessageToast.show("Se ha actualizado el Proyecto");
                            this._dialogProyectoEditarClose();
                        }.bind(this),
                        error: function (oError) { }.bind(this)
                    });
                }
            }
        },

        _dialogProyectoEditarClose: function () {
            this.getModel().resetChanges();
            this._oViewEditProyectoDialog.close();
            var fields = [{
                id: 'ipTITULOEditar',
                tipo: "1"
            }, {
                id: 'ipDESCRIPCIONEditar',
                tipo: "1"
            }

            ];
            fields.forEach(function (item) {
                sap.ui.getCore().byId(item.id).setValueState("None");
            }.bind(this))
        },
		/**			
		 * Manejo de los Filtros y busqueda   
		 * @public  
		 */
        _feedFacetFilter: function () {
			/*			//Declarar los objetos y los filtros  
						var objetos = this.getView().byId("idFoliosDespachoTable").getItems(),
							filternFolioCliente = new Array(),
							filternEstado = new Array(),
							filternCliente = new Array();
							
						var filters = [];
						filters.push({
							title: "Folio Cliente",
							type: "FolioCliente",
							values: []
						});
						filters.push({
							title: "Estado",
							type: "Estado",
							values: []
						});
						filters.push({
							title: "Cliente",
							type: "Cliente",
							values: []
						});

						jQuery.each(objetos, function (key, value) {
							var obj = value.getBindingContext().getObject();
							console.log(obj);
							var nFolioClienteD = obj.FolioCliente;
							if (filternFolioCliente.indexOf(nFolioCliente) === -1) {
								filters[0].values.push({
									text: nFolioCliente,
									key: nFolioCliente
								});
								filternFolioCliente.push(nFolioCliente);
							}
							var nEstado = obj.Estado;
							if (filternEstado.indexOf(nEstado) === -1) {
								filters[1].values.push({
									text: nEstado,
									key: nEstado
								});
								filternEstado.push(nEstado);
							}
							var nCliente = obj.Cliente;
							if (filternCliente.indexOf(nCliente) === -1) {
								filters[2].values.push({
									text: nCliente,
									key: nCliente
								});
								filternCliente.push(nCliente);
							}
						});
						this.getModel("mainView").setProperty("/Filters", filters);*/
        },
        handleFacetFilterConfirm: function (oEvent) {
			/*			var oFacetFilter = oEvent.getSource();
						var mFacetFilterLists = oFacetFilter.getLists().filter(function (oList) {
							return oList.getSelectedItems().length;
						});
						if (mFacetFilterLists.length) {
							var oFilter = new Filter(mFacetFilterLists.map(function (oList) {
								return new Filter(oList.getSelectedItems().map(function (oItem) {
									return new Filter(oList.getKey(), "EQ", oItem.getKey());
								}), false);
							}), true);
							this._applyFilter(oFilter);
						} else {
							this._applyFilter([]);
						}*/
        },

        closeCarga: function () {

            this._oPopover.close();

        },

        handleFilterReset: function (oEvent) {
			/*			var oFacetFilter = this.byId("idFacetFilter");
						var aFacetFilterLists = oFacetFilter.getLists();
						for (var i = 0; i < aFacetFilterLists.length; i++) {
							aFacetFilterLists[i].setSelectedKeys();
						}
						this._applyFilter([]);*/
        },

        _applyFilter: function (oFilter) {
			/*			var oTable = this.byId("idProyectosTable");
						oTable.getBinding("items").filter(oFilter);*/
        },

        onSearch: function (oEvent) {
            var retono = "";
            var mensaje = "";
            var oViewModel = this.getModel("mainView");
            var andFilters = [];
            var rut = oViewModel.getProperty('/Rut');
            var patente = oViewModel.getProperty('/Patente');
            var clave = oViewModel.getProperty('/Clave');

            if (oViewModel.getProperty('/FolioSearch') != "" && oViewModel.getProperty('/FolioSearch') != null) {
                //----------------------------------------- Verificar transportista ----------------------------------------------------//						
                /*
                                andFilters.push(new sap.ui.model.Filter({
                                    path: "IClave",
                                    operator: sap.ui.model.FilterOperator.EQ,
                                    value1: clave
                                }));
                
                                andFilters.push(new sap.ui.model.Filter({
                                    path: "IPatente",
                                    operator: sap.ui.model.FilterOperator.EQ,
                                    value1: patente
                                }));
                
                                andFilters.push(new sap.ui.model.Filter({
                                    path: "IRut",
                                    operator: sap.ui.model.FilterOperator.EQ,
                                    value1: rut
                                }));
                
                                andFilters.push(new sap.ui.model.Filter({
                                    path: "IAccion",
                                    operator: sap.ui.model.FilterOperator.EQ,
                                    value1: 'C'
                                }));
                */
                andFilters.push(new sap.ui.model.Filter({
                    path: "FolioCliente",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: oViewModel.getProperty('/FolioSearch')
                }));

                var oTable = this.getView().byId("idFoliosDespachoTable");

                oTable.getBinding("items").filter([andFilters]);

                /*

                this.getOwnerComponent().getModel("oModelDespacho").read("/DespachoSet", {
                    filters: andFilters,
                    success: function (oResult) {
                        retono = oResult.results[0].OReturn.Retorno.trim();
                        mensaje = oResult.results[0].OReturn.Mensaje.trim();

                        if (retono == "0" || retono == "2") {
                            oViewModel.setProperty('/VisibleLogin', false);
                            oViewModel.setProperty('/VisibleBuscarFolio', true);
                            oViewModel.setProperty('/DespachoEstado', oResult.results[0].OEstado.trim());
                            oViewModel.setProperty('/DespachoEstadoTxt', oResult.results[0].OEstadoTxt.trim());
                            oViewModel.setProperty('/DespachoFolio', oResult.results[0].OFolio.trim());
                            oViewModel.setProperty('/DespachoNombreChofer', oResult.results[0].ONombre.trim());
                            oViewModel.setProperty('/DespachoCentro', oResult.results[0].OWerks.trim());
                            oViewModel.setProperty('/DespachoCentroTxt', oResult.results[0].OWerksTxt.trim());

                            //----------------------------------------- INICIO Consultar Folio transportista ----------------------------------------------------//						
                            if (retono == "0") {

                                if (oResult.results[0].OEstado.trim() == '1CP') {
                                    oViewModel.setProperty('/VisibleFinDespacho', false);
                                } else {
                                    oViewModel.setProperty('/VisibleFinDespacho', true);
                                }

                                oViewModel.setProperty('/VisibleDespacho', true);
                                oViewModel.setProperty('/VisibleFolioCliente', false);

                                andFilters = [];
                                andFilters.push(new sap.ui.model.Filter({
                                    path: "FolioCliente",
                                    operator: sap.ui.model.FilterOperator.EQ,
                                    value1: oResult.results[0].OFolio.trim()
                                }));

                                this.getOwnerComponent().getModel("oModelDespacho").read("/FoliosClienteSet?", {
                                    filters: andFilters,
                                    success: function (oResult2) {
                                        //	retono = oResult2.results[0].OReturn.Retorno.trim();
                                        //	mensaje = oResult2.results[0].OReturn.Mensaje.trim();
                                        //	if (retono == "0") {
                                        var foliosDespacho = oResult2.results;

                                        for (var i = 0; i < foliosDespacho.length; i++) {
                                            foliosDespacho[i].EstadoTxt = foliosDespacho[i].Estado + " - " + foliosDespacho[i].EstadoTxt;

                                            if (foliosDespacho[i].Estado == 'CLA') {
                                                foliosDespacho[i].EstadoColor = "Success";
                                            } else if (foliosDespacho[i].Estado == 'NAT') {
                                                foliosDespacho[i].Selected = true;
                                                foliosDespacho[i].EstadoColor = "Error";
                                            } else {
                                                foliosDespacho[i].EstadoColor = "Error";
                                            }

                                            foliosDespacho[i].Cliente = foliosDespacho[i].Cliente + " - " + foliosDespacho[i].Nombre;
                                            foliosDespacho[i].VisibleAceptar = false;

                                        }
                                        oViewModel.setProperty('/FoliosDepacho', foliosDespacho);

                                    }.bind(this),
                                    error: function () { }.bind(this)
                                });
                            } else {
                                sap.m.MessageBox.success(mensaje, {
                                    title: "Información",
                                    onClose: null,
                                    styleClass: "",
                                    initialFocus: null,
                                    textDirection: sap.ui.core.TextDirection.Inherit
                                });
                            }
                            //----------------------------------------- FIN Consultar Folio transportista ----------------------------------------------------//											

                        } else {
                            sap.m.MessageBox.error(mensaje, {
                                title: "Error",
                                onClose: null,
                                styleClass: "",
                                initialFocus: null,
                                textDirection: sap.ui.core.TextDirection.Inherit
                            });
                        }

                    }.bind(this),
                    error: function () { }.bind(this)
                });

                */

            } else {

                var oTable = this.getView().byId("idFoliosDespachoTable");

                oTable.getBinding("items").filter([andFilters]);
                
            }
        }

    });

});