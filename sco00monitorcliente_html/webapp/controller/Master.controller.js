sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sapui5agendar/sco00monitorcliente_html/utils/utils",
    "sapui5agendar/sco00monitorcliente_html/model/models",
    "sapui5agendar/sco00monitorcliente_html/utils/validator",
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, utils, models, Validator) {

        "use strict";

        return Controller.extend("sapui5agendar.sco00monitorcliente_html.controller.Master", {
            onInit: function () {
                this._basicInit();
            },

            _basicInit: function () {
                let model = models.createLocalModel();

                let view = this.getView();

                model.setProperty('/filters', {});
                view.setModel(model);
                utils.view = view;
                utils.controller = this;


                let desde = new Date();
                desde.setMonth(desde.getMonth() - 6);
                let hasta = new Date();

                model.setProperty('/filters/Desde', (desde.getMonth() + 1) + '/' + desde.getFullYear());
                model.setProperty('/filters/Hasta', (hasta.getMonth() + 1) + '/' + hasta.getFullYear());

                this._iniciarCampos();

                var rut = this.getAppParam("rut");
                if (rut) {
                    model.setProperty('/filters/Cliente', rut);
                }

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

            _iniciarCampos: function () {

                let oModel = this.getView().getModel();
                let that = this;
                let GT_T001 = [];

                GT_T001.push({
                    ADRNR: "0000022549",
                    BAPOVAR: "",
                    BUKRS: "1000",
                    BUKRS_GLOB: "",
                    BUTXT: "Sociedad 1",
                    BUVAR: "2",
                    DKWEG: "",
                    DTAMTC: "",
                    DTAXR: "",
                    DTPROV: "",
                    DTTAXC: "",
                    DTTDSP: "",
                    EBUKR: "",
                    FDBUK: "",
                    FIKRS: "",
                    FMHRDATE: "0000-00-00",
                    FM_DERIVE_ACC: "",
                    FSTVA: "1000",
                    FSTVARE: "",
                    F_OBSOLETE: "",
                    IMPDA: "",
                    INFMT: "ZCL1",
                    KKBER: "CR01",
                    KOKFI: "2",
                    KOPIM: "",
                    KTOP2: "",
                    KTOPL: "PC01",
                    LAND1: "CL",
                    MANDT: "300",
                    MREGL: "",
                    MWSKA: "",
                    MWSKV: "C0",
                    OFFSACCT: "0",
                    OPVAR: "1000",
                    ORT01: "",
                    PERIV: "K4",
                    PP_PDATE: "",
                    PST_PER_VAR: "",
                    RCOMP: "SALFA",
                    SPRAS: "S",
                    STCEG: "",
                    SURCCM: "",
                    TXJCD: "",
                    TXKRS: "2",
                    UMKRS: "",
                    WAABW: "00",
                    WAERS: "CLP",
                    WFVAR: "",
                    WT_NEWWT: "X",
                    XBBBA: "",
                    XBBBE: "",
                    XBBBF: "",
                    XBBKO: "",
                    XBBSC: "",
                    XCESSION: "",
                    XCOS: "",
                    XCOVR: "",
                    XEINK: "",
                    XEXTB: "",
                    XFDIS: "X",
                    XFDMM: "",
                    XFDSD: "",
                    XFMCA: "",
                    XFMCB: "",
                    XFMCO: "",
                    XGJRV: "X",
                    XGSBE: "X",
                    XJVAA: "",
                    XKDFT: "",
                    XKKBI: "X",
                    XMWSN: "",
                    XNEGP: "",
                    XPROD: "",
                    XSKFN: "",
                    XSLTA: "",
                    XSPLT: "",
                    XSTDT: "X",
                    XVALV: "X",
                    XVATDATE: "",
                    XVVWA: "",
                });

                GT_T001.push({
                    ADRNR: "0000022549",
                    BAPOVAR: "",
                    BUKRS: "2000",
                    BUKRS_GLOB: "",
                    BUTXT: "Sociedad 2",
                    BUVAR: "2",
                    DKWEG: "",
                    DTAMTC: "",
                    DTAXR: "",
                    DTPROV: "",
                    DTTAXC: "",
                    DTTDSP: "",
                    EBUKR: "",
                    FDBUK: "",
                    FIKRS: "",
                    FMHRDATE: "0000-00-00",
                    FM_DERIVE_ACC: "",
                    FSTVA: "1000",
                    FSTVARE: "",
                    F_OBSOLETE: "",
                    IMPDA: "",
                    INFMT: "ZCL1",
                    KKBER: "CR01",
                    KOKFI: "2",
                    KOPIM: "",
                    KTOP2: "",
                    KTOPL: "PC01",
                    LAND1: "CL",
                    MANDT: "300",
                    MREGL: "",
                    MWSKA: "",
                    MWSKV: "C0",
                    OFFSACCT: "0",
                    OPVAR: "1000",
                    ORT01: "",
                    PERIV: "K4",
                    PP_PDATE: "",
                    PST_PER_VAR: "",
                    RCOMP: "SALFA",
                    SPRAS: "S",
                    STCEG: "",
                    SURCCM: "",
                    TXJCD: "",
                    TXKRS: "2",
                    UMKRS: "",
                    WAABW: "00",
                    WAERS: "CLP",
                    WFVAR: "",
                    WT_NEWWT: "X",
                    XBBBA: "",
                    XBBBE: "",
                    XBBBF: "",
                    XBBKO: "",
                    XBBSC: "",
                    XCESSION: "",
                    XCOS: "",
                    XCOVR: "",
                    XEINK: "",
                    XEXTB: "",
                    XFDIS: "X",
                    XFDMM: "",
                    XFDSD: "",
                    XFMCA: "",
                    XFMCB: "",
                    XFMCO: "",
                    XGJRV: "X",
                    XGSBE: "X",
                    XJVAA: "",
                    XKDFT: "",
                    XKKBI: "X",
                    XMWSN: "",
                    XNEGP: "",
                    XPROD: "",
                    XSKFN: "",
                    XSLTA: "",
                    XSPLT: "",
                    XSTDT: "X",
                    XVALV: "X",
                    XVATDATE: "",
                    XVVWA: "",
                });

                oModel.setProperty('/Sociedades', GT_T001);
                /*
                            utils.httpCall({
                                service : "ZPWD_072_SD_DICCIO_CONSULTA",
                                query : {},
                                type : "post",
                                success : function (result, status, xhr) {
                                    oModel.setProperty('/Sociedades',result.GT_T001);
                                }
                            });
            
                            */

                oModel.setProperty('/VisibleResultado', false);
                oModel.setProperty('/AntecedentesComerciales', {
                    Detalles: {
                        Cotizaciones: [],
                        Facturas: [],
                        Ordenes: [],
                        Leasing: []
                    }
                });
                oModel.setProperty('/AntecedentesFinancieros', {
                    ControlCreditos: {},
                    DocumentosMorosos: [],
                    Descripciones: {
                        CreditoCliente: [],
                        EquipoResponsable: [],
                        ViasPago: [],
                        CondicionPago: []
                    }
                });
            },

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

            handleSearch: function () {
                let model = this.getView().getModel();
                let that = this;

                model.setProperty('/VisibleResultado', false);
                model.setProperty('/filters/Fechas_State', sap.ui.core.ValueState.None);
                model.setProperty('/filters/Fechas_State_Text', '');


                let validator = new Validator();
                let valid = validator.validate(this.byId("filters"));
                if (valid) {
                    let sociedades = model.getProperty('/Sociedades');
                    let sociedad = sociedades.find(function (s) { return s.BUKRS == model.getProperty('/filters/i_Sociedad') });
                    let rut = model.getProperty('/filters/Cliente');

                    let desde = model.getProperty('/filters/Desde').split('/');
                    let hasta = model.getProperty('/filters/Hasta').split('/');

                    let desdeString = desde[1] + ('0' + desde[0]).slice(-2);
                    let hastaString = hasta[1] + ('0' + hasta[0]).slice(-2);


                    if (desdeString <= hastaString) {
                        //Datos cliente
                        let oFilters = {
                            BUKRS: sociedad.BUKRS,
                            VKORG: sociedad.BUKRS,
                            KUNNR: rut
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
                        let T_KNVK = [];
                        let T_KNVP = [];


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
                        let T_ZKNVPT = [];

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

                        model.setProperty('/DatosCliente', result3);

                        let GT_T014T = [];

                        GT_T014T.push({
                            KKBER: "CR01",
                            KKBTX: "no Seriados",
                            MANDT: "",
                            SPRAS: "",
                        });

                        GT_T014T.push({
                            KKBER: "CR02",
                            KKBTX: "Seriados",
                            MANDT: "",
                            SPRAS: "",
                        });


                        GT_T014T.push({
                            KKBER: "CR03",
                            KKBTX: "Maquinaria Agrícola",
                            MANDT: "",
                            SPRAS: "",
                        });

                        GT_T014T.push({
                            KKBER: "CR10",
                            KKBTX: "N&B",
                            MANDT: "",
                            SPRAS: "",
                        });

                        GT_T014T.push({
                            KKBER: "CR80",
                            KKBTX: "Repuestos",
                            MANDT: "",
                            SPRAS: "",
                        });

                        GT_T014T.push({
                            KKBER: "CR90",
                            KKBTX: "SmartyCar",
                            MANDT: "",
                            SPRAS: "",
                        });

                        model.setProperty('/AreasControlCredito', GT_T014T);

                        model.setProperty('/i_AreaControlCredito', GT_T014T[0].KKBER);

                        that._loadControlCredito();

                        let GT_TRAS = [];

                        GT_TRAS.push({
                            BZDAT: "2",
                            LTEXT: "Vencimiento VN 0\\19\\59\\999",
                            MANDT: "300",
                            RASID: "VN01",
                            TAGE1: "019",
                            TAGE2: "059",
                            TAGE3: "000",
                            TAGE4: "000",
                            TAGE5: "000"
                        });

                        GT_TRAS.push({
                            BZDAT: "2",
                            LTEXT: "Vencimiento VN 20\\45\\60\\90\\120",
                            MANDT: "300",
                            RASID: "VN02",
                            TAGE1: "020",
                            TAGE2: "045",
                            TAGE3: "060",
                            TAGE4: "090",
                            TAGE5: "120",
                        });

                        model.setProperty('/Vencimientos', GT_TRAS);

                        if (GT_TRAS.length > 0) {
                            model.setProperty('/i_Vencimiento', GT_TRAS[0].RASID);
                            that._loadDoctosMorosos();
                        }


                        let GT_VTAS_SECTOR = [];


                        GT_VTAS_SECTOR.push({
                            DESC_SPART: "",
                            DESC_UNEGOCIO: "MAQUINARIAS AGRÍCOLA",
                            NETWR: 0,
                            SPART: "",
                            UNEGOCIO: "AG01",
                        });

                        GT_VTAS_SECTOR.push({
                            DESC_SPART: "Maq. Agricola Nuevas",
                            DESC_UNEGOCIO: "MAQUINARIAS AGRÍCOLA",
                            NETWR: 0,
                            SPART: "M4",
                            UNEGOCIO: "AG01",
                        });

                        GT_VTAS_SECTOR.push({
                            DESC_SPART: "Maq. Agricola Usada",
                            DESC_UNEGOCIO: "MAQUINARIAS AGRÍCOLA",
                            NETWR: 0,
                            SPART: "M5",
                            UNEGOCIO: "AG01",
                        });


                        GT_VTAS_SECTOR.push({
                            DESC_SPART: "",
                            DESC_UNEGOCIO: "AUTYCAM",
                            NETWR: 0,
                            SPART: "",
                            UNEGOCIO: "AS01",
                        });

                        GT_VTAS_SECTOR.push({
                            DESC_SPART: "Autos Usados",
                            DESC_UNEGOCIO: "AUTYCAM",
                            NETWR: 0,
                            SPART: "A1",
                            UNEGOCIO: "AS01",
                        });

                        let GT_VENTAS = GT_VTAS_SECTOR;
                        let unidades = [];

                        for (var i = 0; i < GT_VENTAS.length; i++) {
                            if (GT_VENTAS[i].SPART != '') {
                                let unidad;
                                if (unidad = unidades.find(function (m) {
                                    return m.Codigo == GT_VENTAS[i].UNEGOCIO
                                })) {
                                    unidad.Unidades.push({
                                        Codigo: GT_VENTAS[i].SPART,
                                        Descripcion: GT_VENTAS[i].DESC_SPART,
                                        Volumen: GT_VENTAS[i].NETWR
                                    });
                                } else {
                                    let cabecera = GT_VENTAS.find(function (m) {
                                        return (m.UNEGOCIO == GT_VENTAS[i].UNEGOCIO && m.SPART == '')
                                    });
                                    unidad = {
                                        Codigo: cabecera.UNEGOCIO,
                                        Descripcion: cabecera.DESC_UNEGOCIO,
                                        Volumen: cabecera.NETWR,
                                        Unidades: [
                                            {
                                                Codigo: GT_VENTAS[i].SPART,
                                                Descripcion: GT_VENTAS[i].DESC_SPART,
                                                Volumen: GT_VENTAS[i].NETWR
                                            }
                                        ]
                                    };
                                    unidades.push(unidad);
                                }
                            }
                        }

                        let result = {

                            E_CANT_COTI: 0,
                            E_CANT_FACT: 0,
                            E_CANT_LEASING: 0,
                            E_CANT_OTEP: 0,
                            E_PERIO_DESDE_TXT: "DIC del 2021",
                            E_PERIO_HASTA_TXT: "JUN del 2022",
                            E_PORCENT_GRP: 0,
                            E_PORCENT_SOC: 0,
                            E_SOCIEDAD_TXT: "SOCIEDAD 1",
                            E_UVTA_FECHA: "0000-00-00",
                            E_UVTA_GRVEN: "",
                            E_UVTA_GRVEN_TXT: "",
                            E_UVTA_NETWR: 0,
                            E_UVTA_OFVTA: "",
                            E_UVTA_OFVTA_TXT: "",
                            E_UVTA_VBELN: "",
                            E_VOLUMEN_GRP: 0,
                            E_VOLUMEN_HOL: 0,
                            E_VOLUMEN_NEG: 0,
                            E_VOLUMEN_SOC: 0,

                            GT_VTAS_SECTOR: GT_VTAS_SECTOR

                        };

                        result.UnidadesNegocio = { Unidades: unidades };
                        result.Detalles = {
                            Cotizaciones: [],
                            Facturas: [],
                            Ordenes: [],
                            Leasing: []
                        };

                        if (result.E_UVTA_FECHA === '0000-00-00') {
                            result.E_UVTA_FECHA = '';
                        }

                        model.setProperty('/AntecedentesComerciales', result);

                        let dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                            pattern: "yyyyMMdd",
                        });

                        let dateDesde = new Date(desde[1], desde[0] - 1, 1);
                        let dateHasta = new Date(hasta[1], hasta[0], 0); //ultimo día del mes (0 del siguiente)


                        let GT_COTI = [];
                        model.setProperty('/AntecedentesComerciales/Detalles/Cotizaciones', GT_COTI);

                        let GT_INVOICE_HEAD = [];
                        model.setProperty('/AntecedentesComerciales/Detalles/Facturas', GT_INVOICE_HEAD);

                        let GT_RESULT1 = [];

                        model.setProperty('/AntecedentesComerciales/Detalles/Ordenes', GT_RESULT1);

                        let GT_LEASING = [];
                        model.setProperty('/AntecedentesComerciales/Detalles/Leasing', GT_LEASING);

                        model.setProperty('/VisibleResultado', true);


                        /*
                                                utils.httpCall({
                                                    service: "ZPWD_072_SD_INFOBASICA",
                                                    query: oFilters,
                                                    type: "post",
                                                    success: function (result, status, xhr) {
                                                        model.setProperty('/DatosCliente', result);
                                                        if (result.T_RETURN.filter(function (r) {
                                                            return r.TYPE === 'S'
                                                        }).length > 0 || result.T_RETURN.length === 0) {
                        
                                                            //Parámetros
                                                            oFilters = {
                                                                I_BUKRS: sociedad.BUKRS
                                                            };
                        
                                                            utils.httpCall({
                                                                service: "ZPWD_072_SD_DICCIO_CONSULTA",
                                                                query: oFilters,
                                                                type: "post",
                                                                success: function (result, status, xhr) {
                                                                    model.setProperty('/AreasControlCredito', result.GT_T014T);
                                                                    if (result.GT_T014T.length > 0) {
                                                                        model.setProperty('/i_AreaControlCredito', result.GT_T014T[0].KKBER);
                                                                        that._loadControlCredito();
                                                                    }
                                                                    model.setProperty('/Vencimientos', result.GT_TRAS);
                                                                    if (result.GT_TRAS.length > 0) {
                                                                        model.setProperty('/i_Vencimiento', result.GT_TRAS[0].RASID);
                                                                        that._loadDoctosMorosos();
                                                                    }
                                                                }
                                                            });
                        
                        
                                                            oFilters = {
                                                                SO_KUNNR_P: rut,
                                                                SO_BUKRS_P: sociedad.BUKRS,
                                                                GP_GJAHR: '0000'
                                                            };
                        
                        
                                                            utils.httpCall({
                                                                service: "ZPWD_072_DOCTOS_MOROSOS",
                                                                query: oFilters,
                                                                type: "post",
                                                                success: function (result, status, xhr) {
                                                                    let dctos = result.LT_ESPECIAL_GL_OUT;
                                                                    for (var i = 0; i < dctos.length; i++) {
                                                                        if (dctos[i].TEXT == 'TOTAL') {
                                                                            model.setProperty('/AntecedentesFinancieros/TotalDeuda', dctos[i].BALANCE);
                                                                            dctos.splice(i, 1);
                                                                        }
                                                                    }
                                                                    model.setProperty('/AntecedentesFinancieros/ComposicionDeuda', dctos);
                                                                }
                                                            });
                        
                                                            //Antecedentes Comerciales
                                                            oFilters = {
                                                                I_BUKRS: sociedad.BUKRS,
                                                                I_VKORG: sociedad.BUKRS,
                                                                I_KUNNR: rut,
                                                                I_Per_Desde: desdeString,
                                                                I_Per_Hasta: hastaString
                                                            };
                        
                                                            utils.httpCall({
                                                                service: "ZPWD_072_SD_VOLUMEN_VENTAS",
                                                                query: oFilters,
                                                                type: "post",
                                                                success: function (result, status, xhr) {
                                                                    let GT_VENTAS = result.GT_VTAS_SECTOR;
                                                                    let unidades = [];
                                                                    for (var i = 0; i < GT_VENTAS.length; i++) {
                                                                        if (GT_VENTAS[i].SPART != '') {
                                                                            let unidad;
                                                                            if (unidad = unidades.find(function (m) {
                                                                                return m.Codigo == GT_VENTAS[i].UNEGOCIO
                                                                            })) {
                                                                                unidad.Unidades.push({
                                                                                    Codigo: GT_VENTAS[i].SPART,
                                                                                    Descripcion: GT_VENTAS[i].DESC_SPART,
                                                                                    Volumen: GT_VENTAS[i].NETWR
                                                                                });
                                                                            } else {
                                                                                let cabecera = GT_VENTAS.find(function (m) {
                                                                                    return (m.UNEGOCIO == GT_VENTAS[i].UNEGOCIO && m.SPART == '')
                                                                                });
                                                                                unidad = {
                                                                                    Codigo: cabecera.UNEGOCIO,
                                                                                    Descripcion: cabecera.DESC_UNEGOCIO,
                                                                                    Volumen: cabecera.NETWR,
                                                                                    Unidades: [
                                                                                        {
                                                                                            Codigo: GT_VENTAS[i].SPART,
                                                                                            Descripcion: GT_VENTAS[i].DESC_SPART,
                                                                                            Volumen: GT_VENTAS[i].NETWR
                                                                                        }
                                                                                    ]
                                                                                };
                                                                                unidades.push(unidad);
                                                                            }
                                                                        }
                                                                    }
                                                                    result.UnidadesNegocio = { Unidades: unidades };
                                                                    result.Detalles = {
                                                                        Cotizaciones: [],
                                                                        Facturas: [],
                                                                        Ordenes: [],
                                                                        Leasing: []
                                                                    };
                        
                                                                    if (result.E_UVTA_FECHA === '0000-00-00') {
                                                                        result.E_UVTA_FECHA = '';
                                                                    }
                        
                                                                    model.setProperty('/AntecedentesComerciales', result);
                        
                                                                    let dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                                                                        pattern: "yyyyMMdd",
                                                                    });
                        
                                                                    let dateDesde = new Date(desde[1], desde[0] - 1, 1);
                                                                    let dateHasta = new Date(hasta[1], hasta[0], 0); //ultimo día del mes (0 del siguiente)
                        
                                                                    oFilters = {
                                                                        I_BUKRS: sociedad.BUKRS,
                                                                        I_KUNNR: rut,
                                                                        I_FEC_DESDE: dateFormat.format(dateDesde),
                                                                        I_FEC_HASTA: dateFormat.format(dateHasta)
                                                                    };
                        
                                                                    utils.httpCall({
                                                                        service: "ZPWD_072_SD_LISTA_COTIZACIONES",
                                                                        query: oFilters,
                                                                        type: "post",
                                                                        success: function (result, status, xhr) {
                                                                            model.setProperty('/AntecedentesComerciales/Detalles/Cotizaciones', result.GT_COTI);
                                                                        }
                                                                    });
                        
                        
                                                                    oFilters = {
                                                                        I_COMPANYCODE: sociedad.BUKRS,
                                                                        I_PARTNER_NUMBER: rut,
                                                                        I_PARTNER_ROLE: "RG",
                                                                        I_DATE_FROM: dateFormat.format(dateDesde),
                                                                        I_DATE_TO: dateFormat.format(dateHasta)
                                                                    };
                        
                                                                    utils.httpCall({
                                                                        service: "ZPWD_072_SD_LISTA_FACTURAS",
                                                                        query: oFilters,
                                                                        type: "post",
                                                                        success: function (result, status, xhr) {
                                                                            model.setProperty('/AntecedentesComerciales/Detalles/Facturas', result.GT_INVOICE_HEAD);
                                                                        }
                                                                    });
                        
                                                                    oFilters = {
                                                                        I_KUNNR: rut,
                                                                        I_FEC_DESDE: dateFormat.format(dateDesde),
                                                                        I_FEC_HASTA: dateFormat.format(dateHasta),
                                                                        I_DOC_ENPROCESO: "X"
                                                                    };
                        
                                                                    utils.httpCall({
                                                                        service: "ZPWD_072_CS_LISTA_ORDENES",
                                                                        query: oFilters,
                                                                        type: "post",
                                                                        success: function (result, status, xhr) {
                                                                            model.setProperty('/AntecedentesComerciales/Detalles/Ordenes', result.GT_RESULT);
                                                                        }
                                                                    });
                        
                                                                    oFilters = {
                                                                        I_BUKRS: sociedad.BUKRS,
                                                                        I_KUNNR: rut,
                                                                        I_FEC_DESDE: dateFormat.format(dateDesde),
                                                                        I_FEC_HASTA: dateFormat.format(dateHasta)
                                                                    };
                        
                                                                    utils.httpCall({
                                                                        service: "ZPWD_072_SD_LISTA_LEASING",
                                                                        query: oFilters,
                                                                        type: "post",
                                                                        success: function (result, status, xhr) {
                                                                            model.setProperty('/AntecedentesComerciales/Detalles/Leasing', result.GT_LEASING);
                                                                        }
                                                                    });
                                                                }
                                                            });
                        
                        
                                                            model.setProperty('/VisibleResultado', true);
                                                        } else {
                                                            result.T_RETURN.forEach(function (r) {
                                                                that.addMessage(r.MESSAGE, r.TYPE);
                                                            });
                                                        }
                                                    }
                                                });
                        
                                                */
                    } else {
                        let msg = "La fecha de inicio no puede ser posterior a la fecha final.";
                        model.setProperty('/filters/Fechas_State', 'Error');
                        model.setProperty('/filters/Fechas_State_Text', msg);
                        this.addMessage(msg, "E");
                    }

                }
            },

            _loadControlCredito: function () {

                let model = this.getView().getModel();
                let sociedades = model.getProperty('/Sociedades');
                let sociedad = sociedades.find(function (s) { return s.BUKRS == model.getProperty('/filters/i_Sociedad') });
                let rut = model.getProperty('/filters/Cliente');

                let AreaCC = model.getProperty('/i_AreaControlCredito');

                let oFilters = {
                    I_KKBER: AreaCC,
                    I_KUNNR: rut,
                    I_SPART: '',
                    I_VKORG: sociedad.BUKRS,
                    I_VTWEG: ''
                };

                let creditoCliente = [];

                creditoCliente.push({
                    CODIGO: "VP1",
                    DESCRIPCION: "Venta Normal"
                });

                creditoCliente.push({
                    CODIGO: "VP2",
                    DESCRIPCION: "Venta Restringida"
                });

                creditoCliente.push({
                    CODIGO: "VP3",
                    DESCRIPCION: "Venta en Consulta"
                });

                creditoCliente.push({
                    CODIGO: "VP4",
                    DESCRIPCION: "Venta Especial"
                });


                let equipoResponsable = [];

                equipoResponsable.push({
                    CODIGO: "EVC",
                    DESCRIPCION: "Equipo Venta en Consulta"
                });

                equipoResponsable.push({
                    CODIGO: "EVN",
                    DESCRIPCION: "Equipo Venta Normal"
                });

                equipoResponsable.push({
                    CODIGO: "EVR",
                    DESCRIPCION: "Equipo Venta Restringida"
                });


                let viasPago = [];

                viasPago.push({
                    CODIGO: "1",
                    DESCRIPCION: "K. Cheque a Proveedores"
                });

                viasPago.push({
                    CODIGO: "2",
                    DESCRIPCION: "K. Transfer Bancaria"
                });

                viasPago.push({
                    CODIGO: "3",
                    DESCRIPCION: "K. Efectivo"
                });

                viasPago.push({
                    CODIGO: "4",
                    DESCRIPCION: "K. Carta de instrucción"
                });

                viasPago.push({

                    CODIGO: "A",
                    DESCRIPCION: "D. Anticipo"
                });

                let viasPagoTooltip = ['A - D. Anticipo', 'D - D. Depósito', 'E - D. Efectivo', 'F - D. Tarjeta de Débito', 'G - D. Tarjeta de Crédito', 'K - D. Nota de Crédito', 'P - D. Cheque Asegurado'];

                let condicionPago = [];

                condicionPago.push({

                    CODIGO: "B000",
                    DESCRIPCION: "LC a la vista (contado recibo BL)"
                });

                condicionPago.push({

                    CODIGO: "B030",
                    DESCRIPCION: "30 Días la fecha de BL"
                });


                condicionPago.push({

                    CODIGO: "B045",
                    DESCRIPCION: "45 Días fecha de BL"
                });

                condicionPago.push({
                    CODIGO: "B060",
                    DESCRIPCION: "60 Días fecha de BL"
                });

                condicionPago.push({
                    CODIGO: "B090",
                    DESCRIPCION: "90 Días fecha de BL"
                });

                condicionPago.push({
                    CODIGO: "B120",
                    DESCRIPCION: "120 Días fecha de BL"
                });


                model.setProperty('/AntecedentesFinancieros/Descripciones/CreditoCliente', creditoCliente);
                model.setProperty('/AntecedentesFinancieros/Descripciones/EquipoResponsable', equipoResponsable);
                model.setProperty('/AntecedentesFinancieros/Descripciones/ViasPago', viasPago);
                model.setProperty('/AntecedentesFinancieros/Descripciones/ViasPagoTooltip', viasPagoTooltip.join("\n"));
                model.setProperty('/AntecedentesFinancieros/Descripciones/CondicionPago', condicionPago);
                /*
                                utils.httpCall({
                                    service : "ZPWD_072_INFOFD33",
                                    query : oFilters,
                                    type : "post",
                                    success : function (result, status, xhr) {
                                        model.setProperty('/AntecedentesFinancieros/ControlCreditos',result);
                                        let creditoCliente = [];
                                        let equipoResponsable = [];
                                        let viasPago = [];
                                        let viasPagoTooltip = [];
                                        let condicionPago = [];
                    
                                        result.GT_T691T.forEach(function(cc){
                                            creditoCliente.push({
                                                CODIGO:cc.CTLPC,
                                                DESCRIPCION:cc.RTEXT
                                            });
                                        });
                    
                                        result.GT_T024B.forEach(function(er){
                                            equipoResponsable.push({
                                                CODIGO:er.SBGRP,
                                                DESCRIPCION:er.STEXT
                                            });
                                        });
                    
                                        result.GT_T042Z.forEach(function(vp){
                                            viasPago.push({
                                                CODIGO:vp.ZLSCH,
                                                DESCRIPCION:vp.TEXT1
                                            });
                                        });
                    
                                        result.E_VIAS_PAGO.split('').forEach(function (v) {
                                            let desc = viasPago.find(function(d){
                                                return d.CODIGO == v;
                                            });
                                            viasPagoTooltip.push(desc.CODIGO + ' - '+ desc.DESCRIPCION);
                                        });
                    
                                        result.GT_T052U.forEach(function(cp){
                                            condicionPago.push({
                                                CODIGO:cp.ZTERM,
                                                DESCRIPCION:cp.TEXT1
                                            });
                                        });
                    
                    
                    
                                        model.setProperty('/AntecedentesFinancieros/Descripciones/CreditoCliente',creditoCliente);
                                        model.setProperty('/AntecedentesFinancieros/Descripciones/EquipoResponsable',equipoResponsable);
                                        model.setProperty('/AntecedentesFinancieros/Descripciones/ViasPago',viasPago);
                                        model.setProperty('/AntecedentesFinancieros/Descripciones/ViasPagoTooltip',viasPagoTooltip.join("\n"));
                                        model.setProperty('/AntecedentesFinancieros/Descripciones/CondicionPago',condicionPago);
                                    }
                                });
                
                                */
            },

            _loadDoctosMorosos: function () {
                let model = this.getView().getModel();
                let sociedades = model.getProperty('/Sociedades');
                let sociedad = sociedades.find(function (s) { return s.BUKRS == model.getProperty('/filters/i_Sociedad') });
                let rut = model.getProperty('/filters/Cliente');

                let rasid = model.getProperty('/i_Vencimiento');

                let oFilters = {
                    I_KNKLI: rut,
                    I_BUKRS: sociedad.BUKRS,
                    I_KKBER: sociedad.KKBER,
                    I_RASID: rasid,
                    I_VKORG: '',
                    I_VTWEG: '',
                    I_SPART: ''
                };

                let GT_VZGITAB = [];

                model.setProperty('/AntecedentesFinancieros/DocumentosMorosos', GT_VZGITAB);



                /*
                            utils.httpCall({
                                service : "ZPWD_072_DOCTOS_MOROSOS_01",
                                query : oFilters,
                                type : "post",
                                success : function (result, status, xhr) {
                                    model.setProperty('/AntecedentesFinancieros/DocumentosMorosos',result.GT_VZGITAB);
                                }
                            });
            
                            */
            }

        });
    });
