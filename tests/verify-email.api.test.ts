import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "@/database/user_model";
import { POST } from "../src/app/api/verify-email/route";

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

describe("/api/verify-email", () => {
  it("should verify user with valid token", async () => {
    const user = await User.create({
      firstName: "Verify",
      lastName: "Test",
      email: "verify@example.com",
      password: "password123",
      verificationToken: "verify-token-123",
      isVerified: false,
    });

    // Skicka token till API-routen
    const req = {
      json: async () => ({ token: "verify-token-123" }),
    } as any;

    const response = await POST(req);
    expect(response.status).toBe(200);

    const updatedUser = await User.findById(user._id);
    expect(updatedUser?.isVerified).toBe(true);
  });

  it("should not verify user with invalid token", async () => {
    const req = {
      json: async () => ({ token: "invalid-token" }),
    } as any;

    const response = await POST(req);
    expect(response.status).toBe(400);
  });
});