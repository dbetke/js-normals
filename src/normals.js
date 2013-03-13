function generateNormals(str) {
    'use strict';
    var obj = {},
        fileArray = str.split('\n'),
        state;

    obj.meta = {};
    obj.data = {}; 

    function setState(str){
        //determine type of line, set the case
        var re_meta = new RegExp(/(.+):(.+)/),
            re_header,
            re_subheader,
            re_dashes;

        if (str.match(re_meta)) {
            state = 'meta';
        } else {
            state = undefined;
        }        
    }
    
    for (var item in fileArray) {
        //.. parse through each array element (line), skipping blanks
        if (item !== '') {
            
            setState(fileArray[item]);

            switch(state) {

            case 'meta':
                var newItem = fileArray[item].split(':'),
                    name = newItem[0].replace(/^[ \t]+|[ \t]+$/, ''),
                    value = newItem[1].replace(/^[ \t]+|[ \t]+$/, '');
                obj.meta[name] = value;
                break;

            case 'header':
                //..
                break;

            case 'subheader':
                //..
                break;

            case 'dashes':
                //.. 
                break;

            default:
                break;
            }
        }

    }

    return obj;

};
