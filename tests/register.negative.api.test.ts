jest.mock("@/utils/sendVerificationMail", () => ({
  sendVerificationMail: jest.fn().mockResolvedValue(undefined),
}));

import { POST } from "../src/app/api/register/route";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "@/database/user_model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGODB_URI = uri;
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("/api/register NEGATIVE", () => {
  it("should not register with invalid email", async () => {
    const req = {
      json: async () => ({
        firstName: "Test",
        lastName: "User",
        email: "not-an-email",
        password: "password123",
        confirmPassword: "password123",
      }),
    } as any;
    const response = await POST(req as any);
    expect(response.status).toBe(400);
  });

  it("should not register with already registered email", async () => {
    await User.create({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: "password123",
    });
    const req = {
      json: async () => ({
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      }),
    } as any;
    const response = await POST(req as any);
    expect(response.status).toBe(400);
  });

  it("should not register with short password", async () => {
    const req = {
      json: async () => ({
        firstName: "Test",
        lastName: "User",
        email: "test2@example.com",
        password: "123",
        confirmPassword: "123",
      }),
    } as any;
    const response = await POST(req as any);
    expect(response.status).toBe(400);
  });
});