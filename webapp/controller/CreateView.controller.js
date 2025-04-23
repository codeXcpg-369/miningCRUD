// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/m/MessageBox"
// ], (Controller, MessageBox) => {
//     "use strict";

//     return Controller.extend("app.capgb27odatamining.controller.CreateView", {
//         onInit: function() {
//             // Initialization logic, if any
//         },
//         onSubmit: function() {
//             // Fetching input field objects
//             let oLocId = this.getView().byId("idCarrCr");
//             let oDescId = this.getView().byId("idConnCr");
//             let oMraId = this.getView().byId("idBookCr");
//             let oTcId = this.getView().byId("idDofCr");
//             let oPmId = this.getView().byId("idMinCr");
//             let oTdId = this.getView().byId("idTotCr");
//             let oMfId = this.getView().byId("idMfCr");

//             // Getting values from input fields
//             let sLocId = oLocId.getValue();
//             let sDescId = oDescId.getValue();
//             let sMraId = oMraId.getValue();
//             let sTcId = oTcId.getValue();
//             let sPmId = oPmId.getValue();
//             let sTdId = oTdId.getValue();
//             let sMfId = oMfId.getValue();

//             // Preparing the payload
//             let payload = {
//                 "LOCATION_ID": sLocId,
//                 "LOC_DESCPN": sDescId,
//                 "M_RES_ALLOC": sMraId,
//                 "TOTAL_COST": sTcId,
//                 "REPT_POSS_MIN": sPmId,
//                 "TOTAL_DRILLS": sTdId,
//                 "MINERALS_FOUND": sMfId
//             };

            
//             let oModel = this.getOwnerComponent().getModel();
//             let entitySet = "/WASet";
//             let that = this;

//             // Validation
//             oModel.read(entitySet, {
//                 success: function(oData) {
//                     let exists = oData.results.some(item => 
//                         item.LOCATION_ID === sLocId || item.LOC_DESCPN === sDescId
//                     );
//                     if (exists) {
//                         MessageBox.error("Record with the same keys already exists.");
//                     } else {
//                         oModel.create(entitySet, payload, {
//                             success: function(response) {
//                                 MessageBox.success("Record Inserted", {
//                                     onClose: function() {
//                                         let oRouter = that.getOwnerComponent().getRouter();
//                                         oRouter.navTo("RouteMiningView");
//                                         oModel.refresh(true);
//                                     }
//                                 });
//                             },
//                             error: function(error) {
//                                 MessageBox.error("Insertion Failed");
//                             }
//                         });
//                     }
//                 },
//                 error: function(error) {
//                     MessageBox.error("Error checking existing records.");
//                 }
//             });
//         }
//     });
// });
//External validator







sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "app/capgb27odatamining/validator/validator"
], (Controller, MessageBox, validator) => {
    "use strict";

    return Controller.extend("app.capgb27odatamining.controller.CreateView", {
        onInit: function() {
        },
        _getData:function(){
            let entitySet = `/WASet`;
            let oModel = this.getOwnerComponent().getModel();
            oModel.read(entitySet, {
                success: (oData, response) => {
                    let jModel = this.getOwnerComponent().getModel("MiningDetails");
                        jModel.setData(oData.results);
                },
                error: () => {}
            });
        },
        onSubmit: function() {
            // Fetching input field objects
            let oLocId = this.getView().byId("idCarrCr");
            let oDescId = this.getView().byId("idConnCr");
            let oMraId = this.getView().byId("idBookCr");
            let oTcId = this.getView().byId("idDofCr");
            let oPmId = this.getView().byId("idMinCr");
            let oTdId = this.getView().byId("idTotCr");
            let oMfId = this.getView().byId("idMfCr");

            // Getting values from input fields
            let sLocId = oLocId.getValue();
            let sDescId = oDescId.getValue();
            let sMraId = oMraId.getValue();
            let sTcId = oTcId.getValue();
            let sPmId = oPmId.getValue();
            let sTdId = oTdId.getValue();
            let sMfId = oMfId.getValue();

            // payload
            let payload = {
                "LOCATION_ID": sLocId,
                "LOC_DESCPN": sDescId,
                "M_RES_ALLOC": sMraId,
                "TOTAL_COST": sTcId,
                "REPT_POSS_MIN": sPmId,
                "TOTAL_DRILLS": sTdId,
                "MINERALS_FOUND": sMfId
            };

            let oModel = this.getOwnerComponent().getModel();
            let entitySet = "/WASet";
            let that = this;

            // validation
            validator.checkIfRecordExists(oModel, entitySet, sLocId, sDescId, function(exists) {
                if (exists) {
                    MessageBox.error("Record with the same keys already exists.");
                } else {
                    oModel.create(entitySet, payload, {
                        success: function(response) {
                            oLocId.setValue("");
                            oDescId.setValue("");
                            oMraId.setValue("");
                            oTcId.setValue("");
                            oPmId.setValue("");
                            oTdId.setValue("");
                            oMfId.setValue("");
                            MessageBox.success("Record Inserted", {
                                onClose: function() {
                                    let oRouter = that.getOwnerComponent().getRouter();
                                    oRouter.navTo("RouteMiningView");
                                    this._getData();
                                    oModel.refresh(true);
                              

                                }.bind(this)
                            });
                        }.bind(that),
                        error: function(error) {
                            MessageBox.error("Insertion Failed");
                        }
                    });
                }
            }, function(error) {
                MessageBox.error("Error checking existing records.");
            });
        }
    });
});
