var detenido = "";
var tipoTrabajador = "";
var puesto = "";
var trabajador = "";
var tipo = "";
var OBJTY = "";
var OBJID = "";
var idUsera = "";
var idUser = "";
var rolNombre = "Jefe de Servicio";
var oFilters3 = [];
var GT_ORDENES = [];
var oFiltersORDEN = [];
var oFilterMecAsig = [];
var oRELA = [];
var oMecanico = [];
var oObtieneOrden = [];
var listaOrden = [];
var pernrg = 14537536;
var ordenG = "";
var operG = "";
var resOrden;
var resMec;
var cd1="";
var contadorOrden;
var contCritica = 0;
var contPos = 0;
var contNeg = 0;
var ordenesTR;
var timeLogTR;
var operacionesTR;
var viewg;
var tituloM1AUFNR;
var tituloM1OPER;
var tituloIdTimeLog;
var rutIngresado;
var IDMOTIVO;
var cont = 0;
var mecCP = [];
var mecMQ = [];
var mecFR = [];
var clis = []; 
var esTotem = false;
var esTecnico = false;
var esJefe = true;
var pstG = "";
var pstU1 = "";
var pstU2 = "";
var pstU3 = "";
var pstU4 = "";
var pstU5 = "";
var pstU6 = "";
var pstU7 = "";
var pstU8 = "";
var pstU9 = "";
var pstU10 = "";
var pstU11 = "";
var pstU12 = "";
var resultTR;
var centro = "1SA1";
var swComboP = true;
var jefeTaG; 
var jefeTaM; 

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "SCO/sco00timerecording_html/utils/Clock",
    "SCO/sco00timerecording_html/utils/utilFormater",
    "SCO/sco00timerecording_html/utils/utilUI",
    "SCO/sco00timerecording_html/utils/utilController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Clock,utilFormater,utilUI,utilController) {
        "use strict";

        return Controller.extend("SCO.sco00timerecording_html.controller.View1", {

            onPrincipal : function () {
			
                var that = this;
                this.getView().byId("BusyDialogG").open;
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();
                var hrs = today.getHours();
                var min = today.getMinutes();
                jefeTaG = "j"; jefeTaM = "l";
                var sec = today.getSeconds();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                if (hrs < 10) {
                    hrs = '0' + hrs;
                }
                if (min < 10) {
                    min = '0' + min;
                }
                if (sec < 10) {
                    sec = '0' + sec;
                }
                var fechAct = dd + "/" + mm + "/" + yyyy;
    
                var self = this;	
                    
                var globalModel = sap.ui.getCore().getModel("globalModel");
                viewg = this.getView();

                var self = this;
        
                this.getView().byId("idIconTabBarUsuario").setVisible(false);
                this.debug = false;
                if (this.debug === false) {
                    this.destinationBaseUrl = "/destinations/timerecordingAppToApp2/";
                } else {
                    this.destinationBaseUrl = "/destinations/timerecordingBasic2/";
                }
    
                var oFiltersA = {
                    "I_IDUSER": idUsera.toUpperCase().trim()
                };
                
                if(idUsera.toString().trim().toUpperCase().startsWith(jefeTaG)){
                    pstG = "RESEMQ";
                    
                }else if(idUsera.toString().trim().toUpperCase().startsWith(jefeTaM.toUpperCase())){
                    pstG = "RESECP";
                    pstU1 = "GPSEMF";
                    pstU2 = "GPSEMC";
                    pstU3 = "GPSEMP";
                }else{
                    pstG = "RESECP";
                    pstU1 = "GPSEMF";
                    pstU2 = "GPSEMC";
                    pstU3 = "GPSEMP";			
                    pstU4 = "RESEMQ";
                    pstU5 = "GPSECP";
                    pstU6 = "MESECP";
                    pstU7 = "MESEFR";
                    pstU8 = "MESEMQ";
                    pstU9 = "MESEPC";
                    pstU10 = "RESEFR";
                    pstU11 = "RESEPC";
                    pstU12 = "RESEPM";
                }	
    
                if (idUsera === "") {
                    this.getView().byId("idpanelTitle").setVisible(true);
                } else {
//Jose Lopez                    
                    var oScoModel = new sap.ui.model.json.JSONModel();
                    oScoModel.loadData("model/data.json");

//Jose Lopez        service.datosUsuario(oFiltersA, function (result) {
                    oScoModel.attachRequestCompleted(function(oEvent) {
                        //alert(result.E_USUARIO.APELLIDO);	
                        //alert(result.E_USUARIO.NOMBRE);	
                        //buscando centro
//Jose Lopez            centro = self.getDatoEmpr(result.T_DATEMPR, "WERKS");
                        var t_datempr = oScoModel.getProperty("/ZPWD_004_DATUSER/response/T_DATEMPR");
                        centro = self.getDatoEmpr(t_datempr,"WERKS");
                        self.getOrdenes2();
                        self.getTimeLog2();
                        self.getOperaciones2();
            
                        ////CARGAGRILLA
                        if(esTecnico === false){
                            var oFiltersTR = {
                            "I_IDROL": "ROL_MON_SP_0220",
                            "I_FECHA_FIN": utilFormater.dateToFormat("yyyyMMdd"),
                            "I_FECHA_INI": utilFormater.dateToFormat1("yyyyMMdd"),
                            "I_OBT_STATUS": "",
                            "I_CENTRO": centro,
                            "I_ASESOR": "00000000",
                            "I_TIPO_BUSQ": "",
                            "I_OPTIMIZAR": "X",
                            "T_AVISOS_IN": [],
                            "I_CECO": [],
                            "RA_PSTO_TRABAJO": [{
                                "HIGH": "",
                                "LOW": pstG,
                                "OPTION": "EQ",
                                "SIGN": "I"
                            },
                            
                            {
                                "HIGH": "",
                                "LOW": pstU1,
                                "OPTION": "EQ",
                                "SIGN": "I"
                            },
                            
                            {
                                "HIGH": "",
                                "LOW": pstU2,
                                "OPTION": "EQ",
                                "SIGN": "I"
                            },
                            
                            {
                                "HIGH": "",
                                "LOW": pstU3,
                                "OPTION": "EQ",
                                "SIGN": "I"
                            },
                            
                            {
                                "HIGH": "",
                                "LOW": pstU4,
                                "OPTION": "EQ",
                                "SIGN": "I"
                            },
                            
                            {
                                "HIGH": "",
                                "LOW": pstU5,
                                "OPTION": "EQ",
                                "SIGN": "I"
                            },
                            
                            {
                                "HIGH": "",
                                "LOW": pstU6,
                                "OPTION": "EQ",
                                "SIGN": "I"
                            },
                            
                            {
                                "HIGH": "",
                                "LOW": pstU7,
                                "OPTION": "EQ",
                                "SIGN": "I"
                            },
                            
                            {
                                "HIGH": "",
                                "LOW": pstU8,
                                "OPTION": "EQ",
                                "SIGN": "I"
                            },
                            
                            {
                                "HIGH": "",
                                "LOW": pstU9,
                                "OPTION": "EQ",
                                "SIGN": "I"
                            },
                            
                            {
                                "HIGH": "",
                                "LOW": pstU10,
                                "OPTION": "EQ",
                                "SIGN": "I"
                            },
                            
                            {
                                "HIGH": "",
                                "LOW": pstU11,
                                "OPTION": "EQ",
                                "SIGN": "I"
                            },
                            
                            {
                                "HIGH": "",
                                "LOW": pstU12,
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }					
                            
                            ],
                            "RA_CLASEORDEN": [{
                                "HIGH": "",
                                "LOW": "ZSRP",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "ZSMP",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "ZSGP",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }],
                            "RA_STATUS_SIST": [{
                                "HIGH": "",
                                "LOW": "I0001",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "I0002",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }],
                            "RA_STATUS_USER": [{
                                "HIGH": "",
                                "LOW": "E0099",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "E0117",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "E0027",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "E0085",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "E0099",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "E0117",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "E0027",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "E0085",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "E0126",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "E0027",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "E0134",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "E0085",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }, {
                                "HIGH": "",
                                "LOW": "E0083",
                                "OPTION": "EQ",
                                "SIGN": "I"
                            }],
                            "T_CLASE_STATUS": [{
                                "AUART": "ZSRP",
                                "STAT": "E0099",
                                "FLAG": ""
                            }, {
                                "AUART": "ZSRP",
                                "STAT": "E0117",
                                "FLAG": ""
                            }, {
                                "AUART": "ZSRP",
                                "STAT": "E0027",
                                "FLAG": ""
                            }, {
                                "AUART": "ZSRP",
                                "STAT": "E0085",
                                "FLAG": ""
                            }, {
                                "AUART": "ZSMP",
                                "STAT": "E0099",
                                "FLAG": ""
                            }, {
                                "AUART": "ZSMP",
                                "STAT": "E0117",
                                "FLAG": ""
                            }, {
                                "AUART": "ZSMP",
                                "STAT": "E0027",
                                "FLAG": ""
                            }, {
                                "AUART": "ZSMP",
                                "STAT": "E0085",
                                "FLAG": ""
                            }, {
                                "AUART": "ZSGP",
                                "STAT": "E0126",
                                "FLAG": ""
                            }, {
                                "AUART": "ZSGP",
                                "STAT": "E0027",
                                "FLAG": ""
                            }, {
                                "AUART": "ZSGP",
                                "STAT": "E0134",
                                "FLAG": ""
                            }, {
                                "AUART": "ZSGP",
                                "STAT": "E0085",
                                "FLAG": ""
                            }, {
                                "AUART": "ZSGP",
                                "STAT": "E0083",
                                "FLAG": ""
                            }]
        
                            };
                        
                            console.log("======JSON ENTRADA PARA DEBUG RFC======");
                            console.log(JSON.stringify(oFiltersTR));
                        
/*Jose Lopez                var timeout = jQuery.sap.delayedCall(500, this, function () {
                            service.listaOrdenesCentroTR(oFiltersTR, function (result) {
                                    resultTR = result;
                                    console.log("LISTA GENERAL ES JEFE --->"+JSON.stringify(resultTR));
                                    self.onCargaGrilla();
                                    if(esTecnico){
                                        //viewg.byId("btnIrUsuario").firePress();
                                        viewg.byId("idBtnAct").setVisible(true);
                                        
                                    }else{
                                        viewg.byId("idBtnActJ").setVisible(true);
                                    }
                                    //	setInterval(this.fireLog,5000);
                                    //	setInterval(this.fireCarga,10000);
                                });	
                            });
Jose Lopez*/
                            var oScoModel3 = new sap.ui.model.json.JSONModel();
                            oScoModel3.loadData("model/data.json");
                            oScoModel3.attachRequestCompleted(function(oEvent) {
                                resultTR = oScoModel3.getProperty("/Z353R_OBTENER_AVISOS_TR/response");
                                self.onCargaGrilla();
                                if(esTecnico){
                                    viewg.byId("idBtnAct").setVisible(true);
                                    
                                }else{
                                    viewg.byId("idBtnActJ").setVisible(true);
                                }
                            });
                        }
                        else if(esTecnico === true){
                            self.getInnerOperOrden();
                        }
                        //FIN CARGA GRILLA

//                        viewg.byId("page").setTitle(result.E_USUARIO.APELLIDO + " " +result.E_USUARIO.NOMBRE);
                        viewg.byId("page").setTitle(oScoModel.getProperty("/ZPWD_004_DATUSER/response/E_USUARIO/APELLIDO") + " " +
                                                    oScoModel.getProperty("/ZPWD_004_DATUSER/response/E_USUARIO/NOMBRE"));
                        if (oScoModel.getProperty("/ZPWD_004_DATUSER/response/T_ROLES").length === 0) {
                            self.getView().byId("idpanelTitle").setVisible(true);
    
                            var oFilters = {
                                "BEGDA": utilFormater.dateToFormat("yyyyMMdd"),
                                "ENDDA": utilFormater.dateToFormat("yyyyMMdd"),
                                "IN_OBJECT": [{
                                    "OBJTY": "A",
                                    "OBJID": "10000530" //MAQUINARIA PESADA
                                }]
                            };
    
                            service.listaMecanico(oFilters, function (result) {
                                //alert(JSON.stringify(result.OUT_PERSONS));
                                self.onSetLISTAMEC(result.OUT_PERSONS);
                            });
    
                        } else {
                            //		alert("2");
                            rolNombre = oScoModel.getProperty("/ZPWD_004_DATUSER/response/T_ROLES")[0].NOMBRE_ROL;//result.T_ROLES[0].NOMBRE_ROL;
    
                            //cuando el usuario no está configurado, buscando automáticamente
                            //centro ISA1 MAQUINARIA PESADA
    
                            var oFilters = {
                                "BEGDA": utilFormater.dateToFormat("yyyyMMdd"),
                                "ENDDA": utilFormater.dateToFormat("yyyyMMdd"),
                                "IN_OBJECT": [{
                                    "OBJTY": "A",
                                    "OBJID": "10000530" //MAQUINARIA PESADA
                                }]
                            };
/*Jose Lopez
                            service.listaMecanico(oFilters, function (result) {
                                //alert(JSON.stringify(result.OUT_PERSONS));
                                self.onSetLISTAMEC(result.OUT_PERSONS);
                            });
Jose Lopez*/
                            self.onSetLISTAMEC(oScoModel.getProperty("/COI2_PERSON_OF_WORKCENTER")[1].response.OUT_PERSONS);

                            var oFilters = {
                                "BEGDA": utilFormater.dateToFormat("yyyyMMdd"),
                                "ENDDA": utilFormater.dateToFormat("yyyyMMdd"),
                                "IN_OBJECT": [{
                                    "OBJTY": "A",
                                    "OBJID": "10000530"
                                }]
                            };
/*Jose Lopez
                            service.listaMecanico(oFilters, function (result) {
                                //alert(JSON.stringify(result.OUT_PERSONS));
                                self.onSetLISTAMEC(result.OUT_PERSONS);
                            });
Jose Lopez*/
                            self.onSetLISTAMEC(oScoModel.getProperty("/COI2_PERSON_OF_WORKCENTER")[1].response.OUT_PERSONS);
                        }
                    });
                }
            
                utilController.initModelView(this);
            
                viewg = this.getView();
                tipoTrabajador = globalModel.getProperty("/tipoTrab");
                centro = globalModel.getProperty("/centro");
                puesto = globalModel.getProperty("/ptoTrab");
                trabajador = globalModel.getProperty("/trabajador");
                tipo = globalModel.getProperty("/tipo");

//Jose Lopez                    
                var oScoModel2 = new sap.ui.model.json.JSONModel();
                oScoModel2.loadData("model/data.json");

//                service.filtros(function (result) {
//                    self.onSetGTCentro(result.GT_CENTRO);
                    //console.log("CENTRO " + JSON.stringify(result.GT_CENTRO));
//                });
                oScoModel2.attachRequestCompleted(function(oEvent) {
                    self.onSetGTCentro(oScoModel2.getProperty("/Z278R_FILTROS_PICKING_FIORI/response/GT_CENTRO"));
                });

                //Se obtienen los motivos de detención
                this.getMotivos();
                utilController.property(this, "/PUESTOTRABAJO", [{
                    "ID": "MESECP",
                    "NOMBRE": "Camiones"
                }, {
                    "ID": "MESEMQ",
                    "NOMBRE": "Maquinaria"
                }, {
                    "ID": "MESEFR",
                    "NOMBRE": "Forestal"
                }]);
    
                if (trabajador === "") {
    
                    this.getView().byId("page").setTitle("TOTEM SELECCION DE USUARIO");
                    this.getView().byId("centro").setVisible(false);
                    this.getView().byId("tecnico").setVisible(false);
                    this.getView().byId("clientes").setVisible(false);
                    this.getView().byId("idpanelTitle").setVisible(true);
                    //this.getView().byId("idTittle").setVisible(true);
                    //	this.getView().byId("idIconTabBar").setVisible(false);
                    this.getView().byId("tablaTimer").setVisible(false);
    
                } else {
    
                    this.getView().byId("page").setTitle("Time Recording");
                    this.getView().byId("centro").setVisible(true);
                    this.getView().byId("tecnico").setVisible(true);
                    this.getView().byId("clientes").setVisible(true);
                    //	this.getView().byId("idpanelTitle").setVisible(false);
                    //		this.getView().byId("idTittle").setVisible(false);
                    //this.getView().byId("idIconTabBar").setVisible(true);
                    //		this.getView().byId("tablaTimer").setVisible(true);
    
                    utilController.property(this, "/GT_CENTROSEL", {
                        "WERKS": centro
                    });
                    utilController.property(this, "/PUESTOTRABAJOSEL", {
                        "ID": puesto
                    });
    
                    /////////////this.cambioPuesto();
    
                    this.getView().byId("DlgDetalle").close();
                    jQuery.sap.require("sap.ui.commons.MessageBox");
    
                    this.currentTimeLog = undefined;
    
                    var oModel = new sap.ui.model.json.JSONModel();
                    this.getView().setModel(oModel, "salfaopX");
    
                    this.clock = new Clock();
                    this.getView().setModel(this.clock.getModel(), "clock");
    
                    var that = this;
                    var binding;
                    var ord = {}; // = this.getOrdenes(false);
                    if (ord) {
                        //ord.selectedKey = -1;
                        oModel = new sap.ui.model.json.JSONModel(ord);
                        this.getView().setModel(oModel, "salfaotX");
                        binding = new sap.ui.model.Binding(oModel, "/", oModel.getContext("/"));
                        binding.attachChange(function () {
                            that.handleOtModelChanged("Model binding");
                        });
                        oModel.refresh();
                        this.getOrdenesAndSet(-1, -1, false); //obtengo las ordenes pero no selecciono ninguna por defecto (-1, -1)
                        this.setOtsVisibility();
                    }
    
                    //Se obtienen los motivos de detención
                    // this.getMotivos();
    
                    //Texto, color y estado del botón
                    this.setButtonStyle();
    
                    //se deshabilita la opción de escribir texto para filtrar en el combobox de ordenes
                    var comboOt = this.getView().byId("ot");
                    if (comboOt) {
                        comboOt.addEventDelegate({
                            onAfterRendering: function () {
                                comboOt.$().find("input").attr("readonly", true);
                            }
                        });
                    }
    
                    //se deshabilita la opción de escribir texto para filtrar en el combobox de operaciones
                    var comboOp = this.getView().byId("op");
                    if (comboOp) {
                        comboOt.addEventDelegate({
                            onAfterRendering: function () {
                                comboOp.$().find("input").attr("readonly", true);
                            }
                        });
                    }
    
                    //Verifico si hay alguna operación sin fecha fin para el usuario actual.
                    //en caso de que haya operación sin fecha fin, se setea el contador con la
                    //fecha de inicio y se inicia el reloj, ademar de inhabilitar los combobox
                    //de ordenes y operaciones
                    this.getAndHandleOperacionIncompleta();
    
                    //nombre de usuario y seteo en el header
                    this.getAndSetUserInfo();
    
                    oModel = new sap.ui.model.json.JSONModel({
                        text: ""
                    });
                    this.getView().setModel(oModel, "status");
    
                    //Cada X min, actualizo las ordenes y la pantalla
                    //1 seg = 1000, 1 min=60*1000
                    var refreshPeriod = 1000 * 60 * 5; //5 min
                    this.refreshIntervalId = setInterval(function () {
                        that.refreshOrdenes();
                    }, refreshPeriod);
    
                    //this.PopUpToConfirm("title", "message", function(){});
                }
                utilController.refreshModel(this);
                return;
                
            },

            onInit: function () {
                this.onMecs();
                var idUseraa = "ext_vides";//utils.getUser();
                var self = this;	
                var globalModel = sap.ui.getCore().getModel("globalModel");
                viewg = this.getView();
                
                var complete_url = window.location.href;
                var pieces = complete_url.split("?");
                if (pieces.length > 1)
                    var params = pieces[1].split("&");
                
                if(idUseraa.toString().toUpperCase() === "EXT_AORDONEZ@SALFA.CL"){
                       esJefe = false;
                    esTecnico = true;	
                }else{                    
                    $.each( params, function( key, value ) {
                        var param_value = value.split("=");
                        console.log( "Los parámetros son: " + key + ": " + value + " | " + param_value[1] );
                    //	alert(value.split("=")[0] + "-" + param_value[1] );
                        if(value.split("=")[0] === "Totem" && param_value[1] === "S"){
                            console.log("ES TOTEM");
                            esTotem = true;
                            esTecnico = false;
                            esTotem = false;
                            
                        }else if( (value.split("=")[0] === "tecnico" || value.split("=")[0] === "tenico") && param_value[1] === "S"){
                            viewg.byId("idIconTabBar").setVisible(false);
                            console.log("ES TECNICO");
                            esTecnico = true;
                            esTotem = false;
                            esJefe = false;
                            pstU1 = "RESECP";
                            pstU2 = "RESEMQ";
                        }else if(value.split("=")[0] === "JefeTaller" && param_value[1] === "S"){
                                viewg.byId("idIconTabBar").setVisible(true);
                            console.log("ES JEFE");
                            esJefe = true;
                            esTecnico = false;
                            esTotem = false;    			
                        }
                    });
                }	
                    
                var idUseraa = "ext_vides";//utils.getUser();
                
                //Para pruebas
                if(idUseraa.toString().toUpperCase() === "EXT_AORDONEZ@SALFA.CL"){
                    //test
                    idUseraa = "Cjamettna";
                //	idUseraa = "eaguileraer";
                //	idUseraa = "everdugoah";	
                //	idUseraa = "jucastro";
                //	idUseraa = "lsanmartinva";
                    
                //	idUseraa =  "Afigueroago";
                }
                
                idUsera = idUseraa;
                
                var that = this;
/*Jose Lopez                
                var timeout = jQuery.sap.delayedCall(10, this, function () {
                    var oFiltersAA = {
                        "I_IDUSER": idUseraa.toUpperCase().trim()
                    };
                    service.datosUsuario(oFiltersAA, function (resultU) {
                        
                        pernrg = resultU.E_USUARIO.PERSONAL_NUMBER;
                    //	console.log(JSON.stringify(result.T_DATEMPR));
                        console.log("===== EL NUMERO DE PERSONAL ES: " + pernrg);
                        console.log(resultU.E_USUARIO.PERSONAL_NUMBER);
                        pernrg = that.formatMiles(pernrg);
                        pernrg =  pernrg.replace(",", ".").replace(",", ".").replace(",", ".");
                        console.log(pernrg);
                        that.onPrincipal();
                        
                    });
                });	
Jose Lopez*/          
                var oScoModel = new sap.ui.model.json.JSONModel();
                oScoModel.loadData("model/data.json");
                oScoModel.attachRequestCompleted(function(oEvent) {
                    pernrg = oScoModel.getProperty("/ZPWD_004_DATUSER/response/E_USUARIO/PERSONAL_NUMBER");
                    pernrg = that.formatMiles(pernrg);
                    pernrg =  pernrg.replace(",", ".").replace(",", ".").replace(",", ".");
                    console.log(pernrg);
                    that.onPrincipal();
                }); 
            },

            formatMiles : function (numero){
		 
                return numero.toString()
                .replace(/((?!^)|(?:^|.*?[^\d.,])\d{1,3})(\d{3})(?=(?:\d{3})*(?!\d))/gy, "$1,$2");      
            },

            onSearch : function (oEvt) {

                // add filter for search
                var aFilters = [];
                var orFilter = [];
    
                var oFilter1 = [];
                var allFilters = [];
                var filters = [];
    
                var sQuery = oEvt.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                /*	var filter = new sap.ui.model.Filter("AUFNR", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                    var filter2 = new sap.ui.model.Filter("NOMBRE_CLIENTE", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter2);
                    
                    orFilter.push(new sap.ui.model.Filter("AUFNR", sap.ui.model.FilterOperator.Contains, "filtervalue"));
                    orFilter.push(new sap.ui.model.Filter("NOMBRE_CLIENTE", sap.ui.model.FilterOperator.Contains, "filtervalue"));
                */	
                    oFilter1 = [new sap.ui.model.Filter("AUFNR", sap.ui.model.FilterOperator.Contains, sQuery),new sap.ui.model.Filter("NOMBRE_CLIENTE", sap.ui.model.FilterOperator.Contains, sQuery)];
                    allFilters = new sap.ui.model.Filter(oFilter1, false);
                    filters.push(allFilters);
    
                }
    
                // update list binding
                var list = this.byId("tablaTimer");
                var binding = list.getBinding("items");
                binding.filter(filters, "Application");
            },    
            getDatoEmpr : function (datosEmprm, tipo) {
                var salida = "";
                for(var i=0; i < datosEmprm.length; i++){
                    if(datosEmprm[i].ID_TIPO === tipo){
                        salida = datosEmprm[i].VALOR;
                        break;
                    }
                }
                
                return salida;
            },
            
            buscarNombre : function (val) {
                var name = val;
                var objeto = utilController.property(this, "/LSTMEC");
                for(var i=0; i < objeto.length; i++ ){
                    if(objeto[i].PERNR.toString() === val.toString()){
                        name = objeto.STEXT;
                        break;
                    }
                }
                
                return name;
            },
            
            formatNombreMec : function (val) {
                
//                    console.log("Listado>>>>" + val);
//                    if(val.toString() === "26173316"){
//                            console.log("Listado2>>>>" + val);
//                    }
                var name = "";
                
                for(var i=0; i < mecCP.length; i++ ){
                    if(mecCP[i].PERNR.toString() === val.toString()){
                        name = mecCP[i].STEXT;
                        console.log("List_mecCP>>>>" + val);
                        break;
                    }
                }	
                
                for(var i=0; i < mecMQ.length; i++ ){
                    if(mecMQ[i].PERNR.toString() === val.toString()){
                        name = mecMQ[i].STEXT;
                        console.log("List_mecMQ>>>>" + val);
                        break;
                    }
                }
                
                for(var i=0; i < mecFR.length; i++ ){
                    if(mecFR[i].PERNR.toString() === val.toString()){
                        name = mecFR[i].STEXT;
                        console.log("List_mecFR>>>>" + val);
                        break;
                    }
                }					
                
                if("" === name){
                    return  val; 
                }else{
                    return name;
                }
            },
            
    
            onCargaGrilla: function () {
                
            //	this.cambioPuesto();
            
                clis = []; 
    
                var timeout = jQuery.sap.delayedCall(200, this, function () {
    
                    var self = this;
    
    
            //		self.getView().byId("idIconTabBar").setBusy(true);
                //	service.listaOrdenesCentroTR(oFilters, function (result) {
    
                        var contPos = 0;
                        var contEject = 0;
                        var contNoInic = 0;
                        var contDet = 0;
                        
                        if(esTecnico == false){
                            self.getView().byId("countOrden").setCount(resultTR.T_OT.length);
                            var timeout = jQuery.sap.delayedCall(1000, self, function () {
        
                                var tscp = "ME" + pstG.substring(2, pstG.length);
                                viewg.byId("puestosTrabajo2").setSelectedKey(tscp);
                                viewg.byId("puestosTrabajo").setSelectedKey(tscp);
                            
                                self.cambioPuesto();
                                self.cambioPuesto2();
                                
                                var orden1 = "";
        
                                for (var i = 0; i < resultTR.T_OT.length; i++) {
                                    
                                    if(clis.length === 0){
                                        clis.push(resultTR.T_OT[i]);
                                    }else{
                                        var sw=false;
                                        for(var u=0; u < clis.length; u++){
                                            if(clis[u].NOMBRE_CLIENTE === resultTR.T_OT[i].NOMBRE_CLIENTE){
                                                sw=true;
                                            }
                                        }
                                        if(!sw){
                                            clis.push(resultTR.T_OT[i]);
                                        } 
                                    }
                                    
        
                                    // 1.- preguntar si existe en las tablas de operaciones para dejar usuario pernr en técnico asignado
                                    // dejar automaticamente le id_motivo en -1 en T_OT
        
                                    // 2.- preguntar si existe en tabla timelog y actualizar el id motivo que está en time log en T_OT
        
                                    resultTR.T_OT[i].ICON = "sap-icon://employee";
                                    for (var j = 0; j < operacionesTR.data.length; j++) {
                                        if (parseInt(operacionesTR.data[j].AUFNR) === parseInt(resultTR.T_OT[i].AUFNR) &&
                                            parseInt(operacionesTR.data[j].APLZL) === parseInt(resultTR.T_OT[i].ACTIVITY)) {
        
                                            //alert(operacionesTR.data[j].MECANICO);
                                            
                                            resultTR.T_OT[i].ICON = "sap-icon://up";
                                            
                                            resultTR.T_OT[i].ID_MOTIVO = '-3'; // SIGNIFICA QUE LA OT ESTÁ ASIGNADA EN LA VISTA DEL JEFE Y NO INICIADA EN LA VISTA DEL MECÁNICO
                                            resultTR.T_OT[i].ID_MECANICO = operacionesTR.data[j].MECANICO;
                                            resultTR.T_OT[i].NOMBRE = operacionesTR.data[j].MECANICO;
        
                                            //console.log(parseInt(operacionesTR.data[j].APLZL) + " / " + parseInt(result.T_OT[i].ACTIVITY));
                                //			console.log("Se encontró orden: " + parseInt(operacionesTR.data[j].AUFNR) + " / " + parseInt(operacionesTR.data[j].APLZL) +
                                        //			" en indice: " + j + " timelog y sap...")
                                                // buscar con time log el último estado de esta operación
                                            var idOrden = parseInt(operacionesTR.data[j].ID_ORDEN);
                                            var idOper = parseInt(operacionesTR.data[j].ID);
        
                                    //		console.log("buscando en log... " + idOrden + " - " + idOper);
                                    //		console.log("LARGO TIMERLOG " + timeLogTR.data.length);
                                            for (var k = 0; k < timeLogTR.data.length; k++) {
                                                // console.log("COMPARANDO  " + timeLogTR.data[k].ID_ORDEN + "===" + idOrden + "     " + timeLogTR.data[k].ID_OPERACION +
                                                // 	"===" + idOper);
                                                if (parseInt(timeLogTR.data[k].ID_ORDEN) === idOrden && parseInt(timeLogTR.data[k].ID_OPERACION) === idOper) {
                                        //			console.log("Se encontró time log!!!!... EL ID MOTIVO ES: " + timeLogTR.data[k].ID_MOTIVO);
                                                    resultTR.T_OT[i].ID_MOTIVO = timeLogTR.data[k].ID_MOTIVO;
                                                    
                                                //	result.T_OT[i].ID_MOTIVO = timeLogTR.data[k].ID_MOTIVO;
                                                    
                                                    if(resultTR.T_OT[i].ID_MOTIVO.toString() === "-1"){
                                                        resultTR.T_OT[i].ICON = "sap-icon://hint";
                                                    }else{
                                                        resultTR.T_OT[i].ICON = "sap-icon://status-error";
                                                    }
                                                }
        
                                            }
                                        }
                                    }
        
                                    if (resultTR.T_OT[i].NOMBRE === "") {
                                        contPos++;
                                    } else {
                                        contEject++;
                                        contNoInic++;
                                        contDet++;
                                    }
                                }
                            
                            contPos = 0;
                            contEject = 0;
                            contNoInic = 0;
                            contDet = 0;
    
                            for (var i = 0; i < resultTR.T_OT.length; i++) {
                                if (String(resultTR.T_OT[i].ID_MOTIVO) === String("-1")) {
                                    contEject++;
                                } else if (String(resultTR.T_OT[i].ID_MOTIVO) === String("-2")) {
                                    contPos++;
                                } else if (String(resultTR.T_OT[i].ID_MOTIVO) === String("-3")) {
                                    contNoInic++;
                                } else if (String(resultTR.T_OT[i].ID_MOTIVO) !== String("-1") && String(resultTR.T_OT[i].ID_MOTIVO) !== String("-2") &&
                                    String(
                                        resultTR.T_OT[i].ID_MOTIVO) !== String("-3")) {
                                    contDet++;
                                }
    
                            }
    
                            self.onSetListaOrdenesTR(resultTR.T_OT);
                            self.onSetListaClientes(clis);
                            self.getView().byId("contPos").setCount(contPos); // sin asignar
                            self.getView().byId("contEject").setCount(contEject); // en ejecucion
                            //self.getView().byId("contNoInic").setCount(contNoInic); // no iniciado
                            //self.getView().byId("contDet").setCount(contDet); // detención
                            self.getView().byId("contNoInic").setCount(contNoInic); // no iniciado
                            self.getView().byId("contDet").setCount(contDet); // detención						
                            var timeout = jQuery.sap.delayedCall(1000, self, function () {
                                self.getView().byId("idIconTabBar").setBusy(false);
                                self.getView().byId("BusyDialogG").close();
                            });
                        });
                         }else{
                            
                            self.getView().byId("countOrden").setCount(resultTR.data.OUT_LISTA.length);
                            var timeout = jQuery.sap.delayedCall(1000, self, function () {
        
                                var tscp = "ME" + pstG.substring(2, pstG.length);
                                viewg.byId("puestosTrabajo2").setSelectedKey(tscp);
                                viewg.byId("puestosTrabajo").setSelectedKey(tscp);
                            
                                self.cambioPuesto();
                                self.cambioPuesto2();
                                
                                var orden1 = "";
                                
                            //	console.log("operacionesTR ---->>>>> "+JSON.stringify(operacionesTR));
        
                                // for (var i = 0; i < resultTR.data.OUT_LISTA.length; i++) {
                                // // 	//console.log("FOR  TR LARGO TR---->>>>> "+resultTR.data.OUT_LISTA.length);
                                // // 	console.log("FOR  TR LARGO TR---->>>>> "+resultTR.data.OUT_LISTA[i]);
                                //  	if(clis.length === 0){
                                // 		clis.push(resultTR.data.OUT_LISTA[i]);
                                // 	}else{
                                // 		var sw=false;
                                // 		for(var u=0; u < clis.length; u++){
                                // 			if(clis[u].NOMBRE_CLIENTE === resultTR.data.OUT_LISTA[i].NOMBRE_CLIENTE){
                                // 				sw=true;
                                // 			}
                                // 		}
                                // 		if(!sw){
                                // 			clis.push(resultTR.data[i]);
                                // 		} 
                                // 	}
                                    
        
                                // 	// 1.- preguntar si existe en las tablas de operaciones para dejar usuario pernr en técnico asignado
                                // 	// dejar automaticamente le id_motivo en -1 en T_OT
        
                                // 	// 2.- preguntar si existe en tabla timelog y actualizar el id motivo que está en time log en T_OT
        
                                // 	resultTR.data.OUT_LISTA[i].ICON = "sap-icon://employee";
                                    
                                // 	for (var j = 0; j < operacionesTR.data.length; j++) {
                                // 			console.log("FOR  operacionesTR ---->>>>> 2222   "+operacionesTR.data[j].APLZL +" ===== "+ resultTR.data.OUT_LISTA[i].ACTIVITY +"===="+resultTR.data.OUT_LISTA[i].AUFNR +"======"+ operacionesTR.data[j].AUFNR);
                                // 		if (parseInt(operacionesTR.data[j].AUFNR) === parseInt(resultTR.data.OUT_LISTA[i].AUFNR) &&
                                // 			parseInt(operacionesTR.data[j].APLZL) === parseInt(resultTR.data.OUT_LISTA[i].ACTIVITY)) {
                                // 			console.log(i);
                                // 			//alert(operacionesTR.data[j].MECANICO);
                                            
                                // 			resultTR.data.OUT_LISTA[i].ICON = "sap-icon://up";
                                            
                                // 			resultTR.data.OUT_LISTA[i].ID_MOTIVO = '-3'; // SIGNIFICA QUE LA OT ESTÁ ASIGNADA EN LA VISTA DEL JEFE Y NO INICIADA EN LA VISTA DEL MECÁNICO
                                // 			resultTR.data.OUT_LISTA[i].ID_MECANICO = operacionesTR.data[j].MECANICO;
                                // 			resultTR.data.OUT_LISTA[i].NOMBRE = operacionesTR.data[j].MECANICO;
        
                                // 			//console.log(parseInt(operacionesTR.data[j].APLZL) + " / " + parseInt(result.T_OT[i].ACTIVITY));
                                // //			console.log("Se encontró orden: " + parseInt(operacionesTR.data[j].AUFNR) + " / " + parseInt(operacionesTR.data[j].APLZL) +
                                // 		//			" en indice: " + j + " timelog y sap...")
                                // 				// buscar con time log el último estado de esta operación
                                // 			var idOrden = parseInt(operacionesTR.data[j].ID_ORDEN);
                                // 			var idOper = parseInt(operacionesTR.data[j].ID);
        
                                // 	//		console.log("buscando en log... " + idOrden + " - " + idOper);
                                // 	//		console.log("LARGO TIMERLOG " + timeLogTR.data.length);
                                // 			for (var k = 0; k < timeLogTR.data.length; k++) {
                                // 					console.log("FOR  operacionesTR ---->>>>> 333333");
                                // 				// console.log("COMPARANDO  " + timeLogTR.data[k].ID_ORDEN + "===" + idOrden + "     " + timeLogTR.data[k].ID_OPERACION +
                                // 				// 	"===" + idOper);
                                // 				if (parseInt(timeLogTR.data[k].ID_ORDEN) === idOrden && parseInt(timeLogTR.data[k].ID_OPERACION) === idOper) {
                                // 		//			console.log("Se encontró time log!!!!... EL ID MOTIVO ES: " + timeLogTR.data[k].ID_MOTIVO);
                                // 					resultTR.data.OUT_LISTA[i].ID_MOTIVO = timeLogTR.data[k].ID_MOTIVO;
                                                    
                                // 				//	result.T_OT[i].ID_MOTIVO = timeLogTR.data[k].ID_MOTIVO;
                                                    
                                // 					if(resultTR.data.OUT_LISTA[i].ID_MOTIVO.toString() === "-1"){
                                // 						resultTR.data.OUT_LISTA[i].ICON = "sap-icon://hint";
                                // 					}else{
                                // 						resultTR.data.OUT_LISTA[i].ICON = "sap-icon://status-error";
                                // 					}
                                // 				}
        
                                // 			}
                                // 		}
                                // 	}
        
                                // 	if (resultTR.data.OUT_LISTA[i].NOMBRE === "") {
                                // 		contPos++;
                                // 	} else {
                                // 		contEject++;
                                // 		contNoInic++;
                                // 		contDet++;
                                // 	}
                                // }
                            
                            contPos = 0;
                            contEject = 0;
                            contNoInic = 0;
                            contDet = 0;
    
                            for (var i = 0; i < resultTR.data.OUT_LISTA.length; i++) {
                                if (String(resultTR.data.OUT_LISTA[i].ID_MOTIVO) === String("-1")) {
                                    contEject++;
                                } else if (String(resultTR.data.OUT_LISTA[i].ID_MOTIVO) === String("-2")) {
                                    contPos++;
                                } else if (String(resultTR.data.OUT_LISTA[i].ID_MOTIVO) === String("-3")) {
                                    contNoInic++;
                                } else if (String(resultTR.data.OUT_LISTA[i].ID_MOTIVO) !== String("-1") && String(resultTR.data.OUT_LISTA[i].ID_MOTIVO) !== String("-2") &&
                                    String(
                                        resultTR.data.OUT_LISTA[i].ID_MOTIVO) !== String("-3")) {
                                    contDet++;
                                }
    
                            }
                            
            //				console.log("-----> "+JSON.stringify(resultTR.data.OUT_LISTA));	
                            self.onSetListaOrdenesTR(resultTR.data.OUT_LISTA);
                            //self.onSetListaClientes(clis);
                            self.getView().byId("contPos").setCount(contPos); // sin asignar
                            self.getView().byId("contEject").setCount(contEject); // en ejecucion
                            //self.getView().byId("contNoInic").setCount(contNoInic); // no iniciado
                            //self.getView().byId("contDet").setCount(contDet); // detención
                            self.getView().byId("contNoInic").setCount(contNoInic); // no iniciado
                            self.getView().byId("contDet").setCount(contDet); // detención						
                            var timeout = jQuery.sap.delayedCall(1000, self, function () {
                                self.getView().byId("idIconTabBar").setBusy(false);
                                self.getView().byId("BusyDialogG").close();
                            });
                        });	
                        }
                //	});
    
                });
            },
            
    
            onCargaGrillaIni: function () {
                
            //	this.cambioPuesto();
            
                clis = []; 
    
                var timeout = jQuery.sap.delayedCall(200, this, function () {
    
                    var self = this;
    
    
            //		self.getView().byId("idIconTabBar").setBusy(true);
                //	service.listaOrdenesCentroTR(oFilters, function (result) {
    
                        var contPos = 0;
                        var contEject = 0;
                        var contNoInic = 0;
                        var contDet = 0;
                        
                        if(esTecnico == false){
                            self.getView().byId("countOrden").setCount(resultTR.T_OT.length);
                            var timeout = jQuery.sap.delayedCall(1000, self, function () {
        
                                var tscp = "ME" + pstG.substring(2, pstG.length);
                                viewg.byId("puestosTrabajo2").setSelectedKey(tscp);
                                viewg.byId("puestosTrabajo").setSelectedKey(tscp);
                            
                                self.cambioPuesto();
                                self.cambioPuesto2();
                                
                                var orden1 = "";
        
                                for (var i = 0; i < resultTR.T_OT.length; i++) {
                                    
                                    if(clis.length === 0){
                                        clis.push(resultTR.T_OT[i]);
                                    }else{
                                        var sw=false;
                                        for(var u=0; u < clis.length; u++){
                                            if(clis[u].NOMBRE_CLIENTE === resultTR.T_OT[i].NOMBRE_CLIENTE){
                                                sw=true;
                                            }
                                        }
                                        if(!sw){
                                            clis.push(resultTR.T_OT[i]);
                                        } 
                                    }
                                    
        
                                    // 1.- preguntar si existe en las tablas de operaciones para dejar usuario pernr en técnico asignado
                                    // dejar automaticamente le id_motivo en -1 en T_OT
        
                                    // 2.- preguntar si existe en tabla timelog y actualizar el id motivo que está en time log en T_OT
        
                                    resultTR.T_OT[i].ICON = "sap-icon://employee";
                                    for (var j = 0; j < operacionesTR.data.length; j++) {
                                        if (parseInt(operacionesTR.data[j].AUFNR) === parseInt(resultTR.T_OT[i].AUFNR) &&
                                            parseInt(operacionesTR.data[j].APLZL) === parseInt(resultTR.T_OT[i].ACTIVITY)) {
        
                                            //alert(operacionesTR.data[j].MECANICO);
                                            
                                            resultTR.T_OT[i].ICON = "sap-icon://up";
                                            
                                            resultTR.T_OT[i].ID_MOTIVO = '-3'; // SIGNIFICA QUE LA OT ESTÁ ASIGNADA EN LA VISTA DEL JEFE Y NO INICIADA EN LA VISTA DEL MECÁNICO
                                            resultTR.T_OT[i].ID_MECANICO = operacionesTR.data[j].MECANICO;
                                            resultTR.T_OT[i].NOMBRE = operacionesTR.data[j].MECANICO;
        
                                            //console.log(parseInt(operacionesTR.data[j].APLZL) + " / " + parseInt(result.T_OT[i].ACTIVITY));
                                //			console.log("Se encontró orden: " + parseInt(operacionesTR.data[j].AUFNR) + " / " + parseInt(operacionesTR.data[j].APLZL) +
                                        //			" en indice: " + j + " timelog y sap...")
                                                // buscar con time log el último estado de esta operación
                                            var idOrden = parseInt(operacionesTR.data[j].ID_ORDEN);
                                            var idOper = parseInt(operacionesTR.data[j].ID);
        
                                    //		console.log("buscando en log... " + idOrden + " - " + idOper);
                                    //		console.log("LARGO TIMERLOG " + timeLogTR.data.length);
                                            for (var k = 0; k < timeLogTR.data.length; k++) {
                                                // console.log("COMPARANDO  " + timeLogTR.data[k].ID_ORDEN + "===" + idOrden + "     " + timeLogTR.data[k].ID_OPERACION +
                                                // 	"===" + idOper);
                                                if (parseInt(timeLogTR.data[k].ID_ORDEN) === idOrden && parseInt(timeLogTR.data[k].ID_OPERACION) === idOper) {
                                        //			console.log("Se encontró time log!!!!... EL ID MOTIVO ES: " + timeLogTR.data[k].ID_MOTIVO);
                                                    resultTR.T_OT[i].ID_MOTIVO = timeLogTR.data[k].ID_MOTIVO;
                                                    
                                                //	result.T_OT[i].ID_MOTIVO = timeLogTR.data[k].ID_MOTIVO;
                                                    
                                                    if(resultTR.T_OT[i].ID_MOTIVO.toString() === "-1"){
                                                        resultTR.T_OT[i].ICON = "sap-icon://hint";
                                                    }else{
                                                        resultTR.T_OT[i].ICON = "sap-icon://status-error";
                                                    }
                                                }
        
                                            }
                                        }
                                    }
        
                                    if (resultTR.T_OT[i].NOMBRE === "") {
                                        contPos++;
                                    } else {
                                        contEject++;
                                        contNoInic++;
                                        contDet++;
                                    }
                                }
                            
                            contPos = 0;
                            contEject = 0;
                            contNoInic = 0;
                            contDet = 0;
    
                            for (var i = 0; i < resultTR.T_OT.length; i++) {
                                if (String(resultTR.T_OT[i].ID_MOTIVO) === String("-1")) {
                                    contEject++;
                                } else if (String(resultTR.T_OT[i].ID_MOTIVO) === String("-2")) {
                                    contPos++;
                                } else if (String(resultTR.T_OT[i].ID_MOTIVO) === String("-3")) {
                                    contNoInic++;
                                } else if (String(resultTR.T_OT[i].ID_MOTIVO) !== String("-1") && String(resultTR.T_OT[i].ID_MOTIVO) !== String("-2") &&
                                    String(
                                        resultTR.T_OT[i].ID_MOTIVO) !== String("-3")) {
                                    contDet++;
                                }
    
                            }
    
                            self.onSetListaOrdenesTR(resultTR.T_OT);
                            self.onSetListaClientes(clis);
                            self.getView().byId("contPos").setCount(contPos); // sin asignar
                            self.getView().byId("contEject").setCount(contEject); // en ejecucion
                            //self.getView().byId("contNoInic").setCount(contNoInic); // no iniciado
                            //self.getView().byId("contDet").setCount(contDet); // detención
                            self.getView().byId("contNoInic").setCount(contNoInic); // no iniciado
                            self.getView().byId("contDet").setCount(contDet); // detención						
                            var timeout = jQuery.sap.delayedCall(1000, self, function () {
                                self.getView().byId("idIconTabBar").setBusy(false);
                                self.getView().byId("BusyDialogG").close();
                            });
                            
                            self.mostrarOrdenesPorPERNR();
                        });
                         }else{
                            
                            self.getView().byId("countOrden").setCount(resultTR.data.OUT_LISTA.length);
                            var timeout = jQuery.sap.delayedCall(1000, self, function () {
        
                                var tscp = "ME" + pstG.substring(2, pstG.length);
                                viewg.byId("puestosTrabajo2").setSelectedKey(tscp);
                                viewg.byId("puestosTrabajo").setSelectedKey(tscp);
                            
                                self.cambioPuesto();
                                self.cambioPuesto2();
                                
                                var orden1 = "";
                                
                            //	console.log("operacionesTR ---->>>>> "+JSON.stringify(operacionesTR));
        
                                // for (var i = 0; i < resultTR.data.OUT_LISTA.length; i++) {
                                // // 	//console.log("FOR  TR LARGO TR---->>>>> "+resultTR.data.OUT_LISTA.length);
                                // // 	console.log("FOR  TR LARGO TR---->>>>> "+resultTR.data.OUT_LISTA[i]);
                                //  	if(clis.length === 0){
                                // 		clis.push(resultTR.data.OUT_LISTA[i]);
                                // 	}else{
                                // 		var sw=false;
                                // 		for(var u=0; u < clis.length; u++){
                                // 			if(clis[u].NOMBRE_CLIENTE === resultTR.data.OUT_LISTA[i].NOMBRE_CLIENTE){
                                // 				sw=true;
                                // 			}
                                // 		}
                                // 		if(!sw){
                                // 			clis.push(resultTR.data[i]);
                                // 		} 
                                // 	}
                                    
        
                                // 	// 1.- preguntar si existe en las tablas de operaciones para dejar usuario pernr en técnico asignado
                                // 	// dejar automaticamente le id_motivo en -1 en T_OT
        
                                // 	// 2.- preguntar si existe en tabla timelog y actualizar el id motivo que está en time log en T_OT
        
                                // 	resultTR.data.OUT_LISTA[i].ICON = "sap-icon://employee";
                                    
                                // 	for (var j = 0; j < operacionesTR.data.length; j++) {
                                // 			console.log("FOR  operacionesTR ---->>>>> 2222   "+operacionesTR.data[j].APLZL +" ===== "+ resultTR.data.OUT_LISTA[i].ACTIVITY +"===="+resultTR.data.OUT_LISTA[i].AUFNR +"======"+ operacionesTR.data[j].AUFNR);
                                // 		if (parseInt(operacionesTR.data[j].AUFNR) === parseInt(resultTR.data.OUT_LISTA[i].AUFNR) &&
                                // 			parseInt(operacionesTR.data[j].APLZL) === parseInt(resultTR.data.OUT_LISTA[i].ACTIVITY)) {
                                // 			console.log(i);
                                // 			//alert(operacionesTR.data[j].MECANICO);
                                            
                                // 			resultTR.data.OUT_LISTA[i].ICON = "sap-icon://up";
                                            
                                // 			resultTR.data.OUT_LISTA[i].ID_MOTIVO = '-3'; // SIGNIFICA QUE LA OT ESTÁ ASIGNADA EN LA VISTA DEL JEFE Y NO INICIADA EN LA VISTA DEL MECÁNICO
                                // 			resultTR.data.OUT_LISTA[i].ID_MECANICO = operacionesTR.data[j].MECANICO;
                                // 			resultTR.data.OUT_LISTA[i].NOMBRE = operacionesTR.data[j].MECANICO;
        
                                // 			//console.log(parseInt(operacionesTR.data[j].APLZL) + " / " + parseInt(result.T_OT[i].ACTIVITY));
                                // //			console.log("Se encontró orden: " + parseInt(operacionesTR.data[j].AUFNR) + " / " + parseInt(operacionesTR.data[j].APLZL) +
                                // 		//			" en indice: " + j + " timelog y sap...")
                                // 				// buscar con time log el último estado de esta operación
                                // 			var idOrden = parseInt(operacionesTR.data[j].ID_ORDEN);
                                // 			var idOper = parseInt(operacionesTR.data[j].ID);
        
                                // 	//		console.log("buscando en log... " + idOrden + " - " + idOper);
                                // 	//		console.log("LARGO TIMERLOG " + timeLogTR.data.length);
                                // 			for (var k = 0; k < timeLogTR.data.length; k++) {
                                // 					console.log("FOR  operacionesTR ---->>>>> 333333");
                                // 				// console.log("COMPARANDO  " + timeLogTR.data[k].ID_ORDEN + "===" + idOrden + "     " + timeLogTR.data[k].ID_OPERACION +
                                // 				// 	"===" + idOper);
                                // 				if (parseInt(timeLogTR.data[k].ID_ORDEN) === idOrden && parseInt(timeLogTR.data[k].ID_OPERACION) === idOper) {
                                // 		//			console.log("Se encontró time log!!!!... EL ID MOTIVO ES: " + timeLogTR.data[k].ID_MOTIVO);
                                // 					resultTR.data.OUT_LISTA[i].ID_MOTIVO = timeLogTR.data[k].ID_MOTIVO;
                                                    
                                // 				//	result.T_OT[i].ID_MOTIVO = timeLogTR.data[k].ID_MOTIVO;
                                                    
                                // 					if(resultTR.data.OUT_LISTA[i].ID_MOTIVO.toString() === "-1"){
                                // 						resultTR.data.OUT_LISTA[i].ICON = "sap-icon://hint";
                                // 					}else{
                                // 						resultTR.data.OUT_LISTA[i].ICON = "sap-icon://status-error";
                                // 					}
                                // 				}
        
                                // 			}
                                // 		}
                                // 	}
        
                                // 	if (resultTR.data.OUT_LISTA[i].NOMBRE === "") {
                                // 		contPos++;
                                // 	} else {
                                // 		contEject++;
                                // 		contNoInic++;
                                // 		contDet++;
                                // 	}
                                // }
                            
                            contPos = 0;
                            contEject = 0;
                            contNoInic = 0;
                            contDet = 0;
    
                            for (var i = 0; i < resultTR.data.OUT_LISTA.length; i++) {
                                if (String(resultTR.data.OUT_LISTA[i].ID_MOTIVO) === String("-1")) {
                                    contEject++;
                                } else if (String(resultTR.data.OUT_LISTA[i].ID_MOTIVO) === String("-2")) {
                                    contPos++;
                                } else if (String(resultTR.data.OUT_LISTA[i].ID_MOTIVO) === String("-3")) {
                                    contNoInic++;
                                } else if (String(resultTR.data.OUT_LISTA[i].ID_MOTIVO) !== String("-1") && String(resultTR.data.OUT_LISTA[i].ID_MOTIVO) !== String("-2") &&
                                    String(
                                        resultTR.data.OUT_LISTA[i].ID_MOTIVO) !== String("-3")) {
                                    contDet++;
                                }
    
                            }
                            
            //				console.log("-----> "+JSON.stringify(resultTR.data.OUT_LISTA));	
                            self.onSetListaOrdenesTR(resultTR.data.OUT_LISTA);
                            //self.onSetListaClientes(clis);
                            self.getView().byId("contPos").setCount(contPos); // sin asignar
                            self.getView().byId("contEject").setCount(contEject); // en ejecucion
                            //self.getView().byId("contNoInic").setCount(contNoInic); // no iniciado
                            //self.getView().byId("contDet").setCount(contDet); // detención
                            self.getView().byId("contNoInic").setCount(contNoInic); // no iniciado
                            self.getView().byId("contDet").setCount(contDet); // detención						
                            var timeout = jQuery.sap.delayedCall(1000, self, function () {
                                self.getView().byId("idIconTabBar").setBusy(false);
                                self.getView().byId("BusyDialogG").close();
                            });
                        });	
                        }
                //	});
    
                });
            },
                    
    
    
            onCargaGrilla2: function () {
                
            //	this.cambioPuesto();
            
                clis = []; 
    
                var timeout = jQuery.sap.delayedCall(50, this, function () {
    
                    var self = this;
    
    
            //		self.getView().byId("idIconTabBar").setBusy(true);
                //	service.listaOrdenesCentroTR(oFilters, function (result) {
    
                        var contPos = 0;
                        var contEject = 0;
                        var contNoInic = 0;
                        var contDet = 0;
                        
    
                        self.getView().byId("countOrden").setCount(resultTR.T_OT.length);
                        var timeout = jQuery.sap.delayedCall(50, self, function () {
    
                            var tscp = "ME" + pstG.substring(2, pstG.length);
                            viewg.byId("puestosTrabajo2").setSelectedKey(tscp);
                            viewg.byId("puestosTrabajo").setSelectedKey(tscp);
                        
                            self.cambioPuesto();
                            self.cambioPuesto2();
                            var orden1 = "";
    
                            for (var i = 0; i < resultTR.T_OT.length; i++) {
                                
                                if(clis.length === 0){
                                    clis.push(resultTR.T_OT[i]);
                                }else{
                                    var sw=false;
                                    for(var u=0; u < clis.length; u++){
                                        if(clis[u].NOMBRE_CLIENTE === resultTR.T_OT[i].NOMBRE_CLIENTE){
                                            sw=true;
                                        }
                                    }
                                    if(!sw){
                                        clis.push(resultTR.T_OT[i]);
                                    } 
                                }
                                
    
                                // 1.- preguntar si existe en las tablas de operaciones para dejar usuario pernr en técnico asignado
                                // dejar automaticamente le id_motivo en -1 en T_OT
    
                                // 2.- preguntar si existe en tabla timelog y actualizar el id motivo que está en time log en T_OT
    
                                resultTR.T_OT[i].ICON = "sap-icon://employee";
                                for (var j = 0; j < operacionesTR.data.length; j++) {
                                    if (parseInt(operacionesTR.data[j].AUFNR) === parseInt(resultTR.T_OT[i].AUFNR) &&
                                        parseInt(operacionesTR.data[j].APLZL) === parseInt(resultTR.T_OT[i].ACTIVITY)) {
    
                                        //alert(operacionesTR.data[j].MECANICO);
                                        
                                        resultTR.T_OT[i].ICON = "sap-icon://up";
                                        
                                        resultTR.T_OT[i].ID_MOTIVO = '-3'; // SIGNIFICA QUE LA OT ESTÁ ASIGNADA EN LA VISTA DEL JEFE Y NO INICIADA EN LA VISTA DEL MECÁNICO
                                        resultTR.T_OT[i].ID_MECANICO = operacionesTR.data[j].MECANICO;
                                        resultTR.T_OT[i].NOMBRE = operacionesTR.data[j].MECANICO;
    
                                        //console.log(parseInt(operacionesTR.data[j].APLZL) + " / " + parseInt(result.T_OT[i].ACTIVITY));
                            //			console.log("Se encontró orden: " + parseInt(operacionesTR.data[j].AUFNR) + " / " + parseInt(operacionesTR.data[j].APLZL) +
                                    //			" en indice: " + j + " timelog y sap...")
                                            // buscar con time log el último estado de esta operación
                                        var idOrden = parseInt(operacionesTR.data[j].ID_ORDEN);
                                        var idOper = parseInt(operacionesTR.data[j].ID);
    
                                //		console.log("buscando en log... " + idOrden + " - " + idOper);
                                //		console.log("LARGO TIMERLOG " + timeLogTR.data.length);
                                        for (var k = 0; k < timeLogTR.data.length; k++) {
                                            // console.log("COMPARANDO  " + timeLogTR.data[k].ID_ORDEN + "===" + idOrden + "     " + timeLogTR.data[k].ID_OPERACION +
                                            // 	"===" + idOper);
                                            if (parseInt(timeLogTR.data[k].ID_ORDEN) === idOrden && parseInt(timeLogTR.data[k].ID_OPERACION) === idOper) {
                                    //			console.log("Se encontró time log!!!!... EL ID MOTIVO ES: " + timeLogTR.data[k].ID_MOTIVO);
                                                resultTR.T_OT[i].ID_MOTIVO = timeLogTR.data[k].ID_MOTIVO;
                                                
                                            //	result.T_OT[i].ID_MOTIVO = timeLogTR.data[k].ID_MOTIVO;
                                                
                                                if(resultTR.T_OT[i].ID_MOTIVO.toString() === "-1"){
                                                    resultTR.T_OT[i].ICON = "sap-icon://hint";
                                                }else{
                                                    resultTR.T_OT[i].ICON = "sap-icon://status-error";
                                                }
                                            }
    
                                        }
                                    }
                                }
    
                                if (resultTR.T_OT[i].NOMBRE === "") {
                                    contPos++;
                                } else {
                                    contEject++;
                                    contNoInic++;
                                    contDet++;
                                }
                            }
    
                            contPos = 0;
                            contEject = 0;
                            contNoInic = 0;
                            contDet = 0;
    
                            for (var i = 0; i < resultTR.T_OT.length; i++) {
                                if (String(resultTR.T_OT[i].ID_MOTIVO) === String("-1")) {
                                    contEject++;
                                } else if (String(resultTR.T_OT[i].ID_MOTIVO) === String("-2")) {
                                    contPos++;
                                } else if (String(resultTR.T_OT[i].ID_MOTIVO) === String("-3")) {
                                    contNoInic++;
                                } else if (String(resultTR.T_OT[i].ID_MOTIVO) !== String("-1") && String(resultTR.T_OT[i].ID_MOTIVO) !== String("-2") &&
                                    String(
                                        resultTR.T_OT[i].ID_MOTIVO) !== String("-3")) {
                                    contDet++;
                                }
    
                            }
    
                            self.onSetListaOrdenesTR(resultTR.T_OT);
                            self.onSetListaClientes(clis);
                            self.getView().byId("contPos").setCount(contPos); // sin asignar
                            self.getView().byId("contEject").setCount(contEject); // en ejecucion
                            //self.getView().byId("contNoInic").setCount(contNoInic); // no iniciado
                            //self.getView().byId("contDet").setCount(contDet); // detención
                            self.getView().byId("contNoInic").setCount(contNoInic); // no iniciado
                            self.getView().byId("contDet").setCount(contDet); // detención		
                            self.mostrarOrdenesPorPERNR();
                            var timeout = jQuery.sap.delayedCall(50, self, function () {
                                self.getView().byId("idIconTabBar").setBusy(false);
                                self.getView().byId("BusyDialogG").close();
                            });
                        });
                //	});
    
                });
            },		
            
            
    
            onCargaGrillaJT: function () {
                
            //	this.cambioPuesto();
            
                clis = []; 
    
                var timeout = jQuery.sap.delayedCall(50, this, function () {
    
                    var self = this;
    
    
            //		self.getView().byId("idIconTabBar").setBusy(true);
                //	service.listaOrdenesCentroTR(oFilters, function (result) {
    
                        var contPos = 0;
                        var contEject = 0;
                        var contNoInic = 0;
                        var contDet = 0;
                        
    
                        self.getView().byId("countOrden").setCount(resultTR.T_OT.length);
                        var timeout = jQuery.sap.delayedCall(50, self, function () {
    
                            var tscp = "ME" + pstG.substring(2, pstG.length);
                            viewg.byId("puestosTrabajo2").setSelectedKey(tscp);
                            viewg.byId("puestosTrabajo").setSelectedKey(tscp);
                        
                            self.cambioPuesto();
                            self.cambioPuesto2();
                            var orden1 = "";
    
                            for (var i = 0; i < resultTR.T_OT.length; i++) {
                                
                                if(clis.length === 0){
                                    clis.push(resultTR.T_OT[i]);
                                }else{
                                    var sw=false;
                                    for(var u=0; u < clis.length; u++){
                                        if(clis[u].NOMBRE_CLIENTE === resultTR.T_OT[i].NOMBRE_CLIENTE){
                                            sw=true;
                                        }
                                    }
                                    if(!sw){
                                        clis.push(resultTR.T_OT[i]);
                                    } 
                                }
                                
    
                                // 1.- preguntar si existe en las tablas de operaciones para dejar usuario pernr en técnico asignado
                                // dejar automaticamente le id_motivo en -1 en T_OT
    
                                // 2.- preguntar si existe en tabla timelog y actualizar el id motivo que está en time log en T_OT
    
                                resultTR.T_OT[i].ICON = "sap-icon://employee";
                                for (var j = 0; j < operacionesTR.data.length; j++) {
                                    if (parseInt(operacionesTR.data[j].AUFNR) === parseInt(resultTR.T_OT[i].AUFNR) &&
                                        parseInt(operacionesTR.data[j].APLZL) === parseInt(resultTR.T_OT[i].ACTIVITY)) {
    
                                        //alert(operacionesTR.data[j].MECANICO);
                                        
                                        resultTR.T_OT[i].ICON = "sap-icon://up";
                                        
                                        resultTR.T_OT[i].ID_MOTIVO = '-3'; // SIGNIFICA QUE LA OT ESTÁ ASIGNADA EN LA VISTA DEL JEFE Y NO INICIADA EN LA VISTA DEL MECÁNICO
                                        resultTR.T_OT[i].ID_MECANICO = operacionesTR.data[j].MECANICO;
                                        resultTR.T_OT[i].NOMBRE = operacionesTR.data[j].MECANICO;
    
                                        //console.log(parseInt(operacionesTR.data[j].APLZL) + " / " + parseInt(result.T_OT[i].ACTIVITY));
                            //			console.log("Se encontró orden: " + parseInt(operacionesTR.data[j].AUFNR) + " / " + parseInt(operacionesTR.data[j].APLZL) +
                                    //			" en indice: " + j + " timelog y sap...")
                                            // buscar con time log el último estado de esta operación
                                        var idOrden = parseInt(operacionesTR.data[j].ID_ORDEN);
                                        var idOper = parseInt(operacionesTR.data[j].ID);
    
                                //		console.log("buscando en log... " + idOrden + " - " + idOper);
                                //		console.log("LARGO TIMERLOG " + timeLogTR.data.length);
                                        for (var k = 0; k < timeLogTR.data.length; k++) {
                                            // console.log("COMPARANDO  " + timeLogTR.data[k].ID_ORDEN + "===" + idOrden + "     " + timeLogTR.data[k].ID_OPERACION +
                                            // 	"===" + idOper);
                                            if (parseInt(timeLogTR.data[k].ID_ORDEN) === idOrden && parseInt(timeLogTR.data[k].ID_OPERACION) === idOper) {
                                    //			console.log("Se encontró time log!!!!... EL ID MOTIVO ES: " + timeLogTR.data[k].ID_MOTIVO);
                                                resultTR.T_OT[i].ID_MOTIVO = timeLogTR.data[k].ID_MOTIVO;
                                                
                                            //	result.T_OT[i].ID_MOTIVO = timeLogTR.data[k].ID_MOTIVO;
                                                
                                                if(resultTR.T_OT[i].ID_MOTIVO.toString() === "-1"){
                                                    resultTR.T_OT[i].ICON = "sap-icon://hint";
                                                }else{
                                                    resultTR.T_OT[i].ICON = "sap-icon://status-error";
                                                }
                                            }
    
                                        }
                                    }
                                }
    
                                if (resultTR.T_OT[i].NOMBRE === "") {
                                    contPos++;
                                } else {
                                    contEject++;
                                    contNoInic++;
                                    contDet++;
                                }
                            }
    
                            contPos = 0;
                            contEject = 0;
                            contNoInic = 0;
                            contDet = 0;
    
                            for (var i = 0; i < resultTR.T_OT.length; i++) {
                                if (String(resultTR.T_OT[i].ID_MOTIVO) === String("-1")) {
                                    contEject++;
                                } else if (String(resultTR.T_OT[i].ID_MOTIVO) === String("-2")) {
                                    contPos++;
                                } else if (String(resultTR.T_OT[i].ID_MOTIVO) === String("-3")) {
                                    contNoInic++;
                                } else if (String(resultTR.T_OT[i].ID_MOTIVO) !== String("-1") && String(resultTR.T_OT[i].ID_MOTIVO) !== String("-2") &&
                                    String(
                                        resultTR.T_OT[i].ID_MOTIVO) !== String("-3")) {
                                    contDet++;
                                }
    
                            }
    
                            self.onSetListaOrdenesTR(resultTR.T_OT);
                            self.onSetListaClientes(clis);
                            self.getView().byId("contPos").setCount(contPos); // sin asignar
                            self.getView().byId("contEject").setCount(contEject); // en ejecucion
                            //self.getView().byId("contNoInic").setCount(contNoInic); // no iniciado
                            //self.getView().byId("contDet").setCount(contDet); // detención
                            self.getView().byId("contNoInic").setCount(contNoInic); // no iniciado
                            self.getView().byId("contDet").setCount(contDet); // detención		
                    
                            for (var zz = 0; zz < resultTR.T_OT.length; zz++) {
                                console.log(resultTR.T_OT[zz].Seleccionado);
                                resultTR.T_OT[zz].Seleccionado =  false;
                            }	
                
                            var timeout = jQuery.sap.delayedCall(50, self, function () {
                                self.getView().byId("idIconTabBar").setBusy(false);
                                self.getView().byId("BusyDialogG").close();
                            });
                        });
                //	});
    
                });
            },				
            
            cambiaCentro: function (oEvent) {
                centro = viewg.byId("centro").getSelectedKey();
            },
            
            
            esTotalU : function (param){
//                console.log("USERRR:>>>"    + param );
                return true;	
            },
            
            onAfterRendering : function () {
                
                if(esTotem){
                    viewg.byId("centro").setVisible(false);
                    viewg.byId("tecnico").setVisible(false);
                    viewg.byId("clientes").setVisible(false);
                    viewg.byId("idButtonFiltrar").setVisible(false);
            //		viewg.byId("idToolbarGeneral").setVisible(true);
                    viewg.byId("idTittle").setVisible(true);
                    viewg.byId("puestosTrabajo").setVisible(true);
                    viewg.byId("idTittle").setVisible(true);
                    viewg.byId("idIconTabBarUsuario").setVisible(false);
                    viewg.byId("idIconTabBar").setVisible(false);
                    viewg.byId("idButtonAsignar").setVisible(false);
                    viewg.byId("idButtonFiltrar").setVisible(false);
                    viewg.byId("puestosTrabajo").setVisible(true);
                    viewg.byId("idFilterBar").setVisible(false);
                //	alert("aaa");
                    
                }else if(esJefe){
                    
                    viewg.byId("centro").setVisible(true);
                    viewg.byId("tecnico").setVisible(true);
                    viewg.byId("clientes").setVisible(true);
                    viewg.byId("idButtonFiltrar").setVisible(false);
            //		viewg.byId("idFilterBar").setVisible(true);
                //	alert(1);
                    viewg.byId("idTittle").setVisible(false);
            //		viewg.byId("idToolbarGeneral").setVisible(true);
                    
                    // se oculta icontab bar de usuario y se muestra icon tab bar jefe de taller	
                    viewg.byId("idIconTabBarUsuario").setVisible(false);
                    viewg.byId("idIconTabBar").setVisible(true);
                    viewg.byId("idButtonAsignar").setVisible(true);
                    viewg.byId("idButtonFiltrar").setVisible(false);
                //	viewg.byId("idFilterBar").setVisible(true);
                    viewg.byId("puestosTrabajo").setVisible(true);
                //	viewg.byId("idButtonFiltrar").firePress();
                    
                    
                    
                }else if(esTecnico){
                    
                /*	viewg.byId("idinput1").setValueState("None");
                    viewg.byId("dialogRut").setVisible(false);
                    viewg.byId("dialogRut").close();
                    viewg.byId("dialogRut").close();
                    viewg.byId("idTittle").setVisible(false);
                    viewg.byId("idMen4").setVisible(true);
                    viewg.byId("idMen2").setVisible(false);
                    viewg.byId("idMen3").setVisible(false);
                    viewg.byId("idFilterBar").setVisible(false);
                    viewg.byId("BusyDialogG").open();*/
                    
                    viewg.byId("idIconTabBar").setVisible(false);
                    viewg.byId("idButtonAsignar").setVisible(false);
                    viewg.byId("idFilterBar").setVisible(false);
                    var timeout = jQuery.sap.delayedCall(30000, this, function () {
                        
                        //	setInterval(this.fireLog,5000);
                        //	setInterval(this.fireCarga,10000);
    
                    });
                    
                    
                    
                }	
                
                
            
            
                
            },
            
            fireCarga : function (){
                viewg.byId("btnCerrar2").firePress();
            },
            
            fireLog : function (){
                viewg.byId("btnCerrar3").firePress();
            },
            
            cambioPuesto2: function (oEvent) {
    
    //			viewg.byId("idTittle").setVisible(true);
                viewg.byId("idTittle").setBusy(true);
                viewg.byId("tecnico").setBusy(true);
                viewg.byId("tecnicoDLG").setBusy(true);
                
                
    
                var valor = this.getSelectedItemText(this.getSelect("puestosTrabajo2")).valueOf();
                var valorCentro = this.getSelectedItemText(this.getSelect("centro")).valueOf();
                //alert(valorCentro);
                if (valorCentro === "") {
                    //alert(0);
                    var params = "?I_WERKS=" + centro + "&I_ARBPL=" + valor + "&format=json";
                    //var params = "?I_WERKS=1SA1&I_ARBPL=MESEFR&format=json";
                } else {
                    //alert(1);
                    //var params = "?I_WERKS=1SA1&I_ARBPL=MESEFR&format=json";
                    var params = "?I_WERKS=" + valorCentro + "&I_ARBPL=" + valor + "&format=json";
                }
                var self = this;
    
//Jose Lopez                service.listaObject(params, function (result) {
                    OBJTY = "";//result.E_OBJTY;
                    OBJID = "00000000";//result.E_OBJID;
//Jose Lopez                });
    
                var timeout = jQuery.sap.delayedCall(2000, this, function () {
                    //alert(OBJTY+"---"+OBJID);
                    var oFilters = {
                        "BEGDA": utilFormater.dateToFormat("yyyyMMdd"),
                        "ENDDA": utilFormater.dateToFormat("yyyyMMdd"),
                        "IN_OBJECT": [{
                            "OBJTY": OBJTY,
                            "OBJID": OBJID
                        }]
                    };
/*Jose Lopez                    
                    service.listaMecanico(oFilters, function (result) {
                        //alert(JSON.stringify(result.OUT_PERSONS));
                        self.onSetLISTAMEC(result.OUT_PERSONS);
                        viewg.byId("idTittle").setBusy(false);
                        viewg.byId("tecnico").setBusy(false);
                        viewg.byId("tecnicoDLG").setBusy(false);
                    });
Jose Lopez*/
                    var oScoModel2 = new sap.ui.model.json.JSONModel();
                    oScoModel2.loadData("model/data.json");
                    oScoModel2.attachRequestCompleted(function(oEvent) {
                        self.onSetIDUSUARIO(oScoModel2.getProperty("/COI2_PERSON_OF_WORKCENTER")[3].response);
                        viewg.byId("idTittle").setBusy(false);
                        viewg.byId("tecnico").setBusy(false);
                        viewg.byId("tecnicoDLG").setBusy(false);                        
                    });
                });
    
                var timeout2 = jQuery.sap.delayedCall(1000, this, function () {
                    utilController.property(this, "/LSTMECSEL", {
                        "PERNR": trabajador
                    });
                    var oFilters = {
                        "QUERY_TABLE": "ZWDD_015_USER",
                        "FIELDS": [{
                            "FIELDNAME": "PERSONAL_NUMBER",
                            "OFFSET": "000000",
                            "LENGTH": "000000",
                            "TYPE": "",
                            "FIELDTEXT": ""
                        }, {
                            "FIELDNAME": "ID_USUARIO",
                            "OFFSET": "000000",
                            "LENGTH": "000000",
                            "TYPE": "",
                            "FIELDTEXT": ""
                        }]
                    };
/*Jose Lopez                    
                    service.readTabla(oFilters, function (result) {
                        self.onSetIDUSUARIO(result.DATA);
                        //alert(JSON.stringify(result.DATA));
                    });
Jose Lopez*/
                    var oScoModel = new sap.ui.model.json.JSONModel();
                    oScoModel.loadData("model/data2.json");
                    oScoModel.attachRequestCompleted(function(oEvent) {
                        self.onSetIDUSUARIO(oScoModel.getProperty("/RFC_READ_TABLE/response").DATA)
                    });

                });
            },		
            
            cargaTec: function (flag) {
    
                var valor = this.getSelectedItemText(this.getSelect("puestosTrabajo2")).valueOf();
                var valorCentro = this.getSelectedItemText(this.getSelect("centro")).valueOf();
                
                if(flag === "CP"){
                    valor = "MESECP";
                }else if( flag === "MQ"){
                    valor = "MESEMQ";
                }else if (flag === "FR"){
                    valor = "MESEFR";
                }
                
                if (valorCentro === "") {
                    var params = "?I_WERKS=" + centro + "&I_ARBPL=" + valor + "&format=json";
                    //var params = "?I_WERKS=1SA1&I_ARBPL=MESEFR&format=json";
                } else {
                    //var params = "?I_WERKS=1SA1&I_ARBPL=MESEFR&format=json";
                    var params = "?I_WERKS=" + valorCentro + "&I_ARBPL=" + valor + "&format=json";
                }
                var self = this;
//Jose Lopez
                var oScoModel = new sap.ui.model.json.JSONModel();
                oScoModel.loadData("model/data.json");    

//Jose Lopez                service.listaObject(params, function (result) {
                oScoModel.attachRequestCompleted(function(oEvent) {
                    var aGetID = oScoModel.getProperty("/Z354W_GETID");
                    var oResponse = aGetID.filter(function(chain){ return chain.I_ARBPL === valor })[0].response;
//Jose Lopez                   OBJTY = result.E_OBJTY;
                    OBJTY = oResponse.E_OBJTY;
//Jose Lopez                   OBJID = result.E_OBJID;
                    OBJID = oResponse.E_OBJID;
                
                    var oFilters = {
                        "BEGDA": utilFormater.dateToFormat("yyyyMMdd"),
                        "ENDDA": utilFormater.dateToFormat("yyyyMMdd"),
                        "IN_OBJECT": [{
                            "OBJTY": oResponse.E_OBJTY,
                            "OBJID": oResponse.E_OBJID
                        }]
                    };			
//Jose Lopez                    service.listaMecanico(oFilters, function (result) {
                            var aGetID = oScoModel.getProperty("/COI2_PERSON_OF_WORKCENTER");
                            var oResponse = aGetID.filter(function(chain){ return chain.OBJID === OBJID })[0].response;
                            if(flag === "CP"){
//Jose Lopez                                mecCP = result.OUT_PERSONS;
                                mecCP = oResponse.OUT_PERSONS;
                            }else if (flag === "MQ"){
//Jose Lopez                                mecMQ = result.OUT_PERSONS;
                                mecMQ = oResponse.OUT_PERSONS
                            }else if (flag === "FR"){
//Jose Lopez                                mecFR = result.OUT_PERSONS;
                                mecFR = oResponse.OUT_PERSONS;
                            }
//Jose Lopez                    });				
                    
                });
    
            },		
                
            cambioPuesto: function (oEvent) {
    
    //			viewg.byId("idTittle").setVisible(true);
                viewg.byId("idTittle").setBusy(true);
                viewg.byId("tecnico").setBusy(true);
    
                var valor = this.getSelectedItemText(this.getSelect("puestosTrabajo")).valueOf();
                var valorCentro = this.getSelectedItemText(this.getSelect("centro")).valueOf();
                //alert(valorCentro);
                if (valorCentro === "") {
                    //alert(0);
                    var params = "?I_WERKS=" + centro + "&I_ARBPL=" + valor + "&format=json";
                    //var params = "?I_WERKS=1SA1&I_ARBPL=MESEFR&format=json";
                } else {
                    //alert(1);
                    //var params = "?I_WERKS=1SA1&I_ARBPL=MESEFR&format=json";
                    var params = "?I_WERKS=" + valorCentro + "&I_ARBPL=" + valor + "&format=json";
                }
                var self = this;
    
//Jose Lopez                service.listaObject(params, function (result) {
                    OBJTY = "00000000";//result.E_OBJTY;
                    OBJID = "";//result.E_OBJID;
//Jose Lopez                });
    
                var timeout = jQuery.sap.delayedCall(2000, this, function () {
                    //alert(OBJTY+"---"+OBJID);
                    var oFilters = {
                        "BEGDA": utilFormater.dateToFormat("yyyyMMdd"),
                        "ENDDA": utilFormater.dateToFormat("yyyyMMdd"),
                        "IN_OBJECT": [{
                            "OBJTY": OBJTY,
                            "OBJID": OBJID
                        }]
                    };
/*Jose Lopez                    
                    service.listaMecanico(oFilters, function (result) {
                        //alert(JSON.stringify(result.OUT_PERSONS));
                        self.onSetLISTAMEC(result.OUT_PERSONS);
                        viewg.byId("idTittle").setBusy(false);
                        viewg.byId("tecnico").setBusy(false);
                    });
Jose Lopez*/
                    var oScoModel2 = new sap.ui.model.json.JSONModel();
                    oScoModel2.loadData("model/data.json");
                    oScoModel2.attachRequestCompleted(function(oEvent) {
                        self.onSetIDUSUARIO(oScoModel2.getProperty("/COI2_PERSON_OF_WORKCENTER")[3].response)
                    });

                });
    
                var timeout2 = jQuery.sap.delayedCall(1000, this, function () {
                    utilController.property(this, "/LSTMECSEL", {
                        "PERNR": trabajador
                    });
                    var oFilters = {
                        "QUERY_TABLE": "ZWDD_015_USER",
                        "FIELDS": [{
                            "FIELDNAME": "PERSONAL_NUMBER",
                            "OFFSET": "000000",
                            "LENGTH": "000000",
                            "TYPE": "",
                            "FIELDTEXT": ""
                        }, {
                            "FIELDNAME": "ID_USUARIO",
                            "OFFSET": "000000",
                            "LENGTH": "000000",
                            "TYPE": "",
                            "FIELDTEXT": ""
                        }]
                    };
/*Jose Lopez                    
                    service.readTabla(oFilters, function (result) {
                        self.onSetIDUSUARIO(result.DATA);
                        //alert(JSON.stringify(result.DATA));
                    });
Jose Lopez*/              
                    var oScoModel = new sap.ui.model.json.JSONModel();
                    oScoModel.loadData("model/data2.json");
                    oScoModel.attachRequestCompleted(function(oEvent) {
                        self.onSetIDUSUARIO(oScoModel.getProperty("/RFC_READ_TABLE/response").DATA)
                    });


                });
            },
            
            onEditar2: function (oEvent) {
            
                    
            
            },
            
            onEditar: function (oEvent) {
                if(swComboP){
                    this.cambioPuesto2();
                    swComboP = false;
                }	
                
                this.getView().byId("tecnicoDLG").setValue(null);
                this.getView().byId("DlgOperacion").open();
            },
            
            onMecs: function () {this.cargaTec("CP");this.cargaTec("MQ");this.cargaTec("FR");},
            
            onCerrar: function (oEvent) {
                this.getView().byId("DlgDetalle").close();
                this.getView().byId("DlgOperacion").close();
            },
    
            onAgregar: function (oEvent) {
            
                var self = this;
                var that = this;
                var ids = this.getSeleccionados();
                //var objeto = utilUI.objectListItemSelectedItem(oEvent);
                var val = this.getView().byId("tecnicoDLG").getSelectedKey();
                console.log("El largo es: " + ids.length); 
                
                
                this.startClock();
                this.startDate = this.clock.getStartDate();
    
                var dateTime = this.splitDateTime(this.startDate);
                var errorSAP = 0;
                utilUI.messageBox("¿Desea asignar mecánico?", "C", function (iscon) {
                if(iscon){
                    for (var i = 0; i < ids.length; i++) {
                        utilUI.gloading(true);
                        var objOrden = {
                                    "p_aufnr": ids[i].AUFNR,
                                    "p_qmtxt": ids[i].KTEXT,
                                    "p_kunnr": ids[i].CLIENTE,
                                    "p_name1": ids[i].NOMBRE_CLIENTE,
                                    "p_puesto": self.getView().byId("puestosTrabajo2").getSelectedKey(),
                                    "p_centro": centro,
                                    "p_marca": ids[i].ZMARCA,
                                    "p_modelo": ids[i].ZMODELO,
                                    "p_serie": ids[i].SERIALNR,
                                    "p_cebe": ids[i].CEBE,
                                    "p_aplzl": ids[i].ACTIVITY,
                                    "p_mecanico": val,
                                    "p_ltxaq": ids[i].DESCRIPTION,
                                    "p_id_mecanico": val,
                                    "p_clave":ids[i].ZMODELO,
                                    "p_trabajo":""
                                };
                        console.log("INSERT PREGUNTAS ANTES"+JSON.stringify( objOrden));
/*Jose Lopez                    
                        service.insertOrdenes(objOrden, function(result) {
                            console.log("INSERT PREGUNTAS "+JSON.stringify(objOrden));
                            console.log("INSERT");
                            if (result.c === "s") {
                                console.log("INSERTADO");
                                self.getView().byId("DlgDetalle").close();
                                self.getView().byId("DlgOperacion").close();
                            }else{
                                console.log("ERROR -  INSERTADO "+ JSON.stringify(result));
                            }
                        });
Jose Lopez*/        
                        self.getView().byId("DlgDetalle").close();
                        self.getView().byId("DlgOperacion").close();
                    }
                }
                });
                jQuery.sap.delayedCall(4000, self, function () {	
                    utilUI.messageBox("Mecánico asignado con exito", "S", function () {
                        utilUI.gloading(false);
                    });
                });
                jQuery.sap.delayedCall(4000, self, function () {	
                    self.getOrdenes2JT(); 
                });	
                // if(iscon){
                // 	utilUI.gloading(true);
                // 	 var timer = jQuery.sap.delayedCall(1000, this, function () {
                // 	// if (String(errorSAP) == String(0)) {
                // 		for (var i = 0; i < ids.length; i++) {
                // 			utilUI.gloading(true);
                // 			var objOrden = {
                // 				"p_aufnr": ids[i].AUFNR,
                // 				"p_qmtxt": ids[i].KTEXT,
                // 				"p_kunnr": ids[i].CLIENTE,
                // 				"p_name1": ids[i].NOMBRE_CLIENTE,
                // 				"p_puesto": "",
                // 				"p_centro": centro,
                // 				"p_marca": ids[i].ZMARCA,
                // 				"p_modelo": ids[i].ZMODELO,
                // 				"p_serie": ids[i].SERIALNR,
                // 				"p_cebe": "",
                // 				"p_aplzl": ids[i].ACTIVITY,
                // 				"p_mecanico": val,
                // 				"p_ltxaq": ids[i].DESCRIPTION,
                // 				"p_id_mecanico": val,
                // 				"p_clave":ids[i].ZMODELO,
                // 				"p_trabajo":""
                // 			};
                // 		    console.log("antes de grabar ---->>"+JSON.stringify(objOrden));
                // 			service.insertOrdenes(objOrden, function (result) {
                // 				    console.log("grabar    "+JSON.stringify(objOrden));
                // 					self.getView().byId("DlgDetalle").close();
                // 					self.getView().byId("DlgOperacion").close();
                                    
                // 				//	var self2 = self;
                // 				//if(iscon){
                // 					// jQuery.sap.delayedCall(2000, self2, function () {
                // 					// 	//if (String(errorSAP) == String(0)) {
                // 					// 	//console .log(j);
                // 					// 	console.log("objeto ids "+JSON.stringify(ids[]));
                // 					// 	//console.log("objeto ids "+JSON.stringify(ids[1]));
                // 					// 	//console.log("objeto ids "+JSON.stringify(ids[2]));
                // 					// 		 //for (var j = 0; j < objOrden.length; j++) {
                                                
                // 					// 			// var objOperacion = {
                // 					// 			// 	"p_aufnr": ids[j].AUFNR,
                // 					// 			// 	"p_aplzl": ids[j].ACTIVITY,
                // 					// 			// 	"p_mecanico": val,
                // 					// 			// 	"p_ltxaq": ids[j].DESCRIPTION,
                // 					// 			// 	"p_id_mecanico": val,
                // 					// 			// 	"p_clave":ids[j].ZMODELO,
                // 					// 			// 	"p_trabajo":""
                // 					// 			// };
                                                
                // 					// 			// service.insertOperacion(objOperacion, function (result) {
                // 					// 			// 	console.log("Insert Operación");
                // 					// 			// 	utilUI.gloading(false);
                // 					// 			// 	j ++;
                // 					// 			// });
                                                
                // 					// 		 //}
                // 					// 	//}
                // 					// });		
                // 				//}else{
                // 						//utilUI.gloading(false);
                // 				//}
                // 			});
                // 		}
                // 	}
                //  });
                // 	jQuery.sap.delayedCall(4000, self, function () {	
                // 		utilUI.messageBox("Mecánico asignado con exito", "S", function () {
                // 			utilUI.gloading(false);
                // 		});
                // 	});
                // 	jQuery.sap.delayedCall(4000, self, function () {	
                // 		self.getOrdenes2JT(); 
                // 	});	
                // }				
                // });
                
                this.stopClock();
                this.clock.stopTimer();
            },

            onExit: function () {
                clearInterval(this.refreshIntervalId);
            },
            
            validaRut: function (oEvent) {
    
                this.getView().byId("idinput1").setValue("");
                this.getView().byId("dialogRut").setVisible(true);
                this.getView().byId("dialogRut").open();
                var sPath = utilUI.objectListItemSelectedItem(oEvent);
                utilController.property(this, "/LSTMECUNICO", sPath);
                this.getView().byId("idTextUsuarioTotem").setText(sPath.STEXT);
    
            },
    
            cerrarDialogRut: function () {
    
                this.getView().byId("dialogRut").setVisible(false);
                this.getView().byId("dialogRut").close();
                this.getView().byId("idinput1").setValueState("None");
    
            },
    
            validarRutIngreso: function (oEvent) {
                var self = this;
    
                var rut = this.getView().byId("idinput1").getValue();
    
                rutIngresado = rut;
    
                if ("" !== rut) {
                    rut = rut.split(".").join("");
                }
    
                var objeto = utilController.property(this, "/IDUSUARIO");
                var sPath = utilController.property(this, "/LSTMECUNICO");
                var res = "";
                utilUI.gloading(true);
                //this.getView().byId("idIconTabBar").setVisible(false);
                if (sPath.PERNR === rut) {
                    this.getView().byId("idinput1").setValueState("None");
                    this.getView().byId("dialogRut").setVisible(false);
                    this.getView().byId("dialogRut").close();
                    this.getView().byId("dialogRut").close();
                    //alert(2);
                    this.getView().byId("idTittle").setVisible(false);
                    this.getView().byId("idMen4").setVisible(true);
                    //		this.getView().byId("idMen1").setVisible(false);
                    this.getView().byId("idMen2").setVisible(false);
                    this.getView().byId("idMen3").setVisible(false);
                    this.getView().byId("BusyDialogG").open();
    
                } else {
                    utilUI.messageBox("El Rut ingresado no coincide con el técnico seleccionado", "E", function () {});
                    this.getView().byId("idinput1").setValueState("Error");
                    this.getView().byId("idinput1").setValueStateText("El Rut no es válido");
                    //this.getView().byId("idinput1").getValueState("Error");
                }
                self.getOrdenes2();
                self.getTimeLog2();
                self.getOperaciones2();
                self.onCargaGrilla();
                this.getView().byId("idIconTabBar").setBusy(true);
                var timeout = jQuery.sap.delayedCall(10000, this, function () {
                    this.mostrarOrdenesPorPERNR();
                });
    
                var timeout = jQuery.sap.delayedCall(1000, this, function () {
                    console.log(idUser);
                    var oFilters = {
                        "I_IDUSER": idUsera
                    };
/*Jose Lopez                    
                    service.datosUsuario(oFilters, function (result) {
                        rolNombre = result.T_ROLES[0].NOMBRE_ROL;
    
                        //	viewg.byId("idShellBar").setTitle(rolNombre);
    
                        //alert(rolNombre);
                        console.log(JSON.stringify(result.T_ROLES[0].NOMBRE_ROL));
                        if (rolNombre === "Jefe de Servicio") {
                            self.getView().byId("page").setTitle("Time Recording");
                            self.getView().byId("centro").setVisible(true);
                            self.getView().byId("tecnico").setVisible(true);
                            self.getView().byId("clientes").setVisible(true);
                            self.getView().byId("idIconTabBar").setVisible(true);
                            self.getView().byId("tablaTimer").setVisible(true);
    
                        } else {
                            self.getView().byId("idButtonAsignar").setVisible(false);
                            self.getView().byId("idButtonFiltrar").setVisible(false);
                            utilUI.gloading(false);
                        }
                    });
Jose Lopez*/                    
                });
            },
            
            irUsuario: function (oEvent) {
                var self = this;
    
                
                    //this.getView().byId("idIconTabBar").setVisible(false);
            
                    this.getView().byId("idinput1").setValueState("None");
                    this.getView().byId("dialogRut").setVisible(false);
                    this.getView().byId("dialogRut").close();
                    this.getView().byId("dialogRut").close();
                //	alert(3);
                    this.getView().byId("idTittle").setVisible(false);
                    this.getView().byId("idMen4").setVisible(true);
                    //		this.getView().byId("idMen1").setVisible(false);
                    this.getView().byId("idMen2").setVisible(false);
                    this.getView().byId("idMen3").setVisible(false);
                    this.getView().byId("BusyDialogG").open();
    
            
                /*	self.getOrdenes2();
                    self.getTimeLog2();
                    self.getOperaciones2();
                    self.onCargaGrilla();*/
                    
                    self.getOrdenes2Synch2();
                    
                
                
                    /*this.getView().byId("idIconTabBar").setBusy(true);
                    var timeout = jQuery.sap.delayedCall(1000, this, function () {
                        this.mostrarOrdenesPorPERNR();
                    });*/
                    
                    
    
                /*	var timeout = jQuery.sap.delayedCall(1000, this, function () {
                        console.log(idUser);
                        var oFilters = {
                            "I_IDUSER": idUsera
                        };
                        service.datosUsuario(oFilters, function (result) {
                            
                        
                            
                        //	rolNombre = result.T_ROLES[0].NOMBRE_ROL;
                        
                            //	viewg.byId("idShellBar").setTitle(rolNombre);
        
                            //alert(rolNombre);
                            /*console.log(JSON.stringify(result.T_ROLES[0].NOMBRE_ROL));
                            if (rolNombre === "Jefe de Servicio") {
                                self.getView().byId("page").setTitle("Time Recording");
                                self.getView().byId("centro").setVisible(true);
                                self.getView().byId("tecnico").setVisible(true);
                                self.getView().byId("clientes").setVisible(true);
                                self.getView().byId("idIconTabBar").setVisible(true);
                                self.getView().byId("tablaTimer").setVisible(true);
        
                            } else {
                                self.getView().byId("idButtonAsignar").setVisible(false);
                                self.getView().byId("idButtonFiltrar").setVisible(false);
                                utilUI.gloading(false);
                            }*/
        
                //		});
                //	});
            },		
            
            handleIconTabBarSelect: function (oEvent) {
    
                var sKey = oEvent.getParameter("key");
                var obj = utilController.property(this, "/GT_ORDENESTR");
                var newList = [];
                var valor = "";
    
                if (oEvent.getParameter("key") === "Ejecución") {
    
                    viewg.byId("idButtonAsignar").setVisible(true);
    
                } else {
                    viewg.byId("idButtonAsignar").setVisible(false)
                }
    
                if (oEvent.getParameter("key") === "Ejecucion") {
                    valor = "En ejecución";
                    for (var i = 0; i < obj.length; i++) {
                        var item = obj[i];
                        if (item.ESTADO.toUpperCase().indexOf(valor.toUpperCase()) > -1) {
                            newList.push(item);
                        }
                    }
                } else if (sKey === "Heavy") {
                    valor = "No iniciado";
                    for (var i = 0; i < obj.length; i++) {
                        var item = obj[i];
                        if (item.ESTADO.toUpperCase().indexOf(valor.toUpperCase()) > -1) {
                            newList.push(item);
                        }
                    }
                } else if (sKey === "Overweight") {
                    valor = "Detención Critica";
                    for (var i = 0; i < obj.length; i++) {
                        var item = obj[i];
                        if (item.ESTADO.toUpperCase().indexOf(valor.toUpperCase()) > -1) {
                            newList.push(item);
                        }
                    }
                }
    
                utilController.property(this, "/ProductCollection", newList);
                utilController.refreshModel(this);
    
            },
    
            onExit: function () {
                clearInterval(this.refreshIntervalId);
            },
    
            setStatusText: function (sText) {
                console.log("aaa");
                var oModel = this.getView().getModel("status");
                if (!oModel) {
                    return;
                }
                var data = oModel.getData();
                data.text = sText;
                oModel.setData(data);
            },
    
            formatNombre: function (param) {
    
                if (param !== "" && (param.split(" ").length === 3 || param.split(" ").length === 4)) {
    
                    return param.split(" ")[0].substring(0, 1) + param.split(" ")[2].substring(0, 1);
    
                } else if (param !== "" && param.split(" ").length === 2) {
    
                    return param.split(" ")[0].substring(0, 1) + param.split(" ")[1].substring(0, 1);
    
                } else if (param !== "" && param.split(" ").length === 5) {
    
                    return param.split(" ")[1].substring(0, 1) + param.split(" ")[4].substring(0, 1);
    
                } else {
                    return "AA";
                }
    
                return "BB";
            },
            
            
            cerrarDlgDetalle : function (){
                
                    this.getView().byId("DlgDetalle").close();
                
                
            },
    
            onTimer: function (oEvent) {
                var b1 = oEvent.getSource().getBindingContext().sPath;
                var m1 = this.getView().getModel().getProperty("/GT_ORDENESTR");
    
                m1 = m1[b1.split("/")[2]]
    
                ordenG = m1.AUFNR;
                operG = m1.ACTIVITY;
                tituloM1AUFNR = m1.AUFNR;
                tituloM1OPER = m1.ACTIVITY;
    
                var idOrden;
                var idOper;
    
                for (var i = 0; i < operacionesTR.data.length; i++) {
                    //console.log(operacionesTR.data[i].AUFNR +"=="+ m1.AUFNR+"----"+ operacionesTR.data[i].APLZL+"=="+m1.ACTIVITY);
                    if (operacionesTR.data[i].AUFNR == m1.AUFNR && operacionesTR.data[i].APLZL == m1.ACTIVITY) {
                        idOrden = operacionesTR.data[i].ID_ORDEN;
                        idOper = operacionesTR.data[i].ID;
                    }
                }
    
                console.log("ID_ORDEN" + idOrden);
                this.clock.setModel((new Clock()).getModel());
                if (m1.ID_MOTIVO == "-1") {
                    console.log("-1");
                    this.getView().byId("btnIniciar").setVisible(false);
                    this.getView().byId("btnDetener").setVisible(true);
                    console.log(idOrden + "---" + m1.ACTIVITY + "---" + m1.AUFNR + "--" + idOper);
                    this.getElapsedTime(idOrden, idOper);
                    this.getView().byId("DlgDetalle").open();
                } else if (m1.ID_MOTIVO == "-2") {
                    //alert(cont);
                    console.log("-2");
                    if (parseInt(cont) == parseInt(0)) {
                        this.getView().byId("btnIniciar").setVisible(true);
                        this.getView().byId("btnDetener").setVisible(false);
                        this.getView().byId("DlgDetalle").open();
                    } else {
                        utilUI.messageBox("Ya tiene operaciones iniciadas", "E", function () {});
                        this.getView().byId("btnIniciar").setVisible(false);
                        this.getView().byId("btnDetener").setVisible(false);
                    }
                } else if (m1.ID_MOTIVO == "-3") {
                    //alert(cont);
                    console.log("-3");
                    if (parseInt(cont) == parseInt(0)) {
                        this.getView().byId("btnIniciar").setVisible(true);
                        this.getView().byId("btnDetener").setVisible(false);
                        this.getView().byId("DlgDetalle").open();
                    } else {
                        utilUI.messageBox("Ya tiene operaciones iniciadas", "E", function () {});
                        this.getView().byId("btnIniciar").setVisible(false);
                        this.getView().byId("btnDetener").setVisible(false);
                    }
                } else {
                    console.log("pos");
                    if (parseInt(cont) == parseInt(0)) {
                        this.getView().byId("btnIniciar").setVisible(true);
                        this.getView().byId("btnDetener").setVisible(false);
                        this.getElapsedTime2(idOrden, idOper);
                        this.getView().byId("DlgDetalle").open();
                    } else {
                        utilUI.messageBox("Ya tiene operaciones iniciadas", "E", function () {});
                        this.getView().byId("btnIniciar").setVisible(false);
                        this.getView().byId("btnDetener").setVisible(false);
                    }
                }
    
                this.getView().byId("idObjTimer").setTitle(parseInt(m1.AUFNR) + "-" + m1.KTEXT);
                this.getView().byId("idObjTimer").setNumber("H.Planif: " + m1.DURATION_NORMAL);
                this.getView().byId("idObjTimer").setNumberUnit(m1.CLIENTE);
                this.getView().byId("oa1").setText(m1.ACTIVITY + "-" + m1.DESCRIPTION);
                this.getView().byId("oa2").setText(m1.NOMBRE);
                this.getView().byId("idObjTimerStat").setText(m1.ESTADO);
    
            },
    
            getAndSetUserInfo: function () {
    
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "userInfo.xsjs";
                var response = undefined;
                //this.show_no_time_limit();
/*                
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        async: true
                    }).success(function (results) {
                        //that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === 'object') {
                            response = results;
                        } else {
                            response = JSON.parse(results);
                        }
    
    
                    })
                    .fail(function (err) {
                        //that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
Jose Lopez*/
                    return {"username": "TIMEREC_COM"};
            },
    
            getAndHandleOperacionIncompleta: function () {
                var opIncompleta = this.getOperacionIncompleta(false);
                if (opIncompleta && opIncompleta.data && opIncompleta.data.id_orden && opIncompleta.data.id_operacion) {
                    this.setSelectedOrden(opIncompleta.data.id_orden);
                    this.setSelectedOperacion(opIncompleta.data.id_operacion);
                }
            },
    
            getOperacionIncompleta: function (iAsync) {
                if (!iAsync) {
                    iAsync = false;
                }
    
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "timeLog.xsjs?getOpIncompleta=true";
                var response = undefined;
                this.show_no_time_limit();
/* Jose Lopez                
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        async: iAsync
                    }).success(function (results) {
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === 'object') {
                            response = results;
                        } else {
                            response = JSON.parse(results);
                        }
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
Jose Lopez*/                    
                return {"data":Array(0)};
            },
    
            handleDeviceChange: function () {
                // sap.m.MessageToast.show("Cambió el device type! ", {
                // 	duration: 5000
                // });
            },
    
            displayAjaxError: function (err) {
                var oErrorResponse;
                var errorHeader, errorText;
                if (!err.responseText) {
                    errorHeader = "Error";
                    errorText = "Se ha producido un error desconocido";
                } else {
                    if (typeof err.responseText === 'object') {
                        oErrorResponse = $.parseJSON(err.responseText);
                    } else {
                        errorHeader = "(" + err.status + ")" + err.statusText;
                        errorText = err.responseText;
                    }
                }
                this.showErrorBox(errorHeader, errorText);
    
            },
    
            getMotivos: function () {
                //alert("zzzz");
                var data = {};
                var oModel = new sap.ui.model.json.JSONModel(data);
                this.getView().setModel(oModel, "motivos");
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "motivos.xsjs";
                var response = undefined;
                this.show_no_time_limit();
/*Jose Lopez                
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        async: true
                    }).success(function (results) {
                        //alert(JSON.stringify(results));
                        //that.hideBusyIndicator();
                        // var oJson = JSON.parse(results);
                        // alert(oJson);
    
                        // if (typeof results === 'object') {
                        // 	response = results;
                        // } else {
                        // 	response = JSON.parse(results);
                        // }
                        var oMotivos = that.getView().getModel("motivos");
                        //alert(JSON.stringify(oMotivos));
                        if (oMotivos && results.data) {
                            oMotivos.setData(results);
                            that.motivos = results;
                        }
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                });
Jose Lopez*/
                    var oScoModel = new sap.ui.model.json.JSONModel();
                    oScoModel.loadData("model/ajaxdata.json");
                    oScoModel.attachRequestCompleted(function(oEvent) {
                        var response = oScoModel.getProperty("/motivos.xsjs/response");
                        var oMotivos = that.getView().getModel("motivos");
                        //alert(JSON.stringify(oMotivos));
                        if (oMotivos && response) {
                            oMotivos.setData(response);
                            that.motivos = response;
                        }                        
                    });
                },
            getSeleccionados: function () {
                var ots = utilController.property(this, "/GT_ORDENESTR");
                console.log("GRILLA COMPLETA" + JSON.stringify(ots));
                var ids = [];
                for (var i = 0; i < ots.length; i++) {
                    var item = ots[i];
    
                    if (item.Seleccionado === true) {
                        //alert(item.ACTIVITY);
                        ids.push(item);
                    }
                }
                console.log("id SELECCIONADO" + JSON.stringify(ids));
                return ids;
            },
            getInnerOperOrden:function(){
                var self = this;
                var rut = pernrg.replace(".", "").replace(".", "").replace(".", "");
                var oFiltersTRH={
                    "p_mecanico":rut
                };
                console.log("CONSULTA ES TECNICO "+JSON.stringify(oFiltersTRH));
/* Jose Lopez                
                var timeout = jQuery.sap.delayedCall(500, this, function () {
                    service.ListainnerOperOrden(oFiltersTRH, function (result) {
                        
                        try{
                        if(result.data.OUT_LISTA.length > 0){
                            var l1 = result.data.OUT_LISTA;
                            var l2 = result.data.OUT_LISTA;
                            var resultado = [];
                            for (var i = 0; i < l1.length; i++) {
                                //console.log("FOR M1   "+JSON.stringify(m1[i]) + "-" + pernrg);
                                for (var j = 0; j < l2.length; j++) { 
                                     if (String(l1[i].ACTIVITY) === String(l2[j].ACTIVITY) && 
                                        String(l1[i].AUFNR) === String(l2[j].AUFNR) &&
                                        l1[i].ID_ORDEN >  l2[j].ID_ORDEN ) {	
                                        l2[j].ID_ORDEN = "";
                                    }   
                                }
                            };
                            
                            for (var i = 0; i < l2.length; i++) { 
                                if (String(l2[i].ID_ORDEN) !== ""){resultado.push(l2[i]);}  
                            }   
                            result.data.OUT_LISTA = resultado;
                            resultTR = result;
                                                        
                            //	console.log("RESULT CONSULTA ES TECNICO "+JSON.stringify(oFiltersTRH));
                            //	console.log("RESULT CONSULTA ES TECNICO "+JSON.stringify(resultTR));
                            //	self.onCargaGrilla();
                            if(esTecnico){
                                viewg.byId("btnIrUsuario").firePress();
                                viewg.byId("idBtnAct").setVisible(true);
                                console.log(">>>>SUCESS getInnerOperOrden"); 
                                try{
                                    self.mostrarOrdenesPorPERNR();
                                }catch(e){
                                    var m1 = result.data.OUT_LISTA;
                                    var m2 = [];
                            
                                        var listEjecucion = [];
                                        var listNoIniciadas = [];
                                        var listDetencion = [];
                            
                                        var contPosU = 0;
                                        var conNoInicU = 0;
                                        var contDetU = 0;
                                        var countOrdenU = 0;
                            
                                        console.log("LENGTH: >>> " + m1.length + "PERNR " + String(pernrg));
                            
                                        for (var i = 0; i < m1.length; i++) {
                                            //console.log("FOR M1   "+JSON.stringify(m1[i]) + "-" + pernrg);
                                            if (String(m1[i].ID_MOTIVO) === String("-1") && String(m1[i].ID_MECANICO) === String(pernrg)) {
                                                contPosU++;
                                                cont++;
                                                //alert("IF"+m1[i].ID_MOTIVO+"   "+ m1[i].DESCRIPTION);
                                                m2.push(m1[i]);
                                            } else if (String(m1[i].ID_MOTIVO) === String("-2") && String(m1[i].ID_MECANICO) === String(pernrg)) {
                                                conNoInicU++;
                                                m2.push(m1[i]);
                                                //		alert(m1[i].ID_MOTIVO);
                                            } else if (String(m1[i].ID_MOTIVO) === String("-3") && String(m1[i].ID_MECANICO) === String(pernrg)) {
                                                conNoInicU++;
                                                m2.push(m1[i]);
                                                //		alert(m1[i].ID_MOTIVO);
                                            } else if (String(m1[i].ID_MOTIVO) !== String("-1") && String(m1[i].ID_MOTIVO) !== String("-2") && String(m1[i].ID_MOTIVO) !==
                                                String("-3") && String(m1[i].ID_MECANICO) === String(pernrg) && String(m1[i].ID_MOTIVO) !== String("15")) {
                                                contDetU++;
                                                m2.push(m1[i]);
                                            }
                                        }
                                        //	console.log("M2  " + JSON.stringify(m2));
                                        //this.onSetListaOrdenesTR(m2);
                                        console.log("222TERMINO ACTUALIZACION CONTADORES22222");
                                        self.byId("contPosU").setCount(contPosU);
                                        self.byId("conNoInicU").setCount(conNoInicU);
                                        self.byId("contDetU").setCount(contDetU);
                                        countOrdenU = contPosU + conNoInicU + contDetU;
                                        self.byId("countOrdenU").setCount(countOrdenU);
                                }
                            }else{
                                viewg.byId("idBtnActJ").setVisible(true);
                            }
                        }else{
                            viewg.byId("BusyDialogG").close();
                            viewg.byId("idIconTabBarUsuario").setVisible(true);
                            
                            //	sap.m.MessageToast.show("No existe historial del técnico en Time Recording");	
                        }

                        }catch(e){
                            console.log(e.message);
                            //		sap.m.MessageToast.show("No existe historial del técnico en Time Recording");	
                            viewg.byId("BusyDialogG").close();
                            viewg.byId("idIconTabBarUsuario").setVisible(true);
                        }
                    });	
                });
Jose Lopez*/                
            },
            
            getInnerOperOrden2:function(){
                var self = this;
                var rut = pernrg.replace(".", "").replace(".", "").replace(".", "");
                var oFiltersTRH={
                    "p_mecanico":rut
                };
                console.log("CONSULTA ES TECNICO "+JSON.stringify(oFiltersTRH));
                var timeout = jQuery.sap.delayedCall(500, this, function () {
                    service.ListainnerOperOrden(oFiltersTRH, function (result) {
                        
                        try{
                        if(result.data.OUT_LISTA.length > 0){
                            
    //-----------------------------------------------------------------------------------------//
    // Modificado por Samuel Silva
    // Motivo:S139569 Error en detención OT Timerecording
    // Fecha: 16-11-2020
    //------------------------------------------------------------------------------------------//
                            var l1 = result.data.OUT_LISTA;
                            var l2 = result.data.OUT_LISTA;
                            var resultado = [];
                            for (var i = 0; i < l1.length; i++) {
                                //console.log("FOR M1   "+JSON.stringify(m1[i]) + "-" + pernrg);
                                for (var j = 0; j < l2.length; j++) { 
                                     if (String(l1[i].ACTIVITY) === String(l2[j].ACTIVITY) && String(l1[i].AUFNR) === String(l2[j].AUFNR) &&
                                        l1[i].ID_ORDEN >  l2[j].ID_ORDEN ) {	
                                        l2[j].ID_ORDEN = "";
                                    }   
                                }
                            }
                            ;
                               for (var i = 0; i < l2.length; i ++) { 
                             if (String(l2[i].ID_ORDEN) !== ""){resultado.push(l2[i]);}  
                            }   
                            result.data.OUT_LISTA = resultado;
                            
    //-------------------------------------------------------------------------------------------//	
    
    
                            resultTR = result;
                            
                        //	console.log("RESULT CONSULTA ES TECNICO "+JSON.stringify(oFiltersTRH));
                        //	console.log("RESULT CONSULTA ES TECNICO "+JSON.stringify(resultTR));
                        //	self.onCargaGrilla();
                              if(esTecnico){
                                  viewg.byId("btnIrUsuario").firePress();
                                  viewg.byId("idBtnAct").setVisible(true);
                                      console.log(">>>>SUCESS getInnerOperOrden"); 
                              //	self.mostrarOrdenesPorPERNR();
                              
                                          var m1 = result.data.OUT_LISTA;
                                        var m2 = [];
                            
                                        var listEjecucion = [];
                                        var listNoIniciadas = [];
                                        var listDetencion = [];
                            
                                        var contPosU = 0;
                                        var conNoInicU = 0;
                                        var contDetU = 0;
                                        var countOrdenU = 0;
                            
                                        console.log("LENGTH: >>> " + m1.length + "PERNR " + String(pernrg));
                            
                                        for (var i = 0; i < m1.length; i++) {
                                            //console.log("FOR M1   "+JSON.stringify(m1[i]) + "-" + pernrg);
                                            if (String(m1[i].ID_MOTIVO) === String("-1") && String(m1[i].ID_MECANICO) === String(pernrg)) {
                                                contPosU++;
                                                cont++;
                                                //alert("IF"+m1[i].ID_MOTIVO+"   "+ m1[i].DESCRIPTION);
                                                m2.push(m1[i]);
                                            } else if (String(m1[i].ID_MOTIVO) === String("-2") && String(m1[i].ID_MECANICO) === String(pernrg)) {
                                                conNoInicU++;
                                                m2.push(m1[i]);
                                                //		alert(m1[i].ID_MOTIVO);
                                            } else if (String(m1[i].ID_MOTIVO) === String("-3") && String(m1[i].ID_MECANICO) === String(pernrg)) {
                                                conNoInicU++;
                                                m2.push(m1[i]);
                                                //		alert(m1[i].ID_MOTIVO);
                                            } else if (String(m1[i].ID_MOTIVO) !== String("-1") && String(m1[i].ID_MOTIVO) !== String("-2") && String(m1[i].ID_MOTIVO) !==
                                                String("-3") && String(m1[i].ID_MECANICO) === String(pernrg) && String(m1[i].ID_MOTIVO) !== String("15")) {
                                                contDetU++;
                                                m2.push(m1[i]);
                                            }
                            
                                        }
                                    //	console.log("M2  " + JSON.stringify(m2));
                                        //this.onSetListaOrdenesTR(m2);
                                        console.log("222TERMINO ACTUALIZACION CONTADORES22222");
                                        self.byId("contPosU").setCount(contPosU);
                                        self.byId("conNoInicU").setCount(conNoInicU);
                                        self.byId("contDetU").setCount(contDetU);
                                        countOrdenU = contPosU + conNoInicU + contDetU;
                                        self.byId("countOrdenU").setCount(countOrdenU);
                                  
                              }else{
                                  viewg.byId("idBtnActJ").setVisible(true);
                              }
                              
                        }else{
                            viewg.byId("BusyDialogG").close();
                            viewg.byId("idIconTabBarUsuario").setVisible(true);
                            
                    //		sap.m.MessageToast.show("No existe historial del técnico en Time Recording");	
                        }
                        
                        }catch(e){
                            console.log(e.message);
                    //		sap.m.MessageToast.show("No existe historial del técnico en Time Recording");	
                                viewg.byId("BusyDialogG").close();
                            viewg.byId("idIconTabBarUsuario").setVisible(true);
                            
                        }
                          
                    });	
                });
            },
            getOrdenes2: function () {
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "ordenes2.xsjs";
                var response = undefined;
                this.show_no_time_limit();
/*Jose Lopez    
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: true
                    }).success(function (results) {
    
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            if(results === ""){
                                response = {data:[]};
                            }else{
                                if(results === ""){
                                    response = {data:[]};
                                }else{
                                    response = JSON.parse(results);	
                                }
                            }
                        }
    
                        ordenesTR = response;
                        //	console.log(ordenesTR.data.length)
                        //	console.log(JSON.stringify(ordenesTR));
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
Jose Lopez*/    
                var oScoModel = new sap.ui.model.json.JSONModel();
                oScoModel.loadData("model/ajaxdata.json");
                oScoModel.attachRequestCompleted(function(oEvent) {
                    response = oScoModel.getProperty("/ordenes2.xsjs");
                });
                return response;
            },
            
            getOrdenes2Synch: function () {
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "ordenes2.xsjs";
                var response = undefined;
                this.show_no_time_limit();
    
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: true
                    }).success(function (results) {
    
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            if(results === ""){
                                response = {data:[]};
                            }else{
                                response = JSON.parse(results);	
                            }
                        }
    
                        ordenesTR = response;
                        that.getOperaciones2Synch();
                        //	console.log(ordenesTR.data.length)
                        //	console.log(JSON.stringify(ordenesTR));
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
    
                return response;
            },
    
    
            getOrdenes2Synch2: function () {
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "ordenes2.xsjs";
                var response = undefined;
                this.show_no_time_limit();
    
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: true
                    }).success(function (results) {
    
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            if(results === ""){
                                response = {data:[]};
                            }else{
                                response = JSON.parse(results);	
                            }
                        }
    
                        ordenesTR = response;
                        that.getOperaciones2Synch2();
                        //	console.log(ordenesTR.data.length)
                        //	console.log(JSON.stringify(ordenesTR));
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
    
                return response;
            },			
            
            getOrdenes2JT : function () {
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "ordenes2.xsjs";
                var response = undefined;
                this.show_no_time_limit();
/*Jose Lopez     
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: true
                    }).success(function (results) {
    
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            if(results === ""){
                                response = {data:[]};
                            }else{
                                response = JSON.parse(results);	
                            }
                        }
    
                        ordenesTR = response;
                        that.getOperaciones2JT();
                        //	console.log(ordenesTR.data.length)
                        //	console.log(JSON.stringify(ordenesTR));
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
Jose Lopez*/    
                var oScoModel = new sap.ui.model.json.JSONModel();
                oScoModel.loadData("model/ajaxdata.json");
                oScoModel.attachRequestCompleted(function(oEvent) {
                    response = oScoModel.getProperty("/ordenes2.xsjs");
                    ordenesTR = response;
                    that.getOperaciones2JT();                    
                });
                return response;
            },		
    
            getOperaciones2: function () {
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "operaciones.xsjs";
                var response = undefined;
                this.show_no_time_limit();
/*    
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: true
                    }).success(function (results) {
    
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            if(results === ""){
                                response = {data:[]};
                            }else{
                                response = JSON.parse(results);	
                            }
                        }
    
                        operacionesTR = response;
                    //	console.log("OPERACIONES2 ---->"+JSON.stringify(operacionesTR));
                        //	console.log(operacionesTR.data.length)
                        //	console.log(JSON.stringify(operacionesTR));
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
Jose Lopez*/
                    var oScoModel = new sap.ui.model.json.JSONModel();
                    oScoModel.loadData("model/ajaxdata.json");
                    oScoModel.attachRequestCompleted(function(oEvent) {
                        that.hideBusyIndicator();
                        response = oScoModel.getProperty("/operaciones.xsjs/response");
                        operacionesTR = response;
                    });
                return response;
            },
            
            
            getOperaciones2Synch : function () {
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "operaciones.xsjs";
                var response = undefined;
                this.show_no_time_limit();
    
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: true
                    }).success(function (results) {
    
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            if(results === ""){
                                response = {data:[]};
                            }else{
                                response = JSON.parse(results);	
                            }
                        }
    
                        operacionesTR = response;
                        that.getTimeLog3Synch();
                        //	console.log(operacionesTR.data.length)
                        //	console.log(JSON.stringify(operacionesTR));
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
    
                return response;
            },		
    
            getOperaciones2Synch2 : function () {
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "operaciones.xsjs";
                var response = undefined;
                this.show_no_time_limit();
    
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: true
                    }).success(function (results) {
    
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            if(results === ""){
                                response = {data:[]};
                            }else{
                                response = JSON.parse(results);	
                            }
                        }
    
                        operacionesTR = response;
                        that.getTimeLog3Synch2();
                        //	console.log(operacionesTR.data.length)
                        //	console.log(JSON.stringify(operacionesTR));
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
    
                return response;
            },		
            
            getOperaciones2JT : function () {
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "operaciones.xsjs";
                var response = undefined;
                this.show_no_time_limit();
/* Jose Lopez    
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: true
                    }).success(function (results) {
    
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            if(results === ""){
                                response = {data:[]};
                            }else{
                                response = JSON.parse(results);	
                            }
                        }
    
                        operacionesTR = response;
                        that.getTimeLog3JT();
                        //	console.log(operacionesTR.data.length)
                        //	console.log(JSON.stringify(operacionesTR));
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
Jose Lopez*/
                    var oScoModel = new sap.ui.model.json.JSONModel();
                    oScoModel.loadData("model/ajaxdata.json");
                    oScoModel.attachRequestCompleted(function(oEvent) {
                        that.hideBusyIndicator();
                        response = oScoModel.getProperty("/operaciones.xsjs/response");
                        operacionesTR = response;
                    });

                return response;
            },
                    
            getTimeLog3JT : function () {
                
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "timeLog2.xsjs";
                var response = undefined;
                this.show_no_time_limit();
                
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: true
                    }).success(function (results) {
    
                //		that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            response = JSON.parse(results);
                        }
                        that.hideBusyIndicator();
    
                        timeLogTR = response;
                        //llamar a...
                        that.onCargaGrillaJT();
                        //		console.log(ordenesTR.data.length)
                        //		console.log(JSON.stringify(ordenesTR));
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
    
                return response;
            },	
            
            
            getTimeLog3Synch : function () {
            
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "timeLog2.xsjs";
                var response = undefined;
                this.show_no_time_limit();
                
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: true
                    }).success(function (results) {
    
                //		that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            response = JSON.parse(results);
                        }
                        that.hideBusyIndicator();
    
                        timeLogTR = response;
                        //llamar a...
                        console.log(">>>>ANTES DE LLAMAR A getInnerOperOrden");
                        that.getInnerOperOrden2();
                        //		console.log(ordenesTR.data.length)
                        //		console.log(JSON.stringify(ordenesTR));
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
    
                return response;
            },	
    
    
            getTimeLog3Synch2 : function () {
            
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "timeLog2.xsjs";
                var response = undefined;
                this.show_no_time_limit();
                
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: true
                    }).success(function (results) {
    
                //		that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            response = JSON.parse(results);
                        }
                        that.hideBusyIndicator();
    
                        timeLogTR = response;
                        //llamar a...
                        console.log(">>>>ANTES DE LLAMAR A getInnerOperOrden");
                        that.onCargaGrillaIni();
                        //		console.log(ordenesTR.data.length)
                        //		console.log(JSON.stringify(ordenesTR));
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
    
                return response;
            },	
            
            
                    
            getTimeLog3: function () {
                
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "timeLog2.xsjs";
                var response = undefined;
                this.show_no_time_limit();
                
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: true
                    }).success(function (results) {
    
                //		that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            response = JSON.parse(results);
                        }
    
                        timeLogTR = response;
                        //llamar a...
                        that.onCargaGrilla2();
                        //		console.log(ordenesTR.data.length)
                        //		console.log(JSON.stringify(ordenesTR));
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
    
                return response;
            },		
    
            getTimeLog2: function () {
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "timeLog2.xsjs";
                var response = undefined;
            //	this.show_no_time_limit();
/*Jose Lopez                
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: true
                    }).success(function (results) {
    
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            response = JSON.parse(results);
                        }
    
                        timeLogTR = response;
                        //		console.log(ordenesTR.data.length)
                        //		console.log(JSON.stringify(ordenesTR));
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
Jose Lopez*/    
                var oScoModel = new sap.ui.model.json.JSONModel();
                oScoModel.loadData("model/ajaxdata2.json");
                oScoModel.attachRequestCompleted(function(oEvent) {
                    that.hideBusyIndicator();
                    response = oScoModel.getProperty("/timeLog2.xsjs/response");
                    timeLogTR = response;
                });
                return response;
            },
    
            getOrdenes: function (iAsync, iCallback) {
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "ordenes.xsjs";
                var response = undefined;
                this.show_no_time_limit();
/* Jose Lopez                
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        //async: iAsync
                        async: iAsync
                    }).success(function (results) {
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === "object") {
                            response = results;
                        } else {
                            response = JSON.parse(results);
                        }
                        if (iCallback) {
                            iCallback(response);
                        }
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        if (err !== undefined) {
                            // var oErrorResponse = $.parseJSON(err.responseText);
                            // sap.m.MessageToast.show(oErrorResponse.message, {
                            // 	duration: 6000
                            // });
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
Jose Lopez*/        
                    that.hideBusyIndicator();
                    response = {"data":[{"aufnr": "0000000000",
                    "completada": "FALSE",
                    "eliminado": "FALSE",
                    "es_sin_asignacion": "TRUE",
                    "id": 400,
                    "kunnr": "0000000000",
                    "name1": "",
                    "operaciones": [{"aplzl": "202205",
                    "aufnr": "0000000000",
                    "completada": "FALSE",
                    "es_sin_asignacion": "TRUE",
                    "id": 759,
                    "id_orden": 400,
                    "ltxa1": "Sin Asignación 05-2022",
                    "mecanico": "TIMEREC_COM"}],
                    "qmtxt": "Sin Asignación"}]};
                    if (iCallback) {
                        iCallback(response);
                    }                            
                    return response;
            },
    
            getOrdenesAndSet: function (iOtKey, iOpKey, iAsync) {
                var that = this;
                var callback = function (ord) {
                    if (ord) {
                        var oModel = that.getView().getModel("salfaotX");
                        oModel.setData(ord);
                        that.setSelectedOrden(iOtKey);
                        that.setSelectedOperacion(iOpKey);
                    }
                };
    
                this.getOrdenes(false, callback);
    
            },
    
            handleControlDataModelChanged: function () {
                // sap.m.MessageToast.show("Cambió controlData! ", {
                // 	duration: 5000
                // });
            },
    
            handleOtModelChanged: function (text) {
                /*sap.m.MessageToast.show("Cambió! evento disparado: " + text, {
                    duration: 5000
                });*/
                var oModel = this.getView().getModel("salfaotX");
                var ordenes = oModel.getData();
                var iNumber = 0;
                if (oModel && oModel.getData().data) {
                    iNumber = oModel.getData().data.length;
                }
                //this.getView().byId("header").setNumber(iNumber);
    
                //this.getView().byId("header").setTitle(iNumber);
            },
    
            setOtsVisibility: function () {
                var oModel = this.getView().getModel("salfaotX");
                var ordenes = oModel.getData();
                var selectedOrden = this.getSelectedOrden();
                var idSelectedOrden;
                if (selectedOrden) {
                    idSelectedOrden = selectedOrden.id;
                }
    
                if (ordenes.data && ordenes.data.length > 0) {
                    //deshabilito las ordenes tipo "sin asignacion"
                    for (var i = 0; i < ordenes.data.length; i++) {
                        var es_sin_asignacion = ordenes.data[i].es_sin_asignacion;
                        es_sin_asignacion = es_sin_asignacion.toUpperCase();
                        if (es_sin_asignacion === "TRUE") {
                            //Si hay mas de una orden, es porque hay ordenes aparte de la sin asignacion,
                            //por lo que no muestro la orden sin asignacion
                            if (ordenes.data.length > 1) {
                                if (!idSelectedOrden) { //si no hay orden selecco
                                    ordenes.data[i].enabled = false;
                                }
                                //Si no hay orden seleccionada y hay mas ordenes aparte de la "sin asignacion", deshabilito la "sin asignacion"
                                //Si hay orden seleccionada y es la sin asignacion y el reloj no está corriendo, la deshabilito
                                //if (!idSelectedOrden || (idSelectedOrden && idSelectedOrden !== i)) {
                                if (!idSelectedOrden || (idSelectedOrden)) {
                                    ordenes.data[i].enabled = false;
                                    //ordenes.data[i].visible = false;
                                }
    
                            } else {
                                ordenes.data[i].enabled = true;
                                //ordenes.data[i].visible = true;
                            }
                        }
                    }
                }
            },
    
            handleOtModelChanged2: function (text) {
                // sap.m.MessageToast.show("Cambió! evento disparado: " + text, {
                // 	duration: 5000
                // });
                return;
                var oModel = this.getView().getModel("salfaot");
                var iNumber = 0;
                if (oModel && oModel.getData().orden) {
                    iNumber = oModel.getData().orden.length;
                }
                this.getView().byId("header").setNumber(iNumber);
                //this.getView().byId("header").setTitle(iNumber);
            },
    
            updateOtOpComboBoxes: function (item) {
                if (item === undefined || item === null) {
                    //para que no haya operaciones en el combobox
                    this.getView().setModel(new sap.ui.model.json.JSONModel({
                        data: []
                    }), "salfaopX");
                    //Para que no aparezca ningun nombre de cliente
                    this.getView().byId("cliente").setText("");
                    return;
                }
                var otModel = this.getView().getModel("salfaotX");
                var ordenes = otModel.getData();
                var operaciones;
                var key = item.getKey();
                var filtered = ordenes.data.filter(function (itm) {
                    var id = itm.id + "";
                    return id === key;
                });
                if (filtered[0]) {
                    operaciones = filtered[0].operaciones;
                }
                if (otModel && operaciones) {
                    var opModel = new sap.ui.model.json.JSONModel({
                        data: operaciones
                    });
                    this.getView().setModel(opModel, "salfaopX");
                    this.getView().byId("cliente").setText(filtered[0].name1);
                    //this.getView().byId("header").setTitle(filtered[0].mecanico);
                }
            },
    
            getElapsed: function (idOt, idOp) {
                return 1000 * 60 * 15; //15 min
            },
    
            getSelectedOrden: function () {
                var otCombobox = this.getView().byId("ot");
                var oModel = this.getView().getModel("salfaotX");
                var ordenes = oModel.getData();
                var item;
                var orden;
                if (otCombobox) {
                    item = otCombobox.getSelectedItem();
                    if (!item) {
                        return undefined;
                    }
                    var key = item.getKey() + "";
                    var filtered = ordenes.data.filter(function (itm) {
                        var id = itm.id + "";
                        return id === key;
                    });
                    if (filtered[0]) {
                        orden = filtered[0];
                    }
                }
                return orden;
            },
    
            getSelectedOperacion: function () {
                var opCombobox = this.getView().byId("op");
                var oModel = this.getView().getModel("salfaopX");
                var operaciones = oModel.getData();
                var item;
                var operacion;
                if (opCombobox) {
                    item = opCombobox.getSelectedItem();
                    if (!item) {
                        return undefined;
                    }
                    var key = item.getKey() + "";
                    var filtered = operaciones.data.filter(function (itm) {
                        var id = itm.id + "";
                        return id === key;
                    });
                    if (filtered[0]) {
                        operacion = filtered[0];
                    }
                }
                return operacion;
            },
    
            handleOpSelected: function () {
                var operacion = this.getSelectedOperacion();
                var oModel;
                if (operacion) {
                    this.getView().byId("bStart").setEnabled(true);
                    operacion.clock = new Clock();
                    oModel = operacion.clock.getModel();
                    this.clock.setModel(oModel);
                    this.getElapsedTime(operacion.id_orden, operacion.id);
                    /*if (!operacion.clock) {
                        operacion.clock = new Clock();
    
                        var elapsed = this.getElapsed(operacion.id_orden, operacion.id);
                        
                        this.getElapsedTime();
                        //operacion.clock.setElapsedTime(elapsed);
                        //oModel = operacion.clock.getModel();
                        //this.clock.setModel(oModel);
                        if (this.startDate !== undefined && this.stopDate === undefined) {
                            this.clock.startTimer(this.startDate);
                        }
                    } else {
                        oModel = operacion.clock.getModel();
                        this.clock.setModel(oModel);
                    }*/
                } else {
                    //this.getView().byId("bStart").setEnabled(false);
                    this.clock.setModel((new Clock()).getModel());
                }
    
                return;
    
            },
    
            setSelectedOrden: function (key) {
                var oModel = this.getView().getModel("salfaotX");
                if (oModel) {
                    var ordenes = oModel.getData();
                    if (ordenes && ordenes.data) {
                        for (var i = 0; i < ordenes.data.length; i++) {
                            if (ordenes.data[i].id.toString() === key + "") {
                                ordenes.data[i].enabled = true;
                            }
                        }
                    }
                }
    
                var oComboOt = this.getView().byId("ot");
            //	oComboOt.setSelectedKey(key);
            //	this.handleOtSelected();
            },
    
            setSelectedOperacion: function (key) {
                var oComboOp = this.getView().byId("op");
            //	oComboOp.setSelectedKey(key);
            //	this.handleOpSelected();
            },
    
            handleOtSelected: function () {
                var oModel = this.getView().getModel("salfaotX");
                var data = oModel.getData();
                //data.selectedKey = 2;
                //oModel.setData(data);
                var oComboOt = this.getView().byId("ot");
                var oComboOp = this.getView().byId("op");
                this.setSelectedOperacion(null);
                // oComboOp.setSelectedItem(null);
    
                var item = oComboOt.getSelectedItem();
                this.updateOtOpComboBoxes(item);
                this.setOtsVisibility();
                this.setStatusText("");
                return;
            },
    
            refreshOrdenes: function () {
                var orden = this.getSelectedOrden();
                var operacion = this.getSelectedOperacion();
                var idOrden, idOperacion;
                if (orden) {
                    idOrden = orden.id;
                }
                if (operacion) {
                    idOperacion = operacion.id;
                }
                this.getOrdenesAndSet(idOrden, idOperacion, false);
            },
    
            getPostLogTemplate: function () {
                return {
                    time_log: {
                        id_orden: -1,
                        id_operacion: -1,
                        id_motivo: -1,
                        fecha_inicio: "0000-00-00",
                        hora_inicio: "00:00:00",
                        fecha_fin: "0000-00-00",
                        hora_fin: "00:00:00",
                        observaciones: ""
                    }
                };
            },
    
            getPostOperacionesTemplate: function () {
                return {
                    operacion: {
                        aufnr: "",
                        aplzl: "",
                        ltxa1: ""
                    }
                }
            },
    
            getPostOrdenTemplate: function () {
                return {
                    orden: {
                        aufnr: "",
                        qmtxt: "",
                        kunnr: "",
                        name1: ""
                    }
                }
            },
    
            fillMissingZeroes: function (i) {
                return (i < 10) ? "0" + i : i;
            },
    
            splitDateTime: function (iDate) {
                var hour, min, sec, day, month, year;
                hour = this.fillMissingZeroes(iDate.getHours());
                min = this.fillMissingZeroes(iDate.getMinutes());
                sec = this.fillMissingZeroes(iDate.getSeconds());
                day = this.fillMissingZeroes(iDate.getDate());
                month = this.fillMissingZeroes(iDate.getMonth() + 1);
                year = iDate.getFullYear();
    
                return {
                    date: year + "-" + month + "-" + day,
                    time: hour + ":" + min + ":" + sec
                };
    
            },
    
            getElapsedTime: function (idOrden, idOperacion) {
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "timeLog.xsjs?id_orden=" + idOrden + "&id_operacion=" + idOperacion;
                var response = undefined;
                this.show_no_time_limit();
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        async: true
                    }).success(function (results) {
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === 'object') {
                            response = results;
                        } else {
                            response = JSON.parse(results);
                        }
    
                        //alert(JSON.stringify(response));
                        var motivoDetencion = "Medición no iniciada";
                        if (response.data) {
                            var elapsed = 0;
                            var fechaInicioSinFechaFin;
                            var tl;
                            for (var i = 0; i < response.data.length; i++) {
                                motivoDetencion = response.data[i].descripcion;
                                 if (response.data[i].fecha_fin) {
                                    var aux = response.data[i].fecha_inicio + "T" + response.data[i].hora_inicio;
                                    var d1 = new Date(aux);
    
                                    aux = response.data[i].fecha_fin + "T" + response.data[i].hora_fin;
                                    var d2 = new Date(aux);
                                    elapsed += d2 - d1;
                                    tl = response.data[i];
                                 } else {
                                    tl = response.data[i];
                                    fechaInicioSinFechaFin = new Date(response.data[i].fecha_inicio + "T" + response.data[i].hora_inicio);
                                 }
                            }
                            that.setStatusText(motivoDetencion);
                            that.clock.setElapsedTime(elapsed);
                            //si hay fecha inicio, pero no fecha fin, es porque el reloj no se detuvo,
                            //por lo cual se inicia el contador desde donde quedó
                             //if (fechaInicioSinFechaFin) {
                                that.currentTimeLog = {
                                    data: {
                                        id: tl.id,
                                        id_orden: tl.id_orden,
                                        id_operacion: tl.id_operacion,
                                        fecha_inicio: tl.fecha_inicio,
                                        hora_inicio: tl.hora_inicio
                                    }
                                };
                                that.clock.startTimer(fechaInicioSinFechaFin);
                                that.setButtonStyle();
                                that.setStatusText("Medición en ejecución");
                            // }
                        } else {
                            that.setStatusText(motivoDetencion);
                        }
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        that.getView().byId("bStart").setEnabled(false);
                        if (err !== undefined) {
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
            },
            
            getElapsedTime2: function (idOrden, idOperacion) {
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "timeLog.xsjs?id_orden=" + idOrden + "&id_operacion=" + idOperacion;
                var response = undefined;
                this.show_no_time_limit();
                $.ajax({
                        type: 'GET',
                        url: sUrl,
                        async: true
                    }).success(function (results) {
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === 'object') {
                            response = results;
                        } else {
                            response = JSON.parse(results);
                        }
    
                        //alert(JSON.stringify(response));
                        var motivoDetencion = "Medición no iniciada";
                        if (response.data) {
                            var elapsed = 0;
                            var fechaInicioSinFechaFin;
                            var tl;
                            for (var i = 0; i < response.data.length; i++) {
                                motivoDetencion = response.data[i].descripcion;
                                 if (response.data[i].fecha_fin) {
                                    var aux = response.data[i].fecha_inicio + "T" + response.data[i].hora_inicio;
                                    var d1 = new Date(aux);
    
                                    aux = response.data[i].fecha_fin + "T" + response.data[i].hora_fin;
                                    var d2 = new Date(aux);
                                    elapsed += d2 - d1;
                                    tl = response.data[i];
                                 } else {
                                    tl = response.data[i];
                                    fechaInicioSinFechaFin = new Date(response.data[i].fecha_inicio + "T" + response.data[i].hora_inicio);
                                 }
                            }
                            that.setStatusText(motivoDetencion);
                            that.clock.setElapsedTime(elapsed);
                            //si hay fecha inicio, pero no fecha fin, es porque el reloj no se detuvo,
                            //por lo cual se inicia el contador desde donde quedó
                             //if (fechaInicioSinFechaFin) {
                                that.currentTimeLog = {
                                    data: {
                                        id: tl.id,
                                        id_orden: tl.id_orden,
                                        id_operacion: tl.id_operacion,
                                        fecha_inicio: tl.fecha_inicio,
                                        hora_inicio: tl.hora_inicio
                                    }
                                };
                                //that.clock.startTimer(fechaInicioSinFechaFin);
                                that.setButtonStyle();
                                that.setStatusText("Medición en ejecución");
                            // }
                        } else {
                            that.setStatusText(motivoDetencion);
                        }
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        that.getView().byId("bStart").setEnabled(false);
                        if (err !== undefined) {
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
            },
    
            postLog: function (iDate) {
                var selectedOperacion = this.getSelectedOperacion();
                if (!selectedOperacion) {
                    return;
                }
    
                //Se llenan los datos a enviar:
                var data = this.getPostLogTemplate();
                var dateTime = this.splitDateTime(iDate);
                data.time_log.id_orden = selectedOperacion.id_orden;
                data.time_log.id_operacion = selectedOperacion.id;
                data.time_log.fecha_inicio = dateTime.date;
                data.time_log.hora_inicio = dateTime.time;
    
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "timeLog.xsjs";
                var response;
                this.show_no_time_limit();
                $.ajax({
                        type: 'POST',
                        url: sUrl,
                        data: JSON.stringify(data),
                        async: true
                    }).success(function (results) {
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === 'object') {
                            response = results;
                        } else {
                            response = JSON.parse(results);
                        }
                        if (response.data) {
                            that.currentTimeLog = response;
                        }
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        //Si no pude actualizar el log, detengo el contador y lo reinicializo 
                        var elapsedTime = that.clock.getElapsedTime();
                        that.clock.stopTimer();
                        that.clock.setModel((new Clock).getModel());
                        that.clock.setElapsedTime(elapsedTime);
                        that.setButtonStyle();
                        if (err !== undefined) {
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
            },
    
            marcarOperacionTerminada: function (idOperacion, idOrden) {
                var oDataOrdenes = this.getView().getModel("salfaotX");
                var dataOrdenes = oDataOrdenes.getData();
                var oDataOperaciones = this.getView().getModel("salfaopX");
                var dataOperaciones = oDataOperaciones.getData();
                var i, indexOperacion, indexOrden;
                var key = idOrden;
                var encontrado = false;
                for (i = 0; i < dataOrdenes.data.length; i++) {
                    if (key === dataOrdenes.data[i].id) {
                        indexOrden = i;
                        encontrado = true;
                        break;
                    }
                }
    
                var newOperaciones = []; //nuevo arreglo sin la operacion que queremos eliminar (la que ha sido culminada)
                if (encontrado === true) {
                    key = idOperacion;
                    var operaciones = dataOrdenes.data[indexOrden].operaciones; //operaciones de la orden actual
                    for (i = 0; i < operaciones.length; i++) {
                        if (key === operaciones[i].id) {
                            indexOperacion = i;
                            operaciones[i].completada = true.toString().toUpperCase(); //la operacion que ha sido marcada como terminada
                        }
                        if (operaciones[i].completada.toString().toUpperCase() === false.toString().toUpperCase()) {
                            //agregamos todas aquellas operaciones que no hayan sido terminadas y las asignaremos a la orden
                            newOperaciones.push(operaciones[i]);
                        }
                    }
                    //si la orden no tiene operaciones sin terminar, quiere decir
                    //que todas han sido terminadas y por lo tanto la orden actual tmbien
                    //debe ser terminada
                    if (newOperaciones.length === 0) {
                        //eliminamos la orden actual de la lista de ordenes
                        dataOrdenes = dataOrdenes.data.splice(indexOrden, 1);
                        //ninguna orden seleccionada
                        this.setSelectedOrden(null);
                    } else {
                        //se actualizan las operaciones de la orden actual para que queden solamente aquellas que no han sido completadas
                        dataOrdenes.data[indexOrden].operaciones = newOperaciones;
                        oDataOrdenes.setData(dataOrdenes);
                        this.getView().setModel(oDataOrdenes, "salfaotX");
                        this.setSelectedOrden(indexOrden);
                    }
                }
                //this.setSelectedOrden(iOtKey);
    
            },
    
            checkIfTrabajoFinalizado: function (idMotivo, idOperacion, idOrden) {
                var oData = this.getView().getModel("motivos");
                if (!oData) {
                    return;
                }
    
                var motivos = oData.getData();
                var key = idMotivo;
                var i = 0;
                var encontrado = false;
    
                for (i = 0; i < motivos.data.length; i++) {
                    if (motivos.data[i].id.toString() === key.toString()) {
                        encontrado = true;
                        break;
                    }
                }
    
                if (encontrado === false) {
                    return;
                }
                if (motivos.data[i].indica_termino.toString().toUpperCase() === true.toString().toUpperCase()) {
                    this.setSelectedOperacion(null);
                    this.marcarOperacionTerminada(idOperacion, idOrden);
                }
            },
    
            updateLog: function (iDate, idMotivo, iComentarios) {
                var oData = this.getView().getModel("salfaotX");
                var opCombobox = this.getView().byId("op");
                if (!oData || !opCombobox) {
                    return;
                }
    
                var selectedOperacion = this.getSelectedOperacion();
                if (!selectedOperacion) {
                    return;
                }
    
                //Se llenan los datos a enviar:
                var data = {
                    time_log: {
                        fecha_fin: "0000-00-00",
                        hora_fin: "00:00:00",
                        id_motivo: idMotivo,
                        observaciones: iComentarios
                    }
                };
                var dateTime = this.splitDateTime(iDate);
                data.time_log.fecha_fin = dateTime.date;
                data.time_log.hora_fin = dateTime.time;
    
                var that = this;
                //var sUrl = "/destinations/timerecording_app_qas2/ordenes.xsjs";
                var sUrl = this.destinationBaseUrl + "timeLog.xsjs?id=" + this.currentTimeLog.data.id;
                var response;
                this.show_no_time_limit();
                $.ajax({
                        type: 'PUT',
                        url: sUrl,
                        data: JSON.stringify(data),
                        async: true
                    }).success(function (results) {
                        that.hideBusyIndicator();
                        //var oJson = JSON.parse(results);
                        if (typeof results === 'object') {
                            response = results;
                        } else {
                            response = JSON.parse(results);
                        }
                        if (response.data) {
                            that.currentTimeLog = response;
                            that.checkIfTrabajoFinalizado(response.data.id_motivo, response.data.id_operacion, response.data.id_orden);
                        }
    
                    })
                    .fail(function (err) {
                        that.hideBusyIndicator();
                        that.clock.setStopDate(undefined);
                        that.clock.startTimer(that.clock.getStartDate());
                        that.setButtonStyle();
                        if (err !== undefined) {
                            that.displayAjaxError(err);
                        } else {
                            sap.m.MessageToast.show("Unknown error!");
                        }
                    });
            },
    
            startClock: function (iStartDate) {
                /*this.getDialog().open();
                return;*/
    
                this.clock.startTimer(iStartDate);
                var startDate = this.clock.getStartDate();
                this.setButtonStyle();
                this.postLog(startDate);
    
            },
    
            stopClock: function () {
                this.openMotivosDialog();
                var stopDate = this.clock.stopTimer();
                this.setButtonStyle();
                //this.updateLog(stopDate);
            },
    
            handleStartPress: function (oEvent) {
    
                //this.getDialog().open();
                //return;
                console.log(">>>>ONINICIAR");
                
                var self = this;
                if (this.clock.isTimerRunning() === false) {
                    console.log(">>>>REGISTRO NUEVO ");
                    
                    //this.clock.constructor();
                    this.clock.updateTimeLabels();
                    console.log(">>>>ACTUALIZO RELOJ ");
                    this.clock.startTimer();
                    console.log(">>>>INICIO RELOJ  ");
                    var self = this;
                    
                    this.startClock();
                    this.startDate = this.clock.getStartDate();
                    this.setStatusText("Medición en ejecución");
                    
                    
                    var dateTime = this.splitDateTime(this.startDate);
                    
                    var valor = this.getView().byId("idObjTimer").getTitle().split("-")[0].trim();
                    var oper  = this.getView().byId("oa1").getText().split("-")[0].trim();
                    
                    if(ordenG.length === 8 ){
                        ordenG="0000" + ordenG;
                    }else{
                        //valor = valor;
                    }
                    //alert(valor);
                    var obj11 = {
                        "fecha_fin": "",
                        "hora_fin": "",
                        "fecha_ini": dateTime.date,
                        "hora_ini": dateTime.time,
                        "id_motivo": "-1",
                        "observaciones": "",
                        "p_orden": ordenG,
                        "p_oper": operG
                    };
                    console.log("JSON ENTRADA TIMELOG" + JSON.stringify(obj11));
                //	utilUI.gloading(true);
    //-----------------------------------------------------------------------------------------//
    // Modificado por Samuel Silva
    // Motivo:S139569 Error en detención OT Timerecording
    // Fecha: 16-11-2020
    //------------------------------------------------------------------------------------------//
    //				service.updateTimeLog(obj11, function (result) {
    // ------------------------------------ comentado -------------------------------------------//
                    service.insertTimerLog(obj11, function (result) {
    //------------------------------------------------------------------------------------------//
                        if (result.c === "s") {
                            tituloIdTimeLog = result.data.OUT_LISTA[0].ID;
                            console.log("RESULT INSERT " + JSON.stringify(result.data.OUT_LISTA[0].ID));
    
                        /*	self.getOrdenes2();
                            self.getTimeLog3();
                            self.getOperaciones2();
                            self.getInnerOperOrden();*/
                            
                            self.getOrdenes2Synch();
                            
                            //self.onCargaGrilla();
    
                            var self2 = self;
    
                        /*	var timeout = jQuery.sap.delayedCall(2000, self2, function () {
                                self2.mostrarOrdenesPorPERNR();
                            });*/
                            self.getView().byId("btnIniciar").setVisible(false);
                            self.getView().byId("btnDetener").setVisible(true);
                        
                            utilUI.gloading(false);
                            utilUI.messageBox("Operación Iniciada con exito", "S", function () {
                                self.getView().byId("dlg").close();
                                self.getView().byId("DlgDetalle").close();
                            });
    //-----------------------------------------------------------------------------------------//
    // Modificado por Samuel Silva
    // Motivo:S139569 Error en detención OT Timerecording
    // Fecha: 16-11-2020
    //------------------------------------------------------------------------------------------//					
                        var timeout = jQuery.sap.delayedCall(100, self2, function () {
                                self.getInnerOperOrden();
                            })
    //-----------------------------------------------------------------------------------------//
    
                        } else {
                            utilUI.messageBox(result.m, "E", function () {});
                        }
                    });
                }
                return;
            },
    
            handleStopPress: function () {
                
                this.getView().byId("comentarios").setValue("");
                
                this.getDialog();
                if (this.clock.isTimerRunning() === false) {
                    //alert("IF");
                    //this.clock.startTimer();
                    this.stopClock();
                    this.startDate = this.clock.getStartDate();
                    this.setStatusText("Medición en ejecución");
                } else {
                    //this.clock.stopTimer();
                    //alert("ELSE");
                    this.stopClock();
                }
                return;
            },
    
            showErrorBox: function (title, text) {
                //Nota, requiere jQuery.sap.require("sap.ui.commons.MessageBox");
                //implementado en onInit
    
                sap.ui.commons.MessageBox.show(text,
                    sap.ui.commons.MessageBox.Icon.ERROR,
                    title, [sap.ui.commons.MessageBox.Action.OK],
                    null,
                    sap.ui.commons.MessageBox.Action.OK);
            },
    
            getMotivoInputData: function () {
                var oTextArea = this.getView().byId("comentarios");
                var oList = this.getView().byId("sl");
                var aContexts;
                var oModel;
                var selectedItem;
                var value;
                var result = {
                    selectedItem: undefined,
                    comentarios: ""
                };
                //alert(oList);
                if (oList) {
                    aContexts = oList.getSelectedContexts(true);
                    if (aContexts && aContexts.length > 0) { //si hay alguno seleccionado
                        oModel = aContexts[0].oModel;
                        if (oModel) {
                            //selected item tiene el item del modelo seleccionado
                            selectedItem = oModel.getProperty(aContexts[0].sPath);
                            value = oTextArea.getProperty("value"); //texto ingresado
                            result.selectedItem = selectedItem;
                            result.comentarios = value;
                        }
                    } else {
                        //this.showErrorBox("Error", "Debe seleccionar un motivo de detención");
                    }
    
                }
                return result;
            },
            
            
            actualizarUser : function () {
                this.getView().byId("BusyDialogG").open();
                var self = this;
                
                this.getOrdenes2();
                this.getTimeLog2();
                this.getOperaciones2();
                
    
                var timeout = jQuery.sap.delayedCall(2000, self, function () {
                    console.log("cargando g...")
                    this.onCargaGrilla();
                    var timeout2 = jQuery.sap.delayedCall(3000, self, function () {
                        console.log("cargando per...")
                        self.mostrarOrdenesPorPERNR();
                    });
                });
            
    
    
                
                
            },
            
            
            
            actualizarJefe : function () {
                this.getView().byId("BusyDialogG").open();
                var self = this;
                
                this.getOrdenes2();
                this.getTimeLog2();
                this.getOperaciones2();
                
    
                var timeout = jQuery.sap.delayedCall(2000, self, function () {
                    console.log("cargando g...")
                    this.onCargaGrilla();
                    /*var timeout2 = jQuery.sap.delayedCall(3000, self, function () {
                        console.log("cargando per...")
                        self.mostrarOrdenesPorPERNR();
                    });*/
                });
            
    
    
                
                
            },
            
    
            closeMotivosDialog: function () {
                //this.getDialog().close();
                var r = this.getMotivoInputData();
                console.log("COMBO MOTIVO SEL " + JSON.stringify(r));
                console.log(r.selectedItem.id);
                console.log(r.comentarios);
                var self = this;
                //var rr = utilController.property(this, "/LISTEMELOG");
                //alert(rr);
                
                var stopDate = this.clock.getStopDate();
                var now = new Date();
                var diff = now - stopDate;
                //si tardo mas de 1 min en seleccionar el motivo, se coloca como fecha/hora fin la actual
                //para asi evitar que los usuarios traten de enganar al sistema seleccionando stop, pero
                //sin seleccionar el motivo y asi evitar que continue el conteo
                if (diff > 60 * 1000) {
                    var message = "Ha tardado mas de 1 min en seleccionar motivo, por lo que se fijara como fecha fin: " + now;
                    this.showErrorBox("Error", message);
                    stopDate = now;
                }
                var dateTime = this.splitDateTime(stopDate);
                //this.startDate = this.clock.getStartDate();
                console.log("START  "+this.stopDate);
                //var dateTime = this.splitDateTime(this.startDate);
                console.log("TIEMPO  "+dateTime.time);
                var obj = {
                    "p_id": tituloM1AUFNR,
                    "p_motivo": r.selectedItem.id,
                    "p_obs": r.comentarios,
                    "fecha_fin": dateTime.date,
                    "hora_fin": dateTime.time,
                    "p_oper":tituloM1OPER
                };
                console.log("#################JSON ENTRADA UPDATE TIMELOG " + JSON.stringify(obj));
                utilUI.gloading(true);
                service.updateTimeLog(obj, function (result) {
                    if (result.c === "s") {
    
                    /*	self.getOrdenes2();
                    //	self.getTimeLog2();
                        self.getOperaciones2();
                        self.getTimeLog3();
                        self.getInnerOperOrden();
                        //self.onCargaGrilla();*/
                        
                        self.getOrdenes2Synch();
    
                        var self2 = self;
    
                    /*	var timeout = jQuery.sap.delayedCall(2000, self2, function () {
                            self2.mostrarOrdenesPorPERNR();
                        });*/
                //		console.log("RESULTADO UPDATE" + JSON.stringify(result));
                        utilUI.gloading(false);
    
                        utilUI.messageBox("Operación Detenida con exito", "S", function () {
                            utilUI.gloading(true);
                            cont = 0;
                            self2.getView().byId("DlgDetalle").close();
                            self2.stopClock();
                            self2.getView().byId("dlg").close();
                            self2.clock.stopTimer();
                            utilUI.gloading(false);
                            
                            
    //-----------------------------------------------------------------------------------------//
    // Modificado por Samuel Silva
    // Motivo:S139569 Error en detención OT Timerecording
    // Fecha: 16-11-2020
    //------------------------------------------------------------------------------------------//					
                        var timeout = jQuery.sap.delayedCall(100, self2, function () {
                                self.getInnerOperOrden();
                            })
    //-----------------------------------------------------------------------------------------//
                        });
                    } else {
                        utilUI.messageBox(result.m, "E", function () {});
                    }
    
                });
    
            },
    
            setButtonStyle: function () {
                var mButton = this.getView().byId("bStart");
                if (mButton === undefined) {
                    return;
                }
                var isRunning = this.clock.isTimerRunning();
                if (this.clock.isTimerRunning() === false) {
                    mButton.setIcon("sap-icon://media-play");
                    mButton.setType("Accept");
                    mButton.setText("Iniciar");
                    this.getView().byId("ot").setEnabled(false);
                    this.getView().byId("op").setEnabled(false);
                    this.getView().byId("ot").setVisible(false);
                    this.getView().byId("op").setVisible(false);
                    //this.getView().byId("op").setSelectedItem(null);
    
                } else {
                    mButton.setIcon("sap-icon://stop");
                    mButton.setType("Reject");
                    mButton.setText("Detener");
                    this.getView().byId("ot").setEnabled(false);
                    this.getView().byId("op").setEnabled(false);
                }
    
            },
    
            escapeHandler: function () {
                this.showErrorBox("Error", "Debe seleccionar un motivo de detención");
            },
    
            hideBusyIndicator: function () {
                sap.ui.core.BusyIndicator.hide();
            },
    
            showBusyIndicator: function (iDuration, iDelay) {
                sap.ui.core.BusyIndicator.show(iDelay);
    
                if (iDuration && iDuration > 0) {
                    if (this._sTimeoutId) {
                        jQuery.sap.clearDelayedCall(this._sTimeoutId);
                        this._sTimeoutId = null;
                    }
    
                    this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function () {
                        this.hideBusyIndicator();
                    });
                }
            },
    
            show_no_time_limit: function () {
                this.showBusyIndicator(300000, 0);
            },
    
            openMotivosDialog: function () {
                var selectedOrden = this.getSelectedOrden();
                if (this.motivos && this.motivos.data && selectedOrden) {
                    var data = this.motivos.data;
                    var data_aux = {
                        data: []
                    };
                    for (var i = 0; i < data.length; i++) {
                        if (selectedOrden.es_sin_asignacion.toString().toUpperCase() === true.toString().toUpperCase()) {
                            if (data[i].mostrar_en_sin_asignacion.toString().toUpperCase() === true.toString().toUpperCase()) {
                                data_aux.data.push(data[i]);
                            }
                        } else if (selectedOrden.es_sin_asignacion.toString().toUpperCase() === false.toString().toUpperCase()) {
                            if (data[i].mostrar_en_con_asignacion.toString().toUpperCase() === true.toString().toUpperCase()) {
                                data_aux.data.push(data[i]);
                            }
                        }
                    }
                    var oModel = new sap.ui.model.json.JSONModel(data_aux);
                    this.getView().setModel(oModel, "motivos");
                }
    
                this.getView().byId("dlg").open();
            },
    
            PopUpToConfirm: function (sTitle, sMessage, fnCallback) {
                // this is required since there is no direct access to the box's icons like MessageBox.Icon.WARNING
                jQuery.sap.require("sap.ui.commons.MessageBox");
                jQuery.sap.require("sap.m.MessageBox");
    
                // open a fully configured message box
                //sap.ui.commons.MessageBox.show(
                // sap.m.MessageBox.show(
                // 	//styleClass: "",
                // 	sMessage,
                // 	sap.ui.commons.MessageBox.Icon.WARNING,
                // 	sTitle, [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
                // 	fnCallback,
    
                // 	sap.ui.commons.MessageBox.Action.YES);
    
                this.showPopup(sTitle, sMessage, fnCallback);
            },
    
            showPopup: function (sTitle, sMessage, fnCallback) {
                var data = {
                    title: sTitle,
                    message: sMessage,
                    callback: fnCallback,
                    action: "NO"
                };
                var oModel = new sap.ui.model.json.JSONModel(data);
                this.getView().setModel(oModel, "popup");
    
                if (!this.popupDialog) {
                    this.popupDialog = sap.ui.xmlfragment("timeRecording.App00820Timerecording.view.PopUp", this);
                }
                // connect dialog to view (models, lifecycle)
                this.getView().addDependent(this.dialog);
                this.popupDialog.setModel(oModel);
                //var btn1 = this.dialog.byId("btn1");
                var that = this;
                this.popupDialog.attachAfterClose(function (event) {
                    //sap.m.MessageToast.show("dialog closed!!!");
                    var loModel = that.popupDialog.getModel();
                    var ldata = loModel.getData();
                    fnCallback(ldata.action);
                });
    
                this.popupDialog.open();
            },
    
            onPopupBtn1Press: function () {
                var oModel = this.popupDialog.getModel();
                var data = oModel.getData();
                data.action = "YES";
                oModel.setData(data);
                // data.callback(data.action);
                this.popupDialog.close();
                //sap.m.MessageToast.show("btn1 pressed!!!");
            },
    
            onPopupBtn2Press: function () {
                var oModel = this.popupDialog.getModel();
                var data = oModel.getData();
                data.action = "NO";
                oModel.setData(data);
                // data.callback(data.action);
                this.popupDialog.close();
            },
    
            onDialogAccept: function () {
//Jose Lopez                this.closeMotivosDialog();
                this.getView().byId("dlg").close();
                return;
    
            },
    
            onCloseMotivosDialog: function () {
                var data = this.getMotivoInputData();
                if (data.selectedItem) { //si se selecciono algun motivo
                    var that = this;
                    var handleClose = function () {
                        var stopDate = that.clock.getStopDate();
                        var now = new Date();
                        var diff = now - stopDate;
                        //si tardo mas de 1 min en seleccionar el motivo, se coloca como fecha/hora fin la actual
                        //para asi evitar que los usuarios traten de enganar al sistema seleccionando stop, pero
                        //sin seleccionar el motivo y asi evitar que continue el conteo
                        if (diff > 60 * 1000) {
                            var message = "Ha tardado mas de 1 min en seleccionar motivo, por lo que se fijara como fecha fin: " + now;
                            that.showErrorBox("Error", message);
                            stopDate = now;
                        }
                        that.setStatusText(data.selectedItem.descripcion);
                        that.updateLog(stopDate, data.selectedItem.id, data.comentarios);
                        var oData = {
                            "value": ""
                        };
                        var oModel = new sap.ui.model.json.JSONModel(oData);
                        that._oDialog.setModel(oModel);
                        var sl = sap.ui.getCore().byId("sl");
                        if (sl) {
                            sl.removeSelections(true);
                        }
                        that.setOtsVisibility();
                    };
                    if (data.selectedItem.indica_termino.toString().toUpperCase() === "TRUE") {
                        var title = "Trabajo Finalizado";
                        var message = "¿Está seguro de que desea marcar la operación actual como finalizada?";
                        var reactToAnswer = function (sResult) {
                            if (sResult.toString().toUpperCase() === "YES") {
                                handleClose();
                            } else {
                                that.openMotivosDialog();
                            }
                        };
                        this.PopUpToConfirm(title, message, reactToAnswer);
                    } else {
                        handleClose();
                    }
                    //this.getDialog().close();
                } else {
                    this.openMotivosDialog();
                    this.showErrorBox("Error", "Debe seleccionar un motivo de detención");
                }
    
            },
    
            onEscapePress: function () {
                this.showErrorBox("Error", "Escape pressed!");
            },
    
            getDialog: function () {
                if (!this._oDialog) {
                    //this._oDialog = this.createDialog();
                    //return this._oDialog;
    
                    // create dialog via fragment factory
                    // we pass PlansOverviewPieChartController as parameter so the fragment can use it
                    // i.e. this controller has handler functions for the fragment
    
                    this.getView().byId("dlg").setVisible(true);
                    this.getView().byId("dlg").open();
    
                    //this._oDialog = sap.ui.xmlfragment("timeRecording.App00820Timerecording.view.MotivoDetencion", this);
                    //this._oDialog.prototype.onsapescape = function(){ };
    
                    var that = this;
                    var dlg = sap.ui.getCore().byId("dlg");
                    // dlg.attachAfterClose(function (event) {
                    // 	//sap.m.MessageToast.show("dialog closed!!!");
                    // 	that.onCloseMotivosDialog();
                    // });
    
                    // connect dialog to view (models, lifecycle)
                    this.getView().addDependent(this._oDialog);
                    var oData = {
                        "value": ""
                    };
                    // var oModel = new sap.ui.model.json.JSONModel(oData);
                    // this._oDialog.setModel(oModel);
    
                }
    
                dlg = sap.ui.getCore().byId("dlg");
    
                return this._oDialog;
    
            },
    
            onSetListaOrdenes: function (lista) {
                utilController.property(this, "/GT_ORDENES7", lista);
                utilController.refreshModel(this);
            },
    
            onSetListaOrdenesTR: function (lista) {
                utilController.property(this, "/GT_ORDENESTR", lista);
                utilController.refreshModel(this);
            },
            
            onSetListaClientes: function (lista) {
                utilController.property(this, "/GT_CLIENTES", lista);
                utilController.refreshModel(this);
            },		
    
            onSetGTCentro: function (lista) {
                utilController.property(this, "/GT_CENTRO", lista);
                utilController.refreshModel(this);
            },
            onSetLISTAMEC: function (lista) {
                utilController.property(this, "/LSTMEC", lista);
                utilController.refreshModel(this);
            },
            onMecAsig: function (lista) {
                utilController.property(this, "/LSTMECASIG", lista);
                utilController.refreshModel(this);
            },
            onListaAvisos: function (lista) {
                utilController.property(this, "/ProductCollection", lista);
                utilController.refreshModel(this);
            },
            onSetIDUSUARIO: function (lista) {
                utilController.property(this, "/IDUSUARIO", lista);
                utilController.refreshModel(this);
            },
            onListaOrdenes: function (lista) {
                utilController.property(this, "/LISTAORDEN", lista);
                utilController.refreshModel(this);
            },
            getSelectedItemText: function (oSelect) {
                return oSelect.getSelectedItem() ? oSelect.getSelectedItem().getKey() : "";
            },
            getSelectedItemTextVal: function (oSelect) {
                return oSelect.getSelectedItem() ? oSelect.getSelectedItem().getText() : "";
            },
            _codeFormat: function (valor, prefijo, largo) {
                if (!valor || isNaN(largo)) {
                    return "";
                }
                var salida = "000000000000" + valor;
                return prefijo + salida.substring(salida.length - largo, salida.length);
            },
            getSelect: function (sId) {
                return this.getView().byId(sId);
            },
    
            esSinAsignar: function (val) {
    
                if (String(val) === String("-2")) {
                    return true;
                } else {
                    return false;
                }
    
            },
    
            esSeleccionado: function (param) {
    
                if (param === "" || param === "-") {
                    false
                } else {
                    true;
                }
    
            },
    
            esEjecucion: function (val) {
    
                if (String(val) === String("-1")) {
                    return true;
                } else {
                    return false;
                }
    
            },
    
            colorMotivo: function (val) {
                if (String(val) === String("-3")) {
                    return "Warning";
                } else {
                    return "Information";
                }
    
            },
    
            esNoIniciado: function (val) {
                console.log(val);
                if (String(val) === String("-3")) {
                    return true;
                } else {
                    return false;
                }
    
            },
            
            esNoIniciadoU: function (val) {
    
                if (String(val) === String("-3")) {
                    return true;
                } else {
                    return false;
                }
    
            },		
    
            esIniciadoUser: function (val, usr) {
    
                if (val !== "-2" && val !== "-3" && usr === pernrg) {
                    return true;
                } else {
                    return false;
                }
    
            },
    
            esNoIniciadoUser: function (val, usr) {
                /*	if(usr.toString() === "13344834" ){
                        alert(val);
                    }
                    
                    if (val === "-3" && usr === pernrg ) {
                        return true;
                    } else {
                        return false;
                    }*/
    
                return true;
    
            },
    
            esDetencionUser: function (val, usr) {
                console.log("Centro con: " + val +  " usuario : " + usr);
                if (String(val) !== String("-1") && String(val) !== String("-2") && String(val) !== String("-3")   && String(val) !== String("15")) {
                    //alert(val);
                    return true;
                } else {
                    return false;
                }
    
            },
            
            
            getStateTable : function (val) {
                
                if(val.toString() === "-3"){
                    return "Warning";
                    
                }else if(val.toString() === "-2"){
                    return "Information";
                    
                }else if(val.toString() === "-1"){
                    return "Success";
                    
                }else{
                    return "Error";
                }
                
            },
    
            esDetencion: function (val) {
                if (String(val) !== String("-1") && String(val) !== String("-2") && String(val) !== String("-3")) {
                    //alert(val);
                    return true;
                } else {
                    return false;
                }
    
            },
    
            formatMotivo: function (val) {
    
                if (val !== undefined && val !== "undefined" && val !== "" && val !== null) {
                    //	alert(val) 
                    val = val.toString();
    
                    if (val === "-2") {
                        return "Sin Asignar";
                    } else if (val === "-3") {
                        return "No iniciado";
                    } else if (val === "-1") {
                        return "En Ejecución";
                    } else {
                        if (val === "1") {
                            return "Detenido por solicitud y retiro de repuestos";
                        } else if (val === "2") {
                            return "Detenido por espera de repuestos en tránsito";
                        } else if (val === "3") {
                            return "Detenido por espera de estación/puesto de trabajo";
                        } else if (val === "4") {
                            return "Detenido por espera de servicio tercero";
                        } else if (val === "5") {
                            return "Detenido por espera de herramienta";
                        } else if (val === "6") {
                            return "Detenido por falta de herramienta";
                        } else if (val === "7") {
                            return "Detenido por espera de soporte técnico";
                        } else if (val === "8") {
                            return "Detenido por trabajo reasignado";
                        } else if (val === "9") {
                            return "Detenido por lavado equipo/componente";
                        } else if (val === "10") {
                            return "Detenido por espera de prueba ruta/Campo";
                        } else if (val === "11") {
                            return "Detenido por gestión administrativa";
                        } else if (val === "12") {
                            return "Detenido por colación";
                        } else if (val === "13") {
                            return "Detenido por término de jornada";
                        } else if (val === "14") {
                            return "Detenido por reunión";
                        } else if (val === "15") {
                            return "Detenido por trabajo finalizado";
                        } else if (val === "16") {
                            return "Trabajo asignado";
                        } else if (val === "17") {
                            return "Detenido por otro motivo";
                        } else {
                            return "Detenido por otro motivo"
                        }
                    }
                }
    
            },
    
            verTecnico: function () {
    
                this.getView().byId("DlgUsuario").setVisible(true);
                this.getView().byId("DlgUsuario").open()
                this.getView().byId("tecnicoDLG2").setSelectedKey("-1");
    
            },
    
            onMenuAction: function (oEvent) {
    
                var oItem = oEvent.getParameter("item"),
                    sItemPath = "";
                while (oItem instanceof sap.m.MenuItem) {
                    sItemPath = oItem.getText() + " > " + sItemPath;
                    oItem = oItem.getParent();
                }
    
                sItemPath = sItemPath.substr(0, sItemPath.lastIndexOf(" > "));
    
                //	sap.m.MessageToast.show("Action triggered on item: " + sItemPath);
                //	perfilg = sItemPath;
                if (sItemPath === "Técnico") {
                    //this.mostrarOrdenesPorPERNR();
    
                //	this.getView().byId("idToolbarGeneral").setVisible(false);
                    this.getView().byId("DlgUsuario").setVisible(true);
                    this.getView().byId("DlgUsuario").open()
                    this.getView().byId("tecnicoDLG2").setValue(null); //setSelectedKey("-1");
    
                } else if (sItemPath === "Jefe de Taller") {
                    this.getView().byId("centro").setVisible(true);
                    this.getView().byId("tecnico").setVisible(true);
                    this.getView().byId("clientes").setVisible(true);
                    this.getView().byId("idButtonFiltrar").setVisible(false);
                //	this.getView().byId("idFilterBar").setVisible(true);
                //	alert(4);
                    this.getView().byId("idTittle").setVisible(false);
            //		this.getView().byId("idToolbarGeneral").setVisible(true);
                    this.mostrarOrdenesPorJefe();
    
                } else if (sItemPath === "Tótem") {
                    this.getView().byId("centro").setVisible(false);
                    this.getView().byId("tecnico").setVisible(false);
                    this.getView().byId("clientes").setVisible(false);
                    this.getView().byId("idButtonFiltrar").setVisible(false);
            //		this.getView().byId("idToolbarGeneral").setVisible(true);
                    this.getView().byId("idTittle").setVisible(true);
                    this.mostrarOrdenesPorTotem();
    
                } else if (sItemPath === "Salir") {
            //		this.getView().byId("idToolbarGeneral").setVisible(false);
                    this.getView().byId("idMen4").setVisible(false);
                    //		this.getView().byId("idMen1").setVisible(true);
                    this.getView().byId("idMen2").setVisible(true);
                    this.getView().byId("idMen3").setVisible(true);
                    this.getView().byId("idTittle").setVisible(true);
                    this.getView().byId("idIconTabBarUsuario").setVisible(false);
                    
                    
    
                }
    
            },
    
            mostrarOrdenesPorPERNR: function () {
    
                console.log("INICIO ACTUALIZACION CONTADORES");
                var self = this;
                // se oculta icontab bar de jefe de taller y se muestra icon tab bar usuario	
                this.getView().byId("DlgUsuario").setVisible(false);
                this.getView().byId("DlgUsuario").close();
    
                //	alert(this.getView().byId("tecnicoDLG2").getSelectedKey());
                this.getView().byId("idIconTabBarUsuario").setVisible(true);
                this.getView().byId("idIconTabBar").setVisible(false);
                this.getView().byId("idButtonAsignar").setVisible(false);
                this.getView().byId("idButtonFiltrar").setVisible(false);
                this.getView().byId("puestosTrabajo").setVisible(false);
                
            //	alert("ruth: " + rutIngresado);
                if(rutIngresado === undefined || rutIngresado === "undefined" || rutIngresado === "" || rutIngresado === null){
                    rutIngresado = pernrg;
                }
            //	alert("pernrg: " + pernrg);
                //invocar a servicio con pernr  provisional
                pernrg = rutIngresado.replace(".", "").replace(".", ""); //this.getView().byId("tecnicoDLG2").getSelectedKey();
                //alert(pernrg);
                // this.onCargaGrilla()
    
                //contar
                var m1 = this.getView().getModel().getProperty("/GT_ORDENESTR");
                var m2 = [];
    
                var listEjecucion = [];
                var listNoIniciadas = [];
                var listDetencion = [];
    
                var contPosU = 0;
                var conNoInicU = 0;
                var contDetU = 0;
                var countOrdenU = 0;
    
                console.log("LENGTH: >>> " + m1.length + "PERNR " + String(pernrg));
    
                for (var i = 0; i < m1.length; i++) {
                    //console.log("FOR M1   "+JSON.stringify(m1[i]) + "-" + pernrg);
                    if (String(m1[i].ID_MOTIVO) === String("-1") && String(m1[i].ID_MECANICO) === String(pernrg)) {
                        contPosU++;
                        cont++;
                        //alert("IF"+m1[i].ID_MOTIVO+"   "+ m1[i].DESCRIPTION);
                        m2.push(m1[i]);
                    } else if (String(m1[i].ID_MOTIVO) === String("-2") && String(m1[i].ID_MECANICO) === String(pernrg)) {
                        conNoInicU++;
                        m2.push(m1[i]);
                        //		alert(m1[i].ID_MOTIVO);
                    } else if (String(m1[i].ID_MOTIVO) === String("-3") && String(m1[i].ID_MECANICO) === String(pernrg)) {
                        conNoInicU++;
                        m2.push(m1[i]);
                        //		alert(m1[i].ID_MOTIVO);
                    } else if (String(m1[i].ID_MOTIVO) !== String("-1") && String(m1[i].ID_MOTIVO) !== String("-2") && String(m1[i].ID_MOTIVO) !==
                        String("-3") && String(m1[i].ID_MECANICO) === String(pernrg) && String(m1[i].ID_MOTIVO) !== String("15")) {
                        contDetU++;
                        m2.push(m1[i]);
                    }
    
                }
            //	console.log("M2  " + JSON.stringify(m2));
                this.onSetListaOrdenesTR(m2);
                console.log("TERMINO ACTUALIZACION CONTADORES");
                self.byId("contPosU").setCount(contPosU);
                self.byId("conNoInicU").setCount(conNoInicU);
                self.byId("contDetU").setCount(contDetU);
                countOrdenU = contPosU + conNoInicU + contDetU;
                self.byId("countOrdenU").setCount(countOrdenU);
                this.getView().byId("BusyDialogG").close();
                this.hideBusyIndicator();
    
            },
    
            mostrarOrdenesPorJefe: function () {
                // se oculta icontab bar de usuario y se muestra icon tab bar jefe de taller	
                this.getView().byId("idIconTabBarUsuario").setVisible(false);
                this.getView().byId("idIconTabBar").setVisible(true);
                this.getView().byId("idButtonAsignar").setVisible(true);
                this.getView().byId("idButtonFiltrar").setVisible(false);
            //	this.getView().byId("idFilterBar").setVisible(true);
                this.getView().byId("puestosTrabajo").setVisible(true);
                this.onCargaGrilla();
    
            },
    
            mostrarOrdenesPorTotem: function () {
                // se oculta icontab bar de usuario y se muestra icon tab bar jefe de taller	
                this.getView().byId("puestosTrabajo").setVisible(true);
                this.getView().byId("idTittle").setVisible(true);
                this.getView().byId("idIconTabBarUsuario").setVisible(false);
                this.getView().byId("idIconTabBar").setVisible(false);
                this.getView().byId("idButtonAsignar").setVisible(false);
                this.getView().byId("idButtonFiltrar").setVisible(false);
                this.getView().byId("puestosTrabajo").setVisible(true);
    
            },
    
            formatInt: function (param) {
    
                return parseInt(param);
    
            },
    
            onSetUserAsignadas: function (lista) {
    
                //	alert(lista.length);
                //	alert(JSON.stringify(lista));
                utilController.property(this, "/ListUserAsig", lista);
                utilController.refreshModel(this);
            },            
        });
    });
