import { POST } from "../src/app/api/auth/reset-password/route";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "@/database/user_model";
import bcrypt from "bcryptjs";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Skapa en testanvändare med resetPasswordToken
  await User.create({
    firstName: "Reset",
    lastName: "Test",
    email: "resetuser@example.com",
    password: await bcrypt.hash("oldpassword", 10),
    resetPasswordToken: "reset-token-123",
    resetPasswordExpires: new Date(Date.now() + 1000 * 60 * 10),
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("/api/auth/reset-password", () => {
  it("should reset the password with valid token", async () => {
    const req = {
      json: async () => ({
        token: "reset-token-123",
        password: "newpassword123",
      }),
    } as any;

    const response = await POST(req as any);
    expect(response.status).toBe(200);
  });
});