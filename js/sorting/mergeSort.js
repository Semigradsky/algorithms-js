(function(root) {
    "use strict";
    
    root.Sorting = root.Sorting || { };
    root.Sorting.MergeSort = function(A, descending) {
        var TEST_MODE = root.TEST_MODE;
        
        if (TEST_MODE) {
            console.group("Start sorting. A =", A, "Size: " + A.length);
        }

        MergeSort(A, 0, A.length - 1);
        
        if (TEST_MODE) {
            console.info("Sorted array =", A);
            console.groupEnd();
        }
        return A;
    };
    
    function MergeSort(A, p, r) {
        if (p < r) {
            var q = Math.floor((p + r) / 2);
            
            if (TEST_MODE) {
                var firstArray = (p == q) ? "A[" + p + "]" : "A[" + p + ".." + q + "]",
                    secondArray = ((q+1) == r) ? "A[" + r + "]" : "A[" + (q+1) + ".." + r + "]";
                console.groupCollapsed("Cut to arrays: " + firstArray + " and " + secondArray);
            }
                
            MergeSort(A, p, q);
            MergeSort(A, q + 1, r);
            console.log(p, q, r);
            Merge(A, p, q, r);
        }
    }
    
    function Merge(A, p, q, r) {
        var n1 = q - p + 1,
            n2 = r - q,
            L = [ ],
            R = [ ];

        for (var i = 0; i < n1; i++) {
            L[i] = A[p + i];
        }
        for (var j = 0; j < n2; j++) {
            R[j] = A[q + j + 1];
        }
        L[n1] = Infinity;
        R[n2] = Infinity;
        
        i = 0; j = 0;
        for (var k = p; k <= r; k++) {
            if (L[i] <= R[j]) {
                A[k] = L[i];
                i = i + 1;
            } else {
                A[k] = R[j];
                j = j + 1;
            }
        }
        
        if (TEST_MODE) {
            console.log("After merge", L, "and", R);
            console.log("A =", A);
            console.groupEnd();
        }
    }
    
}(this));