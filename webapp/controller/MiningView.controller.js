sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "app/capgb27odatamining/formatter/formatter"
], (Controller, Filter, FilterOperator, MessageBox, formatter) => {
    "use strict";

    return Controller.extend("app.capgb27odatamining.controller.MiningView", {
        formatter: formatter,
        onInit: function() {
            this._getData()
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

        onCreate: function() {
            var oRouter = this.getRouter();
            oRouter.navTo("RouteCreateView");
        },

        onSearch: function() {
            let aFilter = [];
            let slocId = this.getView().byId("idFilterloc").getValue();
            let sdescId = this.getView().byId("idFilterdesc").getValue();
            let sdrillId = this.getView().byId("idFilterdrill").getValue();
            let sMinId = this.getView().byId("idFilterMin").getValue();

            if (slocId) {
                let filterName = new Filter("LOCATION_ID", FilterOperator.Contains, slocId);
                aFilter.push(filterName);
            }
            if (sdescId) {
                let filterName = new Filter("LOC_DESCPN", FilterOperator.Contains, sdescId);
                aFilter.push(filterName);
            }
            if (sdrillId) {
                let filterName = new Filter("TOTAL_DRILLS", FilterOperator.Contains, sdrillId);
                aFilter.push(filterName);
            }
            if (sMinId) {
                let filterName = new Filter("MINERALS_FOUND", FilterOperator.Contains, sMinId);
                aFilter.push(filterName);
            }

            let oTable = this.getView().byId("idMiningTab");
            let oBinding = oTable.getBinding("items");
            oBinding.filter(aFilter);
        },

        onRowSelection:function(oEvent){
            let oItem = oEvent.getParameter("listItem");
            let oContext = oItem.getBindingContextPath("MiningDetails");
            let aItem = oContext.split("/");
            let index = aItem[aItem.length-1];
            let oRouter = this.getRouter();
                oRouter.navTo("RouteDetailView",{
                    indexDetail:index
                })


        },
        onDelete: function(oEvent) {
            let oContext = oEvent.getSource().getBindingContext("MiningDetails").getObject();
            MessageBox.confirm("Are you sure you want to delete?", {
                onClose: (choice) => {
                    if (choice==='OK') {
                        this._onDeleteCall(oContext)

                    }
                }
            });
        },

        _onDeleteCall:function(parm){
            let key1 = parm.LOCATION_ID
            let key2 = encodeURIComponent(parm.LOC_DESCPN); 
            let oModel = this.getOwnerComponent().getModel();

            let entity = `/WASet(LOCATION_ID='${key1}',LOC_DESCPN='${key2}')`;
            oModel.remove(entity,{
                success:(resp)=>{
                    MessageBox.success("Record deleted",{
                        onClose:function(){
                             this._getData()
                        }.bind(this)
                    });
                },
                error:(err)=>{
                    MessageBox.error("Record delete failed");

                }
            })

        }

    });
});
