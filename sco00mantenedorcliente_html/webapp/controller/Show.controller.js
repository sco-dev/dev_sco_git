// @ts-nocheck
sap.ui.define([
    "sapui5agendar/sco00mantenedorcliente_html/controller/Master.controller",
    "sapui5agendar/sco00mantenedorcliente_html/utils/utils",
    "sapui5agendar/sco00mantenedorcliente_html/model/models",
    "sapui5agendar/sco00mantenedorcliente_html/utils/validator",
], function (Controller, utils, models, Validator) {
    "use strict";

    return Controller.extend("sapui5agendar.sco00mantenedorcliente_html.controller.Show", {

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

            let monedas = [];

            monedas.push({
                CODIGO: "ADP",
                DESCRIPCION: " Peseta andorrana"
            });

            monedas.push({
                CODIGO: "AED",
                DESCRIPCION: " Dirham Emiratos Árabes Unidos"
            });

            monedas.push({
                CODIGO: "CAD",
                DESCRIPCION: " Dólar canadiense"
            });


            that.set('/Descripciones/Moneda', monedas);

            /*
                        utils.httpCall({
                            service: 'RFC_READ_TABLE',
                            type: 'POST',
                            query: {
                                QUERY_TABLE: 'TCURT',
                                FIELDS: [
                                    { FIELDNAME: 'WAERS' },
                                    { FIELDNAME: 'LTEXT' }
                                ],
                                OPTIONS: [
                                    { TEXT: 'SPRAS EQ \'S\'' }
                                ]
                            },
                            success: (resp) => {
                                let monedas = resp.DATA.map(m => {
                                    let parts = m.WA.split(' ');
                                    return { CODIGO: parts.shift(), DESCRIPCION: parts.join(' ') };
                                });
                                that.set('/Descripciones/Moneda', monedas);
                            }
                        });
            
                        */

            let T_T002T = [];
            T_T002T.push({
                SPRAS: "S",
                SPRSL: "0",
                SPTXT: "Serbio"
            });

            T_T002T.push({
                SPRAS: "S",
                SPRSL: "1",
                SPTXT: "Chino"
            });



            let T_T005T = [];

            T_T005T.push({
                LAND1: "AD",
                LANDX: "Andorra",
                LANDX50: "Andorra",
                MANDT: "300",
                NATIO: "andorrana",
                NATIO50: "andorrana",
                PRQ_SPREGT: "",
                SPRAS: "S"
            });

            T_T005T.push({
                LAND1: "AE",
                LANDX: "E.A.U.",
                LANDX50: "Emiratos Árabes Unidos",
                MANDT: "300",
                NATIO: "de EAU",
                NATIO50: "de los Emiratos Árabes Unidos",
                PRQ_SPREGT: "",
                SPRAS: "S"
            });
            let T_T005U = [];

            T_T005U.push({
                BEZEI: "I - Tarapacá",
                BLAND: "01",
                LAND1: "CL",
                MANDT: "300",
                SPRAS: "S"
            });

            T_T005U.push({
                BEZEI: "II - Antofagasta",
                BLAND: "02",
                LAND1: "CL",
                MANDT: "300",
                SPRAS: "S"
            });

            let T_T880 = [];

            T_T880.push({
                CITY: "Walldorf",
                CNTRY: "DE",
                CURR: "EUR",
                GLSIP: "",
                INDPO: "",
                LANGU: "D",
                LCCOMP: "",
                MANDT: "300",
                MCLNT: "000",
                MCOMP: "0001",
                MODCP: "",
                NAME1: "Gesellschaft G00000",
                NAME2: "",
                POBOX: "",
                PSTLC: "69190",
                RCOMP: "000001",
                RESTA: "",
                RFORM: "",
                STRET: "Neurottstrasse 16",
                STRT2: "",
                ZWEIG: ""
            });

            T_T880.push({
                CITY: "",
                CNTRY: "CL",
                CURR: "CLP",
                GLSIP: "",
                INDPO: "",
                LANGU: "S",
                LCCOMP: "",
                MANDT: "300",
                MCLNT: "000",
                MCOMP: "",
                MODCP: "",
                NAME1: "Salinas y Fabres",
                NAME2: "",
                POBOX: "",
                PSTLC: "",
                RCOMP: "SALINAS",
                RESTA: "",
                RFORM: "",
                STRET: "",
                STRT2: "",
                ZWEIG: "",
            });


            let T_T005F = [];

            T_T005F.push({
                BEZEI: "Iquique",
                COUNC: "3",
                LAND1: "CL",
                MANDT: "300",
                REGIO: "01",
                SPRAS: "S"
            });

            T_T005F.push({
                BEZEI: "Tocopilla",
                COUNC: "4",
                LAND1: "CL",
                MANDT: "300",
                REGIO: "02",
                SPRAS: "S"
            });

            let T_T005H = [];

            T_T005H.push({
                BEZEI: "Cobquecura",
                CITYC: "161",
                LAND1: "CL",
                MANDT: "300",
                REGIO: "08",
                SPRAS: "S"
            });

            T_T005H.push({
                BEZEI: "Quirihue",
                CITYC: "162",
                LAND1: "CL",
                MANDT: "300",
                REGIO: "08",
                SPRAS: "S"
            });

            let T_TKUKT = [];

            T_TKUKT.push({
                KUKLA: "00",
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Ul 12 M No act en UN"
            });

            T_TKUKT.push({
                KUKLA: "01",
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Ul 12 M act en 1 UN"
            });

            let T_TBRCT = [];

            T_TBRCT.push({
                BRACO: "0081",
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "MINERIA"
            });

            T_TBRCT.push({
                BRACO: "0100",
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "ARTIC. DE SEGURIDAD"
            });
            let T_TVGFT = [];

            T_TVGFT.push({
                GFORM: "01",
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Factura importación"
            });

            T_TVGFT.push({
                GFORM: "02",
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Clientes fuera país"
            });
            let T_TSABT = [];

            T_TSABT.push({
                ABTNR: "0001",
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Dirección"
            });

            T_TSABT.push({
                ABTNR: "0002",
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Compras"
            });

            let T_TPFKT = [];

            T_TPFKT.push({
                MANDT: "300",
                PAFKT: "01",
                SPRAS: "S",
                VTEXT: "Junta directiva"
            });

            T_TPFKT.push({
                MANDT: "300",
                PAFKT: "03",
                SPRAS: "S",
                VTEXT: "Ejecutivo de ventas"
            });

            let T_T171T = [];

            T_T171T.push({
                BZIRK: "CENTRE",
                BZTXT: "Zona centro",
                MANDT: "300",
                SPRAS: "S"
            });

            T_T171T.push({
                BZIRK: "NORTH",
                BZTXT: "Zona norte",
                MANDT: "300",
                SPRAS: "S"
            });
            let T_TVKBT = [];

            T_TVKBT.push({
                BEZEI: "Antofagasta C.Matriz",
                MANDT: "300",
                SPRAS: "S",
                VKBUR: "AN01"
            });

            T_TVKBT.push({
                BEZEI: "Antofagasta Mall",
                MANDT: "300",
                SPRAS: "S",
                VKBUR: "AN03"
            });
            let T_T151T = [];

            T_T151T.push({
                KDGRP: "01",
                KTEXT: "COMMERCIAL-JD",
                MANDT: "300",
                SPRAS: "S"
            });

            T_T151T.push({
                KDGRP: "02",
                KTEXT: "FEDERAL GOVERNMEN-JD",
                MANDT: "300",
                SPRAS: "S"
            });

            let T_TVKDT = [];

            T_TVKDT.push({
                KALKS: "1",
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Estándar"
            });

            T_TVKDT.push({
                KALKS: "2",
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Esq. Zofri Iquique"
            });
            let T_T189T = [];

            T_T189T.push({
                MANDT: "300",
                PLTYP: "01",
                PTEXT: "Distribuidor",
                SPRAS: "S"
            });

            T_T189T.push({
                MANDT: "300",
                PLTYP: "02",
                PTEXT: "Publico",
                SPRAS: "S"
            });
            let T_TVSDT = [];

            T_TVSDT.push({
                BEZEI20: "Reporte LIS",
                MANDT: "300",
                SPRAS: "S",
                STGKU: "1"
            });

            let T_TPRIT = [];

            T_TPRIT.push({
                BEZEI: "Retira client inmedi",
                LPRIO: "01",
                MANDT: "300",
                SPRAS: "S",
            });

            T_TPRIT.push({
                BEZEI: "Retira client desf",
                LPRIO: "02",
                MANDT: "300",
                SPRAS: "S"
            });
            let T_TVSBT = [];

            T_TVSBT.push({
                MANDT: "300",
                SPRAS: "S",
                VSBED: "01",
                VTEXT: "Estándar"
            });

            T_TVSBT.push({
                MANDT: "300",
                SPRAS: "S",
                VSBED: "02",
                VTEXT: "Recogida"
            });
            let T_TFACT = [];

            T_TFACT.push({
                IDENT: "US",
                LTEXT: "EE.UU.",
                SPRAS: "S"
            });

            T_TFACT.push({
                IDENT: "VE",
                LTEXT: "Venezuela",
                SPRAS: "S"
            });
            let T_TFPLB = [];

            T_TFPLB.push({
                FPART: "01",
                FPBEZ: "Facturación parcial",
                MANDT: "300",
                SPRAS: "S"
            });

            T_TFPLB.push({
                FPART: "02",
                FPBEZ: "periódic",
                MANDT: "300",
                SPRAS: "S"
            });
            let T_T014T = [];

            T_T014T.push({
                KKBER: "CR01",
                KKBTX: "No Seriados",
                MANDT: "300",
                SPRAS: "S"
            });

            T_T014T.push({
                KKBER: "CR02",
                KKBTX: "Seriados",
                MANDT: "300",
                SPRAS: "S"
            });
            let T_T691Q = [];

            T_T691Q.push({
                BEZEI: "Carta de crédito",
                KABSS: "0001",
                MANDT: "300",
                SPRAS: "S"
            });

            T_T691Q.push({
                BEZEI: "Tarjetas de pago",
                KABSS: "0002",
                MANDT: "300",
                SPRAS: "S"
            });
            let T_TVKTT = [];


            T_TVKTT.push({
                KTGRD: "01",
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Ingresos ventas"
            });

            T_TVKTT.push({
                KTGRD: "02",
                MANDT: "300",
                SPRAS: "S",
                VTEXT: "Ingresos  intercompa"
            });
            let T_TZUNT = [];

            T_TZUNT.push({
                SPRAS: "S",
                TTEXT: "Allocation number",
                ZUAWA: "000"
            });

            T_TZUNT.push({
                SPRAS: "S",
                TTEXT: "Posting date",
                ZUAWA: "001"
            });


            let T_T035T = [];

            T_T035T.push({
                GRUPP: "D10",
                MANDT: "300",
                SPRAS: "S",
                TEXTK: "Waratah",
                TEXTL: "WARATAH"
            });

            let T_T052U = [];

            T_T052U.push({
                MANDT: "300",
                SPRAS: "S",
                TEXT1: "LC a la vista (contado recibo BL)",
                ZTAGG: "00",
                ZTERM: "B000"
            });


            T_T052U.push({
                MANDT: "300",
                SPRAS: "S",
                TEXT1: "30 Días la fecha de BL",
                ZTAGG: "00",
                ZTERM: "B030"
            });


            let T_T008T = [];

            T_T008T.push({
                MANDT: "300",
                SPRAS: "S",
                TEXTL: "Autorizado el pago",
                ZAHLS: ""
            });

            T_T008T.push({
                MANDT: "300",
                SPRAS: "S",
                TEXTL: "Omitir cuenta",
                ZAHLS: "*"
            });
            let T_T012T = [];

            T_T012T.push({
                BUKRS: "1000",
                HBKID: "ABNP",
                HKTID: "1",
                MANDT: "300",
                SPRAS: "S",
                TEXT1: "ABN Amro Bank 03-00110-5"
            });

            T_T012T.push({
                BUKRS: "1000",
                HBKID: "BBVA",
                HKTID: "1",
                MANDT: "300",
                SPRAS: "S",
                TEXT1: "BBVA 42-0100001623"
            });
            let T_T053W = [];

            T_T053W.push({
                MANDT: "300",
                SPRAS: "S",
                VRSDG: "001",
                VRSTX: "Versión 001"
            });


            let T_T047T = [];

            T_T047T.push({
                MANDT: "300",
                SPRAS: "S",
                SREGL: "001",
                TXT20: "Regla de selecc. 001",
                TXT40: "Regla de selección 001"
            });

            T_T047T.push({
                MANDT: "300",
                SPRAS: "S",
                SREGL: "002",
                TXT20: "Regla de selecc. 002",
                TXT40: "Regla de selección 002"
            });

            let T_T001S = [];

            T_T001S.push({
                MAHNA: "SAL1",
                MANDT: "300",
                SPRAS: "S",
                TEXTM: "Procedimiento de reclamación Salfa, 3  niveles"
            });

            let T_T040T = [];

            T_T040T.push({
                MANDT: "300",
                MANSP: "",
                SPRAS: "S",
                TEXT1: "libre para reclamación"
            });

            T_T040T.push({
                MANDT: "300",
                MANSP: "*",
                SPRAS: "S",
                TEXT1: "Interfase de reclamación"
            });
            let T_T047S = [];

            T_T047S.push({
                MANDT: "300",
                MGRUP: "01",
                SPRAS: "S",
                TEXT1: "Número de contrato/Clase de contrato"
            });

            model.setProperty('/Opciones/Idiomas', T_T002T);


            that.set('/Descripciones/Pais', that._mapDescripciones(T_T005T, 'LAND1', 'LANDX50'));
            that.set('/Descripciones/Region', that._mapDescripciones(T_T005U, 'BLAND', 'BEZEI'));
            that.set('/Descripciones/SociedadGLAsociada', that._mapDescripciones(T_T880, 'RCOMP', 'NAME1'));
      //      that.set('/Descripciones/Ramo', that._mapDescripciones(T_T016T, 'BRSCH', 'BRTXT'));
            that.set('/Descripciones/CodigoCondado', that._mapDescripciones(T_T005F, 'COUNC', 'BEZEI'));
            that.set('/Descripciones/CodigoMunicipal', that._mapDescripciones(T_T005H, 'CITYC', 'BEZEI'));
            that.set('/Descripciones/ClaseCliente', that._mapDescripciones(T_TKUKT, 'KUKLA', 'VTEXT'));
            that.set('/Descripciones/CodigoRamo1', that._mapDescripciones(T_TBRCT, 'BRACO', 'VTEXT'));
            //that.set('/Descripciones/Moneda',that._mapDescripciones(result.,'',''));
            that.set('/Descripciones/StatusJuridico', that._mapDescripciones(T_TVGFT, 'GFORM', 'VTEXT'));
            that.set('/Descripciones/Departamento', that._mapDescripciones(T_TSABT, 'ABTNR', 'VTEXT'));
            that.set('/Descripciones/Funcion', that._mapDescripciones(T_TPFKT, 'PAFKT', 'VTEXT'));
            that.set('/Descripciones/ZonaVentas', that._mapDescripciones(T_T171T, 'BZIRK', 'BZTXT'));
            that.set('/Descripciones/OficinaVentas', that._mapDescripciones(T_TVKBT, 'VKBUR', 'BEZEI'));
            that.set('/Descripciones/GrupoClientes', that._mapDescripciones(T_T151T, 'KDGRP', 'KTEXT'));
            that.set('/Descripciones/EsquemaCliente', that._mapDescripciones(T_TVKDT, 'KALKS', 'VTEXT'));
            that.set('/Descripciones/ListaPrecios', that._mapDescripciones(T_T189T, 'PLTYP', 'PTEXT'));
            that.set('/Descripciones/GrupoEstadClientes', that._mapDescripciones(T_TVSDT, 'STGKU', 'BEZEI20'));
            that.set('/Descripciones/PrioridadEntrega', that._mapDescripciones(T_TPRIT, 'LPRIO', 'BEZEI'));
            that.set('/Descripciones/CondicionExpedicion', that._mapDescripciones(T_TVSBT, 'VSBED', 'VTEXT'));
            that.set('/Descripciones/FechasFacturacion', that._mapDescripciones(T_TFACT, 'IDENT', 'LTEXT'));
            that.set('/Descripciones/ClasePlanFact', that._mapDescripciones(T_TFPLB, 'FPART', 'FPBEZ'));
            that.set('/Descripciones/AreaControlCredito', that._mapDescripciones(T_T014T, 'KKBER', 'KKBTX'));
            that.set('/Descripciones/Garantias', that._mapDescripciones(T_T691Q, 'KABSS', 'BEZEI'));
            that.set('/Descripciones/GrupoImputacion', that._mapDescripciones(T_TVKTT, 'KTGRD', 'VTEXT'));
            that.set('/Descripciones/ClaveClasificacion', that._mapDescripciones(T_TZUNT, 'ZUAWA', 'TTEXT'));
            that.set('/Descripciones/GrupoTesoreria', that._mapDescripciones(T_T035T, 'GRUPP', 'TEXTL'));
            that.set('/Descripciones/CondicionesPago', that._mapDescripciones(T_T052U, 'ZTERM', 'TEXT1'));
            that.set('/Descripciones/BloqueoPago', that._mapDescripciones(T_T008T, 'ZAHLS', 'TEXTL'));
            that.set('/Descripciones/BancoPropio', that._mapDescripciones(T_T012T, 'HBKID', 'TEXT1'));
            that.set('/Descripciones/ConversionOrigenDif', that._mapDescripciones(T_T053W, 'VRSDG', 'VRSTX'));
           // that.set('/Descripciones/ReglaSeleccion', that._mapDescripciones(T_T053B, 'SREGL', 'TXT20'));
            that.set('/Descripciones/ProcedimientoReclam', that._mapDescripciones(T_T047T, 'MAHNA', 'TEXTM'));
            that.set('/Descripciones/ReceptorReclam', that._mapDescripciones(T_T001S, 'BUSAB', 'SNAME'));
            that.set('/Descripciones/BloqueoReclam', that._mapDescripciones(T_T040T, 'MANSP', 'TEXT1'));
            that.set('/Descripciones/ClaveAgrupacion', that._mapDescripciones(T_T047S, 'MGRUP', 'TEXT1'));


            that._opcionesLoaded.resolve();
            /*
       
                   utils.httpCall({
                       service: "ZNW_DICCIO_CLIENTES",
                       query: oFilters,
                       type: "post",
                       success: function (result, status, xhr) {
                           // model.setProperty('/Opciones/GruposCuentas',result.T_T077X);
                           // model.setProperty('/Opciones/Tratamientos',result.T_TSAD3T);
                           // model.setProperty('/Opciones/Paises',result.T_T005T);
                           // model.setProperty('/Opciones/Regiones',result.T_T005U);
                           // model.setProperty('/Opciones/Ciudades',result.T_T005F);
                           // model.setProperty('/Opciones/Comunas',result.T_T005H);
                           // model.setProperty('/Opciones/GruposCliente',result.T_T151T);
                           // model.setProperty('/Opciones/EsquemasCliente',result.T_TVKDT);
       
                           model.setProperty('/Opciones/Idiomas', result.T_T002T);
       
       
                           that.set('/Descripciones/Pais', that._mapDescripciones(result.T_T005T, 'LAND1', 'LANDX50'));
                           that.set('/Descripciones/Region', that._mapDescripciones(result.T_T005U, 'BLAND', 'BEZEI'));
                           that.set('/Descripciones/SociedadGLAsociada', that._mapDescripciones(result.T_T880, 'RCOMP', 'NAME1'));
                           that.set('/Descripciones/Ramo', that._mapDescripciones(result.T_T016T, 'BRSCH', 'BRTXT'));
                           that.set('/Descripciones/CodigoCondado', that._mapDescripciones(result.T_T005F, 'COUNC', 'BEZEI'));
                           that.set('/Descripciones/CodigoMunicipal', that._mapDescripciones(result.T_T005H, 'CITYC', 'BEZEI'));
                           that.set('/Descripciones/ClaseCliente', that._mapDescripciones(result.T_TKUKT, 'KUKLA', 'VTEXT'));
                           that.set('/Descripciones/CodigoRamo1', that._mapDescripciones(result.T_TBRCT, 'BRACO', 'VTEXT'));
                           //that.set('/Descripciones/Moneda',that._mapDescripciones(result.,'',''));
                           that.set('/Descripciones/StatusJuridico', that._mapDescripciones(result.T_TVGFT, 'GFORM', 'VTEXT'));
                           that.set('/Descripciones/Departamento', that._mapDescripciones(result.T_TSABT, 'ABTNR', 'VTEXT'));
                           that.set('/Descripciones/Funcion', that._mapDescripciones(result.T_TPFKT, 'PAFKT', 'VTEXT'));
                           that.set('/Descripciones/ZonaVentas', that._mapDescripciones(result.T_T171T, 'BZIRK', 'BZTXT'));
                           that.set('/Descripciones/OficinaVentas', that._mapDescripciones(result.T_TVKBT, 'VKBUR', 'BEZEI'));
                           that.set('/Descripciones/GrupoClientes', that._mapDescripciones(result.T_T151T, 'KDGRP', 'KTEXT'));
                           that.set('/Descripciones/EsquemaCliente', that._mapDescripciones(result.T_TVKDT, 'KALKS', 'VTEXT'));
                           that.set('/Descripciones/ListaPrecios', that._mapDescripciones(result.T_T189T, 'PLTYP', 'PTEXT'));
                           that.set('/Descripciones/GrupoEstadClientes', that._mapDescripciones(result.T_TVSDT, 'STGKU', 'BEZEI20'));
                           that.set('/Descripciones/PrioridadEntrega', that._mapDescripciones(result.T_TPRIT, 'LPRIO', 'BEZEI'));
                           that.set('/Descripciones/CondicionExpedicion', that._mapDescripciones(result.T_TVSBT, 'VSBED', 'VTEXT'));
                           that.set('/Descripciones/FechasFacturacion', that._mapDescripciones(result.T_TFACT, 'IDENT', 'LTEXT'));
                           that.set('/Descripciones/ClasePlanFact', that._mapDescripciones(result.T_TFPLB, 'FPART', 'FPBEZ'));
                           that.set('/Descripciones/AreaControlCredito', that._mapDescripciones(result.T_T014T, 'KKBER', 'KKBTX'));
                           that.set('/Descripciones/Garantias', that._mapDescripciones(result.T_T691Q, 'KABSS', 'BEZEI'));
                           that.set('/Descripciones/GrupoImputacion', that._mapDescripciones(result.T_TVKTT, 'KTGRD', 'VTEXT'));
                           that.set('/Descripciones/ClaveClasificacion', that._mapDescripciones(result.T_TZUNT, 'ZUAWA', 'TTEXT'));
                           that.set('/Descripciones/GrupoTesoreria', that._mapDescripciones(result.T_T035T, 'GRUPP', 'TEXTL'));
                           that.set('/Descripciones/CondicionesPago', that._mapDescripciones(result.T_T052U, 'ZTERM', 'TEXT1'));
                           that.set('/Descripciones/BloqueoPago', that._mapDescripciones(result.T_T008T, 'ZAHLS', 'TEXTL'));
                           that.set('/Descripciones/BancoPropio', that._mapDescripciones(result.T_T012T, 'HBKID', 'TEXT1'));
                           that.set('/Descripciones/ConversionOrigenDif', that._mapDescripciones(result.T_T053W, 'VRSDG', 'VRSTX'));
                           that.set('/Descripciones/ReglaSeleccion', that._mapDescripciones(result.T_T053B, 'SREGL', 'TXT20'));
                           that.set('/Descripciones/ProcedimientoReclam', that._mapDescripciones(result.T_T047T, 'MAHNA', 'TEXTM'));
                           that.set('/Descripciones/ReceptorReclam', that._mapDescripciones(result.T_T001S, 'BUSAB', 'SNAME'));
                           that.set('/Descripciones/BloqueoReclam', that._mapDescripciones(result.T_T040T, 'MANSP', 'TEXT1'));
                           that.set('/Descripciones/ClaveAgrupacion', that._mapDescripciones(result.T_T047S, 'MGRUP', 'TEXT1'));
       
       
                           that._opcionesLoaded.resolve();
                       }
                   });
       
                   */
        },

        _mapDescripciones: function (array, codigo, descripcion) {
            let result = [];
            for (var i = 0; i < array.length; i++) {
                result.push({
                    CODIGO: array[i][codigo],
                    DESCRIPCION: array[i][descripcion]
                });
            }
            return result;
        },

        _cargarDatosCliente: function () {
            let that = this;

            let oFilters = {
                BUKRS: this.get('/filters/Sociedad'),
                KUNNR: this.get('/filters/Cliente'),
                SPART: this.get('/filters/Sector'),
                VKORG: this.get('/filters/OrganizacionVenta'),
                VTWEG: this.get('/filters/CanalDistribucion')
            };

            let EMAIL = "";
            let TEL_MOVIL = "";
            let T_ADR2 = [];
            T_ADR2.push({
                ADDRNUMBER: "0000340591",
                CLIENT: "300",
                CONSNUMBER: "501",
                COUNTRY: "CL",
                DATE_FROM: "0001-01-01",
                DFT_RECEIV: "X",
                FLGDEFAULT: "",
                FLG_NOUSE: "",
                HOME_FLAG: "",
                PERSNUMBER: "",
                R3_USER: "3",
                TELNR_CALL: "",
                TELNR_LONG: "+56",
                TEL_EXTENS: "",
                TEL_NUMBER: "",
                VALID_FROM: "",
                VALID_TO: "",
            });

            let T_ADR3 = [];

            let T_ADR6 = [];

            let T_ADRC = {
                ADDRESS_ID: "",
                ADDRNUMBER: "0000340591",
                ADDRORIGIN: "",
                ADDR_GROUP: "BP",
                ADRC_ERR_STATUS: "",
                ADRC_UUID: "0x00000000000000000000000000000000",
                BUILDING: "",
                CHCKSTATUS: "",
                CITY1: "",
                CITY2: "",
                CITYH_CODE: "",
                CITYP_CODE: "",
                CITY_CODE: "",
                CITY_CODE2: "",
                CLIENT: "300",
                COUNTRY: "CL",
                COUNTY: "",
                COUNTY_CODE: "",
                DATE_FROM: "0001-01-01",
                DATE_TO: "9999-12-31",
                DEFLT_COMM: "",
                DELI_SERV_NUMBER: "",
                DELI_SERV_TYPE: "",
                DONT_USE_P: "",
                DONT_USE_S: "",
                DUNS: "",
                DUNSP4: "",
                EXTENSION1: "",
                EXTENSION2: "",
                FAX_EXTENS: "",
                FAX_NUMBER: "",
                FLAGCOMM2: "X",
                FLAGCOMM3: "",
                FLAGCOMM4: "",
                FLAGCOMM5: "",
                FLAGCOMM6: "",
                FLAGCOMM7: "",
                FLAGCOMM8: "",
                FLAGCOMM9: "",
                FLAGCOMM10: "",
                FLAGCOMM11: "",
                FLAGCOMM12: "",
                FLAGCOMM13: "X",
                FLAGGROUPS: "",
                FLOOR: "",
                HOME_CITY: "",
                HOUSE_NUM1: "280 5 PISO",
                HOUSE_NUM2: "",
                HOUSE_NUM3: "",
                ID_CATEGORY: "",
                LANGU: "S",
                LANGU_CREA: "S",
                LOCATION: "",
                MC_CITY1: "",
                MC_COUNTY: "",
                MC_NAME1: "PABLO FERNANDO ZAMORA VEL",
                MC_STREET: "TEATINOS",
                MC_TOWNSHIP: "",
                NAME1: "PABLO FERNANDO ZAMORA VELASQUEZ",
                NAME2: "",
                NAME3: "",
                NAME4: "",
                NAME_CO: "",
                NAME_TEXT: "",
                NATION: "",
                PCODE1_EXT: "",
                PCODE2_EXT: "",
                PCODE3_EXT: "",
                PERS_ADDR: "",
                POSTALAREA: "",
                POST_CODE1: "",
                POST_CODE2: "",
                POST_CODE3: "",
                PO_BOX: "",
                PO_BOX_CTY: "",
                PO_BOX_LOBBY: "",
                PO_BOX_LOC: "",
                PO_BOX_NUM: "",
                PO_BOX_REG: "",
                REGIOGROUP: "",
                REGION: "13",
                ROOMNUMBER: "",
                SORT1: "......",
                SORT2: "",
                SORT_PHN: "",
                STREET: "TEATINOS",
                STREETABBR: "",
                STREETCODE: "",
                STR_SUPPL1: "",
                STR_SUPPL2: "",
                STR_SUPPL3: "PARTICULAR",
                TAXJURCODE: "",
                TEL_EXTENS: "",
                TEL_NUMBER: "6922807",
                TIME_ZONE: "CHILE",
                TITLE: "0002",
                TOWNSHIP: "",
                TOWNSHIP_CODE: "",
                TRANSPZONE: "",
                UUID_BELATED: "",
                XPCPT: "",

            };
            let T_ADRCT = {

                ADDRNUMBER: "",
                CLIENT: "",
                DATE_FROM: "0000-00-00",
                LANGU: "",
                NATION: "",
            };
            //  let T_ADRCT = [];
            let T_KNA1 = {

                ABRVW: "",
                ADRNR: "0000340591",
                ALC: "",
                ANRED: "Señor",
                AUFSD: "",
                BAHNE: "",
                BAHNS: "",
                BBBNR: "0000000",
                BBSNR: "00000",
                BEGRU: "",
                BRAN1: "0001",
                BRAN2: "",
                BRAN3: "",
                BRAN4: "",
                BRAN5: "",
                BRSCH: "0001",
                BUBKZ: "0",
                CASSD: "",
                CCC01: "",
                CCC02: "",
                CCC03: "",
                CCC04: "",
                CFOPC: "",
                CITYC: "291",
                CIVVE: "",
                CNAE: "",
                COAUFNR: "",
                COMSIZE: "",
                CONFS: "",
                COUNC: "46",
                CRTN: "",
                CVP_XBLCK: "",
                DATLT: "",
                DEAR1: "",
                DEAR2: "",
                DEAR3: "",
                DEAR4: "",
                DEAR5: "",
                DEAR6: "",
                DECREGPC: "",
                DTAMS: "",
                DTAWS: "",
                DUEFL: "X",
                DUNS: "",
                DUNS4: "",
                EKONT: "",
                ERDAT: "2008-07-11",
                ERNAM: "MUNDONET",
                ETIKG: "",
                EXABL: "",
                EXP: "",
                FAKSD: "",
                FEE_SCHEDULE: "",
                FISKN: "",
                FITYP: "",
                GFORM: "",
                HZUOR: "00",
                ICMSTAXPAY: "",
                INDTYP: "",
                INSPATDEBI: "",
                INSPBYDEBI: "",
                JMJAH: "0000",
                JMZAH: "000000",
                J_1KFREPRE: "",
                J_1KFTBUS: "",
                J_1KFTIND: "",
                J_3GAABRECH: "0000-00-00",
                J_3GABGLG: "",
                J_3GABGVG: "",
                J_3GABRART: "",
                J_3GABRKEN: "",
                J_3GAGDUMI: "",
                J_3GAGEXT: "",
                J_3GAGINT: "",
                J_3GAGSTDI: "",
                J_3GBLSPER: "",
                J_3GCALID: "",
                J_3GEMINBE: "00000",
                J_3GETYP: "",
                J_3GFMGUE: "00000",
                J_3GFRISTLO: "",
                J_3GINVSTA: "",
                J_3GKEINSA: "",
                J_3GKLEIVO: "",
                J_3GLABRECH: "0000-00-00",
                J_3GMASCHB: "",
                J_3GMEINSA: "",
                J_3GNEGMEN: "",
                J_3GREFTYP: "",
                J_3GSCHPRS: "",
                J_3GSTDMON: 0,
                J_3GSTDTAG: 0,
                J_3GTAGMON: 0,
                J_3GVMONAT: "0",
                J_3GZUGTAG: "",
                J_3GZUSCHUE: "00000",
                J_3GZUTVHLG: "",
                KATR1: "",
                KATR2: "",
                KATR3: "",
                KATR4: "",
                KATR5: "",
                KATR6: "",
                KATR7: "",
                KATR8: "",
                KATR9: "",
                KATR10: "",
                KDKG1: "",
                KDKG2: "",
                KDKG3: "",
                KDKG4: "",
                KDKG5: "",
                KNAZK: "",
                KNRZA: "",
                KNURL: "",
                KOKRS: "",
                KONZS: "",
                KOSTL: "",
                KTOCD: "",
                KTOKD: "Z001",
                KUKLA: "00",
                KUNNR: "10351973-K",
                LAND1: "CL",
                LEGALNAT: "0000",
                LGORT: "",
                LIFNR: "",
                LIFSD: "",
                LOCCO: "",
                LOEVM: "",
                LZONE: "",
                MANDT: "300",
                MCOD1: "PABLO FERNANDO ZAMORA VEL",
                MCOD2: "",
                MCOD3: "",
                MILVE: "",
                NAME1: "PABLO FERNANDO ZAMORA VELASQUEZ",
                NAME2: "",
                NAME3: "",
                NAME4: "",
                NIELS: "",
                NODEL: "",
                ORT01: "",
                ORT02: "",
                PERIV: "",
                PFACH: "",
                PFORT: "",
                PMT_OFFICE: "",
                PSOFG: "",
                PSOHS: "",
                PSOIS: "",
                PSON1: "",
                PSON2: "",
                PSON3: "",
                PSOO1: "",
                PSOO2: "",
                PSOO3: "",
                PSOO4: "",
                PSOO5: "",
                PSOST: "",
                PSOTL: "",
                PSOVN: "",
                PSPNR: "00000000",
                PSTL2: "",
                PSTLZ: "",
                REGIO: "13",
                RG: "",
                RGDATE: "0000-00-00",
                RIC: "00000000000",
                RNE: "",
                RNEDATE: "0000-00-00",
                RPMKR: "",
                SAM_EFT_IND: "",
                SAM_UE_ID: "",
                SORTL: "......",
                SPERR: "",
                SPERZ: "",
                SPRAS: "S",
                STCD1: "10351973-K",
                STCD2: "",
                STCD3: "",
                STCD4: "",
                STCD5: "",
                STCD6: "",
                STCDT: "",
                STCEG: "",
                STKZA: "",
                STKZN: "",
                STKZU: "",
                STRAS: "TEATINOS 280 5 PISO",
                SUFRAMA: "",
                TDT: "",
                TELBX: "",
                TELF1: "6922807",
                TELF2: "",
                TELFX: "",
                TELTX: "",
                TELX1: "",
                TXJCD: "",
                TXLW1: "",
                TXLW2: "",
                UF: "",
                UMJAH: "0000",
                UMSA1: 0,
                UMSAT: 0,
                UPDAT: "0000-00-00",
                UPTIM: "00:00:00",
                UWAER: "",
                VBUND: "",
                WERKS: "",
                XCPDK: "",
                XICMS: "",
                XKNZA: "",
                XSUBT: "",
                XXIPI: "",
                XZEMP: "",

            };
            let T_KNB1 = {

                AD_HASH: "",
                AKONT: "0011040001",
                ALTKN: "",
                AVSND: "",
                BEGRU: "",
                BLNKZ: "",
                BUKRS: "1000",
                BUSAB: "",
                CESSION_KZ: "",
                CIIUCODE: "0000",
                CONFS: "",
                CVP_XBLCK_B: "",
                DATLZ: "0000-00-00",
                EIKTO: "",
                EKVBD: "",
                ERDAT: "2008-07-11",
                ERNAM: "MUNDONET",
                FDGRV: "D1",
                FRGRP: "",
                GMVKZD: "",
                GRICD: "",
                GRIDT: "",
                GUZTE: "",
                HBKID: "",
                INTAD: "",
                KNRZB: "",
                KNRZE: "",
                KULTG: 0,
                KUNNR: "10351973-K",
                KVERM: "",
                LOCKB: "",
                LOEVM: "",
                MANDT: "300",
                MGRUP: "",
                NODEL: "",
                PERKZ: "",
                PERNR: "00000000",
                QLAND: "",
                REMIT: "",
                SPERR: "",
                SREGL: "",
                TLFNS: "",
                TLFXS: "",
                TOGRU: "",
                UPDAT: "0000-00-00",
                UPTIM: "00:00:00",
                URLID: "",
                UZAWE: "",
                VERDT: "0000-00-00",
                VLIBB: 0,
                VRBKZ: "",
                VRSDG: "",
                VRSNR: "",
                VRSPR: 0,
                VRSZL: 0,
                VZSKZ: "",
                WAKON: "",
                WBRSL: "",
                WEBTR: 0,
                XAUSZ: "",
                XDEZV: "",
                XEDIP: "",
                XKNZB: "",
                XPORE: "",
                XVERR: "",
                XZVER: "X",
                ZAHLS: "",
                ZAMIB: "",
                ZAMIM: "",
                ZAMIO: "",
                ZAMIR: "",
                ZAMIV: "",
                ZGRUP: "",
                ZINDT: "0000-00-00",
                ZINRT: "00",
                ZSABE: "",
                ZTERM: "D,00",
                ZUAWA: "",
                ZWELS: "ADEFGKP"
            };
            let T_KNB5 = {

                BUKRS: "1000",
                BUSAB: "",
                GMVDT: "0000-00-00",
                KNRMA: "",
                KUNNR: "10351973-K",
                MABER: "",
                MADAT: "0000-00-00",
                MAHNA: "SAL1",
                MAHNS: "0",
                MANDT: "300",
                MANSP: "",
            };
            let T_KNVI = [];


            T_KNVI.push({
                ALAND: "CL",
                KUNNR: "10173901-5",
                MANDT: "300",
                TATYP: "MWST",
                TAXKD: "1"
            });

            T_KNVI.push({
                ALAND: "CL",
                KUNNR: "10173901-5",
                MANDT: "300",
                TATYP: "ZIZF",
                TAXKD: "1"
            });


            let T_KNVK = [];

            T_KNVK.push({
                ABTNR: "",
                ABTPA: "",
                ADRND: "",
                ADRNP: "",
                ADRNP_2: "0001308230",
                AKVER: "",
                ANRED: "",
                BRYTH: "",
                CVP_XBLCK_K: "",
                DIAB1: "00:00:00",
                DIAB2: "00:00:00",
                DIBI1: "00:00:00",
                DIBI2: "00:00:00",
                DOAB1: "00:00:00",
                DOAB2: "00:00:00",
                DOBI1: "00:00:00",
                DOBI2: "00:00:00",
                DUEFL: "X",
                ERDAT: "2020-08-19",
                ERNAM: "FGARCIA",
                FAMST: "1",
                FRAB1: "00:00:00",
                FRAB2: "00:00:00",
                FRBI1: "00:00:00",
                FRBI2: "00:00:00",
                GBDAT: "1964-09-25",
                KUNNR: "10173901-5",
                KZHERK: "D",
                LIFNR: "",
                LOEVM: "",
                MANDT: "300",
                MIAB1: "00:00:00",
                MIAB2: "00:00:00",
                MIBI1: "00:00:00",
                MIBI2: "00:00:00",
                MOAB1: "00:00:00",
                MOAB2: "00:00:00",
                MOBI1: "00:00:00",
                MOBI2: "00:00:00",
                NAME1: "ARAYA   QUINTREL",
                NAMEV: "LUIS ALBERTO",
                NMAIL: "",
                ORT01: "",
                PAFKT: "",
                PAKN1: "",
                PAKN2: "",
                PAKN3: "",
                PAKN4: "",
                PAKN5: "",
                PARAU: "",
                PARGE: "1",
                PARH1: "",
                PARH2: "",
                PARH3: "",
                PARH4: "",
                PARH5: "",
                PARLA: "",
                PARNR: "0000170820",
                PARVO: "",
                PAVIP: "",
                PRSNR: "0001308228",
                SAAB1: "00:00:00",
                SAAB2: "00:00:00",
                SABI1: "00:00:00",
                SABI2: "00:00:00",
                SOAB1: "00:00:00",
                SOAB2: "00:00:00",
                SOBI1: "00:00:00",
                SOBI2: "00:00:00",
                SORTL: "",
                SPNAM: "",
                TELF1: "222316139",
                TITEL_AP: "",
                UEPAR: "0000000000",
                VRTNR: "0000000000",
            });

            let T_KNVP = [];

            T_KNVP.push({
                DEFPA: "",
                KNREF: "",
                KUNN2: "10173901-5",
                KUNNR: "10173901-5",
                LIFNR: "",
                MANDT: "300",
                PARNR: "0000000000",
                PARVW: "RE",
                PARZA: "000",
                PERNR: "00000000",
                SPART: "P0",
                VKORG: "1000",
                VTWEG: "VS"
            });

            T_KNVP.push({
                DEFPA: "",
                KNREF: "",
                KUNN2: "10173901-5",
                KUNNR: "10173901-5",
                LIFNR: "",
                MANDT: "300",
                PARNR: "0000000000",
                PARVW: "WE",
                PARZA: "000",
                PERNR: "00000000",
                SPART: "P0",
                VKORG: "1000",
                VTWEG: "VS"
            });

            T_KNVP.push({
                DEFPA: "",
                KNREF: "",
                KUNN2: "10173901-5",
                KUNNR: "10173901-5",
                LIFNR: "",
                MANDT: "300",
                PARNR: "0000000000",
                PARVW: "AG",
                PARZA: "000",
                PERNR: "00000000",
                SPART: "P0",
                VKORG: "1000",
                VTWEG: "VS"
            });


            T_KNVP.push({
                DEFPA: "",
                KNREF: "",
                KUNN2: "10173901-5",
                KUNNR: "10173901-5",
                LIFNR: "",
                MANDT: "300",
                PARNR: "0000000000",
                PARVW: "RG",
                PARZA: "000",
                PERNR: "00000000",
                SPART: "P0",
                VKORG: "1000",
                VTWEG: "VS"
            });



            let T_KNVV = {
                AGREL: "",
                ANTLF: 0,
                AUFSD: "",
                AUTLF: "",
                AWAHR: "000",
                BEGRU: "",
                BLIND: "",
                BOIDT: "0000-00-00",
                BOKRE: "",
                BZIRK: "",
                CARRIER_NOTIF: "",
                CASSD: "",
                CHSPL: "",
                CVP_XBLCK_V: "",
                EIKTO: "",
                ERDAT: "0000-00-00",
                ERNAM: "",
                FAKSD: "",
                FPART: "",
                FSH_GRREG: "",
                FSH_GRSGY: "",
                FSH_KVGR6: "",
                FSH_KVGR7: "",
                FSH_KVGR8: "",
                FSH_KVGR9: "",
                FSH_KVGR10: "",
                FSH_MSOCDC: "",
                FSH_MSOPID: "",
                FSH_RESGY: "",
                FSH_SC_CID: "",
                FSH_SS: "",
                FSH_VAS_CG: "",
                FSH_VAS_DETC: "",
                INCO1: "",
                INCO2: "",
                INCO2_L: "",
                INCO3_L: "",
                INCOV: "",
                J_1NBOESL: "",
                KABSS: "",
                KALKS: "",
                KDGRP: "",
                KKBER: "",
                KLABC: "",
                KONDA: "",
                KTGRD: "",
                KUNNR: "",
                KURST: "",
                KVAKZ: "",
                KVAWT: 0,
                KVGR1: "",
                KVGR2: "",
                KVGR3: "",
                KVGR4: "",
                KVGR5: "",
                KZAZU: "",
                KZTLF: "",
                LIFSD: "",
                LOEVM: "",
                LPRIO: "00",
                MANDT: "",
                MEGRU: "",
                MRNKZ: "",
                PERFK: "",
                PERRL: "",
                PLTYP: "",
                PODKZ: "",
                PODTG: 0,
                PRAT1: "",
                PRAT2: "",
                PRAT3: "",
                PRAT4: "",
                PRAT5: "",
                PRAT6: "",
                PRAT7: "",
                PRAT8: "",
                PRAT9: "",
                PRATA: "",
                PRFRE: "",
                PROFILE: "",
                PVKSM: "",
                RDOFF: "",
                SPART: "",
                UEBTK: "",
                UEBTO: 0,
                UNTTO: 0,
                VERSG: "",
                VKBUR: "",
                VKGRP: "",
                VKORG: "",
                VSBED: "",
                VSORT: "",
                VTWEG: "",
                VWERK: "",
                WAERS: "",
                ZTERM: "",
                ZZACUERDO: "",
                ZZFEACUERDO: "0000-00-00",
            };
            let T_RETURN = [];

            T_RETURN.push({
                CODE: "",
                LOG_MSG_NO: "000000",
                LOG_NO: "",
                MESSAGE: "Cliente no tiene datos de Faxes (ADR3)",
                MESSAGE_V1: "",
                MESSAGE_V2: "",
                MESSAGE_V3: "",
                MESSAGE_V4: "",
                TYPE: "S",
            });

            T_RETURN.push({
                CODE: "",
                LOG_MSG_NO: "000000",
                LOG_NO: "",
                MESSAGE: "Cliente no tiene datos de Correo Electronico (ADR6)",
                MESSAGE_V1: "",
                MESSAGE_V2: "",
                MESSAGE_V3: "",
                MESSAGE_V4: "",
                TYPE: "S",
            });

            T_RETURN.push({
                CODE: "",
                LOG_MSG_NO: "000000",
                LOG_NO: "",
                MESSAGE: "Cliente no tiene datos de Personas de contacto (KNVK)",
                MESSAGE_V1: "",
                MESSAGE_V2: "",
                MESSAGE_V3: "",
                MESSAGE_V4: "",
                TYPE: "S",
            });
            let T_ZKNVIT = [];

            T_ZKNVIT.push({
                ALAND: "CL",
                LANDX: "Chile",
                TATYP: "MWST",
                TAXKD: "1",
                VTEXT_CLA: "Sujeto/a impuestos",
                VTEXT_IMP: "IVA repercutido"
            });

            T_ZKNVIT.push({
                ALAND: "CL",
                LANDX: "Chile",
                TATYP: "ZIZF",
                TAXKD: "1",
                VTEXT_CLA: "Sujeto/a impuestos",
                VTEXT_IMP: "Impto. Zona Franca"

            });

            let T_ZKNVPT = [];

            T_ZKNVPT.push({
                DEFPA: "",
                KNREF: "",
                KTONR: "10173901-5",
                PARVW: "RE",
                VTEXT_INT: "Destinatario factura",
                VTXTM: "LUIS ARAYA QUINTREL"

            });


            T_ZKNVPT.push({
                DEFPA: "",
                KNREF: "",
                KTONR: "10173901-5",
                PARVW: "WE",
                VTEXT_INT: "Destinatario mcía.",
                VTXTM: "LUIS ARAYA QUINTREL"

            });

            T_ZKNVPT.push({
                DEFPA: "",
                KNREF: "",
                KTONR: "10173901-5",
                PARVW: "AG",
                VTEXT_INT: "Solicitante",
                VTXTM: "LUIS ARAYA QUINTREL"

            });

            T_ZKNVPT.push({
                DEFPA: "",
                KNREF: "",
                KTONR: "10173901-5",
                PARVW: "RG",
                VTEXT_INT: "Responsable de pago",
                VTXTM: "LUIS ARAYA QUINTREL"
            });

            let result3 = {
                EMAIL: EMAIL,
                TEL_MOVIL: TEL_MOVIL,
                T_ADR2: T_ADR2,
                T_ADR3: T_ADR3,
                T_ADR6: T_ADR6,
                T_ADRC: T_ADRC,
                T_ADRCT: T_ADRCT,
                T_KNA1: T_KNA1,
                T_KNB1: T_KNB1,
                T_KNB5: T_KNB5,
                T_KNVI: T_KNVI,
                T_KNVK: T_KNVK,
                T_KNVP: T_KNVP,
                T_KNVV: T_KNVV,
                T_RETURN: T_RETURN,
                T_ZKNVIT: T_ZKNVIT,
                T_ZKNVPT: T_ZKNVPT
            };

            this.set('/ConsultaCliente', result3);

            /*
                        utils.httpCall({
                            service: "ZNW_CLIENTES_GETDETAIL1",
                            query: oFilters,
                            type: "post",
                            success: function (result, status, xhr) {
                                that.set('/ConsultaCliente', result);
                            }
                        });
            
                        */
        },

        handlePaisDetails: function () {
            this._openDescriptionDialog('Pais', 'País', 'Visualizar Texto');
        },

        handleRegionDetails: function () {
            this._openDescriptionDialog('Region', 'Región', 'Visualizar Texto');
        },

        handleSociedadGLAsociadaDetails: function () {
            this._openDescriptionDialog('SociedadGLAsociada', 'Sociedad GL Asociada', 'Visualizar Texto');
        },

        handleRamoDetails: function () {
            this._openDescriptionDialog('Ramo', 'Ramo', 'Visualizar Texto');
        },

        handleCodigoCondadoDetails: function () {
            this._openDescriptionDialog('CodigoCondado', 'Código Condado', 'Visualizar Texto');
        },

        handleCodigoMunicipalDetails: function () {
            this._openDescriptionDialog('CodigoMunicipal', 'Código Municipal', 'Visualizar Texto');
        },

        handleClaseClienteDetails: function () {
            this._openDescriptionDialog('ClaseCliente', 'Clase Cliente', 'Visualizar Texto');
        },

        handleCodigoRamo1Details: function () {
            this._openDescriptionDialog('CodigoRamo1', 'Código Ramo 1', 'Visualizar Texto');
        },

        handleMonedaDetails: function () {
            this._openDescriptionDialog('Moneda', 'Moneda', 'Visualizar Texto');
        },

        handleStatusJuridicoDetails: function () {
            this._openDescriptionDialog('StatusJuridico', 'Status Jurídico', 'Visualizar Texto');
        },

        handleDepartamentoDetails: function () {
            this._openDescriptionDialog('Departamento', 'Departamento', 'Visualizar Texto');
        },

        handleFuncionDetails: function () {
            this._openDescriptionDialog('Funcion', 'Función', 'Visualizar Texto');
        },

        handleZonaVentasDetails: function () {
            this._openDescriptionDialog('ZonaVentas', 'Zona Ventas', 'Visualizar Texto');
        },

        handleOficinaVentasDetails: function () {
            this._openDescriptionDialog('OficinaVentas', 'Oficina Ventas', 'Visualizar Texto');
        },

        handleGrupoClientesDetails: function () {
            this._openDescriptionDialog('GrupoClientes', 'Grupo Clientes', 'Visualizar Texto');
        },

        handleEsquemaClienteDetails: function () {
            this._openDescriptionDialog('EsquemaCliente', 'Esquema Cliente', 'Visualizar Texto');
        },

        handleListaPreciosDetails: function () {
            this._openDescriptionDialog('ListaPrecios', 'Lista Precios', 'Visualizar Texto');
        },

        handleGrupoEstadClientesDetails: function () {
            this._openDescriptionDialog('GrupoEstadClientes', 'Grupo Estadísticas Clientes', 'Visualizar Texto');
        },

        handlePrioridadEntregaDetails: function () {
            this._openDescriptionDialog('PrioridadEntrega', 'Prioridad Entrega', 'Visualizar Texto');
        },

        handleCondicionExpedicionDetails: function () {
            this._openDescriptionDialog('CondicionExpedicion', 'Condición Expedición', 'Visualizar Texto');
        },

        handleFechasFacturacionDetails: function () {
            this._openDescriptionDialog('FechasFacturacion', 'Fechas Facturación', 'Visualizar Texto');
        },

        handleClasePlanFactDetails: function () {
            this._openDescriptionDialog('ClasePlanFact', 'Clase Plan Facturación', 'Visualizar Texto');
        },

        handleAreaControlCreditoDetails: function () {
            this._openDescriptionDialog('AreaControlCredito', 'Área Control Crédito', 'Visualizar Texto');
        },

        handleGarantiasDetails: function () {
            this._openDescriptionDialog('Garantias', 'Garantías', 'Visualizar Texto');
        },

        handleGrupoImputacionDetails: function () {
            this._openDescriptionDialog('GrupoImputacion', 'Grupo Imputación', 'Visualizar Texto');
        },

        handleClaveClasificacionDetails: function () {
            this._openDescriptionDialog('ClaveClasificacion', 'Clave Clasificación', 'Visualizar Texto');
        },

        handleGrupoTesoreriaDetails: function () {
            this._openDescriptionDialog('GrupoTesoreria', 'Grupo Tesorería', 'Visualizar Texto');
        },

        handleCondicionesPagoDetails: function () {
            this._openDescriptionDialog('CondicionesPago', 'Condiciones Pago', 'Visualizar Texto');
        },

        handleBloqueoPagoDetails: function () {
            this._openDescriptionDialog('BloqueoPago', 'Bloqueo Pago', 'Visualizar Texto');
        },

        handleBancoPropioDetails: function () {
            this._openDescriptionDialog('BancoPropio', 'Banco Propio', 'Visualizar Texto');
        },

        handleConversionOrigenDifDetails: function () {
            this._openDescriptionDialog('ConversionOrigenDif', 'Conversión Origen Diferencias', 'Visualizar Texto');
        },

        handleReglaSeleccionDetails: function () {
            this._openDescriptionDialog('ReglaSeleccion', 'Regla Selección', 'Visualizar Texto');
        },

        handleProcedimientoReclamDetails: function () {
            this._openDescriptionDialog('ProcedimientoReclam', 'Procedimiento Reclamación', 'Visualizar Texto');
        },

        handleReceptorReclamDetails: function () {
            this._openDescriptionDialog('ReceptorReclam', 'Receptor Reclamación', 'Visualizar Texto');
        },

        handleBloqueoReclamDetails: function () {
            this._openDescriptionDialog('BloqueoReclam', 'Bloqueo Reclamación', 'Visualizar Texto');
        },

        handleClaveAgrupacionDetails: function () {
            this._openDescriptionDialog('ClaveAgrupacion', 'Clave Agrupación', 'Visualizar Texto');
        },


        _openDescriptionDialog: function (indice, tituloCodigo, tituloDescripcion) {
            let oModel = this.getView().getModel();

            if (this.descriptionDialog) {
                this.descriptionDialog.destroy();
            }

            this.descriptionDialog = new sap.m.Dialog({
                contentWidth: '600px',
                title: 'Descripciones',
                content: new sap.ui.table.Table({
                    rows: '{/Descripciones/' + indice + '}',
                    visibleRowCount: 5,
                    noData: 'Sin Descripciones.',
                    selectionMode: "None",
                    columns: [
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: tituloCodigo
                            }),
                            template: new sap.m.Text({
                                text: '{CODIGO}',
                                wrapping: false
                            })
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: tituloDescripcion
                            }),
                            template: new sap.m.Text({
                                text: '{DESCRIPCION}',
                                wrapping: false
                            })
                        })
                    ],
                }).setModel(oModel),
                endButton: new sap.m.Button({
                    text: 'Cerrar',
                    icon: 'sap-icon://decline',
                    press: () => {
                        this.descriptionDialog.close();
                    }
                })
            }).addStyleClass('sapUiSizeCompact sapUiContentPadding');
            this.descriptionDialog.open();
        },


        dateFormat: function (dateStr) {
            if (dateStr && dateStr != '0000-00-00') {
                let dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "dd/MM/yyyy",
                });

                let dateArray = dateStr.split('-');

                let date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

                return dateFormat.format(date);
            } else {
                return '';
            }
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
            oRouter.getRoute("show").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            try {
                var filters = JSON.parse(localStorage['filters']);
            } catch (e) {

            }
            Object.keys(localStorage).forEach(function (key) {
                if (key == 'filters') {
                    localStorage.removeItem(key);
                }
            });

            this.set('/filters', filters);

            this.set('/Descripciones', {
                Pais: [],
                Region: [],
                SociedadGLAsociada: [],
                Ramo: [],
                CodigoCondado: [],
                CodigoMunicipal: [],
                ClaseCliente: [],
                CodigoRamo1: [],
                Moneda: [],
                StatusJuridico: [],
                Departamento: [],
                Funcion: [],
                ZonaVentas: [],
                OficinaVentas: [],
                GrupoClientes: [],
                EsquemaCliente: [],
                ListaPrecios: [],
                GrupoEstadClientes: [],
                PrioridadEntrega: [],
                CondicionExpedicion: [],
                FechasFacturacion: [],
                ClasePlanFact: [],
                AreaControlCredito: [],
                Garantias: [],
                GrupoImputacion: [],
                ClaveClasificacion: [],
                GrupoTesoreria: [],
                CondicionesPago: [],
                BloqueoPago: [],
                BancoPropio: [],
                ConversionOrigenDif: [],
                ReglaSeleccion: [],
                ProcedimientoReclam: [],
                ReceptorReclam: [],
                BloqueoReclam: [],
                ClaveAgrupacion: []
            });

            this.set('/Opciones', {
                Idiomas: []
            });

            if (typeof filters === 'undefined' || typeof filters.Cliente === 'undefined') {
                this.handleBack();
            } else {
                this._cargarCombosIniciales();
                this._cargarDatosCliente();
            }
        },


    });

});