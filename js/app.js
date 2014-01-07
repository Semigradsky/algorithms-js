/*global window, console */
/*jshint globalstrict: true*/

"use strict";

var TEST_MODE = false;
var $ = window.document.getElementById;

function generateRandomArray(n, min, max) {
    return new Array(n).join(' ').split(' ').map(function() { return Math.floor(Math.random() * (max - min) + min); });
}

function runAlgorithm(func, name, args) {
    var timerId;
    if (!TEST_MODE) {
        timerId = "Timer_" + new Date().getTime();
        console.time(timerId);
    }
    console.log("************************************************");
    console.log("Start ", name);
    console.log("************************************************");
    func.apply(null, args);
    if (!TEST_MODE) {
        console.timeEnd(timerId);
    }
    console.log("************************************************");
}

(function() {
    $("Sort").onclick = function(event) {
        if (event.target.className !== "run") {
            return;
        }
        runAlgorithm(window.Sorting[event.target.id], event.target.textContent, [window.RandomArray.slice()]);
    };
    $("SearchElement").onclick = function(event) {
        if (event.target.className !== "run") {
            return;
        }
        var array = window.RandomArray.slice();
        if (event.target.id === "BinarySearch") {
            array = array.sort();
        }
        runAlgorithm(window.Searching[event.target.id], event.target.textContent, [array, 1]);
    };
    $("SearchSubarray").onclick = function(event) {
        if (event.target.className !== "run") {
            return;
        }
        runAlgorithm(window.Searching[event.target.id], event.target.textContent, [window.RandomArray.slice()]);
    };

    $("GenerateRandomArray").onclick = function() {
        var n = +$("CountDigits").value,
            min = +$("MinNumber").value,
            max = +$("MaxNumber").value;
        window.RandomArray = generateRandomArray(n, min, max);
        $("ArrayForSorting").textContent = window.RandomArray.toString();
    };
    $("GenerateRandomArray").click();
}());
