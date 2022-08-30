sap.ui.define([
	"sapui5agendar/sco00zapppicking_html/util/utilHttp",
	"sapui5agendar/sco00zapppicking_html/util/utils"
], function (utils) {
	"use strict";
	return {
		//	https://webidetesting0755055-d69a1fd3a.dispatcher.us2.hana.ondemand.com/SalfaCloud/Z278R_FILTROS_PICKING_FIORI?format=json
		filtrosPicking: function (callback) {
			utils.http("Z278R_FILTROS_PICKING_FIORI?format=json", "GET", null, callback);
		},
		filtroBusqueda: function (data, callback) {
			utils.http("Z278R_PICKING_NEUMA_FIORI" + data, "GET", null, callback);
		},
		entregasFiori: function (data, callback) {
			utils.http("Z278R_ENTREGAS_FIORI" + data, "GET", null, callback);
		},
		picking: function (data, callback) {
			utils.httpCall("Z278R_FILTROS_PICKING_FIORI" + data, "GET", null, callback);
		},
		graba: function (data, callback) {
			utils.http("Z278R_PICKING_ENT_SALIDA_FIORI" + data, "GET", null, callback);
		},
		grabarNeumatico: function (data, callback) {
			utils.http("Z278R_PICKING_ENT_SALIDA_FIORI", "POST", data, callback); //@frivera 10.05.2019
		},
		generaIncidencia: function (data, callback) {
			utils.http("Z278R_INCIDENCIAS_FIORI" + data, "GET", null, callback);
		},
		datosUsuario: function (data, callback) {
			utils.http("ZPWD_004_DATUSER", "POST", data, callback);
		}		
	};
});