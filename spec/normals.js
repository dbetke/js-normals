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

        });

    });



});
