// @ts-nocheck
sap.ui.define([
    "sap/m/DatePicker",
    "./MonthCalendar"
], function (DatePicker, MonthCalendar) {
    return DatePicker.extend("sapui5agendar.sco00monitorcliente_html.customelements.monthpicker.MonthPicker", {
        metadata: {},
        renderer: {},
        _createPopupContent: function () {

            if (!this._oCalendar) {
                sap.ui.getCore().loadLibrary("sap.ui.unified");
                jQuery.sap.require("sap.ui.unified.library");
                this._oCalendar = new MonthCalendar(this.getId() + "-cal", {
                    intervalSelection: this._bIntervalSelection,
                    minDate: this.getMinDate(),
                    maxDate: this.getMaxDate(),
                    legend: this.getLegend(),
                    startDateChange: function () {
                        this.fireNavigate({
                            dateRange: this._getVisibleDatesRange(this._oCalendar)
                        });
                    }.bind(this)
                });
                this._oDateRange = new sap.ui.unified.DateRange();
                this._oCalendar.addSelectedDate(this._oDateRange);
                if (this.$().closest(".sapUiSizeCompact").length > 0) {
                    this._oCalendar.addStyleClass("sapUiSizeCompact");
                }
                if (this._bSecondaryCalendarTypeSet) {
                    this._oCalendar.setSecondaryCalendarType(this.getSecondaryCalendarType());
                }
                if (this._bOnlyCalendar) {
                    this._oCalendar.attachSelect(this._selectDate, this);
                    // this._oCalendar.attachCancel(_cancel, this);
                    // this._oCalendar.attachEvent("_renderMonth", _resizeCalendar, this);
                    this._oCalendar.setPopupMode(true);
                    this._oCalendar.setParent(this, undefined, true); // don't invalidate DatePicker
                    this._oPopup.setContent(this._oCalendar);
                }
            }

            if (this.getDateValue() != null) {
                var oMonthPicker = this._oCalendar.getAggregation("monthPicker");
                oMonthPicker.setMonth(this.getDateValue().getMonth());
                this._oCalendar.setAggregation("monthPicker", oMonthPicker);

                var oYearPicker = this._oCalendar.getAggregation("yearPicker");
                oYearPicker.setYear(this.getDateValue().getFullYear());
                this._oCalendar.setAggregation("yearPicker", oYearPicker);
            }

        },
        /* _getSelectedDate : function(){
 
             var oDateRange = new sap.ui.unified.DateRange();
             oDateRange.setStartDate(new Date());
 
             var oDate = oDateRange.getStartDate();
 
             return oDate;
 
         }*/
    });
});