import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "./server.js";
import dotenv from "dotenv";

// Use environment variables from .env.test instead of .env
dotenv.config({ path: "./.env.test" });
console.log(process.env.ACCESS_TOKEN_SECRET);

let mongo;

// Start MongoDB in Memory before first test:
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear DB before every single test:
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let coll of collections) {
    await coll.deleteMany({});
  }
});

// Stop connection to DB after last test:
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

describe("test registration of new user", () => {
  it("create user and create accessToken", async () => {
    const response = await request(app)
      .post("/users/register")
      .send({ username: "xyz", email: "xyz@xy.de", password: "asdfjkl" });
    expect(response.statusCode).toBe(200);
    const newUser = response.body;
    console.log("newUser", newUser);
    expect(newUser.id).toBeDefined();
    expect(newUser.username).toBeDefined();
    expect(newUser.email).toBeDefined();
    expect(response.headers["set-cookie"][0]).toBeDefined();
  });
});
