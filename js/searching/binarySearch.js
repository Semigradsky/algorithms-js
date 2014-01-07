(function(root) {
    "use strict";

    root.Searching = root.Searching || { };
    root.Searching.BinarySearch = function(A, el) {
        var TEST_MODE = root.TEST_MODE;

        if (TEST_MODE) {
            console.group("Start searching. Searching element:", el, " A =", A, " Size: " + A.length);
        }

        var result = search(A, 0, A.length - 1, el);

        if (TEST_MODE) {
            console.log("Element not founded!");
            console.groupEnd();
        }
        return result;
    };

    function search(A, l, r, el) {
        if (l == r) {
            return A[l] == el ? el : null;
        }

        var m = Math.floor((l + r) / 2);
        if (A[m] < el) {
            return search(A, m, r, el);
        } else if (A[m] > el) {
            return search(A, l, m, el);
        } else {
            return el;
        }
    }

}(this));
