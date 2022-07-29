sap.ui.define([
    "sapui5agendar/scovisualizarordentrabajo_html/controller/Root.controller",
    "sapui5agendar/scovisualizarordentrabajo_html/utils/utils",
    "sapui5agendar/scovisualizarordentrabajo_html/model/models",
    "sapui5agendar/scovisualizarordentrabajo_html/utils/validator",
    "sap/ui/generic/app/navigation/service/NavigationHandler",
    "sap/ui/generic/app/navigation/service/NavType",
    "sap/ui/core/routing/History"
], function (Controller, utils, models, Validator, NavigationHandler, NavType, History) {
    "use strict";

    return Controller.extend("sapui5agendar.scovisualizarordentrabajo_html.controller.ManoObra", {

        /**
         * Init
         */
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
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("manoObra").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            let that = this;

            utils.view = this.getView();
            utils.controller = this;

            var nroOrden = '';
            try {
                nroOrden = JSON.parse(localStorage['NroOrden']);
            } catch (e) {

            }
            Object.keys(localStorage).forEach(function (key) {
                if (key == 'NroOrden') {
                    localStorage.removeItem(key);
                }
            });

            if (nroOrden) {
                this.set('/filters', { NroOrden: nroOrden, Contador: '', Texto: '', Transaccion: '' });
                this.set('/Visibles', {
                    HojaRuta: false,
                    Contador: false,
                    Ejecutar: false,
                    Datos: false
                });

                this.set('/Editables', {
                    Orden: false
                });

                that.set('/Visibles/HojaRuta', true);

                let T_AYUDBUQ = [];

                T_AYUDBUQ.push({
                    KTEXT: "DIECI-RUNNER 35.12",
                    PLNAL: "01",
                    PLNNR: "00000034",
                    TEXTO_CONT: "",
                });

                T_AYUDBUQ.push({
                    KTEXT: "3029",
                    PLNAL: "P1",
                    PLNNR: "00060483",
                    TEXTO_CONT: ""
                });


                T_AYUDBUQ.push({
                    KTEXT: "1490D",
                    PLNAL: "A2",
                    PLNNR: "00060500",
                });

                let grupos = utils.copyObjectArray(['KTEXT', 'PLNAL', 'PLNNR'], ['TEXTO', 'CONTADOR', 'HOJA_RUTA'], T_AYUDBUQ);
                that.openDialog('manoObra.GrpHojasRuta3', { Grupos: grupos, i_Grupo: -1 });
                /*
                                utils.httpCall({
                                    service:'ZPMMF_003_VALIDAORDEN',
                                    query:{
                                        I_ORDEN: nroOrden
                                    },
                                    type:'POST',
                                    success: function (result) {
                                        that._messageManager([result.E_RETORNO]);
                                        that.set('/filters/Transaccion',result.E_TRANSACCION);
                                        if(result.E_TRANSACCION === 'ZBHR_1'){
                                            let grupos = utils.copyObjectArray(['PLNNR'],['HOJA_RUTA'],result.T_PLNNR,false);
                                            that.openDialog('manoObra.GrpHojasRuta1',{Grupos:grupos,i_Grupo:-1});
                                        }else if(result.E_TRANSACCION === 'ZBHR'){
                                            that.set('/Visibles/HojaRuta',true);
                                            utils.httpCall({
                                                service:'ZPMMF_006_AYUDABUSQPLNNR',
                                                query:{},
                                                type:'POST',
                                                success: function (result2) {
                                                    let grupos = utils.copyObjectArray(['KTEXT','PLNAL','PLNNR'],['TEXTO','CONTADOR','HOJA_RUTA'],result2.T_AYUDBUQ);
                                                    that.openDialog('manoObra.GrpHojasRuta3',{Grupos:grupos,i_Grupo:-1});
                                                }
                                            });
                                        }
                                    }
                                });
                
                                */

                // setTimeout(function () {
                //     that.openDialog('manoObra.GrpHojasRuta2',{Grupos:[
                //             {
                //                 HOJA_RUTA:'00000034',
                //                 CONTADOR:'1',
                //                 TEXTO:'1'
                //             },
                //             {
                //                 HOJA_RUTA:'2AN2',
                //                 CONTADOR:'2',
                //                 TEXTO:'2'
                //             },{
                //                 HOJA_RUTA:'as j',
                //                 CONTADOR:'3',
                //                 TEXTO:'3'
                //             }
                //         ]});
                // },1000);
            } else {
                this.handleBack();
            }
        },

        handleAceptarGrp1: function () {
            let that = this;
            let dialog = that._getOpenedDialogProperty();
            let grupoHoja = that.get(dialog.selectedGrupo).HOJA_RUTA;
            that.set('/filters/GrupoHojaRuta', grupoHoja);
            that.set('/Visibles/HojaRuta', true);

            let nroOrden = that.get('/filters/NroOrden');
            utils.httpCall({
                service: 'ZPMMF_004_VALIDAHRUTA',
                query: {
                    I_ORDEN: nroOrden,
                    I_PLNNR: grupoHoja
                },
                type: 'POST',
                success: function (result) {
                    that._messageManager([result.E_RETURN]);
                    let grupos = utils.copyObjectArray(['KTEXT', 'PLNAL'], ['TEXTO', 'CONTADOR'], result.T_PLNAL, false);
                    that.closeDialog();
                    that.openDialog('manoObra.GrpHojasRuta2', { Grupos: grupos, i_Grupo: -1 });
                }
            });
        },

        handleAceptarGrp2: function () {
            let that = this;
            let dialog = that._getOpenedDialogProperty();
            let contador = that.get(dialog.selectedGrupo).CONTADOR;
            let texto = that.get(dialog.selectedGrupo).TEXTO;
            that.set('/filters/Contador', contador);
            that.set('/filters/Texto', texto);
            that.set('/Visibles/Contador', true);
            that.set('/Visibles/Ejecutar', true);

            that.closeDialog();
            that._ejecutar();
        },

        handleRowChangeGrp: function (e) {
            var that = this;
            let dialogName = that._getOpenedDialogName();
            let dialog = that._getOpenedDialogProperty();
            var row = e.getParameter("rowContext");
            if (row) {
                dialog.selectedGrupo = row.sPath;
            } else {
                dialog.selectedGrupo = '';
            }

            that.set('/' + dialogName, dialog);
        },

        handleAceptarGrp3: function () {
            let that = this;
            let dialog = that._getOpenedDialogProperty();
            let grupoHoja = that.get(dialog.selectedGrupo).HOJA_RUTA;
            let contador = that.get(dialog.selectedGrupo).CONTADOR;
            let texto = that.get(dialog.selectedGrupo).TEXTO;
            that.set('/filters/GrupoHojaRuta', grupoHoja);
            that.set('/filters/Contador', contador);
            that.set('/filters/Texto', texto);
            that.set('/Visibles/HojaRuta', true);
            that.set('/Visibles/Contador', true);
            that.set('/Visibles/Ejecutar', true);

            that.closeDialog();
            that._ejecutar();
        },

        _ejecutar: function () {
            let that = this;
            let filters = that.get('/filters');



            let E_HEADER = {

                CENTRO_PLAN: ": 2RA1",
                CONTADOR: ": 01",
                FECHA: ":28.06.2022",
                PLNAL: "01 - DIECI-RUNNER 35.12",
                PLNNR: ": 000000",
                SERVICIO: ": MONTAJE NEUMATICOS",
                STATUS: ": CTEC FENA KKMP NLIQ PREC",
                USUARIO: ": DEB",
                ZORDEN: ": 67623011",
            };

            let E_HEADER_1 = {

                ANO: ": 2019",
                CENTRO_PLAN: ": 2RA1 - RAC Rancagua",
                DENOMINACION: ": NP300 CS 4X2 2.3TDI",
                FECHA_CRE: ": 28.06.2022",
                MARCA_MODELO: ": NISSAN / NP300",
                MATERIAL: ": 840695 - NP300 CS 4x2 2.3TDI",
                OBJ_TEC: ": 1010 - Camioneta",
                ORDEN: ": 67623011",
                PLNAL: "01 - DIECI-RUNNER 35.12",
                PLNNR: ": 00000034 / 01 - DIECI-RUNNER 35.12",
                SERVICIO: ": MONTAJE NEUMATICOS",
                STATUS: ": CTEC FENA KKMP NLIQ PREC",
                USUARIO: ": DEB",

            };

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

            let T_SALIDA = [];
            T_SALIDA.push({
                ANZZL: "1 ",
                ARBEH: "HRA",
                ARBEI: 10,
                ARBID: "MESEMQ",
                ARBPL: "",
                FLAG: "",
                ILAR01: "CS06",
                ILTEXT: "REPARACIÓN HABIL MAQUINARIA CONSTRUC.",
                KTSCH: "A810917",
                LTXA1: "PRE-ENTREGA MECANICA",
                MATERIALES: "",
                PLNKN: "00000001",
                STEUS: "SAL1",
                UVORNR: "",
                VORNR: "0002",
            });

            T_SALIDA.push({
                ANZZL: "1 ",
                ARBEH: "HRA",
                ARBEI: 1.5,
                ARBID: "MESEMQ",
                ARBPL: "",
                FLAG: "",
                ILAR01: "CS06",
                ILTEXT: "REPARACIÓN HABIL MAQUINARIA CONSTRUC.",
                KTSCH: "A810919",
                LTXA1: "PRE-ENTREGA LUBRICACION",
                MATERIALES: "",
                PLNKN: "00000002",
                STEUS: "SAL1",
                UVORNR: "",
                VORNR: "0004",
            });

            T_SALIDA.push({
                ANZZL: "1 ",
                ARBEH: "HRA",
                ARBEI: 1,
                ARBID: "MESEMQ",
                ARBPL: "",
                FLAG: "",
                ILAR01: "CS06",
                ILTEXT: "REPARACIÓN HABIL MAQUINARIA CONSTRUC.",
                KTSCH: "B450445",
                LTXA1: "LIMPIAR CABINA",
                MATERIALES: "",
                PLNKN: "00000003",
                STEUS: "SAL1",
                UVORNR: "",
                VORNR: "0006",
            });

            let result = {

                E_HEADER: E_HEADER,
                E_HEADER_1: E_HEADER_1,
                E_RETORNO: E_RETORNO,
                T_SALIDA: T_SALIDA

            };

            let cabecera = utils.copyObject(
                [
                    'ANO',
                    'DENOMINACION',
                    'FECHA_CRE',
                    'MARCA_MODELO',
                    'MATERIAL',
                    'OBJ_TEC',
                    'PLNNR',
                    'USUARIO',
                    'ORDEN',
                    'CENTRO_PLAN',
                    'SERVICIO',
                    'STATUS',
                    'PLNAL'
                ],
                [
                    'ANIO',
                    'DENOMINACION',
                    'FECHA',
                    'MARCA_MODELO',
                    'MATERIAL',
                    'OBJETO_TECNICO',
                    'HOJA_RUTA',
                    'USUARIO',
                    'ORDEN',
                    'CENTRO_LOGISTICO',
                    'SERVICIO',
                    'STATUS',
                    'CONTADOR'
                ],
                result.E_HEADER_1
            );

            for (var key in cabecera) {
                cabecera[key] = cabecera[key].trim().replace(/^:/, '').trim();
            }

            let operaciones = utils.copyObjectArray([
                'ANZZL',
                'ARBEH',
                'ARBEI',
                'ARBID',
                'ARBPL',
                'ILAR01',
                'ILTEXT',
                'KTSCH',
                'LTXA1',
                'PLNKN',
                'STEUS',
                'UVORNR',
                'VORNR',
                'MATERIALES'
            ], [
                'ANZZL',
                'ARBEH',
                'TRABAJO_OP',
                'ARBID',
                'ARBPL',
                'CLASE_ACTIVIDAD',
                'TEXTO_CLASE_ACTIVIDAD',
                'CLAVE_MODELO',
                'TEXTO',
                'PLNKN',
                'STEUS',
                'UVORNR',
                'OPERACION',
                'MATERIALES'
            ], result.T_SALIDA, false);

            for (var i = 0; i < operaciones.length; i++) {
                operaciones[i].FLAG = false;
            }
            that.set('/Cabecera', cabecera);
            that.set('/Operaciones', operaciones);
            that.set('/i_Operacion', -1);
            that.set('/Visibles/Datos');
            that._resizeTableColumns("tblOperaciones");
            /*
                        utils.httpCall({
                            service: 'ZPMMF_001_EJECUTAALV',
                            query: {
                                I_ZORDEN: filters.NroOrden,
                                I_PLNNR: filters.GrupoHojaRuta,
                                I_PLNAL: filters.Contador
                            },
                            type: 'POST',
                            success: function (result) {
            
                                let cabecera = utils.copyObject(
                                    [
                                        'ANO',
                                        'DENOMINACION',
                                        'FECHA_CRE',
                                        'MARCA_MODELO',
                                        'MATERIAL',
                                        'OBJ_TEC',
                                        'PLNNR',
                                        'USUARIO',
                                        'ORDEN',
                                        'CENTRO_PLAN',
                                        'SERVICIO',
                                        'STATUS',
                                        'PLNAL'
                                    ],
                                    [
                                        'ANIO',
                                        'DENOMINACION',
                                        'FECHA',
                                        'MARCA_MODELO',
                                        'MATERIAL',
                                        'OBJETO_TECNICO',
                                        'HOJA_RUTA',
                                        'USUARIO',
                                        'ORDEN',
                                        'CENTRO_LOGISTICO',
                                        'SERVICIO',
                                        'STATUS',
                                        'CONTADOR'
                                    ],
                                    result.E_HEADER_1
                                );
            
                                for (var key in cabecera) {
                                    cabecera[key] = cabecera[key].trim().replace(/^:/, '').trim();
                                }
            
                                let operaciones = utils.copyObjectArray([
                                    'ANZZL',
                                    'ARBEH',
                                    'ARBEI',
                                    'ARBID',
                                    'ARBPL',
                                    'ILAR01',
                                    'ILTEXT',
                                    'KTSCH',
                                    'LTXA1',
                                    'PLNKN',
                                    'STEUS',
                                    'UVORNR',
                                    'VORNR',
                                    'MATERIALES'
                                ], [
                                    'ANZZL',
                                    'ARBEH',
                                    'TRABAJO_OP',
                                    'ARBID',
                                    'ARBPL',
                                    'CLASE_ACTIVIDAD',
                                    'TEXTO_CLASE_ACTIVIDAD',
                                    'CLAVE_MODELO',
                                    'TEXTO',
                                    'PLNKN',
                                    'STEUS',
                                    'UVORNR',
                                    'OPERACION',
                                    'MATERIALES'
                                ], result.T_SALIDA, false);
                                for (var i = 0; i < operaciones.length; i++) {
                                    operaciones[i].FLAG = false;
                                }
                                that.set('/Cabecera', cabecera);
                                that.set('/Operaciones', operaciones);
                                that.set('/i_Operacion', -1);
                                that.set('/Visibles/Datos');
                                that._resizeTableColumns("tblOperaciones");
                            }
                        });
            
                        */
        },

        handleOperacionesSelectChange: function (e) {
            var that = this;
            var row = e.getParameter("rowContext");
            if (row) {
                that.selectedOperacion = row.sPath;
            } else {
                that.selectedOperacion = '';
            }
        },

        handleComponentes: function () {
            sap.ui.getCore().getMessageManager().removeAllMessages();

            let that = this;
            // let index = that.get('/i_Operacion');
            // let operaciones = that.get('/Operaciones');
            utils.httpCall({
                service: 'ZPMMF_005_TRAEMATERIALES',
                query: {
                    I_PLNAL: that.get('/filters/Contador'),
                    I_PLNNR: that.get('/filters/GrupoHojaRuta'),
                    I_ORDEN: that.get(that.selectedOperacion).PLNKN,
                    I_SALIDA: {}
                },
                type: 'POST',

                success: function (result) {
                    if (result.T_MATERIALES.length > 0) {
                        let materiales = utils.copyObjectArray([
                            'MATERIAL',
                            'TEXTO',
                            'MENGE',
                            'MEINS'
                        ], [
                            'MATERIAL',
                            'DESCRIPCION',
                            'CANTIDAD',
                            'UNIDAD'
                        ], result.T_MATERIALES, false);
                        that.openDialog('manoObra.Materiales', { Materiales: materiales });
                    } else if (result.E_RETURN.TYPE !== '') {
                        that._messageManager([result.E_RETURN]);
                    }
                }
            });
        },
        handleGrabar: function () {

            this.addMessage("Se ha guardado con éxito", "S");
            /*
            let that = this;
            let filters = that.get('/filters');
            let operaciones = utils.copyObjectArray([
                'ANZZL',
                'ARBEH',
                'TRABAJO_OP',
                'ARBID',
                'ARBPL',
                'CLASE_ACTIVIDAD',
                'TEXTO_CLASE_ACTIVIDAD',
                'CLAVE_MODELO',
                'TEXTO',
                'PLNKN',
                'STEUS',
                'UVORNR',
                'OPERACION',
                'FLAG'
            ], [
                'ANZZL',
                'ARBEH',
                'ARBEI',
                'ARBID',
                'ARBPL',
                'ILAR01',
                'ILTEXT',
                'KTSCH',
                'LTXA1',
                'PLNKN',
                'STEUS',
                'UVORNR',
                'VORNR',
                'FLAG'
            ], that.get('/Operaciones'), false).filter(function (o) {
                return o.FLAG;
            });

            for (var i = 0; i < operaciones.length; i++) {
                operaciones[i].FLAG = 'X';
            }

            utils.httpCall({
                service: 'ZPMMF_002_CARGAMANOBRA',
                query: {
                    I_ORDEN: filters.NroOrden,
                    I_PLNAL: filters.Contador,
                    I_PLNNR: filters.GrupoHojaRuta,
                    I_TX: filters.Transaccion,
                    T_SALIDA: operaciones
                },
                type: 'POST',
                success: function (result) {
                    that._messageManager([result.E_RETORNO]);
                    that._ejecutar();
                }
            });

            
            
*/
        }




    });

});