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

    describe("parsing from a string", function () {

        it("should corectly parse the 5 lines of metadata at the top of a string", function () {
            var data = (""
                        + "Station Name: MO BILLINGS 1SW\n"
                        + "GHCN Daily ID: USC00230657\n"
                        + "Latitude: 37.0536\n"
                        + "Longitude: -93.5750\n"
                        + "Elevation: 406.0m\n"
                       );
            var n = generateNormals(data);

            expect(n.meta['GHCN Daily ID']).toBe(" USC00230657");

        });

    });


    describe("parsing from test file data/USC00230657.normals.txt", function () {

        var loadingFinished = false;
        var data;
        var n;

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

        describe("metadata", function () {

            it("should have metadata", function () {
                runs(function() {
                    expect(n.meta).not.toBeUndefined();
                });
            });
            it("should have the correct GHCN Daily ID value", function () {
                runs(function() {
                    expect(n.meta['GHCN Daily ID']).toBe(" USC00230657");
                });
            });
            it("should have the correct Station Name value", function () {
                runs(function() {
                    expect(n.meta['Station Name']).toBe(" MO BILLINGS 1SW");
                });
            });

        });


        xdescribe("daily temperature values", function () {
            it("blahblah", function () {
            });
        });



    });



});
