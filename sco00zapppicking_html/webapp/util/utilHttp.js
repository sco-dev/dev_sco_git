// @ts-nocheck
sap.ui.define([
	"sapui5agendar/sco00zapppicking_html/util/utilResponse"
], function(utilResponse) {
	"use strict";
	return {
		http: function(path,metodo,data, callback) {
			//alert("/SalfaCloud/" + path+"--"+JSON.stringify(data));
			$.ajax({
				url: "/SalfaCloud/" + path,
				method: metodo,
				cache: false,
				async: true,
				data: JSON.stringify(data),
				contentType: "application/json;charset=utf-8",
				success: function(result) {
					return callback(result);
				},
				error: function(error) {
					var respuestaError = utilResponse.error("Error del sistema", error);
					return callback(respuestaError);
				}
			});
		}
	};
});