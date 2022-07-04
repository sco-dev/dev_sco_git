/* global moment:true */
sap.ui.define([

], function () {
	"use strict";
	return {
		FechaHoraToString: function (date) {
			return moment(date).format('DD/MM/YYYY hh:mm:ss');
		},
		FechaToString: function (date) {
			return moment(date).format('DD/MM/YYYY');
		},
		dateToFormat: function (format, d) {
			d = d || new Date();
			var yyyy = d.getFullYear(),
				MM = ('0' + (d.getMonth() + 1)).slice(-2),
				dd = ('0' + d.getDate()).slice(-2),
				hh = ('0' + d.getHours()).slice(-2),
				mm = ('0' + d.getMinutes()).slice(-2);
				
			var result = yyyy + MM + dd;	

		/*	var result = this.replaceAll(format, "yyyy", yyyy);
			result = this.replaceAll(result, "MM", MM);
			result = this.replaceAll(result, "dd", dd);
			result = this.replaceAll(result, "hh", hh);
			result = this.replaceAll(result, "mm", mm);*/

			return result;
		},
		
		dateToFormat1: function (format, d) {
			d = d || new Date();
			var yyyy = d.getFullYear() - 1,
				MM = ('0' + (d.getMonth() + 1)).slice(-2),
				dd = ('0' + d.getDate()).slice(-2),
				hh = ('0' + d.getHours()).slice(-2),
				mm = ('0' + d.getMinutes()).slice(-2);
				
				
			var result = yyyy + MM + dd;		

		/*	var result = this.replaceAll(format, "yyyy", yyyy);
			result = this.replaceAll(result, "MM", MM);
			result = this.replaceAll(result, "dd", dd);
			result = this.replaceAll(result, "hh", hh);
			result = this.replaceAll(result, "mm", mm);*/

			return result;
		},		

		dateFromFormat: function (d, format) {
			switch (format) {
			case 'yyyyMMdd':
				return new Date(d.substr(0, 4), d.substr(4, 2) - 1, d.substr(6, 2));
			case 'yyyy-MM-dd':
				return new Date(d.substr(0, 4), d.substr(5, 2) - 1, d.substr(8, 2));
			case 'dd/MM/yyyy':
				return new Date(d.substr(6, 4), d.substr(3, 2) - 1, d.substr(0, 2));
			default:
				return new Date(d.substr(0, 4), d.substr(4, 2) - 1, d.substr(6, 2));
			}
		},

		dateFormatToFormat: function (d, from, to) {
			return this.dateToFormat(to, this.dateFromFormat(d, from));
		},
	};
});