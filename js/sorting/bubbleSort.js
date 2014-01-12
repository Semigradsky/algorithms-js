/*global self, log, initializeWebWorker */
/*jshint globalstrict: true*/
"use strict";


/**
* Bubble sort, sometimes incorrectly referred to as sinking sort,
* is a simple sorting algorithm that works by repeatedly stepping
* through the list to be sorted, comparing each pair of adjacent
* items and swapping them if they are in the wrong order. The pass
* through the list is repeated until no swaps are needed, which
* indicates that the list is sorted.
*
* http://en.wikipedia.org/wiki/Bubble_sort
*/
var BubbleSort = function(A, descending, TEST_MODE) {
    if (TEST_MODE) {
        log('GROUP', ['Start sorting. A =', A, 'Size: ', A.length]);
    }

    for (var i = 0; i < A.length - 1; i++) {
        if (TEST_MODE) {
            log('GROUP_COLLAPSED', ['Loop' + (i+1)]);
        }

        for (var j = A.length - 1; j > i; j--) {
            if (descending ? A[j] > A[j - 1] : A[j] < A[j - 1]) {
                if (TEST_MODE) {
                    log('GROUP_COLLAPSED', ['A[', j - 1, '] <-> A[', j, ']']);
                }

                var t = A[j];
                A[j] = A[j - 1];
                A[j - 1] = t;

                if (TEST_MODE) {
                    log('LOG', ['A =', A]);
                    log('GROUP_END');
                }
            }
        }
        if (TEST_MODE) {
            log('LOG', ['A =', A]);
            log('GROUP_END');
        }
    }

    if (TEST_MODE) {
        log('INFO', ['Sorted array =', A]);
        log('GROUP_END');
    }
    return A;
};


self.importScripts('/js/worker.js');
initializeWebWorker(BubbleSort);
