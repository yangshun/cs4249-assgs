function arrayToCSV(objArray) { 
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
     
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if(line != '') line += ','
         
            line += array[i][index];
        }
 
        str += line + '\r\n';
    }
 
    if (navigator.appName != 'Microsoft Internet Explorer') {
        var popup = window.open('data:text/csv;charset=utf-8,' + escape(str));
    } else {
        var popup = window.open('','csv','');
        popup.document.body.innerHTML = '<pre>' + str + '</pre>';
    }         
}
