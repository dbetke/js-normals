function generateNormals(str) {
    'use strict';
    var obj = {},
        fileArray = str.split('\n'),
        item,
        category,
        state,
        header,
        wholeSubheader,
        subheader,
        description,
        dataArray;

    obj.meta = {};
    obj.data = {};

    function lineCategory(str) {
        var re_meta = new RegExp(/(.+):(.+)/),  //contains a semicolon with some content on either side
            re_header = new RegExp(/(.*)Normals(.*)/i), //contains the word 'normals', ignore case
            re_subheader = new RegExp(/^(\D+)[^\-](\s*)$/), //one or more non-digit character, no dashes, followed by spaces
            re_dayNumbers = new RegExp(/^\s*(01)(.*)(31)$/), //begins with 01 and ends with 31
            re_dashes = new RegExp(/^-*$/), //contains dashes from the beginning to the end 
            re_blank = new RegExp(/^\s*$/),
            lineType; //contains spaces from the beginning to the end

        if (str.match(re_meta)) {
            lineType = 'meta';
        } else if (str.match(re_header)) {
            lineType = 'header';
        } else if (str.match(re_subheader)) {
            lineType = 'subheader';
        } else if (str.match(re_dayNumbers)) {
            lineType = 'daynumbers';
        } else if (str.match(re_dashes)) {
            lineType = 'dashes';
        } else if (!str.match(re_blank)) {
            lineType = 'data';
        } else {
            lineType = '';
        }

        return lineType;

    }

    function handleMetaData(str) {
        var newItem = str.split(':'),
            name = newItem[0].replace(/^[ \t]+|[ \t]+$/, ''),
            value = newItem[1].replace(/^[ \t]+|[ \t]+$/, '');
        obj.meta[name] = value;
    }

    for (item in fileArray) {
        category = lineCategory(fileArray[item]);
        state = 1;

        //.. parse through each array element (line), skipping blanks
        if (category !== '') {
            switch (state) {
            case 1:
                switch (category) {
                case 'meta':
                    handleMetaData(fileArray[item]);
                    state = 2;
                    break;
                }

            case 2:
                switch (category) {
                case 'meta':
                    handleMetaData(fileArray[item]);
                    state = 2;
                    break;
                case 'header':
                    header = fileArray[item];
                    obj.data[header] = {};
                    state = 3;
                    break;
                }

            case 3:
                switch (category) {
                case 'subheader':
                    wholeSubheader = fileArray[item].split(' '); //for cases when the additional column header values are on the subheader line
                    subheader = wholeSubheader[0];
                    obj.data[header][subheader] = {};
                    break;
                }

            case 4:
                switch (category) {
                case 'daynumbers':
                    state = 4;
                    break;

                case 'dashes':
                    state = 5;
                    break;
                }

            case 5:
                switch (category) {
                case 'data':

                    dataArray = fileArray[item].trim().split(/\s+/);

                    //normals description
                    if (dataArray[0].match(/^.+-/)) {
                        description = dataArray[0];
                        obj.data[header][subheader][description] = [];
                        //month
                        if (dataArray[1].match(/\D\D\D/)) {
                            dataArray.splice(0, 2);
                        } else {
                            dataArray.splice(0, 1);
                        }
                        //month  
                    } else if (dataArray[0].match(/\D\D\D/)) {
                        dataArray.splice(0, 1);
                    }

                    for (item in dataArray) {
                        //convert data value to number, store in object with flag separate
                        if (dataArray[item]) {
                            var newItem = dataArray[item].trim().split(/(\-?\d+)/);
                            dataArray[item] = {'value' : Number(newItem[1]), 'flag' : newItem[2]};
                        }
                    }


                    //for daily, will be pushing multiple arrays
                    if (subheader === 'Daily') {
                        obj.data[header][subheader][description].push(dataArray);
                    } else {
                        if (dataArray.length === 1) {
                            obj.data[header][subheader][description] = dataArray[0];
                        } else {
                            obj.data[header][subheader][description] = dataArray;
                        }
                    }

                    state = 5;

                    break;
                }

                break;
            }
        }

    }

    return obj;

}
