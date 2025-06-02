import { POST } from "../src/app/api/register/route";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "@/database/user_model";

// Mocka e-postutskick
jest.mock("@/utils/sendVerificationMail", () => ({
  sendVerificationMail: jest.fn().mockResolvedValue(undefined),
}));

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

describe("/api/register", () => {
  it("should register a new user", async () => {
    const req = {
      json: async () => ({
        firstName: "Test",
        lastName: "User",
        email: "testuser@example.com",
        password: "password123",
        confirmPassword: "password123",
      }),
    } as any;

    const response = await POST(req as any);
    // Om du använder NextResponse.json, kan du behöva kolla response.status eller response._getStatusCode()
    expect(response.status).toBe(201);
  });
});