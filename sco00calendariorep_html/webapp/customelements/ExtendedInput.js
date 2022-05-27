sap.ui.define([
    "sap/m/Input",
    "sap/ui/core/IconPool"
], function (Input, IconPool) {
	"use strict";
	return Input.extend("sapui5agendar.sco00calendariorep_html.customelements.ExtendedInput", {
		renderer: {},

		_getValueHelpIcon : function () {
			var that = this,
				valueHelpIcon = this.getAggregation("_valueHelpIcon"),
				sURI;

			if (valueHelpIcon) {
				return valueHelpIcon;
			}

			sURI = IconPool.getIconURI("sys-find");
			valueHelpIcon = IconPool.createControlByURI({
				id: this.getId() + "-vhi",
				src: sURI,
				useIconTooltip: false,
				noTabStop: true
			});

			valueHelpIcon.addStyleClass("sapMInputValHelpInner");
			valueHelpIcon.attachPress(function (evt) {
				// if the property valueHelpOnly is set to true, the event is triggered in the ontap function
				if (!that.getValueHelpOnly()) {
					this.getParent().focus();
					that.fireValueHelpRequest({fromSuggestions: false});
				}
			});

			this.setAggregation("_valueHelpIcon", valueHelpIcon);

			return valueHelpIcon;
		}
	});
});