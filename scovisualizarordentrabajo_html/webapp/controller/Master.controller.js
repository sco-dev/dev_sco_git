// @ts-nocheck
sap.ui.define([
    "sapui5agendar/scovisualizarordentrabajo_html/controller/Root.controller",
    "sapui5agendar/scovisualizarordentrabajo_html/utils/utils",
    "sapui5agendar/scovisualizarordentrabajo_html/model/models",
    "sapui5agendar/scovisualizarordentrabajo_html/utils/validator",
    "sap/ui/generic/app/navigation/service/NavigationHandler",
    "sap/ui/generic/app/navigation/service/NavType"
], function (Controller, utils, models, Validator, NavigationHandler, NavType) {
    "use strict";

    return Controller.extend("sapui5agendar.scovisualizarordentrabajo_html.controller.Master", {
        onInit: function () {
            this._basicInit();
            this._firstInit();

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("master").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var that = this;
            utils.view = this.getView();
            utils.controller = this;

            let jsonData = sessionStorage.getItem('app00280visualizacionordendetrState');
            if (jsonData != null) {
                let data = JSON.parse(jsonData);
                this.set('/', data);
                sessionStorage.removeItem('app00280visualizacionordendetrState');
                let callbackFn = sessionStorage.getItem('app00280visualizacionordendetrFunction');
                var d1 = $.Deferred();

                d1.done(function () {
                    data.callbackMessages.forEach(function (m) {
                        that.addMessage(m.msg, m.type);
                    });

                    that.set('/callbackMessages', []);
                });

                if (callbackFn != null) {
                    sessionStorage.removeItem('app00280visualizacionordendetrFunction');
                    switch (callbackFn) {
                        case 'getPedidos':
                            this._getPedidos();
                            d1.resolve();
                            break;
                        case 'validaOferta':
                            this._validaOferta();
                            d1.resolve();
                            break;
                        case 'cargarDetalle':
                            this._cargarDetalle(function () {
                                that._rolBehaviour(that._rol);
                                if (data.callbackMessages.length > 0) {
                                    sap.ui.getCore().getMessageManager().removeAllMessages();
                                }
                                d1.resolve();
                            });
                            break;
                    }
                } else {
                    d1.resolve();
                }
            }
        },

        _firstInit: function () {
            this._iniciarCampos();
            let orden = this.getAppParam('orden', '');

            if (orden) {
                this.set('/filters/Orden', orden);
                this.set('/FromExternal', true);
                this._buscarOT();
            } else {
                this.set('/FromExternal', false);
            }
        },

        _iniciarCampos: function () {
            this.roles = {
                TIPO_ASESOR_COMERCIAL: "ROL_MON_SP_0210",
                TIPO_ASESOR_GTIA: "ROL_MON_SP_0260",
                TIPO_ANALISTA_GTIA: "ROL_MON_SP_0250",
                TIPO_JEFE_SERVICIO: "ROL_MON_SP_0230,ROL_MON_SP_0270",
                TIPO_JEFE_TALLER: "ROL_MON_SP_0220,ROL_MON_SP_0280",
                TIPO_OPERACIONES: "ROL_MON_SP_0240",
                TIPO_EJECUTIVO_CENTRAL: "ROL_MON_SP_0300",
                TIPO_BUSQUEDA_SS: "ROL_MON_SP_0290",
                TIPO_GESTION_SS: "ROL_MON_SP_0310"
            };
            this.roles.TIPO_ASESOR = this.roles.TIPO_ASESOR_COMERCIAL + "," + this.roles.TIPO_ASESOR_GTIA;

            this._iniciarDetalle();
            this._iniciarCabecera();
            this._iniciarOperaciones();
            this._iniciarComponentes();
            this._iniciarCostes();
            this._iniciarInterlocutores();
            this.set('/Seccion', 'Cabecera');
            this.set('/ModoEdicion', false);
            this.set('/Visibles', {
                Contenido: false,
                Cabecera: {
                    Editar: true,
                    Grabar: false,
                    Cancelar: false,
                    BuscarEquipo: false,
                    IrAviso: true
                },
                Operaciones: {
                    AsignarNecesidades: false,
                    ManoObra: false,
                    Componente: false,
                    Desnotificar: false,
                    EditarOperacion: false,
                    Notificar: false,
                    ServicioExterno: false
                },
                Interlocutores: {
                    Editar: false,
                    Agregar: false,
                    Modificar: false,
                    Eliminar: false,
                    Grabar: false
                },
                Modificar: {
                    Tratar: false,
                    Recargar: false
                }

            });

            this.set('/Editables', {
                Detalle: {
                    TxtOrden: false
                },
                Cabecera: {
                    ClaseActividadPM: false,
                    Responsable: {
                        Plan: false,
                        Grupo: false,
                        PlanPuestoTrabajo: false,
                        PuestoTrabajo: false
                    },
                    Organizacion: {
                        CeCoResponsable: false,
                        CentroBeneficio: false
                    }
                }

            });

            this._cargarOpciones();

        },

        _iniciarDetalle: function () {
            this.set('/Detalle', {
                TipoOrden: '',
                Orden: '',
                TxtOrden: '',
                StatusSistema: '',
                UltimoStatus: ''
            });
        },

        _iniciarCabecera: function () {
            this.set('/Cabecera', {
                Solicitante: '',
                TxtSolicitante: '',
                CalleNum: '',
                Comuna: '',
                Poblacion: '',
                Pais: '',
                Region: '',
                Telefono: '',
                Fax: '',
                Fecha: '',
                Hora: '',
                TxtPais: '',
                Responsable: {
                    i_Plan: '',
                    i_Grupo: '',
                    i_PlanPuestoTrabajo: '',
                    i_PuestoTrabajo: '',
                    Responsable: '',
                    TxtResponsable: '',
                },
                Aviso: '',
                i_ClaseActividadPM: '',
                ObjetoReferencia: {
                    Equipo: '',
                    Patente: '',
                    Material: '',
                    TxtMaterial: '',
                },
                Organizacion: {
                    Sociedad: '',
                    TxtSociedad: '',
                    Division: '',
                    TxtDivision: '',
                    SociedadCO: '',
                    TxtSociedadCO: '',
                    CeCoResponsable: '',
                    TxtCeCoResponsable: '',
                    CentroBeneficio: '',
                    TxtCentroBeneficio: ''
                }
            });
        },

        _iniciarOperaciones: function () {
            this.set('/Operaciones', {
                Accion: 'MAIN',
                TipoOrden: '',
                Orden: '',
                TxtOrden: '',
                StatusSistema: '',
                UltimoStatus: '',
                Operaciones: [],
                i_Operacion: -1,
                OperacionesEditar: [],
                OperacionesDelete: [],
                i_OperacionesEditar: -1,
                Notificables: [],
                i_Notificable: -1,
                VisibleMecanicos: false
            });
        },

        _iniciarComponentes: function () {
            this.set('/Componentes', []);
        },

        _iniciarCostes: function () {
            this.set('/Costes', {
                Costos: [],
                Ingresos: []
            });
        },
        _iniciarInterlocutores: function () {
            this.set('/Interlocutores', []);
            this.set('/i_Interlocutor', -1);
        },

        _cargarOpciones: function () {
            let that = this;

            this.set('/Opciones', {
                Interlocutores: {
                    Funciones: []
                },
                Cabecera: {
                    Responsable: {
                        Grupos: [],
                        PuestosTrabajo: [],
                        Planes: [],
                        PlanesPuestoTrabajo: []
                    },
                    ClasesActividadPM: [],
                    Organizacion: {
                        CentrosBeneficio: []
                    }
                }
            });

            let ESQUEMAS = [];


            ESQUEMAS.push({
                ERNAM: "",
                FEHGR: "09",
                HITYP: "",
                NRART: "PE",
                PARVW: "Z2",
                PARVW_CONV: "Z2",
                STEIN: "X",
                UPARV: "",
                VTEXT: "Jefe Responsable"
            });

            ESQUEMAS.push({
                ERNAM: "",
                FEHGR: "09",
                HITYP: "",
                NRART: "PE",
                PARVW: "Z3",
                PARVW_CONV: "Z3",
                STEIN: "X",
                UPARV: "",
                VTEXT: "Tecnico Responsable",
            });

            ESQUEMAS.push({
                ERNAM: "",
                FEHGR: "07",
                HITYP: "",
                NRART: "KU",
                PARVW: "ZH",
                PARVW_CONV: "ZH",
                STEIN: "",
                UPARV: "",
                VTEXT: "Conductor Devolucion"
            });

            let funciones = utils.copyObjectArray(['PARVW', 'VTEXT', 'PARVW_CONV', 'FEHGR'], ['KEY', 'TEXT', 'KEY_CONV', 'GROUP'], ESQUEMAS, true);
            that.set('/Opciones/Interlocutores/Funciones', funciones);



            /*
                        utils.httpCall({
                            service: 'Z353R_BUSCAR_ESQUEMAS_ITERLOCU',
                            query: {},
                            type: 'POST',
                            success: function (result) {
                                let funciones = utils.copyObjectArray(['PARVW', 'VTEXT', 'PARVW_CONV', 'FEHGR'], ['KEY', 'TEXT', 'KEY_CONV', 'GROUP'], result.E_ESQUEMAS, true);
                                that.set('/Opciones/Interlocutores/Funciones', funciones);
                            }
                        });
        
                        */
        },

        handleSearchOT: function () {
            sap.ui.getCore().getMessageManager().removeAllMessages();

            this._buscarOT();
        },

        _buscarOT: function (success) {
            let that = this;
            let rol = this._rol;
            this._cargarDetalle(function () {
                that._esJefeTaller();

                that._rolBehaviour(rol);
                if (typeof success === 'function') {
                    success();
                }
            });
        },

        _cargarDetalle: function (success) {

            let that = this;
            let orden = that.get('/filters/Orden');

            sap.ui.getCore().getMessageManager().removeAllMessages();

            let E_HEADER = {

                ABCINDIC: "",
                ACTUAL_FINISH_DATE: "0000-00-00",
                ACTUAL_FINISH_TIME: "00:00:00",
                ACTUAL_START_DATE: "0000-00-00",
                ACTUAL_START_TIME: "00:00:00",
                ASSEMBLY: "",
                ASSEMBLY_EXTERNAL: "",
                ASSEMBLY_GUID: "",
                ASSEMBLY_LONG: "",
                ASSEMBLY_VERSION: "",
                ASSET_NO: "000000047184",
                AUTOSCHED: "X",
                BASICSTART: "00:00:00",
                BASIC_FIN: "24:00:00",
                BUS_AREA: "RA",
                CALC_MOTIVE: "",
                CALID: "",
                CALL_NO: 0,
                CAP_REQMTS: "X",
                CHANGED_BY: "MUNDONET",
                CHANGE_DATE: "2021-08-17",
                COMP_CODE: "2000",
                COSTCENTER: "20RAAR10",
                CO_AREA: "1000",
                CSTGVAPPLN: "ZPM1",
                CSTGVARACT: "ZPM1",
                CSTG_SHEET: "PP-PC1",
                CURRENCY: "CLP",
                CURRENCY_ISO: "CLP",
                DEVICEDATA: "",
                DISTR_CHAN: "VS",
                DIVISION: "E0",
                END_POINT: "",
                ENTERED_BY: "MUNDONET",
                ENTER_DATE: "2021-08-11",
                ENVIR_INVEST: "",
                EQUIPMENT: "3N6BD31A6LK802214R",
                ESTIMATED_COSTS: 0,
                FINISH_DATE: "2021-08-11",
                FIRST_OFFSET_TYPE_CODE: "",
                FIRST_OFFSET_TYPE_CODE_NAME: "",
                FIRST_OFFSET_UNIT: "",
                FIRST_OFFSET_UNIT_ISO: "",
                FIRST_OFFSET_VALUE: "",
                FUNCT_LOC: "",
                FUNC_AREA: "",
                GROUP_COUNTER: "",
                INVEST_PROFILE: "",
                INV_REASON: "",
                KALSN: "00",
                LAST_ORD: "",
                LEADING_ORDERID: "",
                LINEAR_LENGTH: "",
                LINEAR_UNIT: "",
                LINEAR_UNIT_ISO: "",
                LOCATION: "",
                LOC_BUS_AREA: "RA",
                LOC_COMP_CODE: "2000",
                LOC_CO_AREA: "1000",
                LOC_WBS_ELEM: "00000000",
                LOC_WKCTR_ID: "00000000",
                LOC_WK_CTR: "",
                LONG_TEXT: "",
                MAINTITEM: "",
                MAINTPLANT: "2BU0",
                MAINTROOM: "",
                MARKER_DISTANCE_END_POINT: "",
                MARKER_DISTANCE_START_POINT: "",
                MARKER_DISTANCE_UNIT: "",
                MARKER_DISTANCE_UNIT_ISO: "",
                MARKER_END_POINT: "",
                MARKER_START_POINT: "",
                MATERIAL: "840695",
                MATERIAL_EXTERNAL: "0000000000000000000000000000000000840695",
                MATERIAL_GUID: "95F18056D3E3CD17E10000000A52D51F",
                MATERIAL_LONG: "",
                MATERIAL_VERSION: "",
                MNTPLAN: "",
                MN_WKCTR_ID: "10000982",
                MN_WK_CTR: "ADMRAC",
                MRP_RELEVANT: "3",
                NETWORK_PROFILE: "0000001",
                NOTIF_NO: "67645462",
                OBJECTCLASS: "PA",
                OBJECT_NO: "OR000067623011",
                ORDERID: "67623011",
                ORDER_TYPE: "ZRMC",
                ORDPLANID: "",
                OVERHEAD_KEY: "",
                PLANGROUP: "",
                PLANPLANT: "2RA1",
                PLANT: "2RA1",
                PLSECTN: "100",
                PMACTTYPE: "019",
                PRIORITY: "",
                PRIOTYPE: "PM",
                PROCESSING_GROUP: "00",
                PRODUCTION_FINISH_DATE: "2021-08-11",
                PRODUCTION_FINISH_TIME: "24:00:00",
                PRODUCTION_START_DATE: "2021-08-11",
                PRODUCTION_START_TIME: "24:00:00",
                PROFIT_CTR: "20RAAR10",
                PROJ_DEF: "00000000",
                REFDATE: "2021-08-17",
                RESERV_NO: "0002620517",
                RESPCCTR: "20RAAR10",
                RESP_PLANNER_GROUP: "",
                RES_ANAL_KEY: "000001",
                REVISION: "",
                ROUTING_NO: "1002493820",
                SALESORG: "2000",
                SALES_ORD: "",
                SCALE: "",
                SCENARIO: "O150",
                SCHEDULING_EXACT_BREAK_TIMES: "",
                SCHED_TYPE: "2",
                SECOND_OFFSET_TYPE_CODE: "",
                SECOND_OFFSET_TYPE_CODE_NAME: "",
                SECOND_OFFSET_UNIT: "",
                SECOND_OFFSET_UNIT_ISO: "",
                SECOND_OFFSET_VALUE: "",
                SERIALNO: "3N6BD31A6LK802214R",
                SETTLORDER: "",
                SHORT_TEXT: "MONTAJE NEUMATICOS",
                SORTFIELD: "BLANCO",
                STANDORDER: "",
                START_DATE: "2021-08-11",
                START_POINT: "",
                STAT_PROF: "CHK_RAC1",
                SUB_NUMBER: "0000",
                SUPERIOR_ACTIVITY: "",
                SUPERIOR_COUNTER: "00000000",
                SUPERIOR_NETWORK: "",
                SUPERIOR_ORDERID: "",
                SUPERIOR_ROUTING_NO: "0000000000",
                SYSTCOND: "",
                SYS_STATUS: "CTEC FENA KKMP NLIQ PREC",
                S_ORD_ITEM: "000000",
                TASK_LIST_GROUP: "",
                TASK_LIST_TYPE: "E",
                TAXJURCODE: "",
                USERSTATUS: "",
                USER_ST: "",
                VERSION: "00",
                WBS_ELEM: "00000000",

            };

            let E_RETURN = {

                FIELD: "",
                ID: "",
                LOG_MSG_NO: "000000",
                LOG_NO: "",
                MESSAGE: "",
                MESSAGE_V1: "",
                MESSAGE_V2: "",
                MESSAGE_V3: "",
                MESSAGE_V4: "",
                NUMBER: "000",
                PARAMETER: "",
                ROW: 0,
                SYSTEM: "",
                TYPE: "S",
            };

            let E_SRVDATA = {

                BASE_UOM: "",
                BASE_UOM_ISO: "",
                BILLING_FORM: "",
                CONFIGURATION: "000000000000000000",
                DISTR_CHAN: "VS",
                DIVISION: "E0",
                DLI_PROFILE: "ZRAC",
                MATERIAL: "",
                MATERIAL_EXTERNAL: "",
                MATERIAL_GUID: "",
                MATERIAL_LONG: "",
                MATERIAL_VERSION: "LKPW10",
                OBJECT_NO: "OR000067623011",
                PURCH_DATE: "0000-00-00",
                PURCH_NO_C: "",
                QUANTITY: 0,
                SALESORG: "2000",
                SALES_GRP: "",
                SALES_OFF: "",
            };

            let E_TEXTOS = {

                TXT_CECO: "RANCAGUA",
                TXT_CECO_RESP: "Arriendos RA",
                TXT_CENTR_BENE: "Arriendo Rancagua",
                TXT_CLAACT: "Servicio Externo",
                TXT_COMUNA: "",
                TXT_MATERIAL: "NP300 CS 4X2 2.3TDI",
                TXT_PAIS: "",
                TXT_PLANTA: "",
                TXT_PUESTTRAB: "Administrativo Rent a Car",
                TXT_RESPONSABLE: "Person respons.",
                TXT_SOCIEDAD: "Sociedad CO",
                TXT_SOLICITANTE: "Sold-to party",
            };

            let T_COMPONENTS = [];



            let T_COSTOS_CLP = [];

            let T_COSTS_DETAILS = [];

            let T_COSTS_SUM = [];

            let T_DATOS_PARTNERS = [];

            T_DATOS_PARTNERS.push({
                COMUNA: "",
                DIRECCION: "BEAUCHEF 850, 6º PISO",
                FONO: "987082258",
                NOMBRE: "UNIVERSIDAD DE CHILE",
                PAIS: "CL",
                PARTNER: "60910000-1",
                POBLACION: "",
                REGION: "13",
                TEXTO_PAIS: "CHILE",
                TIPO_PARTNER: "AG",
                TIPO_PARTNER_CONV: "AG",
                TXT_TIPOPARTNER: "Solicitante",
            });

            T_DATOS_PARTNERS.push({
                COMUNA: "",
                DIRECCION: "",
                FONO: "",
                NOMBRE: "DUARTE VICTOR JAVIER",
                PAIS: "VE",
                PARTNER: "24725178",
                POBLACION: "",
                REGION: "",
                TEXTO_PAIS: "",
                TIPO_PARTNER: "VW",
                TIPO_PARTNER_CONV: "",
                TXT_TIPOPARTNER: "Responsable"
            });

            let T_OLIST = [];

            T_OLIST.push({
                ASSEMBLY: "",
                ASSEMBLY_EXTERNAL: "",
                ASSEMBLY_GUID: "",
                ASSEMBLY_LONG: "",
                ASSEMBLY_VERSION: "",
                COUNTER: 1,
                DESCRIPTN: "",
                EQUIDESCR: "NP300 CS 4x2 2.3TDI",
                EQUIPMENT: "3N6BD31A6LK802214R",
                FUNCLDESCR: "",
                FUNCLOC_DISP: "",
                FUNCT_LOC: "",
                MATL_DESC: "NP300 CS 4x2 2.3TDI",
                NOTIF_NO: "000067645462",
                PROCESSING_IND: "",
                SERIALNO: "3N6BD31A6LK802214R",
                SERMAT: "000000000000840695",
                SERMAT_EXTERNAL: "",
                SERMAT_GUID: "",
                SERMAT_LONG: "",
                SERMAT_VERSION: "",
                SHORT_TEXT: "MONTAJE NEUMATICOS",
                SORTFIELD: "",
            });

            let T_OPERATIONS = [];

            T_OPERATIONS.push({
                ACTIVITY: "0020",
                ACTTYPE: "",
                ACT_END_DATE: "0000-00-00",
                ACT_END_TIME: "00:00:00",
                ACT_START_DATE: "0000-00-00",
                ACT_START_TIME: "00:00:00",
                AGMT_ITEM: "00000",
                AGREEMENT: "",
                ASSEMBLY: "",
                ASSEMBLY_EXTERNAL: "",
                ASSEMBLY_GUID: "",
                ASSEMBLY_LONG: "",
                ASSEMBLY_VERSION: "",
                BASE_UOM: "C/U",
                BASE_UOM_ISO: "EA",
                BUS_AREA: "RA",
                CALC_KEY: "1",
                COMPLETE: "",
                COMP_CODE: "",
                CONF_NO: "0010610348",
                CONSTRAINT_TYPE_FINISH: "",
                CONSTRAINT_TYPE_START: "",
                CONTROL_KEY: "RAC1",
                COST_ELEMENT: "0041020014",
                CSTG_SHEET: "",
                CURRENCY: "CLP",
                CURRENCY_ISO: "CLP",
                DESCRIPTION: "MONTAJE NEUMATICOS",
                DURATION_NORMAL: 0,
                DURATION_NORMAL_UNIT: "HRA",
                DURATION_NORMAL_UNIT_ISO: "HUR",
                EARL_SCHED_FIN_DATE: "2021-08-11",
                EARL_SCHED_FIN_TIME: "24:00:00",
                EARL_SCHED_START_DATE: "2021-08-11",
                EARL_SCHED_START_TIME: "24:00:00",
                END_POINT: "",
                EQUIPMENT: "",
                EXECFACTOR: 1,
                FCST_FIN_DATE: "0000-00-00",
                FCST_FIN_TIME: "00:00:00",
                FIELD_KEY: "",
                FIELD_USER_STATUS: "",
                FINTIMCONS: "00:00:00",
                FIN_CONSTR: "0000-00-00",
                FIRST_OFFSET_TYPE_CODE: "",
                FIRST_OFFSET_TYPE_CODE_NAME: "",
                FIRST_OFFSET_UNIT: "",
                FIRST_OFFSET_UNIT_ISO: "",
                FIRST_OFFSET_VALUE: "",
                FREE_BUFFER: 0,
                FUNCT_LOC: "",
                FUNC_AREA: "",
                FW_ORDER: "",
                GR_RCPT: "",
                INFO_REC: "",
                INT_DISTR: "",
                LANGU: "",
                LANGU_ISO: "",
                LATE_SCHED_FIN_DATE: "2021-08-11",
                LATE_SCHED_FIN_TIME: "24:00:00",
                LATE_SCHED_START_DATE: "2021-08-11",
                LATE_SCHED_START_TIME: "24:00:00",
                LINEAR_LENGTH: "",
                LINEAR_UNIT: "",
                LINEAR_UNIT_ISO: "",
                MAINTENANCE_ACTIVITY_TYPE: "",
                MARKER_DISTANCE_END_POINT: "",
                MARKER_DISTANCE_START_POINT: "",
                MARKER_DISTANCE_UNIT: "",
                MARKER_DISTANCE_UNIT_ISO: "",
                MARKER_END_POINT: "",
                MARKER_START_POINT: "",
                MATL_GROUP: "0027",
                MRP_RELEVANT: "3",
                NOTIF_NO: "",
                NO_OF_TIME_TICKETS: 0,
                NUMBER_OF_CAPACITIES: "0 ",
                OBJECTCLASS: "PA",
                OFFSET_END: 0,
                OFFSET_END_UNIT: "",
                OFFSET_END_UNIT_ISO: "",
                OFFSET_START: 0,
                OFFSET_START_UNIT: "",
                OFFSET_START_UNIT_ISO: "",
                ORDER_ITEM: "00000",
                OVERHEAD_KEY: "",
                PCKG_NO: "0000000000",
                PERCENT_OF_WORK: "0 ",
                PERS_NO: "00000000",
                PLANT: "2RA1",
                PLND_DELRY: 0,
                PREQ_ITEM: "00000",
                PREQ_NAME: "",
                PREQ_NO: "",
                PRICE: 1,
                PRICE_UNIT: 0,
                PROFIT_CTR: "",
                PURCH_ORG: "2000",
                PUR_GROUP: "202",
                QUANTITY: 1,
                SECOND_OFFSET_TYPE_CODE: "",
                SECOND_OFFSET_TYPE_CODE_NAME: "",
                SECOND_OFFSET_UNIT: "",
                SECOND_OFFSET_UNIT_ISO: "",
                SECOND_OFFSET_VALUE: "",
                SORT_FLD: "",
                STANDARD_TEXT_KEY: "R000277",
                START_CONS: "0000-00-00",
                START_POINT: "",
                STAT_PROF: "",
                STRTTIMCON: "00:00:00",
                SUB_ACTIVITY: "",
                SUITABILITY: "",
                SYSTCOND: "",
                SYSTEM_STATUS_TEXT: "CTEC",
                TAXJURCODE: "",
                TOTAL_BUFFER: 0,
                TRACKINGNO: "",
                UNLOAD_PT: "",
                UN_WORK: "HRA",
                UN_WORK_ISO: "HUR",
                USE04: "",
                USE04_ISO: "",
                USE05: "",
                USE05_ISO: "",
                USE06: "",
                USE06_ISO: "",
                USE07: "",
                USE07_ISO: "",
                USR00: "",
                USR01: "",
                USR02: "",
                USR03: "",
                USR04: 0,
                USR05: 0,
                USR06: 0,
                USR07: 0,
                USR08: "0000-00-00",
                USR09: "0000-00-00",
                USR10: "",
                USR11: "",
                VENDOR_NO: "",
                WAGEGROUP: "",
                WAGETYPE: "",
                WBS_ELEM: "00000000",
                WORK_ACTIVITY: 0,
                WORK_ACTUAL: 0,
                WORK_CNTR: "ADMRAC",
                WORK_FORECAST: 0,
            });

            let T_OPROL = [];

            let T_PARTNER = [];

            T_PARTNER.push({
                PARTNER: "",
                PARTNER_OLD: "60910000-1",
                PARTN_ROLE: "",
                PARTN_ROLE_OLD: "AG",
            });

            T_PARTNER.push({
                PARTNER: "",
                PARTNER_OLD: "0000145808",
                PARTN_ROLE: "",
                PARTN_ROLE_OLD: "AP",
            });

            let T_PRTS = [];

            let T_RELATIONS = [];

            let T_SRULES = [];

            T_SRULES.push({
                ACTIVITY: "",
                AMOUNT: 0,
                ASSETMAINO: "",
                ASSETSUBNO: "",
                AVORG: "",
                BEINH: "",
                BEINH_ISO: "",
                BMENG: 0,
                BREST: 0,
                BRTYP: "",
                BUS_AREA: "",
                COMP_CODE: "2000",
                COSTCENTER: "",
                COSTOBJECT: "",
                CO_BUSPROC: "",
                CURRENCY: "",
                CURRENCY_ISO: "",
                DFREG: "PM1",
                DIST_RULE_GROUP: "000",
                DIST_RULE_SEQ_NUMBER: "001",
                EQUIV_NUMBER: 0,
                EXTNR: "001",
                FIRST_USED_PER: "000",
                FIRST_USED_YEAR: "0000",
                GL_ACCOUNT: "",
                KOKRS: "1000",
                KONTY: "EO",
                LAST_USED_PER: "000",
                LAST_USED_YEAR: "0000",
                MATERIAL: "",
                MATERIAL_EXTERNAL: "",
                MATERIAL_GUID: "",
                MATERIAL_LONG: "",
                MATERIAL_VERSION: "",
                METH_TRACING_FACTOR: "000",
                MOVEMENTTYPE: "",
                MRULE: "",
                NETWORK: "",
                OBJECT_NO: "OR000067623011",
                ORDERID: "",
                ORDER_ITNO: "0000",
                PASUBNR: "0001",
                PERCENTAGE: 100,
                PLANT: "",
                PROFIT_CTR: "",
                PROFIT_SEGM_NO: "0060800199",
                REC_IND: "",
                REC_OBJNR1: "EO10000060800199",
                REC_OBJNR2: "",
                RIFIND: "",
                SALES_ORD: "",
                SETTL_STRATEGY: "",
                SETTL_TYPE: "GES",
                SOURCE: "",
                S_ORD_ITEM: "000000",
                VALID_FROM_PER: "000",
                VALID_FROM_YEAR: "0000",
                VALID_TO_PER: "000",
                VALID_TO_YEAR: "0000",
                VAL_TYPE: "",
                VERSION: "",
                WBS_ELEMENT: "",
                ZINCL: "",
            });

            T_SRULES.push({
                ACTIVITY: "",
                AMOUNT: 0,
                ASSETMAINO: "",
                ASSETSUBNO: "",
                AVORG: "",
                BEINH: "",
                BEINH_ISO: "",
                BMENG: 0,
                BREST: 0,
                BRTYP: "",
                BUS_AREA: "",
                COMP_CODE: "2000",
                COSTCENTER: "",
                COSTOBJECT: "",
                CO_BUSPROC: "",
                CURRENCY: "",
                CURRENCY_ISO: "",
                DFREG: "PM2",
                DIST_RULE_GROUP: "000",
                DIST_RULE_SEQ_NUMBER: "002",
                EQUIV_NUMBER: 0,
                EXTNR: "002",
                FIRST_USED_PER: "000",
                FIRST_USED_YEAR: "0000",
                GL_ACCOUNT: "",
                KOKRS: "1000",
                KONTY: "EO",
                LAST_USED_PER: "000",
                LAST_USED_YEAR: "0000",
                MATERIAL: "",
                MATERIAL_EXTERNAL: "",
                MATERIAL_GUID: "",
                MATERIAL_LONG: "",
                MATERIAL_VERSION: "",
                METH_TRACING_FACTOR: "000",
                MOVEMENTTYPE: "",
                MRULE: "",
                NETWORK: "",
                OBJECT_NO: "OR000067623011",
                ORDERID: "",
                ORDER_ITNO: "0000",
                PASUBNR: "0001",
                PERCENTAGE: 100,
                PLANT: "",
                PROFIT_CTR: "",
                PROFIT_SEGM_NO: "0060800201",
                REC_IND: "",
                REC_OBJNR1: "EO10000060800201",
                REC_OBJNR2: "",
                RIFIND: "",
                SALES_ORD: "",
                SETTL_STRATEGY: "",
                SETTL_TYPE: "PER",
                SOURCE: "",
                S_ORD_ITEM: "000000",
                VALID_FROM_PER: "000",
                VALID_FROM_YEAR: "0000",
                VALID_TO_PER: "000",
                VALID_TO_YEAR: "0000",
                VAL_TYPE: "",
                VERSION: "",
                WBS_ELEMENT: "",
                ZINCL: "",
            });

            let T_TEXTS = [];

            let T_TEXT_LINES = [];

            let result = {

                E_HEADER: E_HEADER,
                E_RETURN: E_RETURN,
                E_SRVDATA: E_SRVDATA,
                E_TEXTOS: E_TEXTOS,
                T_COMPONENTS: T_COMPONENTS,
                T_COSTOS_CLP: T_COSTOS_CLP,
                T_COSTS_DETAILS: T_COSTS_DETAILS,
                T_COSTS_SUM: T_COSTS_SUM,
                T_DATOS_PARTNERS: T_DATOS_PARTNERS,
                T_OLIST: T_OLIST,
                T_OPERATIONS: T_OPERATIONS,
                T_OPROL: T_OPROL,
                T_PARTNER: T_PARTNER,
                T_PRTS: T_PRTS,
                T_RELATIONS: T_RELATIONS,
                T_SRULES: T_SRULES,
                T_TEXTS: T_TEXTS,
                T_TEXT_LINES: T_TEXT_LINES,
            };

            //          if (jQuery.isEmptyObject(result)) {
            //            that.addMessage('Error en la ejecución: nodo output vacío.', 'E');
            //      } else if (!result.E_RETURN) {
            //          that.addMessage('Error en la ejecución: nodo E_return vacío.', 'E');
            //    } else if (result.E_RETURN.TYPE === 'E') {
            //        that.addMessage(result.E_RETURN.MESSAGE, 'E');
            //    } else {
            let detalle = utils.copyObject(
                ['ORDERID', 'ORDER_TYPE', 'SYS_STATUS', 'SHORT_TEXT', 'USERSTATUS', 'MN_WK_CTR'],
                ['Orden', 'TipoOrden', 'StatusSistema', 'TxtOrden', 'UltimoStatus', 'PuestoTrabajo'],
                result.E_HEADER
            );
            that.set('/Detalle', detalle);


            let df = sap.ui.core.format.DateFormat.getDateInstance({ pattern: 'dd/MM/yyyy' });
            let tf = sap.ui.core.format.DateFormat.getTimeInstance({ pattern: 'HH:mm:ss' });

            let cabecera = {
                Solicitante: '',
                TxtSolicitante: result.E_TEXTOS.TXT_SOLICITANTE,
                CalleNum: '',
                Comuna: '',
                Poblacion: '',
                Pais: '',
                Region: '',
                Telefono: '',
                Fax: '',
                Fecha: df.format(new Date()),
                Hora: tf.format(new Date()),
                TxtPais: result.E_TEXTOS.TXT_PAIS,
                Responsable: {
                    i_Plan: result.E_HEADER.PLANPLANT,
                    i_Grupo: result.E_HEADER.PLANGROUP,
                    i_PlanPuestoTrabajo: result.E_HEADER.PLANT,
                    i_PuestoTrabajo: result.E_HEADER.MN_WK_CTR,
                    Responsable: '',
                    TxtResponsable: '',
                },
                Aviso: result.E_HEADER.NOTIF_NO,
                i_ClaseActividadPM: result.E_HEADER.PMACTTYPE,
                ObjetoReferencia: {
                    Equipo: result.E_HEADER.EQUIPMENT,
                    Patente: result.E_SRVDATA.MATERIAL_VERSION,
                    Material: result.E_HEADER.MATERIAL,
                    TxtMaterial: result.E_TEXTOS.TXT_MATERIAL,
                },
                Organizacion: {
                    Sociedad: result.E_HEADER.COMP_CODE,
                    TxtSociedad: result.E_TEXTOS.TXT_SOCIEDAD,
                    Division: result.E_HEADER.BUS_AREA,
                    TxtDivision: result.E_TEXTOS.TXT_CECO,
                    SociedadCO: result.E_HEADER.CO_AREA,
                    TxtSociedadCO: result.E_TEXTOS.TXT_SOCIEDAD,
                    CeCoResponsable: result.E_HEADER.RESPCCTR,
                    TxtCeCoResponsable: result.E_TEXTOS.TXT_CECO_RESP,
                    CentroBeneficio: result.E_HEADER.PROFIT_CTR,
                    TxtCentroBeneficio: result.E_TEXTOS.TXT_CENTR_BENE
                }
            };


            let operaciones = utils.copyObjectArray(
                ['QUANTITY', 'PLANT', 'ACTTYPE', 'ACTTYPE', 'CONTROL_KEY', 'DURATION_NORMAL', 'ACTIVITY', 'WORK_CNTR', 'SUB_ACTIVITY', 'WORK_ACTIVITY', 'DESCRIPTION', 'UN_WORK', 'DURATION_NORMAL_UNIT'],
                ['CANTIDAD', 'CENTRO', 'CLASE_ACTIVIDAD', 'i_CLASE_ACTIVIDAD', 'CLAVE_CONTROL', 'DURACION', 'OPERACION', 'PUESTO_TRABAJO', 'SUB_OPERACION', 'TRABAJO', 'TXT_OPERACION', 'UNIDAD', 'UNIDAD2'],
                result.T_OPERATIONS,
                false
            );
            that.set('/Operaciones/Operaciones', operaciones);

            let interlocutores = [];
            for (var i = 0; i < result.T_DATOS_PARTNERS.length; i++) {
                let orig = result.T_DATOS_PARTNERS[i];
                let dest = {};
                if (orig.TIPO_PARTNER === 'AG') {
                    cabecera.Solicitante = orig.PARTNER;
                    cabecera.TxtSolicitante = orig.NOMBRE;
                    cabecera.CalleNum = orig.DIRECCION;
                    cabecera.Comuna = orig.COMUNA;
                    cabecera.Telefono = orig.FONO;
                    cabecera.Fax = orig.FONO;
                    cabecera.Region = orig.REGION;
                    cabecera.Pais = orig.PAIS;
                    cabecera.TxtPais = orig.TEXTO_PAIS;
                } else if (orig.TIPO_PARTNER === 'VW') {
                    cabecera.Responsable.Responsable = orig.PARTNER;
                    cabecera.Responsable.TxtResponsable = orig.NOMBRE;
                }

                dest.INTERLOCUTOR = orig.PARTNER;
                dest.I_FUNCION = orig.TIPO_PARTNER;
                dest.NOMBRE = orig.NOMBRE;
                dest.DIRECCION = orig.DIRECCION;
                dest.AGREGA = false;
                dest.MODIFICA = false;
                dest.ELIMINA = false;

                interlocutores.push(dest);
            }
            that.set('/Interlocutores', interlocutores);
            that.set('/Cabecera', cabecera);


            let componentes = utils.copyObjectArray([
                'ITEM_NUMBER',
                'MATERIAL',
                'MATL_DESC',
                'REQUIREMENT_QUANTITY',
                'LEAD_TIME_OFFSET_OPR_UNIT',
                'ITEM_CAT',
                'STGE_LOC',
                'PLANT',
                'ACTIVITY'
            ], [
                'POSICION',
                'COMPONENTE',
                'DENOMINACION',
                'CTD_NECESARIA',
                'UNIDAD_MEDIDA',
                'TP',
                'ALMACEN',
                'CENTRO',
                'OPERACION'
            ], result.T_COMPONENTS, false);

            that.set('/Componentes', componentes);

            let costos = [{
                COSTES: 'Total Costos',
                COSTOS_ESTIMADOS: 0,
                COSTOS_PLANIFICADOS: 0,
                COSTOS_REALES: 0,
                MONEDA: 'CLP'
            }];

            let ingresos = [{
                INGRESOS: 'Total Ingresos',
                INGRESOS_ESTIMADOS: 0,
                INGRESOS_PLANIFICADOS: 0,
                INGRESOS_REALES: 0,
                MONEDA: 'CLP'
            }];

            for (var i = 0; i < result.T_COSTOS_CLP.length; i++) {
                let costosOrig = result.T_COSTOS_CLP[i];
                if (costosOrig.DEBIT_TYPE === '1') {
                    let costo = utils.copyObject(
                        ['VALUE_CATEGORY', 'MONTO_CLP_EST', 'MONTO_CLP_PLAN', 'MONTO_CLP_ACT', 'CURRENCY'],
                        ['COSTES', 'COSTOS_ESTIMADOS', 'COSTOS_PLANIFICADOS', 'COSTOS_REALES', 'MONEDA'],
                        costosOrig
                    );

                    costo.COSTOS_ESTIMADOS = that._formatFloat(costo.COSTOS_ESTIMADOS);
                    costo.COSTOS_PLANIFICADOS = that._formatFloat(costo.COSTOS_PLANIFICADOS);
                    costo.COSTOS_REALES = that._formatFloat(costo.COSTOS_REALES);


                    costos[0].COSTOS_ESTIMADOS += costo.COSTOS_ESTIMADOS;
                    costos[0].COSTOS_PLANIFICADOS += costo.COSTOS_PLANIFICADOS;
                    costos[0].COSTOS_REALES += costo.COSTOS_REALES;

                    costos[0].MONEDA = costo.MONEDA;

                    costos.push(costo);
                } else if (costosOrig.DEBIT_TYPE === '2') {
                    let ingreso = {
                        INGRESOS: costosOrig.VALUE_CATEGORY,
                        INGRESOS_ESTIMADOS: (costosOrig.MONTO_CLP_EST.trim() === '0' ? costosOrig.MONTO_CLP_EST.replace('-', '') : '-' + costosOrig.MONTO_CLP_EST.replace('-', '').trim()),
                        INGRESOS_PLANIFICADOS: (costosOrig.MONTO_CLP_PLAN.trim() === '0' ? costosOrig.MONTO_CLP_PLAN.replace('-', '') : '-' + costosOrig.MONTO_CLP_PLAN.replace('-', '').trim()),
                        INGRESOS_REALES: (costosOrig.MONTO_CLP_ACT.trim() === '0' ? costosOrig.MONTO_CLP_ACT.replace('-', '') : '-' + costosOrig.MONTO_CLP_ACT.replace('-', '').trim()),
                        MONEDA: costosOrig.CURRENCY
                    };

                    ingreso.INGRESOS_ESTIMADOS = that._formatFloat(ingreso.INGRESOS_ESTIMADOS);
                    ingreso.INGRESOS_PLANIFICADOS = that._formatFloat(ingreso.INGRESOS_PLANIFICADOS);
                    ingreso.INGRESOS_REALES = that._formatFloat(ingreso.INGRESOS_REALES);

                    ingresos[0].INGRESOS_ESTIMADOS += ingreso.INGRESOS_ESTIMADOS;
                    ingresos[0].INGRESOS_PLANIFICADOS += ingreso.INGRESOS_PLANIFICADOS;
                    ingresos[0].INGRESOS_REALES += ingreso.INGRESOS_REALES;
                    ingresos[0].MONEDA = ingreso.MONEDA;
                    ingresos.push(ingreso);
                }
            }

            that.set('/Costes/Costos', costos);
            that.set('/Costes/Ingresos', ingresos);

            let visibles = that.get('/Visibles/Operaciones');
            visibles.AsignarNecesidades = false;
            visibles.ManoObra = false;
            visibles.Componente = false;
            visibles.Desnotificar = false;
            visibles.EditarOperacion = false;
            visibles.Notificar = false;
            visibles.ServicioExterno = false;

            if (result.E_HEADER.SYS_STATUS.indexOf('ABIE') > -1 || result.E_HEADER.SYS_STATUS.indexOf('LIB.') > -1) {
                visibles.AsignarNecesidades = true;
                visibles.ManoObra = true;
                visibles.Componente = true;
                visibles.EditarOperacion = true;
                visibles.ServicioExterno = true;
            }
            that.set('/Visibles/Operaciones', visibles);
            that.set('/Visibles/Contenido', true);

            that._cargarOpciones2(success);


            /*
                        utils.httpCall({
                            service: 'ZPMMF_001_TRAEDETALLEOT',
                            query: {
                                I_ORDEN: orden
                            },
                            success: function (result) {
                                if (jQuery.isEmptyObject(result)) {
                                    that.addMessage('Error en la ejecución: nodo output vacío.', 'E');
                                } else if (!result.E_RETURN) {
                                    that.addMessage('Error en la ejecución: nodo E_return vacío.', 'E');
                                } else if (result.E_RETURN.TYPE === 'E') {
                                    that.addMessage(result.E_RETURN.MESSAGE, 'E');
                                } else {
                                    let detalle = utils.copyObject(
                                        ['ORDERID', 'ORDER_TYPE', 'SYS_STATUS', 'SHORT_TEXT', 'USERSTATUS', 'MN_WK_CTR'],
                                        ['Orden', 'TipoOrden', 'StatusSistema', 'TxtOrden', 'UltimoStatus', 'PuestoTrabajo'],
                                        result.E_HEADER
                                    );
                                    that.set('/Detalle', detalle);
            
            
                                    let df = sap.ui.core.format.DateFormat.getDateInstance({ pattern: 'dd/MM/yyyy' });
                                    let tf = sap.ui.core.format.DateFormat.getTimeInstance({ pattern: 'HH:mm:ss' });
            
                                    let cabecera = {
                                        Solicitante: '',
                                        TxtSolicitante: result.E_TEXTOS.TXT_SOLICITANTE,
                                        CalleNum: '',
                                        Comuna: '',
                                        Poblacion: '',
                                        Pais: '',
                                        Region: '',
                                        Telefono: '',
                                        Fax: '',
                                        Fecha: df.format(new Date()),
                                        Hora: tf.format(new Date()),
                                        TxtPais: result.E_TEXTOS.TXT_PAIS,
                                        Responsable: {
                                            i_Plan: result.E_HEADER.PLANPLANT,
                                            i_Grupo: result.E_HEADER.PLANGROUP,
                                            i_PlanPuestoTrabajo: result.E_HEADER.PLANT,
                                            i_PuestoTrabajo: result.E_HEADER.MN_WK_CTR,
                                            Responsable: '',
                                            TxtResponsable: '',
                                        },
                                        Aviso: result.E_HEADER.NOTIF_NO,
                                        i_ClaseActividadPM: result.E_HEADER.PMACTTYPE,
                                        ObjetoReferencia: {
                                            Equipo: result.E_HEADER.EQUIPMENT,
                                            Patente: result.E_SRVDATA.MATERIAL_VERSION,
                                            Material: result.E_HEADER.MATERIAL,
                                            TxtMaterial: result.E_TEXTOS.TXT_MATERIAL,
                                        },
                                        Organizacion: {
                                            Sociedad: result.E_HEADER.COMP_CODE,
                                            TxtSociedad: result.E_TEXTOS.TXT_SOCIEDAD,
                                            Division: result.E_HEADER.BUS_AREA,
                                            TxtDivision: result.E_TEXTOS.TXT_CECO,
                                            SociedadCO: result.E_HEADER.CO_AREA,
                                            TxtSociedadCO: result.E_TEXTOS.TXT_SOCIEDAD,
                                            CeCoResponsable: result.E_HEADER.RESPCCTR,
                                            TxtCeCoResponsable: result.E_TEXTOS.TXT_CECO_RESP,
                                            CentroBeneficio: result.E_HEADER.PROFIT_CTR,
                                            TxtCentroBeneficio: result.E_TEXTOS.TXT_CENTR_BENE
                                        }
                                    };
            
            
                                    let operaciones = utils.copyObjectArray(
                                        ['QUANTITY', 'PLANT', 'ACTTYPE', 'ACTTYPE', 'CONTROL_KEY', 'DURATION_NORMAL', 'ACTIVITY', 'WORK_CNTR', 'SUB_ACTIVITY', 'WORK_ACTIVITY', 'DESCRIPTION', 'UN_WORK', 'DURATION_NORMAL_UNIT'],
                                        ['CANTIDAD', 'CENTRO', 'CLASE_ACTIVIDAD', 'i_CLASE_ACTIVIDAD', 'CLAVE_CONTROL', 'DURACION', 'OPERACION', 'PUESTO_TRABAJO', 'SUB_OPERACION', 'TRABAJO', 'TXT_OPERACION', 'UNIDAD', 'UNIDAD2'],
                                        result.T_OPERATIONS,
                                        false
                                    );
                                    that.set('/Operaciones/Operaciones', operaciones);
            
                                    let interlocutores = [];
                                    for (var i = 0; i < result.T_DATOS_PARTNERS.length; i++) {
                                        let orig = result.T_DATOS_PARTNERS[i];
                                        let dest = {};
                                        if (orig.TIPO_PARTNER === 'AG') {
                                            cabecera.Solicitante = orig.PARTNER;
                                            cabecera.TxtSolicitante = orig.NOMBRE;
                                            cabecera.CalleNum = orig.DIRECCION;
                                            cabecera.Comuna = orig.COMUNA;
                                            cabecera.Telefono = orig.FONO;
                                            cabecera.Fax = orig.FONO;
                                            cabecera.Region = orig.REGION;
                                            cabecera.Pais = orig.PAIS;
                                            cabecera.TxtPais = orig.TEXTO_PAIS;
                                        } else if (orig.TIPO_PARTNER === 'VW') {
                                            cabecera.Responsable.Responsable = orig.PARTNER;
                                            cabecera.Responsable.TxtResponsable = orig.NOMBRE;
                                        }
            
                                        dest.INTERLOCUTOR = orig.PARTNER;
                                        dest.I_FUNCION = orig.TIPO_PARTNER;
                                        dest.NOMBRE = orig.NOMBRE;
                                        dest.DIRECCION = orig.DIRECCION;
                                        dest.AGREGA = false;
                                        dest.MODIFICA = false;
                                        dest.ELIMINA = false;
            
                                        interlocutores.push(dest);
                                    }
                                    that.set('/Interlocutores', interlocutores);
                                    that.set('/Cabecera', cabecera);
            
            
                                    let componentes = utils.copyObjectArray([
                                        'ITEM_NUMBER',
                                        'MATERIAL',
                                        'MATL_DESC',
                                        'REQUIREMENT_QUANTITY',
                                        'LEAD_TIME_OFFSET_OPR_UNIT',
                                        'ITEM_CAT',
                                        'STGE_LOC',
                                        'PLANT',
                                        'ACTIVITY'
                                    ], [
                                        'POSICION',
                                        'COMPONENTE',
                                        'DENOMINACION',
                                        'CTD_NECESARIA',
                                        'UNIDAD_MEDIDA',
                                        'TP',
                                        'ALMACEN',
                                        'CENTRO',
                                        'OPERACION'
                                    ], result.T_COMPONENTS, false);
            
                                    that.set('/Componentes', componentes);
            
                                    let costos = [{
                                        COSTES: 'Total Costos',
                                        COSTOS_ESTIMADOS: 0,
                                        COSTOS_PLANIFICADOS: 0,
                                        COSTOS_REALES: 0,
                                        MONEDA: 'CLP'
                                    }];
            
                                    let ingresos = [{
                                        INGRESOS: 'Total Ingresos',
                                        INGRESOS_ESTIMADOS: 0,
                                        INGRESOS_PLANIFICADOS: 0,
                                        INGRESOS_REALES: 0,
                                        MONEDA: 'CLP'
                                    }];
            
                                    for (var i = 0; i < result.T_COSTOS_CLP.length; i++) {
                                        let costosOrig = result.T_COSTOS_CLP[i];
                                        if (costosOrig.DEBIT_TYPE === '1') {
                                            let costo = utils.copyObject(
                                                ['VALUE_CATEGORY', 'MONTO_CLP_EST', 'MONTO_CLP_PLAN', 'MONTO_CLP_ACT', 'CURRENCY'],
                                                ['COSTES', 'COSTOS_ESTIMADOS', 'COSTOS_PLANIFICADOS', 'COSTOS_REALES', 'MONEDA'],
                                                costosOrig
                                            );
            
                                            costo.COSTOS_ESTIMADOS = that._formatFloat(costo.COSTOS_ESTIMADOS);
                                            costo.COSTOS_PLANIFICADOS = that._formatFloat(costo.COSTOS_PLANIFICADOS);
                                            costo.COSTOS_REALES = that._formatFloat(costo.COSTOS_REALES);
            
            
                                            costos[0].COSTOS_ESTIMADOS += costo.COSTOS_ESTIMADOS;
                                            costos[0].COSTOS_PLANIFICADOS += costo.COSTOS_PLANIFICADOS;
                                            costos[0].COSTOS_REALES += costo.COSTOS_REALES;
            
                                            costos[0].MONEDA = costo.MONEDA;
            
                                            costos.push(costo);
                                        } else if (costosOrig.DEBIT_TYPE === '2') {
                                            let ingreso = {
                                                INGRESOS: costosOrig.VALUE_CATEGORY,
                                                INGRESOS_ESTIMADOS: (costosOrig.MONTO_CLP_EST.trim() === '0' ? costosOrig.MONTO_CLP_EST.replace('-', '') : '-' + costosOrig.MONTO_CLP_EST.replace('-', '').trim()),
                                                INGRESOS_PLANIFICADOS: (costosOrig.MONTO_CLP_PLAN.trim() === '0' ? costosOrig.MONTO_CLP_PLAN.replace('-', '') : '-' + costosOrig.MONTO_CLP_PLAN.replace('-', '').trim()),
                                                INGRESOS_REALES: (costosOrig.MONTO_CLP_ACT.trim() === '0' ? costosOrig.MONTO_CLP_ACT.replace('-', '') : '-' + costosOrig.MONTO_CLP_ACT.replace('-', '').trim()),
                                                MONEDA: costosOrig.CURRENCY
                                            };
            
                                            ingreso.INGRESOS_ESTIMADOS = that._formatFloat(ingreso.INGRESOS_ESTIMADOS);
                                            ingreso.INGRESOS_PLANIFICADOS = that._formatFloat(ingreso.INGRESOS_PLANIFICADOS);
                                            ingreso.INGRESOS_REALES = that._formatFloat(ingreso.INGRESOS_REALES);
            
                                            ingresos[0].INGRESOS_ESTIMADOS += ingreso.INGRESOS_ESTIMADOS;
                                            ingresos[0].INGRESOS_PLANIFICADOS += ingreso.INGRESOS_PLANIFICADOS;
                                            ingresos[0].INGRESOS_REALES += ingreso.INGRESOS_REALES;
                                            ingresos[0].MONEDA = ingreso.MONEDA;
                                            ingresos.push(ingreso);
                                        }
                                    }
            
                                    that.set('/Costes/Costos', costos);
                                    that.set('/Costes/Ingresos', ingresos);
            
                                    let visibles = that.get('/Visibles/Operaciones');
                                    visibles.AsignarNecesidades = false;
                                    visibles.ManoObra = false;
                                    visibles.Componente = false;
                                    visibles.Desnotificar = false;
                                    visibles.EditarOperacion = false;
                                    visibles.Notificar = false;
                                    visibles.ServicioExterno = false;
            
                                    if (result.E_HEADER.SYS_STATUS.indexOf('ABIE') > -1 || result.E_HEADER.SYS_STATUS.indexOf('LIB.') > -1) {
                                        visibles.AsignarNecesidades = true;
                                        visibles.ManoObra = true;
                                        visibles.Componente = true;
                                        visibles.EditarOperacion = true;
                                        visibles.ServicioExterno = true;
                                    }
                                    that.set('/Visibles/Operaciones', visibles);
                                    that.set('/Visibles/Contenido', true);
            
                                    that._cargarOpciones2(success);
                                }
                            },
            
            
                        });
            
                        */
        },

        _cargarOpciones2: function (success) {
            let that = this;
            var d1 = $.Deferred();
            var d2 = $.Deferred();
            var d3 = $.Deferred();
            var d4 = $.Deferred();
            var d5 = $.Deferred();
            sap.ui.getCore().getMessageManager().removeAllMessages();

            /**Grupos**/
            let opciones = [{
                SHLPNAME: "H_T024I",
                SHLPFIELD: "IWERK",
                SIGN: "I",
                OPTION: "CP",
                LOW: that.get('/Cabecera/Responsable/i_Plan'),
                HIGH: "",
            }];
            let campoCodigo = 'INGRP';
            let campoDescripcion = 'INNAM';

            let result = [];

            result.push({
                cod: "RA0",
                desc: "GP RAC Rancagua",
            });

            that.set('/Opciones/Cabecera/Responsable/Grupos', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result, true));
            d1.resolve();

            /*
                        this._ejecutarF4IF('H_T024I', opciones, campoCodigo, campoDescripcion, '', function (result) {
                            if (result.length === 0) {
                                that.addMessage('Cabecera.Responsable.Grupos', 'E');
                            }
                            that.set('/Opciones/Cabecera/Responsable/Grupos', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result, true));
                            d1.resolve();
                        });
            
                        */

            /**PuestosTrabajo**/
            d2 = that._cargarOpcionPuestoTrabajo();

            /**ClasesActividad**/
            opciones = [
                {
                    SHLPNAME: "H_T350I",
                    SHLPFIELD: "AUART",
                    SIGN: "I",
                    OPTION: "CP",
                    LOW: that.get('/Detalle/TipoOrden'),
                    HIGH: "",
                },
                {
                    SHLPNAME: "H_T350I",
                    SHLPFIELD: "SPRAS",
                    SIGN: "I",
                    OPTION: "CP",
                    LOW: "S",
                    HIGH: "",
                }
            ];
            campoCodigo = 'ILART';
            campoDescripcion = 'ILATX';

            let result1 = [];

            result1.push({
                cod: "018",
                desc: "Servicio Interno",
            });

            result1.push({
                cod: "019",
                desc: "Servicio Externo"
            });

            that.set('/Opciones/Cabecera/ClasesActividadPM', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result1, true));
            d3.resolve();
            /*
            
                        this._ejecutarF4IF('H_T350I', opciones, campoCodigo, campoDescripcion, '', function (result) {
                            if (result.length === 0) {
                                that.addMessage('Cabecera.ClasesActividadPM', 'E');
                            }
                            that.set('/Opciones/Cabecera/ClasesActividadPM', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result, true));
                            d3.resolve();
                        });
            
                        /*
            
                        /**Plan**/
            /**PlanPuestoTrabajo**/
            opciones = [];
            campoCodigo = 'WERKS';
            campoDescripcion = 'NAME1';


            let result2 = [];

            result2.push({
                cod: "2FD0",
                desc: "Centro Rac San Fernando",
            });

            result2.push({
                cod: "2IQ0",
                desc: "Centro Rac Alto Hospicio",
            });

            result2.push({
                cod: "2RA1",
                desc: "Centro Rac C.Colorado"
            });

            that.set('/Opciones/Cabecera/Responsable/Planes', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result2, true));
            that.set('/Opciones/Cabecera/Responsable/PlanesPuestoTrabajo', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result2, true));
            d4.resolve();
            /*
                        this._ejecutarF4IF('H_T001W', opciones, campoCodigo, campoDescripcion, '', function (result) {
                            if (result.length === 0) {
                                that.addMessage('Cabecera.Responsable.Planes', 'E');
                                that.addMessage('Cabecera.Responsable.PlanesPuestoTrabajo', 'E');
                            }
                            that.set('/Opciones/Cabecera/Responsable/Planes', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result, true));
                            that.set('/Opciones/Cabecera/Responsable/PlanesPuestoTrabajo', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result, true));
                            d4.resolve();
                        });
            
                        */


            /**CentroBeneficio**/
            /**CeCoResponsable**/
            opciones = [];
            campoCodigo = 'PRCTR';
            campoDescripcion = 'MCTXT';

            let result3 = [];

            result3.push({
                cod: "1000AN10",
                desc: "CORP. NISSAN"
            });

            result3.push({
                cod: "1000AS10",
                desc: "CORP. CHERY SK"
            });

            result3.push({
                cod: "1000AS11",
                desc: "CORP. FIAT SK"
            });

            that.set('/Opciones/Cabecera/Organizacion/CentrosBeneficio', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result3, true));
            that.set('/Opciones/Cabecera/Organizacion/CeCoResponsables', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result3, true));

            var cabecera = that.get('/Cabecera');

            var ceco = that.get('/Opciones/Cabecera/Organizacion/CeCoResponsables').find(function (c) {
                return c.KEY === cabecera.Organizacion.CeCoResponsable;
            });

            if (cabecera.Organizacion.CeCoResponsable && ceco) {
                cabecera.Organizacion.TxtCeCoResponsable = ceco.TEXT;
            } else {
                cabecera.Organizacion.TxtCeCoResponsable = '';
            }

            var centro = that.get('/Opciones/Cabecera/Organizacion/CentrosBeneficio').find(function (c) {
                return c.KEY === cabecera.Organizacion.CentroBeneficio;
            });

            if (cabecera.Organizacion.CentroBeneficio && centro) {
                cabecera.Organizacion.TxtCentroBeneficio = centro.TEXT;
            } else {
                cabecera.Organizacion.TxtCentroBeneficio = '';
            }

            d5.resolve();

            /*

            this._ejecutarF4IF('PRCTN', opciones, campoCodigo, campoDescripcion, '', function (result) {
                if (result.length === 0) {
                    that.addMessage('Cabecera.Organizacion.CentrosBeneficio', 'E');
                    that.addMessage('Cabecera.Organizacion.CeCoResponsable', 'E');
                }
                that.set('/Opciones/Cabecera/Organizacion/CentrosBeneficio', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result, true));
                that.set('/Opciones/Cabecera/Organizacion/CeCoResponsables', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result, true));

                var cabecera = that.get('/Cabecera');

                var ceco = that.get('/Opciones/Cabecera/Organizacion/CeCoResponsables').find(function (c) {
                    return c.KEY === cabecera.Organizacion.CeCoResponsable;
                });

                if (cabecera.Organizacion.CeCoResponsable && ceco) {
                    cabecera.Organizacion.TxtCeCoResponsable = ceco.TEXT;
                } else {
                    cabecera.Organizacion.TxtCeCoResponsable = '';
                }

                var centro = that.get('/Opciones/Cabecera/Organizacion/CentrosBeneficio').find(function (c) {
                    return c.KEY === cabecera.Organizacion.CentroBeneficio;
                });

                if (cabecera.Organizacion.CentroBeneficio && centro) {
                    cabecera.Organizacion.TxtCentroBeneficio = centro.TEXT;
                } else {
                    cabecera.Organizacion.TxtCentroBeneficio = '';
                }

                d5.resolve();
            });

            */

            $.when(d1, d2, d3, d4, d5).done(function () {
                if (typeof success === 'function') {
                    success();
                }
            });
        },

        _cargarOpcionPuestoTrabajo: function () {
            var that = this;
            var d2 = $.Deferred();
            /**PuestosTrabajo**/
            var opciones = [
                {
                    SHLPNAME: "CRAMN",
                    SHLPFIELD: "WERKS",
                    SIGN: "I",
                    OPTION: "CP",
                    LOW: that.get('/Cabecera/Responsable/i_PlanPuestoTrabajo'),
                    HIGH: "",
                },
                {
                    SHLPNAME: "CRAMN",
                    SHLPFIELD: "SPRAS",
                    SIGN: "I",
                    OPTION: "CP",
                    LOW: "S",
                    HIGH: "",
                }
            ];
            var campoCodigo = 'ARBPL';
            var campoDescripcion = 'KTEXT';

            var result = [];

            result.push({
                cod: "ADMRAC",
                desc: "Administrativo Rent a Car",
            });

            result.push({
                cod: "SUPRAC",
                desc: "Supervisor Rent a Car",
            });


            that.set('/Opciones/Cabecera/Responsable/PuestosTrabajo', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result, true));

            d2.resolve();

            /*
                        this._ejecutarF4IF('CRAMN', opciones, campoCodigo, campoDescripcion, '', function (result) {
                            if (result.length === 0) {
                                that.addMessage('Cabecera.Responsable.PuestosTrabajo', 'E');
                            }
                            that.set('/Opciones/Cabecera/Responsable/PuestosTrabajo', utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result, true));
                            d2.resolve();
                        });
            
                        */

            return d2;
        },

        _rolBehaviour: function (rol, success) {
            let that = this;
            let statusSistema = this.get('/Detalle/StatusSistema');
            let ultimoStatus = this.get('/Detalle/UltimoStatus');

            let visibles = this.get('/Visibles');
            visibles.Cabecera.Editar = false;
            visibles.Cabecera.IrAviso = true;

            visibles.Operaciones.AsignarNecesidades = false;
            visibles.Operaciones.ManoObra = false;
            visibles.Operaciones.Componente = false;
            visibles.Operaciones.Desnotificar = false;
            visibles.Operaciones.EditarOperacion = false;
            visibles.Operaciones.Notificar = false;
            visibles.Operaciones.ServicioExterno = false;

            visibles.Interlocutores.Editar = false;
            visibles.Interlocutores.Agregar = false;
            visibles.Interlocutores.Modificar = false;
            visibles.Interlocutores.Eliminar = false;

            visibles.Modificar.Tratar = false;
            visibles.Modificar.Recargar = false;

            visibles.Oferta = {};
            visibles.Oferta.Crear = false;
            visibles.Oferta.Editar = false;
            visibles.Oferta.Aceptar = false;
            visibles.Oferta.Borrar = false;
            visibles.Oferta.Imprimir = false;

            visibles.Pedidos = {};
            visibles.Pedidos.Nuevo = false;
            visibles.Pedidos.Editar = false;
            visibles.Pedidos.Eliminar = false;
            visibles.Pedidos.Imprimir = false;
            visibles.Pedidos.Enviar = false;
            visibles.Pedidos.Facturar = false;

            that.set('/Visibles', visibles);

            let validaCentro = true;
            if (this.roles.TIPO_ANALISTA_GTIA.indexOf(rol) >= 0 || this.roles.TIPO_EJECUTIVO_CENTRAL.indexOf(rol) >= 0 || this.roles.TIPO_OPERACIONES.indexOf(rol) >= 0) {
                validaCentro = false;
            }


            let E_RETORNO = {

                FIELD: "",
                ID: "",
                LOG_MSG_NO: "000000",
                LOG_NO: "",
                MESSAGE: "",
                MESSAGE_V1: "",
                MESSAGE_V2: "",
                MESSAGE_V3: "",
                MESSAGE_V4: "",
                NUMBER: "000",
                PARAMETER: "",
                ROW: 0,
                SYSTEM: "",
                TYPE: "",
            };

            let E_USUARIO = {

                ANEXO_OFICINA: "",
                APELLIDO: "Desarrollo",
                CLAVE: "inicio.01",
                DIRECCION: "",
                EMAIL: "SCO@sco.cl",
                FECHA_ALTA: "2022-03-30",
                FECHA_MODIFICA: "2022-03-30",
                FECHA_VALID: "2022-03-30",
                FECHA_VALID_FIN: "2023-03-30",
                FOTO: "",
                HORA_MODIFICA: "102536",
                IDIOMA: "ES",
                ID_STATUS_USER: "01",
                ID_USUARIO: "EXT_VIDES",
                MAIL_PERSONAL: "",
                MOVIL: "",
                NOMBRE: "SCO",
                NRO_DOCUMENTO: "15584924-K",
                PAIS: "CL",
                PERSONAL_NUMBER: "15584924",
                TELEFONO: "",
                TELEFONO_OFICINA: "",
                TRATAMIENTO: "0002",
                USER_MODIFICA: "EXT_VIDES",
            };

            let T_DATEMPR = [];


            T_DATEMPR.push({
                DEFECTO: "X",
                ESTADO: "A",
                ID_DATO_EMPRESA: "128316",
                ID_TIPO: "IMPRE",
                ID_USUARIO: "EXT_VIDES",
                VALOR: "SAP_TI",
            });

            T_DATEMPR.push({
                DEFECTO: "",
                ESTADO: "A",
                ID_DATO_EMPRESA: "100981",
                ID_TIPO: "WERKS",
                ID_USUARIO: "EXT_VIDES",
                VALOR: "2RA1"
            });

            T_DATEMPR.push({
                DEFECTO: "",
                ESTADO: "A",
                ID_DATO_EMPRESA: "116177",
                ID_TIPO: "WERKS",
                ID_USUARIO: "EXT_VIDES",
                VALOR: "2SA3"
            });

            let T_GRUPOS = [];

            T_GRUPOS.push({
                DESCRIPCION: "Grupo de usuarios para visualizar la aplicaciones",
                ESTADO: "A",
                ID_GRUPO: "GRP_AGEN_GRAFICOS",
                NOMBRE_GRUPO: "Grupo de usuarios para visualizar la aplicaciones"
            });

            T_GRUPOS.push({
                DESCRIPCION: "Administrador de Sistema",
                ESTADO: "A",
                ID_GRUPO: "GRP_ADMSYS",
                NOMBRE_GRUPO: "Administrador de Sistema"
            });

            T_GRUPOS.push({
                DESCRIPCION: "Grupo de usu para la aplic agendamiento R",
                ESTADO: "A",
                ID_GRUPO: "GRP_AGEN_AGENDAR",
                NOMBRE_GRUPO: "Grupo de usu para la aplic agendamiento R",
            });

            let T_ROLES = [];

            T_ROLES.push({
                DESCRIPCION: "Agrupador",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_MON_SP_1000",
                NOMBRE_ROL: "Agrupador"
            });

            T_ROLES.push({
                DESCRIPCION: "Seguimiento de OT",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_MON_SP_1020",
                NOMBRE_ROL: "Seguimiento de OT"
            });

            T_ROLES.push({
                DESCRIPCION: "Ssistemas de apoyo",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_QRFS_0010",
                NOMBRE_ROL: "Sistemas de apoyo"
            });

            T_ROLES.push({
                DESCRIPCION: "Adm. Sistema",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_ADMSYS",
                NOMBRE_ROL: "Adm. Sistema"
            });

            T_ROLES.push({
                DESCRIPCION: "Rol para depto. soporte producto",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_CM_0010",
                NOMBRE_ROL: "Soporte Producto"
            });

            T_ROLES.push({
                DESCRIPCION: "Credito y Cobranzas",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_CRECOB",
                NOMBRE_ROL: "Credito y Cobranzas"
            });

            T_ROLES.push({
                DESCRIPCION: "Asesor Comercial",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_MON_SP_0210",
                NOMBRE_ROL: "Asesor Comercial"
            });

            T_ROLES.push({
                DESCRIPCION: "Analista Garantías",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_MON_SP_0250",
                NOMBRE_ROL: "Analista Garantías"
            });

            T_ROLES.push({
                DESCRIPCION: "Gestión Solicitudes",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_MON_SP_0310",
                NOMBRE_ROL: "Gestión Solicitudes"
            });

            T_ROLES.push({
                DESCRIPCION: "Full",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_RAC003",
                NOMBRE_ROL: "RAC"
            });

            T_ROLES.push({
                DESCRIPCION: "Admin Contrato",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_RAC004",
                NOMBRE_ROL: "RAC"
            });

            T_ROLES.push({
                DESCRIPCION: "Admin Contratos + Desbloqueo",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_RAC005",
                NOMBRE_ROL: "RAC"
            });

            T_ROLES.push({
                DESCRIPCION: "Agendamiento",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_RAC_AGEN_001",
                NOMBRE_ROL: "Agendamiento"
            });

            T_ROLES.push({
                DESCRIPCION: "Ventas Repuestos",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_REP_0010",
                NOMBRE_ROL: "Ventas Repuestos"
            });

            T_ROLES.push({
                DESCRIPCION: "Analista Repuesto",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_REP_0020",
                NOMBRE_ROL: "Analista Repuesto"
            });

            T_ROLES.push({
                DESCRIPCION: "Reposición de repuestos",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_REP_0030",
                NOMBRE_ROL: "Reposición Repto."
            });

            T_ROLES.push({
                DESCRIPCION: "Fidelización",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_REP_0050",
                NOMBRE_ROL: "Fidelización"
            });

            T_ROLES.push({
                DESCRIPCION: "Servicio Liviano",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_SERLIV",
                NOMBRE_ROL: "Servicio Liviano"
            });

            T_ROLES.push({
                DESCRIPCION: "Servicio Pesado",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_SERPES",
                NOMBRE_ROL: "Servicio Pesado"
            });

            T_ROLES.push({

                DESCRIPCION: "Vta. Vehiculos Nuevos",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_VTAAUN",
                NOMBRE_ROL: "Vta. Vehiculos Nuevos"
            });

            T_ROLES.push({
                DESCRIPCION: "Adm. Vehículos Toyota",
                ESTADO: "A",
                ID_FUSION_ROL: "",
                ID_ROL: "ROL_VTA_TEMU",
                NOMBRE_ROL: "Adm. Vehículos Toyota"
            });




            let user = {

                E_RETORNO: E_RETORNO,
                E_USUARIO: E_USUARIO,
                T_DATEMPR: T_DATEMPR,
                T_GRUPOS: T_GRUPOS,
                T_ROLES: T_ROLES
            };

            let result4 = [];

            result4.push({
                CODIGO: "001",
                DESCRIPCION: "EDITAR",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "002",
                DESCRIPCION: "IR AVISO",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "003",
                DESCRIPCION: "EDITAR",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "004",
                DESCRIPCION: "MANO DE OBRA",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });


            result4.push({
                CODIGO: "005",
                DESCRIPCION: "SERVICIO EXTERNO",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "006",
                DESCRIPCION: "ASIG. NECESIDADES",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "007",
                DESCRIPCION: "NOTIFICACION",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "009",
                DESCRIPCION: "CARGAR COMPONENTES",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "010",
                DESCRIPCION: "EDITAR",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "014",
                DESCRIPCION: "CREAR",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "015",
                DESCRIPCION: "EDITAR",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "016",
                DESCRIPCION: "ACEPTAR",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "017",
                DESCRIPCION: "BORRAR",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "018",
                DESCRIPCION: "IMPRIMIR",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "019",
                DESCRIPCION: "NUEVO",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({

                CODIGO: "020",
                DESCRIPCION: "EDITAR",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });


            result4.push({

                CODIGO: "021",
                DESCRIPCION: "ELIMINAR",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({

                CODIGO: "022",
                DESCRIPCION: "IMPRIMIR",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "023",
                DESCRIPCION: "EDITAR",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "024",
                DESCRIPCION: "RECARGAR MEDIDAS",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            result4.push({
                CODIGO: "025",
                DESCRIPCION: "FACTURAR",
                MANDT: "300",
                ROL: "ROL_MON_SP_0210",
            });

            let existe = true;

            if (validaCentro) {
                let centroOT = that.get('/Cabecera/Responsable/i_PlanPuestoTrabajo');
                existe = user.T_DATEMPR.filter(function (d) {
                    return d.ID_TIPO === 'WERKS' && d.VALOR === centroOT;
                }).length > 0;
                //
                // if (!existe) {
                //     return;
                // }

                if (rol) {


                    result4.forEach(function (origen) {
                        if (existe) {
                            switch (origen.CODIGO) {
                                case '001':
                                    that.set('/Visibles/Cabecera/Editar', true);
                                    break;
                                case '002':
                                    that.set('/Visibles/Cabecera/IrAviso', true);
                                    break;
                                case '003':
                                    that.set('/Visibles/Operaciones/EditarOperacion', true);
                                    break;
                                case '004':
                                    that.set('/Visibles/Operaciones/ManoObra', true);
                                    break;
                                case '005':
                                    that.set('/Visibles/Operaciones/ServicioExterno', true);
                                    break;
                                case '006':
                                    that.set('/Visibles/Operaciones/AsignarNecesidades', true);
                                    break;
                                case '007':
                                    that.set('/Visibles/Operaciones/Notificar', true);
                                    break;
                                case '008':
                                    that.set('/Visibles/Operaciones/Desnotificar', true);
                                    break;
                                case '009':
                                    that.set('/Visibles/Operaciones/Componente', true);
                                    break;
                                case '010':
                                    that.set('/Visibles/Interlocutores/Editar', true);
                                    break;
                                case '023':
                                    that.set('/Visibles/Modificar/Tratar', true);
                                    break;
                                case '024':
                                    that.set('/Visibles/Modificar/Recargar', true);
                                    break;
                            }
                        }
                        switch (origen.CODIGO) {
                            case '014':
                                that.set('/Visibles/Oferta/Crear', true);
                                break;
                            case '015':
                                that.set('/Visibles/Oferta/Editar', true);
                                break;
                            // case '016':
                            //     that.set('/Visibles/Oferta/Aceptar', true);
                            //     break;
                            // case '017':
                            //     that.set('/Visibles/Oferta/Borrar', true);
                            //     break;
                            case '018':
                                that.set('/Visibles/Oferta/Imprimir', true);
                                break;
                            case '019':
                                that.set('/Visibles/Pedidos/Nuevo', true);
                                break;
                            case '020':
                                that.set('/Visibles/Pedidos/Editar', true);
                                break;
                            case '021':
                                that.set('/Visibles/Pedidos/Eliminar', true);
                                break;
                            case '022':
                                that.set('/Visibles/Pedidos/Imprimir', true);
                                break;

                            // case '025':
                            //     that.set('/Visibles/Pedidos/Facturar', true);
                            //     break;
                        }

                        that.set('/Visibles/Oferta/Aceptar', true);
                    });

                    if (ultimoStatus.indexOf("LPEN") != -1) {
                        that.set('/Visibles/Pedidos/Facturar', true);
                    } else if (ultimoStatus.indexOf("FENP") != -1) {
                        that.set('/Visibles/Pedidos/Facturar', true);
                    } else if (ultimoStatus.indexOf("FPAR") != -1) {
                        that.set('/Visibles/Pedidos/Facturar', true);
                    } else if (ultimoStatus.indexOf("FACT") != -1) {
                        that.set('/Visibles/Pedidos/Facturar', true);
                    } else {
                        that.set('/Visibles/Pedidos/Facturar', false);
                    }


                    if (typeof success === 'function') {
                        success();
                    }

                    //                    if (typeof success === 'function') {
                    //                        success();
                    //                    }
                }

                if (rol === 'ROL_MON_SP_0210') {

                    let enviar = false;
                    //Estatus del sistema ABIERTO
                    if (ultimoStatus.indexOf("ABIE") != -1) {
                        //Estatus del Etapa En Presupuesto.
                        if (ultimoStatus.indexOf("EDIA") != -1) {

                            //Estatus del Sub-Etapa Reenviar Presupuesto a cliente.
                            if (ultimoStatus.indexOf("RPTC") != -1) {
                                that.set('/Visibles/Pedidos/Enviar', true);
                            }

                            //Estatus del Sub-Etapa Presupuesto Aceptado por Jefe de Servicio.
                            if (ultimoStatus.indexOf("PAJS") != -1) {
                                that.set('/Visibles/Pedidos/Enviar', true);
                            }
                        }

                        //Estatus del Etapa Presupuesto enviado a cliente.
                        if (ultimoStatus.indexOf("ENCL") != -1) {
                            that.set('/Visibles/Pedidos/Enviar', true);
                        }

                    }

                    //Estatus del sistema Liberada.
                    if (ultimoStatus.indexOf("LIB") != -1) {
                        that.set('/Visibles/Pedidos/Enviar', true);
                    }

                    //Estatus del sistema Cierre T�cnico.
                    if (ultimoStatus.indexOf("CTEC") != -1) {
                        that.set('/Visibles/Pedidos/Enviar', true);
                    }
                }


            }
            /*
                        utils.getUserData(function (user) {
                            let existe = true;
                            if (validaCentro) {
                                let centroOT = that.get('/Cabecera/Responsable/i_PlanPuestoTrabajo');
                                existe = user.T_DATEMPR.filter(function (d) {
                                    return d.ID_TIPO === 'WERKS' && d.VALOR === centroOT;
                                }).length > 0;
                                //
                                // if (!existe) {
                                //     return;
                                // }
                            }
            
                            if (rol) {
                                utils.httpCall({
                                    service: 'Z353R_WORKFLOW_ROL',
                                    query: {
                                        I_ROL: rol
                                    },
                                    type: 'POST',
                                    success: function (result) {
                                        result.T_WORKFLOW_ROL.forEach(function (origen) {
                                            if (existe) {
                                                switch (origen.CODIGO) {
                                                    case '001':
                                                        that.set('/Visibles/Cabecera/Editar', true);
                                                        break;
                                                    case '002':
                                                        that.set('/Visibles/Cabecera/IrAviso', true);
                                                        break;
                                                    case '003':
                                                        that.set('/Visibles/Operaciones/EditarOperacion', true);
                                                        break;
                                                    case '004':
                                                        that.set('/Visibles/Operaciones/ManoObra', true);
                                                        break;
                                                    case '005':
                                                        that.set('/Visibles/Operaciones/ServicioExterno', true);
                                                        break;
                                                    case '006':
                                                        that.set('/Visibles/Operaciones/AsignarNecesidades', true);
                                                        break;
                                                    case '007':
                                                        that.set('/Visibles/Operaciones/Notificar', true);
                                                        break;
                                                    case '008':
                                                        that.set('/Visibles/Operaciones/Desnotificar', true);
                                                        break;
                                                    case '009':
                                                        that.set('/Visibles/Operaciones/Componente', true);
                                                        break;
                                                    case '010':
                                                        that.set('/Visibles/Interlocutores/Editar', true);
                                                        break;
                                                    case '023':
                                                        that.set('/Visibles/Modificar/Tratar', true);
                                                        break;
                                                    case '024':
                                                        that.set('/Visibles/Modificar/Recargar', true);
                                                        break;
                                                }
                                            }
                                            switch (origen.CODIGO) {
                                                case '014':
                                                    that.set('/Visibles/Oferta/Crear', true);
                                                    break;
                                                case '015':
                                                    that.set('/Visibles/Oferta/Editar', true);
                                                    break;
                                                // case '016':
                                                //     that.set('/Visibles/Oferta/Aceptar', true);
                                                //     break;
                                                // case '017':
                                                //     that.set('/Visibles/Oferta/Borrar', true);
                                                //     break;
                                                case '018':
                                                    that.set('/Visibles/Oferta/Imprimir', true);
                                                    break;
                                                case '019':
                                                    that.set('/Visibles/Pedidos/Nuevo', true);
                                                    break;
                                                case '020':
                                                    that.set('/Visibles/Pedidos/Editar', true);
                                                    break;
                                                case '021':
                                                    that.set('/Visibles/Pedidos/Eliminar', true);
                                                    break;
                                                case '022':
                                                    that.set('/Visibles/Pedidos/Imprimir', true);
                                                    break;
            
                                                // case '025':
                                                //     that.set('/Visibles/Pedidos/Facturar', true);
                                                //     break;
                                            }
            
                                            that.set('/Visibles/Oferta/Aceptar', true);
                                        });
            
                                        if (ultimoStatus.indexOf("LPEN") != -1) {
                                            that.set('/Visibles/Pedidos/Facturar', true);
                                        } else if (ultimoStatus.indexOf("FENP") != -1) {
                                            that.set('/Visibles/Pedidos/Facturar', true);
                                        } else if (ultimoStatus.indexOf("FPAR") != -1) {
                                            that.set('/Visibles/Pedidos/Facturar', true);
                                        } else if (ultimoStatus.indexOf("FACT") != -1) {
                                            that.set('/Visibles/Pedidos/Facturar', true);
                                        } else {
                                            that.set('/Visibles/Pedidos/Facturar', false);
                                        }
            
                                        if (typeof success === 'function') {
                                            success();
                                        }
                                    }
                                });
            
                                if (rol === 'ROL_MON_SP_0210') {
                                    let enviar = false;
                                    //Estatus del sistema ABIERTO
                                    if (ultimoStatus.indexOf("ABIE") != -1) {
                                        //Estatus del Etapa En Presupuesto.
                                        if (ultimoStatus.indexOf("EDIA") != -1) {
            
                                            //Estatus del Sub-Etapa Reenviar Presupuesto a cliente.
                                            if (ultimoStatus.indexOf("RPTC") != -1) {
                                                that.set('/Visibles/Pedidos/Enviar', true);
                                            }
            
                                            //Estatus del Sub-Etapa Presupuesto Aceptado por Jefe de Servicio.
                                            if (ultimoStatus.indexOf("PAJS") != -1) {
                                                that.set('/Visibles/Pedidos/Enviar', true);
                                            }
                                        }
            
                                        //Estatus del Etapa Presupuesto enviado a cliente.
                                        if (ultimoStatus.indexOf("ENCL") != -1) {
                                            that.set('/Visibles/Pedidos/Enviar', true);
                                        }
            
                                    }
            
                                    //Estatus del sistema Liberada.
                                    if (ultimoStatus.indexOf("LIB") != -1) {
                                        that.set('/Visibles/Pedidos/Enviar', true);
                                    }
            
                                    //Estatus del sistema Cierre T�cnico.
                                    if (ultimoStatus.indexOf("CTEC") != -1) {
                                        that.set('/Visibles/Pedidos/Enviar', true);
                                    }
                                }
                            }
            
                            
                        });
                        */

        },

        handleOperacionesEditar: function () {
            let that = this;
            let orden = that.get('/Detalle/Orden');
            that.set('/Operaciones/OperacionesEditar', []);
            that.set('/Operaciones/OperacionesDelete', []);
            that.set('/ModoEdicion', true);
            //       that._bloquearDocumento('ORDEN', orden, function () {
            that._cargarTablaEditar('EDITAR');
            //      });
        },

        _cargarTablaEditar: function (seccion) {
            let that = this;
            let orden = that.get('/Detalle/Orden');


            let E_HEADER = {
                ABCINDIC: "",
                ACTUAL_FINISH_DATE: "0000-00-00",
                ACTUAL_FINISH_TIME: "00:00:00",
                ACTUAL_START_DATE: "0000-00-00",
                ACTUAL_START_TIME: "00:00:00",
                ASSEMBLY: "",
                ASSEMBLY_EXTERNAL: "",
                ASSEMBLY_GUID: "",
                ASSEMBLY_LONG: "",
                ASSEMBLY_VERSION: "",
                ASSET_NO: "000000047184",
                AUTOSCHED: "X",
                BASICSTART: "00:00:00",
                BASIC_FIN: "24:00:00",
                BUS_AREA: "RA",
                CALC_MOTIVE: "",
                CALID: "",
                CALL_NO: 0,
                CAP_REQMTS: "X",
                CHANGED_BY: "MUNDONET",
                CHANGE_DATE: "2021-08-17",
                COMP_CODE: "2000",
                COSTCENTER: "20RAAR10",
                CO_AREA: "1000",
                CSTGVAPPLN: "ZPM1",
                CSTGVARACT: "ZPM1",
                CSTG_SHEET: "PP-PC1",
                CURRENCY: "CLP",
                CURRENCY_ISO: "CLP",
                DEVICEDATA: "",
                DISTR_CHAN: "VS",
                DIVISION: "E0",
                END_POINT: "",
                ENTERED_BY: "MUNDONET",
                ENTER_DATE: "2021-08-11",
                ENVIR_INVEST: "",
                EQUIPMENT: "3N6BD31A6LK802214R",
                ESTIMATED_COSTS: 0,
                FINISH_DATE: "2021-08-11",
                FIRST_OFFSET_TYPE_CODE: "",
                FIRST_OFFSET_TYPE_CODE_NAME: "",
                FIRST_OFFSET_UNIT: "",
                FIRST_OFFSET_UNIT_ISO: "",
                FIRST_OFFSET_VALUE: "",
                FUNCT_LOC: "",
                FUNC_AREA: "",
                GROUP_COUNTER: "",
                INVEST_PROFILE: "",
                INV_REASON: "",
                KALSN: "00",
                LAST_ORD: "",
                LEADING_ORDERID: "",
                LINEAR_LENGTH: "",
                LINEAR_UNIT: "",
                LINEAR_UNIT_ISO: "",
                LOCATION: "",
                LOC_BUS_AREA: "RA",
                LOC_COMP_CODE: "2000",
                LOC_CO_AREA: "1000",
                LOC_WBS_ELEM: "00000000",
                LOC_WKCTR_ID: "00000000",
                LOC_WK_CTR: "",
                LONG_TEXT: "",
                MAINTITEM: "",
                MAINTPLANT: "2BU0",
                MAINTROOM: "",
                MARKER_DISTANCE_END_POINT: "",
                MARKER_DISTANCE_START_POINT: "",
                MARKER_DISTANCE_UNIT: "",
                MARKER_DISTANCE_UNIT_ISO: "",
                MARKER_END_POINT: "",
                MARKER_START_POINT: "",
                MATERIAL: "000000000000840695",
                MATERIAL_EXTERNAL: "0000000000000000000000000000000000840695",
                MATERIAL_GUID: "95F18056D3E3CD17E10000000A52D51F",
                MATERIAL_LONG: "",
                MATERIAL_VERSION: "",
                MNTPLAN: "",
                MN_WKCTR_ID: "10000982",
                MN_WK_CTR: "ADMRAC",
                MRP_RELEVANT: "3",
                NETWORK_PROFILE: "0000001",
                NOTIF_NO: "000067645462",
                OBJECTCLASS: "PA",
                OBJECT_NO: "OR000067623011",
                ORDERID: "000067623011",
                ORDER_TYPE: "ZRMC",
                ORDPLANID: "",
                OVERHEAD_KEY: "",
                PLANGROUP: "",
                PLANPLANT: "2RA1",
                PLANT: "2RA1",
                PLSECTN: "100",
                PMACTTYPE: "019",
                PRIORITY: "",
                PRIOTYPE: "PM",
                PROCESSING_GROUP: "00",
                PRODUCTION_FINISH_DATE: "2021-08-11",
                PRODUCTION_FINISH_TIME: "24:00:00",
                PRODUCTION_START_DATE: "2021-08-11",
                PRODUCTION_START_TIME: "24:00:00",
                PROFIT_CTR: "20RAAR10",
                PROJ_DEF: "00000000",
                REFDATE: "2021-08-17",
                RESERV_NO: "0002620517",
                RESPCCTR: "20RAAR10",
                RESP_PLANNER_GROUP: "",
                RES_ANAL_KEY: "000001",
                REVISION: "",
                ROUTING_NO: "1002493820",
                SALESORG: "2000",
                SALES_ORD: "",
                SCALE: "",
                SCENARIO: "O150",
                SCHEDULING_EXACT_BREAK_TIMES: "",
                SCHED_TYPE: "2",
                SECOND_OFFSET_TYPE_CODE: "",
                SECOND_OFFSET_TYPE_CODE_NAME: "",
                SECOND_OFFSET_UNIT: "",
                SECOND_OFFSET_UNIT_ISO: "",
                SECOND_OFFSET_VALUE: "",
                SERIALNO: "3N6BD31A6LK802214R",
                SETTLORDER: "",
                SHORT_TEXT: "MONTAJE NEUMATICOS",
                SORTFIELD: "BLANCO",
                STANDORDER: "",
                START_DATE: "2021-08-11",
                START_POINT: "",
                STAT_PROF: "CHK_RAC1",
                SUB_NUMBER: "0000",
                SUPERIOR_ACTIVITY: "",
                SUPERIOR_COUNTER: "00000000",
                SUPERIOR_NETWORK: "",
                SUPERIOR_ORDERID: "",
                SUPERIOR_ROUTING_NO: "0000000000",
                SYSTCOND: "",
                SYS_STATUS: "CTEC FENA KKMP NLIQ PREC",
                S_ORD_ITEM: "000000",
                TASK_LIST_GROUP: "",
                TASK_LIST_TYPE: "E",
                TAXJURCODE: "",
                USERSTATUS: "",
                USER_ST: "",
                VERSION: "00",
                WBS_ELEM: "00000000",

            };

            let E_RETURN = {

                CODE: "",
                LOG_MSG_NO: "000000",
                LOG_NO: "",
                MESSAGE: "",
                MESSAGE_V1: "",
                MESSAGE_V2: "",
                MESSAGE_V3: "",
                MESSAGE_V4: "",
                TYPE: "",
            };

            let T_OPERATIONS = [];
            T_OPERATIONS.push({
                ACTIVITY: "0020",
                ACTTYPE: "",
                ACT_END_DATE: "0000-00-00",
                ACT_END_TIME: "00:00:00",
                ACT_START_DATE: "0000-00-00",
                ACT_START_TIME: "00:00:00",
                AGMT_ITEM: "00000",
                AGREEMENT: "",
                ASSEMBLY: "",
                ASSEMBLY_EXTERNAL: "",
                ASSEMBLY_GUID: "",
                ASSEMBLY_LONG: "",
                ASSEMBLY_VERSION: "",
                BASE_UOM: "EA",
                BASE_UOM_ISO: "EA",
                BUS_AREA: "RA",
                CALC_KEY: "1",
                COMPLETE: "",
                COMP_CODE: "",
                CONF_NO: "0010610348",
                CONSTRAINT_TYPE_FINISH: "",
                CONSTRAINT_TYPE_START: "",
                CONTROL_KEY: "RAC1",
                COST_ELEMENT: "0041020014",
                CSTG_SHEET: "",
                CURRENCY: "CLP",
                CURRENCY_ISO: "CLP",
                DESCRIPTION: "MONTAJE NEUMATICOS",
                DURATION_NORMAL: 0,
                DURATION_NORMAL_UNIT: "STD",
                DURATION_NORMAL_UNIT_ISO: "HUR",
                EARL_SCHED_FIN_DATE: "2021-08-11",
                EARL_SCHED_FIN_TIME: "24:00:00",
                EARL_SCHED_START_DATE: "2021-08-11",
                EARL_SCHED_START_TIME: "24:00:00",
                END_POINT: "",
                EQUIPMENT: "",
                EXECFACTOR: 1,
                FCST_FIN_DATE: "0000-00-00",
                FCST_FIN_TIME: "00:00:00",
                FIELD_KEY: "",
                FIELD_USER_STATUS: "",
                FINTIMCONS: "00:00:00",
                FIN_CONSTR: "0000-00-00",
                FIRST_OFFSET_TYPE_CODE: "",
                FIRST_OFFSET_TYPE_CODE_NAME: "",
                FIRST_OFFSET_UNIT: "",
                FIRST_OFFSET_UNIT_ISO: "",
                FIRST_OFFSET_VALUE: "",
                FREE_BUFFER: 0,
                FUNCT_LOC: "",
                FUNC_AREA: "",
                FW_ORDER: "",
                GR_RCPT: "",
                INFO_REC: "",
                INT_DISTR: "",
                LANGU: "",
                LANGU_ISO: "",
                LATE_SCHED_FIN_DATE: "2021-08-11",
                LATE_SCHED_FIN_TIME: "24:00:00",
                LATE_SCHED_START_DATE: "2021-08-11",
                LATE_SCHED_START_TIME: "24:00:00",
                LINEAR_LENGTH: "",
                LINEAR_UNIT: "",
                LINEAR_UNIT_ISO: "",
                MAINTENANCE_ACTIVITY_TYPE: "",
                MARKER_DISTANCE_END_POINT: "",
                MARKER_DISTANCE_START_POINT: "",
                MARKER_DISTANCE_UNIT: "",
                MARKER_DISTANCE_UNIT_ISO: "",
                MARKER_END_POINT: "",
                MARKER_START_POINT: "",
                MATL_GROUP: "0027",
                MRP_RELEVANT: "3",
                NOTIF_NO: "",
                NO_OF_TIME_TICKETS: 0,
                NUMBER_OF_CAPACITIES: "0 ",
                OBJECTCLASS: "PA",
                OFFSET_END: 0,
                OFFSET_END_UNIT: "",
                OFFSET_END_UNIT_ISO: "",
                OFFSET_START: 0,
                OFFSET_START_UNIT: "",
                OFFSET_START_UNIT_ISO: "",
                ORDER_ITEM: "00000",
                OVERHEAD_KEY: "",
                PCKG_NO: "0000000000",
                PERCENT_OF_WORK: "0 ",
                PERS_NO: "00000000",
                PLANT: "2RA1",
                PLND_DELRY: 0,
                PREQ_ITEM: "00000",
                PREQ_NAME: "",
                PREQ_NO: "",
                PRICE: 1,
                PRICE_UNIT: 0,
                PROFIT_CTR: "",
                PURCH_ORG: "2000",
                PUR_GROUP: "202",
                QUANTITY: 1,
                SECOND_OFFSET_TYPE_CODE: "",
                SECOND_OFFSET_TYPE_CODE_NAME: "",
                SECOND_OFFSET_UNIT: "",
                SECOND_OFFSET_UNIT_ISO: "",
                SECOND_OFFSET_VALUE: "",
                SORT_FLD: "",
                STANDARD_TEXT_KEY: "R000277",
                START_CONS: "0000-00-00",
                START_POINT: "",
                STAT_PROF: "",
                STRTTIMCON: "00:00:00",
                SUB_ACTIVITY: "",
                SUITABILITY: "",
                SYSTCOND: "",
                SYSTEM_STATUS_TEXT: "CTEC",
                TAXJURCODE: "",
                TOTAL_BUFFER: 0,
                TRACKINGNO: "",
                UNLOAD_PT: "",
                UN_WORK: "HRA",
                UN_WORK_ISO: "HUR",
                USE04: "",
                USE04_ISO: "",
                USE05: "",
                USE05_ISO: "",
                USE06: "",
                USE06_ISO: "",
                USE07: "",
                USE07_ISO: "",
                USR00: "",
                USR01: "",
                USR02: "",
                USR03: "",
                USR04: 0,
                USR05: 0,
                USR06: 0,
                USR07: 0,
                USR08: "0000-00-00",
                USR09: "0000-00-00",
                USR10: "",
                USR11: "",
                VENDOR_NO: "",
                WAGEGROUP: "",
                WAGETYPE: "",
                WBS_ELEM: "00000000",
                WORK_ACTIVITY: 0,
                WORK_ACTUAL: 0,
                WORK_CNTR: "ADMRAC",
                WORK_FORECAST: 0,
            });

            let result = {

                E_HEADER: E_HEADER,
                E_RETURN: E_RETURN,
                T_OPERATIONS: T_OPERATIONS

            };


            let operaciones = utils.copyObjectArray(
                [
                    'ACTIVITY',
                    'SUB_ACTIVITY',
                    'WORK_CNTR',
                    'PLANT',
                    'CONTROL_KEY',
                    'STANDARD_TEXT_KEY',
                    'DESCRIPTION',
                    'WORK_ACTIVITY',
                    'UN_WORK',
                    'QUANTITY',
                    'DURATION_NORMAL',
                    'CALC_KEY',
                    'ACTTYPE',

                    'UNLOAD_PT',
                    'SYSTCOND',
                    'NUMBER_OF_CAPACITIES',
                    'MRP_RELEVANT',
                    'EXECFACTOR',
                    'START_CONS',
                    'STRTTIMCON',
                    'FIN_CONSTR',
                    'FINTIMCONS',
                    'ACTIVITY',
                    'GR_RCPT',
                    'VENDOR_NO',
                    'PUR_GROUP',
                    'MATL_GROUP',
                    'COST_ELEMENT',
                    'BASE_UOM',
                    'PRICE',
                    'CURRENCY'
                ],
                [
                    'OPERACION',
                    'SUB_OPERACION',
                    'PUESTO_TRABAJO',
                    'CENTRO',
                    'CLAVE_CONTROL',
                    'CLAVE_MODELO',
                    'TXT_OPERACION',
                    'TRABAJO',
                    'UNIDAD',
                    'CANTIDAD',
                    'DURACION',
                    'CLAVE_CALCULO',
                    'i_CLASE_ACTIVIDAD',

                    'UNLOAD_PT',
                    'SYSTCOND',
                    'NUMBER_OF_CAPACITIES',
                    'MRP_RELEVANT',
                    'EXECFACTOR',
                    'START_CONS',
                    'STRTTIMCON',
                    'FIN_CONSTR',
                    'FINTIMCONS',
                    'ACTIVITY',
                    'GR_RCPT',
                    'VENDOR_NO',
                    'PUR_GROUP',
                    'MATL_GROUP',
                    'COST_ELEMENT',
                    'BASE_UOM',
                    'PRICE',
                    'CURRENCY'
                ],
                result.T_OPERATIONS,
                false
            );
            let centro = result.E_HEADER.PLANT;
            let puestoTrabajo = result.E_HEADER.MN_WK_CTR;

            for (var i = 0; i < operaciones.length; i++) {
                operaciones[i].PRICE = operaciones[i].PRICE * 100;
                operaciones[i].DESCRIPTION = "";
                operaciones[i].AGREGA = false;
                operaciones[i].MODIFICA = false;
            }
            /*
                        let clasesActividad = utils.copyObjectArray(['LSTAR', 'LTEXT', 'ACTIVITY'], ['KEY', 'TEXT', 'ACTIVITY'], result.E_CSLT, false);
                        for (var i = 0; i < operaciones.length; i++) {
                            operaciones[i].CLASES_ACTIVIDAD = clasesActividad.filter(function (clase) {
                                return clase.ACTIVITY === operaciones[i].OPERACION;
                            });
            
                            operaciones[i].CLASES_ACTIVIDAD.unshift({ KEY: '', TEXT: '' });
            
                        }
            
                        */
            if (operaciones.length === 0) {
                that.addMessage('No se encontraron datos.', 'E');
            }
            that.set('/Operaciones/OperacionesEditar', operaciones);
            that.set('/Operaciones/i_OperacionesEditar', -1);
            that.set('/Operaciones/Centro', centro);
            that.set('/Operaciones/PuestoTrabajo', puestoTrabajo);
            that.set('/Operaciones/Accion', seccion);
            that._resizeTableColumns(sap.ui.core.Fragment.createId("fgmEditar", "tableOperacionesEditar"));
            that._resizeTableColumns(sap.ui.core.Fragment.createId("fgmServicioExterno", "tableOperacionesEditar"));

            /*

            utils.httpCall({
                service: 'ZPMMF_001_TABLAOPER',
                query: {
                    I_ORDEN: orden
                },
                type: 'POST',
                success: function (result) {
                    let operaciones = utils.copyObjectArray(
                        [
                            'ACTIVITY',
                            'SUB_ACTIVITY',
                            'WORK_CNTR',
                            'PLANT',
                            'CONTROL_KEY',
                            'STANDARD_TEXT_KEY',
                            'DESCRIPTION',
                            'WORK_ACTIVITY',
                            'UN_WORK',
                            'QUANTITY',
                            'DURATION_NORMAL',
                            'CALC_KEY',
                            'ACTTYPE',

                            'UNLOAD_PT',
                            'SYSTCOND',
                            'NUMBER_OF_CAPACITIES',
                            'MRP_RELEVANT',
                            'EXECFACTOR',
                            'START_CONS',
                            'STRTTIMCON',
                            'FIN_CONSTR',
                            'FINTIMCONS',
                            'ACTIVITY',
                            'GR_RCPT',
                            'VENDOR_NO',
                            'PUR_GROUP',
                            'MATL_GROUP',
                            'COST_ELEMENT',
                            'BASE_UOM',
                            'PRICE',
                            'CURRENCY'
                        ],
                        [
                            'OPERACION',
                            'SUB_OPERACION',
                            'PUESTO_TRABAJO',
                            'CENTRO',
                            'CLAVE_CONTROL',
                            'CLAVE_MODELO',
                            'TXT_OPERACION',
                            'TRABAJO',
                            'UNIDAD',
                            'CANTIDAD',
                            'DURACION',
                            'CLAVE_CALCULO',
                            'i_CLASE_ACTIVIDAD',

                            'UNLOAD_PT',
                            'SYSTCOND',
                            'NUMBER_OF_CAPACITIES',
                            'MRP_RELEVANT',
                            'EXECFACTOR',
                            'START_CONS',
                            'STRTTIMCON',
                            'FIN_CONSTR',
                            'FINTIMCONS',
                            'ACTIVITY',
                            'GR_RCPT',
                            'VENDOR_NO',
                            'PUR_GROUP',
                            'MATL_GROUP',
                            'COST_ELEMENT',
                            'BASE_UOM',
                            'PRICE',
                            'CURRENCY'
                        ],
                        result.T_OPERATIONS,
                        false
                    );
                    let centro = result.E_HEADER.PLANT;
                    let puestoTrabajo = result.E_HEADER.MN_WK_CTR;

                    for (var i = 0; i < operaciones.length; i++) {
                        operaciones[i].PRICE = operaciones[i].PRICE * 100;
                        operaciones[i].DESCRIPTION = "";
                        operaciones[i].AGREGA = false;
                        operaciones[i].MODIFICA = false;
                    }

                    utils.httpCall({
                        service: 'Z353R_BUSCAR_CLASES_ACTIVIDAD',
                        query: {
                            I_ORDEN: orden
                        },
                        type: 'POST',
                        success: function (result) {
                            let clasesActividad = utils.copyObjectArray(['LSTAR', 'LTEXT', 'ACTIVITY'], ['KEY', 'TEXT', 'ACTIVITY'], result.E_CSLT, false);
                            for (var i = 0; i < operaciones.length; i++) {
                                operaciones[i].CLASES_ACTIVIDAD = clasesActividad.filter(function (clase) {
                                    return clase.ACTIVITY === operaciones[i].OPERACION;
                                });

                                operaciones[i].CLASES_ACTIVIDAD.unshift({ KEY: '', TEXT: '' });

                            }
                            if (operaciones.length === 0) {
                                that.addMessage('No se encontraron datos.', 'E');
                            }
                            that.set('/Operaciones/OperacionesEditar', operaciones);
                            that.set('/Operaciones/i_OperacionesEditar', -1);
                            that.set('/Operaciones/Centro', centro);
                            that.set('/Operaciones/PuestoTrabajo', puestoTrabajo);
                            that.set('/Operaciones/Accion', seccion);
                            that._resizeTableColumns(sap.ui.core.Fragment.createId("fgmEditar", "tableOperacionesEditar"));
                            that._resizeTableColumns(sap.ui.core.Fragment.createId("fgmServicioExterno", "tableOperacionesEditar"));
                        }
                    });

                }
            });

            */
        },

        handleOperacionesVolver: function () {
            let that = this;
            let rol = this._rol;
            this._cargarDetalle(function () {
                //   that._desbloquearDocumento('ORDEN', that.get('/Detalle/Orden'), function () {
                that._rolBehaviour(rol, function () {
                    that.set('/ModoEdicion', false);
                    that.set('/Operaciones/Accion', 'MAIN');
                });
                //});
            });
        },

        handleOperacionDelete: function () {

            let that = this;
            let index = that.get('/Operaciones/i_OperacionEditar');
            var dialog = new sap.m.Dialog({
                title: '¿Desea realmente eliminar el registro?',
                type: 'Message',
                content: new sap.m.Text({ text: '¿Desea realmente eliminar el registro?' }),
                beginButton: new sap.m.Button({
                    text: 'Sí',
                    press: function () {
                        let rows = that.get('/Operaciones/OperacionesEditar');
                        let deletes = [];
                        deletes.push({
                            ACTIVITY: rows[index].OPERACION,
                            DESCRIPTION: 'DELE'
                        });
                        rows.splice(index, 1);
                        that.set('/Operaciones/OperacionesEditar', rows);
                        that.set('/Operaciones/OperacionesDelete', deletes);
                        that.get('/Operaciones/i_OperacionEditar', -1);
                        //                    that._grabarOperaciones(that.get('/Operaciones/Accion'));
                        that.getView().getModel().refresh(true);
                        dialog.close();
                    }
                }),
                endButton: new sap.m.Button({
                    text: 'No',
                    press: function () {
                        dialog.close();
                    }
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });

            dialog.open();
        },

        handleOperacionesSave: function () {

            let retorno = [];

            retorno.push({
                FIELD: "",
                ID: "IWO_BAPI2",
                LOG_MSG_NO: "000000",
                LOG_NO: "",
                MESSAGE: "Se ha guardado con éxito",
                MESSAGE_V1: "",
                MESSAGE_V2: "",
                MESSAGE_V3: "",
                MESSAGE_V4: "",
                NUMBER: "000",
                PARAMETER: "",
                ROW: 0,
                SYSTEM: "",
                TYPE: "S",
            });

            this.addMessage("Se ha guardado con éxito", "S");

            //         this._messageManager([retorno], function () {
            //             if (typeof success === 'function') {
            //                 success();
            //             }
            //        });


            //           this._grabarOperaciones("EDITAR");
        },

        handleOperacionesManoObra: function () {
            let that = this;
            let orden = that.get('/Detalle/Orden');
            //       that._bloquearDocumento('ORDEN', orden, function () {
            let data = that.get('/');
            sessionStorage.setItem('app00280visualizacionordendetrState', JSON.stringify(data));
            sessionStorage.setItem('app00280visualizacionordendetrFunction', 'cargarDetalle');

            var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
            localStorage['NroOrden'] = that.get('/Detalle/Orden');
            oRouter.navTo("manoObra");
            // });
        },

        handleOperacionesServicioExterno: function () {
            let that = this;
            let orden = that.get('/Detalle/Orden');
            that.set('/Operaciones/OperacionesEditar', []);
            that.set('/Operaciones/OperacionesDelete', []);
            //   that._bloquearDocumento('ORDEN', orden, function () {
            that.set('/ModoEdicion', true);
            that._cargarTablaEditar('SERVICIO_EXTERNO');
            //   });
        },

        handleOperacionesAdd: function () {
            let that = this;

            let orden = that.get('/Detalle/Orden');
            that._cargarAcreedores(function (result) {
                that._cargarGruposCompra(function (grupos) {
                    that.openDialog('operaciones.AgregarOperacion', {
                        Modo: 'AGR',
                        Orden: orden,
                        TextoBreve: '',
                        CantidadOperacion: '',
                        UnidadMedida: 'UN',
                        Precio: '',
                        Moneda: 'CLP',
                        GrupoArticulos: '0027',
                        ClaseCoste: '41020014',
                        i_GrupoCompra: '',
                        GruposCompra: grupos,
                        Acreedor: '',
                        Acreedores: utils.copyObjectArray(['cod', 'desc'], ['KEY', 'TEXT'], result, true),
                        SolicitudPedido: '',
                        DocumentoCompras: '',
                        CamposVisibles: false,
                    });
                });
            });
        },

        _cargarAcreedores: function (success) {
            let that = this;

            let result = [];

            result.push({
                cod: "0000100737",
                desc: "MAXIMILIANO CARRASCO-4K S"
            });

            result.push({
                cod: "0000100670",
                desc: "INFOAVAL SRL"
            });

            result.push({
                cod: "0000100769",
                desc: "BALANZAS HOOK S.A"
            });

            success(result);

            /*
                        let opciones = [{
                            SHLPNAME: "KREDE",
                            SHLPFIELD: "LIFNR",
                            SIGN: "I",
                            OPTION: "CP",
                            LOW: "*",
                            HIGH: "",
                        }, {
                            SHLPNAME: "KREDE",
                            SHLPFIELD: "EKORG",
                            SIGN: "I",
                            OPTION: "EQ",
                            LOW: "1000",
                            HIGH: "",
                        }];
                        let campoCodigo = 'LIFNR';
                        let campoDescripcion = 'MCOD1';
                        this._ejecutarF4IF('KREDE', opciones, campoCodigo, campoDescripcion, '', function (result) {
                            if (result.length === 0) {
                                that.addMessage('Acreedor', 'E');
                            }
                            success(result);
                        });
                    */

        },

        _cargarGruposCompra: function (success) {

            let grupos = [];

            grupos.push({
                KEY: "",
                TEXT: "Seleccione"

            });

            grupos.push({
                KEY: "117",
                TEXT: "Servicio Pesado CA"

            });

            grupos.push({
                KEY: "136",
                TEXT: "Servicio Pesado MA"

            });

            //grupos.push({

            grupos.push({
                KEY: "136",
                TEXT: "Servicio Pesado MA"
            });

            success(grupos);

            /*
                        utils.getUserData(function (data) {
                            let grupos = [{
                                KEY: '',
                                TEXT: 'Seleccione'
                            }];
                            data.T_DATEMPR.forEach(function (d) {
                                if (d.ID_TIPO === 'EKGRP') {
                                    if (d.VALOR === "117") {
                                        grupos.push({
                                            KEY: d.VALOR,
                                            TEXT: "Servicio Pesado CA"
                                        });
                                    } else if (d.VALOR === "118") {
                                        grupos.push({
                                            KEY: d.VALOR,
                                            TEXT: "Servicio Forestal"
                                        });
                                    } else if (d.VALOR === "136") {
                                        grupos.push({
                                            KEY: d.VALOR,
                                            TEXT: "Servicio Pesado MA"
                                        });
                                    }
                                }
                            });
                            success(grupos);
                        });
            
                        */
        },

        handleSelectClienteOperacion: function (evt) {

            let oModel = this.getView().getModel();
            let that = this;
            if (this.multiSelect) {
                this.multiSelect.destroy()
            }
            let dialogName = this._getOpenedDialogName();
            var selectedPath = '';

            this.multiSelect = new sap.m.Dialog({
                contentWidth: '600px',
                title: 'Búsqueda de Acreedor',
                content: new sap.ui.table.Table({
                    rows: '{/' + dialogName + '/Acreedores}',
                    selectedIndex: '{/' + dialogName + '/i_Acreedor}',
                    visibleRowCount: 5,
                    noData: 'Cliente no encontrado.',
                    selectionMode: "Single",
                    selectionBehavior: "Row",
                    rowSelectionChange: function (e) {
                        var row = e.getParameter("rowContext");
                        if (row) {
                            selectedPath = row.sPath;
                        } else {
                            selectedPath = '';
                        }
                    },
                    columns: [
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: "RUT"
                            }),
                            filterProperty: "KEY",
                            autoResizable: true,
                            width: '10rem',
                            template: new sap.m.Text({
                                text: '{KEY}',
                                wrapping: false
                            })
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: "Nombre"
                            }),
                            filterProperty: "TEXT",
                            autoResizable: true,
                            template: new sap.m.Text({
                                text: '{TEXT}',
                                wrapping: false
                            })
                        }),
                    ],
                    footer: new sap.m.Toolbar({
                        content: [
                            new sap.m.Text({
                                text: 'Total: {= ${/' + dialogName + '/Acreedores}.length }'
                            })
                        ]
                    }),
                }).setModel(oModel),
                beginButton: new sap.m.Button({
                    text: 'Seleccionar',
                    icon: 'sap-icon://accept',
                    enabled: '{=${/' + dialogName + '/i_Acreedor} >= 0}',
                    type: 'Emphasized',
                    press: () => {
                        //let index = that.get('/' + dialogName + '/i_Acreedor');
                        // let rut = that.get('/' + dialogName + '/Acreedores')[index].KEY;
                        if (selectedPath) {
                            let rut = that.get(selectedPath).KEY;
                            that.set('/' + dialogName + '/Acreedor', rut);
                        }

                        this.multiSelect.close();
                    }
                }),
                endButton: new sap.m.Button({
                    text: 'Cancelar',
                    icon: 'sap-icon://decline',
                    press: () => {
                        this.multiSelect.close();
                    }
                })
            }).addStyleClass('sapUiSizeCompact sapUiContentPadding');
            this.multiSelect.open();
        },

        handleAceptarAgregarOperacion: function (e) {
            sap.ui.getCore().getMessageManager().removeAllMessages();

            let that = this;
            let dialog = that._getOpenedDialogProperty();

            let operaciones = that.get('/Operaciones/OperacionesEditar');

            let tam = operaciones.length;

            if (tam > 0) {
                tam = tam - 1;
            }

            let oper = parseInt(operaciones[tam].OPERACION) + 10;

            let oper_Str = "00" + String(oper);

            let index = that.get('/Operaciones/i_OperacionEditar');
            let encontrado = (dialog.Acreedor ? false : true);//si se ingresa acreedor iniciamos en false

            for (var i = 0; i < dialog.Acreedores.length; i++) {
                if (dialog.Acreedor === dialog.Acreedores[i].KEY) {
                    encontrado = true;
                    break;
                }
            }

            if (!encontrado) {
                that.addMessage('El RUT ' + dialog.Acreedor + ' no pertenece a un acreedor permitido.', 'E');
                return;
            }

            if (dialog.Modo === 'AGR') {
                let lv_vornr = '0';
                for (var i = 0; i < operaciones.length; i++) {
                    let aux = operaciones[i];
                    lv_vornr = aux.OPERACION;
                }
                let lv_int = parseInt(lv_vornr);
                lv_int += 10;
                operaciones.push({
                    OPERACION: oper_Str,
                    CENTRO: that.get('/Operaciones/Centro'),
                    TXT_OPERACION: dialog.TextoBreve,
                    CANTIDAD: dialog.CantidadOperacion,
                    VENDOR_NO: dialog.Acreedor,
                    COST_ELEMENT: dialog.ClaseCoste,
                    BASE_UOM: dialog.UnidadMedida,
                    PRICE: dialog.Precio,
                    CURRENCY: dialog.Moneda,
                    MATL_GROUP: dialog.GrupoArticulos,
                    PUR_GROUP: dialog.i_GrupoCompra,
                    CLAVE_CONTROL: 'SAL2',
                    STRTTIMCON: utils.dateToFormat('yyyyMMdd', new Date()),
                    AGREGA: true,
                    MODIFICA: false,
                    PUESTO_TRABAJO: that.get('/Operaciones/PuestoTrabajo')
                });

                that.set('/Operaciones/OperacionesEditar', operaciones);

            } else if (dialog.Modo === 'MOD') {
                let operacion = operaciones[index];
                operacion.TXT_OPERACION = dialog.TextoBreve;
                operacion.CANTIDAD = dialog.CantidadOperacion;
                operacion.VENDOR_NO = dialog.Acreedor;
                operacion.COST_ELEMENT = dialog.ClaseCoste;
                operacion.BASE_UOM = dialog.UnidadMedida;
                operacion.PRICE = dialog.Precio;
                operacion.CURRENCY = dialog.Moneda;
                operacion.MATL_GROUP = dialog.GrupoArticulos;
                operacion.PUR_GROUP = dialog.i_GrupoCompra;
                operacion.STRTTIMCON = utils.dateToFormat('yyyyMMdd', new Date());
                operacion.FIN_CONSTR = utils.dateToFormat('yyyyMMdd', new Date());
                operacion.MODIFICA = true;

                operaciones[index] = operacion;
                that.set('/Operaciones/OperacionesEditar', operaciones);
            }

            // that._grabarOperaciones('SERVICIO_EXTERNO', function () {
            that.closeDialog();
            //   });
        },

        handleOperacionesNecesidades: function () {
            let that = this;
            let orden = that.get('/Detalle/Orden');
            //      that._bloquearDocumento('ORDEN', orden, function () {
            that.set('/Operaciones/Accion', 'NECESIDADES');
            that.set('/Operaciones/i_Operacion', -1);
            that.set('/ModoEdicion', true);
            that._resizeTableColumns(sap.ui.core.Fragment.createId("fgmNecesidades", "tableOperaciones"));
            //       });
        },


        handleEditarInterlocutores: function () {
            let that = this;
            let orden = this.get('/Detalle/Orden');
            // that._bloquearDocumento('ORDEN', orden, function () {
            that.set('/ModoEdicion', true);
            that.set('/i_Interlocutor', -1);
            //    });
        },

        handleAgregarInterlocutores: function () {
            let that = this;
            that.openDialog('interlocutores.Agregar', {
                i_Funcion: '',
                Codigo: '',
                Nombre: '',
                Apellido: '',
                Interlocutores: [],
                i_Interlocutor: -1,
                Modifica: false,
                Cliente: false,
                Interlocutor: false
            });
        },

        handleAceptarAgregarInterlocutor: function () {
            sap.ui.getCore().getMessageManager().removeAllMessages();

            let that = this;
            let orden = this.get('/Detalle/Orden');

            let dialog = that._getOpenedDialogProperty();

            let interlocutores = that.get('/Interlocutores');
            let i_interlocutor = that.get('/i_Interlocutor');

            let interBusq = dialog.Interlocutores[dialog.i_Interlocutor];
            let interlctr = {};

            interlctr.PARTNER = interBusq.CODIGO;
            interlctr.NOMBRE = interBusq.NOMBRE;
            interlctr.PARTN_ROLE = dialog.i_Funcion;

            interlctr.PARTNER_OLD = '';
            interlctr.PARTN_ROLE_OLD = '';

            if (!dialog.Modifica) {
                interlctr.AGREGA = 'X';
                interlctr.MODIFICA = '';
            } else {
                let interOld = interlocutores[i_interlocutor];
                interlctr.PARTNER_OLD = interOld.INTERLOCUTOR;
                interlctr.PARTN_ROLE_OLD = interOld.I_FUNCION;
                interlctr.AGREGA = '';
                interlctr.MODIFICA = 'X';
            }

            let t_inteloctr = [interlctr];

            let dest = {};

            dest.INTERLOCUTOR = interlctr.PARTNER;
            dest.I_FUNCION = interlctr.PARTN_ROLE;
            dest.NOMBRE = interlctr.NOMBRE;
            dest.DIRECCION = "Santa Cruz, Tenerife";
            dest.AGREGA = false;
            dest.MODIFICA = true;
            dest.ELIMINA = true;

            interlocutores.push(dest);

            that.set('/Interlocutores', interlocutores);

            that.closeDialog();

            /*
                        utils.httpCall({
                            service: 'ZPMMF_002_GRAB_DATOS_ORDEN',
                            query: {
                                I_ORDEN: orden,
                                T_INTELOCTR: t_inteloctr,
                                I_HEADER: {}
                            },
                            type: 'POST',
                            success: function (result) {
                                that._messageManager(result.T_RETORNO, function () {
                                    //success
                                    that._cargarDetalle(function () {
                                        that._messageManager(result.T_RETORNO);
                                        that._rolBehaviour(that._rol);
                                    });
                                    that.closeDialog();
                                }, function () {
                                    //error
                                });
                            }
                        });
            
                        */
        },

        handleChangeSelectFunciones: function () {
            let that = this;
            let dialog = that._getOpenedDialogProperty();
            let dialogName = that._getOpenedDialogName();
            let interlocutores = that.get('/Interlocutores');
            let i_interlocutor = that.get('/i_Interlocutor');
            dialog.i_Interlocutor = -1;
            dialog.Interlocutores = [];
            dialog.Codigo = '';
            dialog.Nombre = '';
            dialog.Apellido = '';

            let funcion = dialog.i_Funcion.substr(0, 2);
            let funcion_conv = '';
            let funciones = that.get('/Opciones/Interlocutores/Funciones');
            let cliente = false;

            for (var i = 0; i < funciones.length; i++) {
                if (funciones[i].KEY.substr(0, 2) === funcion) {
                    funcion_conv = funciones[i].KEY_CONV.substr(0, 2);
                    if (funciones[i].GROUP === '07') {
                        cliente = true;
                    }
                }
            }

            let mensaje = '';
            if (cliente) {
                dialog.Cliente = true;
                dialog.Interlocutor = false;
                if (dialog.Modifica) {
                    dialog.Codigo = interlocutores[i_interlocutor].INTERLOCUTOR;
                    dialog.Nombre = '';
                }
            } else if (funcion_conv) {
                dialog.Cliente = false;
                dialog.Interlocutor = true;

                if (dialog.Modifica) {
                    dialog.Codigo = interlocutores[i_interlocutor].INTERLOCUTOR;
                    dialog.Nombre = '';
                }
            } else {
                dialog.Cliente = false;
                dialog.Interlocutor = false;
            }

            that.set('/' + dialogName, dialog);
            if (cliente) {
                that._getCliente(1);
            } else if (funcion_conv) {
                that._getInterlocutor(1);
            }
        },

        _getCliente: function (porCodigo) {
            sap.ui.getCore().getMessageManager().removeAllMessages();

            let that = this;
            let dialog = that._getOpenedDialogProperty();
            let dialogName = that._getOpenedDialogName();

            dialog.i_Interlocutor = -1;

            if (porCodigo === 1) {
                dialog.Nombre = '';
                dialog.Apellido = '';
            } else if (porCodigo === 2) {
                dialog.Codigo = '';
                dialog.Apellido = '';
            } else if (porCodigo === 3) {
                dialog.Nombre = '';
                dialog.Codigo = '';
            }

            that.set('/' + dialogName, dialog);

            if ((dialog.Codigo && porCodigo === 1) || (dialog.Nombre && porCodigo === 2) || (dialog.Nombre && porCodigo === 3)) {
                let opcion = {
                    SHLPNAME: "BBPH_DEBITOR_GENERAL",
                    SIGN: 'I',
                    OPTION: "CP",
                    HIGH: ""
                };

                if (porCodigo === 1) {
                    opcion.SHLPFIELD = 'KUNNR';
                    opcion.LOW = dialog.Codigo + "*";
                } else if (porCodigo === 2) {
                    opcion.SHLPFIELD = 'MCOD1';
                    opcion.LOW = "*" + dialog.Nombre.toUpperCase() + "*";
                }

                let opciones = [opcion];
                let campoCodigo = 'KUNNR';
                let campoDescripcion = 'NAME1';

                //      let result = [];

                //    dialog.Interlocutores = utils.copyObjectArray(['cod', 'desc'], ['CODIGO', 'NOMBRE'], result, false);

                //     that.set('/' + dialogName, dialog);

                /*
                this._ejecutarF4IF('BBPH_DEBITOR_GENERAL', opciones, campoCodigo, campoDescripcion, '', function (result) {
                    if (result.length === 0) {
                        that.addMessage('Cliente no encontrado', 'E');
                        dialog.Interlocutores = [];
                    } else {
                        dialog.Interlocutores = utils.copyObjectArray(['cod', 'desc'], ['CODIGO', 'NOMBRE'], result, false);
                    }

                    that.set('/' + dialogName, dialog);
                });

                */
            }
        },

        _getInterlocutor: function (porCodigo) {
            sap.ui.getCore().getMessageManager().removeAllMessages();

            let that = this;
            let dialog = that._getOpenedDialogProperty();
            let dialogName = that._getOpenedDialogName();

            dialog.i_Interlocutor = -1;

            if (porCodigo === 1) {
                dialog.Nombre = '';
                dialog.Apellido = '';
            } else if (porCodigo === 2) {
                dialog.Codigo = '';
                dialog.Apellido = '';
            } else if (porCodigo === 3) {
                dialog.Nombre = '';
                dialog.Codigo = '';
            }

            that.set('/' + dialogName, dialog);

            if ((dialog.Codigo && porCodigo === 1) || (dialog.Nombre && porCodigo === 2) || (dialog.Apellido && porCodigo === 3)) {
                let opcion = {
                    SHLPNAME: "PREMN",
                    SIGN: 'I',
                    OPTION: "CP",
                    HIGH: ""
                };

                if (porCodigo === 1) {
                    opcion.SHLPFIELD = 'PERNR';
                    opcion.LOW = dialog.Codigo + "*";
                } else if (porCodigo === 2) {
                    opcion.SHLPFIELD = 'VNAMC';
                    opcion.LOW = "*" + dialog.Nombre.toUpperCase() + "*";
                } else if (porCodigo === 3) {
                    opcion.SHLPFIELD = 'NCHMC';
                    opcion.LOW = "*" + dialog.Apellido.toUpperCase() + "*";
                }

                let opciones = [opcion];
                let campoCodigo = 'PERNR';
                let campoDescripcion = 'VORNA';
                let campoDescripcionAdicional = 'NACHN';

                let result = [];

                result.push({
                    cod: "17493337",
                    desc: "JUAN REMIGIO ARANCIBIA PINCHEIRA"
                });

                result.push({
                    cod: "18669186",
                    desc: "Maikol Andrés Contreras"
                });

                result.push({
                    cod: "16440563",
                    desc: "MAXIMO ANDRES ABARCA  CHOBIL"
                });

                dialog.Interlocutores = utils.copyObjectArray(['cod', 'desc'], ['CODIGO', 'NOMBRE'], result, false);
                // }

                that.set('/' + dialogName, dialog);

                /*

                this._ejecutarF4IF('PREMN', opciones, campoCodigo, campoDescripcion, campoDescripcionAdicional, function (result) {
                    if (result.length === 0) {
                        that.addMessage('Interlocutor no encontrado', 'E');
                        dialog.Interlocutores = [];
                    } else {
                        dialog.Interlocutores = utils.copyObjectArray(['cod', 'desc'], ['CODIGO', 'NOMBRE'], result, false);
                    }

                    that.set('/' + dialogName, dialog);
                });

                */
            }
        },

        handleSearchInterlocutorCodigo: function () {
            this._getInterlocutor(1);
        },

        handleSearchInterlocutorNombre: function () {
            this._getInterlocutor(2);
        },

        handleSearchInterlocutorApellido: function () {
            this._getInterlocutor(3);
        },

        handleEliminarInterlocutores: function () {

            sap.ui.getCore().getMessageManager().removeAllMessages();

            let that = this;
            let orden = this.get('/Detalle/Orden');

            let interlocutores = that.get('/Interlocutores');
            let i_interlocutor = that.get('/i_Interlocutor');

            let interBusq = interlocutores[i_interlocutor];
            let interlctr = {};

            interlctr.PARTNER_OLD = interBusq.INTERLOCUTOR;
            interlctr.PARTN_ROLE_OLD = interBusq.I_FUNCION;
            interlctr.ELIMINA = 'X';

            let t_inteloctr = [interlctr];

            var dialog = new sap.m.Dialog({
                title: 'Confirmar eliminación de interlocutor',
                type: 'Message',
                content: new sap.m.Text({ text: '¿Está seguro que desea eliminar el interlocutor?' }),
                beginButton: new sap.m.Button({
                    text: 'Eliminar',
                    type: 'Emphasized',
                    press: function () {

                        let interlocutores1 = that.get('/Interlocutores');
                        let i_interlocutor = that.get('/i_Interlocutor');
                        interlocutores1.splice(i_interlocutor, 1);

                        that.set('/Interlocutores', interlocutores1);


                        //  let i_interlocutor =

                        /*
                        utils.httpCall({
                            service: 'ZPMMF_002_GRAB_DATOS_ORDEN',
                            query: {
                                I_ORDEN: orden,
                                T_INTELOCTR: t_inteloctr,
                                I_HEADER: {}
                            },
                            type: 'POST',
                            success: function (result) {
                                that._messageManager(result.T_RETORNO, function () {
                                    //success
                                    that._cargarDetalle(function () {
                                        that._messageManager(result.T_RETORNO);
                                        that._rolBehaviour(that._rol);
                                    });
                                }, function () {
                                    //error
                                });
                            }
                        });

                        */
                        dialog.close();
                    }
                }),
                endButton: new sap.m.Button({
                    text: 'Cancelar',
                    press: function () {
                        dialog.close();
                    }
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });

            dialog.open();
        },

        handlePrintCertificado: function () {
            
            let that = this;
            let statusSistema = this.get('/Detalle/StatusSistema');
            let orden = this.get('/Detalle/Orden');
            let aviso = this.get('/Cabecera/Aviso');
            sap.ui.getCore().getMessageManager().removeAllMessages();

            var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
            localStorage['NroOrden'] = orden;
            oRouter.navTo("certificado");
            /*
                        if (statusSistema.indexOf('ABIE') >= 0) {
                            this.addMessage('La orden se encuentra en estatus Abierta, no es posible ingresar a Certificado.', 'E');
                        } else if (statusSistema.indexOf('CERR') >= 0) {
                            this.addMessage('La orden se encuentra Cerrada, para ingresar debe REABRIR manualmente.', 'E');
                        } else {
                            that._consultaBloqueo('ORDEN', orden, function () {
                                that._consultaBloqueo('AVISO', aviso, function () {
                                    var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                                    localStorage['NroOrden'] = orden;
                                    oRouter.navTo("certificado");
                                });
                            });
                        }
            
                        */
        }

    });
});
