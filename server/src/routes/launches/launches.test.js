const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
        const response = await request(app)
            .get("/launches")
            .expect("Content-Type", /json/)
            .expect(200);
        // expect(response.statusCode).toBe(200);
    });
});

describe("Test POST /launch", () => {
    const completeLaunchData = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Kepler-186 f",
        launchDate: "January 4, 2028"
    };

    const launchDataWithoutDate = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Kepler-186 f",
    };

    const launchDataWithInvalidDate = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Kepler-186 f",
        launchDate: "hello"
    };

    test("It should respond wiith 201 created", async () => {
        const response = await request(app)
            .post("/launches")
            .send(completeLaunchData)
            .expect("Content-Type", /json/)
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should catch missiing required properties", async () => {
        const response = await request(app)
            .post("/launches")
            .send(launchDataWithoutDate)
            .expect("Content-Type", /json/)
            .expect(400);
        expect(response.body).toStrictEqual({
            error: "Missing required launch property",
        });
    });

    test("It should catch invalid dates", async () => {
        const response = await request(app)
            .post("/launches")
            .send(launchDataWithInvalidDate)
            .expect("Content-Type", /json/)
            .expect(400);
        expect(response.body).toStrictEqual({
            error: "Invalid launch date",
        });
    });
});

describe("Test /DELETE launches", () => {
    const validLaunchId = 100;
    const invalidLaunchId = -22;
    test("It should respond with a 200 success", async () => {
        const resonse = await request(app)
            .delete(`/launches/${validLaunchId}`)
            .expect(200);
    });

    test("It should respond with a 400 failure", async () => {
        const response = await request(app)
            .delete(`/launches/${invalidLaunchId}`)
            .expect(400);

        expect(response.body).toStrictEqual({
            err: "Launch not found",
        });
    })
});