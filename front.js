'use strict';

window.onload = function() {
    document.getElementById('import').onclick = importEasyList;
    document.getElementById('process').onclick = runEngine;
    document.getElementById('save').onclick = saveRules;
};

function importEasyList() {
    var req = new XMLHttpRequest();
    req.open('GET', 'https://easylist-downloads.adblockplus.org/easylist.txt', false); 
    req.send(null);
    if (req.status == 200) {
        setImportedText(req.responseText);
    }
}

function setImportedText(text) {
    document.getElementById('standard-list').value = text;
}

function runEngine() {
    var standardList = document.getElementById('standard-list').value.split('\n');
    var json = [];
    for (var line of standardList) {
        if (isRule(line)) {
            var rule = parseRule(line);
            if (rule !== undefined) {
                if (rule instanceof Array) { // Multiple rules, exceptionnal case due to the exclusivity of if-domain and unless-domain
                    for (var realRule of rule) {
                        json.push(realRule);
                    }
                } else {
                    json.push(rule);
                }
            }
        }
    }
    document.getElementById('processed-list').innerHTML = JSON.stringify(json);
}

function saveRules() {
    var blob = new Blob([document.getElementById('processed-list').innerHTML], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "contentBlockerRules.json");
}