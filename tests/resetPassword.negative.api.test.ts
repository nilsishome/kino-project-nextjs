import { POST } from "../src/app/api/auth/reset-password/route";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "@/database/user_model";
import bcrypt from "bcryptjs";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGODB_URI = uri;
  await mongoose.connect(uri);
  await User.create({
    firstName: "Reset",
    lastName: "Test",
    email: "resetuser@example.com",
    password: await bcrypt.hash("oldpassword", 10),
    resetPasswordToken: "reset-token-123",
    resetPasswordExpires: new Date(Date.now() - 1000 * 60 * 10), // Utgången token
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("/api/auth/reset-password NEGATIVE", () => {
  it("should not reset password with invalid token", async () => {
    const req = {
      json: async () => ({
        token: "invalid-token",
        password: "newpassword123",
      }),
    } as any;
    const response = await POST(req as any);
    expect(response.status).toBe(400);
  });

  it("should not reset password with expired token", async () => {
    const req = {
      json: async () => ({
        token: "reset-token-123",
        password: "newpassword123",
      }),
    } as any;
    const response = await POST(req as any);
    expect(response.status).toBe(400);
  });
});