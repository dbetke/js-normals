JS-Normals
==========

A javascript program for parsing climate data normals from <a href="http://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/products/station/">NOAA's 1981-2010 datasets</a>.


Installation
==========

Clone this repository and add any desired NOAA datasets to the Data directory.
Load the data file as text, then use the generateNormals function to process the data.

Example using Ajax:

    var data,
        obj;

        $.ajax({
            url : 'data/USC00230657.normals.txt',
            dataType : 'text',
            success : function (response) {
                data = response;
            }
        });
        
        obj = generateNormals(data);


Usage
==========
        
The object is returned with meta data (the station information) and the normals data.  The format is as follows:

    obj.meta = {
                  'Station Name' : '',
                  'GHCN Daily ID' : '',
                  'Latitude' : '',
                  'Longitude' : '',
                  'Elevation' : ''
               }
               
    obj.data = {  
                  header :  {  
                              subheader : { 
                                            description : // either an object, 
                                                          //an array containing an object, 
                                                          //or a nested array of arrays containing objects
                                          }
                            }
               }
               
    /****************************************************  
     *  header example: 'Temperature-Related Normals',  * 
     *  subheader example: 'Daily',                     * 
     *  description example: 'dly-tmax-normal'          *
     ****************************************************/
    
Examples
==========

When parsing the USC00230657.normals.txt stored in the Data directory, these are some examples of the data which can be accessed.

<b>Accessing meta data :<b> 
  
<i>From <a href="https://github.com/dbetke/js-normals#L1-L2">lines 1 and 2 of the data file</a></i>

    obj.meta['Station Name'] //will return 'MO BILLINGS 1SW'
    obj.meta['HCN Daily ID'] //will return 'USC00230657'

<b>Accessing monthly data :</b>

<i>mly-tmax-normal for Jan from <a href="https://github.com/dbetke/js-normals#L11">line 11 of the data file</a></i>

    obj.data['Temperature-Related Normals']['monthly']['mly-tmax-normal'][0].value //will return 446
    obj.data['Temperature-Related Normals']['monthly']['mly-tmax-normal'][0].flag //will return C

<b>Accessing daily data :</b>

<i>dly-tmax-normal for Jan 1st from <a href="https://github.com/dbetke/js-normals#L54">line 54 of the data file</a></i>

    obj.data['Temperature-Related Normals']['Daily']['dly-tmax-normal'][0][0].value //will return 438
    obj.data['Temperature-Related Normals']['Daily']['dly-tmax-normal'][0][0].flag //will return C
    
<b>Accessing annual/seasonal data :</b>

<i>ann-tmax-normal from <a href="https://github.com/dbetke/js-normals#L399">line 399 of the data file</a></i>

    obj.data['Temperature-Related Normals']['Annual/Seasonal']['ann-tmax-normal'].value //will return 686
    obj.data['Temperature-Related Normals']['Annual/Seasonal']['ann-tmax-normal'].flag //will return R
    

Additional Resources
==========

For information regarding how to read the climate data normals, including what the flags mean, reference NOAA's <a href="http://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/readme.txt">README</a> file.

