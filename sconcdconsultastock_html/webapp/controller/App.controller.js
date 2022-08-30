// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sapui5agendar/sconcdconsultastock_html/utils/utils",
    "sap/ui/core/routing/History",
    "sap/ui/Device",
    "sap/m/MessageToast"
], function (Controller, utils, History, Device, MessageToast) {
    "use strict";

    return Controller.extend("sapui5agendar.sconcdconsultastock_html.controller.App", {
        onInit: function () {
            var oThis = this;
            this._showView(false);
            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "yyyy.MM.dd",
                UTC: false
            });
            var oModel = new sap.ui.model.json.JSONModel(),
                oView = this.getView();
            oView.setModel(oModel);
            utils.view = oView;
            oView.bindElement("/Filtros");
            //    var sUser = utils.getUser(),
            //        that = this;

            var that = this;

            var fechas = {
                FECHA_INI: dateFormat.format(this._getFechaDesde()),
                FECHA_FIN: dateFormat.format(this._getFechaHasta())
            };

            oModel.setProperty("/FiltrosDefault", fechas);
            var oFiltrosDefault = {};
            oFiltrosDefault.FECHA_INI = dateFormat.format(oThis._getFechaDesde());
            oFiltrosDefault.FECHA_FIN = dateFormat.format(oThis._getFechaHasta());
            oModel.setProperty("/FiltrosDefault", oFiltrosDefault);
            that.blankLocalModel();

            /*
                        utils.getUserData(function (oResp) {
                            var aDatosEmpresa = oResp.T_DATEMPR,
                                oFiltrosDefault = {};
                            oModel.setProperty("/datosEmpresa", oResp);
            
                            // Busco selecciones de combo por defecto
                            aDatosEmpresa = aDatosEmpresa.filter(d => d.DEFECTO === "X");
            
                            for (var i in aDatosEmpresa) {
                                switch (aDatosEmpresa[i].ID_TIPO) {
                                    case "WERKS":
                                        oFiltrosDefault.i_centro = aDatosEmpresa[i].VALOR;
                                        break;
                                    case "VKORG":
                                        oFiltrosDefault.i_orgventa = aDatosEmpresa[i].VALOR;
                                    default:
                                        break;
                                }
                            }
                            oFiltrosDefault.FECHA_INI = dateFormat.format(oThis._getFechaDesde());
                            oFiltrosDefault.FECHA_FIN = dateFormat.format(oThis._getFechaHasta());
                            oModel.setProperty("/FiltrosDefault", oFiltrosDefault);
                            that.blankLocalModel();
                        });
            
                        */

        },
        _getFechaDesde: function () {
            var fechaDesde = new Date();
            //fechaDesde.setMonth(fechaDesde.getMonth() - 1);
            fechaDesde.setDate(fechaDesde.getDate() - 7)
            return fechaDesde;
        },
        _getFechaHasta: function () {
            var fechaHasta = new Date();

            return fechaHasta;
        },
        blankLocalModel: function () {
            var oModel = this.getView().getModel(),
                oFiltrosDefault = oModel.getProperty("/FiltrosDefault"),
                sOrgVenta = oFiltrosDefault.i_orgventa,
                oFiltros = Object.assign({}, oFiltrosDefault);

            // Cargo datos iniciales
            oModel.setProperty("/Filtros", oFiltros);

            // Selecciono centro por defecto para obtener entidades dependientes
            //   if (oFiltrosDefault.i_orgventa) {
            this.selectOrgVenta(oFiltrosDefault.i_orgventa, oFiltrosDefault.i_centro);
            //   }
        },
        selectOrgVenta: function (orgVenta, centro) {

            var model = this.getView().getModel();

            let T_CENTRO = [];

            T_CENTRO.push({
                CENTRO: "CENTRO1",
                DESCRIPCION: "Centro 1"
            });

            T_CENTRO.push({
                CENTRO: "CENTRO2",
                DESCRIPCION: "Centro 2"
            });

            T_CENTRO.push({
                CENTRO: "CENTRO3",
                DESCRIPCION: "Centro 3"
            });

            debugger;
            model.setProperty("/Centros", T_CENTRO);
            var selectCentros = this.byId('comboCentro');
            selectCentros.setSelectedKey(selectCentros.getSelectedKey());

            /*
                        utils.httpCall({
                            service: "ZPWD_013_SEQDROP",
                            query: {
                                i_user: utils.getUser(),
                                i_orgventa: orgVenta,
                                i_centro: centro
                            },
                            success: result => {
                                model.setProperty("/Centros", result.T_CENTRO);
                                var selectCentros = this.byId('comboCentro');
                                selectCentros.setSelectedKey(selectCentros.getSelectedKey());
                            }
                        });
            
                        */
        },
        handleLimpiarPress: function () {
            var oModel = this.getView().getModel(),
                oFiltrosDefault = oModel.getProperty("/FiltrosDefault"),
                oFiltros = Object.assign({}, oFiltrosDefault);

            // Cargo datos iniciales
            oModel.setProperty("/Filtros", oFiltros);
            oModel.setProperty("/Resultado", null);
        },
        handlePressSearch: function () {
            var oModel = this.getView().getModel(),
                oTable = this.byId('table0'),
                centro = oModel.getProperty("/Filtros").i_centro,
                material = oModel.getProperty("/Filtros").MATERIAL,
                cod_parte = oModel.getProperty("/Filtros").COD_PARTE,
                fecha_ini = oModel.getProperty("/Filtros").FECHA_INI,
                fecha_fin = oModel.getProperty("/Filtros").FECHA_FIN,
                FECHA_INI = fecha_ini.replace(/\./g, ''),
                FECHA_FIN = fecha_fin.replace(/\./g, '');

            var validaFecha = this._validaFechas(oModel);
            var validaDatosObligatorios = this._validaDatosObligatorios(oModel.getProperty("/Filtros"));


            let ALMACENES = [];

            ALMACENES.push({
                ALMACEN: "REPT",
                CANTIDAD: 288,
                DESCRIP: "Repuesto",
                MATERIAL: "497",
                UBI_ACTUAL: "R1BH28C01A",
                UBI_ANTIGUA: "0"
            });

            let CANTI_X_PQ = [];



            let CODIGOS_PARTE = [];

            CODIGOS_PARTE.push({
                COD_PARTE: "22RN5010534364I",
                MATERIAL: "497"
            });

            let DEMANDA = [];

            DEMANDA.push({
                DEMANDA: 0,
                FECHA_COMPRA: "2017-05-26",
                FECHA_VENTA: "2016-07-12",
                MATERIAL: "497",
                STOCK_NAC: 288,
                STOCK_REPOSICION: 0
            });

            let DETALLE_STOCK = [];

            DETALLE_STOCK.push({
                ALMACEN: "REPT",
                MATERIAL: "497",
                STOCK_CALZADO: 0,
                STOCK_RESERVA: 0,
                STOCK_TRANSITO: 0,
            });

            let HISTORIAL_UBI = [];

            HISTORIAL_UBI.push({
                MATERIAL: "497",
                UBICACION: "R1BH28C01A"
            });

            HISTORIAL_UBI.push({
                MATERIAL: "497",
                UBICACION: "0"
            });

            HISTORIAL_UBI.push({

                MATERIAL: "497",
                UBICACION: "R1AL01C02A"
            });

            HISTORIAL_UBI.push({

                MATERIAL: "497",
                UBICACION: "R181R01A30"
            });


            HISTORIAL_UBI.push({

                MATERIAL: "497",
                UBICACION: "Z181R01A30"
            });

            HISTORIAL_UBI.push({

                MATERIAL: "497",
                UBICACION: "Z072E22I05"
            });


            let IMPRESORAS = [];

            IMPRESORAS.push({

                DESCRIP_TIPO: "Fija",
                IMPRESORA: "STGRIETQ27",
                NOMBRE_IMP: "IMPRESORA ZEBRA GK420T - 27",
                TIPO_IMPRESORA: "F"
            });

            IMPRESORAS.push({

                DESCRIP_TIPO: "Fija",
                IMPRESORA: "STGRIETQ3",
                NOMBRE_IMP: "IMPRESORA ZEBRA GK420T - 03",
                TIPO_IMPRESORA: "F"
            });

            IMPRESORAS.push({

                DESCRIP_TIPO: "Fija",
                IMPRESORA: "STGRIETQ33",
                NOMBRE_IMP: "IMPRESORA ZEBRA GK420T - 33",
                TIPO_IMPRESORA: "F"
            });

            IMPRESORAS.push({

                DESCRIP_TIPO: "Fija",
                IMPRESORA: "STGRIETQ34",
                NOMBRE_IMP: "IMPRESORA ZEBRA GK420T - 34",
                TIPO_IMPRESORA: "F"
            });

            let MATERIALES = [];

            MATERIALES.push({

                COD_PARTE: "22RN5010534364I",
                DESCRIP: "TORNILLO COLLAR, CAJA SAT DIFERENCIAL",
                MATERIAL: "497",
                PROVEEDOR: "RENAULT TRUCKS",
                STOCK_TOTAL: 288

            });

            let MOVIMIENTOS = [];

            let RETURN = [];

            let result = {

                ALMACENES: ALMACENES,
                CANTI_X_PQ: CANTI_X_PQ,
                CODIGOS_PARTE: CODIGOS_PARTE,
                //         DEMANDA: DEMANDA,
                DETALLE_STOCK: DETALLE_STOCK,
                HISTORIAL_UBI: HISTORIAL_UBI,
                IMPRESORAS: IMPRESORAS,
                MATERIALES: MATERIALES,
                //              MENSAJE: MENSAJE,
                MOVIMIENTOS: MOVIMIENTOS,
                DEMANDA_C: DEMANDA,
                RETURN: RETURN,
            };


            if (validaDatosObligatorios.validacion) {

                if (validaFecha.validacion) {
                    oModel.setProperty("/Resultado", result);

                    if (result.MATERIALES.length === 0) {
                        //                        MessageToast.show(result.MENSAJE);
                    }
                    if (result.MATERIALES.length === 1) {
                        var oModelDetalleStock = new sap.ui.model.json.JSONModel(),
                            material = result.MATERIALES[0].MATERIAL;
                          

                        oModelDetalleStock.setProperty("/Impresoras", result.IMPRESORAS);
                        oModelDetalleStock.setProperty("/DESCRIP", result.MATERIALES[0].DESCRIP);
                        oModelDetalleStock.setProperty("/MATERIAL", material);
                        oModelDetalleStock.setProperty("/STOCK_TOTAL", result.MATERIALES[0].STOCK_TOTAL);
                        oModelDetalleStock.setProperty("/COD_PARTE", result.MATERIALES[0].COD_PARTE);

                        oModelDetalleStock.setProperty("/Almacenes", oModel.getProperty("/Resultado/ALMACENES").filter(d => d.MATERIAL === material));
                        oModelDetalleStock.setProperty("/DetalleStock", oModel.getProperty("/Resultado/DETALLE_STOCK").filter(d => d.MATERIAL ===
                            material));
                        oModelDetalleStock.setProperty("/Movimientos", oModel.getProperty("/Resultado/MOVIMIENTOS").filter(d => d.MATERIAL ===
                            material));
                        oModelDetalleStock.setProperty("/CodigoParte", oModel.getProperty("/Resultado/CODIGOS_PARTE").filter(d => d.MATERIAL ===
                            material));

                        oModelDetalleStock.setProperty("/HistorialUbi", oModel.getProperty("/Resultado/HISTORIAL_UBI").filter(d => d.MATERIAL ===
                            material));

                        oModelDetalleStock.setProperty("/Demanda", oModel.getProperty("/Resultado/DEMANDA_C").filter(d => d.MATERIAL ===
                            material));

                        this.getOwnerComponent().setModel(oModelDetalleStock, "detalleStock");
                        this._showView(true);
                    }

                } else {
                    MessageToast.show(validaFecha.msg);
                }
            } else {
                MessageToast.show(validaDatosObligatorios.msg);
            }

            /*

            if (validaDatosObligatorios.validacion) {
                if (validaFecha.validacion) {

                    /*
                    utils.httpCall({
                        service: "ZFMM_CONSULTA_STOCK",
                        query: {
                            CENTRO: centro,
                            MATERIAL: material,
                            COD_PARTE: cod_parte,
                            FECHA_INI: FECHA_INI,
                            FECHA_FIN: FECHA_FIN
                        },
                        success: result => {
                            oModel.setProperty("/Resultado", result);
                            if (result.MATERIALES.length === 0) {
                                MessageToast.show(result.MENSAJE);
                            }
                            if (result.MATERIALES.length === 1) {
                                var oModelDetalleStock = new sap.ui.model.json.JSONModel(),
                                    material = result.MATERIALES[0].MATERIAL;

                                oModelDetalleStock.setProperty("/DESCRIP", result.MATERIALES[0].DESCRIP);
                                oModelDetalleStock.setProperty("/MATERIAL", material);
                                oModelDetalleStock.setProperty("/STOCK_TOTAL", result.MATERIALES[0].STOCK_TOTAL);
                                oModelDetalleStock.setProperty("/COD_PARTE", result.MATERIALES[0].COD_PARTE);

                                oModelDetalleStock.setProperty("/Almacenes", oModel.getProperty("/Resultado/ALMACENES").filter(d => d.MATERIAL === material));
                                oModelDetalleStock.setProperty("/DetalleStock", oModel.getProperty("/Resultado/DETALLE_STOCK").filter(d => d.MATERIAL ===
                                    material));
                                oModelDetalleStock.setProperty("/Movimientos", oModel.getProperty("/Resultado/MOVIMIENTOS").filter(d => d.MATERIAL ===
                                    material));
                                oModelDetalleStock.setProperty("/CodigoParte", oModel.getProperty("/Resultado/CODIGOS_PARTE").filter(d => d.MATERIAL ===
                                    material));

                                this.getOwnerComponent().setModel(oModelDetalleStock, "detalleStock");
                                this._showView(true);
                            }
                        }
                    });

                    
                } else {
                    MessageToast.show(validaFecha.msg);
                }
            } else {
                MessageToast.show(validaDatosObligatorios.msg);
            }

            */

        },
        _validaFechas: function (model) {
            var fecha_ini = model.getProperty("/Filtros").FECHA_INI,
                fecha_fin = model.getProperty("/Filtros").FECHA_FIN,
                validacion = true,
                msg;
            /*				fecha_ini_dia = 
                            fecha_ini_mes = 
                            fecha_ini_ano =
                            fecha_fin_dia =
                            fecha_fin_mes =
                            fecha_fin_ano =*/

            var diff = Math.abs(new Date(fecha_fin).getTime() - new Date(fecha_ini).getTime()),
                diffD = Math.ceil(diff / (1000 * 60 * 60 * 24));

            if (new Date(fecha_ini) > new Date(fecha_fin)) {
                validacion = false;
                msg = "'Fecha Inicio' no puede ser mayor a 'Fecha Fin'";
            }
            if (diffD >= 365) {
                validacion = false;
                msg = "Rango de fechas debe ser menor a un año";
            }
            if (new Date(fecha_fin) > new Date()) {
                validacion = false;
                msg = "'Fecha Hasta' no puede exceder la fecha actual";
            }
            return { validacion: validacion, msg: msg };
        },
        _validaDatosObligatorios: function (model) {
            var material = model.MATERIAL,
                cod_parte = model.COD_PARTE,
                fecha_ini = new Date(model.FECHA_INI),
                fecha_fin = new Date(model.FECHA_FIN),
                centro = model.i_centro,
                validacion = true,
                msg;

            if (((material === undefined || material === null || material.trim() === '') && (cod_parte === undefined || cod_parte === null || cod_parte.trim() === ''))) {
                validacion = false;
                msg = "'Material' o 'Cod. Parte' es Obligatorio";
            }
            if (fecha_ini.toDateString() === "Invalid Date") {
                validacion = false;
                msg = "Verifique el campo: 'Fecha Inicio'";
            }
            if (fecha_fin.toDateString() === "Invalid Date") {
                validacion = false;
                msg = "Verifique el campo: 'Fecha Fin'";
            }
            if (centro === undefined || centro === null || centro.trim() === '') {
                validacion = false;
                msg = "Verifique el campo: 'Centro'";
            }

            return { validacion: validacion, msg: msg };
        },
        pressPrueba: function () {
            var oModel = this.getView().getModel();
        },
        onListUpdateFinished: function (oEvent) {
            var oModel = this.getView().getModel(),
                iTotalItems = oEvent.getParameter("total"),
                i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle(),
                sTitle;

            if (this.byId("lineItemsList").getBinding("items").isLengthFinal()) {
                if (iTotalItems) {
                    sTitle = i18n.getText("detailLineItemTableHeadingCount", [iTotalItems]);
                } else {
                    //Display 'Line Items' instead of 'Line items (0)'
                    sTitle = i18n.getText("detailLineItemTableHeading");
                }
                oModel.setProperty("/lineItemListTitle", sTitle);
            }
        },
        onPress: function (oEvent) {
            //Almacenes y Movimientos
            var oModel = this.getView().getModel(),
                oModelDetalleStock = new sap.ui.model.json.JSONModel(),
                material = oEvent.getSource().getBindingContext().getProperty("MATERIAL");

            oModelDetalleStock.setProperty("/DESCRIP", oEvent.getSource().getBindingContext().getProperty("DESCRIP"));
            oModelDetalleStock.setProperty("/MATERIAL", oEvent.getSource().getBindingContext().getProperty("MATERIAL"));
            oModelDetalleStock.setProperty("/STOCK_TOTAL", oEvent.getSource().getBindingContext().getProperty("STOCK_TOTAL"));
            oModelDetalleStock.setProperty("/COD_PARTE", oEvent.getSource().getBindingContext().getProperty("COD_PARTE"));

            oModelDetalleStock.setProperty("/Almacenes", oModel.getProperty("/Resultado/ALMACENES").filter(d => d.MATERIAL === material));
            oModelDetalleStock.setProperty("/DetalleStock", oModel.getProperty("/Resultado/DETALLE_STOCK").filter(d => d.MATERIAL === material));
            oModelDetalleStock.setProperty("/Movimientos", oModel.getProperty("/Resultado/MOVIMIENTOS").filter(d => d.MATERIAL === material));
            oModelDetalleStock.setProperty("/CodigoParte", oModel.getProperty("/Resultado/CODIGOS_PARTE").filter(d => d.MATERIAL === material));

            this.getOwnerComponent().setModel(oModelDetalleStock, "detalleStock");
            this._showView(true);
        },
        onNavBackDetalle: function () {
            this._showView(false);
        },
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        _showView: function (bEdit) {
            this._showFormFragment(bEdit ? "DetalleStock" : "ConsultaStock");
        },
        _formFragments: {},
        _showFormFragment: function (sFragmentName) {
            var oPage = this.byId("page");
            oPage.removeAllContent();
            oPage.insertContent(this._getFormFragment(sFragmentName));
        },
        _getFormFragment: function (sFragmentName) {
            var oFormFragment = this._formFragments[sFragmentName];
            if (oFormFragment) {
                return oFormFragment;
            }
            oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "sapui5agendar.sconcdconsultastock_html.view." +
                sFragmentName,
                this);
            this._formFragments[sFragmentName] = oFormFragment;
            return this._formFragments[sFragmentName];
        },
        onExit: function () {
            for (var sPropertyName in this._formFragments) {
                if (!this._formFragments.hasOwnProperty(sPropertyName) || this._formFragments[sPropertyName] === null) {
                    return;
                }

                this._formFragments[sPropertyName].destroy();
                this._formFragments[sPropertyName] = null;
            }
        },
        inputNumeric: function (oEvent) {
            var value = oEvent.getSource().getValue();
            var bNotnumber = isNaN(value);
            if (bNotnumber == false) var sNumber = value;
            else oEvent.getSource().setValue(value.slice(0, value.length - 1));
        },

        pressImprimir: function () {
            this.onOpenDialog()
        },

        onOpenDialog: function () {
            this._getDialog().open()
        },
        addCancel: function () {
            this._getDialog().close()
        },
        _getDialog: function () {
            var e = this;
            if (!this._oDialog) {
                this._oDialog = sap.ui.xmlfragment(this.createId("frag_picking"),
                    "sapui5agendar.sconcdconsultastock_html.view.Imprimir", e);
                this._oDialog.setEscapeHandler(function (t) {
                    e.addCancel()
                });
                this.getView().addDependent(this._oDialog);
                var t = this.getView().createId("frag_print")
            }
            return this._oDialog
        },
        pressImprimir: function () {
            this.onOpenDialog()
        },
        pressConfirm: function () {
            var e = this.getView().getModel(),
                r = this.getView().getModel("detalleStock"),
                o = r.getProperty("/MATERIAL"),
                s = e.getProperty("/Filtros/i_centro"),
                a = e.getProperty("/Filtros/_AlmacenImpresion"),
                n = e.getProperty("/Filtros/_CantidadImpresion"),
                l = e.getProperty("/Filtros/_Impresora");
            if (n === undefined || n === "" || (a === undefined || a === "") || (l === undefined || l === "")) {
                i.show("Todos los campos son obligatorios para imprimir")
            } else if (n === "0") {
                i.show("La cantidad a imprimir no puede ser 0")
            } else {

                this._getDialog().close()
                /*
				t.httpCall({
					service: "ZFMM_IMPRESION_ETI_MATERIAL",
					query: {
						MATERIAL: o,
						CENTRO: s,
						ALMACEN: a,
						COPIAS: n,
						IMPRESORA: l
					},
					success: e => {
						if (e.RETORNO === "E") {
							i.show("Imprimiendo...")
						}
						this._getDialog().close()
					}
				})

                */
            }
        }

    });
});