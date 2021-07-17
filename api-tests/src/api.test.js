const request = require("supertest")("localhost:3000");
const expect = require("chai").expect;

//Testes relacionados a categories
var tmpId = 0;
describe("GET /categories", function () {
    it("returns all categories", async function () {
        const response = await request.get("/categories");

        expect(response.status).to.eql(200);

    });
});

describe("POST /categories", function () {
    it("adds a category with a given name, must have name", async function () {
        const response = await request
            .post("/categories")
            .send({ name: "test1" });

        expect(response.status).to.eql(200);

        const attributes = response.body;
        expect(attributes).to.include.keys("id", "name");

        expect(attributes.name).to.eql("test1");

        tmpId = attributes.id;

    });
});

describe("GET /categories/{tmpId}", function () {
    it("returns a category based on a ID", async function () {
        const response = await request.get("/categories/" + String(tmpId));

        expect(response.status).to.eql(200);

        const attributes = response.body;
        expect(attributes).to.include.keys("ID_Category", "name");

        expect(attributes.name).to.eql("test1");
        expect(attributes.ID_Category).to.eql(tmpId);



    });
});


describe("DELETE /categories/{tmpId}", function () {
    it("delete a category based on a ID", async function () {
        const response = await request.delete("/categories/" + String(tmpId));

        expect(response.status).to.eql(200);

        const attributes = response.body;
        expect(attributes).to.include.keys("message");
        expect(attributes.message).to.eql("Category was deleted successfully!");
    });
});

describe("GET /categories/{tmpId}", function () {
    it("trying to get a nonexisting category", async function () {
        const response = await request.get("/categories/" + String(tmpId));

        expect(response.status).to.eql(404);

        const attributes = response.body;
        expect(attributes).to.include.keys("message");
        expect(attributes.message).to.eql("Not found Category with id " + String(tmpId) + ".");



    });
});

describe("DELETE /categories/{tmpId}", function () {
    it("trying to delete a nonexisting category", async function () {
        const response = await request.delete("/categories/" + String(tmpId));

        expect(response.status).to.eql(404);

        const attributes = response.body;
        expect(attributes).to.include.keys("message");
        expect(attributes.message).to.eql("Not found Category with id " + String(tmpId) + ".");



    });
});

//Testes relacionados a devices

describe("POST /categories", function () {
    it("adding a category to be used in device test", async function () {
        const response = await request
            .post("/categories")
            .send({ name: "test1" });

        expect(response.status).to.eql(200);

        const attributes = response.body;
        expect(attributes).to.include.keys("id", "name");

        expect(attributes.name).to.eql("test1");

        tmpId = attributes.id;

    });
});

describe("GET /devices", function () {
    it("returns all devices", async function () {
        const response = await request.get("/devices");

        expect(response.status).to.eql(200);

    });
});

var tmpDeviceId = 0;
describe("POST /devices", function () {
    it("adds a device with a given color, part number and a existing category id, all fields are needed", async function () {
        const response = await request
            .post("/devices")
            .send({ color: "red", partNumber: 1, ID_Category: tmpId });

        expect(response.status).to.eql(200);

        const attributes = response.body;
        expect(attributes).to.include.keys("id", "color", "partNumber", "ID_Category");

        expect(attributes.color).to.eql("red");
        expect(attributes.partNumber).to.eql(1);
        expect(attributes.ID_Category).to.eql(tmpId);



        tmpDeviceId = attributes.id;

    });
});


describe("GET /devices/{tmpDeviceId}", function () {
    it("returns a device based on a ID", async function () {
        const response = await request.get("/devices/" + String(tmpDeviceId));

        expect(response.status).to.eql(200);

        const attributes = response.body;
        expect(attributes).to.include.keys("ID_Device", "color", "partNumber", "ID_Category");

        expect(attributes.color).to.eql("red");
        expect(attributes.partNumber).to.eql(1);
        expect(attributes.ID_Category).to.eql(tmpId);
        expect(attributes.ID_Device).to.eql(tmpDeviceId);




    });
});


describe("DELETE /devices/{tmpDeviceId}", function () {
    it("delete a device based on a ID", async function () {
        const response = await request.delete("/devices/" + String(tmpDeviceId));

        expect(response.status).to.eql(200);

        const attributes = response.body;
        expect(attributes).to.include.keys("message");
        expect(attributes.message).to.eql("Device was deleted successfully!");
    });
});


describe("GET /devices/{tmpDeviceId}", function () {
    it("trying to get a nonexisting device", async function () {
        const response = await request.get("/devices/" + String(tmpDeviceId));

        expect(response.status).to.eql(404);

        const attributes = response.body;
        expect(attributes).to.include.keys("message");
        //expect(attributes.message).to.eql("Device was deleted successfully!");




    });
});


describe("DELETE /devices/{tmpDeviceId}", function () {
    it("trying to delete a nonexisting device", async function () {
        const response = await request.delete("/devices/" + String(tmpDeviceId));

        expect(response.status).to.eql(404);

        const attributes = response.body;
        expect(attributes).to.include.keys("message");
        //expect(attributes.message).to.eql("Device was deleted successfully!");
    });
});

describe("DELETE /categories", function () {
    it("trying to delete a category being used by a device should cause an error", async function () {
        await request
            .post("/devices")
            .send({ color: "red", partNumber: 1, ID_Category: tmpId });

        const response = await request.delete("/categories/" + String(tmpId));

        expect(response.status).to.eql(500);

        const attributes = response.body;
        expect(attributes).to.include.keys("message");
        //expect(attributes.message).to.eql("Category was deleted successfully!");

    });
});
