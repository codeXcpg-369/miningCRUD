sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
      "app/capgb27odatamining/formatter/formatter"
], (Controller, Filter, FilterOperator, MessageBox,formatter) => {
    "use strict";

    return Controller.extend("app.capgb27odatamining.controller.DetailView", {
        formatter: formatter,
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
        },
        onHome:function(){
            let oRouter = this.getRouter();
            oRouter.navTo("RouteMiningView")
        }
      

    });
});
