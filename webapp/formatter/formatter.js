sap.ui.define([], function() {
    "use strict";
    return {
        formatCurrency: function(value) {
            if (value) {
                return "₹" + value;
            }
            return value;
        }
    };
});
