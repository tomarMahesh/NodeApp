import request from "supertest";
import fs from "fs-extra";
import path from "path";
import { app } from "../src/index";

const dataFile = path.join(__dirname, "../src/dictionary.json");

// ✅ Helper to reset dictionary.json before each test
beforeEach(async () => {
  await fs.writeJSON(dataFile, []); // empty list before each test
});

describe("Dictionary API CRUD Tests", () => {
  it("should create a new word (POST /words)", async () => {
    const res = await request(app)
      .post("/api/words")
      .send({ word: "apple", meanings: ["a fruit", "a tech company"] });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Word created");
  });

  it("should return all words (GET /words)", async () => {
    // First insert a word
    await request(app).post("/api/words").send({ word: "java", meanings: ["a language"] });

    const res = await request(app).get("/api/words");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].word).toBe("java");
  });

  it("should return a specific word (GET /words/:word)", async () => {
    await request(app).post("/api/words").send({ word: "apple", meanings: ["a fruit"] });

    const res = await request(app).get("/api/words/apple");
    expect(res.status).toBe(200);
    expect(res.body.word).toBe("apple");
    expect(res.body.meanings).toContain("a fruit");
  });

  it("should return 404 for a missing word", async () => {
    const res = await request(app).get("/api/words/unknown");
    expect(res.status).toBe(404);
  });

  it("should update meanings of a word (PUT /words/:word)", async () => {
    await request(app).post("/api/words").send({ word: "apple", meanings: ["a fruit"] });

    const res = await request(app)
      .put("/api/words/apple")
      .send({ meanings: ["a delicious fruit", "Apple Inc."] });

    expect(res.status).toBe(200);
    expect(res.body.word.meanings).toEqual(["a delicious fruit", "Apple Inc."]);
  });

  it("should delete a word (DELETE /words/:word)", async () => {
    await request(app).post("/api/words").send({ word: "apple", meanings: ["a fruit"] });

    const delRes = await request(app).delete("/api/words/apple");
    expect(delRes.status).toBe(200);
    expect(delRes.body.message).toBe("Word deleted");

    // Verify it's gone
    const getRes = await request(app).get("/api/words/apple");
    expect(getRes.status).toBe(404);
  });
  
});
