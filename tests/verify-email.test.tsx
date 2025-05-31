import { sendResetMail } from "../src/utils/sendMail";
import { jest } from '@jest/globals';

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockImplementation(async () => ({ data: { id: "test-id" }, error: null })),
    },
  })),
}));

describe("sendResetMail", () => {
  it("should send a reset email", async () => {
    const result = await sendResetMail("test@example.com", "token123");
    expect(result).toBeUndefined();
  });
});