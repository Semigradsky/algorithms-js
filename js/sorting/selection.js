(function(root) {
    "use strict";
    
    root.Sorting = root.Sorting || { };
    root.Sorting.SelectionSort = function(A, descending) {
        var TEST_MODE = root.TEST_MODE;
        
        if (TEST_MODE) {
            console.group("Start sorting. A =", A, "Size: " + A.length);
        }

        for (var j = 0; j < A.length - 1; j++) {
            if (TEST_MODE) {
                if (descending) {
                    console.group("Searching maximal element from ", j, "position.");
                } else {
                    console.group("Searching minimal element from ", j, "position.");
                }
            }
            
            var pos = j;
            for (var i = j + 1; i < A.length; i++) {
                if (descending ? A[i] > A[pos] : A[i] < A[pos]) {
                    pos = i;
                }
            }
            
            if (TEST_MODE) {
                console.log("Founded item: ", A[pos]);
                console.log("A[" + j + "] <-> A[" + pos + "]");
                console.log("A =", A);
                console.groupEnd();
            }
            
            var t = A[j];
            A[j] = A[pos];
            A[pos] = t;
        }
        
        if (TEST_MODE) {
            console.info("Sorted array =", A);
            console.groupEnd();
        }
        return A;
    };
    
}(this));