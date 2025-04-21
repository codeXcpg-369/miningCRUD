sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("app.capgb27odatamining.controller.UpdateView", {
        onInit: function () {
            let oRouter = this.getRouter();
            oRouter.attachRoutePatternMatched(this._routeMatched, this);
        },

        _routeMatched: function (oEvent) {
            let index = oEvent.getParameter("arguments").indexDetail
            let sPath = "MiningDetails>/" + index;
            let oView = this.getView();
            oView.bindElement(sPath);

        },


        onUpdate: function () {
            // Objects of the input fields
            let oLocId=this.getView().byId("idCarrUp")
            let oDescId=this.getView().byId("idConnUp")
            let oMraId=this.getView().byId("idBookUp")
            let oTcId=this.getView().byId("idDofUp")
            let oPmId=this.getView().byId("idMinUp")
            let oTdId=this.getView().byId("idTotUp")
            let oMfId=this.getView().byId("idMfUp")
            //values for all the fields
            let sLocId=oLocId.getValue()
            let sDescId=encodeURIComponent(oDescId.getValue().replace(/ $/g, ""));
            let sMraId=oMraId.getValue()
            let sTcId=oTcId.getValue()
            let sPmId=oPmId.getValue()
            let sTdId=oTdId.getValue()
            let sMfId=oMfId.getValue()
        
            let payload = {
                "M_RES_ALLOC" :sMraId,
                "TOTAL_COST" :sTcId,
                "REPT_POSS_MIN" :sPmId,
                "TOTAL_DRILLS" :sTdId,
                "MINERALS_FOUND" :sMfId
            };
        
            let oModel = this.getOwnerComponent().getModel();

            let entity = `/WASet(LOCATION_ID='${sLocId}',LOC_DESCPN='${sDescId}')`;
   
            oModel.update(entity, payload, {
                success: function (resp) {
                    MessageBox.success("Details Updated", {
                        onClose: function () {
                            var oRouter = this.getOwnerComponent().getRouter();
                            oRouter.navTo("RouteMiningView");
                        }.bind(this)
                    });
                },
                error: function (error) {
                    MessageBox.error("Update Failed");
                }
            });
        }
        
        
    });
});





