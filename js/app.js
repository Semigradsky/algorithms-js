/*global window, console */
/*jshint globalstrict: true*/

"use strict";

var TEST_MODE = true;
var $ = window.document.getElementById;
$ = $.bind(window.document);

function generateRandomArray(n, min, max) {
    return new Array(n).join(' ').split(' ').map(function() { return Math.floor(Math.random() * (max - min) + min); });
}

function runAlgorithm(workerInfo, name, args) {
    var timerId;
    if (!TEST_MODE) {
        timerId = "Timer_" + new Date().getTime();
        console.time(timerId);
    }
    console.log("************************************************");
    console.log("Start ", name);
    console.log("************************************************");

   args.push(TEST_MODE);
    var worker = new window.Worker('/js/' + workerInfo.type + '/' + workerInfo.name + '.js');
    worker.postMessage({ cmd: 'START', args: args });
    worker.addEventListener('message', function(e) {
        var msg = e.data;
        switch (msg.cmd) {
            case 'ERROR':
                console.log('An error has occurred: ' + msg.data);
                if (!TEST_MODE) {
                    console.timeEnd(timerId);
                }
                console.log("************************************************");
                break;
            case 'DONE':
                if (!TEST_MODE) {
                    console.timeEnd(timerId);
                }
                console.log("************************************************");
                break;
            case 'GROUP':
                console.group.apply(console, msg.data);
                break;
            case 'GROUP_COLLAPSED':
                console.groupCollapsed.apply(console, msg.data);
                break;
            case 'GROUP_END':
                console.groupEnd.apply(console, msg.data);
                break;
            case 'LOG':
                console.log.apply(console, msg.data);
                break;
            case 'INFO':
                console.info.apply(console, msg.data);
                break;
        }

    });
}

(function() {
    $("Sort").onclick = function(event) {
        if (event.target.className !== "run") {
            return;
        }
        runAlgorithm({ type: "Sorting", name: event.target.id  }, event.target.textContent, [window.RandomArray.slice(), true]);
        // TODO: change 'true' to sorting order
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
        runAlgorithm(window.Searching[event.target.id], event.target.textContent, [window.RandomArray.slice(), true]);
        // TODO: change 'true' to sorting order
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
