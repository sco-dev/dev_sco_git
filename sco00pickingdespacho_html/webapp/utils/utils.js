// @ts-nocheck
sap.ui.define([
    "sap/m/MessageBox"
], function (MessageBox) {
    "use strict";

    return {
        pendingRequests: 0,
        user: "",

        httpCall: function (params) {
            var that = this;
            that.pendingRequests++;
         //   that.view.setBusy(true);

            var dataResult = {};

            params.query = params.query ? params.query : {};
            params.query.format = 'json';

            var url = "/SalfaCloud/" + params.service;
            
            //Testing Local
           /* if (!window.location.href.includes('https')) {
                url = "https://flpnwc-d69a1fd3a.dispatcher.us2.hana.ondemand.com/sap/fiori/app00030consultaequipo" + url;
            }*/

            $.ajax({
                url: url,
                contentType: 'application/json',
                headers: params.headers ? params.headers : {},
                type: params.type ? params.type : "GET",
                dataType: params.dataType ? params.dataType : "JSON",
                async: params.async ? params.async : true,
                data: params.type && params.type.toLowerCase() === 'post' ? JSON.stringify(params.query) : params.query,
                error: params.error ? params.error : function (e) {
                    try {
                        MessageBox.error("Se ha producido un error al comunicarse con los servicios de Backend. \n\n Código HTTP " + e.responseJSON.ERROR_CODE + " - " + e.responseJSON.ERROR_MESSAGE);
                    }
                    catch (err) {
                        MessageBox.error("No ha podido comunicarse con los servicios de SCP");
                    }
                },
                success: params.success,
            }).always(function () {
                that.pendingRequests--;
                if (that.pendingRequests === 0) {
          //          that.view.setBusy(false);
                }
            });

            return dataResult;
        },

        getUser : function () {
            if (!this.user) {
                var that = this,
                    url = "/services/userapi/currentUser";
                if (!window.location.href.includes('https')) {
                    url = "https://flpnwc-d69a1fd3a.dispatcher.us2.hana.ondemand.com/sap/fiori/app00030consultaequipo" + url;
                }
                $.ajax({
                    contentType : 'application/json',
                    headers : {},
                    type : "GET",
                    async : false,
                    url : url,
                    error : function (e) {
                        MessageBox.error("No ha podido obtener los datos de usuario");
                    },
                    success : function (result, status, xhr) {
                        that.user = result.name;
                    }
                });
            }

            return this.user;
        }
    };
});