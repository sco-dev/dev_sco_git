/* global moment:true */
sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(JSONModel, MessageBox) {
	"use strict";
	return {
		messageStrip: function(controller, id, message, tipo) {

			var control = controller.getView().byId(id);
			control.setText(message);
			control.setShowIcon(true);
			control.setShowCloseButton(false);

			if (!tipo) {
				control.setType("Information");
			}

			if (tipo.toUpperCase() === "E") {
				control.setType("Error");
			}

			if (tipo.toUpperCase() === "S") {
				control.setType("Success");
			}

			if (tipo.toUpperCase() === "W") {
				control.setType("Warning");
			}

			if (tipo.toUpperCase() === "I") {
				control.setType("Information");
			}
		},
		objectListItemSelectedItem: function(event) {
			return event.getSource().getBindingContext().getObject();
		},
		toast: function(mensaje, time, onCloseCallBack) {
			sap.m.MessageToast.show(mensaje, {
				duration: time ? time : 3000,
				onClose: onCloseCallBack ? onCloseCallBack : function() {}
			});
		},
		messageBox: function(mensaje, tipo, callback) {
			if (tipo.toUpperCase() === "C") {
				MessageBox.show(mensaje, {
					icon: MessageBox.Icon.QUESTION,
					title: "Confirmación",
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function(sAnswer) {
						return callback(sAnswer === MessageBox.Action.YES);
					}
				});
			}

			if (tipo.toUpperCase() === "E") {
				MessageBox.error(mensaje, {
					onClose: function(sAnswer) {
						return callback();
					}
				});
			}

			if (tipo.toUpperCase() === "S") {
				MessageBox.success(mensaje, {
					onClose: function(sAnswer) {
						return callback();
					}
				});
			}

			if (tipo.toUpperCase() === "A") {
				MessageBox.show(mensaje, {
					onClose: function(sAnswer) {
						return callback();
					}
				});
			}
		},
		gloading: function(show) {
			if (show) {
				sap.ui.core.BusyIndicator.show(10);
			} else {
				sap.ui.core.BusyIndicator.hide();
			}
		},
		cloading: function(context, id, show) {
			context.getView().byId(id).setBusyIndicatorDelay(10);
			context.getView().byId(id).setBusy(show);
		}
	};
});