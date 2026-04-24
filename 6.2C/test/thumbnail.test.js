const expect = require("chai").expect;
const request = require("request");
const { calculatePixels } = require("../thumbnailUtils");

describe("AI Thumbnail Utility API Testing", function () {

    const baseUrl = "http://localhost:3000";

    it("should return status 200 for home route", function (done) {
        request(baseUrl, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.include("AI Thumbnail Utility API is running");
            done();
        });
    });

    it("should calculate thumbnail pixels correctly for valid dimensions", function (done) {
        request.get(`${baseUrl}/thumbnail-size?width=1280&height=720`, function (error, response, body) {
            const result = JSON.parse(body);

            expect(response.statusCode).to.equal(200);
            expect(result.pixels).to.equal(921600);
            done();
        });
    });

    it("should return error for invalid thumbnail dimensions", function (done) {
        request.get(`${baseUrl}/thumbnail-size?width=0&height=720`, function (error, response, body) {
            expect(response.statusCode).to.equal(400);
            expect(body).to.include("Invalid width or height");
            done();
        });
    });

    it("calculatePixels should return correct result", function () {
        const result = calculatePixels(1920, 1080);
        expect(result).to.equal(2073600);
    });

    it("calculatePixels should throw error for negative values", function () {
        expect(() => calculatePixels(-100, 720)).to.throw("Width and height must be positive numbers");
    });

});