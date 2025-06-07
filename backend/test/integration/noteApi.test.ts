// noteApi.test.ts
import request from "supertest";
import express from "express";
import noteApi from "../../src/api/noteApi";
import * as noteController from "../../src/controllers/noteController";
import verifyJWT from "../../src/middlewares/authMiddleware";

jest.mock("../../src/controllers/noteController");
jest.mock("../../src/middlewares/authMiddleware", () => jest.fn((req, res, next) => next()));

const app = express();
app.use(express.json());
app.use("/notes", noteApi);

describe("Note API Integration Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /notes", () => {
        it("should return 200 and a list of notes", async () => {
            (noteController.readNotes as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json([{ id: 1, title: "Note 1" }, { id: 2, title: "Note 2" }]);
            });

            const response = await request(app).get("/notes");

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ id: 1, title: "Note 1" }, { id: 2, title: "Note 2" }]);
        });
    });

    describe("GET /notes/:id", () => {
        it("should return 200 and a single note", async () => {
            (noteController.readNote as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json({ id: 1, title: "Note 1" });
            });

            const response = await request(app).get("/notes/1");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, title: "Note 1" });
        });

        it("should return 404 if note is not found", async () => {
            (noteController.readNote as jest.Mock).mockImplementation((req, res) => {
                res.status(404).json({ message: "Note not found" });
            });

            const response = await request(app).get("/notes/999");

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Note not found");
        });
    });

    describe("POST /notes", () => {
        it("should return 201 and create a new note", async () => {
            (noteController.createNote as jest.Mock).mockImplementation((req, res) => {
                res.status(201).json({ id: 1, title: "New Note" });
            });

            const response = await request(app)
                .post("/notes")
                .send({ title: "New Note" });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ id: 1, title: "New Note" });
        });

        it("should return 400 if required fields are missing", async () => {
            (noteController.createNote as jest.Mock).mockImplementation((req, res) => {
                res.status(400).json({ message: "Invalid input" });
            });

            const response = await request(app).post("/notes").send({});

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Invalid input");
        });
    });

    describe("PUT /notes/:id", () => {
        it("should return 200 and update the note", async () => {
            (noteController.updateNote as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json({ id: 1, title: "Updated Note" });
            });

            const response = await request(app)
                .put("/notes/1")
                .send({ title: "Updated Note" });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, title: "Updated Note" });
        });

        it("should return 404 if note is not found", async () => {
            (noteController.updateNote as jest.Mock).mockImplementation((req, res) => {
                res.status(404).json({ message: "Note not found" });
            });

            const response = await request(app)
                .put("/notes/999")
                .send({ title: "Updated Note" });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Note not found");
        });
    });

    describe("DELETE /notes/:id", () => {
        it("should return 200 and delete the note", async () => {
            (noteController.deleteNote as jest.Mock).mockImplementation((req, res) => {
                res.status(200).json({ message: "Note deleted successfully" });
            });

            const response = await request(app).delete("/notes/1");

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Note deleted successfully");
        });

        it("should return 404 if note is not found", async () => {
            (noteController.deleteNote as jest.Mock).mockImplementation((req, res) => {
                res.status(404).json({ message: "Note not found" });
            });

            const response = await request(app).delete("/notes/999");

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Note not found");
        });
    });
});