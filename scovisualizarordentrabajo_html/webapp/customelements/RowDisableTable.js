// @ts-nocheck
sap.ui.define([
    "sap/ui/table/Table",
    "sap/ui/table/TableRenderer",
    "sap/ui/table/Column"
], function (Table, TableRenderer, Column) {
    "use strict";

    var rdt = Table.extend("sapui5agendar.scovisualizarordentrabajo_html.customelements.RowDisableableTable", {
        renderer: TableRenderer.render
    });
    rdt.prototype.selectedIndices = [];

    var tableBeforeRendering = rdt.prototype.onBeforeRendering;
    rdt.prototype.onBeforeRendering = function (oEvent) {
        if (this.mAggregations.columns.length && !this.mAggregations.columns[0].header) {
            let label = oEvent.srcControl.getEnableSelectAll() ? new sap.m.CheckBox({
                selected: false,
                select: function (event) {
                    let selected = event.getParameter('selected');

                    let table = event.getSource().getParent().getParent();
                    let tableModel = table.getModel();
                    let contexts = table.getBinding('rows').getContexts();

                    table.selectedIndices = [];
                    contexts.forEach((r, i) => {
                        // Si se activo el checkbox de all y esta habilitada la row
                        if (table.mAggregations.rows[i].mAggregations.cells[0].mProperties.enabled) {
                            tableModel.setProperty(r.sPath + '/_selected', selected);
                            if(selected) {
                                table.selectedIndices.push(i);
                            }
                        }
                    });

                    table.rerender();
                    table.fireRowSelectionChange({
                        rowIndex: table.selectedIndices.length ? table.selectedIndices[0] : null,
                        rowContext: null,
                        rowIndices: table.selectedIndices,
                        selectAll: true,
                        userInteraction: true
                    });
                }
            }) : null;

            let headerColumn = new Column({
                width: '50px',
                hAlign: "Center",
                label,
                template: new sap.m.CheckBox({
                    selected: '{_selected}',
                    select: function (event) {
                        let selected = event.getParameter('selected');

                        let row = event.getSource().getParent();
                        let table = row.getParent();
                        let index = row.getIndex();

                        let indices = table.selectedIndices;
                        if (selected) {
                            indices.push(index);
                        } else {
                            for (let i = indices.length - 1; i >= 0; i--) {
                                if (indices[i] === index) {
                                    indices.splice(i, 1);
                                }
                            }
                        }

                        $(row.getDomRef()).toggleClass("sapUiTableRowSel", selected);

                        table.fireRowSelectionChange({
                            rowIndex: index,
                            rowContext: table.getContextByIndex(index),
                            rowIndices: index,
                            selectAll: false,
                            userInteraction: true
                        });
                    }
                })
            });
            headerColumn.header = true;
            this.insertColumn(headerColumn);
        }
        tableBeforeRendering.apply(this, [oEvent]);
    };

    var tableAfterRendering = rdt.prototype.onAfterRendering;
    rdt.prototype.onAfterRendering = function (oEvent) {
        this.updateSelectedRows();
        tableAfterRendering.apply(this, [oEvent]);
    };

    rdt.prototype.clearSelection = function () {
        let tableModel = this.getModel();

        // reseteo de selectAll
        let columns = this.mAggregations.columns;
        if (columns && columns.length && columns[0].getLabel().setSelected) {
            columns[0].getLabel().setSelected(false);
        }

        //desseleccion de rows
        this.selectedIndices = [];
        if (this.getBinding('rows')) {
            this.getBinding('rows').getContexts().forEach((r, i) => {
                tableModel.setProperty(r.sPath + '/_selected', false);
            });
            this.updateSelectedRows();
        }
        this.fireRowSelectionChange({
            userInteraction: true
        });
        return this
    };

    rdt.prototype.updateSelectedRows = function () {
        this.getRows().forEach((r) => {
            var context = r.getBindingContext();
            if (context) {
                var obj = context.getObject();
                $(r.getDomRef()).toggleClass("sapUiTableRowSel", !!obj._selected);
            }
        })
    };

    var tableUpdateSelection = rdt.prototype._updateSelection;
    rdt.prototype._updateSelection = function () {
        tableUpdateSelection.apply(this);

        this.updateSelectedRows();
    };

    rdt.prototype.getSelectedIndices = function () {
        return this.selectedIndices;
    };

    return rdt;
});

