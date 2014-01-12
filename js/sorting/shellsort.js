/*global self, log, initializeWebWorker */
/*jshint globalstrict: true*/
"use strict";


/**
* Shellsort is a generalization of insertion sort that allows
* the exchange of items that are far apart. The idea is to
* arrange the list of elements so that, starting anywhere,
* considering every hth element gives a sorted list. Such a
* list is said to be h-sorted. Equivalently, it can be thought
* of as h interleaved lists, each individually sorted. Beginning
* with large values of h, this rearrangement allows elements to
* move long distances in the original list, reducing large amounts
* of disorder quickly, and leaving less work for smaller h-sort
* steps to do. If the file is then k-sorted for some smaller
* integer k, then the file remains h-sorted. Following this idea
* for a decreasing sequence of h values ending in 1 is guaranteed
* to leave a sorted list in the end.
*
* http://en.wikipedia.org/wiki/Shellsort
*/
var Shellsort = function(A, descending, TEST_MODE) {
    if (TEST_MODE) {
        log('GROUP', ['Start sorting. A =', A, 'Size: ' + A.length]);
    }
    
    // Using Marcin Ciura's gap sequence
    var gaps = [701, 301, 132, 57, 23, 10, 4, 1];
    
    for (var k = 0; k < gaps.length; k++) {
        var gap = gaps[k];
        if (gap >= A.length) {
            continue;
        }
        
        if (TEST_MODE) {
            log('GROUP_COLLAPSED', ['Used gap -', gap]);
        }
        
        // Do an insertion sort for each gap size.
        for (var j = gap; j < A.length; j++) {
            var key = A[j];
            if (TEST_MODE) {
                log('GROUP_COLLAPSED', ['Set key =', key, '( A[' + j + '] )']);
            }
    
            var i = j - gap;
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
                        log('GROUP_COLLAPSED', ['A[' + (i+gap) + '] <- A[' + i + ']']);
                    }
                    
                    A[i + gap] = A[i];
                    i = i - gap;
                    
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
            
            A[i + gap] = key;
            
            if (TEST_MODE) {
                log('GROUP_COLLAPSED', ['A[' + (i+gap) + '] <- key']);
                log('LOG', ['A =', A]);
                log('GROUP_END');
    
                log('LOG', ['A =', A]);
                log('GROUP_END');
            }
        }
        if (TEST_MODE) {
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
initializeWebWorker(Shellsort);
