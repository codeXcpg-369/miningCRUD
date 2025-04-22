sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("app.capgb27odatamining.controller.CreateView", {
        onInit: function() {
            
        },
        onSubmit: function(){

            //PAYLOAD
            //objects of the input field
            let oLocId=this.getView().byId("idCarrCr")
            let oDescId=this.getView().byId("idConnCr")
            let oMraId=this.getView().byId("idBookCr")
            let oTcId=this.getView().byId("idDofCr")
            let oPmId=this.getView().byId("idMinCr")
            let oTdId=this.getView().byId("idTotCr")
            let oMfId=this.getView().byId("idMfCr")
            //values for all the fields
            let sLocId=oLocId.getValue()
            let sDescId=oDescId.getValue()
            let sMraId=oMraId.getValue()
            let sTcId=oTcId.getValue()
            let sPmId=oPmId.getValue()
            let sTdId=oTdId.getValue()
            let sMfId=oMfId.getValue()

            let payload={
               "LOCATION_ID" :sLocId,
               "LOC_DESCPN" :sDescId,
               "M_RES_ALLOC" :sMraId,
               "TOTAL_COST" :sTcId,
               "REPT_POSS_MIN" :sPmId,
               "TOTAL_DRILLS" :sTdId,
               "MINERALS_FOUND" :sMfId,
            }

            let oModel=this.getOwnerComponent().getModel()
            let entity="/WASet"
            let that = this;
            oModel.create(entity, payload,{
                success:function(response){
                    MessageBox.success("Record Inserted",{
                        onClose: function(){
                            let oRouter = that.getOwnerComponent().getRouter();
                            oRouter.navTo("RouteMiningView")
                            oModel.refresh(true);
                        }
                    })
                },
                error:function(error){
                    MessageBox.error("Insertion Failed");
                }
            })

            //1. get the model
            //2. we need the entity
            //3. method(theEntity, payload{succ, error})
        }






    });
});