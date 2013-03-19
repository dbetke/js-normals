/*global describe, it, beforeEach, expect, xit, jasmine */

describe("js-normals", function () {
    "use strict";

    beforeEach(function () {
        //...
    });

    describe("function definition", function () {

        it("should define a function named generateNormals", function () {
            expect(typeof(generateNormals)).toBe("function");
        });

    });

    describe("parsing from test file data/USC00230657.normals.txt", function () {

        var loadingFinished = false,
            data,
            n;

        $.ajax({
            url : '../data/USC00230657.normals.txt',
            dataType : 'text',
            success : function (response) {
                loadingFinished = true;
                data = response;
            }
        });

        beforeEach(function () {
            waitsFor(function() {
                if (loadingFinished) {
                    n = generateNormals(data);
                }
                return loadingFinished;
            });
        });

        describe("generate normals", function () {

            it("should have metadata", function () {
                runs(function() {
                    expect(n.meta).not.toBeUndefined();
                });
            });

            it("should correctly store metadata", function () {
                runs(function() {
                    expect(n.meta['Station Name']).toBe("MO BILLINGS 1SW");
                    expect(n.meta['GHCN Daily ID']).toBe("USC00230657");
                    expect(n.meta['Latitude']).toBe('37.0536');
                    expect(n.meta['Longitude']).toBe('-93.5750');
                    expect(n.meta['Elevation']).toBe('406.0m');
                });
            });
            
            it("should have data", function () {
                expect(n.data).not.toBeUndefined();
            });

            it("should correctly store the data headers", function () {
                expect(n.data['Temperature-Related Normals']).toEqual(jasmine.any(Object));
                expect(n.data['Precipitation-Related Normals']).toEqual(jasmine.any(Object));
            });

            it("should correctly store the data subheaders", function () {
                expect(n.data['Temperature-Related Normals']['Monthly']).toEqual(jasmine.any(Object));
                expect(n.data['Temperature-Related Normals']['Daily']).toEqual(jasmine.any(Object));
                expect(n.data['Temperature-Related Normals']['Annual/Seasonal']).toEqual(jasmine.any(Object));
                expect(n.data['Precipitation-Related Normals']['Monthly']).toEqual(jasmine.any(Object));
                expect(n.data['Precipitation-Related Normals']['Daily']).toEqual(jasmine.any(Object));
                expect(n.data['Precipitation-Related Normals']['Annual/Seasonal']).toEqual(jasmine.any(Object));
            });
            
            it("should correctly store the normals description", function () {
                expect(n.data['Temperature-Related Normals']['Monthly']['mly-tmax-normal']).toEqual(jasmine.any(Array));
            });

            it("should correctly store the monthly temperature-related normals data", function () {
                expect(n.data['Temperature-Related Normals']['Monthly']['mly-tmax-normal'][0]).toEqual('446C');
                expect(n.data['Temperature-Related Normals']['Monthly']['mly-tmax-avgnds-grth040'][11]).toEqual('215C');
            });

            it("should correctly store the monthly precipitation-related normals data", function () {
                expect(n.data['Precipitation-Related Normals']['Monthly']['mly-prcp-75pctl'][4]).toEqual('521C');
                expect(n.data['Precipitation-Related Normals']['Monthly']['mly-snow-avgnds-ge100ti'][1]).toEqual('1S');
            });

            it("should correctly store the daily temperature-related normals data", function () {
                expect(n.data['Temperature-Related Normals']['Daily']['dly-tmin-normal'][0][3]).toEqual('207C');
                expect(n.data['Temperature-Related Normals']['Daily']['dly-cldd-base60'][4][12]).toEqual('5C');
            });

            it("should correctly store the daily precipitation-related normals data", function () {
                expect(n.data['Precipitation-Related Normals']['Daily']['mtd-snow-normal'][11][0]).toEqual('1P');
                expect(n.data['Precipitation-Related Normals']['Daily']['dly-prcp-pctall-ge010hi'][6][14]).toEqual('168S');
            });
            
            it("should correctly store the annual/seasonal temperature-related normals data", function () {
                expect(n.data['Temperature-Related Normals']['Annual/Seasonal']['ann-tmax-normal'][0]).toEqual('686R');
            });

            xit("should correctly store the annual/seasonal precipitation-related normals data", function () {
                expect(n.data['Precipitation-Related Normals']['Annual/Seasonal']['jja-prcp-avgnds-ge001hi'][0]).toEqual('240S');
            });


        });

    });



});
