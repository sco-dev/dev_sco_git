// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sapui5agendar/sco00mantenedorcliente_html/utils/utils",
    "sapui5agendar/sco00mantenedorcliente_html/model/models",
    "sapui5agendar/sco00mantenedorcliente_html/utils/validator",
    "sap/ui/core/routing/History"
], function (Controller, utils, models, Validator, History) {
    "use strict";

    return Controller.extend("sapui5agendar.sco00mantenedorcliente_html.controller.Master", {

        handleCreate: function () {

            //        let validator = new Validator();
            //        let valid = validator.validate(this.byId("filters"));

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            localStorage['rut'] = this.get('/filters/Cliente');
            oRouter.navTo("create");



            //_onRouteMatched
            /*
                        if (valid) {
                            let status = this._userStatus();
                            switch (status) {
                            case 'E':
                                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                                localStorage['rut'] = this.get('/filters/Cliente');
                                oRouter.navTo("create");
                                break;
                            case 'S':
                                this.addMessage("El cliente " + this.get('/filters/Cliente') +
                                    " ya ha sido creado, presione el botón Modificar para editar los datos del cliente.", "W");
                                break;
                            case 'Z':
                                this.addMessage("El cliente " + this.get('/filters/Cliente') +
                                    " ya ha sido creado pero no es posible modificarlo (Grupo cuenta).", "W");
                                break;
                            }
                        }
        
                        */
        },

        handleBack: function () {
            // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // oRouter.navTo("");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                if (sPreviousHash == 'access') {
                    localStorage['fromPage'] = oRouter._oRouter._prevMatchedRequest;
                }
                window.history.go(-1);
            } else {
                oRouter.navTo("overview", true);
            }
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

            this[dialog] = sap.ui.xmlfragment(oView.getId(), "salfacloud.app00120mantenedordeclientes.view." + fragment, this);
            oView.addDependent(this[dialog]);
            this[dialog].bindElement("/" + dialog);

            //Cargo modelo limpio
            if (this['clearDialogModel_' + fragment])
                this['clearDialogModel_' + fragment]();

            this[dialog].open();
        },
        closeDialog: function () {
            for (var i = 0; this['openedDialog' + i] && !this['openedDialog' + i].bIsDestroyed; i++);
            let dialog = 'openedDialog' + (i - 1);
            this[dialog].close();
            this[dialog].destroy();
        },
        getCurrentDialogModel: function () {
            for (var i = 0; this['openedDialog' + i] && !this['openedDialog' + i].bIsDestroyed; i++);
            return 'openedDialog' + (i - 1);
        },
        clearDialogModel_: function (cleanModel) {
            let model = this.getView().getModel();
            model.setProperty('/' + this.getCurrentDialogModel(), cleanModel);
        },
        getFromCurrentDialog: function (path) {
            let model = this.getView().getModel();
            return model.getProperty(`/${this.getCurrentDialogModel()}/${path}`);
        },
        setToCurrentDialog: function (path, data) {
            let model = this.getView().getModel();
            return model.setProperty(`/${this.getCurrentDialogModel()}/${path}`, data);
        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        /**
         * Init
         */
        onInit: function () {
            this._basicInit();
        },
        _basicInit: function () {
            let model = models.createLocalModel();
            let view = this.getView();
            this.model = model;

            model.setProperty('/filters', {});
            view.setModel(model);
            utils.view = view;
            utils.controller = this;

            this._oMessagePopover = new sap.m.MessagePopover({
                items: {
                    path: "message>/",
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
                } catch (ex) { }
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

        handleUpdate: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            localStorage['rut'] = this.get('/filters/Cliente');
            oRouter.navTo("update");
        },

        handleShow: function () {

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            localStorage['rut'] = this.get('/filters/Cliente');
            oRouter.navTo("access");

        }


    });
});
