// @ts-nocheck
var s;
var last = "";
var cont = 0;
var cont2 = 0;
var cont3 = 0;
var cont4 = 0;
var entrega = "";
var idUser = "";
//var audio   = new Audio(jQuery.sap.getModulePath("sapui5agendar.sco00zapppicking_html") + "/media/beep_salfa7.mp3");
//var audio2  = new Audio(jQuery.sap.getModulePath("sapui5agendar.sco00zapppicking_html") + "/media/doink1_salfa.mp3");
//var audio3  = new Audio(jQuery.sap.getModulePath("sapui5agendar.sco00zapppicking_html") + "/media/warning_salfa1.mp3");
var viewg;

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/BusyIndicator",
    "sap/ui/model/json/JSONModel",
    "sapui5agendar/sco00zapppicking_html/services/service",
    "sapui5agendar/sco00zapppicking_html/util/utilController",
    "sapui5agendar/sco00zapppicking_html/util/utilUI",
    "sapui5agendar/sco00zapppicking_html/util/utils",
    'sap/ui/model/Filter',
    'sap/ui/core/Fragment'
], function (Controller, Device, MessageBox, MessageToast, BusyIndicator, JSONModel, service, utilController, utilUI, utils, Filter,
    Fragment) {
    "use strict";

    return Controller.extend("sapui5agendar.sco00zapppicking_html.controller.View1", {
        onInit: function () {

            console.log("El path es: ...." + jQuery.sap.getModulePath("sapui5agendar.sco00zapppicking_html"))
            var self = this;
            viewg = this.getView();
            utilController.initModelView(this);
            //           idUser = utils.getUser();
            //provisional para hacer pruebas con el usuario entregado por salfa. Comentar esta línea en PRD
            idUser = "CSANMARTIN";

            var oFiltersA = {
                "I_IDUSER": idUser
            };



            this.getView().byId("fhasta").setValue(this.fechaActual());
            s = 0;

            /*
            service.filtrosPicking(function (result) {
                self.onSetGTPtoExp(result.GT_PTOEXP);
            //	console.log(JSON.stringify(result.GT_PTOEXP));
                service.datosUsuario(oFiltersA, function (result2) {
                    if(result2.T_DATEMPR.length > 0){
                        for(var i=0; i < result2.T_DATEMPR.length; i++){
                            if(result2.T_DATEMPR[i].ID_TIPO === "IWERK"){
                                for(var j=0; j < result.GT_PTOEXP.length; j++){
                                    if(result2.T_DATEMPR[i].VALOR === result.GT_PTOEXP[j].VSTEL){
                                        self.getView().byId("idInputPto").setValue(result2.T_DATEMPR[i].VALOR + " - " + result.GT_PTOEXP[j].VTEXT);
                                        break;
                                    }
                                }
    
                            }
                        }
    
                    }
                });
            });
    
    */

            utilController.property(this, "/OBJGUARDAR", {
                MATNR: "",
                MFRPN: "",
                MAKTX: "",
                LFIMG: "",
                MEINS: ""
            });

            this.getView().byId("idInputHidden").setEnabled(false);
            //	this.getView().byId("idInputHidden").focus();

            setTimeout(function () {
                that.getView().byId("idInputHidden").setEnabled(true);
            }, 50);
            var that = this;

            /*		$('#keyboard').on('focus click tap vclick', function (event) {
                        alert("aaa");
                        event.stopImmediatePropagation();
                        event.preventDefault();
                    });*/


            $(document).keydown(function (evt) {
                //	alert(evt.keyCode);

                if (evt.keyCode === 0) {


                    if (that.getView().byId("idDialogEnt").getVisible() === false) {
                        //	alert("En los filtros");
                        that.getView().byId("idInputPto").setValue("");
                        that.getView().byId("idInputPto").focus();
                    } else {
                        //	alert("En picking");
                        that.getView().byId("idInputHidden").setValue("");
                        that.getView().byId("idInputHidden").focus();
                    }
                }
                if (evt.keyCode === 113) {
                    last = "S";
                    //	alert("1");
                    that.getView().byId("idInputHidden").setValue("");
                }
                if (evt.keyCode !== 13 && last === "S") {
                    //var input =  that.getView().byId("idInputHidden");
                    //	alert("2");
                    //   input.focus();
                    // evt.preventDefault();
                }
            });
        },

        onAfterRendering: function () {

        },
        onDialogAfterOpen: function () {
            //  this.getView().byId("idInputHidden").focus();
            //  $("#container-App00800Zpiking---View1--idInputHidden-inner").focus();
            console.log("dialog afteropen");
        },
        onCloseBusyDialog: function () {
            // var that = this;
            // var timeout = 	jQuery.sap.delayedCall(800, this, function () {
            this.getView().byId("bd").close();
            //	that.abrirDialogoResultado();
            this.getView().byId("idTablaMateriales").setVisible(true);
            this.getView().byId("idInputHidden").setVisible(true);
            //   this.getView().byId("idInputHidden").focus();
            //	$("#container-App00800Zpiking---View1--idInputHidden-inner").focus();
        },
        handleValueHelp: function (oEvent) {
            var sInputValue = oEvent.getSource().getValue();
            this.inputId = oEvent.getSource().getId();
            // create value help dialog
            if (!this._valueHelpDialog) {
                this._valueHelpDialog = sap.ui.xmlfragment(
                    "sapui5agendar.sco00zapppicking_html.view.Dialog",
                    this
                );
                this.getView().addDependent(this._valueHelpDialog);
            }

            // create a filter for the binding
            this._valueHelpDialog.getBinding("items").filter([new Filter(
                "VSTEL",
                sap.ui.model.FilterOperator.Contains, sInputValue
            )]);
            this._valueHelpDialog.open(sInputValue);
        },

        _handleValueHelpSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new Filter(
                "VSTEL",
                sap.ui.model.FilterOperator.Contains, sValue
            );
            evt.getSource().getBinding("items").filter([oFilter]);
        },

        _handleValueHelpClose: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            if (oSelectedItem) {
                var productInput = this.byId(this.inputId);
                productInput.setValue(oSelectedItem.getTitle());
            }
            evt.getSource().getBinding("items").filter([]);
        },
        /********************************************************************
         Zpiking - BOTON BUSCAR
        *********************************************************************
        */
        validarBusqueda: function () {
            var p_puerto = this.getView().byId("idInputPto").getValue().trim() == '';
            var that = this;
            var self = this;

            if (this.getView().byId("idInputPto").getValue() === "" && this.getView().byId("idInputEnt").getValue() === "") {
                MessageBox.error("Control de Ingreso.\n Debe ingresar Puerto de Expedición/Recepción");
                this.getView().byId("idInputPto").setValueState("Error");
            } else {
                var params = "";
                if (this.getView().byId("idInputEnt").getValue() === "") {
                    params = "?I_VSTEL=" + this.getView().byId("idInputPto").getValue().split("-")[0] + "&I_FECHA_PICK_D=" + this.fechaFormat(this.getView().byId(
                        "fdesde").getValue()) + "&I_FECHA_PICK_H=" + this.fechaFormat(this.getView().byId("fhasta").getValue()) + "?format=json";
                } else {
                    if (p_puerto) {
                        MessageBox.error("Ingresar Puerto de Expedición/Recepción");
                        return;
                    }
                    params = "?I_VSTEL=" + this.getView().byId("idInputPto").getValue().split("-")[0].trim() +
                        "&I_VBELN=" + this.getView().byId("idInputEnt").getValue().trim() + "  ?format=json";
                }
                this.getView().byId("bd_buscar").open();
                this.getView().byId("idInputPto").setValueState("None");
                this.getView().byId("idInputEnt").setValueState("None");


                let GT_ENTREGAS_PICK = [];

                GT_ENTREGAS_PICK.push({
                    ERNAM: "OSILVA",
                    KODAT: "20210813",
                    KUNNR: "1RA0",
                    LFART: "NL",
                    NAME_WE: "Rancagua",
                    VBELN: "0087476031",
                    VSTEL: "PE01"
                });

                GT_ENTREGAS_PICK.push({
                    ERNAM: "OSILVA",
                    KODAT: "20210813",
                    KUNNR: "1RA0",
                    LFART: "NL",
                    NAME_WE: "Rancagua",
                    VBELN: "0087476032",
                    VSTEL: "PE02"
                });

                GT_ENTREGAS_PICK.push({
                    ERNAM: "OSILVA",
                    KODAT: "20210813",
                    KUNNR: "1RA0",
                    LFART: "NL",
                    NAME_WE: "Rancagua",
                    VBELN: "0087476049",
                    VSTEL: "PE03",
                });

                GT_ENTREGAS_PICK.push({
                    ERNAM: "OSILVA",
                    KODAT: "20210824",
                    KUNNR: "1TE3",
                    LFART: "NL",
                    NAME_WE: "Puerto Montt",
                    VBELN: "0087500314",
                    VSTEL: "PE04"
                });

                GT_ENTREGAS_PICK.push({
                    ERNAM: "OSILVA",
                    KODAT: "20210824",
                    KUNNR: "1TE3",
                    LFART: "NL",
                    NAME_WE: "Puerto Montt",
                    VBELN: "0087500315",
                    VSTEL: "PE05"
                });

                GT_ENTREGAS_PICK.push({
                    ERNAM: "OSILVA",
                    KODAT: "20210824",
                    KUNNR: "1TE3",
                    LFART: "NL",
                    NAME_WE: "Puerto Montt",
                    VBELN: "0087500319",
                    VSTEL: "PE06"
                });


                self.onSetFiltroBusqueda(GT_ENTREGAS_PICK);
                self.getView().byId("bd_buscar").close();
                self.abrirDialogoResultado();
                utilController.refreshModel(self);

                /*
                service.filtroBusqueda(params, function (result) {
                    self.onSetFiltroBusqueda(result.GT_ENTREGAS_PICK);
                    self.getView().byId("bd_buscar").close();
                    self.abrirDialogoResultado();
                    utilController.refreshModel(self);
                });
                */
                this.getView().byId("idTablaEnt").setVisible(true);
                this.getView().byId("btnCerrar").setVisible(true);
                this.getView().byId("btnVolver").setVisible(false);
            }
        },

        abrirDialogoResultado: function () {
            this.getView().byId("idDialogEnt").setVisible(true);
            this.getView().byId("idDialogEnt").open();
        },

        volverDialog: function (oEvent) {
            this.getView().byId("idMaterial").setText("");
            this.getView().byId("idTextoBreve").setText("");
            //this.getView().byId("idCodSap").setText("");		
            this.getView().byId("idCtdConteo").setDisplayValue("");
            this.getView().byId("idCtdConteo").setPercentValue(0);
            this.getView().byId("idCtdConteo").setState("Error");

            this.getView().byId("idPB").setDisplayValue("");
            this.getView().byId("idPB").setPercentValue(0);
            this.getView().byId("idPB").setState("Error");

            this.getView().byId("idPanelTitle").setText("");
            this.getView().byId("idInputHidden").setVisible(false);
            this.getView().byId("idPB").setVisible(false);
            this.getView().byId("idConf").setVisible(false);
            //this.getView().byId("table").setVisible(false);
            this.getView().byId("idFormMaterial").setVisible(false);
            this.getView().byId("idTablaEnt").setVisible(true);
            this.getView().byId("btnCerrar").setVisible(true);
            this.getView().byId("btnVolver").setVisible(false);
            this.validarBusqueda();
            this.getView().byId("idTablaMateriales").setVisible(false);
            this.getView().byId("idTablaMateriales").getModel().refresh(true);
        },
        /**************************************************
         * ZPICKING - BOTON PARA MOSTRAR DETALLE PICKING
         */
        cargaPicking: function (oEvent) {

            s = 1;
            var that = this;
            var self = this;
            //that.getView().byId("idInputHidden").setValue(""); --> onCloseBusyDialog
            var objeto = utilUI.objectListItemSelectedItem(oEvent);
            //alert(JSON.stringify(objeto));
            utilController.property(this, "/REGISTRO", objeto);

            that.getView().byId("btnVolver").setVisible(true);
            that.getView().byId("btnCerrar").setVisible(false);

            this.getView().byId("idDialogEnt").setVisible(true);
            this.getView().byId("idDialogEnt").open();

            that.getView().byId("idTablaEnt").setVisible(false);
            that.getView().byId("bd").open();

            var params = "?I_VBELN=" + objeto.VBELN + "&format=json";

            let GT_ENTREGAS = [];


            GT_ENTREGAS.push({
                ARKTX: "215/75 R 17.5 MD738 16PR TL",
                DISPLAY: "",
                EAN11: "6938112600181",
                EANS: ",6938112600181",
                KODAT: "20210813",
                KUNNR: "1RA0",
                LFART: "NL",
                LFDAT: "20210813",
                LFIMG: "             4",
                LGORT: "",
                LGPBE: "",
                MATKL: "0016",
                MATNR: "000000000000851961",
                MFRPN: "215/75R17.5MD738 W16TL",
                PERCENT: "",
                PIKMG: "             0",
                POSNR: "000000",
                STATE: "Error",
                UNAME: "SALFA_DEB",
                VBELN: objeto.VBELN,
                VGBEL: "",
                VGPOS: "000000",
                VKORG: "1000",
                VRKME: "ST",
                VSTEL: "1S1N",
                WADAT: "00000000",
                WERKS: "1SA1"
            });

            self.onSetEntrega(GT_ENTREGAS);
            self.getView().byId("idPanelTitle").setText("Entrega " + parseInt(objeto.VBELN) + " " + objeto.NAME_WE + " (" + GT_ENTREGAS[0].VGBEL + ")");
            entrega = parseInt(objeto.VBELN);
            self.getView().byId("bd").close();
            //self.abrirDialogoResultado();
            console.log(JSON.stringify(GT_ENTREGAS));
            utilController.property(self, "/Materiales", GT_ENTREGAS);
            utilController.refreshModel(self);
            self.validaListaMat(GT_ENTREGAS);

            var json = GT_ENTREGAS;
            var total = 0;
            var subtotal = 0;
            for (var i = 0; i < json.length; i++) {
                total += parseInt(json[i].LFIMG);
                subtotal += parseInt(json[i].PIKMG);
            }

            self.byId("idPB").setDisplayValue(subtotal + " / " + total);
            var porcentaje = parseInt((subtotal * 100) / total);
            self.byId("idPB").setPercentValue(porcentaje);

            if (porcentaje >= 60 && porcentaje !== 100) {
                self.getView().byId("idPB").setState("Warning");
            } else if (porcentaje === 100) {
                self.getView().byId("idPB").setState("Success");
            } else if (porcentaje < 60) {
                self.getView().byId("idPB").setState("Error");
            }
            /*
                        service.entregasFiori(params, function (result) {
                            self.onSetEntrega(result.GT_ENTREGAS);
                            self.getView().byId("idPanelTitle").setText("Entrega " + parseInt(objeto.VBELN) + " " + objeto.NAME_WE + " (" + result.GT_ENTREGAS[0].VGBEL + ")");
                            entrega = parseInt(objeto.VBELN);
                            self.getView().byId("bd").close();
                            //self.abrirDialogoResultado();
                            console.log(JSON.stringify(result.GT_ENTREGAS));
                            utilController.property(self, "/Materiales", result.GT_ENTREGAS);
                            utilController.refreshModel(self);
                            self.validaListaMat(result.GT_ENTREGAS);
            
                            var json = result.GT_ENTREGAS;
                            var total = 0;
                            var subtotal = 0;
                            for (var i = 0; i < json.length; i++) {
                                total += parseInt(json[i].LFIMG);
                                subtotal += parseInt(json[i].PIKMG);
                            }
            
                            self.byId("idPB").setDisplayValue(subtotal + " / " + total);
                            var porcentaje = parseInt((subtotal * 100) / total);
                            self.byId("idPB").setPercentValue(porcentaje);
            
                            if (porcentaje >= 60 && porcentaje !== 100) {
                                self.getView().byId("idPB").setState("Warning");
                            } else if (porcentaje === 100) {
                                self.getView().byId("idPB").setState("Success");
                            } else if (porcentaje < 60) {
                                self.getView().byId("idPB").setState("Error");
                            }
            
            
                        });
            
                        */

            var timeout = jQuery.sap.delayedCall(800, this, function () {
                that.getView().byId("bd").close();
                that.abrirDialogoResultado();
                that.getView().byId("idFormMaterial").setVisible(true);
                this.getView().byId("idConf").setVisible(true);
                that.getView().byId("idPB").setVisible(true);
            });

        },

        onMessage: function () {
            sap.m.MessageToast.show("Codigo EAN Ingresado", { duration: 3000 });
        },

        /********************************************************************
         Zpiking - VALIDACION EAN MASIVOS
        *********************************************************************
        */


        onValidarEanMasivo: function (eans, ean) {
            var esEan = false;
            var arrEans = eans.split(",");
            for (var i = 0; i < arrEans.length; i++) {
                if (arrEans[i].trim() === ean.trim()) {
                    esEan = true;
                    //	alert("EAN Encontrado");
                    break;
                }
            }

            return esEan;
        },


        /********************************************************************
         Zpiking - SUBMIT EVENT PICKING
        *********************************************************************
        */
        onPickMaterial: function (evt) {

            var valida_ean = false;

            this.getView().byId("idInputHidden").setBusy(true);

            var mat = this.getView().byId("idInputHidden").getValue();

            if (mat === "") {
                sap.m.MessageToast.show("El lector no capturó el código de barra", { duration: 3000 });
                //alert("Material: " + mat);
                valida_ean = true;
            }

            if (!valida_ean) {

                this.getView().byId("idInputHidden").setValue("");
                //		this.getView().byId("idInputHidden").focus();

                var json = utilController.property(this, "/ENTREGA");
                var oJsonMateriales = utilController.property(this, "/Materiales"); //@frivera 07.05.2019
                //alert(JSON.stringify(json));
                var that = this;
                this.getView().byId("idInputHidden").setBusy(false);

                var numSap = "";
                var swEncontrado = false;
                var total = 0;
                var subtotal = 0;
                var swv = false;
                var matx = "";
                var matnr = "";

                for (var i = 0; i < json.length; i++) {
                    total += parseInt(json[i].LFIMG);
                    subtotal += parseInt(json[i].PIKMG);
                }

                for (var i = 0; i < json.length; i++) {
                    this.onValidarEanMasivo(json[i].EANS, mat);
                    if (json[i].EAN11 === mat || this.onValidarEanMasivo(json[i].EANS, mat)) {
                        //	alert("EAN11 SAP:" + json[i].EAN11 + " DEL SCAN: " + mat );
                        if (parseInt(json[i].PIKMG) >= parseInt(json[i].LFIMG)) {

                            /*	MessageBox.warning("Límite de picking alcanzado. "
                                , {
                                    title: "Aviso",
                                    onClose: function(oAction) { 
                                            jQuery.sap.delayedCall(500, this, function() {
                                           // self.getView().byId("idInputHidden").focus();
                                              self.getView().byId("idInputHidden").blur();
                                              
                                              self.getView().byId("idPB").focus();
                                              
                                              
                                               //self.getView().byId("idInputHidden").focus();
                                           });	
                                    }
                                });	*/
                            sap.m.MessageToast.show("Límite de Picking alcanzado para material:  " + parseInt(json[i].MATNR), { duration: 1200 });
                            this.showColor("a", "#FF8000");
                            //    audio2.play();
                            this.getView().byId("idDialogEnt").focus();

                            swEncontrado = true;

                        } else {
                            numSap = json[i].MATNR;
                            var cont = json[i].PIKMG.toString().trim();

                            if (cont === "" || cont === 0) {
                                cont = 1;
                            } else {
                                cont = parseInt(cont) + 1;
                            }

                            json[i].PIKMG = cont;
                            oJsonMateriales[i].PIKMG = cont;//@frivera 06.05.2019

                            if (parseInt(subtotal) === 0) {
                                subtotal = 1;
                            } else {
                                subtotal++;
                            }
                            //			audio.play();
                            var modelData = new sap.ui.model.json.JSONModel({
                                "cantidad": total,
                                "cantidadConteo": subtotal,
                                "porcentaje": 0,
                                "estado": "Error"
                            });

                            this.getView().setModel(modelData, "modelData");
                            this.getView().byId("idCtdConteo").setDisplayValue(json[i].PIKMG + " / " + json[i].LFIMG);

                            oJsonMateriales[i].DISPLAY = oJsonMateriales[i].PIKMG + "/" + oJsonMateriales[i].LFIMG; //@frivera 06.05.2019
                            /* Pocentaje Cabecera */
                            var porcentaje0 = parseInt((json[i].PIKMG * 100) / json[i].LFIMG);
                            this.getView().byId("idCtdConteo").setPercentValue(porcentaje0);
                            /* Porcentaje Tabla Detalle*/
                            var percent = parseInt((oJsonMateriales[i].PIKMG * 100) / oJsonMateriales[i].LFIMG); //@frivera 06.05.2019
                            oJsonMateriales[i].PERCENT = percent;

                            /* Sub Total */
                            this.getView().byId("idPB").setDisplayValue(subtotal + " / " + total);
                            var porcentaje = parseInt((subtotal * 100) / total);
                            this.getView().byId("idPB").setPercentValue(porcentaje);
                            /* Info Cabecera*/
                            this.getView().byId("idMaterial").setText(json[i].MATNR.substring(json[i].MATNR.length - 6, json[i].MATNR.length) + " - " + json[i].ARKTX);
                            this.getView().byId("idTextoBreve").setText(json[i].ARKTX);
                            //this.getView().byId("idCodSap").setText(json[i].ARKTX);					

                            if (porcentaje > 60 && porcentaje !== 100) {
                                this.getView().byId("idPB").setState("Warning");
                            } else if (porcentaje === 100) {
                                this.getView().byId("idPB").setState("Success");
                            }
                            if (porcentaje0 >= 60 && porcentaje0 !== 100) {
                                this.getView().byId("idCtdConteo").setState("Warning");
                                oJsonMateriales[i].STATE = "Warning";
                            } else if (porcentaje0 === 100) {
                                this.getView().byId("idCtdConteo").setState("Success");
                                oJsonMateriales[i].STATE = "Success";
                            } else if (porcentaje0 < 60) {
                                this.getView().byId("idCtdConteo").setState("Error");
                                oJsonMateriales[i].STATE = "Error";
                            }
                            /* Actulizamos el Modelo de la Tabla de Materiales */
                            utilController.property(that, "/Materiales", oJsonMateriales);

                            var thisView = this;

                            $(".myClass").keypress(function (e) {
                                if (e.which == 13) {
                                    //          thisView.getView().byId("idInputHidden").focus();
                                }
                            });
                            swEncontrado = true;
                            break;
                        }
                    } else {
                        /*	MessageBox.warning("Material no existe o no pertenece a la entrega ", {
                                title: "Información"
                            });*/
                    }
                }
                if (!swEncontrado) {

                    sap.m.MessageToast.show("Código de barras no existe en la entrega: " + entrega, { duration: 1200 });
                    this.showColor("a", "#cc1919");
                    //			audio2.play();
                    this.getView().byId("idDialogEnt").focus();
                }
                document.activeElement.blur();
                //this.getView().byId("idInputHidden").focus();
            }
            this.getView().byId("idInputHidden").setBusy(false);
        },
        cerrarDialog: function () {
            this.getView().byId("idDialogEnt").setVisible(false);
            this.getView().byId("idDialogEnt").close();
        },
        fechaFormat: function (fech) {
            var yy = fech.split("/")[2];
            var mm = fech.split("/")[1];
            var dd = fech.split("/")[0];
            return [yy, mm, dd].join('');
        },

        formatCero: function (param) {
            return parseInt(param);
        },

        estadoMaterial: function (param) {
            if (param === null || param === undefined || param === undefined || param === "" || param === "N/A") {
                return "Error";
            } else {
                return "None";
            }
        },

        onLimpiar: function () {
            this.getView().byId("idInputPto").setValue("");
            this.getView().byId("idInputEnt").setValue("");
            this.getView().byId("fdesde").setValue(null);
            this.getView().byId("fhasta").setValue(null);
        },
        fechaActual: function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yy = today.getFullYear();

            return [(dd > 9 ? '' : '0') + dd,
            (mm > 9 ? '' : '0') + mm,
                yy
            ].join('/');
        },
        esConfirmacion: function () {
            var that = this;
            var dialog = new sap.m.Dialog({
                title: 'Confirmar',
                type: 'Message',
                content: new sap.m.Text({ text: '¿Confirmar Picking?' }),
                beginButton: new sap.m.Button({
                    text: 'Confirmar',
                    press: function () {
                        that.confirmarEntrega();
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
        /********************************************************************
         Zpiking - BOTON CONFIRMAR
        *********************************************************************
        */
        confirmarEntrega: function () {
            var that = this;
            var oJsonMateriales = utilController.property(this, "/Materiales");
            var objeto1 = [];
            var i_vbeln = "";

            for (var i = 0; i < oJsonMateriales.length; i++) {
                if (i === 0) {
                    i_vbeln = oJsonMateriales[i].VBELN;
                }
                objeto1.push({
                    "MATNR": oJsonMateriales[i].MATNR,
                    "MFRPN": oJsonMateriales[i].MFRPN,
                    "MAKTX": oJsonMateriales[i].ARKTX,
                    "LFIMG": oJsonMateriales[i].PIKMG,
                    "MEINS": oJsonMateriales[i].MEINS
                });
            }

            var filter = {
                "I_VBELN": i_vbeln,
                "GT_ENTRADAS": objeto1
            };

         //   utilUI.gloading(true);

            //   MessageBox.warning(result.LOG, {
            //       title: "Información"
            //   });

            //   that.volverDialog();
            /*
                        service.grabarNeumatico(filter, function (result) {
                            utilUI.gloading(false);
                            //  audio3.play();
                            /* var color = "";
                             if(result.LOG === ""){
                                 result.LOG = "Picking realizado con éxito";
                                 color = "#16CD35";
                             }else{
                                 color = "#FF8000";
                             }
                         	
                             sap.m.MessageToast.show(result.LOG,{duration: 1200});
                             that.showColor("a", color);*/

            MessageBox.warning('Picking Realizado', {
                title: "Información"
            });

            that.volverDialog();


            // });




        },

        /********************************************************************
          Zpiking - CHECK DE MATERIALES CON EAN VACIO
        *********************************************************************
        */
        validaListaMat: function (data) {

            var self = this;
            var swv = false;
            var matx = "";
            var matnr = "";
            //	var json = utilController.property(this, "/ENTREGA");
            var jsonEntrega = data;
            var mensaje = "";
            var contador = 0;
            var cabMensaje = "";
            if (undefined !== jsonEntrega && jsonEntrega.length) {

                for (var i = 0; i < jsonEntrega.length; i++) {
                    if (jsonEntrega[i].EAN11 === "" || jsonEntrega[i].EAN11 === "N/A") {
                        swv = true;
                        matx = jsonEntrega[i].ARKTX;
                        matnr = jsonEntrega[i].MATNR;
                        matnr = +matnr;
                        mensaje = mensaje + "Material: " + matx + "\n" + "Código SAP: " + matnr + "\n";
                        contador = contador + 1;
                    }
                }
                if (contador <= 1) {
                    cabMensaje = "Se detecto " + contador + " material sin código de barras:" + "\n";
                } else {
                    cabMensaje = "Se detectaron " + contador + " materiales sin código de barras:" + "\n";
                }

                mensaje = cabMensaje + mensaje;

                if (swv) {
                    MessageBox.warning(mensaje, {
                        title: "Aviso",
                        onClose: function (oAction) {
                            jQuery.sap.delayedCall(500, this, function () {
                                // self.getView().byId("idInputHidden").focus();
                                self.getView().byId("idInputHidden").blur();
                                //self.getView().byId("idInputHidden").focus();
                            });
                        }
                    });
                }
            } else {

            }
        },

        onSetFiltroBusqueda: function (lista) {
            utilController.property(this, "/FiltroBusqueda", lista);
            utilController.refreshModel(this);
        },
        onSetEntrega: function (lista) {
            utilController.property(this, "/ENTREGA", lista);
            utilController.refreshModel(this);
        },
        onSetPicking: function (lista) {
            utilController.property(this, "/LISTAPICK", lista);
            utilController.refreshModel(this);
        },
        onSetGTPtoExp: function (lista) {
            utilController.property(this, "/GT_PTOEXP", lista);
            utilController.refreshModel(this);
        },


        showColor: function (Flag, color) {
            //var id = "#container-App00800Zpiking---View1--idDialogEnt";

            var id = "#application-zapppickingventa-Display-component---View1--idDialogEnt";

            var oContentDOM = $(id);
            var oParent = $(id).parent();
            var oMessageToastDOM = $(id).parent().find('.sapMMessageToast');
            oMessageToastDOM.css('background', color);
            oMessageToastDOM.css('top', '10px');
            oMessageToastDOM.css('left', '50px');
            oMessageToastDOM.css('font-size', '35px');
            oMessageToastDOM.css('display', 'block');
            oMessageToastDOM.css('opacity', '1');
            oMessageToastDOM.css('transition', 'all .3s');
            oMessageToastDOM.css('-wekit-transition', 'all .3s');
            oMessageToastDOM.css('-moz-transition', 'all .3s');


            oMessageToastDOM.css('height', '200px');

            window.setInterval(function () {
                oMessageToastDOM.css('visibility', 'hidden');
                oMessageToastDOM.css('display', 'none');

            }, 2000);

            //  viewg.byId("idConf2").firePress();



        },


        aaa: function () {
            console.log("gggg");
        }

    });
});