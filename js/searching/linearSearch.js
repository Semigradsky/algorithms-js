(function(root) {
    "use strict";

    root.Searching = root.Searching || { };
    root.Searching.LinearSearch = function(A, el) {
        var TEST_MODE = root.TEST_MODE;

        if (TEST_MODE) {
            console.group("Start searching. Searching element:", el, " A =", A, " Size: " + A.length);
        }

        for (var i = 0; i < A.length; i++) {
            if (A[i] == el) {
                if (TEST_MODE) {
                    console.log("Check A[" + i + "] == searching element (", A[i], "=", el, ") True.");
                    console.log("Element founded!");
                    console.groupEnd();
                }

                return i;
            } else {
                if (TEST_MODE) {
                    console.log("Check A[" + i + "] == searching element (", A[i], "=", el, ") False.");
                }
            }
        }
        if (TEST_MODE) {
            console.log("Element not founded!");
            console.groupEnd();
        }

        return null;
    };

}(this));
