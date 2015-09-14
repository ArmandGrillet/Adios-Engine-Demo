'use strict';

window.onload = function() {
    document.getElementById('process').onclick = runEngine;
    document.getElementById('save').onclick = saveRules;
};

function runEngine() {
    var standardList = document.getElementById('standard-list').value.split('\n');
    var json = [];
    for (var rule of parseRules(standardList)) {
        json.push(rule);
    }
    document.getElementById('processed-list').innerHTML = JSON.stringify(json);
}

function saveRules() {
    var blob = new Blob([document.getElementById('processed-list').innerHTML], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "contentBlockerRules.json");
}