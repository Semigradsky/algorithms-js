/*global self, log, initializeWebWorker */
/*jshint globalstrict: true*/
"use strict";


/**
*  A sort algorithm that splits the items to be sorted into two groups,
* recursively sorts each group, and merges them into a final, sorted sequence.
*
* http://en.wikipedia.org/wiki/Merge_sort
*/
var MergeSort = function(A, descending, TEST_MODE) {
    if (TEST_MODE) {
        log('GROUP', ['Start sorting. A =', A, 'Size: ' + A.length]);
    }

    _MergeSort(A, 0, A.length - 1, TEST_MODE);
    
    if (TEST_MODE) {
        log('INFO', ['Sorted array =', A]);
        log('GROUP_END');
    }
    return A;
};

var _MergeSort = function(A, p, r, TEST_MODE) {
    if (p < r) {
        var q = Math.floor((p + r) / 2);
        
        if (TEST_MODE) {
            var firstArray = (p == q) ? "A[" + p + "]" : "A[" + p + ".." + q + "]",
                secondArray = ((q+1) == r) ? "A[" + r + "]" : "A[" + (q+1) + ".." + r + "]";
            log('GROUP_COLLAPSED', ['Cut to arrays: ' + firstArray + ' and ' + secondArray]);
        }
            
        _MergeSort(A, p, q, TEST_MODE);
        _MergeSort(A, q + 1, r, TEST_MODE);
        _Merge(A, p, q, r, TEST_MODE);
    }
};

var _Merge = function(A, p, q, r, TEST_MODE) {
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
        log('LOG', ['After merge', L, 'and', R]);
        log('LOG', ['A =', A]);
        log('GROUP_END');
    }
};


self.importScripts('/js/worker.js');
initializeWebWorker(MergeSort);
