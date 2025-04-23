sap.ui.define([
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Filter, FilterOperator) => {
    "use strict";

    return {
        checkIfRecordExists: function(oModel, entitySet, sLocId, sDescId, successCallback, errorCallback) {
            let aFilters = [
                new Filter("LOCATION_ID", FilterOperator.EQ, sLocId),
                new Filter("LOC_DESCPN", FilterOperator.EQ, sDescId)
            ];

            oModel.read(entitySet, {
                filters: aFilters,
                success: function(oData) {
                    let exists = oData.results.some(item => 
                        item.LOCATION_ID === sLocId || item.LOC_DESCPN === sDescId
                    );
                    successCallback(exists);
                },
                error: function(error) {
                    errorCallback(error);
                }
            });
        }
    };
});
