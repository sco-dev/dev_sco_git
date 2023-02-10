// @ts-nocheck
sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(JSONModel) {
    "use strict";
    return {
        initModelView: function(controller) {
        	
        	var jsonModel = new sap.ui.model.json.JSONModel();
        	jsonModel.setData({});
//        	jsonModel.setSizeLimit(1000);
            controller.getView().setModel(jsonModel);
            
            
        },
        property: function(controller,root,data) {
        	if(data === false){
        		controller.getView().getModel().setProperty(root,data);
                return null;
        	}
        	
            if(data){
                controller.getView().getModel().setProperty(root,data);
                return null;
            }else{
                return controller.getView().getModel().getProperty(root);
            }
        },
        refreshModel: function(controller) {
            controller.getView().getModel().refresh();
        },
        byId: function(controller,id){
            return controller.getView().byId(id);
        },
        controllerFromView: function(controller,id){
            var idController = this.byId(controller,id).getId();
            return sap.ui.getCore().byId(idController).getController();
        },
        controller: function(nameController){
            return sap.ui.getCore().byId(this.createId(nameController)).getController();
        }
    };
});