// blockApi.test.ts
import request from "supertest";
import express from "express";
import blockApi from "../../src/api/blockApi";
import * as blockController from "../../src/controllers/blockController";
import verifyJWT from "../../src/middlewares/authMiddleware";

jest.mock("../../src/controllers/blockController");
jest.mock("../../src/middlewares/authMiddleware", () => jest.fn((req, res, next) => next()));

const app = express();
app.use(express.json());
app.use("/blocks", blockApi);

describe("Block API Integration Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /blocks", () => {
        it("should return 200 and a list of blocks", async () => {
            (blockController.readBlocks as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json([{ id: 1, content: "Block 1" }, { id: 2, content: "Block 2" }]);
            });

            const response = await request(app).get("/blocks");

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ id: 1, content: "Block 1" }, { id: 2, content: "Block 2" }]);
        });
    });

    describe("GET /blocks/:id", () => {
        it("should return 200 and a single block", async () => {
            (blockController.readBlock as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json({ id: 1, content: "Block 1" });
            });

            const response = await request(app).get("/blocks/1");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, content: "Block 1" });
        });

        it("should return 404 if block is not found", async () => {
            (blockController.readBlock as jest.Mock).mockImplementation((req, res) => {
                res.status(404).json({ message: "Block not found" });
            });

            const response = await request(app).get("/blocks/999");

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Block not found");
        });
    });

    describe("GET /blocks/noteId/:id", () => {
        it("should return 200 and blocks by note ID", async () => {
            (blockController.findByNoteId as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json([{ id: 1, content: "Block 1", noteId: 1 }]);
            });

            const response = await request(app).get("/blocks/noteId/1");

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ id: 1, content: "Block 1", noteId: 1 }]);
        });
    });

    describe("POST /blocks", () => {
        it("should return 201 and create a new block", async () => {
            (blockController.createBlock as jest.Mock).mockImplementation((req, res) => {
                res.status(201).json({ id: 1, content: "New Block" });
            });

            const response = await request(app)
                .post("/blocks")
                .send({ content: "New Block" });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ id: 1, content: "New Block" });
        });

        it("should return 400 if required fields are missing", async () => {
            (blockController.createBlock as jest.Mock).mockImplementation((req, res) => {
                res.status(400).json({ message: "Invalid input" });
            });

            const response = await request(app).post("/blocks").send({});

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Invalid input");
        });
    });

    describe("PUT /blocks/:id", () => {
        it("should return 200 and update the block", async () => {
            (blockController.updateBlock as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json({ id: 1, content: "Updated Block" });
            });

            const response = await request(app)
                .put("/blocks/1")
                .send({ content: "Updated Block" });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, content: "Updated Block" });
        });

        it("should return 404 if block is not found", async () => {
            (blockController.updateBlock as jest.Mock).mockImplementation((req, res) => {
                res.status(404).json({ message: "Block not found" });
            });

            const response = await request(app)
                .put("/blocks/999")
                .send({ content: "Updated Block" });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Block not found");
        });
    });

    describe("DELETE /blocks/:id", () => {
        it("should return 200 and delete the block", async () => {
            (blockController.deleteBlock as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json({ message: "Block deleted successfully" });
            });

            const response = await request(app).delete("/blocks/1");

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Block deleted successfully");
        });

        it("should return 404 if block is not found", async () => {
            (blockController.deleteBlock as jest.Mock).mockImplementation((req, res) => {
                res.status(404).json({ message: "Block not found" });
            });

            const response = await request(app).delete("/blocks/999");

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Block not found");
        });
    });
});