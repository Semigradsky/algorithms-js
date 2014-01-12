/*global self, log, initializeWebWorker */
/*jshint globalstrict: true*/
"use strict";


/**
*  A sorting algorithm that inserts each item in the proper place into
* an initially empty list by comparing it with each item in the list
* until it finds the new element's successor or the end of the list.
*
* http://en.wikipedia.org/wiki/Insertion_sort
*/
var InsertionSort = function(A, descending, TEST_MODE) {
    if (TEST_MODE) {
        log('GROUP', ['Start sorting. A =', A, 'Size: ' + A.length]);
    }
    
    for (var j = 1; j < A.length; j++) {
        var key = A[j];
        if (TEST_MODE) {
            log('GROUP_COLLAPSED', ['Set key =', key, '( A[' + j + '] )']);
        }

        var i = j - 1;
        while (i >= 0) {
            if (descending ? A[i] < key : A[i] > key) {
                if (TEST_MODE) {
                    if (descending) {
                        log('LOG', ['Check A[' + i + '] < key (', A[i], '<' , key, '). True.']);
                    } else {
                        log('LOG', ['Check A[' + i + '] > key (', A[i], '>' , key, '). True.']);
                    }
                }
                    
                if (TEST_MODE) {
                    log('GROUP_COLLAPSED', ['A[' + (i+1) + '] <- A[' + i + ']']);
                }

                A[i + 1] = A[i];
                i = i - 1;

                if (TEST_MODE) {
                    log('LOG', ['A =', A]);
                    log('GROUP_END');
                }
            } else {
                if (TEST_MODE) {
                    if (descending) {
                        log('LOG', ['Check A[' + i + '] < key (', A[i], '<' , key, '). False.']);
                    } else {
                        log('LOG', ['Check A[' + i + '] > key (', A[i], '>' , key, '). False.']);
                    }
                }
                break;
            }
        }
        
        A[i + 1] = key;

        if (TEST_MODE) {
            log('GROUP_COLLAPSED', ['A[' + (i+1) + '] <- key']);
            log('LOG', ['A =', A]);
            log('GROUP_END');

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
initializeWebWorker(InsertionSort);
