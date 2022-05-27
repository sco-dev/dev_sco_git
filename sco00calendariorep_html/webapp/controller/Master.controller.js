// @ts-nocheck

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sapui5agendar/sco00calendariorep_html/utils/utils",
    "sapui5agendar/sco00calendariorep_html/model/models",
    "sapui5agendar/sco00calendariorep_html/utils/validator",
    "sap/ui/generic/app/navigation/service/NavigationHandler",
    "sapui5agendar/sco00calendariorep_html/lib/js-xls-0.11.17/xlsx.full.min",
    "sapui5agendar/sco00calendariorep_html/lib/FileSaver-1.3.4/FileSaver.min"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    // @ts-ignore

    /* eslint-disable no-console */
    function (Controller, utils, models, Validator, NavigationHandler, NavType) {
        "use strict";

        return Controller.extend("sapui5agendar.sco00calendariorep_html.controller.Master", {

            _loadingListadoRegiones: null,

            tiposReporte: [
                { key: "", text: "Seleccione" },
                { key: "RA", text: "Reservas Agendadas" },
                { key: "RI", text: "Reservas Inasistentes" },
                { key: "HR", text: "Historial de Reservas" }
            ],

            criterios: [
                { key: "", text: "Seleccione" },
                { key: "centro-uno", text: "Un centro especifico" },
                { key: "centros-todos", text: "Todos los centros" },
                { key: "cliente-uno", text: "Un cliente especifico" },
                { key: "cliente-todos", text: "Todos los clientes" }
            ],

            tableReservasRowBindSet: false,

            currentAvisoDetail: undefined,

            onInit: function () {
                this._basicInit();

                // create an instance of the navigation handler
                // @ts-ignore
                //               this.oNavigationHandler = new NavigationHandler(this);

                // on back navigation, the previous app state is returned in a Promise
                // @ts-ignore
                //           this.oNavigationHandler.parseNavigation().done(this.onNavigationDone.bind(this));
            },

            _basicInit: function () {
                // @ts-ignore
                this._loadingListadoRegiones = new $.Deferred();
                let model = models.createLocalModel();
                let view = this.getView();
                // @ts-ignore
                this.model = model;
                model.setProperty('/filters', {});
                model.setProperty('/selects', {});

                model.setProperty('/verCalendario', false);

                model.setProperty('/reportes', {});
                model.setProperty('/reportes/filters', {});
                model.setProperty('/reportes/selects', {});
                model.setProperty('/reportes/canReAgendar', false);

                model.setProperty('/detalle', {});

                view.setModel(model);
                utils.view = view;
                utils.controller = this;

                // @ts-ignore
                this._loadListadoRegiones("/selects/regiones", "/selects/centros");

                model.setProperty("/selects/dias", [
                    { key: "", text: "Seleccione" },
                    { key: "1", text: "1" },
                    { key: "2", text: "2" },
                    { key: "3", text: "3" },
                    { key: "4", text: "4" },
                    { key: "5", text: "5" },
                    { key: "6", text: "6" },
                ]);

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
            },

            _loadListadoRegiones: function (selectRegionesPath, selectCentrosPath) {
                let that = this;

                /*
                utils.httpCall({
                    service: "Z237R_Listado_Regiones",
                    query: {
                        I_BUKRS: "2000"
                    },
                    success: function (result, status, xhr) {
                        let config = {
                            layout: "BEZEI",
                            textoInicial: "Seleccione",
                            textoVacio: "--",
                            uppercase: null,
                            sortBy: null
                        };

                        that._loadCombo(that.model, selectRegionesPath, result.T_LIS_REGIONES, "BLAND", "BEZEI", config);
                        that._loadCombo(that.model, selectCentrosPath, [], "WERKS", "NOMBRE_LARGO", config);
                        that._loadingListadoRegiones.resolve();
                    }
                });

                */
                let config = {
                    layout: "BEZEI",
                    textoInicial: "Seleccione",
                    textoVacio: "--",
                    uppercase: null,
                    sortBy: null
                };

                let T_LIS_REGIONES = [];

                T_LIS_REGIONES.push({
                    MANDT: "300",
                    BLAND: "01",
                    BEZEI: "I - Tarapacá"
                });

                T_LIS_REGIONES.push({
                    MANDT: "300",
                    BLAND: "02",
                    BEZEI: "II - Antofagasta"
                });

                T_LIS_REGIONES.push({
                    MANDT: "300",
                    BLAND: "03",
                    BEZEI: "III - Atacama"
                });

                T_LIS_REGIONES.push({
                    MANDT: "300",
                    BLAND: "04",
                    BEZEI: "IV - Coquimbo"
                });

                T_LIS_REGIONES.push({
                    MANDT: "300",
                    BLAND: "05",
                    BEZEI: "V - Valparaiso"
                });

                // @ts-ignore
                that._loadCombo(that.model, selectRegionesPath, T_LIS_REGIONES, "BLAND", "BEZEI", config);
                // @ts-ignore
                that._loadCombo(that.model, selectCentrosPath, [], "WERKS", "NOMBRE_LARGO", config);

                that._loadingListadoRegiones.resolve();

            },

            _loadCombo: function (model, field, data, codeField, descriptionField, config) {
                let layout = config.layout ? config.layout : codeField + " - " + descriptionField;
                let textoInicial = config.textoInicial ? config.textoInicial : null;
                let textoVacio = config.textoVacio ? config.textoVacio : null;
                let uppercase = config.uppercase ? config.uppercase : null;
                let sortBy = config.sortBy ? config.sortBy : null;

                let values = [];

                if (!data || !data.length) {
                    if (textoVacio) {
                        values.push({
                            key: null,
                            text: textoVacio
                        });
                    }
                }
                else {
                    if (textoInicial) {
                        values.push({
                            key: null,
                            text: textoInicial
                        });
                    }

                    if (sortBy) {
                        data = data.sort(function (a, b) {
                            if (a[sortBy] > b[sortBy]) {
                                return 1;
                            }
                            if (a[sortBy] < b[sortBy]) {
                                return -1;
                            }

                            return 0;
                        });
                    }

                    for (let i = 0; i < data.length; i++) {
                        let item = data[i];

                        let codeValue = item[codeField];
                        let descriptionValue = item[descriptionField];

                        if (uppercase) {
                            if (uppercase === "UP") {
                                descriptionValue = descriptionValue.toUpperCase();
                            } else if (uppercase === "DOWN") {
                                descriptionValue = descriptionValue.toLowerCase();
                            }
                        }

                        let description = utils.replaceAll(layout, codeField, codeValue);
                        description = utils.replaceAll(description, descriptionField, descriptionValue);

                        values.push({
                            key: codeValue,
                            text: description
                        });
                    }
                }

                // @ts-ignore
                this.set(field, values, undefined, false);
            },

            getAppParam: function (param, defaultVal) {
                let ownerComponent = this.getOwnerComponent();
                let oComponentData = ownerComponent.getComponentData();
                let val = defaultVal;
                // @ts-ignore
                if (oComponentData && oComponentData.startupParameters[param] && oComponentData.startupParameters[param]) {
                    // @ts-ignore
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
                // @ts-ignore
                return this.model.getProperty(path);
            },
            set: function (path, value, context, asyncUpdate) {
                // @ts-ignore
                return this.model.setProperty(path, value, context, asyncUpdate);
            },

            handleRegionChange: function () {
                this.set("/filters/i_centro", undefined);
                //this.set("/filters/i_dia", undefined);
                this._loadListadoCentros("/filters/i_region", "/selects/centros");
            },

            _loadListadoCentros: function (filtersRegionPath, selectCentrosPath) {

                let that = this;

                if (this.get(filtersRegionPath)) {

                    let config = {
                        layout: "NOMBRE_LARGO",
                        textoInicial: "Seleccione",
                        textoVacio: "--",
                        uppercase: null,
                        sortBy: null
                    };

                    let t_centros = [];

                    t_centros.push({
                        MANDT: "300",
                        BUKRS: "2000",
                        WERKS: "2IQ0",
                        NAME1: "RaC Alto Hospicio - Iquique",
                        REGIO: "01",
                        NOMBRE_LARGO: "2IQ0 - RaC Alto Hospicio - Iquique"
                    });


                    t_centros.push({
                        MANDT: "300",
                        BUKRS: "2000",
                        WERKS: "2IQ2",
                        NAME1: "RaC C.Colorado",
                        REGIO: "01",
                        NOMBRE_LARGO: "2IQ2 - RaC C.Colorado"
                    });

                    t_centros.push({
                        MANDT: "300",
                        BUKRS: "2000",
                        WERKS: "2IQ6",
                        NAME1: "No Usar",
                        REGIO: "01",
                        NOMBRE_LARGO: "2IQ6 - No Usar"
                    });

                    t_centros.push({
                        MANDT: "300",
                        BUKRS: "2000",
                        WERKS: "2IQ6",
                        NAME1: "No Usar",
                        REGIO: "01",
                        NOMBRE_LARGO: "2IQ6 - No Usar"
                    });

                    // @ts-ignore
                    that._loadCombo(that.model, selectCentrosPath, t_centros, "WERKS", "NOMBRE_LARGO", config);
                    /*
                                        utils.httpCall({
                                            service: "Z237R_Listado_Regiones",
                                            query: {
                                                I_BUKRS: "2000",
                                                I_REGIO: this.get(filtersRegionPath)
                                            },
                                            success: function (result, status, xhr) {
                                                let config = {
                                                    layout: "NOMBRE_LARGO",
                                                    textoInicial: "Seleccione",
                                                    textoVacio: "--",
                                                    uppercase: null,
                                                    sortBy: null
                                                };
                    
                                                // @ts-ignore
                                                that._loadCombo(that.model, selectCentrosPath, result.T_CENTROS, "WERKS", "NOMBRE_LARGO", config);
                                            }
                                        });
                    
                                        */
                }
                else {
                    let config = {
                        textoVacio: "--"
                    };
                    // @ts-ignore
                    that._loadCombo(that.model, selectCentrosPath, [], "WERKS", "NOMBRE_LARGO", config);
                }
            },

            handleConsultar: function () {
                let that = this;

                let validator = new Validator();
                let valid = validator.validate(this.byId("filters"));
                if (!valid) {
                    return;
                }

                let hasErrors = false;

                let region = this.get("/filters/i_region");
                if (!region) {
                    this.addMessage("Seleccione una región.", "e", true);
                    hasErrors = true;
                }

                let centro = this.get("/filters/i_centro");
                if (!centro) {
                    this.addMessage("Seleccione un centro.", "e", true);
                    hasErrors = true;
                }

                let dia = this.get("/filters/i_dia");
                if (!dia) {
                    this.addMessage("Seleccione un día.", "e", true);
                    hasErrors = true;
                }

                if (hasErrors) {
                    return;
                }

                let centros = that.get("/selects/centros");
                let nombreCentro = centros.find((r) => r.key === centro).text;

                this.set('/calendarioHeader', "Calendario: " + nombreCentro);

                var oFilters = {
                    I_WERKS: centro,
                    I_DIAS: dia
                };

                let T_DIA_NOMBRE1 = [];
                let T_TURNOS = [];
                let T_AGENDA = [];
                let T_BOX = [];

                T_BOX.push({
                    DESC_BOX: "BOX 1 2QL0",
                    ID_BOX: "B001",
                    MANDT: "300",
                    TALLER: "2QL0"
                });

                T_BOX.push({
                    DESC_BOX: "BOX 2 2QL0",
                    ID_BOX: "B002",
                    MANDT: "300",
                    TALLER: "2QL0"
                });

                T_BOX.push({
                    DESC_BOX: "BOX 3 2QL0",
                    ID_BOX: "B003",
                    MANDT: "300",
                    TALLER: "2QL0"
                });

                T_BOX.push({
                    DESC_BOX: "BOSCH 3 2QL0",
                    ID_BOX: "BSCH",
                    MANDT: "300",
                    TALLER: "2QL0"
                });

                T_BOX.push({
                    DESC_BOX: "LALIG 6 2QL0",
                    ID_BOX: "LAL1",
                    MANDT: "300",
                    TALLER: "2QL0"
                });

                T_BOX.push({
                    DESC_BOX: "LALIG 7 2QL0",
                    ID_BOX: "LAL2",
                    MANDT: "300",
                    TALLER: "2QL0"
                });

                T_BOX.push({
                    DESC_BOX: "SER 5 2QL0",
                    ID_BOX: "SER2",
                    MANDT: "300",
                    TALLER: "2QL0",
                });

                T_BOX.push({
                    DESC_BOX: "SER 4 2QL0",
                    ID_BOX: "SERV",
                    MANDT: "300",
                    TALLER: "2QL0"
                });



                T_DIA_NOMBRE1.push({
                    FECHA: "2022-05-23",
                    NOMBRE_DIA: "Lunes"
                });

                T_DIA_NOMBRE1.push({
                    FECHA: "2022-05-24",
                    NOMBRE_DIA: "Martes"
                });

                T_DIA_NOMBRE1.push({
                    FECHA: "2022-05-25",
                    NOMBRE_DIA: "Miércoles"
                });

                T_TURNOS.push({
                    COD_TURNO: "1",
                    DESC_TURNO: "08:30-09:00",
                    FECHA: "2022-05-23",
                    HORA_FIN: "09:00:00",
                    HORA_INI: "08:30:00",
                    MANDT: "300"
                });

                T_TURNOS.push({
                    COD_TURNO: "2",
                    DESC_TURNO: "09:00-09:29",
                    FECHA: "2022-05-23",
                    HORA_FIN: "09:29:00",
                    HORA_INI: "09:00:00",
                    MANDT: "300"
                });

                T_TURNOS.push({
                    COD_TURNO: "3",
                    DESC_TURNO: "08:30-09:00",
                    FECHA: "2022-05-24",
                    HORA_FIN: "09:00:00",
                    HORA_INI: "08:30:00",
                    MANDT: "300"
                });

                T_TURNOS.push({
                    COD_TURNO: "4",
                    DESC_TURNO: "09:00-09:29",
                    FECHA: "2022-05-24",
                    HORA_FIN: "09:29:00",
                    HORA_INI: "09:00:00",
                    MANDT: "300"
                });

                T_TURNOS.push({
                    COD_TURNO: "5",
                    DESC_TURNO: "08:30-09:00",
                    FECHA: "2022-05-25",
                    HORA_FIN: "09:00:00",
                    HORA_INI: "08:30:00",
                    MANDT: "300"
                });

                T_TURNOS.push({
                    COD_TURNO: "6",
                    DESC_TURNO: "09:00-09:29",
                    FECHA: "2022-05-25",
                    HORA_FIN: "09:29:00",
                    HORA_INI: "09:00:00",
                    MANDT: "300"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "6",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "SERV",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "6",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "SER2",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "6",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "LAL2",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "6",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "LAL1",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "6",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "BSCH",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "6",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "B003",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "6",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "B002",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "6",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "B001",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "5",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "SERV",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "5",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "SER2",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "5",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "LAL2",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "5",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "LAL1",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "5",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "BSCH",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "5",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "B003",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "5",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "B002",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "5",
                    EQUIPO: "",
                    FECHA: "2022-05-25",
                    ID_BOX: "B001",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });


                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "4",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "SERV",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "4",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "SER2",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "4",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "LAL2",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "4",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "LAL1",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "4",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "BSCH",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "4",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "B003",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "4",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "B002",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "4",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "B001",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "3",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "SERV",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "3",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "SER2",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "3",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "LAL2",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "3",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "LAL1",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "3",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "BSCH",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "3",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "B003",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "3",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "B002",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "3",
                    EQUIPO: "",
                    FECHA: "2022-05-24",
                    ID_BOX: "B001",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "2",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "SERV",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "2",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "SER2",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "2",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "LAL2",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "2",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "LAL1",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "2",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "BSCH",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "2",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "B003",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "2",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "B002",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });


                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "2",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "B001",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "1",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "SERV",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "1",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "SER2",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "1",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "LAL2",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "1",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "LAL1",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "1",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "BSCH",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "1",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "B003",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });

                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "1",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "B002",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });


                T_AGENDA.push({
                    AVISO: "",
                    COD_TURNO: "1",
                    EQUIPO: "",
                    FECHA: "2022-05-23",
                    ID_BOX: "B001",
                    MANDT: "300",
                    OCUPADO: "",
                    ORDEN: "",
                    PATENTE: "",
                    TALLER: "2QL0"
                });




                if (that.byId(that.createId("layout"))) {
                    that.byId(that.createId("layout")).destroy();
                }

                let calendarios = new sap.m.VBox(that.createId("layout"));

                that.set('/tables', []);


                for (let d = 0; d < T_DIA_NOMBRE1.length; d++) {
                    let t_dia_nombre = T_DIA_NOMBRE1[d];

                    let rows = [];

                    for (let t = 0; t < T_TURNOS.length; t++) {
                        let t_turno = T_TURNOS[t];
                        if (t_dia_nombre.FECHA === t_turno.FECHA) {
                            let row = {
                                turno: t_turno.DESC_TURNO,
                                codTurno: t_turno.COD_TURNO,
                                dia: t_dia_nombre.FECHA
                            };

                            for (let a = 0; a < T_AGENDA.length; a++) {
                                let t_agenda = T_AGENDA[a];
                                for (let b = 0; b < T_BOX.length; b++) {
                                    let box = T_BOX[b].ID_BOX;
                                    if (t_agenda.COD_TURNO === t_turno.COD_TURNO && t_agenda.ID_BOX === box) {
                                        let icon = that.getIconAndColor(t_agenda.OCUPADO);
                                        row[box] = t_agenda;
                                        row['icon' + box] = 'sap-icon://' + icon.symbol;
                                        row['color' + box] = icon.color;
                                    }
                                }
                            }

                            rows.push(row);
                        }
                    }

                    that.set('/tables/' + d, rows);

                    let table = new sap.ui.table.Table({
                        title: new sap.m.Title({
                            text: t_dia_nombre.NOMBRE_DIA + " (" + utils.dateFormatToFormat(t_dia_nombre.FECHA, 'yyyy-MM-dd', 'dd/MM/yyyy') + ")"
                        }),
                        rows: '{/tables/' + d + '}',
                        selectionMode: "None",
                        visibleRowCount: rows.length
                    });

                    table.addStyleClass("sapUiSmallMargin");

                    table.addColumn(new sap.ui.table.Column({
                        label: new sap.m.Label({
                            text: 'Turno'
                        }),
                        template: new sap.m.Text({
                            text: '{turno}'
                        })
                    }));

                    for (let i = 0; i < T_BOX.length; i++) {
                        table.addColumn(new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: T_BOX[i].ID_BOX
                            }),
                            template: new sap.ui.core.Icon({
                                src: '{icon' + T_BOX[i].ID_BOX + '}',
                                color: '{color' + T_BOX[i].ID_BOX + '}',
                                press: function (oEvent) {
                                    var box = T_BOX[i];
                                    var row = oEvent.getSource().getBindingContext().getObject();
                                    var agenda = row[box.ID_BOX];

                                    if (agenda.PATENTE) {
                                        that.currentAvisoDetail = agenda.AVISO;

                                        that.set("/detalle/patente", agenda.PATENTE);
                                        that.set("/detalle/box", box.ID_BOX + " - " + box.DESC_BOX);

                                        that.getDatosConductor(agenda.PATENTE);
                                        that.getDatosCliente(agenda.PATENTE);
                                        that.getDatosAdicionales(agenda.PATENTE, agenda);

                                        that.openDialog("Detalle");
                                    } else {
                                        var returnData = {
                                            origin: "calendario",
                                            data: {
                                                filters: that.get('/filters'),
                                                centros: that.get('/selects/centros'),
                                                regiones: that.get('/selects/regiones')
                                            }
                                        }

                                        var parameters = {
                                            patente: "",
                                            idBox: box.ID_BOX,
                                            date: row.dia,
                                            centro: centro,
                                            region: region,
                                            hora: row.turno
                                        }

                                        that.oNavigationHandler.navigate("app00460agendar", "Display", parameters, { customData: returnData });
                                    }
                                }
                            }),
                            hAlign: sap.ui.core.HorizontalAlign.Center
                        }));
                    }

                    calendarios.addItem(table);
                }

                var panel = sap.ui.getCore().byId(that.createId("panelCalendarios"));

                panel.insertContent(calendarios, 0);

                that.set('/verCalendario', true);

                /*
                                utils.httpCall({
                                    service: "Z353R_Carga_Matrix_Agendamient",
                                    query: oFilters,
                                    type: "GET",
                                    success: function (result, status, xhr) {
                                        if (result.E_RETURN.TYPE === "E") {
                                            that.addMessage(result.E_RETURN.MESSAGE, "e", true);
                                            return;
                                        }
                    
                                        if (that.byId(that.createId("layout"))){
                                            that.byId(that.createId("layout")).destroy();
                                        }
                                        
                                        let calendarios = new sap.m.VBox(that.createId("layout"));
                                        
                                        that.set('/tables', []);
                                        
                                        for (let d = 0; d < result.T_DIA_NOMBRE.length; d++) {
                                            let t_dia_nombre = result.T_DIA_NOMBRE[d];
                                            
                                            let rows = [];
                                            
                                            for (let t = 0; t < result.T_TURNOS.length; t++) {
                                                let t_turno = result.T_TURNOS[t];
                                                if (t_dia_nombre.FECHA === t_turno.FECHA) {
                                                    let row = {
                                                        turno: t_turno.DESC_TURNO,
                                                        codTurno: t_turno.COD_TURNO,
                                                        dia: t_dia_nombre.FECHA
                                                    };
                                                    
                                                    for (let a = 0; a < result.T_AGENDA.length; a++) {
                                                        let t_agenda = result.T_AGENDA[a];
                                                        for (let b = 0; b < result.T_BOX.length; b++) {
                                                            let box = result.T_BOX[b].ID_BOX;
                                                            if (t_agenda.COD_TURNO === t_turno.COD_TURNO && t_agenda.ID_BOX === box){
                                                                let icon = that.getIconAndColor(t_agenda.OCUPADO);
                                                                row[box] = t_agenda;
                                                                row['icon' + box] = 'sap-icon://' + icon.symbol;
                                                                row['color' + box] = icon.color;
                                                            }
                                                        }
                                                    }
                    
                                                    rows.push(row);
                                                }
                                            }
                                            
                                            that.set('/tables/' + d, rows);
                                            
                                            let table = new sap.ui.table.Table({
                                                title: new sap.m.Title({
                                                    text: t_dia_nombre.NOMBRE_DIA + " (" + utils.dateFormatToFormat(t_dia_nombre.FECHA, 'yyyy-MM-dd', 'dd/MM/yyyy') + ")"
                                                }),
                                                rows: '{/tables/' + d + '}',
                                                selectionMode: "None",
                                                visibleRowCount: rows.length
                                            });
                                            
                                            table.addStyleClass("sapUiSmallMargin");
                                            
                                            table.addColumn(new sap.ui.table.Column({
                                                label: new sap.m.Label({
                                                    text: 'Turno'
                                                }),
                                                template: new sap.m.Text({
                                                    text: '{turno}'
                                                })
                                            }));
                                            
                                            for (let i = 0; i < result.T_BOX.length; i++) {
                                                table.addColumn(new sap.ui.table.Column({
                                                    label: new sap.m.Label({
                                                        text: result.T_BOX[i].ID_BOX
                                                    }),
                                                    template: new sap.ui.core.Icon({
                                                        src: '{icon' + result.T_BOX[i].ID_BOX + '}',
                                                        color: '{color' + result.T_BOX[i].ID_BOX + '}',
                                                        press: function (oEvent) {
                                                            var box = result.T_BOX[i];
                                                            var row = oEvent.getSource().getBindingContext().getObject();
                                                            var agenda = row[box.ID_BOX];
                                                            
                                                            if (agenda.PATENTE) {
                                                                that.currentAvisoDetail = agenda.AVISO;
                                                                
                                                                that.set("/detalle/patente", agenda.PATENTE);
                                                                that.set("/detalle/box", box.ID_BOX + " - " + box.DESC_BOX);
                                                                
                                                                that.getDatosConductor(agenda.PATENTE);
                                                                that.getDatosCliente(agenda.PATENTE);
                                                                that.getDatosAdicionales(agenda.PATENTE, agenda);
                                                                
                                                                that.openDialog("Detalle");
                                                            } else {
                                                                var returnData = {
                                                                    origin: "calendario",
                                                                    data: {
                                                                        filters: that.get('/filters'),
                                                                        centros: that.get('/selects/centros'),
                                                                        regiones: that.get('/selects/regiones')
                                                                    }
                                                                }
                                                                
                                                                var parameters = {
                                                                    patente: "",
                                                                    idBox: box.ID_BOX,
                                                                    date: row.dia,
                                                                    centro: centro,
                                                                    region: region,
                                                                    hora: row.turno
                                                                }
                        
                                                                that.oNavigationHandler.navigate("app00460agendar", "Display", parameters, {customData: returnData});
                                                            }
                                                        }
                                                    }),
                                                    hAlign: sap.ui.core.HorizontalAlign.Center
                                                }));
                                            }
                                            
                                            calendarios.addItem(table);
                                        }
                                        
                                        var panel = sap.ui.getCore().byId(that.createId("panelCalendarios"));
                                        panel.insertContent(calendarios, 0);
                                        
                                        that.set('/verCalendario', true);
                                    }
                                });
                
                                */
            },

            getIconAndColor: function (ocupado) {
                var icon = {};

                switch (ocupado) {
                    case "OC":
                        icon = {
                            symbol: "vehicle-repair",
                            color: "gray"
                        };
                        break;
                    case "OS":
                        icon = {
                            symbol: "alert",
                            color: "gold"
                        };
                        break;
                    default:
                        icon = {
                            symbol: "color-fill",
                            color: "green"
                        };
                        break;
                }

                return icon;
            },

            handleVolver: function () {
                this.set('/verCalendario', false);
            },

            handleReportes: function () {

                this.set("/reportes/selects/tiposReporte", this.tiposReporte);
                this.set("/reportes/selects/criterios", this.criterios);

                this.set("/reportes/filters/i_tipoReporte", undefined);
                this.set("/reportes/filters/i_criterio", undefined);
                this.set("/reportes/filters/i_region", undefined);
                this.set("/reportes/filters/rutCliente", undefined);
                this.set("/reportes/filters/fechaDesde", undefined);
                this.set("/reportes/filters/fechaHasta", undefined);
                this.set("/reportes/filters/i_centro", undefined);
                this.set("/reportes/reservas", []);
                this.set("/reportes/i_reserva", -1);
                this.set("/reportes/reservasCount", 0);

                this.openDialog("Reportes");

                if (!this.tableReservasRowBindSet) {
                    this.tableReservasRowBindSet = true;

                    var oBinding = this.getView().byId("tableReservas").getBinding("rows");
                    oBinding.attachChange(function () {
                        this.set("/reportes/reservasCount", oBinding.getLength());
                    }.bind(this));
                }
            },

            openDialog: function (fragment, result) {
                let model = this.getView().getModel();
                let oView = this.getView();
                for (var i = 0; this['openedDialog' + i] && !this['openedDialog' + i].bIsDestroyed; i++);
                let dialog = 'openedDialog' + i;
                model.setProperty("/" + dialog, result || {});

                this[dialog] = sap.ui.xmlfragment(oView.getId(), "sapui5agendar.sco00calendariorep_html.view." + fragment, this);
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

                utils.view.setBusy(false);
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

            handleReportesCriteriosChange: function () {
                if (this.get('/reportes/filters/i_criterio') === 'centro-uno') {
                    this._loadListadoRegiones("/reportes/selects/regiones", "/reportes/selects/centros");
                }
            },

            handleReportesRegionChange: function () {
                this.set("/reportes/filters/i_centro", undefined);
                this._loadListadoCentros("/reportes/filters/i_region", "/reportes/selects/centros");
            },

            handleSearchReportes: function () {
                //               if (!this._validateReportes()) {
                //                    return;
                //                }

                this._loadReservas();
            },

            _loadReservas: function () {

                this.clearMessages();
                let criterio = this.get("/reportes/filters/i_criterio");

                let filters = {
                    I_Reporte: this.get("/reportes/filters/i_tipoReporte"),
                    I_Fecha_Ini: this.get("/reportes/filters/fechaDesde"),
                    I_Fecha_Fin: this.get("/reportes/filters/fechaHasta"),
                    I_Centro: criterio === 'centro-uno' ? this.get("/reportes/filters/i_centro") : " ",
                    I_Rut_Cli: criterio === 'cliente-uno' ? this.get("/reportes/filters/rutCliente") : ""
                };

                let that = this;

                var reservas = [];

                reservas.push({
                    AVISO: "000070392121",
                    BOX: "B005",
                    CENTRO: "2SA0",
                    CIUDAD: "",
                    DESC_CENTRO: "2SA0 - RaC Rondizzoni",
                    ESTATUS_DES: "Vencida",
                    FECHA: "2022-05-12",
                    HORA: "08:45:00",
                    HRA_REEMPLAZO: 8,
                    MOTIVO: "-MANTENCIÓN PREVENTIVA",
                    NOMBRE: "",
                    NOMBRE_CLIENTE: "DEL RIO Y COMPANIA LTDA",
                    OBSERVACION: "Tiene una vibración en el bolante. 9932514347 Don German",
                    PATENTE: "KLSB75",
                    REEMPLAZO: "Si",
                    RUT_CLIENTE: "79.953.050-3",
                    SHOW_ICON: false,
                    STATUS: "VE",
                    TELF: "",
                    USUARIO: "CENTRALB",
                    VIN: "MPATFS86JJT005152R",
                });

                reservas.push({
                    AVISO: "000070392308",
                    BOX: "B002",
                    CENTRO: "2AN1",
                    CIUDAD: "",
                    DESC_CENTRO: "2AN1 - RaC Antofagasta",
                    ESTATUS_DES: "Vencida",
                    FECHA: "2022-05-05",
                    HORA: "08:30:00",
                    HRA_REEMPLAZO: 0,
                    MOTIVO: "-MANTENCIÓN PREVENTIVA",
                    NOMBRE: "",
                    NOMBRE_CLIENTE: "LIDIA ELIZABETH REYES CHAVEZ, INSTA",
                    OBSERVACION: "Esto es una nota",
                    PATENTE: "BBWW68",
                    REEMPLAZO: "No",
                    RUT_CLIENTE: "76.049.363-5",
                    SHOW_ICON: false,
                    STATUS: "VE",
                    TELF: "",
                    USUARIO: "EXT_VIDES",
                    VIN: "000000000007257489"
                });

                let canEditReserva = true;
                if (that.get("/reportes/filters/i_tipoReporte") == 'HR') {
                    canEditReserva = false;
                }

                that.set('/reportes/canEditReserva', canEditReserva);

                that.set('/reportes/reservas', reservas);

                /*
                /////////////////////////////////////////////////////////////////////////////////////
                //////// Modificacion Namdher Colmenares     ////////////////////////////////////////
                //////// S142859 Ampliar BBDD Agendamiento Salfa Rent ///////////////////////////////
                //////// Fecha: 10-01-2021					/////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////
                utils.httpCall({
                    service: "Zf353R_Datos_Listado_Reservas2",
                    query: filters,
                    success: function(result, status, xhr) {
                        if (result.E_BAPIRETURN.TYPE === "E") {
                            that.addMessage(result.E_BAPIRETURN.MESSAGE, "e", true);
                            return;
                        }
    
                        var reservas = [];
                        for (var i = 0; i < result.GT_LISTADO.length; i++) {
                            var reserva = result.GT_LISTADO[i];
                            reservas.push({
                                VIN: reserva.EQUNR,
                                PATENTE: reserva.LICENSE_NUM,
                                AVISO: reserva.QMNUM,
                                HORA: reserva.HORA_RESER,
                                FECHA: reserva.FECHA_RESER,
                                BOX: reserva.BOX,
                                CENTRO: reserva.CENTRO,
                                DESC_CENTRO: reserva.DES_CENTRO,
                                MOTIVO: reserva.MOTIVO,
                                REEMPLAZO: reserva.REEMPLAZO,
                                HRA_REEMPLAZO: reserva.HRO_REEMPLAZO,
                                OBSERVACION: reserva.OBSERVA,
                                RUT_CLIENTE: reserva.RUT_CLI,
                                NOMBRE_CLIENTE: reserva.RAZON_SOCIAL_CLI,
                                USUARIO: reserva.USUARIO,
                                STATUS: reserva.STATUS,
                                ESTATUS_DES: that._getStatusDesc(reserva.STATUS),
                                SHOW_ICON: that._getStatusShowIcon(reserva.STATUS),
                                NOMBRE: reserva.NOMBRE,
                                TELF: reserva.TELF,
                                CIUDAD: reserva.CIUDAD
                            });
                        }
    
                        let canEditReserva = true;
                        if (that.get("/reportes/filters/i_tipoReporte") == 'HR') {
                            canEditReserva = false;
                        }
                        
                        that.set('/reportes/canEditReserva', canEditReserva);
                
                        that.set('/reportes/reservas', reservas);
                    }
                });

                */
                /////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////
            },

            clearMessages: function () {
                sap.ui.getCore().getMessageManager().removeAllMessages();
            },

            handleExportarReportes: function () {
                var filename = "Listado_Vehiculos";

                //Campos de salida
                var fields = {
                    USUARIO: "Usuario",
                    VIN: "Vin",
                    AVISO: "Aviso",
                    RUT_CLIENTE: "Rut Cliente",
                    NOMBRE_CLIENTE: "Cliente",
                    DESC_CENTRO: "Centro",
                    ESTATUS_DES: "Estatus",
                    MOTIVO: "Motivo",
                    OBSERVACION: "Observación",
                    REEMPLAZO: "Reemplazo",
                    HRA_REEMPLAZO: "Horas Reemplazo",
                    PATENTE: "Patente",
                    FECHA: "Fecha",
                    HORA: "Hora",
                    BOX: "Box",
                    /////////////////////////////////////////////////////////////////////////////////////
                    //////// Modificacion Namdher Colmenares     ////////////////////////////////////////
                    //////// S142859 Ampliar BBDD Agendamiento Salfa Rent ///////////////////////////////
                    //////// Fecha: 10-01-2021					/////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////////////////
                    NOMBRE: "Nombre Contacto",
                    TELF: "Teléfono Contacto",
                    CIUDAD: "Ciudad Contacto"
                    /////////////////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////////////////

                };

                this._generateExcel(fields, filename);
            },

            _generateExcel: function (fieldsMapping, filename) {
                let model = this.getView().getModel();
                let rows = model.getProperty('/reportes/reservas');
                let excelData = rows.map(r => {
                    let excelRow = {};
                    Object.keys(r).forEach(k => {
                        if (fieldsMapping[k])
                            excelRow[fieldsMapping[k]] = r[k]
                    });
                    return excelRow;
                });

                let wb = { SheetNames: [], Sheets: {} };
                wb.Sheets['Reservas'] = XLSX.utils.json_to_sheet(excelData);
                wb.SheetNames.push('Reservas');

                let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'array' });
                let d = new Date();
                saveAs(new Blob([wbout], { type: "application/octet-stream" }), filename + utils.dateToFormat('yyyyMMdd') + "_" + d.toLocaleTimeString() + ".xlsx");
            },

            handleAnularAgenda: function () {
                let that = this;

                let i = this.get('/reportes/i_reserva');

                let reporte = this.get('/reportes/reservas')[i];

                let reportes = this.get('/reportes/reservas');

                reportes.splice(i,1); // just 1 entry to remove

                this.set('/reportes/reservas',reportes)
/*
                var oFilters = {
                    I_ACCION: "CL",
                    I_QMNUM: reporte.AVISO,
                    I_USUARIO: utils.getUser()
                };

                utils.httpCall({
                    service: "Z353W_Cerrar_Aviso_De",
                    query: oFilters,
                    type: "post",
                    success: function (result, status, xhr) {
                        if (result.E_RETURN.TYPE === "E") {
                            that.addMessage(result.E_RETURN.MESSAGE, "e", true);
                            return;
                        }

                        that._loadReservas();
                    }
                });

                */
            }

        });
    });
