sap.ui.define([

    "sap/ui/core/mvc/Controller",
    "sapui5agendar/sco00grafocup_html/utils/utils",
    "sapui5agendar/sco00grafocup_html/model/models",
    //   "sapui5agendar/sco00grafocup_html/utils/validator",

], function (Controller, utils, models) {
    "use strict";

    return Controller.extend("sapui5agendar.sco00grafocup_html.controller.Master", {
        tabs: [
            {
                name: "Visión Diaria",
                groups: [
                    {
                        name: "Estadística Diaria",
                        dataset: []
                    }
                ]
            },
            {
                name: "Visión Semanal",
                groups: [
                    {
                        name: "Estadística Semanal",
                        dataset: []
                    }
                ]
            },
            {
                name: "Visión Mensual",
                groups: [
                    {
                        name: "Estadística Mensual",
                        dataset: []
                    }
                ]
            },
            {
                name: "Visión Box Interno y Externo",
                groups: [
                    {
                        name: "Estadística Box Interno",
                        dataset: []
                    },
                    {
                        name: "Estadística Box Externo",
                        dataset: []
                    },
                ]
            },
        ],

        _loadData: function () {
            var that = this;

            let GT_LIS_DI_OCU = [];
            let GT_LIS_SE_OCU = [];
            let GT_LIS_ME_OCU = [];
            let GT_LIS_ME_INT = [];
            let GT_LIS_ME_EXT = [];

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 12,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 12,
                IWERK: "2AN1",
                MANDT: "300",
                PORC_OCUPACION: 0,
            });

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 2,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 2,
                IWERK: "2AR0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });
            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 6,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 6,
                IWERK: "2CA8",
                MANDT: "300",
                PORC_OCUPACION: 0
            });
            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 6,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 6,
                IWERK: "2CH0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });
            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 40,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 40,
                IWERK: "2CP0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });


            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 2,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 2,
                IWERK: "2CY0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 6,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 6,
                IWERK: "2IQ0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 10,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 10,
                IWERK: "2LA0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 20,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 20,
                IWERK: "2LS1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 9,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 9,
                IWERK: "2ON0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 6,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 6,
                IWERK: "2PA0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 14,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 14,
                IWERK: "2PM0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 16,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 16,
                IWERK: "2QL0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 16,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 16,
                IWERK: "2RA1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });


            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 12,
                BOX_OCUPADOS: 4,
                BOX_TOTAL: 16,
                IWERK: "2SA0",
                MANDT: "300",
                PORC_OCUPACION: 25
            });

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 0,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 0,
                IWERK: "2SA1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 0,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 0,
                IWERK: "2SA2",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 22,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 22,
                IWERK: "2SA3",
                MANDT: "300",
                PORC_OCUPACION: 0
            });


            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 15,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 15,
                IWERK: "2TA0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_DI_OCU.push({
                BOX_DISPONIBLE: 12,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 12,
                IWERK: "2TE0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 72,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 72,
                IWERK: "2AN1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 12,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 12,
                IWERK: "2AR0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 36,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 36,
                IWERK: "2CA8",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 54,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 54,
                IWERK: "2CC1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 36,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 36,
                IWERK: "2CH0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 240,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 240,
                IWERK: "2CP0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 12,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 12,
                IWERK: "2CY0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 36,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 36,
                IWERK: "2IQ0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 60,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 60,
                IWERK: "2LA0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 120,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 120,
                IWERK: "2LS1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 54,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 54,
                IWERK: "2ON0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 36,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 36,
                IWERK: "2PA0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 84,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 84,
                IWERK: "2PM0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 96,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 96,
                IWERK: "2QL0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 96,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 96,
                IWERK: "2RA1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 92,
                BOX_OCUPADOS: 4,
                BOX_TOTAL: 96,
                IWERK: "2SA0",
                MANDT: "300",
                PORC_OCUPACION: 4
            });


            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 8,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 8,
                IWERK: "2SA1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 0,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 0,
                IWERK: "2SA2",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 132,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 132,
                IWERK: "2SA3",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 90,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 90,
                IWERK: "2TA0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_SE_OCU.push({
                BOX_DISPONIBLE: 78,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 78,
                IWERK: "2TE0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 276,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 276,
                IWERK: "2AN1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 46,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 46,
                IWERK: "2AR0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 138,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 138,
                IWERK: "2CA8",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 207,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 207,
                IWERK: "2CC1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 138,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 138,
                IWERK: "2CH0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 920,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 920,
                IWERK: "2CP0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 46,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 46,
                IWERK: "2CY0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 138,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 138,
                IWERK: "2IQ0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 230,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 230,
                IWERK: "2LA0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 460,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 460,
                IWERK: "2LS1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 207,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 207,
                IWERK: "2ON0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 138,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 138,
                IWERK: "2PA0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 322,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 322,
                IWERK: "2PM0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 368,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 368,
                IWERK: "2QL0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 368,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 368,
                IWERK: "2RA1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 364,
                BOX_OCUPADOS: 4,
                BOX_TOTAL: 368,
                IWERK: "2SA0",
                MANDT: "300",
                PORC_OCUPACION: 1
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 36,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 36,
                IWERK: "2SA1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 0,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 0,
                IWERK: "2SA2",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 506,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 506,
                IWERK: "2SA3",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 345,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 345,
                IWERK: "2TA0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_OCU.push({
                BOX_DISPONIBLE: 300,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 300,
                IWERK: "2TE0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 276,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 276,
                IWERK: "2AN1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 46,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 46,
                IWERK: "2AR0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 138,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 138,
                IWERK: "2CA8",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 207,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 207,
                IWERK: "2CC1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 138,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 138,
                IWERK: "2CH0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 920,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 920,
                IWERK: "2CP0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 46,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 46,
                IWERK: "2CY0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 138,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 138,
                IWERK: "2IQ0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 230,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 230,
                IWERK: "2LA0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 460,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 460,
                IWERK: "2LS1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 207,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 207,
                IWERK: "2ON0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 138,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 138,
                IWERK: "2PA0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 322,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 322,
                IWERK: "2PM0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 368,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 368,
                IWERK: "2QL0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 368,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 368,
                IWERK: "2RA1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 364,
                BOX_OCUPADOS: 4,
                BOX_TOTAL: 368,
                IWERK: "2SA0",
                MANDT: "300",
                PORC_OCUPACION: 1
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 36,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 36,
                IWERK: "2SA1",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 0,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 0,
                IWERK: "2SA2",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 506,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 506,
                IWERK: "2SA3",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 345,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 345,
                IWERK: "2TA0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            GT_LIS_ME_INT.push({
                BOX_DISPONIBLE: 300,
                BOX_OCUPADOS: 0,
                BOX_TOTAL: 300,
                IWERK: "2TE0",
                MANDT: "300",
                PORC_OCUPACION: 0
            });

            that._fillTable("/tabs/0/groups/0/dataset", GT_LIS_DI_OCU, "No se encontraron datos para la visión de box diaria.");
            that._fillTable("/tabs/1/groups/0/dataset", GT_LIS_SE_OCU, "No se encontraron datos para la visión de box semanal.");
            that._fillTable("/tabs/2/groups/0/dataset", GT_LIS_ME_OCU, "No se encontraron datos para la visión de box mensual.");
            that._fillTable("/tabs/3/groups/0/dataset", GT_LIS_ME_INT, "No se encontraron datos para la visión de box internos.");
            that._fillTable("/tabs/3/groups/1/dataset", GT_LIS_ME_EXT, "No se encontraron datos para la visión de box externos.");
			/*
			utils.httpCall({
				service: "Z353R_Centro_Ocupados",
				query: {
					I_BUKRS: "2000"
				},
				success: function(result, status, xhr) {
					that._fillTable("/tabs/0/groups/0/dataset", result.GT_LIS_DI_OCU, "No se encontraron datos para la visión de box diaria.");
					that._fillTable("/tabs/1/groups/0/dataset", result.GT_LIS_SE_OCU, "No se encontraron datos para la visión de box semanal.");
					that._fillTable("/tabs/2/groups/0/dataset", result.GT_LIS_ME_OCU, "No se encontraron datos para la visión de box mensual.");
					that._fillTable("/tabs/3/groups/0/dataset", result.GT_LIS_ME_INT, "No se encontraron datos para la visión de box internos.");
					that._fillTable("/tabs/3/groups/1/dataset", result.GT_LIS_ME_EXT, "No se encontraron datos para la visión de box externos.");
				}
			});

            */
        },

        _fillTable: function (path, list, emptyMessage) {
            if (!list || !list.length) {
                this.addMessage(emptyMessage, "w", false);
            } else {
                let rows = [];
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    let row = this._getRow(item);
                    rows.push(row);
                }
                this.set(path, rows);
            }
        },

        _getRow: function (item) {
            return {
                CENTRO: item.IWERK,
                TOTAL: item.BOX_TOTAL,
                OCUPADOS: item.BOX_OCUPADOS,
                DISPONIBLES: item.BOX_DISPONIBLE,
                PORCENTAJE: item.PORC_OCUPACION
            };
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
            // @ts-ignore
            this[dialog] = sap.ui.xmlfragment(oView.getId(), "sapui5agendar.sco00grafocup_html.view." + fragment, this);
            oView.addDependent(this[dialog]);
            this[dialog].bindElement("/" + dialog);

            //Cargo modelo limpio
            if (this['clearDialogModel_' + fragment])
                this['clearDialogModel_' + fragment]();

            utils.view = this[dialog];

            this[dialog].open();
        },
        closeDialog: function () {
            for (var i = 0; this['openedDialog' + i] && !this['openedDialog' + i].bIsDestroyed; i++);
            let dialog = 'openedDialog' + (i - 1);
            this[dialog].close();
            this[dialog].destroy();
            utils.view = this[this.getCurrentDialogModel()] || this.getView();
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

            this._loadData();
        },
        _basicInit: function () {
            let model = models.createLocalModel();
            let view = this.getView();
            this.model = model;
            model.setProperty('/tabs', this.tabs);
            view.setModel(model);
            utils.view = view;
            utils.controller = this;
            // @ts-ignore

            this._oMessagePopover = new sap.m.MessagePopover({
                items: {
                    path: "message>/",
                    // @ts-ignore
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