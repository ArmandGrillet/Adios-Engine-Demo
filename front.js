'use strict';

window.onload = function() {
    document.getElementById('process').onclick = runEngine;
    document.getElementById('save').onclick = saveRules;
};

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

var J50Npi = {  
    currentScript: null,  
    getJSON: function(url, data, callback) {
      var src = url + (url.indexOf("?")+1 ? "&" : "?");
      var head = document.getElementsByTagName("head")[0];
      var newScript = document.createElement("script");
      var params = [];
      var param_name = ""

      this.success = callback;

      data["callback"] = "J50Npi.success";
      for(param_name in data){  
          params.push(param_name + "=" + encodeURIComponent(data[param_name]));  
      }
      src += params.join("&")

      newScript.type = "text/javascript";  
      newScript.src = src;

      if(this.currentScript) head.removeChild(currentScript);
      head.appendChild(newScript); 
    },
    success: null
}; 