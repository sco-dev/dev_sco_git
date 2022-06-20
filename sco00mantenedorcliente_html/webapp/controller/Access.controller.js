// @ts-nocheck
sap.ui.define([
    "sapui5agendar/sco00mantenedorcliente_html/controller/Master.controller",
    "sapui5agendar/sco00mantenedorcliente_html/utils/utils",
    "sapui5agendar/sco00mantenedorcliente_html/model/models",
    "sapui5agendar/sco00mantenedorcliente_html/utils/validator",
], function (Controller, utils, models, Validator) {
    "use strict";

    return Controller.extend("sapui5agendar.sco00mantenedorcliente_html.controller.Access", {

        _opcionesLoaded: null,

        _cargarCombosIniciales: function () {
            let that = this;
            this._opcionesLoaded = $.Deferred();
            let model = this.getView().getModel();
            let sociedad = model.getProperty('/Sociedad');

            let oFilters = {
                LAND1: '',
                REGIO: '',
                CITYC: '',
                COUNC: ''
            };

            //si no se setea, la rfc lo pone en 1000
            if (sociedad != null && sociedad == '') {
                oFilters.BUKRS = sociedad;
            }

            let T_TVKOT = [];

            T_TVKOT.push({
                MANDT: "300",
                SPRAS: "S",
                VKORG: "1003",
                VTEXT: "Divespect",
            });

            T_TVKOT.push({
                MANDT: "300",
                SPRAS: "S",
                VKORG: "3000",
                VTEXT: "Servicio y Arriendo",
            });


            T_TVKOT.push({
                MANDT: "300",
                SPRAS: "S",
                VKORG: "1003",
                VTEXT: "Divespect",
            });

            T_TVKOT.push({
                MANDT: "300",
                SPRAS: "S",
                VKORG: "4000",
                VTEXT: "Comercial"
            });

            T_TVKOT.push({
                MANDT: "300",
                SPRAS: "S",
                VKORG: "5000",
                VTEXT: "Inversiones"
            });

            T_TVKOT.push({
                MANDT: "300",
                SPRAS: "S",
                VKORG: "6000",
                VTEXT: "Invers. Automotrices"
            });


            let T_TVTWT = [];

            T_TVTWT.push({
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Distribuidores",
                VTWEG: "DI",
            });

            T_TVTWT.push({
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Venta Demos",
                VTWEG: "DM"
            });

            T_TVTWT.push({
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Servicio",
                VTWEG: "SE",
            });


            T_TVTWT.push({
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Uso interno/traslado",
                VTWEG: "VD"
            });

            let T_TSPAT = [];

            T_TSPAT.push({
                MANDT: "300",
                SPART: "R2",
                SPRAS: "S",
                VTEXT: "Lubricantes",
            });

            T_TSPAT.push({
                MANDT: "300",
                SPART: "R3",
                SPRAS: "S",
                VTEXT: "Art. Publicitarios"
            });


            T_TSPAT.push({
                MANDT: "300",
                SPART: "R4",
                SPRAS: "S",
                VTEXT: "Genéricos",
            });

            T_TSPAT.push({
                MANDT: "300",
                SPART: "S0",
                SPRAS: "S",
                VTEXT: "Servicios Adminis"
            });


            T_TSPAT.push({
                MANDT: "300",
                SPART: "S1",
                SPRAS: "S",
                VTEXT: "Grles y Materiales",
            });

            T_TSPAT.push({
                MANDT: "300",
                SPART: "T0",
                SPRAS: "S",
                VTEXT: "SmartyCar"
            });

            model.setProperty('/Opciones/OrganizacionesVenta', T_TVKOT);
            model.setProperty('/Opciones/CanalesDistribucion', T_TVTWT);
            model.setProperty('/Opciones/Sectores', T_TSPAT);

            this._opcionesLoaded.resolve();

            /*
                        utils.httpCall({
                            service: "ZNW_DICCIO_CLIENTES",
                            query: oFilters,
                            type: "post",
                            success: function (result, status, xhr) {
                                model.setProperty('/Opciones/OrganizacionesVenta', result.T_TVKOT);
                                model.setProperty('/Opciones/CanalesDistribucion', result.T_TVTWT);
                                model.setProperty('/Opciones/Sectores', result.T_TSPAT);
                                that._opcionesLoaded.resolve();
                            }
                        });
            */

            oFilters = {
                KUNNR: this.get('/filters/Cliente')
            };

            let T_AREAVENTA = [];

            T_AREAVENTA.push({
                KUNNR: "10173901-5",
                NAME1: "",
                SPART: "R2",
                SPARTT: "Servicio Pesado",
                VKORG: "1003",
                VKORGT: "Organizacion 1",
                VTWEG: "DI",
                VTWEGT: "Uso interno/traslado"
            });
            /*
                        
                        T_AREAVENTA.push({
                            KUNNR: "10173901-5",
                            NAME1: "",
                            SPART: "P0",
                            SPARTT: "Servicio Pesado",
                            VKORG: "1000",
                            VKORGT: "Organización 1",
                            VTWEG: "VS",
                            VTWEGT: "Venta Showroom"
                        });
            
                        T_AREAVENTA.push({
                            KUNNR: "10173901-5",
                            NAME1: "",
                            SPART: "P0",
                            SPARTT: "Servicio Pesado",
                            VKORG: "1000",
                            VKORGT: "Organización 1",
                            VTWEG: "VT",
                            VTWEGT: "Venta Terreno"
                        });
            
                        T_AREAVENTA.push({
                            KUNNR: "10173901-5",
                            NAME1: "",
                            SPART: "C0",
                            SPARTT: "Camiones Nuevos",
                            VKORG: "6000",
                            VKORGT: "Organización 2",
                            VTWEG: "VS",
                            VTWEGT: "Venta Showroom"
            
                        });
            
                        T_AREAVENTA.push({
                            KUNNR: "10173901-5",
                            NAME1: "",
                            SPART: "E0",
                            SPARTT: "Rent a Car Arriendo",
                            VKORG: "6000",
                            VKORGT: "Organización 3",
                            VTWEG: "VS",
                            VTWEGT: "Venta Showroom"
            
                        });
            
                        */

            model.setProperty('/Opciones/AreasVenta', T_AREAVENTA);


            /*
                        utils.httpCall({
                            service: "ZNW_CLIENTES_GET_AREA_VENTAS",
                            query: oFilters,
                            type: "post",
                            success: function (result, status, xhr) {
                                model.setProperty('/Opciones/AreasVenta', result.T_AREAVENTA);
                            }
                        });
            
                        */

        },

        handleAreaCliente: function (evt) {
            let oModel = this.getView().getModel();

            if (this.multiSelect) {
                this.multiSelect.destroy();
            }
            this.multiSelect = new sap.m.Dialog({
                contentWidth: '768px',
                title: 'Area de Ventas del Cliente',
                content: new sap.ui.table.Table({
                    rows: '{/Opciones/AreasVenta}',
                    selectedIndex: '{/Opciones/i_AreaVenta}',
                    visibleRowCount: 5,
                    noData: 'Sin Datos.',
                    selectionMode: "Single",
                    selectionBehavior: "Row",
                    columns: [
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: "OrgVt"
                            }),
                            template: new sap.m.Text({
                                text: '{VKORG}',
                                wrapping: false
                            }),
                            width: '4rem',
                            autoResizable: true
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: "Denominación"
                            }),
                            template: new sap.m.Text({
                                text: '{VKORGT}',
                                wrapping: false
                            }),
                            autoResizable: true
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: "CDis"
                            }),
                            template: new sap.m.Text({
                                text: '{VTWEG}',
                                wrapping: false
                            }),
                            width: '4rem',
                            autoResizable: true
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: "Denominación"
                            }),
                            template: new sap.m.Text({
                                text: '{VTWEGT}',
                                wrapping: false
                            }),
                            autoResizable: true
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: "Se"
                            }),
                            template: new sap.m.Text({
                                text: '{SPART}',
                                wrapping: false
                            }),
                            width: '4rem',
                            autoResizable: true
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: "Denominación"
                            }),
                            template: new sap.m.Text({
                                text: '{SPARTT}',
                                wrapping: false
                            }),
                            autoResizable: true
                        })
                    ],
                }).setModel(oModel),
                beginButton: new sap.m.Button({
                    text: 'Seleccionar',
                    icon: 'sap-icon://accept',
                    type: sap.m.ButtonType.Emphasized,
                    press: () => {
                        this.handleAreaSet();
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

        handleAreaSet: function (evt) {
            var oModel = this.getView().getModel();
            let index = oModel.getProperty('/Opciones/i_AreaVenta');
            if (parseInt(index) >= 0) {
                let clientes = oModel.getProperty('/Opciones/AreasVenta');
                let cliente = clientes[index];
                oModel.setProperty('/filters/i_OrganizacionVenta', cliente.VKORG);
                oModel.setProperty("/filters/i_CanalDistribucion", cliente.VTWEG);
                oModel.setProperty("/filters/i_Sector", cliente.SPART);
                this.multiSelect.close();
            }
        },

        handleLimpiar() {
            this.set('/filters/i_Sector', '');
            this.set('/filters/i_OrganizacionVenta', '');
            this.set('/filters/i_CanalDistribucion', '');
        },

        handleContinue: function () {
            let that = this;
            let oFilters = {
                BUKRS: this.get('/filters/Sociedad'),
                KUNNR: this.get('/filters/Cliente'),
                SPART: this.get('/filters/i_Sector'),
                VKORG: this.get('/filters/i_OrganizacionVenta'),
                VTWEG: this.get('/filters/i_CanalDistribucion')
            };

            sap.ui.getCore().getMessageManager().removeAllMessages();

            var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
            
            localStorage['filters'] = JSON.stringify({
                Cliente: that.get('/filters/Cliente'),
                Sociedad: that.get('/filters/Sociedad'),
                OrganizacionVenta: that.get('/filters/i_OrganizacionVenta'),
                CanalDistribucion: that.get('/filters/i_CanalDistribucion'),
                Sector: that.get('/filters/i_Sector')
            });

            oRouter.navTo("show");
            /*
                        utils.httpCall({
                            service: "ZNW_CLIENTES_GETDETAIL1",
                            query: oFilters,
                            type: "post",
                            success: function (result, status, xhr) {
                                if (result.T_RETURN.filter(function (r) {
                                    return r.TYPE == 'E'
                                }).length > 0) {
                                    result.T_RETURN.forEach(m => {
                                        that.addMessage(m.MESSAGE, m.TYPE);
                                    });
                                } else {
                                    var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                                    localStorage['filters'] = JSON.stringify({
                                        Cliente: that.get('/filters/Cliente'),
                                        Sociedad: that.get('/filters/Sociedad'),
                                        OrganizacionVenta: that.get('/filters/i_OrganizacionVenta'),
                                        CanalDistribucion: that.get('/filters/i_CanalDistribucion'),
                                        Sector: that.get('/filters/i_Sector')
                                    });
                                    oRouter.navTo("show");
                                }
                            }
                        });
            
                        */
        },

        _basicInit: function () {
            let model = models.createLocalModel();
            let view = this.getView();

            this.model = model;

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

            oRouter.getRoute("access").attachMatched(this._onRouteMatched, this);

        },

        _onRouteMatched: function (oEvent) {
            var rut = localStorage['rut'];
            var fromPage = localStorage['fromPage'];

            Object.keys(localStorage).forEach(function (key) {
                if (key == 'rut' || key == 'fromPage') {
                    localStorage.removeItem(key);
                }
            });

            if (fromPage != 'show') {
                this.set('/filters', {
                    Cliente: '',
                    Sociedad: '',
                    i_OrganizacionVenta: '',
                    i_CanalDistribucion: '',
                    i_Sector: ''
                });

                this.set('/Opciones', {
                    OrganizacionesVenta: [],
                    CanalesDistribucion: [],
                    Sectores: [],
                    AreasVenta: [],
                    i_AreaVenta: -1
                });

                if (typeof rut === 'undefined') {
                    this.handleBack();
                } else {
                    this.set('/filters/Cliente', rut);
                    this._cargarCombosIniciales();
                }
            }
        },

    });

});