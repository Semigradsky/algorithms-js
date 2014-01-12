/*global self, log, initializeWebWorker */
/*jshint globalstrict: true*/
"use strict";


/**
* The algorithm divides the input list into two parts: the sublist
* of items already sorted, which is built up from left to right at
* the front (left) of the list, and the sublist of items remaining
* to be sorted that occupy the rest of the list. Initially, the
* sorted sublist is empty and the unsorted sublist is the entire input
* list. The algorithm proceeds by finding the smallest (or largest,
* depending on sorting order) element in the unsorted sublist, exchanging
* it with the leftmost unsorted element (putting it in sorted order),
* and moving the sublist boundaries one element to the right.
*
* http://en.wikipedia.org/wiki/Selection_sort
*/
var SelectionSort = function(A, descending, TEST_MODE) {
    if (TEST_MODE) {
        log('GROUP', ['Start sorting. A =', A, 'Size: ' + A.length]);
    }

    for (var j = 0; j < A.length - 1; j++) {
        if (TEST_MODE) {
            if (descending) {
                log('GROUP_COLLAPSED', ['Searching maximal element from ', j, 'position.']);
            } else {
                log('GROUP_COLLAPSED', ['Searching minimal element from ', j, 'position.']);
            }
        }
        
        var pos = j;
        for (var i = j + 1; i < A.length; i++) {
            if (descending ? A[i] > A[pos] : A[i] < A[pos]) {
                pos = i;
            }
        }
        
        if (TEST_MODE) {
            log('LOG', ['Founded item: ', A[pos]]);
            log('LOG', ['A[' + j + '] <-> A[' + pos + ']']);
            log('LOG', ['A =', A]);
            log('GROUP_END');
        }
        
        var t = A[j];
        A[j] = A[pos];
        A[pos] = t;
    }
    
    if (TEST_MODE) {
        log('INFO', ['Sorted array =', A]);
        log('GROUP_END');
    }
    return A;
};


self.importScripts('/js/worker.js');
initializeWebWorker(SelectionSort);
