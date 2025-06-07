// userApi.test.ts
import request from "supertest";
import express from "express";
import userApi from "../../src/api/userApi";
import * as userController from "../../src/controllers/userController";
import verifyJWT from "../../src/middlewares/authMiddleware";

jest.mock("../../src/controllers/userController");
jest.mock("../../src/middlewares/authMiddleware");

const app = express();
app.use(express.json());
app.use("/user", userApi);

describe("User API Integration Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /user", () => {
        it("should return 200 and user data if JWT is valid", async () => {
            (verifyJWT as jest.Mock).mockImplementation((req, res, next) => next());
            (userController.findUserById as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json({ id: 1, name: "John Doe", email: "john@example.com" });
            });

            const response = await request(app).get("/user");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, name: "John Doe", email: "john@example.com" });
        });

        it("should return 401 if JWT is invalid", async () => {
            (verifyJWT as jest.Mock).mockImplementation((req, res) => {
                res.status(401).json({ message: "Unauthorized" });
            });

            const response = await request(app).get("/user");

            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Unauthorized");
        });

        it("should return 500 if an error occurs in the controller", async () => {
            (verifyJWT as jest.Mock).mockImplementation((req, res, next) => next());
            (userController.findUserById as jest.Mock).mockImplementation((req, res) => {
                res.status(500).json({ message: "Internal Server Error" });
            });

            const response = await request(app).get("/user");

            expect(response.status).toBe(500);
            expect(response.body.message).toBe("Internal Server Error");
        });
    });
});