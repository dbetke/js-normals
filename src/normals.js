function generateNormals(str) {
    'use strict';
    var obj = {},
        fileArray = str.split('\n');

    obj.meta = {};
    obj.data = {}; 

    function lineCategory(str){
        //determine type of line, set the case
        var re_meta = new RegExp(/(.+):(.+)/),  //contains a semicolon with some content on either side
            re_header = new RegExp(/(.*)Normals(.*)/i), //contains the word 'normals', ignore case
            re_subheader = new RegExp(/(Monthly)|(Daily)|(Annual\/Seasonal)/i),
            re_dayNumbers = new RegExp(/^\s*(01)(.*)(31)$/),
            re_dashes;

        if (str.match(re_meta)) {
            return 'meta';
        } else if (str.match(re_header)) {
            return 'header';
        } else if (str.match(re_subheader)) {
            return 'subheader';
        } else if (str.match(re_dayNumbers)) {
            return 'columnheader';
        } else {
            return '';
        }

    }

    function handleMetaData (str) {
        var newItem = str.split(':'),
            name = newItem[0].replace(/^[ \t]+|[ \t]+$/, ''),
            value = newItem[1].replace(/^[ \t]+|[ \t]+$/, '');
        obj.meta[name] = value;
    }

    for (var item in fileArray) {
        var category = lineCategory(fileArray[item]),
            state = 1,
            header,
            wholeSubheader,
            subheader,
            columnHeaders;
        //.. parse through each array element (line), skipping blanks
        if (category !== '') {
            switch(state) {
                case 1 : 
                    switch(category) {
                        case 'meta' :
                            handleMetaData(fileArray[item]);
                            state = 2;
                        break;
                 }
                
                case 2 :
                    switch(category) {
                        case 'meta' :
                            handleMetaData(fileArray[item]);
                            state = 2;
                        break;
                        case 'header' :
                            header = fileArray[item];
                            obj.data[header] = {};
                            state = 3;
                        break;
                    }

                case 3 : 
                    switch(category) {
                        case 'subheader' :
                            wholeSubheader = fileArray[item].split(' '); //for cases when the additional column header values are on the subheader line
                            subheader = wholeSubheader[0];
                            obj.data[header][subheader] = {};
                            state = 4;
                        break;
                    }

                case 4 : 
                    switch(category) {
                        case 'daynumbers' :
                            //..
                            state = 4;
                        break;
                        case 'dashes' : 
                            //..
                            state = 5;
                        break;
                    }

                case 5 : 
                    switch(category) {
                        case 'data' : 
                        //..
                        state = 5;
                        break;
                    }

                break;
            }
        }

    }

    return obj;

};
