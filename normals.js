function generateNormals (str) {
    var obj = {},
        textStr = str,
        linesArray = textStr.split('\n', 5); //get first five lines -> station name, id, lat, long, elev
 
    obj.meta = {};
    //obj.data = {}; //focus on daily data first
    
    for (item in linesArray){
            var newItem = linesArray[item].split(':'),
                name = newItem[0],
                value = newItem[1];
            obj.meta[name] = value;
        }
   
    console.log(obj);
};
