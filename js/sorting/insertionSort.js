(function(root) {
    "use strict";
    
    root.Sorting = root.Sorting || { };
    root.Sorting.InsertionSort = function(A, descending) {
        var TEST_MODE = root.TEST_MODE;
        
        if (TEST_MODE) {
            console.group("Start sorting. A =", A, "Size: " + A.length);
        }
        
        for (var j = 1; j < A.length; j++) {
            var key = A[j];
            if (TEST_MODE) {
                console.groupCollapsed("Set key =", key, "( A[" + j + "] )");
            }

            var i = j - 1;
            while (i >= 0) {
                if (descending ? A[i] < key : A[i] > key) {
                    if (TEST_MODE) {
                        console.log("Check A[" + i + "] " + (descending ? "<" : ">") + " key (", A[i], (descending ? "<" : ">"), key, "). True.");
                    }
                        
                    A[i + 1] = A[i];
                    i = i - 1;
                    
                    if (TEST_MODE) {
                        console.groupCollapsed("A[" + (i+1) + "] <- A[" + i + "]");
                        console.log("A =", A);
                        console.groupEnd();
                    }
                } else {
                    if (TEST_MODE) {
                        console.log("Check A[" + i + "] " + (descending ? "<" : ">") + " key (", A[i], (descending ? "<" : ">"), key, "). False.");
                    }
                    break;
                }
            }
            
            A[i + 1] = key;
            
            if (TEST_MODE) {
                console.groupCollapsed("A[" + (i+1) + "] <- key");
                console.log("A =", A);
                console.groupEnd();

                console.log("A =", A);
                console.groupEnd();
            }
        }
        
        if (TEST_MODE) {
            console.info("Sorted array =", A);
            console.groupEnd();
        }
        return A;
    };
    
}(this));
