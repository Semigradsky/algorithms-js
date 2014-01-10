/*global self */

function initializeWebWorker(func) {
    self.addEventListener('message', function(e) {
        var data = e.data;
        switch (data.cmd) {
            case 'START':
                var result = func.apply(null, data.args);
                self.postMessage({ cmd: 'DONE', data: result });
                self.close();
                break;
            default:
                self.postMessage({ cmd: 'ERROR', data: 'Unknow command: ' + data.cmd });
                self.close();
                break;
        }
    });
}

function log(cmdName, data) {
    self.postMessage({ cmd: cmdName, data: data });
}
