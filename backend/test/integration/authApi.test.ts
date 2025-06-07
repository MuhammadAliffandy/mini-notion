// authApi.test.ts
import request from "supertest";
import express from "express";
import authApi from "../../src/api/authApi";
import * as userController from "../../src/controllers/userController";

jest.mock("../../src/controllers/userController");

const app = express();
app.use(express.json());
app.use("/auth", authApi);

describe("Auth API Integration Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /auth/register", () => {
        it("should return 200 if registration is successful", async () => {
            (userController.registerHandler as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json({ message: "User registered successfully" });
            });

            const response = await request(app)
                .post("/auth/register")
                .send({ name: "John", email: "john@example.com", password: "password" });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("User registered successfully");
        });

        it("should return 400 if required fields are missing", async () => {
            (userController.registerHandler as jest.Mock).mockImplementation((req, res) => {
                res.status(400).json({ message: "Invalid input" });
            });

            const response = await request(app)
                .post("/auth/register")
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Invalid input");
        });
    });

    describe("POST /auth/login", () => {
        it("should return 200 if login is successful", async () => {
            (userController.loginHandler as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json({ token: "mockToken" });
            });

            const response = await request(app)
                .post("/auth/login")
                .send({ email: "john@example.com", password: "password" });

            expect(response.status).toBe(200);
            expect(response.body.token).toBe("mockToken");
        });

        it("should return 401 if credentials are invalid", async () => {
            (userController.loginHandler as jest.Mock).mockImplementation((req, res) => {
                res.status(401).json({ message: "Invalid credentials" });
            });

            const response = await request(app)
                .post("/auth/login")
                .send({ email: "john@example.com", password: "wrongpassword" });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Invalid credentials");
        });
    });

    describe("POST /auth/forgot-pass", () => {
        it("should return 200 if password reset is successful", async () => {
            (userController.forgotPassword as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json({ message: "Password reset successfully" });
            });

            const response = await request(app)
                .post("/auth/forgot-pass")
                .send({ email: "john@example.com", password: "newpassword" });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Password reset successfully");
        });

        it("should return 400 if email or password is missing", async () => {
            (userController.forgotPassword as jest.Mock).mockImplementation((req, res) => {
                res.status(400).json({ message: "Invalid input" });
            });

            const response = await request(app)
                .post("/auth/forgot-pass")
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Invalid input");
        });
    });

    describe("GET /auth/logout", () => {
        it("should return 200 if logout is successful", async () => {
            (userController.logoutHandler as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json({ message: "Logged out successfully" });
            });

            const response = await request(app).get("/auth/logout");

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Logged out successfully");
        });
    });
});