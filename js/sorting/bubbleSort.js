/*global log, initializeWebWorker */
(function(self) {
    "use strict";


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
}(this));
