// @ts-nocheck
var s; 
var last="";
sap.ui.define([
	"sap/m/MessageBox",
	"sap/m/GroupHeaderListItem",
	"sapui5agendar/sco00pickingdespacho_html/utils/utils",
	"sap/ui/core/mvc/Controller"
], function (MessageBox, GroupHeaderListItem, utils,  Controller) {
	"use strict";

	return Controller.extend("sapui5agendar.sco00pickingdespacho_html.controller.View1", {
	
		onInit: function () {
			
			s=0;
	/*		$(document).keypress(function (e) { 

				alert(e.key);

			});
			
			
*/

			

			var modelData = new sap.ui.model.json.JSONModel({					
					"cantidad": 34,
					"cantidadConteo": 0,
					"porcentaje": 0,
					"estado": "Error"
			});
			this.getView().setModel(modelData, "modelData");

var that = this;
//if(s===1){
		$(document).keydown(function(evt){
		//	alert(evt.keyCode);
				
				if (evt.keyCode===113){
					last = "S";
					that.getView().byId("idInputHidden").setValue("");		
			//		that.getView().byId("idDialogScan").setVisible(true);
			//		that.getView().byId("idDialogScan").open();
				}	
			
			//	alert(evt.target.tagName);
				if(evt.keyCode!==13 && last === "S"){
					var input =  that.getView().byId("idInputHidden");
				    input.focus();
				    evt.preventDefault();
				   
				}else{
					
				//	alert("contar");
					
			//		that.getView().byId("idDialogScan").setVisible(false);
			//		that.getView().byId("idDialogScan").close();					
					
				}
				
				
				
				
		
				if (evt.keyCode!==113){
		    		//	evt.preventDefault();
		    	//	alert(evt.keyCode);
				//	alert(evt.key);
				//	alert(evt.originalEvent.key);		    		
				}else{
			

						//this.getView().byId("idInputEnt").setValueState("Error");	
				}
		});	
		
//		}	
	/*	document.addEventListener("keypress", function(e) {
			
			alert("a");
			alert(e.target.tagName);
		  if (e.target.tagName !== "INPUT") {
		  
		  }
		});*/

		},
		
		hola : function (){
			
			alert(hola);	
		},
		
		
		irImport : function () {
			
			this.getView().byId("elemVariable").setLabel("Entrega Entrante");
			
			
		},
		
		
		irTraslado : function () {
			
			this.getView().byId("elemVariable").setLabel("Entrega de Salida");
			
			
		},
		
				
		
		
	
		getJson: function(oData) {
			var str = JSON.stringify(oData);
			str = JSON.stringify(oData, null, 4);
			return str;
		},		
				
		setModel: function(oData, view, nombreModelo) {
			var jsonList = new sap.ui.model.json.JSONModel();
			jsonList.setData(oData);
			view.setModel(jsonList, nombreModelo);
		},		
		
		
		imprJson: function(oData) {
			var str = JSON.stringify(oData);
			str = JSON.stringify(oData, null, 4);
			console.log(">>>>>>>>>>>>>>>>>INICIO imprimiendo json>>>>>>>>>>>>>>>>>>>>>>>");
			console.log(str);
			console.log(">>>>>>>>>>>>>>>>>FIN imprimiendo json>>>>>>>>>>>>>>>>>>>>>>>");
		},
		
		
		abrirIncidente : function () {
			
			this.getView().byId("idDialogAccidente").setVisible(true);
			this.getView().byId("idDialogAccidente").open();
		
		},
		
		
		cerrarIncidente : function () {
			
			
					
			this.getView().byId("idDialogAccidente").setVisible(false);
			this.getView().byId("idDialogAccidente").close();	
			
		},		
		
		
		getGroupHeader: function (oGroup){
			return new GroupHeaderListItem({
				title: oGroup.key,
				upperCase: false
			});
		},
		
		validarBusqueda : function () {
			
		
			
			var that = this;
			
			
				this.getView().byId("bd").open();
				this.getView().byId("idInputPto").setValueState("None");
				this.getView().byId("idInputEnt").setValueState("None");
				
				this.getView().byId("idTablaEnt").setVisible(true);		
				this.getView().byId("table").setVisible(false);		
				this.getView().byId("idInputHidden").setVisible(false);		
				this.getView().byId("idPB").setVisible(false);		
				
				var timeout = jQuery.sap.delayedCall(800, this, function () {
					that.getView().byId("bd").close();	
					that.abrirDialogoResultado();
					
					 var object = [];
					 object.push({"entrega":"83849390", "cantidad":"2", "clase": "ZBNB", "cliente" : "93297000-7", "nombreCliente" : "SUBARU CHILE S.A", "puerto" : "1SON", "fecha" : "15.02.2019" , "boton" : true, "typeButton":"Reject", "icon" : "bar-code" });
					 object.push({"entrega":"83849386", "cantidad":"1", "clase": "ZBNB", "cliente" : "88937800-K", "nombreCliente" : "AUTOFRAM S.A", "puerto" : "1SON", "fecha" : "08.02.2019" , "boton" : false, "typeButton":"Accept", "icon" : "accept"  });
					 object.push({"entrega":"83849387", "cantidad":"4", "clase": "ZLNB", "cliente" : "93297000-7", "nombreCliente" : "SUBARU CHILE S.A", "puerto" : "1SON", "fecha" : "11.02.2019" , "boton" : false, "typeButton":"Accept", "icon" : "accept"  });
					 object.push({"entrega":"83849388", "cantidad":"3", "clase": "ZLNB", "cliente" : "96899480-8", "nombreCliente" : "COMERCIAL LEON VELIZ S.A", "puerto" : "1SON", "fecha" : "12.02.2019" , "boton" : false, "typeButton":"Accept", "icon" : "accept"  });
					 object.push({"entrega":"83849389", "cantidad":"6", "clase": "ZLNB", "cliente" : "88937800-K", "nombreCliente" : "AUTOFRAM S.A", "puerto" : "1SON", "fecha" : "12.02.2019",  "boton" : false, "typeButton":"Accept", "icon" : "accept" });
					 
					var oJSONModel = {"results": object};
					that.setModel(oJSONModel, that.getView(), "entModel");
					that.getView().getModel("entModel").refresh();	
						
				});	
		
			
			
	 
			
		},
		
		
		cargaPicking : function () {
		
			s=1;
			var that = this;
			
			this.getView().byId("idDialogEnt").setVisible(true);
			this.getView().byId("idDialogEnt").open();
		
			that.getView().byId("idTablaEnt").setVisible(false);	
			that.getView().byId("bd").open();	
		
			var timeout = jQuery.sap.delayedCall(800, this, function () {
				that.getView().byId("bd").close();	
				that.abrirDialogoResultado();
				that.getView().byId("table").setVisible(true);		
				that.getView().byId("idInputHidden").setVisible(true);		
				that.getView().byId("idPB").setVisible(true);		
				
				 var object = [];
				 object.push({"npieza":"1558013SP06", "material":"806405", "textoMaterial": "155/80 R13 SP06 797T TL",   "cantidad" : 5,  "cantidadConteo" : 0, "umb" : "UN", "estado"  : "Error" ,  "porcentaje" : 0, "typeButton":"Accept", "icon" : "accept"  });
				 object.push({"npieza":"1557013SP06", "material":"746186", "textoMaterial": "155/70 R13 SP06 73T",       "cantidad" : 20, "cantidadConteo" : 0, "umb" : "UN", "estado"  : "Error"  , "porcentaje" : 0, "typeButton":"Accept", "icon" : "accept"  });
				 object.push({"npieza":"3057019RS03", "material":"188058", "textoMaterial": "305/70 R19.5 RS03 16PR TL", "cantidad" : 4,  "cantidadConteo" : 0, "umb" : "UN", "estado"  : "Error"  , "porcentaje" : 0, "typeButton":"Accept", "icon" : "accept"  });
				 object.push({"npieza":"11024RS0216", "material":"139110", "textoMaterial": "11 R24.5 RS02 16PR TL",     "cantidad" : 5,  "cantidadConteo" : 0, "umb" : "UN", "estado"  : "Error"  , "porcentaje" : 0, "typeButton":"Accept", "icon" : "accept" });
				 
					 
				var oJSONModel = {"results": object};
				that.setModel(oJSONModel, that.getView(), "pickModel");
				that.getView().getModel("pickModel").refresh();	
				
						
			});		
			
			
			
			
		},
		
		onPickMaterial : function () {
			
			var that = this;
			this.getView().byId("idInputHidden").setBusy(true);
			var mat = this.getView().byId("idInputHidden").getValue();
			this.getView().byId("idInputHidden").setValue("");
			this.getView().byId("idInputHidden").focus();
			//document.activeElement.blur();
			this.getView().byId("idInputHidden").setBusy(false);
			
			
			var pickModel = this.getView().getModel("pickModel");
			var registros = pickModel.getData().results;
			var numSap = "";

			var oFilters = {};
			oFilters.I_EAN11 = mat;

			utils.httpCall({
				service : "Z278R_GET_NEU_FROM_BCODE",
				query : oFilters,
				success : function (result, status, xhr) {
					var aReturnError = result.E_ERROR;
					if (aReturnError > 0) {
					
						MessageBox.warning("Material no existe o no pertenece a la entrega ", {
							title : "Información"
						});

					}else{
						
			if(mat === "8808956029968"  ||  mat === "8808956036324"  || mat === "6927116145361"  || mat === "6927116145378"  ){
				
				//alert("Material encontrado");
				
				if(mat === "8808956029968" ||  mat.indexOf("8808956029968") !== -1){
					numSap = result.E_MATNR;
				}
				
				if(mat === "8808956036324" ||  mat.indexOf("8808956036324") !== -1){
					numSap = result.E_MATNR;
				}
				
				if(mat === "6927116145361" ||  mat.indexOf("6927116145361") !== -1){
					numSap = result.E_MATNR;
				}
				
				if(mat === "6927116145378" ||  mat.indexOf("6927116145378") !== -1){
					numSap = result.E_MATNR; 
				}	
				
				
				if (numSap !== ""){
				
				for(var i=0; i < registros.length; i++){
					
					var model = registros[i];
					
					if(model.material === numSap || numSap.indexOf(model.material) !== -1 ){
					
						var cantConteo = model.cantidadConteo;
						var cantidad = model.cantidad;
						var porcentaje = model.porcentaje;
						
						if(cantConteo < cantidad){
						//	that.getView().byId("idDialogMaterial").setVisible(true);
						//	that.getView().byId("idDialogMaterial").open();
							
						//	that.getView().byId("idDialogEnt").setVisible(false);
						//	that.getView().byId("idDialogEnt").close();

							cantConteo++;
							porcentaje = parseInt((cantConteo * 100) / cantidad);
							
							if(porcentaje > 60 && porcentaje !== 100){
								pickModel.setProperty("/results/" +i+ "/estado", "Warning");
							}else if (porcentaje === 100){
								pickModel.setProperty("/results/" +i+ "/estado", "Success");
							}
							
							pickModel.setProperty("/results/" +i+ "/cantidadConteo", cantConteo);
							pickModel.setProperty("/results/" +i+ "/porcentaje", porcentaje);
							that.getView().setModel( pickModel, "preguntaModel");
		                    that.getView().getModel("pickModel").refresh();
		                    
							that.getView().byId("idEstadoScan").setText("OK");
							that.getView().byId("idEstadoScan").setIcon("sap-icon://accept");		   
							that.getView().byId("idEstadoScan").setState("Success");		   
							that.getView().byId("idPieza").setText(model.npieza);
							that.getView().byId("idMaterial").setText(result.E_MATNR.substring(result.E_MATNR.length-6, result.E_MATNR.length));
							that.getView().byId("idTextoBreve").setText(result.E_MAKTX);
							that.getView().byId("idCtd").setText(model.cantidad);
							that.getView().byId("idCtdConteo").setPercentValue(porcentaje);
							that.getView().byId("idCtdConteo").setDisplayValue(model.cantidadConteo +"/"+ model.cantidad);
							that.getView().byId("idCtdConteo").setState(model.estado);
							that.getView().byId("idUnidad").setText(model.umb);
		                    
		                    
							//var timeout = jQuery.sap.delayedCall(500, this, function () {
							
						//		that.getView().byId("idDialogMaterial").setVisible(false);
						//		that.getView().byId("idDialogMaterial").close();
						//		that.getView().byId("idDialogEnt").setVisible(true);
						//		that.getView().byId("idDialogEnt").open();
								
						//	});		    
							break;
						}else{
							MessageBox.error("Ya se realizó el picking completo de este material");
							break;
						}
					}
				}
				
				}
				
				var cantidadTotal = 0;
				for(var i=0; i < registros.length; i++){
					var model = registros[i];
					cantidadTotal += model.cantidadConteo;
				}
				var modelData = that.getView().getModel("modelData");
				var porcentaje = parseInt((cantidadTotal * 100) / modelData.getProperty("/cantidad"));
				
			    modelData.setProperty("/cantidadConteo", cantidadTotal );
				modelData.setProperty("/porcentaje", porcentaje );

				if(porcentaje > 60 && porcentaje !== 100){
					modelData.setProperty("/estado", "Warning");
				}else if (porcentaje === 100){
					modelData.setProperty("/estado", "Success");
				}

				that.getView().byId("idInputHidden").setValue("");
				
			}else{

				that.getView().byId("idInputHidden").setValue("");
			//	that.getView().byId("idDialogMaterial").setVisible(true);
				
				that.getView().byId("table").setVisible(false);
				that.getView().byId("idFormMaterial").setVisible(true);
				
			//	that.getView().byId("idDialogMaterial").open();
			//	that.getView().byId("idDialogEnt").setVisible(false);
			//	that.getView().byId("idDialogEnt").close();
				that.getView().byId("idInputHidden").focus();
	
				if(result.E_MATNR === ""){
					that.getView().byId("idEstadoScan").setText("Error");
					that.getView().byId("idEstadoScan").setIcon("sap-icon://decline");
					that.getView().byId("idEstadoScan").setState("Error");		   
					that.getView().byId("idPieza").setText("NO ENCONTRADO");
					that.getView().byId("idMaterial").setText("NO ENCONTRADO");
					that.getView().byId("idTextoBreve").setText("NO ENCONTRADO");
					that.getView().byId("idCtd").setText("NO ENCONTRADO");
					that.getView().byId("idCtdConteo").setPercentValue(0);
					that.getView().byId("idCtdConteo").setDisplayValue(0 +"/"+ 0);
					that.getView().byId("idCtdConteo").setState("Error");
					that.getView().byId("idUnidad").setText("NO ENCONTRADO");
				}else{
					

					that.getView().byId("idEstadoScan").setText("No Pertenece a la entrega");
					that.getView().byId("idEstadoScan").setIcon("sap-icon://decline");
					that.getView().byId("idEstadoScan").setState("Error");		   
					that.getView().byId("idPieza").setText("NO ENCONTRADO");
					that.getView().byId("idMaterial").setText(result.E_MATNR);
					that.getView().byId("idTextoBreve").setText(result.E_MAKTX);
					that.getView().byId("idTipoMaterial").setText(result.E_MTART);
					that.getView().byId("idCreadoPor").setText(result.E_ERNAM);
					that.getView().byId("idCtd").setText("0");
					that.getView().byId("idCtdConteo").setPercentValue(0);
					that.getView().byId("idCtdConteo").setDisplayValue(0 +"/"+ 0);
					that.getView().byId("idCtdConteo").setState("Error");
					that.getView().byId("idUnidad").setText("");
					that.getView().byId("idInputHidden").focus();
									var timeout = jQuery.sap.delayedCall(2000, this, function () {
			//		that.getView().byId("idDialogMaterial").setVisible(false);
				//	that.getView().byId("idDialogMaterial").close();
				//	that.getView().byId("idDialogEnt").setVisible(true);
				//	that.getView().byId("idDialogEnt").open();
					that.getView().byId("table").setVisible(true);
					that.getView().byId("idFormMaterial").setVisible(false);
					that.getView().byId("idInputHidden").focus();
								
				});	
				}            				
							
	    							
			}
			
						
						
					}

					
				}
			});
			
			
			/*
			000000000000139110                         ST    00001 8808956029968
			000000000000188058                         ST    00001 8808956036324
			000000000000746186                         ST    00001 6927116145361
			000000000000806405                         ST    00001 6927116145378*/
			
		},
		
		
		confirmarEntrega : function () {
			
			var modelData = this.getView().getModel("modelData");
			var that = this;
			if(modelData.getProperty("/cantidad") !== modelData.getProperty("/cantidadConteo")){
					MessageBox.error("La entrega no está completa");
			}else{
				
				this.getView().byId("bd").open();
			
				var timeout = jQuery.sap.delayedCall(800, this, function () {
					that.getView().byId("bd").close();	
				//	that.cerrarDialog();
					MessageBox.success("Entrega no seriados 83849390 grabada.");
					
					that.getView().byId("idTablaEnt").setVisible(true);		
					that.getView().byId("table").setVisible(false);		
					that.getView().byId("idInputHidden").setVisible(false);		
					that.getView().byId("idPB").setVisible(false);	
					
					var entModel = that.getView().getModel("entModel");
					
					entModel.setProperty("/results/0/boton", false);
					entModel.setProperty("/results/0/typeButton", "Accept");	
					entModel.setProperty("/results/0/icon", "accept");	
				
					that.getView().byId("idBtnRepetir").setVisible(true);
					that.getView().byId("idBtnBuscar").setVisible(false);
					
					
				});
				
			}
			
		},
		
		onRepetir : function () {
			
			window.location.reload(); 
			
		},
		
		
		abrirDialogoResultado : function (){
			this.getView().byId("idDialogEnt").setVisible(true);
			this.getView().byId("idDialogEnt").open();
		},
		
		
		
		cerrarDialog : function (){
			this.getView().byId("idDialogEnt").setVisible(false);
			this.getView().byId("idDialogEnt").close();
		}
				
		
	});
});