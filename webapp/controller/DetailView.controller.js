sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], (Controller, Filter, FilterOperator, MessageBox) => {
    "use strict";

    return Controller.extend("app.capgb27odatamining.controller.DetailView", {
        onInit: function() {
            let oRouter = this.getRouter();
            oRouter.attachRoutePatternMatched(this._oRouteMatched, this);
        },
        _oRouteMatched:function(oEvent){
            this.index = oEvent.getParameter("arguments").indexDetail;
            let sPath = "MiningDetails>/"+ this.index ;
            let oView = this.getView();
            oView.bindElement(sPath);

        },
        onEdit:function(){
            let oRouter = this.getRouter()
            oRouter.navTo("RouteUpdateView",{
                indexDetail:this.index
            })
        }
      

    });
});
