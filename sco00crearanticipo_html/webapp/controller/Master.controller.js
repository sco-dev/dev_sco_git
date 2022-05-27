// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sapui5agendar/sco00crearanticipo_html/utils/utils",
    "sapui5agendar/sco00crearanticipo_html/model/models",
    "sapui5agendar/sco00crearanticipo_html/utils/validator",
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, utils, models, Validator) {
        "use strict";

        return Controller.extend("sapui5agendar.sco00crearanticipo_html.controller.Master", {

            onInit: function () {

                this._basicInit();

            },

            _basicInit: function () {
                // @ts-ignore
                let oModel = models.createLocalModel();
                let view = this.getView();

                view.setModel(oModel);
                // @ts-ignore
                utils.view = view;
                // @ts-ignore
                utils.controller = this;

                this._iniciarCampos();

                // @ts-ignore
                this._oMessagePopover = new sap.m.MessagePopover({
                    items: {
                        path: "message>/",
                        // @ts-ignore
                        template: new sap.m.MessageItem({
                            description: "{message>description}",
                            type: "{message>type}",
                            title: "{message>message}"
                        })
                    }
                });
                // @ts-ignore
                this.getView().addDependent(this._oMessagePopover);

                // @ts-ignore
                this._dataValid = false;
            },

            _iniciarCampos: function () {
                let oModel = this.getView().getModel();
                let that = this;
                // @ts-ignore
                oModel.setProperty('/TotalMonto', 0);
                let sociedades = [];

                sociedades.push({
                    CODIGO: 1000,
                    DESCRIPCION: '1000 - Salfa'
                });
                sociedades.push({
                    CODIGO: 2000,
                    DESCRIPCION: '2000 - Arrendadora de Vehículos'
                });
                sociedades.push({
                    CODIGO: 3000,
                    DESCRIPCION: '3000 - Servicio y Arriendo'
                });
                sociedades.push({
                    CODIGO: 4000,
                    DESCRIPCION: '4000 - Comercial Salfa'
                });
                sociedades.push({
                    CODIGO: 5000,
                    DESCRIPCION: '5000 - Inversiones Salfa'
                });
                sociedades.push({
                    CODIGO: 6000,
                    DESCRIPCION: '6000 - Inversiones Automotrices'
                });
                sociedades.push({
                    CODIGO: 7000,
                    DESCRIPCION: '7000 - Capacitación'
                });

                oModel.setProperty('/i_Sociedad', "2000");

                that._cargarAreasControl();
                // @ts-ignore
                that._cargarCiudades();
                // @ts-ignore
                that._cargarOficVentas();


                /*
                            // @ts-ignore
                            utils.getUserData(resp => {
                                let sociedad = resp.T_DATEMPR.find(x => x.ID_TIPO === 'BUKRS' && x.DEFECTO === 'X').VALOR;
                                // @ts-ignore
                                oModel.setProperty('/i_Sociedad', sociedad);
                                // @ts-ignore
                                that._cargarAreasControl();
                                // @ts-ignore
                                that._cargarCiudades();
                                // @ts-ignore
                                that._cargarOficVentas();
                            });
                */
                // @ts-ignore
                oModel.setProperty('/Cliente', '');
                // @ts-ignore
                oModel.setProperty("/ClienteState", null);
                // @ts-ignore
                oModel.setProperty("/ClienteStateText", null);

                // @ts-ignore
                oModel.setProperty('/Sociedades', sociedades);
                // @ts-ignore
                //                oModel.setProperty('/Areas_Control_Credito', null);
                // @ts-ignore
                oModel.setProperty('/i_Area_Control_Credito', null);
                // @ts-ignore
                //                oModel.setProperty('/Ciudades', []);
                // @ts-ignore
                oModel.setProperty('/i_Ciudad', null);
                // @ts-ignore
                oModel.setProperty('/Sucursales', []);
                // @ts-ignore
                oModel.setProperty('/i_Sucursal', null);
                // @ts-ignore
                oModel.setProperty('/Unidades_Negocio', []);
                // @ts-ignore
                oModel.setProperty('/i_Unidad_Negocio', null);
                // @ts-ignore
                oModel.setProperty('/Centros_Beneficio', []);
                // @ts-ignore
                oModel.setProperty('/i_Centro_Beneficio', null);
                // @ts-ignore
                oModel.setProperty('/i_Via_Pago', null);
                // @ts-ignore
                oModel.setProperty('/Medios_Pago', []);
                // @ts-ignore
                oModel.setProperty('/i_Medio_Pago', null);
                // @ts-ignore
                oModel.setProperty('/i_Medio_Pago_Prev', null);

                // @ts-ignore
                oModel.setProperty('/Rut', '');
                // @ts-ignore
                oModel.setProperty('/Operacion', '');
                // @ts-ignore
                oModel.setProperty('/NumeroOC', '');
                // @ts-ignore
                oModel.setProperty('/Bancos', []);
                // @ts-ignore
                oModel.setProperty('/i_Banco', null);
                // @ts-ignore
                oModel.setProperty('/Cuentas', []);
                // @ts-ignore
                oModel.setProperty('/i_Institucion', null);
                // @ts-ignore
                oModel.setProperty('/Observacion', '');
                //***************************************************************************************
                // Modificado por Samuel Silva
                // S127846 - S133532 Anticipo con tarjeta de crédito en cuotas:
                // Fecha 09-09-2020
                //***************************************************************************************
                // @ts-ignore
                oModel.setProperty('/CUOTAS', null);
                //***************************************************************************************
                // @ts-ignore
                oModel.setProperty('/Fecha_Recaudacion', '');

                // @ts-ignore
                oModel.setProperty('/Visible_form', false);

                // @ts-ignore
                oModel.setProperty('/Visible_rut', false);
                // @ts-ignore
                oModel.setProperty('/Visible_operacion', false);
                // @ts-ignore
                oModel.setProperty('/Visible_numeroOC', false);
                // @ts-ignore
                oModel.setProperty('/Visible_banco', false);
                // @ts-ignore
                oModel.setProperty('/Visible_cuenta', false);
                // @ts-ignore
                oModel.setProperty('/Visible_institucion', false);
                // @ts-ignore
                oModel.setProperty('/Visible_observacion', false);
                //***************************************************************************************
                // Modificado por Samuel Silva
                // S127846 - S133532 Anticipo con tarjeta de crédito en cuotas:
                // Fecha 09-09-2020
                //***************************************************************************************
                // @ts-ignore
                oModel.setProperty('/Visible_CUOTAS', false);
                //***************************************************************************************
                // @ts-ignore
                oModel.setProperty('/Visible_fecha_recaudacion', false);
                //***************************************************************************************
                // Modificado por Namdher Colmenares
                // S139143 mejora creación anticipos SALFACLOUD MODULO 
                // Fecha 08-01-2021
                //***************************************************************************************	
                // @ts-ignore
                oModel.setProperty('/GrpVenta_enabled', false);
                //***************************************************************************************				
                this._cargarViasPago();
                this._cargarBancos();
                //            this._cargarInstituciones();

            },


            _cargarBancos: function () {
                let oModel = this.getView().getModel();
                let that = this;

                let IT_BANCOS = [];

                IT_BANCOS.push({
                    CODIGO: "BBVA",
                    DESCRIPCION: "BBVA - BBVA"
                });

                IT_BANCOS.push({
                    CODIGO: "BCHP",
                    DESCRIPCION: "BCHP - Banco de Chile"
                });

                IT_BANCOS.push({
                    CODIGO: "BCIP",
                    DESCRIPCION: "BCIP - Banco de Crédito e Inversione"
                });

                IT_BANCOS.push({
                    CODIGO: "BESP",
                    DESCRIPCION: "BESP - Banco del Estado de Chile"
                });

                IT_BANCOS.push({
                    CODIGO: "BINT",
                    DESCRIPCION: "BINT - Banco Internacional"
                });

                oModel.setProperty('/Bancos', IT_BANCOS);

                /*
                                utils.getUserData(resp => {
                                    let sociedad = resp.T_DATEMPR.find(x => x.ID_TIPO === 'BUKRS' && x.DEFECTO === 'X').VALOR;
                                    var oFilters = {
                                        SOCIEDAD: sociedad
                                    };
                
                                    utils.httpCall({
                                        service: "Znwm_Sd_Caja_Bancos",
                                        query: oFilters,
                                        type: "post",
                                        success: function (result, status, xhr) {
                                            if (result.IT_BAPIRETURN[0].TYPE == "S") {
                                                oModel.setProperty('/Bancos', result.IT_BANCOS);
                                            } else {
                                                that._manageMessages(result.IT_BAPIRETURN[0]);
                                            }
                                        }
                                    });
                                });
                
                                */

            },

            _cargarAreasControl: function () {

                let oModel = this.getView().getModel();
                let ACC_SOCIEDAD = [];

                var oFilters = {
                    SOCIEDAD: oModel.getProperty('/i_Sociedad')
                };

                ACC_SOCIEDAD.push({
                    KKBER: "CR20",
                    KKBTX: "Leasing Operativo",
                    MANDT: "",
                    SPRAS: "",
                });

                ACC_SOCIEDAD.push({
                    KKBER: "CR21",
                    KKBTX: "Rent A Car Diario",
                    MANDT: "",
                    SPRAS: ""
                });

                ACC_SOCIEDAD.push({
                    KKBER: "CR21",
                    KKBTX: "Rent A Car Diario",
                    MANDT: "",
                    SPRAS: ""
                });

                oModel.setProperty('/Areas_Control_Credito', ACC_SOCIEDAD);

                /*
                            utils.httpCall({
                                service: "ZNW_FI_ACC_SOCIEDAD",
                                query: oFilters,
                                type: "post",
                                success: function(result, status, xhr) {
                                    oModel.setProperty('/Areas_Control_Credito', result.ACC_SOCIEDAD);
                                }
                            });
            
                            */
            },

            _cargarViasPago: function () {

                let oModel = this.getView().getModel();
                let that = this;

                var oFilters = {
                    ID_REGISTRO: 'A'
                };

                let IT_CARACT_VIA = [];

                IT_CARACT_VIA.push({
                    BANCO: "",
                    BLART: "",
                    BLOQUEO: "X",
                    DESC_VIA_PAG: "D. Letras",
                    ID_REGISTRO: "A",
                    KOART: "D",
                    LAND1: "CL",
                    MANDT: "300",
                    ORDCOMPRA: "",
                    PONDERACION: "X",
                    UMSKZ: "W",
                    ZLSCH: "B"
                });

                IT_CARACT_VIA.push({
                    BANCO: "",
                    BLART: "",
                    BLOQUEO: "",
                    DESC_VIA_PAG: "D. Cheque/Vale Vista",
                    ID_REGISTRO: "A",
                    KOART: "D",
                    LAND1: "CL",
                    MANDT: "300",
                    ORDCOMPRA: "",
                    PONDERACION: "X",
                    UMSKZ: "C",
                    ZLSCH: "C"
                });

                IT_CARACT_VIA.push({
                    BANCO: "X",
                    BLART: "",
                    BLOQUEO: "X",
                    DESC_VIA_PAG: "D. Depósito",
                    ID_REGISTRO: "A",
                    KOART: "",
                    LAND1: "CL",
                    MANDT: "300",
                    ORDCOMPRA: "",
                    PONDERACION: "",
                    UMSKZ: "",
                    ZLSCH: "D"
                });

                IT_CARACT_VIA.push({
                    BANCO: "",
                    BLART: "",
                    BLOQUEO: "",
                    DESC_VIA_PAG: "D. Efectivo",
                    ID_REGISTRO: "A",
                    KOART: "",
                    LAND1: "CL",
                    MANDT: "300",
                    ORDCOMPRA: "",
                    PONDERACION: "",
                    UMSKZ: "",
                    ZLSCH: "E"
                });

                IT_CARACT_VIA.push({
                    BANCO: "",
                    BLART: "",
                    BLOQUEO: "",
                    DESC_VIA_PAG: "D. Tarjeta de Débito",
                    ID_REGISTRO: "A",
                    KOART: "D",
                    LAND1: "CL",
                    MANDT: "300",
                    ORDCOMPRA: "",
                    PONDERACION: "",
                    UMSKZ: "S",
                    ZLSCH: "F"
                });

                IT_CARACT_VIA.push({
                    BANCO: "",
                    BLART: "",
                    BLOQUEO: "",
                    DESC_VIA_PAG: "D. Tarjeta de Crédito",
                    ID_REGISTRO: "A",
                    KOART: "D",
                    LAND1: "CL",
                    MANDT: "300",
                    ORDCOMPRA: "",
                    PONDERACION: "",
                    UMSKZ: "S",
                    ZLSCH: "G"
                });

                IT_CARACT_VIA.push({
                    BANCO: "",
                    BLART: "",
                    BLOQUEO: "",
                    DESC_VIA_PAG: "D. Cheque Asegurado",
                    ID_REGISTRO: "A",
                    KOART: "D",
                    LAND1: "CL",
                    MANDT: "300",
                    ORDCOMPRA: "",
                    PONDERACION: "X",
                    UMSKZ: "D",
                    ZLSCH: "P"
                });

                IT_CARACT_VIA.push({
                    BANCO: "",
                    BLART: "",
                    BLOQUEO: "",
                    DESC_VIA_PAG: "D. Giftcard",
                    ID_REGISTRO: "A",
                    KOART: "D",
                    LAND1: "CL",
                    MANDT: "300",
                    ORDCOMPRA: "",
                    PONDERACION: "",
                    UMSKZ: "",
                    ZLSCH: "Z"
                });

                oModel.setProperty('/Vias_Pago', IT_CARACT_VIA);
                /*
                                utils.httpCall({
                                    service: "ZNWM_SD_CAJA_VIAS",
                                    query: oFilters,
                                    type: "post",
                                    success: function (result, status, xhr) {
                                        if (result.IT_BAPIRETURN[0].TYPE == "S") {
                                            oModel.setProperty('/Vias_Pago', result.IT_CARACT_VIA);
                                        } else {
                                            that._manageMessages(result.IT_BAPIRETURN[0]);
                                        }
                                    }
                                });
                
                                */
                //***************************************************************************************
                // Modificado por Samuel Silva
                // S127846 - S130140 Identificación del concepto Documentos a Plazo
                // Fecha 14-06-2020
                //***************************************************************************************
                //Carga conceptos de cheque

                let IT_VIA_CHEQUE = [];

                let IT_CONCEPTOS = [];

                IT_VIA_CHEQUE.push({
                    ZLSCH: "C"
                });

                IT_CONCEPTOS.push({
                    CODIGO: "A",
                    DESCRIPCION: "Venta al día"
                });

                IT_CONCEPTOS.push({
                    CODIGO: "C",
                    DESCRIPCION: "Venta en cuotas"
                });

                this.getView().getModel('enums').setProperty('/VIAS_PAGO_CHQ', IT_VIA_CHEQUE);
                this.getView().getModel('enums').setProperty('/CONCEPTOS_TXT_CHQ', IT_CONCEPTOS);

                /*
                                utils.httpCall({
                                    service: 'ZNWM_SD_CAJA_CHQ_CONCEPTOS',
                                    success: (resp) => {
                                        this.getView().getModel('enums').setProperty('/VIAS_PAGO_CHQ', resp.IT_VIA_CHEQUE);
                                        this.getView().getModel('enums').setProperty('/CONCEPTOS_TXT_CHQ', resp.IT_CONCEPTOS);
                                    }
                                });
                                //***************************************************************************************
                            */

            },

            handleAddMedioPago: function (evt) {
                var oModel = this.getView().getModel();
                let mediosPago = oModel.getProperty('/Medios_Pago');
                let viasPago = oModel.getProperty('/Vias_Pago');

                //***************************************************************************************
                // Modificado por Samuel Silva
                // S127846 - S130140 Identificación del concepto Documentos a Plazo
                // Fecha 14-06-2020
                //***************************************************************************************
                //			this.getView().getModel('enums').setProperty('/CHQ_CONCEPTOS', []);
                let viasPagoChq = this.getView().getModel('enums').getProperty('/VIAS_PAGO_CHQ');
                var chqEnable = false;
                //***************************************************************************************

                let viaPagoId = oModel.getProperty('/i_Via_Pago');
                if (viaPagoId) {
                    //solo una via Efectivo
                    if (viaPagoId == 'E' && mediosPago.filter(function (m) {
                        return m.VIA_PAGO == viaPagoId
                    }).length > 0) {
                        this.addMessage("Solamente puede agregar una vía de pago en efectivo.", "e");
                        return;
                    }

                    let viaPago = viasPago.filter(function (via) {
                        return via.ZLSCH == viaPagoId;
                    })[0];

                    var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
                        pattern: "yyyyMMdd"
                    });
                    /*
                    //***************************************************************************************
                    // Modificado por Samuel Silva
                    // S127846 - S130140 Identificación del concepto Documentos a Plazo
                    // Fecha 14-06-2020
                    //***************************************************************************************
                                    if(viasPagoChq.find(vpc => vpc.ZLSCH === viaPago.ZLSCH)){
                                        //Carga de conceptos de cheque
                                        chqEnable = true;
                                        utils.httpCall({
                                            service: 'ZNWM_SD_CAJA_CHQ_CONCEPTOS',
                                            success: (resp) => {
                                            this.getView().getModel('enums').setProperty('/CHQ_CONCEPTOS', resp.IT_CONCEPTOS);
                                            }
                                        });							
                                    } 
                    //*************************************************************************************** 
                    */
                    let row = {
                        VIA_PAGO: viaPagoId,
                        VIA_PAGO_DESCRIPTION: viaPago.ZLSCH + " - " + viaPago.DESC_VIA_PAG,
                        FECHA: oFormat.format(new Date()),
                        DIAS: 0,
                        MONEDA: 'CLP',
                        MONTO: null,
                        DIFERENCIA: 0,
                        RUT: null,
                        OPERACION: null,
                        NUMERO_OC: null,
                        BANCO: null,
                        CUENTA: null,
                        INSTITUCION: null,
                        OBSERVACION: null,
                        //***************************************************************************************
                        // Modificado por Samuel Silva
                        // S127846 - S133532 Anticipo con tarjeta de crédito en cuotas:
                        // Fecha 09-09-2020
                        //***************************************************************************************
                        CUOTAS: 0,
                        //***************************************************************************************
                        FECHA_RECAUDACION: null,
                        VALIDO: false,
                        //***************************************************************************************
                        // Modificado por Samuel Silva
                        // S127846 - S130140 Identificación del concepto Documentos a Plazo
                        // Fecha 14-06-2020
                        //***************************************************************************************
                        WSTAT: '',
                        CHQ_ENABLE: chqEnable
                        //***************************************************************************************


                    };

                    mediosPago.push(row);

                    oModel.setProperty('/Medios_Pago', mediosPago);
                    this._updateFormVisibility();

                    oModel.setProperty('/i_Medio_Pago', (mediosPago.length - 1));

                }

            },

            _updateFormVisibility: function () {

                var oModel = this.getView().getModel();

                let mediosPago = oModel.getProperty('/Medios_Pago');

                let visible = (mediosPago.filter(function checkAdult(medio) {

                    switch (medio.VIA_PAGO) {
                        case 'B':
                            return true;
                            break;
                        case 'C':
                            return true;
                            break;
                        case 'P':
                            return true;
                            break;
                        case 'D':
                            return true;
                            break;
                        case 'E':
                            return true;
                            break;
                        case 'F':
                            return true;
                            break;
                        case 'G':
                            return true;
                            break;
                        case 'Z':
                            return true;
                            break;
                        default:
                            return false;
                    }
                }).length > 0);

                oModel.setProperty('/Visible_form', visible);
            },

            _cargarCiudades: function () {

                let oModel = this.getView().getModel();

                var oFilters = {
                    I_SETNAME: oModel.getProperty('/i_Sociedad')
                };

                let GT_SETHEADERT = [];

                GT_SETHEADERT.push({
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "2000SC",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Iquique",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20IQ",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Calama",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20CA",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Antofagasta",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20AN",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Copiapo",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20CP",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "La Serena",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20LS",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Santiago",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20SA",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Talca",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20TA",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Rancagua",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20RA",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Chillan",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20CH",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Quilpue",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20QL",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Concepción",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20CC",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Los Angeles",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20LA",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Temuco",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20TE",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Puerto Montt",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20PM",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Punta Arenas",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20PA",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Coyhaique Central",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20CY",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "CeBe Originales Soc.2000",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20ORIG",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Osorno",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "20ON",
                    SUBCLASS: "1000"
                });

                oModel.setProperty('/Ciudades', GT_SETHEADERT);
                /*
                            utils.httpCall({
                                service: "Z244R_Determinar_Cebe",
                                query: oFilters,
                                type: "post",
                                success: function(result, status, xhr) {
                                    oModel.setProperty('/Ciudades', result.GT_SETHEADERT);
                                }
                            });
            
                            */
            },

            _cargarOficVentas: function () {

                let oModel = this.getView().getModel();
                let sociedad = oModel.getProperty('/i_Sociedad');
                var orgVenta, canalDist, sector;
                //***************************************************************************************
                // Modificado por Namdher Colmenares
                // S139143 mejora creación anticipos SALFACLOUD MODULO 
                // Fecha 08-01-2021
                //***************************************************************************************	
                /*			if(sociedad === "1000"){
                                orgVenta = "1000";
                                canalDist = "VS";
                                sector = "A0";
                            }else if(sociedad === "2000"){
                                orgVenta = "2000";
                                canalDist = "VS";
                                sector = "A0";
                            }else if(sociedad === "3000"){
                                orgVenta = "3000";
                                canalDist = "VS";
                                sector = "A0";
                            }else if(sociedad === "4000"){
                                orgVenta = "4000";
                                canalDist = "VS";
                                sector = "C0";
                            }else if(sociedad === "5000"){
                                orgVenta = "5000";
                                canalDist = "VD";
                                sector = "S0";
                            }else if(sociedad === "6000"){
                                orgVenta = "6000";
                                canalDist = "VD";
                                sector = "S0";
                            }else if(sociedad === "7000"){
                                orgVenta = "7000";
                                canalDist = "SE";
                                sector = "CA";
                            }*/

                var oQuery = {
                    "I_TIPO": 'OF'
                };

                let T_OFIVTAS = [];

                /*
                                utils.httpCall({
                                    service: "ZSCP_OFVNT_GRVNT",
                                    query: oQuery,
                                    success: (result) => {
                                        oModel.setProperty("/Oficinas_Venta", result.T_OFIVTAS);
                                        //oModel.setProperty("/Grupos_Vendedor", result.T_GRPVENDE);
                                    }
                                });
                                //***************************************************************************************			
                            */
            },

            handleCiudadChange: function (evt) {
                if (evt) {
                    evt.oSource.setValueState("None");
                }
                let oModel = this.getView().getModel();
                oModel.setProperty('/Sucursales', []);
                oModel.setProperty('/i_Sucursal', null);

                oModel.setProperty('/Unidades_Negocio', []);
                oModel.setProperty('/i_Unidad_Negocio', null);

                oModel.setProperty('/Centros_Beneficio', []);
                oModel.setProperty('/i_Centro_Beneficio', null);
                this._cargarSucursales();
            },

            _cargarSucursales: function () {
                let oModel = this.getView().getModel();

                var oFilters = {
                    I_SETNAME: oModel.getProperty('/i_Ciudad')
                };

                let GT_SETHEADERT = [];

                GT_SETHEADERT.push({
                    DESCRIPT: "Arica Central",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "10ARCE",
                    SUBCLASS: "1000"
                });


                GT_SETHEADERT.push({
                    DESCRIPT: "Iquique Alto Hospicio",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "10IQAH",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Iquique Zofri",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "10IQZO",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Iquique Co.Colorado",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "10IQCO",
                    SUBCLASS: "1000"
                });

                oModel.setProperty('/Sucursales', GT_SETHEADERT);
                /*
                                utils.httpCall({
                                    service: "Z244R_Determinar_Cebe",
                                    query: oFilters,
                                    type: "post",
                                    success: function(result, status, xhr) {
                                        oModel.setProperty('/Sucursales', result.GT_SETHEADERT);
                                    }
                                });
                
                                */
            },

            handleSucursalChange: function (evt) {
                if (evt) {
                    evt.oSource.setValueState("None");
                }
                let oModel = this.getView().getModel();
                oModel.setProperty('/Unidades_Negocio', []);
                oModel.setProperty('/i_Unidad_Negocio', null);

                oModel.setProperty('/Centros_Beneficio', []);
                oModel.setProperty('/i_Centro_Beneficio', null);
                this._cargarUnidadesNegocio();
            },
            _cargarUnidadesNegocio: function () {
                let oModel = this.getView().getModel();

                var oFilters = {
                    I_SETNAME: oModel.getProperty('/i_Sucursal')
                };

                let GT_SETHEADERT = [];

                GT_SETHEADERT.push({
                    DESCRIPT: "Autycam Alto Hospicio",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "10AHAU",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Generales Alto Hospicio",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "10AHGL",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Servicios Livianos Alto Hospicio",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "10AHSL",
                    SUBCLASS: "1000"
                });

                GT_SETHEADERT.push({
                    DESCRIPT: "Repuestos Alto Hospicio",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "10AHRE",
                    SUBCLASS: "1000"
                });


                oModel.setProperty('/Unidades_Negocio', GT_SETHEADERT);


                /*
                            utils.httpCall({
                                service: "Z244R_Determinar_Cebe",
                                query: oFilters,
                                type: "post",
                                success: function(result, status, xhr) {
                                    oModel.setProperty('/Unidades_Negocio', result.GT_SETHEADERT);
                                }
                            });
            
                            */
            },

            handleUnidadNegocioChange: function (evt) {
                if (evt) {
                    evt.oSource.setValueState("None");
                }
                let oModel = this.getView().getModel();
                oModel.setProperty('/Centros_Beneficio', []);
                oModel.setProperty('/i_Centro_Beneficio', null);
                this._cargarCentrosBeneficio();
            },
            _cargarCentrosBeneficio: function () {

                let oModel = this.getView().getModel();

                var oFilters = {
                    I_SETNAME: oModel.getProperty('/i_Unidad_Negocio')
                };

                let GT_SETHEADERT = [];

                GT_SETHEADERT.push({
                    DESCRIPT: "Repuestos Alto Hospicio",
                    LANGU: "S",
                    MANDT: "300",
                    SETCLASS: "0106",
                    SETNAME: "10AHRE",
                    SUBCLASS: "1000"
                });

                oModel.setProperty('/Centros_Beneficio', GT_SETHEADERT);
                /*
                                utils.httpCall({
                                    service: "Z244R_Determinar_Cebe",
                                    query: oFilters,
                                    type: "post",
                                    success: function (result, status, xhr) {
                                        oModel.setProperty('/Centros_Beneficio', result.GT_SETHEADERT);
                                    }
                                });
                
                                */
            },

            _cargarOficVentas: function () {

                let oModel = this.getView().getModel();

                let sociedad = oModel.getProperty('/i_Sociedad');

                var orgVenta, canalDist, sector;
                //***************************************************************************************
                // Modificado por Namdher Colmenares
                // S139143 mejora creación anticipos SALFACLOUD MODULO 
                // Fecha 08-01-2021
                //***************************************************************************************	
                /*			if(sociedad === "1000"){
                                orgVenta = "1000";
                                canalDist = "VS";
                                sector = "A0";
                            }else if(sociedad === "2000"){
                                orgVenta = "2000";
                                canalDist = "VS";
                                sector = "A0";
                            }else if(sociedad === "3000"){
                                orgVenta = "3000";
                                canalDist = "VS";
                                sector = "A0";
                            }else if(sociedad === "4000"){
                                orgVenta = "4000";
                                canalDist = "VS";
                                sector = "C0";
                            }else if(sociedad === "5000"){
                                orgVenta = "5000";
                                canalDist = "VD";
                                sector = "S0";
                            }else if(sociedad === "6000"){
                                orgVenta = "6000";
                                canalDist = "VD";
                                sector = "S0";
                            }else if(sociedad === "7000"){
                                orgVenta = "7000";
                                canalDist = "SE";
                                sector = "CA";
                            }*/

                var oQuery = {
                    "I_TIPO": 'OF'
                };

                let T_OFIVTAS = [];

                T_OFIVTAS.push({
                    DESCRIPCION: "Antofagasta C.Matriz",
                    OFICINA: "AN01"
                });

                T_OFIVTAS.push({
                    DESCRIPCION: "Antofagasta Mall",
                    OFICINA: "AN03"
                });

                T_OFIVTAS.push({
                    DESCRIPCION: "Antofagasta Norte",
                    OFICINA: "AN06"
                });

                T_OFIVTAS.push({
                    DESCRIPCION: "Arica",
                    OFICINA: "AR01"
                });

                T_OFIVTAS.push({
                    DESCRIPCION: "Arica Zofri",
                    OFICINA: "AR02"
                });

                T_OFIVTAS.push({
                    DESCRIPCION: "Calama Casa Matriz",
                    OFICINA: "CA01"
                });

                T_OFIVTAS.push({
                    DESCRIPCION: "Calama Mall",
                    OFICINA: "CA02"
                });

                T_OFIVTAS.push({
                    DESCRIPCION: "Calama Serv. Pesado",
                    OFICINA: "CA03"
                });

                T_OFIVTAS.push({
                    DESCRIPCION: "Concepción C.Matriz",
                    OFICINA: "CC01"
                });

                T_OFIVTAS.push({
                    DESCRIPCION: "Concepción Usados",
                    OFICINA: "CC03"
                });


                oModel.setProperty("/Oficinas_Venta", T_OFIVTAS);
                /*
                                utils.httpCall({
                                    service: "ZSCP_OFVNT_GRVNT",
                                    query: oQuery,
                                    success: (result) => {
                                        oModel.setProperty("/Oficinas_Venta", result.T_OFIVTAS);
                                        //oModel.setProperty("/Grupos_Vendedor", result.T_GRPVENDE);
                                    }
                                });
                                //***************************************************************************************			
                            
                            */
            },

            handleOficinaVentaChange: function (oEvt) {
                let oModel = this.getView().getModel();
                var key = oEvt.getSource().getSelectedKey();
                oModel.setProperty('/Grupos_Vendedor', []);
                oModel.setProperty('/i_Grupo_Vendedor', null);
                this._cargarGrupoVendedor();

            },

            _cargarGrupoVendedor: function () {
                let oModel = this.getView().getModel();
                let sociedad = oModel.getProperty('/i_Sociedad');
                let oficVenta = oModel.getProperty('/i_Oficina_Venta');
                //***************************************************************************************
                // Modificado por Namdher Colmenares
                // S139143 mejora creación anticipos SALFACLOUD MODULO 
                // Fecha 08-01-2021
                //***************************************************************************************				
                /*var orgVenta, canalDist, sector;
                if(sociedad === "1000"){
                    orgVenta = "1000";
                    canalDist = "VS";
                    sector = "A0";
                }else if(sociedad === "2000"){
                    orgVenta = "2000";
                    canalDist = "VS";
                    sector = "A0";
                }else if(sociedad === "3000"){
                    orgVenta = "3000";
                    canalDist = "VS";
                    sector = "A0";
                }else if(sociedad === "4000"){
                    orgVenta = "4000";
                    canalDist = "VS";
                    sector = "C0";
                }else if(sociedad === "5000"){
                    orgVenta = "5000";
                    canalDist = "VD";
                    sector = "S0";
                }else if(sociedad === "6000"){
                    orgVenta = "6000";
                    canalDist = "VD";
                    sector = "S0";
                }else if(sociedad === "7000"){
                    orgVenta = "7000";
                    canalDist = "SE";
                    sector = "CA";
                }*/
                var oQuery = {
                    "I_TIPO": 'GR',
                    "I_OFVENTA": oficVenta

                };

                let T_GRPVENDE = [];

                T_GRPVENDE.push({
                    DESCRIPCION: "Michelle Castillo B.",
                    GRUPO: "A04"
                });

                T_GRPVENDE.push({
                    DESCRIPCION: "Carolay Campillay R.",
                    GRUPO: "A06"
                });
                T_GRPVENDE.push({
                    DESCRIPCION: "Ana Valdes F.",
                    GRUPO: "A08"
                });

                T_GRPVENDE.push({
                    DESCRIPCION: "Edgardo Salinas V.",
                    GRUPO: "A09"
                });

                T_GRPVENDE.push({
                    DESCRIPCION: "Heinsrich Liebsch F.",
                    GRUPO: "A1J"
                });

                oModel.setProperty('/GrpVenta_enabled', true);
                oModel.setProperty("/Grupos_Vendedor", T_GRPVENDE);
                /*
                                utils.httpCall({
                                    service: "ZSCP_OFVNT_GRVNT",
                                    query: oQuery,
                                    success: (result) => {
                                        //oModel.setProperty("/Oficinas_Venta", result.T_OFIVTAS);
                                        oModel.setProperty('/GrpVenta_enabled', true);
                                        oModel.setProperty("/Grupos_Vendedor", result.T_GRPVENDET_GRPVENDE);
                                    }
                                });
                                //***************************************************************************************			
                
                */
            },

            handleRefreshMedioPago: function (evt) {
                this._oMessagePopover.close();
                let oModel = this.getView().getModel();
                sap.ui.getCore().getMessageManager().removeAllMessages();
                this.byId("tableMedios");

                let mediosPago = oModel.getProperty('/Medios_Pago');

                let validator = new Validator();

                this.handleCalcularTotal();

                let table = this.byId("tableMedios");
                let rows = table.getRows();

                var today = new Date();
                today.setHours(0, 0, 0, 0);

                let valid = true;
                var msg = "";

                for (var i = 0; i < mediosPago.length; i++) {
                    let pos = i + 1;
                    //let date = rows[i].getCells()[1].getDateValue();
                    let date = utils.dateFromFormat(mediosPago[i].FECHA, 'yyyyMMdd');
                    //let input = rows[i].getCells()[1];
                    if (date) {
                        if (date.valueOf() < today.valueOf()) {
                            valid = false;
                            msg = "Seleccione una fecha mayor o igual a hoy en la posicion: " + pos;
                            this.addMessage(msg, "e");
                            //this._setInputError(input, "Seleccione una fecha mayor o igual a hoy.");
                        } else {
                            //input.setValueState(sap.ui.core.ValueState.None);
                        }
                    } else {
                        valid = false;
                        msg = "Debe ingresar una fecha en la posicion: " + pos;
                        this.addMessage(msg, "e");
                        //this._setInputError(input, "Debe ingresar una fecha.");
                    }

                    if (valid) {
                        //let montoInput = rows[i].getCells()[4];
                        //if (parseFloat(montoInput.getValue().replace('.', '').replace(',', '.')) > 0) {
                        if (parseFloat(mediosPago[i].MONTO) > 0) {
                            //montoInput.setValueState(sap.ui.core.ValueState.None);

                            if (mediosPago[i].RUT != null) {
                                valid = this._validarRut(mediosPago[i].RUT, "/RutState", "/RutStateText", null, null);
                            }
                        } else {
                            valid = false;
                            //this._setInputError(montoInput, "Ingrese un monto mayor que 0.");
                            msg = "Ingrese un monto mayor que 0 en la posicion: " + pos;
                            this.addMessage(msg, "e");
                        }
                    }

                    //***************************************************************************************
                    // Modificado por Samuel Silva
                    // S127846 - S130140 Identificación del concepto Documentos a Plazo
                    // Fecha 14-06-2020
                    //***************************************************************************************    
                    let viasPagoChq = this.getView().getModel('enums').getProperty('/VIAS_PAGO_CHQ');

                    if (viasPagoChq.find(vpc => vpc.ZLSCH === mediosPago[i].VIA_PAGO)) {
                        if (mediosPago[i].WSTAT === "") {
                            valid = false;
                            msg = "Debe Ingresar el concepto del Cheque. Verifique la posición " + pos;
                            this.addMessage(msg, "e");
                        }
                    }
                    //***************************************************************************************

                    if (!valid) {
                        oModel.setProperty('/i_Medio_Pago', i);
                        this._dataValid = false;
                        return;
                    }
                }

                let subFormValid = validator.validate(this.byId("subForm"));
                this._dataValid = this._dataValid && subFormValid;

                let index = oModel.getProperty('/i_Medio_Pago');
                if (index >= 0 && index != null) {
                    mediosPago[index].VALIDO = subFormValid;
                }
            },

            handleCalcularTotal: function () {

                var oModel = this.getView().getModel();
                let mediosPago = oModel.getProperty('/Medios_Pago');
                var total = 0;
                for (var i = 0; i < mediosPago.length; i++) {
                    var montoInt = Math.floor(mediosPago[i].MONTO);
                    if (mediosPago[i].VIA_PAGO == 'E') {

                        /*
                        utils.httpCall({
                            service: "Z999R_Redondeo_Monto",
                            query: {
                                I_Importe: montoInt
                            },
                            type: "post",
                            async: false,
                            success: function(result, status, xhr) {
                                montoInt = result.E_IMPORTE_RED2;
                                mediosPago[i].MONTO = montoInt;
                                mediosPago[i].DIFERENCIA = result.E_DIFERENCIA;
                            }
                        });

                        */
                    }
                    total += Math.floor(montoInt);
                }
                oModel.setProperty('/Medios_Pago', mediosPago);
                oModel.setProperty('/TotalMonto', total);
            },

            handleRemoveMedioPago: function (evt) {
                let oModel = this.getView().getModel();
                let mediosPago = oModel.getProperty('/Medios_Pago');
                let index = oModel.getProperty('/i_Medio_Pago');
                if (index >= 0 && index != null) {
                    mediosPago.splice(index, 1);
                    oModel.setProperty('/i_Medio_Pago', -1);
                    oModel.setProperty('/Medios_Pago', mediosPago);
                }
                this._updateFormVisibility();
            },

            handleLimpiar: function (evt) {
                this._iniciarCampos();
                this._oMessagePopover.close();
                sap.ui.getCore().getMessageManager().removeAllMessages();
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

            handleGenerarAnticipos: function (evt) {

                let oModel = this.getView().getModel();
                let that = this;

                oModel.setProperty("/ClienteState", null);
                oModel.setProperty("/ClienteStateText", null);

                let cliente = oModel.getProperty('/Cliente').trim();
                let sociedad = oModel.getProperty('/i_Sociedad');
                let areaControlCredito = oModel.getProperty('/i_Area_Control_Credito');

                let ciudad = oModel.getProperty('/i_Ciudad');
                let sucursal = oModel.getProperty('/i_Sucursal');
                let unidadNegocio = oModel.getProperty('/i_Unidad_Negocio');
                let centroBeneficio = oModel.getProperty('/i_Centro_Beneficio');
                let ofic_venta = oModel.getProperty('/i_Oficina_Venta');
                let grp_vendedor = oModel.getProperty('/i_Grupo_Vendedor');

                let validator = new Validator();
                this._dataValid = validator.validate(this.byId("form"));

                if (this._dataValid) {
                    this.handleRefreshMedioPago(); //validaciones de la tabla

                    if (this._dataValid) {
                        let mediosPago = oModel.getProperty('/Medios_Pago');
                        if (mediosPago.length > 0) {

                            sap.m.MessageBox.success("Se ha generado el anticipo", {
                                title: "Éxito"
                            });

                            /*

                            let cabecera = {
                                Canal_Distri: "",
                                Werks: "",
                                Kunnr: cliente,
                                Org_Venta: sociedad,
                                Bukrs: sociedad,
                                Sector: "",
                                Tipo_Documento: "F",
                                Id_Usuario_G: utils.getUser(),
                                Fecha_Registro: new Date(),
                                OFIC_VENTA: ofic_venta,
                                GRP_VENDEDOR: grp_vendedor
                            };

                            let itAccTicket = [{
                                Kkber: areaControlCredito
                            }];

                            let posiciones = [];

                            for (var i = 0; i < mediosPago.length; i++) {
                                if (!mediosPago[i].VALIDO) {
                                    oModel.setProperty('/i_Medio_Pago', i);
                                    validator.validate(this.byId("subForm"));
                                    return;
                                } else {
                                    let f = mediosPago[i].FECHA_RECAUDACION;
                                    if (f == null) {
                                        f = '00000000';
                                    }
                                    var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
                                        pattern: "yyyyMMdd"
                                    });

                                    let posicion = {
                                        Bukrs: sociedad,
                                        Fecha_Pago: mediosPago[i].FECHA,
                                        Fecha_Registro: oFormat.format(new Date()),
                                        Fecha_Recauda: (f == '00000000' ? f : oFormat.format(new Date(f.substr(6, 4), f.substr(3, 2) - 1, f.substr(0, 2)))),
                                        Id_Usuario_G: utils.getUser(),
                                        Waers: mediosPago[i].MONEDA,
                                        Wrbtr: mediosPago[i].MONTO,
                                        Zlsch: mediosPago[i].VIA_PAGO,
                                        Resto_Redondeo: mediosPago[i].DIFERENCIA,
                                        Id_Caja: "",
                                        Emisor_Cheque: (mediosPago[i].RUT === null) ? "" : mediosPago[i].RUT,
                                        Id_Institucion: (mediosPago[i].INSTITUCION === null) ? "" : mediosPago[i].INSTITUCION,
                                        Nro_Operacion: (mediosPago[i].OPERACION === null) ? "" : mediosPago[i].OPERACION,
                                        Ebeln: (mediosPago[i].NUMERO_OC === null) ? "" : mediosPago[i].NUMERO_OC,
                                        Hbkid: (mediosPago[i].BANCO === null) ? "" : mediosPago[i].BANCO,
                                        Hktid: (mediosPago[i].CUENTA === null) ? "" : mediosPago[i].CUENTA,
                                        Sgtxt: mediosPago[i].OBSERVACION,
                                        //***************************************************************************************
                                        // Modificado por Samuel Silva
                                        // S127846 - S130140 Identificación del concepto Documentos a Plazo
                                        // Fecha 14-06-2020
                                        //***************************************************************************************  									
                                        WSTAT: mediosPago[i].WSTAT,
                                        //***************************************************************************************
                                        //***************************************************************************************
                                        // Modificado por Samuel Silva
                                        // S127846 - S133532 Anticipo con tarjeta de crédito en cuotas:
                                        // Fecha 08-09-2020
                                        //***************************************************************************************
                                        CUOTAS: mediosPago[i].CUOTAS
                                        //***************************************************************************************
                                    };
                                    posiciones.push(posicion);
                                }
                            }

                            this._validarRut(cliente, "/ClienteState", "/ClienteStateText", function () {
                                var oData = {
                                    I_PRCTR: (centroBeneficio === null) ? "" : centroBeneficio,
                                    CABECERA: cabecera,
                                    IT_ACC_TICKET: itAccTicket,
                                    IT_POSICIONES: posiciones
                                };

                                utils.httpCall({
                                    service: "Znwm_Sd_Caja_Crea_Reg_Anticipo",
                                    query: oData,
                                    type: "post",
                                    success: function (result, status, xhr) {
                                        result.IT_BAPIRETURN.forEach(m => {
                                            if (m.TYPE == "S") {
                                                if (result.IT_BAPIRETURN.length > 1) {
                                                    that.addMessage(m.MESSAGE, m.TYPE);
                                                } else {
                                                    sap.m.MessageBox.success(m.MESSAGE, {
                                                        title: "Éxito"
                                                    });
                                                }
                                                that._iniciarCampos();
                                            } else {
                                                that.addMessage(m.MESSAGE, m.TYPE);
                                            }
                                        });
                                    }
                                });
                            }, null);

                            */
                        } else {
                            this.addMessage("Debe agregar al menos una condición.", "e");
                        }
                    }
                }
                return;
            },

            handleRowSelect: function () {
                var oModel = this.getView().getModel();

                let visibleRut = false;
                let visibleBanco = false;
                let visibleCuenta = false;
                //***************************************************************************************
                // Modificado por Samuel Silva
                // S127846 - S133532 Anticipo con tarjeta de crédito en cuotas:
                // Fecha 09-09-2020
                //***************************************************************************************
                let visibleCuotas = false;
                //***************************************************************************************
                let visibleObservacion = false;
                let visibleFechaRecaudacion = false;
                let visibleOperacion = false;
                let visibleInstitucion = false;
                let visibleNumeroOc = false;

                let valid = true;
                let mediosPago = oModel.getProperty('/Medios_Pago');
                let index = oModel.getProperty('/i_Medio_Pago');
                let indexPrev = oModel.getProperty('/i_Medio_Pago_Prev');
                let validator = new Validator();

                //cuando se elimina no validar
                if (indexPrev != null && indexPrev >= 0 && typeof mediosPago[indexPrev] != 'undefined') {
                    valid = validator.validate(this.byId("subForm"));
                    mediosPago[indexPrev].VALIDO = valid;
                }

                oModel.setProperty('/i_Medio_Pago_Prev', oModel.getProperty('/i_Medio_Pago'));

                if (parseInt(index) >= 0) {
                    switch (mediosPago[index].VIA_PAGO) {
                        case 'A':
                            /* Anticipo */
                            visibleObservacion = true;
                            break;
                        case 'B':
                            /* Letra */
                            visibleObservacion = true;
                            visibleRut = true;
                            break;
                        case 'C':
                            /* Cheque */
                            visibleObservacion = true;
                            visibleRut = true;
                            break;
                        case 'D':
                            /* Deposito */
                            visibleObservacion = true;
                            visibleBanco = true;
                            visibleCuenta = true;
                            visibleFechaRecaudacion = true;
                            break;
                        case 'E':
                            /* Efectivo */
                            visibleObservacion = true;
                            break;
                        case 'F':
                            /* Tarjeta de debito */
                            visibleObservacion = true;
                            break;
                        case 'G':
                            /* Tarjeta de credito */
                            visibleObservacion = true;
                            //***************************************************************************************
                            // Modificado por Samuel Silva
                            // S127846 - S133532 Anticipo con tarjeta de crédito en cuotas:
                            // Fecha 09-09-2020
                            //***************************************************************************************
                            visibleCuotas = true;
                            //***************************************************************************************

                            break;
                        case 'H':
                            /* Credito terceros */
                            visibleObservacion = true;
                            visibleOperacion = true;
                            visibleInstitucion = true;
                            break;
                        case 'I':
                            /* Credito no documentado */
                            visibleObservacion = true;
                            break;
                        case 'J':
                            /* Vehiculo parte de pago */
                            visibleObservacion = true;
                            visibleNumeroOc = true;
                            break;
                        case 'K':
                            /* Nota de credito */
                            visibleObservacion = true;
                            break;
                        case 'P':
                            /* Cheque */
                            visibleObservacion = true;
                            visibleRut = true;
                            break;
                    }

                    oModel.setProperty('/Rut', mediosPago[index].RUT);
                    oModel.setProperty('/Operacion', mediosPago[index].OPERACION);
                    oModel.setProperty('/NumeroOC', mediosPago[index].NUMERO_OC);
                    oModel.setProperty('/i_Banco', mediosPago[index].BANCO);
                    if (mediosPago[index].BANCO) {
                        this.handleBancoChange(function () {
                            oModel.setProperty('/i_Cuenta', mediosPago[index].CUENTA);
                        });
                    }
                    oModel.setProperty('/i_Cuenta', mediosPago[index].CUENTA);
                    oModel.setProperty('/i_Institucion', mediosPago[index].INSTITUCION);
                    oModel.setProperty('/Observacion', mediosPago[index].OBSERVACION);
                    //***************************************************************************************
                    // Modificado por Samuel Silva
                    // S127846 - S133532 Anticipo con tarjeta de crédito en cuotas:
                    // Fecha 09-09-2020
                    //***************************************************************************************
                    oModel.setProperty('/CUOTAS', mediosPago[index].CUOTAS);
                    //***************************************************************************************

                    oModel.setProperty('/Fecha_Recaudacion', mediosPago[index].FECHA_RECAUDACION);
                }

                oModel.setProperty('/Visible_rut', visibleRut);
                oModel.setProperty('/Visible_operacion', visibleOperacion);
                oModel.setProperty('/Visible_numeroOC', visibleNumeroOc);
                oModel.setProperty('/Visible_banco', visibleBanco);
                oModel.setProperty('/Visible_cuenta', visibleCuenta);
                oModel.setProperty('/Visible_institucion', visibleInstitucion);
                oModel.setProperty('/Visible_observacion', visibleObservacion);
                //***************************************************************************************
                // Modificado por Samuel Silva
                // S127846 - S133532 Anticipo con tarjeta de crédito en cuotas:
                // Fecha 09-09-2020
                //***************************************************************************************
                oModel.setProperty('/Visible_CUOTAS', visibleCuotas);
                //***************************************************************************************
                oModel.setProperty('/Visible_fecha_recaudacion', visibleFechaRecaudacion);

                if (parseInt(index) >= 0) {
                    validator.validate(this.byId("subForm"));
                }
            },

            handleBancoChange: function (evt) {
                var oModel = this.getView().getModel();
                if (typeof (evt) != 'function') {
                    this.handleSubFormChange(evt);
                } else {
                    this.handleSubFormChange();
                }

                this._cargarCuentas();
            },

            handleSubFormChange: function (evt) {
                if (typeof (evt) != 'undefined') {
                    var oModel = this.getView().getModel();
                    let mediosPago = oModel.getProperty('/Medios_Pago');
                    let index = oModel.getProperty('/i_Medio_Pago');

                    // mediosPago[index].RUT = oModel.getProperty('/Rut');
                    // mediosPago[index].BANCO = oModel.getProperty('/i_Banco');
                    // mediosPago[index].CUENTA = oModel.getProperty('/i_Cuenta');
                    // mediosPago[index].OBSERVACION = oModel.getProperty('/Observacion');
                    // mediosPago[index].FECHA_RECAUDACION = oModel.getProperty('/Fecha_Recaudacion');

                    //fix para que obtenga los datos inválidos
                    let input = evt.getSource();
                    try {
                        mediosPago[index][input.data().identificador.toUpperCase()] = input.getValue();
                    } catch (e) {
                        mediosPago[index][input.data().identificador.toUpperCase()] = input.getSelectedKey();
                    }

                    oModel.setProperty('/Medios_Pago', mediosPago);
                }
            },

            _cargarCuentas: function () {

                var oModel = this.getView().getModel();

                let that = this;
                var oFilters = {
                    SOCIEDAD: oModel.getProperty('/i_Sociedad'),
                    BANCO: oModel.getProperty('/i_Banco')
                };

                if (oFilters.BANCO != null && oFilters.BANCO != '') {
                    let IT_CUENTAS = [];

                    IT_CUENTAS.push({
                        CODIGO: "1",
                        DESCRIPCION: "BCI CONCEPCION 10579184"
                    });

                    IT_CUENTAS.push({
                        CODIGO: "2",
                        DESCRIPCION: "BCI SANTIAGO 12975672"
                    });

                    IT_CUENTAS.push({
                        CODIGO: "1",
                        DESCRIPCION: "BCI CONCEPCION 10579184"
                    });

                    IT_CUENTAS.push({
                        CODIGO: "3",
                        DESCRIPCION: "BCI LAS SERENA 10577378"
                    });


                    IT_CUENTAS.push({
                        CODIGO: "4",
                        DESCRIPCION: "BCI SANTIAGO 225001281"
                    });

                    oModel.setProperty('/Cuentas', IT_CUENTAS);

                    if (typeof (callback) === 'function') {
                        callback();
                    }

                    /*
                    utils.httpCall({
                        service: "ZNWM_SD_CAJA_CUENTAS_BANCO",
                        query: oFilters,
                        type: "post",
                        success: function(result, status, xhr) {
                            if (result.IT_BAPIRETURN[0].TYPE == "S") {
                                oModel.setProperty('/Cuentas', result.IT_CUENTAS);
                            } else {
                                that._manageMessages(result.IT_BAPIRETURN[0]);
                            }
                            if (typeof(callback) === 'function') {
                                callback();
                            }
                        }
                    });

                    */
                } else {
                    oModel.setProperty('/Cuentas', []);
                }
            },

            _validarRut: function (rut, stateModel, stateTextModel, successCallback, errorCallback) {

                let oModel = this.getView().getModel();
                oModel.setProperty(stateModel, null);
                oModel.setProperty(stateTextModel, null);
                /*
                                let sociedad = oModel.getProperty('/i_Sociedad');
                
                                let that = this;
                                var oFilters = {
                                    CLIENTE: rut,
                                    NOMBRE: "",
                                    USUARIO_LOGON: utils.getUser()
                                };
                
                                */

                var valid = true;

                // var valid = false;

                /*
                utils.httpCall({
                    service: "Znwm_Sd_Help_Cliente_Basico",
                    query: oFilters,
                    type: "post",
                    async: false,
                    success: function (result, status, xhr) {
                        if (result.IT_BAPIRETURN[0].TYPE == "S") {
                            let filter = result.IT_BAPIRETURN.filter(function (x) {
                                return (x.CODE == "SOC" && x.MESSAGE.trim() == sociedad)
                            });
                            if (filter.length > 0) {
                                if (typeof (successCallback) === 'function') {
                                    successCallback();
                                }
                                valid = true;
                            } else {
                                oModel.setProperty(stateModel, "Error");
                                oModel.setProperty(stateTextModel, "El cliente no pertenece a la sociedad seleccionada.");
                                that.addMessage("El cliente no pertenece a la sociedad seleccionada.", "e");
                                if (typeof (errorCallback) === 'function') {
                                    errorCallback();
                                }
                                valid = false;
                            }
                        } else {
                            oModel.setProperty(stateModel, "Error");
                            oModel.setProperty(stateTextModel, "Cliente no válido (" + result.IT_BAPIRETURN[0].MESSAGE + ").");
                            that.addMessage("Cliente no válido (" + result.IT_BAPIRETURN[0].MESSAGE + ").", "e");
                            if (typeof (errorCallback) === 'function') {
                                errorCallback();
                            }
                            valid = false;
                        }
                    }
                });

                */
                return valid;
            }



        });
    });
