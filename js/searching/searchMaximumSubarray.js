// http://en.wikipedia.org/wiki/Maximum_subarray_problem

(function(root) {
    "use strict";
    
    root.Searching = root.Searching || { };
    root.Searching.MaximumSubarray_DivideAndConquer = function(A) {
        var TEST_MODE = root.TEST_MODE;
        
        if (TEST_MODE) {
            console.group("Start searching. A =", A, " Size: " + A.length);
        }
        
        var result = FindMaximumSubarray(A, 0, A.length - 1);
        
        if (TEST_MODE) {
            console.log(result);
            console.groupEnd();
        }
        
        return result;
    };
    
    function FindingSubarrayResults(leftPos, rightPos, sum) {
        this.leftPos = leftPos;
        this.rightPos = rightPos;
        this.sum = sum;
    }
    
    function FindMaximumSubarray(A, low, high) {
        if (high == low) {
            return new FindingSubarrayResults(low, high, A[low]);;
        }
        
        var mid = Math.floor((low + high) / 2);
        
        console.groupCollapsed("Find max subarray in left part of array: A[" + low + ".." + mid + "]");
        var leftResult = FindMaximumSubarray(A, low, mid);
        console.log(leftResult);
        console.groupEnd();
        
        console.groupCollapsed("Find max subarray in right part of array: A[" + (mid+1) + ".." + high + "]");
        var rightResult = FindMaximumSubarray(A, mid + 1, high);
        console.log(rightResult);
        console.groupEnd();
        
        console.groupCollapsed("Find max subarray in middle array: A[" + low + ".." + high + "]");
        var crossResult = FindMaxCrossingSubArray(A, low, mid, high);
        console.log(crossResult);
        console.groupEnd();
        
        var result;
        if (leftResult.sum >= rightResult.sum && leftResult.sum >= crossResult.sum) {
            result = leftResult;
        } else if (rightResult.sum >= leftResult.sum && rightResult.sum >= crossResult.sum) {
            result = rightResult;
        } else {
            result = crossResult;
        }
        
        return result;
    }
    
    function FindMaxCrossingSubArray(A, low, mid, high) {        
        var leftSum = -Infinity,
            rightSum = -Infinity,
            sum = 0,
            maxLeft = 0,
            maxRight = 0;
        
        for (var i = mid; i >= low; i--) {
            sum = sum + A[i];
            if (sum > leftSum) {
                leftSum = sum;
                maxLeft = i;
            }
        }

        sum = 0;        
        for (var j = mid + 1; j <= high; j++) {
            sum = sum + A[j];
            if (sum > rightSum) {
                rightSum = sum;
                maxRight = j;
            }
        }

        return new FindingSubarrayResults(maxLeft, maxRight, leftSum + rightSum);;
    }
    
}(this));