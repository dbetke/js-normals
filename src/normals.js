function generateNormals (str) {
    'use strict';
    var obj = {},
        linesArray = str.split('\n', 5); //get first five lines -> station name, id, lat, long, elev

    obj.meta = {};
    obj.data = {}; //focus on daily data first
    
    for (item in linesArray){
            var newItem = linesArray[item].split(':'),
                name = newItem[0].replace(/^[ \t]+|[ \t]+$/, '');
                value = newItem[1].replace(/^[ \t]+|[ \t]+$/, '');
            obj.meta[name] = value;
        }

    return obj;
};
