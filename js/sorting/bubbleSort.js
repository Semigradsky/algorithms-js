(function(root) {
    "use strict";
    
    root.Sorting = root.Sorting || { };
    root.Sorting.BubbleSort = function(A, descending) {
        var TEST_MODE = root.TEST_MODE;
        
        if (TEST_MODE) {
            console.group("Start sorting. A =", A, "Size: " + A.length);
        }

        for (var i = 0; i < A.length - 1; i++) {
            if (TEST_MODE) {
                console.groupCollapsed("Loop " + (i+1));
            }
            
            for (var j = A.length - 1; j > i; j--) {
                if (descending ? A[j] > A[j - 1] : A[j] < A[j - 1]) {
                    if (TEST_MODE) {
                        console.groupCollapsed("A[", j - 1, "] <-> A[", j, "]");
                    }
                    
                    var t = A[j];
                    A[j] = A[j - 1];
                    A[j - 1] = t;
                    
                    if (TEST_MODE) {
                        console.log("A =", A);
                        console.groupEnd();
                    }
                }
            }
            if (TEST_MODE) {
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
