sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sapui5agendar/sco00agendar3/utils/utils",
    "sapui5agendar/sco00agendar3/model/models",
    "sapui5agendar/sco00agendar3/utils/validator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, utils, models, Validator) {
        "use strict";

        return Controller.extend("sapui5agendar.sco00agendar3.controller.Master", {

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

            _hasRole: function (role) {
                let has = false;
                try {
                    if (sap.ushell && sap.ushell.cpv2 && sap.ushell.cpv2.services && sap.ushell.cpv2.services.cloudServices && sap.ushell.cpv2.services.cloudServices.SiteService) {

                        var oLocalSiteService = sap.ushell.cpv2.services.cloudServices.SiteService();
                        var oRoles = oLocalSiteService.siteModel.getProperty("/roles");
                        var oProperty;


                        for (oProperty in oRoles) {

                            if (oRoles.hasOwnProperty(oProperty)) {
                                if (oProperty.toString() === role) {
                                    has = true;
                                }
                            }
                        }

                    }
                } catch (oException) {

                }
                return has;
            },

            get: function (path) {
                return this.model.getProperty(path);
            },
            set: function (path, value) {
                return this.model.setProperty(path, value);
            },

            _canUpdate: function () {
                return this._hasRole('ROL_RAC_AGEN_002');
            },

            _canDelete: function () {
                return this._hasRole('ROL_RAC_AGEN_003');
            },

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
                this._iniciarCampos();

                let patente = this.getAppParam('patente', '');
                if (patente) {
                    this.set('/filters/Patente', patente);
                    this._getEquipo();

                }
            },

            _iniciarCampos: function () {
                this.set('/Visibles', {
                    VistaSalfa: false,
                    VistaSalfaRent: false,
                    Contrato: false,
                    Cliente: false,
                    CrearAgenda: false,
                    ModificarAgenda: false,
                    CanUpdate: false,
                    CanDelete: false,
                });

                this.set('/Opciones', {
                    SiNo: [
                        {
                            KEY: 'NO',
                            TEXT: 'No'
                        }, {
                            KEY: 'SI',
                            TEXT: 'Sí'
                        }
                    ],
                    Sociedades: [
                        {
                            KEY: '1000',
                            TEXT: 'SALFA'
                        },
                        {
                            KEY: '2000',
                            TEXT: 'SALFARENT'
                        }
                    ],
                    Regiones: [],
                    Talleres: [],
                    FechasDisponibles: [],
                    HorasDisponibles: [],
                    DisabledDates: []
                });

                this.set('/filters', {
                    i_Sociedad: 2000,
                    Patente: ''
                });

                this.set('/i_Conductor', -1);

                this.set('/Vehiculos', []);
                this.set('/HistorialMantenciones', []);

                this._iniciarContrato();
                this._iniciarCliente();
                this._iniciarConductor('C');
                this._iniciarConsultarDisponibilidad();
                this._iniciarConsultarAgenda();

                this.set('/Checkbox', [{ SELECTED: false, TEXTO: 'uno' }, { SELECTED: false, TEXTO: 'dos' }, { SELECTED: false, TEXTO: 'tres' }, { SELECTED: false, TEXTO: 'cuatro' }]);
            },

            _iniciarContrato: function () {
                this.set('/Contrato', {
                    RUT_CLIENTE: '',
                    ADMINISTRADOR: '',
                    FONO: '',
                    DEDUCIBLE: '',
                    POSEE_REEMPLAZO: '',
                    HORAS_REEMPLAZO: '',
                    CLIENTE: '',
                    EMAIL: '',
                    KM_CONTRATADO: '',
                    PLAZO_CONTRATADO: '',
                    RENDIMIENTO_NEUMATICO: ''
                });
            },

            _iniciarCliente: function () {
                this.set('/Cliente', {
                    RUT: '',
                    RAZON_SOCIAL: '',
                    COMUNA: '',
                    EMAIL: '',
                    GIRO: '',
                    NOMBRE: '',
                    DIRECCION: '',
                    FONO: '',
                    MOVIL: ''
                });
            },

            _iniciarConductor: function (modo) {
                this.set('/Conductor', {
                    Modo: modo,
                    Rut: '',
                    Nombre: '',
                    Apellido: '',
                    TelefonoMovil: '',
                    TelefonoFijo: '',
                    Email: ''
                });
            },

            _iniciarConsultarDisponibilidad: function () {

                this.set('/ConsultarDisponibilidad', {
                    Step: 'FechaHora',
                    Modo: 'C',
                    i_Region: '',
                    i_Taller: '',
                    i_Presenta_Reparaciones: '',
                    i_Presenta_Siniestro: '',
                    i_Fecha: null,
                    i_Hora: '',
                    i_Box: '',
                    Servicios: [],
                    AntecedentesRequeridos: [],
                    ServiciosState: sap.ui.core.ValueState.None
                });
                this.set('/Opciones/Regiones', []);
                this.set('/Opciones/Talleres', []);
                this.set('/Opciones/FechasDisponibles', []);
                this.set('/Opciones/HorasDisponibles', []);
                this.set('/Opciones/BoxesDisponibles', []);
            },

            _iniciarConsultarAgenda: function () {
                this.set('/Visibles/CanUpdate', this._canUpdate());
                this.set('/Visibles/CanDelete', this._canDelete());
                this.set('/ConsultarAgenda', {
                    Avisos: [],
                    i_Aviso: -1
                });
            },

            handleSearch: function (e) {
                let validator = new Validator();
                let valid = validator.validate(e.getSource().getParent());
                this.set('/Visibles/VistaSalfaRent', false);
                if (valid) {
                    this._getEquipo();
                }
            },

            _getEquipo: function () {

                let that = this;
                this.set('/Visibles/VistaSalfaRent', false);

                let patente = this.get('/filters/Patente');
                this._iniciarCampos();
                this.set('/filters/Patente', patente);

                let resultOk = true;

                if (resultOk) {

                    that.set('/Visibles/VistaSalfaRent', true);

                    that._poblarClienteYVehiculo();

                    //      if (that._validaAgenda("RECE")) {
                    that.set('/Visibles/CrearAgenda', true);
                    that.set('/Visibles/ModificarAgenda', false);
                    //     } else {
                    //         that.set('/Visibles/CrearAgenda', false);
                    //         that.set('/Visibles/ModificarAgenda', true);
                    //     }

                    that._buscarDatosContrato(function () {
                        that._buscarDatosConductores();
                    });
                }
                /*
                                utils.httpCall({
                                    service: "Z237R_CS_TOOLS_BUSCA_EQUIPO",
                                    query: {
                                        I_MATRICULA: this.get('/filters/Patente')
                                    },
                                    success: result => {
                                        let indCliente = 0;
                
                                        result.IT_BAPIRETURN.forEach(function (r) {
                                            switch (r.TYPE) {
                                                case 'E':
                                                    that.addMessage(r.MESSAGE, 'E');
                                                    resultOk = false;
                                                    break;
                                                case 'A':
                                                case 'U':
                                                    if (r.MESSAGE == '1') {
                                                        indCliente = 2;
                                                    } else {
                                                        indCliente = 1;
                                                    }
                                                    break;
                                            }
                                        });
                
                                        if (resultOk) {
                                            that.set('/Visibles/VistaSalfaRent', true);
                
                                            that._poblarClienteYVehiculo(result);
                                            if (that._validaAgenda("RECE")) {
                                                that.set('/Visibles/CrearAgenda', true);
                                                that.set('/Visibles/ModificarAgenda', false);
                                            } else {
                                                that.set('/Visibles/CrearAgenda', false);
                                                that.set('/Visibles/ModificarAgenda', true);
                                            }
                
                                            that._buscarDatosContrato(indCliente, function () {
                                                that._buscarDatosConductores();
                                            });
                                        }
                                    }
                                });
                
                                */
            },

            _poblarClienteYVehiculo: function () {
                //                let clienteOrigen = data.E_CLIENTE;
                //                let vehiculoOrigen = data.E_VEHICULO;

                this.set('/Cliente', {
                    COMUNA: 'Providencia',
                    DIRECCION: 'Los Condes',
                    EMAIL: 'SCOCORPORATIVO@sco.com',
                    FONO: '40',
                    GIRO: 'NO APLICA',
                    MOVIL: '777888',
                    NOMBRE: 'LIDIA ELIZABETH REYES',
                    RAZON_SOCIAL: 'LIDIA ELIZABETH REYES',
                    RUT: '76.049.363-5'
                });

                //            if (vehiculoOrigen) {
                this.set('/Vehiculos', [
                    {
                        ANIO: '2022',
                        MARCA: 'HONDA',
                        MODELO: 'HONDA WRV',
                        KILOMETRAJE: '400000',
                        KILOMETRAJE_ACTUAL: 0,
                        PATENTE: 'BBWW68',
                        VIN: 'LKAKJSIWUBD',
                        FLAG_ACT_KM: false
                    }
                ]);
                /*    
                                    if (vehiculoOrigen.TIPO_EQUI.toUpperCase() === "J" || vehiculoOrigen.TIPO_EQUI.toUpperCase() === "K" || vehiculoOrigen.TIPO_EQUI.toUpperCase() === "F") {
                                        this.set('/Visibles/VistaSalfa', false);
                                        this.set('/Visibles/VistaSalfaRent', true);
                                    } else {
                                        this.addMessage("La patente ingresada no pertenece a la sociedad.", "W");
                                        this.set('/Visibles/VistaSalfa', true);
                                        this.set('/Visibles/VistaSalfaRent', false);
                                    }
                
                                    */
                //                } else {
                //                    this.addMessage('No se encontró datos para la patente.', 'E');
                //                }

            },

            _buscarDatosContrato(success) {

                this.set('/Contrato', {
                    RUT_CLIENTE: '7787823-U',
                    ADMINISTRADOR: 'RAMON VAZQUEZ',
                    FONO: '35',
                    DEDUCIBLE: '3500',
                    POSEE_REEMPLAZO: 'Sí',
                    HORAS_REEMPLAZO: '598',
                    CLIENTE: 'LAS CONDES',
                    EMAIL: 'lascondes@gmail.com',
                    KM_CONTRATADO: '78000',
                    PLAZO_CONTRATADO: '8',
                    RENDIMIENTO_NEUMATICO: '5'
                });

                this.set('/Visibles/Contrato', true);
                this.set('/Visibles/Cliente', false);

                if (typeof success === 'function') {
                    success();
                }

                /*
                let that = this;
                utils.httpCall({
                    service: "ZF353_DATOS_DEL_CONTRATO",
                    query: {
                        I_PATENTE: this.get('/filters/Patente')
                    },
                    success: result => {
                        if (result.E_RETURN.TYPE === 'E') {
                            if (indCliente !== 0) {
                                if (indCliente === 1) {
                                    that.addMessage("No se encontraron datos del Cliente.", "W");
                                }

                                that.set('/Visibles/Contrato', false);
                                that.set('/Visibles/Cliente', true);
                            } else {
                                that.addMessage("No se encontraron datos del Contrato.", "W");
                                that.set('/Visibles/Contrato', true);
                                that.set('/Visibles/Cliente', false);
                            }
                        } else {
                            this.set('/Contrato', {
                                RUT_CLIENTE: result.E_CLIENTE_RUT,
                                ADMINISTRADOR: result.E_ADMINISTRADOR,
                                FONO: result.E_FONO,
                                DEDUCIBLE: result.E_DEDUCIBLE,
                                POSEE_REEMPLAZO: (result.E_POSEE_REEMPLAZO === 'X' ? 'Sí' : 'No'),
                                HORAS_REEMPLAZO: result.E_HORASREEMPLAZO,
                                CLIENTE: result.E_CLIENTE_NOMBRE,
                                EMAIL: result.E_EMAIL,
                                KM_CONTRATADO: result.E_KM_CONTRATADO,
                                PLAZO_CONTRATADO: result.E_PLAZO_CONTRATADO,
                                RENDIMIENTO_NEUMATICO: result.E_REND_NEUMATICO
                            });

                            that.set('/Visibles/Contrato', true);
                            that.set('/Visibles/Cliente', false);
                        }

                        if (typeof success === 'function') {
                            success();
                        }
                    }
                });

                */
            },

            _buscarDatosConductores: function () {
                let that = this;


                let conductores = [];


                conductores.push({
                    RUT: '19321419-3',
                    NOMBRE: 'Pedro',
                    APELLIDO: 'Perez',
                    EMAIL: 'pedroperez@gmail.com',
                    MOVIL: '9998976',
                    FONO: '90'
                });

                conductores.push({
                    RUT: '14140670-1',
                    NOMBRE: 'Maria',
                    APELLIDO: 'Del Carmen',
                    EMAIL: 'mariacarmen@hotmail.com',
                    MOVIL: '9998978',
                    FONO: '80'
                });

                that.set('/Conductores', conductores);
                /*
                                utils.httpCall({
                                    service: "Z237R_DATOS_CONDUCTOR_EQUIPO",
                                    query: {
                                        I_OPERACION: 'C',
                                        I_PATENTE: this.get('/filters/Patente'),
                                        I_CLIENTE: (this.get('/Contrato').RUT_CLIENTE ? this.get('/Contrato').RUT_CLIENTE : this.get('/Cliente').RUT)
                                    },
                                    success: result => {
                                        let conductores = [];
                                        for (var i = 0; i < result.GT_DATOS_CONDUC.length; i++) {
                                            var conductorOrigen = result.GT_DATOS_CONDUC[i];
                                            conductores.push({
                                                RUT: conductorOrigen.E_RUT,
                                                NOMBRE: conductorOrigen.E_NOMBRE,
                                                APELLIDO: conductorOrigen.E_APELLIDO,
                                                EMAIL: conductorOrigen.E_EMAIL,
                                                MOVIL: conductorOrigen.E_TELM,
                                                FONO: conductorOrigen.E_TELF1
                                            });
                                        }
                
                                        that.set('/Conductores', conductores);
                                    }
                                });
                
                             */
            },

            handleHistorialMantenciones: function () {
                this._getHistorialMantenciones();
            },

            _getHistorialMantenciones: function () {

                let that = this;

                let historial = [];
                let vehiculo = this.get('/Vehiculos/0');

                historial.push({
                    FECHA: '11-02-2022',
                    ORDEN: '09873728',
                    DESC_SERVICIO: 'Cambio de Aceite',
                    RUT_CLIENTE: '2324522-7',
                    TALLER: 'CENTRO'
                });

                historial.push({
                    FECHA: '11-03-2022',
                    ORDEN: '08788987',
                    DESC_SERVICIO: 'Cambio de Caja',
                    RUT_CLIENTE: '3324522-4',
                    TALLER: 'LITORAL'
                });

                that.set('/HistorialMantenciones', historial);

            },

            handleCrearAgenda: function () {
                //   if (this._validaActKm()) {
                this._iniciarConsultarDisponibilidad();
                this.set('/ConsultarDisponibilidad/Modo', 'C');
                this._getRegionesTalleres();
                this.openDialog("ConsultarDisponibilidad");
                this._disableDates();
                // }
            },

            _getRegionesTalleres: function (callback) {

                let that = this;
                let regiones = [];

                regiones.push({
                    ID_REGION: 'AT',
                    DES_REGION: 'Atacama'
                });

                regiones.push({
                    ID_REGION: 'SN',
                    DES_REGION: 'Santiago'
                });

                that.set('/Opciones/Regiones', regiones);

                if (typeof callback === 'function') {
                    callback();
                }
                /*
                            utils.httpCall({
                                service: "Z237R_LISTADO_REGIONES",
                                type: 'POST',
                                query: {
                                    I_BUKRS: this.get('/filters/i_Sociedad'),
                
                                },
                                success: result => {
                                    let regiones = [];
                                    for (var i = 0; i < result.T_LIS_REGIONES.length; i++) {
                                        let origen = result.T_LIS_REGIONES[i];
                                        regiones.push({
                                            ID_REGION: origen.BLAND,
                                            DES_REGION: origen.BEZEI
                                        });
                                    }
                                    that.set('/Opciones/Regiones', regiones);
                                    if (typeof callback === 'function') {
                                        callback();
                                    }
                                }
                            });
            
                            */
            },

            openDialog: function (fragment, result) {
                let model = this.getView().getModel();
                let oView = this.getView();
                for (var i = 0; this['openedDialog' + i] && !this['openedDialog' + i].bIsDestroyed; i++);
                let dialog = 'openedDialog' + i;
                model.setProperty("/" + dialog, result || {});

                this[dialog] = sap.ui.xmlfragment(oView.getId(), "sapui5agendar.sco00agendar3.view." + fragment, this);
                oView.addDependent(this[dialog]);
                this[dialog].bindElement("/" + dialog);

                //Cargo modelo limpio
                if (this['clearDialogModel_' + fragment])
                    this['clearDialogModel_' + fragment]();

                utils.view = this[dialog];

                this[dialog].open();
            },

            _disableDates: function () {
                let enabledDates = this.get('/Opciones/FechasDisponibles');
                let calendar = this.byId('calendarDisponibilidad');
                let startDate = calendar.getStartDate();
                let endDate = new Date(startDate);
                endDate.setMonth(endDate.getMonth() + calendar.getMonths());
                let disabledDates = [];
                while (startDate < endDate) {
                    if (!enabledDates.find(function (d) {
                        return d.DATE.getTime() === startDate.getTime()
                    })) {
                        disabledDates.push({
                            DATE: new Date(startDate)
                        });
                    }
                    startDate.setDate(startDate.getDate() + 1);
                    //****************************************************************************************//
                    // Modificado por Samuel Silva
                    // Fecha: 31.08.2020
                    // Motivo: S136266 - Error con agendamiento en septiembre
                    //***************************************************************************************//
                    startDate.setHours(0);
                    startDate.setMinutes(0);
                    startDate.setSeconds(0);
                    //***************************************************************************************//
                }
                this.set('/Opciones/DisabledDates', disabledDates);
            },

            _iniciarConsultarDisponibilidad: function () {
                this.set('/ConsultarDisponibilidad', {
                    Step: 'FechaHora',
                    Modo: 'C',
                    i_Region: '',
                    i_Taller: '',
                    i_Presenta_Reparaciones: '',
                    i_Presenta_Siniestro: '',
                    i_Fecha: null,
                    i_Hora: '',
                    i_Box: '',
                    Servicios: [],
                    AntecedentesRequeridos: [],
                    ServiciosState: sap.ui.core.ValueState.None
                });
                this.set('/Opciones/Regiones', []);
                this.set('/Opciones/Talleres', []);
                this.set('/Opciones/FechasDisponibles', []);
                this.set('/Opciones/HorasDisponibles', []);
                this.set('/Opciones/BoxesDisponibles', []);
            },

            handleRegionChange: function () {

                this._getTallerCompleto();
                this.set('/ConsultarDisponibilidad/i_Taller', '');

                this.set('/Opciones/FechasDisponibles', []);
                this.set('/ConsultarDisponibilidad/i_Fecha', null);
                this._disableDates();

                this.set('/Opciones/HorasDisponibles', []);
                this.set('/ConsultarDisponibilidad/i_Hora', '');

                this.set('/Opciones/BoxesDisponibles', []);
                this.set('/ConsultarDisponibilidad/i_Box', '');
            },

            _getTallerCompleto: function (callback) {

                let that = this;

                let talleres = [];

                talleres.push({
                    ID_REGION: 'Atacama',
                    ID_CENTRO: '001',
                    DES_CENTRO: 'CENTRO 001',
                    DES_COMPLETO: 'CENTRO 001'
                });

                talleres.push({
                    ID_REGION: 'Santiago',
                    ID_CENTRO: '002',
                    DES_CENTRO: 'CENTRO 002',
                    DES_COMPLETO: 'CENTRO 002'
                });

                that.set('/Opciones/Talleres', talleres);

                if (typeof callback === 'function') {
                    callback();
                }
                /*
                            utils.httpCall({
                                service: "Z237R_LISTADO_REGIONES",
                                type: 'POST',
                                query: {
                                    I_BUKRS: this.get('/filters/i_Sociedad'),
                                    I_REGIO: this.get('/ConsultarDisponibilidad/i_Region')
                                },
                                success: result => {
                                    let talleres = [];
                                    for (var i = 0; i < result.T_CENTROS.length; i++) {
                                        let origen = result.T_CENTROS[i];
                                        if (origen.REGIO == that.get('/ConsultarDisponibilidad/i_Region')) {
                                            talleres.push({
                                                ID_REGION: origen.REGIO,
                                                ID_CENTRO: origen.WERKS,
                                                DES_CENTRO: origen.NAME1,
                                                DES_COMPLETO: origen.NOMBRE_LARGO
                                            });
                                        }
                                    }
                                    that.set('/Opciones/Talleres', talleres);
                                    if (typeof callback === 'function') {
                                        callback();
                                    }
                                }
                            });
            
                            */
            },
            closeDialog: function () {
                for (var i = 0; this['openedDialog' + i] && !this['openedDialog' + i].bIsDestroyed; i++);
                let dialog = 'openedDialog' + (i - 1);
                this[dialog].close();
                this[dialog].destroy();
                utils.view = this[this.getCurrentDialogModel()] || this.getView();
            },

            handleTallerChange: function () {

                this._leerAgenda();
                this.set('/ConsultarDisponibilidad/i_Fecha', null);
                this._disableDates();

                this.set('/Opciones/HorasDisponibles', []);
                this.set('/ConsultarDisponibilidad/i_Hora', '');

                this.set('/Opciones/BoxesDisponibles', []);
                this.set('/ConsultarDisponibilidad/i_Box', '');
            },

            _leerAgenda: function (callback) {

                let that = this;

                let fechas = [];
                let horas = [];

                fechas.push({ DATE: utils.dateFromFormat('2022-05-23', 'yyyy-MM-dd') });
                fechas.push({ DATE: utils.dateFromFormat('2022-05-24', 'yyyy-MM-dd') });
                fechas.push({ DATE: utils.dateFromFormat('2022-05-25', 'yyyy-MM-dd') });
                fechas.push({ DATE: utils.dateFromFormat('2022-05-26', 'yyyy-MM-dd') });
                fechas.push({ DATE: utils.dateFromFormat('2022-05-27', 'yyyy-MM-dd') });

                that.set('/Opciones/FechasDisponibles', fechas);

                horas.push({
                    DATE: utils.dateFromFormat('2022-05-23', 'yyyy-MM-dd'),
                    HORA_INI: '06:30:00',
                    HORA_FIN: '07:00:00',
                    CANT_BOX: '3',
                    CAP_RECEPCION: '2'
                });

                horas.push({
                    DATE: utils.dateFromFormat('2022-05-23', 'yyyy-MM-dd'),
                    HORA_INI: '07:00:00',
                    HORA_FIN: '07:30:00',
                    CANT_BOX: '4',
                    CAP_RECEPCION: '1'
                });

                horas.push({
                    DATE: utils.dateFromFormat('2022-05-24', 'yyyy-MM-dd'),
                    HORA_INI: '06:30:00',
                    HORA_FIN: '07:00:00',
                    CANT_BOX: '3',
                    CAP_RECEPCION: '2'
                });

                horas.push({
                    DATE: utils.dateFromFormat('2022-05-24', 'yyyy-MM-dd'),
                    HORA_INI: '07:00:00',
                    HORA_FIN: '07:30:00',
                    CANT_BOX: '4',
                    CAP_RECEPCION: '1'
                });

                horas.push({
                    DATE: utils.dateFromFormat('2022-05-25', 'yyyy-MM-dd'),
                    HORA_INI: '06:30:00',
                    HORA_FIN: '07:00:00',
                    CANT_BOX: '3',
                    CAP_RECEPCION: '2'
                });

                horas.push({
                    DATE: utils.dateFromFormat('2022-05-25', 'yyyy-MM-dd'),
                    HORA_INI: '07:00:00',
                    HORA_FIN: '07:30:00',
                    CANT_BOX: '4',
                    CAP_RECEPCION: '1'
                });

                horas.push({
                    DATE: utils.dateFromFormat('2022-05-26', 'yyyy-MM-dd'),
                    HORA_INI: '06:30:00',
                    HORA_FIN: '07:00:00',
                    CANT_BOX: '3',
                    CAP_RECEPCION: '2'
                });

                horas.push({
                    DATE: utils.dateFromFormat('2022-05-26', 'yyyy-MM-dd'),
                    HORA_INI: '07:00:00',
                    HORA_FIN: '07:30:00',
                    CANT_BOX: '4',
                    CAP_RECEPCION: '1'
                });

                horas.push({
                    DATE: utils.dateFromFormat('2022-05-27', 'yyyy-MM-dd'),
                    HORA_INI: '06:30:00',
                    HORA_FIN: '07:00:00',
                    CANT_BOX: '3',
                    CAP_RECEPCION: '2'
                });

                horas.push({
                    DATE: utils.dateFromFormat('2022-05-27', 'yyyy-MM-dd'),
                    HORA_INI: '070000',
                    HORA_FIN: '073000',
                    CANT_BOX: '4',
                    CAP_RECEPCION: '1'
                });

                that.set('/AuxHoras', horas);

                this._disableDates();
                /* 
                             utils.httpCall({
                                 service: "Z353R_DISPO_FECHA_HORA",
                                 type: 'POST',
                                 query: {
                                     I_TALLER: this.get('/ConsultarDisponibilidad/i_Taller')
                                 },
                                 success: result => {
                                     let talleres = [];
                                     if (result.E_BAPIRETURN.TYPE == 'E') {
                                         that.addMessage(result.E_BAPIRETURN.MESSAGE, 'E');
                                     } else {
                                         let fechas = [];
                                         let horas = [];
                                         for (var i = 0; i < result.GT_FECHA.length; i++) {
                                             if (result.GT_FECHA[i].DISPONIBLE == '') {
                                                 fechas.push({DATE: utils.dateFromFormat(result.GT_FECHA[i].FECHA, 'yyyy-MM-dd')});
                                             }
                                         }
                                         that.set('/Opciones/FechasDisponibles', fechas);
                                         this._disableDates();
                 
                                         for (var i = 0; i < result.GT_HORA.length; i++) {
                                             if (result.GT_HORA[i].DISPONIBLE == '') {
                                                 let hora = result.GT_HORA[i];
                                                 horas.push({
                                                     DATE: utils.dateFromFormat(hora.FECHA, 'yyyy-MM-dd'),
                                                     HORA_INI: hora.HORA_INI,
                                                     HORA_FIN: hora.HORA_FIN,
                                                     CANT_BOX: hora.CANT_BOX,
                                                     CAP_RECEPCION: hora.CAP_RECEPCION
                                                 });
                                             }
                                         }
                                         that.set('/AuxHoras', horas);
                                         if (typeof callback === 'function') {
                                             callback();
                                         }
                                     }
                                 }
                             });
             
                             */
            },

            _getHoras: function () {
                let calendar = this.byId('calendarDisponibilidad');
                let auxHoras = this.get('/AuxHoras');
                let horasDisponibles = auxHoras.filter(function (h) {
                    return h.DATE.getTime() === calendar.getSelectedDates()[0].getStartDate().getTime()
                });
                this.set('/Opciones/HorasDisponibles', horasDisponibles);
            },

            handleFechaSelect: function (e) {

                let calendar = e.getSource(),
                    fechasDisponibles = this.get('/Opciones/FechasDisponibles');
                if (!fechasDisponibles.find(function (d) {
                    return d.DATE.getTime() === calendar.getSelectedDates()[0].getStartDate().getTime()
                })) {
                    calendar.destroySelectedDates();
                    this.set('/ConsultarDisponibilidad/i_Fecha', null);
                } else {
                    this._getHoras();
                    this.set('/ConsultarDisponibilidad/i_Hora', '');

                    this.set('/Opciones/BoxesDisponibles', []);
                    this.set('/ConsultarDisponibilidad/i_Box', '');
                }

            },

            _getBoxes: function (callback) {

                let that = this;
                let dateFormatter = sap.ui.core.format.DateFormat.getDateInstance({ pattern: 'yyyyMMdd' });

                let boxes = [];

                boxes.push({
                    TALLER: '2AN1',
                    ID_BOX: 'B001',
                    DESC_BOX: 'BOX1'
                });

                boxes.push({
                    TALLER: '2AN1',
                    ID_BOX: 'B002',
                    DESC_BOX: 'BOX2'
                });

                boxes.push({
                    TALLER: '2AN1',
                    ID_BOX: 'B003',
                    DESC_BOX: 'BOX3'
                });

                that.set('/Opciones/BoxesDisponibles', boxes);
                /*
                            utils.httpCall({
                                service: "Z237R_BOX_DISPONIBLES",
                                type: 'POST',
                                query: {
                                    I_TALLER: this.get('/ConsultarDisponibilidad/i_Taller'),
                                    I_FECHA: dateFormatter.format(this.get('/ConsultarDisponibilidad/i_Fecha')),
                                    I_HORA_INI: this.get('/ConsultarDisponibilidad/i_Hora').replace(':', '')
                                },
                                success: result => {
                                    if (result.E_BAPIRETURN.TYPE == 'E') {
                                        that.addMessage(result.E_BAPIRETURN.MESSAGE, 'E');
                                    } else {
                                        that.set('/Opciones/BoxesDisponibles', result.GT_BOX);
                                        if (typeof callback === 'function') {
                                            callback();
                                        }
                                    }
                                }
                            });
            
                            */
            },

            handleHoraChange: function () {

                this._getBoxes();
                this.set('/ConsultarDisponibilidad/i_Box', '');
            },

            handleConsultaDispNext: function (e) {

                let that = this;
                this._cargarServiciosAntecedentes();
                this.set('/ConsultarDisponibilidad/Step', 'ServicioReparaciones');

            },

            handleConsultaDispPrev: function () {

                this.set('/ConsultarDisponibilidad/Step', 'FechaHora');
            },

            _cargarServiciosAntecedentes() {

                let that = this;

                let servicios = [];
                let antecedentes = [];

                servicios.push({
                    ID: '001',
                    DESCRIPCION: 'MANTENCIÓN PREVENTIVA',
                    SELECTED: false
                });

                servicios.push({
                    ID: '002',
                    DESCRIPCION: 'MANTENCIÓN CORRECTIVA',
                    SELECTED: false
                });

                servicios.push({
                    ID: '003',
                    DESCRIPCION: 'OTROS',
                    SELECTED: false
                });

                antecedentes.push({
                    ID: '01',
                    DESCRIPCION: 'DECLARACION JURADA SIMPLE.',
                    SELECTED: false
                });

                antecedentes.push({
                    ID: '02',
                    DESCRIPCION: 'DOCUMENTOS DEL VEHICULO.',
                    SELECTED: false
                });

                antecedentes.push({
                    ID: '03',
                    DESCRIPCION: 'LICENCIA VIGENTE.',
                    SELECTED: false
                });

                that.set('/ConsultarDisponibilidad/Servicios', servicios);
                that.set('/ConsultarDisponibilidad/AntecedentesRequeridos', antecedentes);

                /*                            
                                utils.httpCall({
                                    service: "ZF353_LIST_ANTECEDENTE_SINIEST",
                                    type: 'POST',
                                    query: {
                                        I_SOCIEDAD: '2000',
                                    },
                                    success: result => {
                                        if (result.E_ERROR.TYPE == 'E') {
                                            that.addMessage(result.E_BAPIRETURN.MESSAGE, 'E');
                                        } else {
                                            let servicios = [];
                                            for (var i = 0; i < result.T_LISTA_SERVICIOS.length; i++) {
                                                servicios.push({
                                                    ID: result.T_LISTA_SERVICIOS[i].ID_SERVICIOS,
                                                    DESCRIPCION: result.T_LISTA_SERVICIOS[i].DESC_SERVICIOS,
                                                    SELECTED: false
                                                });
                                            }
                    
                                            let antecedentes = [];
                                            for (var i = 0; i < result.T_LISTA_SINIESTROS.length; i++) {
                                                antecedentes.push({
                                                    ID: result.T_LISTA_SINIESTROS[i].ID_ANT_SINIESTRO,
                                                    DESCRIPCION: result.T_LISTA_SINIESTROS[i].DESC_SINIESTRO,
                                                    SELECTED: false
                                                });
                                            }
                                            that.set('/ConsultarDisponibilidad/Servicios', servicios);
                                            that.set('/ConsultarDisponibilidad/AntecedentesRequeridos', antecedentes);
                                            if (typeof callback === 'function') {
                                                callback();
                                            }
                                        }
                                    }
                                });
                
                                */
            },

            _getServicioSeleccionado: function () {
                let that = this;
                let aviso = this.get('/ConsultarAgenda/Avisos/' + this.get('/ConsultarAgenda/i_Aviso'));

                utils.httpCall({
                    service: "Z353R_MOSTRAR_SERVI_SELECC",
                    type: 'POST',
                    query: {
                        I_AVISO: aviso.AVISO
                    },
                    success: result => {
                        let servicios = that.get('/ConsultarDisponibilidad/Servicios');

                        result.GT_LIS_SERVI.forEach(function (s) {
                            servicios.forEach(function (s2) {
                                if (s.ID_SERVICIOS === s2.ID) {
                                    s2.SELECTED = true;
                                }
                            });
                        });
                        that.set('/ConsultarDisponibilidad/Servicios', servicios);

                        that.set('/ConsultarDisponibilidad/i_Presenta_Reparaciones', (result.E_REPARACION == 1 ? 'SI' : 'NO'));
                        that.set('/ConsultarDisponibilidad/i_Presenta_Siniestro', (result.E_SINIESTRO == 1 ? 'SI' : 'NO'));

                        that.set('/ConsultarDisponibilidad/NroSiniestro', result.E_NRO_PARTE);
                        that.set('/ConsultarDisponibilidad/Observacion', result.E_OBSERVACION);
                    }
                });
            },

            handleGenerarReserva: function (e) {


                let that = this;
                let validator = new Validator();

                let selectedTaller = this.get('/Opciones/Talleres').find(function (t) {
                    return t.ID_CENTRO == that.get('/ConsultarDisponibilidad/i_Taller');
                });

                let selectedBox = this.get('/Opciones/BoxesDisponibles').find(function (b) {
                    return b.ID_BOX == that.get('/ConsultarDisponibilidad/i_Box');
                });


                this.set('/ConfirmarReserva', {
                    NombreCliente: this.get('/Cliente/NOMBRE'),
                    RutCliente: this.get('/Cliente/RUT'),
                    Marca: this.get('/Vehiculos/0/MARCA'),
                    Modelo: this.get('/Vehiculos/0/MODELO'),
                    Patente: this.get('/Vehiculos/0/PATENTE'),
                    Fecha: this.get('/ConsultarDisponibilidad/i_Fecha'),
                    Hora: this.get('/ConsultarDisponibilidad/i_Hora'),
                    Taller: selectedTaller.DES_COMPLETO,
                    Box: selectedBox.ID_BOX + ' - ' + selectedBox.DESC_BOX

                });

                this.openDialog('ConfirmarReserva');

                /*
                let valid = validator.validate(this.byId('frmServicios'));
                if (valid) {
                    let serviciosSeleccionados = this.get('/ConsultarDisponibilidad/Servicios').filter(function (s) {
                        return s.SELECTED;
                    });
    
    
                    if (serviciosSeleccionados.length > 0) {
                        this.set('/ConsultarDisponibilidad/ServiciosState', sap.ui.core.ValueState.None);
    
                        let selectedTaller = this.get('/Opciones/Talleres').find(function (t) {
                            return t.ID_CENTRO == that.get('/ConsultarDisponibilidad/i_Taller');
                        });
    
                        let selectedBox = this.get('/Opciones/BoxesDisponibles').find(function (b) {
                            return b.ID_BOX == that.get('/ConsultarDisponibilidad/i_Box');
                        });
    
                        this.set('/ConfirmarReserva', {
                            NombreCliente: this.get('/Cliente/NOMBRE'),
                            RutCliente: this.get('/Cliente/RUT'),
                            Marca: this.get('/Vehiculos/0/MARCA'),
                            Modelo: this.get('/Vehiculos/0/MODELO'),
                            Patente: this.get('/Vehiculos/0/PATENTE'),
                            Fecha: this.get('/ConsultarDisponibilidad/i_Fecha'),
                            Hora: this.get('/ConsultarDisponibilidad/i_Hora'),
                            Taller: selectedTaller.DES_COMPLETO,
                            Box: selectedBox.ID_BOX + ' - ' + selectedBox.DESC_BOX
                        });
                        this.openDialog('ConfirmarReserva');
                    } else {
                        this.set('/ConsultarDisponibilidad/ServiciosState', sap.ui.core.ValueState.Error);
                    }
                }

                */
            },

            handleConfirmarReserva: function () {

                let that = this;

                that.closeDialog(); //confirmacion
                that.closeDialog(); //agenda

                sap.m.MessageBox.success('Se agendado la mantención del vehículo', { title: "Éxito" });

                //                let query = this._getAgendaQuery();
                /*
                                if (this.get('/ConsultarDisponibilidad/Modo') === 'C') {
                                    utils.httpCall({
                                        service: "Z237W_AGENDAR_HORA",
                                        type: 'POST',
                                        query: query,
                                        success: result => {
                                            that.closeDialog(); //confirmacion
                                            that.closeDialog(); //agenda
                                            that._messageManager(result.GT_RETURN, function () {
                                                that.set('/Visibles/CrearAgenda', false);
                                                that.set('/Visibles/ModificarAgenda', true);
                                            });
                                        }
                                    });
                                } else {
                                    let aviso = this.get('/ConsultarAgenda/Avisos/' + this.get('/ConsultarAgenda/i_Aviso'));
                
                                    query.I_AVISO = aviso.AVISO;
                
                                    utils.httpCall({
                                        service: "Z237W_CAMBIAR_HORA",
                                        type: 'POST',
                                        query: query,
                                        success: result => {
                                            that.closeDialog(); //confirmacion
                                            that.closeDialog(); //agenda
                                            that._messageManager(result.GT_RETURN, function () {
                                                that.set('/Visibles/CrearAgenda', false);
                                                that.set('/Visibles/ModificarAgenda', true);
                                            });
                                            that._getAvisos();
                                        }
                                    });
                                }
                
                                */
            },

            getCurrentDialogModel: function () {
                for (var i = 0; this['openedDialog' + i] && !this['openedDialog' + i].bIsDestroyed; i++);
                return 'openedDialog' + (i - 1);
            },

            handleConsultarAgenda: function () {

                this._iniciarConsultarAgenda();
                this._getHistorialMantenciones();
                this._getAvisos();
                this.openDialog("ConsultarAgenda");


            },

            _getAvisos: function () {

                let that = this;
                let avisos = [];

                // for (var i = 0; i < result.E_DATOS_AVISO.length; i++) {
                //                let datos = result.E_DATOS_AVISO[i];
                avisos.push({
                    AVISO: '70392308',
                    FECHA: '20220505',
                    HORA: '083000',
                    TALLER: 'RaC Antofagasta',
                    CENTRO: '2AN1',
                    VIN: '000000000007257489',
                    NOMBRE_COMPLETO: 'Rivas Calderon',
                    REGION_ID: '01',
                    REGION_DES: 'REGION Atacama',
                    FECHA_SIS: '',
                    BOX_ID: '001',
                    BOX_DES: 'BOX 001'
                });
                //}

                that.set('/ConsultarAgenda/Avisos', avisos);

                if (avisos.length > 0) {
                    that.set('/ConsultarAgenda/i_Aviso', 0);
                };
                /*
                            utils.httpCall({
                                service: "Z237R_CHECK_AGENDA2",
                                type: 'POST',
                                query: {
                                    I_TIPO_AGENDA: 'RECE',
                                    I_VIN: this.get('/Vehiculos/0').VIN
                                },
                                success: result => {
                                    let avisos = [];
                                    for (var i = 0; i < result.E_DATOS_AVISO.length; i++) {
                                        let datos = result.E_DATOS_AVISO[i];
                                        avisos.push({
                                            AVISO: datos.QMNUM,
                                            FECHA: datos.FECHA,
                                            HORA: datos.HORA,
                                            TALLER: datos.NAME1,
                                            CENTRO: datos.IWERK,
                                            VIN: datos.VIN,
                                            NOMBRE_COMPLETO: datos.NAME_COMPLETO,
                                            REGION_ID: datos.ID_REGI,
                                            REGION_DES: datos.DES_REGI,
                                            FECHA_SIS: datos.FECHA_SIS,
                                            BOX_ID: datos.ID_BOX,
                                            BOX_DES: datos.DES_BOX
                                        });
                                    }
                
                                    that.set('/ConsultarAgenda/Avisos', avisos);
                                    if (avisos.length > 0) {
                                        that.set('/ConsultarAgenda/i_Aviso', 0);
                                    }
                                }
                            });
            
                            */

            },

            handleActualizarKm: function (e) {

                sap.m.MessageBox.success('Se ha actualizado el KM', { title: "Éxito" });
                /*
                //                let that = this;
                //                let vehiculo = this.get('/Vehiculos/0');
                //                let validator = new Validator();
                
                                let valid = validator.validate(e.getSource().getParent().getParent());
                                if (valid) {
                                    utils.httpCall({
                                        service: "Z353W_ACTUALIZAR_KM",
                                        type: 'POST',
                                        query: {
                                            I_VIN: vehiculo.VIN,
                                            I_FLAG_KM: 'U',
                                            I_VALOR_KMM: vehiculo.KILOMETRAJE_ACTUAL,
                                            I_SOCIEDAD: '2000',
                                            I_PATENTE: vehiculo.PATENTE,
                                            I_EMAIL: this.get('/Contrato').EMAIL,
                                            I_USUARIO: utils.getUser()
                                        },
                                        success: result => {
                                            switch (result.SERVICESTATUS.CODE) {
                                                case '0':
                                                    sap.m.MessageBox.success(result.SERVICESTATUS.MESSAGE, {title: "Éxito"});
                                                    break;
                                                case '3':
                                                case '7':
                                                    that.addMessage(result.SERVICESTATUS.MESSAGE, 'W');
                                                    break;
                                                default:
                                                    that.addMessage(result.SERVICESTATUS.MESSAGE, 'E');
                                                    break;
                                            }
                                            utils.httpCall({
                                                service: "Z237R_CS_TOOLS_BUSCA_EQUIPO",
                                                query: {
                                                    I_MATRICULA: that.get('/filters/Patente')
                                                },
                                                success: result2 => {
                                                    that._poblarClienteYVehiculo(result2);
                                                    that.set('/Vehiculos/0/KILOMETRAJE_ACTUAL', vehiculo.KILOMETRAJE_ACTUAL);
                                                    that.set('/Vehiculos/0/FLAG_ACT_KM', true);
                                                }
                                            });
                                        }
                                    });
                                }
                
                                */
            },

            handleCrearConductor: function () {
                this._iniciarConductor('C');
                this.openDialog("Conductor");
            },

            _iniciarConductor: function (modo) {
                this.set('/Conductor', {
                    Modo: modo,
                    Rut: '',
                    Nombre: '',
                    Apellido: '',
                    TelefonoMovil: '',
                    TelefonoFijo: '',
                    Email: ''
                });
            },

            handleSaveConductor: function (e) {

                let that = this;
                //               let validator = new Validator();
                //                let valid = validator.validate(e.getSource().getParent());
                let conductor = this.get('/Conductor');
                let conductores = [];
                conductores = that.get('/Conductores');

                conductores.push({
                    RUT: conductor.Rut,
                    NOMBRE: conductor.Nombre,
                    APELLIDO: conductor.Apellido,
                    EMAIL: conductor.Email,
                    MOVIL: conductor.TelefonoMovil,
                    FONO: conductor.TelefonoFijo
                });

                that.set('/Conductores', conductores);


                /*
                                let datosConductor = {
                                    NOMBRE: conductor.Nombre + '/]' + conductor.Apellido,
                                    RUT: conductor.Rut,
                                    TELEFONO: conductor.TelefonoMovil,
                                    FONO_FIJO: conductor.TelefonoFijo,
                                    MAIL: conductor.Email,
                                    VENC_LICEN_COND: ''
                                };
                
                                */

                sap.m.MessageBox.success('Se guardado con exito el conductor', { title: "Éxito" });

                that.closeDialog();
                /*
                                if (valid) {
                                    let conductor = this.get('/Conductor');
                                    let datosConductor = {
                                        NOMBRE: conductor.Nombre + '/]' + conductor.Apellido,
                                        RUT: conductor.Rut,
                                        TELEFONO: conductor.TelefonoMovil,
                                        FONO_FIJO: conductor.TelefonoFijo,
                                        MAIL: conductor.Email,
                                        VENC_LICEN_COND: ''
                                    };
                                    utils.httpCall({
                                        service: "ZF353_CAMBIACONDUCTOR",
                                        type: 'POST',
                                        query: {
                                            IDEQUIPO: this.get('/Vehiculos/0').VIN,
                                            DATOSCONDUCTOR: datosConductor
                                        },
                                        success: result => {
                                            if (result.SERVICESTATUS.CODE != '0') {
                                                that.addMessage(result.SERVICESTATUS.MESSAGE, 'E');
                                            } else {
                                                if (result.SERVICESTATUS.CODE == '0') {
                                                    sap.m.MessageBox.success(result.SERVICESTATUS.MESSAGE, {title: "Éxito"});
                                                } else {
                                                    that.addMessage(result.SERVICESTATUS.MESSAGE, 'W');
                                                }
                                                that._buscarDatosConductores();
                                                that.closeDialog();
                                            }
                                        }
                                    });
                                }
                
                                */
            }

        });
    });
