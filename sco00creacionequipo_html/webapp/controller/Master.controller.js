// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sapui5agendar/sco00creacionequipo_html/utils/utils",
    "sapui5agendar/sco00creacionequipo_html/model/models",
    "sapui5agendar/sco00creacionequipo_html/utils/validator",
    "sap/ui/table/Row",
], function (Controller, utils, models, Validator) {
    "use strict";

    return Controller.extend("sapui5agendar.sco00creacionequipo_html.controller.Master", {
        /**
         * Busquedas rapidas de cliente, vin y patente
         */
        searchCliente: function () {

            let validator = new Validator();
            let valid = validator.validate(this.byId("txtRutCliente"));

            let cliente = {};

            cliente.ciudad = "Santiago";
            cliente.comuna = "Santiago";
            cliente.email = "";
            cliente.fax = "";
            cliente.names = "Carlos Santander Pereira";
            cliente.pais = "Chile";
            cliente.phone = "95335225";
            cliente.region = "Región Metropolitana";
            cliente.rut = "7258542-9";
            cliente.street = "DOMEYKO      SANTIAGO CENTRO 2013";
            cliente.tratamiento = "Señor";

            this.set('/datosCliente', cliente);

            /*

            if (valid) {
                let rut = this.get('/equipo/CLIENTE');
                utils.httpCall({
                    service: 'ZNWM_SD_HELP_CLIENTE',
                    query: { CLIENTE: rut },
                    success: resp => {
                        if (resp.IT_BAPIRETURN[0].TYPE === 'E') {
                            sap.m.MessageBox.warning(resp.IT_BAPIRETURN[0].MESSAGE);
                            this.set('/datosCliente', {})
                        } else {
                            let clienteRfc = resp.IT_CLIENTE[0];
                            let cliente = {
                                rut,
                                tratamiento: clienteRfc.ANRED,
                                names: clienteRfc.NAME1,
                                street: clienteRfc.STRAS,
                                phone: clienteRfc.TELF1,
                                fax: clienteRfc.TELFX,
                                email: clienteRfc.KNURL,
                            };
                            let pais = this.get('/paises').find(p => p.CODIGO === clienteRfc.LAND1);
                            if (!pais) {
                                this.addMessage('El RUT ingresado no esta registrado');
                            } else {
                                cliente.pais = pais.DESCRIPCION;
                                utils.httpCall({
                                    service: 'ZNWM_SD_HELP_REGION',
                                    query: { PAIS: clienteRfc.LAND1 },
                                    success: regiones => {
                                        let region = regiones.IT_REGION.find(p => p.CODIGO === clienteRfc.REGIO);
                                        cliente.region = region ? region.DESCRIPCION : 'NO REGISTRA';

                                        utils.httpCall({
                                            service: 'ZNWM_SD_HELP_CIUDAD',
                                            query: { PAIS: clienteRfc.LAND1, REGION: clienteRfc.REGIO },
                                            success: ciudades => {
                                                let ciudad = ciudades.IT_CIUDAD.find(p => p.CODIGO === clienteRfc.COUNC);
                                                cliente.ciudad = ciudad ? ciudad.DESCRIPCION : 'NO REGISTRA';

                                                utils.httpCall({
                                                    service: 'ZNWM_SD_HELP_COMUNA',
                                                    query: { PAIS: clienteRfc.LAND1, REGION: clienteRfc.REGIO },
                                                    success: comunas => {
                                                        let comuna = comunas.IT_COMUNA.find(p => p.CODIGO === clienteRfc.CITYC);
                                                        cliente.comuna = comuna ? comuna.DESCRIPCION : 'NO REGISTRA';

                                                        this.set('/datosCliente', cliente)
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }

                        }
                    }
                })
            }

            */
        },
        handleBuscarPatente: function () {
            this.handleBuscarPatenteOVin(true);
        },
        handleBuscarVin: function () {
            this.handleBuscarPatenteOVin(false);
        },
        handleBuscarPatenteOVin: function (isPatente) {
            if (isPatente) {
                var inputId = 'txtPatente';
                var query = { I_PATENTE: this.get('/equipo/MATRICULA_I') };
                var emptyResult = () => this.set('/equipo/EQUIPO_I', '');
            } else {
                var inputId = 'txtVIN';
                var query = { I_VIN: this.get('/equipo/EQUIPO_I') };
                var emptyResult = () => this.set('/equipo/MATRICULA_I', '');
            }


            let validator = new Validator();
            let valid = validator.validate(this.byId(inputId));


            let datosSK = {};

            datosSK.ATT_ANO = "2021";
            datosSK.ATT_CILINDRADA = "1600";
            datosSK.ATT_TIPO_COMBUSTIBLE = "93";
            datosSK.ATT_VIN = "5356365ADFASDF";
            datosSK.ATT_PATENTE = "BBWW68";
            datosSK.ATT_FAMILIA = "FAMILIA1";
            datosSK.ATT_MARCA = "Renault";

            this.cargarDatosSK(datosSK, isPatente);

            /*

            if (valid) {
                utils.httpCall({
                    service: 'Z233R_RFC_GETFROM_VINPATENTE',
                    query,
                    success: resp => {
                        if (resp.GT_RESULT_MSG[0].TYPE === 'E') {
                            sap.m.MessageBox.warning(resp.GT_RESULT_MSG[0].MESSAGE);
                        } else {
                            let datosSK = {};
                            if (resp.GT_RESULT_INFO.length) {
                                resp.GT_RESULT_INFO.forEach(i => {
                                    if (i.NOMBRE === 'SKB_ANO_MODELO')
                                        datosSK.ATT_ANO = i.VALOR;
                                    if (i.NOMBRE === 'SKB_CILINDRADA')
                                        datosSK.ATT_CILINDRADA = i.VALOR;
                                    if (i.NOMBRE === 'SKB_TIPO_COMBUSTIBLE')
                                        datosSK.ATT_TIPO_COMBUSTIBLE = i.VALOR;
                                    if (i.NOMBRE === 'VIN_VEHICULO')
                                        datosSK.ATT_VIN = i.VALOR;
                                    if (i.NOMBRE === 'PATENTE_VEHICULO')
                                        datosSK.ATT_PATENTE = i.VALOR;
                                    if (i.NOMBRE === 'SKB_FAMILIA')
                                        datosSK.ATT_FAMILIA = i.VALOR;
                                    if (i.NOMBRE === 'SKB_MARCA')
                                        datosSK.ATT_MARCA = i.VALOR;
                                });
                                this.cargarDatosSK(datosSK, isPatente);
                            } else {
                                this.set('/equipo/CILINDRADA', 0);
                                emptyResult();
                            }
                        }
                    }
                })
            }

            */
        },
        cargarDatosSK(datosSK, fromPatente) {
            let cilindrada = datosSK.ATT_CILINDRADA.split(' ')[0];
            this.set('/equipo/CILINDRADA', cilindrada);

            this.set('/equipo/filters', {
                descripcion: datosSK.ATT_MARCA + ' ' + datosSK.ATT_FAMILIA,
                sector: 'A1'
            });

            if (fromPatente) {
                this.set('/equipo/EQUIPO_I', '');
                this.set('/equipo/EQUIPO_I', datosSK.ATT_VIN);
            } else {
                this.set('/equipo/MATRICULA_I', '');
                this.set('/equipo/MATRICULA_I', datosSK.ATT_PATENTE);
            }
            this.set('/equipo/tipoCombustible', datosSK.ATT_TIPO_COMBUSTIBLE);
            this.set('/equipo/ano', datosSK.ATT_ANO);
        },

        /**
         * Busqueda de materiales
         */
        openBusquedaMaterialDialog: function () {
            let dialogModel = this.get('/openedDialog0');
            this.openDialog('BusquedaMaterial', dialogModel);
            if (!dialogModel) {
                this.setToCurrentDialog('filters', {});
                this.setToCurrentDialog('filters/IMP_CAMPO2', this.get('/sectores/0/SPART'));
            }
            if (this.get('/equipo/filters')) {
                this.setToCurrentDialog('filters/IMP_CAMPO5', this.get('/equipo/filters/descripcion'));
                this.setToCurrentDialog('filters/IMP_CAMPO2', this.get('/equipo/filters/sector'));
            }
        },
        handleSearchMaterial: function () {
            this[this.getCurrentDialogModel()].setBusy(true);
            this.setToCurrentDialog('selectedRow', -1);
            this.setToCurrentDialog('filters/IMP_CAMPO5', this.getFromCurrentDialog('filters/IMP_CAMPO5') ? this.getFromCurrentDialog('filters/IMP_CAMPO5').toUpperCase() : '');

            let IT_MATERIAL = [];

            IT_MATERIAL.push({
                CAMPO1: "10007",
                CAMPO2: "A00100200400000000",
                CAMPO3: "AVEO SEDAN LS NB 1.4 MT",
                CAMPO4: "94",
                CAMPO5: "",
                CAMPO6: "",
                CAMPO7: "                                      0",
                CAMPO8: "",
                CAMPO9: "",
                CAMPO10: "           0",
                CAMPO11: "0",
                CAMPO12: "           0",
                CAMPO13: "           0",
                CAMPO14: "",
                CAMPO15: "NORM",
                CAMPO16: "0",
                CAMPO17: "0",
                CAMPO18: "",
                CAMPO19: "",
                CAMPO20: "           6",
                CAMPO21: "           0",
                CAMPO22: "",
                CAMPO23: "",
                CAMPO24: "",
                CAMPO25: "",
            });

            this.setToCurrentDialog('rows', IT_MATERIAL);
            this[this.getCurrentDialogModel()].setBusy(false);


            /*
            utils.httpCall({
                service: 'Z238R_HELP_MATERIAL',
                query: this.getFromCurrentDialog('filters'),
                success: resp => {
                    this.setToCurrentDialog('rows', resp.IT_MATERIAL);
                    this[this.getCurrentDialogModel()].setBusy(false);
                }
            });

            */
        },
        handleSelectMaterial: function () {
            let selectedIndex = this.getFromCurrentDialog('selectedRow');
            let elemento = this.getFromCurrentDialog('rows/' + selectedIndex);

            let IT_EMPLAZAMIENTO = [];

            IT_EMPLAZAMIENTO.push({
                CENTRO: "",
                COD_AREA: "110",
                EMPLAZAMIENTO: "",
                ENCARGADO: "RESEAU",
                GRUPO_AUTORIZA: "0001",
                MANDT: "300",
                NOM_AREA: "",
                NOM_EMPLAZAMIENTO: "",
                NOM_ENCARGADO: "Recepcion Taller Automoviles",
                NOM_GRUPO_AUTO: "Grp Serv.Liviano",
                NOM_OBJETO_TEC: "Automóvil",
                NOM_PTO_MEDIDA: "",
                NOM_TIPO_EQUIPO: "Vehiculos",
                OBJETO_TECNICO: "1002",
                PTO_MED_1: "KM.",
                PTO_MED_2: "",
                TIPO_EQUIPO: "V",
            });


            let datosMaterial = Object.assign(IT_EMPLAZAMIENTO[0], elemento);
            datosMaterial.KM = !!datosMaterial.PTO_MED_1;
            datosMaterial.HR = !!datosMaterial.PTO_MED_2;
            this.set('/datosMaterial', datosMaterial);

            this.closeDialog();

            /*
                        utils.httpCall({
                            service: 'ZNWM_CS_TOOLS_EMPLAZAMIENTO',
                            query: { MATERIAL: elemento.CAMPO1 },
                            success: resp => {
                                let error = resp.IT_BAPIRETURN.find(m => m.TYPE === 'E');
                                if (error) {
                                    sap.m.MessageBox.warning(error.MESSAGE);
                                } else {
                                    let datosMaterial = Object.assign(resp.IT_EMPLAZAMIENTO[0], elemento);
                                    datosMaterial.KM = !!datosMaterial.PTO_MED_1;
                                    datosMaterial.HR = !!datosMaterial.PTO_MED_2;
                                    this.set('/datosMaterial', datosMaterial)
                                }
                                this.closeDialog();
                            }
                        });
            
                        */
        },

        /**
         * Guardar
         */
        handleSave: function () {




            if (this.isValidEquipo()) {

                sap.m.MessageBox.success("El equipo  ha sido creado con éxito");

                /*
                utils.httpCall({
                    service: 'ZNWM_CS_TOOLS_BUSCA_USUARIO',
                    query: { USUARIO: utils.getUser() },
                    success: resp => {
                        let serie = ('00000000000000000' + this.get('/equipo/EQUIPO_I').toUpperCase()).slice(-17);
                        let vin = this.get('/equipo/EQUIPO_I').toUpperCase();
                        let query = {
                            CENTRO_I: resp.CENTRO,
                            MATERIAL_I: this.get('/datosMaterial/CAMPO1'),
                            TEXTO_TECNICO_I: this.get('/datosMaterial/CAMPO3'),
                            CLIENTE: this.get('/datosCliente/rut'),
                            EQUIPO_I: vin,
                            SERIE_I: vin,
                            MATRICULA_I: this.get('/equipo/MATRICULA_I').toUpperCase(),
                            ANO_FAB_I: this.get('/equipo/ano'),
                            FLAG_KM: this.get('/datosMaterial/KM') ? 'X' : '',
                            FLAG_HR: this.get('/datosMaterial/HR') ? 'X' : '',
                            CLASE_EQUIPOS_I: this.get('/datosMaterial/OBJETO_TECNICO'),
                            TIPO_EQUIPO_I: this.get('/datosMaterial/TIPO_EQUIPO'),
                            GR_AUTOR_I: this.get('/datosMaterial/GRUPO_AUTORIZA'),
                            RESPONSABLE: this.get('/datosMaterial/ENCARGADO'),
                            AREA_EMPREA_I: this.get('/datosMaterial/COD_AREA'),
                            COMBUSTIBLE: this.get('/equipo/tipoCombustible'),
                            CILINDRADA: this.get('/equipo/CILINDRADA'),
                            POLIZA: this.get('/equipo/POLIZA'),
                        };
 
                        utils.httpCall({
                            service: 'ZNWM_CS_CREA_VIN',
                            query,
                            success: resp => {
                                if (resp.IT_BAPIRETURN.TYPE) {
                                    this.addMessage(resp.IT_BAPIRETURN.MESSAGE, resp.IT_BAPIRETURN.TYPE);
                                }
 
                                if (resp.IT_BAPIRETURN.TYPE !== "E" && resp.EQUIPO_CREADO) {
                                    this.onInit();
                                    sap.m.MessageBox.success("El equipo " + resp.EQUIPO_CREADO + " ha sido creado con éxito");
                                }
                            }
                        })
                    }
                });

                */
            }


        },
        isValidEquipo: function () {
            sap.ui.getCore().getMessageManager().removeAllMessages();

            let errors = [];
            if (!this.get('/equipo/MATRICULA_I') || !this.get('/equipo/EQUIPO_I')) {
                errors.push('Debe ingresar VIN y PATENTE (matricula)')
            }
            if (!this.get('/datosMaterial/CAMPO1')) {
                errors.push('Debe seleccionar un Equipo o Material Valido')
            }
            if (!this.get('/datosCliente/rut')) {
                errors.push('Debe Ingresar un Cliente Valido para el Equipo')
            }
            if (!this.get('/equipo/CILINDRADA')) {
                errors.push('Debe Ingresar el valor de la CILINDRADA')
            }

            errors.forEach(e => this.addMessage(e));
            return !errors.length;
        },

        /**
         * Generic dialog function
         */
        openDialog: function (fragment, result) {
            let model = this.getView().getModel();
            let oView = this.getView();
            for (var i = 0; this['openedDialog' + i] && !this['openedDialog' + i].bIsDestroyed; i++);
            let dialog = 'openedDialog' + i;
            model.setProperty("/" + dialog, result || {});

            this[dialog] = sap.ui.xmlfragment(oView.getId(), "sapui5agendar.sco00creacionequipo_html.view." + fragment, this);
            oView.addDependent(this[dialog]);
            this[dialog].bindElement("/" + dialog);

            //Cargo modelo limpio
            if (this['clearDialogModel_' + fragment])
                this['clearDialogModel_' + fragment]();

            this[dialog].open();
        },
        closeDialog: function () {
            for (var i = 0; this['openedDialog' + i] && !this['openedDialog' + i].bIsDestroyed; i++);
            let dialog = 'openedDialog' + (i - 1);
            this[dialog].close();
            this[dialog].destroy();
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


        /**
         * Init
         */
        onInit: function () {
            this._basicInit();
            this.set('/equipo', {});

            let IT_PAIS = [];

            IT_PAIS.push({
                CODIGO: "KP",
                DESCRIPCION: "Corea del Norte"
            });

            IT_PAIS.push({
                CODIGO: "KR",
                DESCRIPCION: "Corea del Sur"
            });

            IT_PAIS.push({
                CODIGO: "CR",
                DESCRIPCION: "Costa Rica"
            });

            this.set('/paises', IT_PAIS);

            /*
            utils.httpCall({
                service: 'ZNWM_SD_HELP_PAIS',
                success: resp => {
                    this.set('/paises', resp.IT_PAIS);
                }
            });

            */

            let T_SALIDA = [];

            T_SALIDA.push({
                CODIGO: "93",
                DESCRIPCION: "Gasolina 93 octanos"
            });

            T_SALIDA.push({
                CODIGO: "95",
                DESCRIPCION: "Gasolina 95 octanos"
            });

            T_SALIDA.push({
                CODIGO: "97",
                DESCRIPCION: "Gasolina 97 octanos"
            });

            this.set('/tiposCombustible', T_SALIDA);

            /*
            utils.httpCall({
                service: 'ZNWM_CS_TOOLS_BUSCA_COMB',
                success: resp => {
                    this.set('/tiposCombustible', resp.T_SALIDA);
                    this.set('/equipo/tipoCombustible', resp.T_SALIDA[0].CODIGO);
                }
            });

            */

            let IT_T001W = [];

            IT_T001W.push({
                ACHVM: "",
                ADRNR: "0000022576",
                AWSLS: "",
                BEDPL: "X",
                BETOL: "180",
                BWKEY: "1IQ2",
                BZIRK: "",
                BZQHL: "",
                CHAZV: "",
                CHAZV_OLD: "",
                CITYC: "",
                COUNC: "",
                DEP_STORE: "",
                DVSART: "",
                EKORG: "1000",
                FABKL: "CL",
                FPRFW: "",
                FSH_BOM_MAINTENANCE: "",
                FSH_MG_ARUN_REQ: "",
                FSH_SEAIM: "",
                IWERK: "1SA1",
                J_1BBRANCH: "",
                KKOWK: "",
                KORDB: "",
                KUNNR: "1IQ2",
                LAND1: "CL",
                LET01: 10,
                LET02: 20,
                LET03: 30,
                LIFNR: "1IQ2",
                MANDT: "300",
                MGVLAREVAL: "",
                MGVLAUPD: "",
                MGVUPD: "",
                MISCH: "",
                NAME1: "A. Hospicio Parque Empresarial",
                NAME2: "1IQ2 - A. Hospicio Parque Empr",
                NODETYPE: "",
                NSCHEMA: "",
                OIHCREDIPI: "",
                OIHVTYPE: "",
                OILIVAL: "",
                ORT01: "Iquique",
                PFACH: "",
                PKOSA: "",
                PSTLZ: "",
                REGIO: "01",
                SGT_STAT: "",
                SOURCING: "",
                SPART: "00",
                SPRAS: "S",
                STORETYPE: "",
                STRAS: "Faena Cerro Colorado S/N",
                TAXIW: "",
                TXJCD: "",
                TXNAM_MA1: "FT_PREF_DUNN",
                TXNAM_MA2: "FT_PREF_DUNN_TWO",
                TXNAM_MA3: "FT_PREF_FRAME",
                VKORG: "1000",
                VLFKZ: "",
                VSTEL: "0001",
                VTBFI: "",
                VTWEG: "VD",
                WERKS: "1IQ2",
                WKSOP: "",
                ZONE1: "",
            });

            IT_T001W.push({
                ACHVM: "",
                ADRNR: "0000611211",
                AWSLS: "",
                BEDPL: "X",
                BETOL: "180",
                BWKEY: "1CC7",
                BZIRK: "",
                BZQHL: "",
                CHAZV: "X",
                CHAZV_OLD: "X",
                CITYC: "",
                COUNC: "",
                DEP_STORE: "",
                DVSART: "",
                EKORG: "1000",
                FABKL: "CL",
                FPRFW: "",
                FSH_BOM_MAINTENANCE: "",
                FSH_MG_ARUN_REQ: "",
                FSH_SEAIM: "",
                IWERK: "1SA1",
                J_1BBRANCH: "",
                KKOWK: "",
                KORDB: "",
                KUNNR: "1CC7",
                LAND1: "CL",
                LET01: 10,
                LET02: 20,
                LET03: 30,
                LIFNR: "1CC7",
                MANDT: "300",
                MGVLAREVAL: "",
                MGVLAUPD: "",
                MGVUPD: "",
                MISCH: "",
                NAME1: "Alemparte",
                NAME2: "1CC7 - Alemparte",
                NODETYPE: "",
                NSCHEMA: "",
                OIHCREDIPI: "",
                OIHVTYPE: "",
                OILIVAL: "",
                ORT01: "Hualpén",
                PFACH: "",
                PKOSA: "",
                PSTLZ: "",
                REGIO: "08",
                SGT_STAT: "",
                SOURCING: "",
                SPART: "00",
                SPRAS: "S",
                STORETYPE: "",
                STRAS: "Arteaga Alemparte 9153",
                TAXIW: "",
                TXJCD: "",
                TXNAM_MA1: "FT_PREF_DUNN",
                TXNAM_MA2: "FT_PREF_DUNN_TWO",
                TXNAM_MA3: "FT_PREF_FRAME",
                VKORG: "1000",
                VLFKZ: "",
                VSTEL: "0001",
                VTBFI: "",
                VTWEG: "VD",
                WERKS: "1CC7",
                WKSOP: "",
                ZONE1: "",
            });


            this.set('/centros', IT_T001W);
            /*
                        utils.httpCall({
                            service: 'ZNWM_SD_HELP_CENTROS',
                            success: resp => {
                                this.set('/centros', resp.IT_T001W);
                            }
                        });
            
                         */

            let GT_SECTORES = [];

            GT_SECTORES.push({
                MANDT: "300",
                SPART: "A1",
                SPRAS: "S",
                VTEXT: "Autos Usados"
            });

            GT_SECTORES.push({
                MANDT: "300",
                SPART: "A3",
                SPRAS: "S",
                VTEXT: "Camión Liviano"
            });

            GT_SECTORES.push({
                MANDT: "300",
                SPART: "C0",
                SPRAS: "S",
                VTEXT: "Camiones Nuevos"
            });

            GT_SECTORES.push({
                MANDT: "300",
                SPART: "C1",
                SPRAS: "S",
                VTEXT: "Camiones Usados"
            });

            this.set('/sectores', GT_SECTORES);
            /*
                        utils.httpCall({
                            service: 'Z376R_SECTORESEQUIPOSSERVICIO',
                            success: resp => {
                                this.set('/sectores', resp.GT_SECTORES);
                            }
                        });
            
                        */

            //años
            let year = new Date().getFullYear();
            let years = [];
            for (let i = year + 1; i >= year - 29; i--)
                years.push({ ano: i });
            this.set('/anos', years);
            this.set('/equipo/ano', years[0].ano);
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
        },

        /**
         * Other
         */
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
        get: function (path) {
            return this.model.getProperty(path);
        },
        set: function (path, value) {
            return this.model.setProperty(path, value);
        },

        /**
         * Error handling
         */
        handleMessagePopoverPress: function (oEvent) {
            this._oMessagePopover.openBy(oEvent.getSource());
        },
        addMessage: function (msg, type, openTray) {
            type = type || 'e';
            openTray = openTray !== undefined ? openTray : true;
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
            if (openTray)
                setTimeout(() => this._oMessagePopover.openBy(this.byId('errorPopover')), 0);
        },
    });

});