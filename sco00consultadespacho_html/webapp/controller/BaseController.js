sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"], function (e, t) {
	"use strict";
	return e.extend("sapui5agendar.sco00consultadespacho_html.controller.BaseController", {
		getRouter: function () {
			return this.getOwnerComponent().getRouter()
		},
		getModel: function (e) {
			return this.getView().getModel(e)
		},
		setModel: function (e, t) {
			return this.getView().setModel(e, t)
		},
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle()
		},
		byId: function (e) {
			return this.getView().byId(e)
		},
		onNavBack: function () {
			var e = t.getInstance().getPreviousHash(),
				n = sap.ushell.Container.getService("CrossApplicationNavigation");
			if (e !== undefined || !n.isInitialNavigation()) {
				history.go(-1)
			} else {
				this.getRouter().navTo("master", {}, true)
			}
		},
		registrarLogAct: function (e, t) {
			var n = this.usuario;
			var o = new Date;
			var i = {};
			var r = o.getSeconds();
			var s = o.getMinutes();
			var u = o.getHours();
			var c = "PT" + u + "H" + s + "M" + r + "S";
			i.LOG_ID = 0;
			i.LOG_TABLA = e;
			i.LOG_ATRIBUTO = "0";
			i.LOG_VALOR_ANTIGUO = "0";
			i.LOG_VALOR_NUEVO = "0";
			i.LOG_ACTIVIDAD = t;
			i.LOG_FECHA = o;
			i.LOG_HORA = c;
			i.LOG_USUARIO = n;
			console.log(i);
			this.getModel().createEntry("/Log", {
				properties: i,
				success: function (e) {}.bind(this),
				error: function (e) {}.bind(this)
			});
			this.getModel().submitChanges({
				success: function (e) {}.bind(this),
				error: function (e) {
					console.log(e)
				}.bind(this)
			})
		}
	})
});