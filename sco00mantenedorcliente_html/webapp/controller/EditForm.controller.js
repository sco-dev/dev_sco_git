// @ts-nocheck
sap.ui.define([
    "sapui5agendar/sco00mantenedorcliente_html/controller/Master.controller",
    "sapui5agendar/sco00mantenedorcliente_html/utils/utils",
    "sapui5agendar/sco00mantenedorcliente_html/model/models",
    "sapui5agendar/sco00mantenedorcliente_html/utils/validator",
], function (Controller, utils, models, Validator) {
    "use strict";

    return Controller.extend("sapui5agendar.sco00mantenedorcliente_html.controller.EditForm", {

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

            let T_T077X = [];


            let T_TSAD3T = [];
            let T_T005T = [];
            let T_T005U = [];

            let T_T005F = [];
            let T_T005H = [];
            let T_T151T = [];
            let T_TVKDT = [];
            let T_T189T = [];


            T_T077X.push({
                KTOKD: '01',
                TXT30: 'Grupo 1'
            });

            T_T077X.push({
                KTOKD: '02',
                TXT30: 'Grupo 2'
            });

            T_T077X.push({
                KTOKD: '03',
                TXT30: 'Grupo 3'
            });

            T_T077X.push({
                KTOKD: '04',
                TXT30: 'Grupo 4'
            });

            
            T_TSAD3T.push({
                TITLE: 'Tratamiento 1',
                TITLE_MEDI: 'Tratamiento 1'
            });


            T_TSAD3T.push({
                TITLE: 'Tratamiento 2',
                TITLE_MEDI: 'Tratamiento 2'
            });

            T_TSAD3T.push({
                TITLE: 'Tratamiento 3',
                TITLE_MEDI: 'Tratamiento 3'
            });

            T_TSAD3T.push({
                TITLE: 'Tratamiento 4',
                TITLE_MEDI: 'Tratamiento 4'
            });

            T_T005T.push({
                LAND1: 'Pais 1',
                LANDX50: 'Pais 1'
            });

            T_T005T.push({
                LAND1: 'Pais 2',
                LANDX50: 'Pais 2'
            });

            T_T005T.push({
                LAND1: 'Pais 3',
                LANDX50: 'Pais 3'
            });

            T_T005T.push({
                LAND1: 'Pais 4',
                LANDX50: 'Pais 4'
            });

            T_T005U.push({
                BLAND: 'Region 1',
                BEZEI: 'Region 1'
            });

            T_T005U.push({
                BLAND: 'Region 2',
                BEZEI: 'Region 2'
            });


            T_T005U.push({
                BLAND: 'Region 3',
                BEZEI: 'Region 3'
            });

            T_T005U.push({
                BLAND: 'Region 4',
                BEZEI: 'Region 4'
            });

            T_T005F.push({
                COUNC: 'Ciudad 1',
                BEZEI: 'Ciudad 1'
            });

            T_T005F.push({
                COUNC: 'Ciudad 2',
                BEZEI: 'Ciudad 2'
            });

            T_T005F.push({
                COUNC: 'Ciudad 3',
                BEZEI: 'Ciudad 3'
            });

            T_T005F.push({
                COUNC: 'Ciudad 4',
                BEZEI: 'Ciudad 4'
            });

            T_T005H.push({
                CITYC: 'Comuna 1',
                BEZEI: 'Comuna 1'
            });


            T_T005H.push({
                CITYC: 'Comuna 2',
                BEZEI: 'Comuna 2'
            });

            T_T005H.push({
                CITYC: 'Comuna 3',
                BEZEI: 'Comuna 3'
            });

            T_T005H.push({
                CITYC: 'Comuna 4',
                BEZEI: 'Comuna 4'
            });

            T_T151T.push({
                KDGRP: '01',
                KTEXT: 'Grupo 01'
            });

            T_T151T.push({
                KDGRP: '02',
                KTEXT: 'Grupo 02'
            });

            T_T151T.push({
                KDGRP: '03',
                KTEXT: 'Grupo 03'
            });

            T_T151T.push({
                KDGRP: '04',
                KTEXT: 'Grupo 04'
            });

            T_TVKDT.push({
                KALKS: '01',
                VTEXT: 'Esquema 01'
            });

            T_TVKDT.push({
                KALKS: '02',
                VTEXT: 'Esquema 02'
            });

            T_TVKDT.push({
                KALKS: '03',
                VTEXT: 'Esquema 03'
            });

            T_TVKDT.push({
                KALKS: '04',
                VTEXT: 'Esquema 04'
            });

            T_T189T.push({
                PLTYP: '01',
                PTEXT: 'Lista 01'
            });


            T_T189T.push({
                PLTYP: '02',
                PTEXT: 'Lista 02'
            });

            T_T189T.push({
                PLTYP: '03',
                PTEXT: 'Lista 03'
            });

            T_T189T.push({
                PLTYP: '04',
                PTEXT: 'Lista 04'
            });


            model.setProperty('/Opciones/GruposCuentas',T_T077X);
            model.setProperty('/Opciones/Tratamientos',T_TSAD3T);
            model.setProperty('/Opciones/Paises',T_T005T);
            model.setProperty('/Opciones/Regiones',T_T005U);
            model.setProperty('/Opciones/Ciudades',T_T005F);
            model.setProperty('/Opciones/Comunas',T_T005H);
            model.setProperty('/Opciones/GruposCliente',T_T151T);
            model.setProperty('/Opciones/EsquemasCliente',T_TVKDT);
            model.setProperty('/Opciones/ListasPrecios',T_T189T);
            /*
                        utils.httpCall({
                            service : "ZNW_DICCIO_CLIENTES",
                            query : oFilters,
                            type : "post",
                            success : function (result, status, xhr) {
                                model.setProperty('/Opciones/GruposCuentas',result.T_T077X);
                                model.setProperty('/Opciones/Tratamientos',result.T_TSAD3T);
                                model.setProperty('/Opciones/Paises',result.T_T005T);
                                model.setProperty('/Opciones/Regiones',result.T_T005U);
                                model.setProperty('/Opciones/Ciudades',result.T_T005F);
                                model.setProperty('/Opciones/Comunas',result.T_T005H);
                                model.setProperty('/Opciones/GruposCliente',result.T_T151T);
                                model.setProperty('/Opciones/EsquemasCliente',result.T_TVKDT);
                                model.setProperty('/Opciones/ListasPrecios',result.T_T189T);
                                that._opcionesLoaded.resolve();
                            }
                        });
            
                        */
        },

        _cargarCombos(modo) {
            let model = this.getView().getModel();
            let sociedad = model.getProperty('/Sociedad');
            let pais = model.getProperty('/DatosGenerales/i_Pais');
            let region = model.getProperty('/DatosGenerales/i_Region');

            let oFilters = {
                LAND1: pais,
                REGIO: region,
                CITYC: '',
                COUNC: ''
            };

            //si no se setea, la rfc lo pone en 1000
            if (sociedad != null && sociedad == '') {
                oFilters.BUKRS = sociedad;
            }

            /*
                        utils.httpCall({
                            service: "ZNW_DICCIO_CLIENTES",
                            query: oFilters,
                            type: "post",
                            success: function (result, status, xhr) {
                                switch (modo) {
                                    case 'PAIS':
                                        model.setProperty('/Opciones/Regiones', result.T_T005U);
                                        model.setProperty('/Opciones/Ciudades', result.T_T005F);
                                        model.setProperty('/Opciones/Comunas', result.T_T005H);
                                        break;
                                    case 'REGION':
                                        model.setProperty('/Opciones/Ciudades', result.T_T005F);
                                        model.setProperty('/Opciones/Comunas', result.T_T005H);
                                }
                            }
                        });
            
                        */
        },

        toUpperCase: function (evt) {
            let source = evt.getSource();
            source.setValue(source.getValue().toUpperCase());
        },



        _fragmentInit: function () {
            let model = models.createLocalModel();
            let view = this.getView();

            this.model = model;

            this.set('/EditEnabled', true);

            model.setProperty('/Opciones', {
                GruposCuentas: [],
                Tratamientos: [],
                Paises: [],
                Regiones: [],
                Ciudades: [],
                Comunas: [],
                GruposCliente: [],
                EsquemasCliente: [],
                ListasPrecios: []
            });
            model.setProperty('/DatosGenerales', {
                Rut: '',
                Nombres: '',
                Apellidos: '',
                i_GrupoCuenta: '',
                Giro: '',
                i_Tratamiento: '',
                Direccion: '',
                i_Pais: '',
                i_Region: '',
                i_Ciudad: '',
                i_Comuna: '',
                Numero: '',
                Telefono: '',
                Anexo: '',
                TelefonoMovil: '',
                Email: '',
                Comentarios: '',
                ReadonlyGrupoCliente: false
            });

            view.setModel(model);

            utils.view = view;
            utils.controller = this;

            this._cargarCombosIniciales();

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

        handlePaisChange: function (evt) {
            if (typeof evt != 'undefined') {
                this.set('/DatosGenerales/i_Region', '');
                this.set('/DatosGenerales/i_Ciudad', '');
                this.set('/DatosGenerales/i_Comuna', '');
                this._cargarCombos('PAIS');
            }
        },
        handleRegionChange: function (evt) {
            if (typeof evt != 'undefined') {
                this.set('/DatosGenerales/i_Ciudad', '');
                this.set('/DatosGenerales/i_Comuna', '');
                this._cargarCombos('REGION');
            }
        }

    });

});