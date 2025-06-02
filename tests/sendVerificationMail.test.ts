import { sendVerificationMail } from "../src/utils/sendVerificationMail";

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: "test-id" }, error: null }),
    },
  })),
}));

describe("sendVerificationMail", () => {
  it("should send a verification email", async () => {
    const result = await sendVerificationMail("test@example.com", "token123");
    expect(result).toBeUndefined(); // Funktionen returnerar inget, men ska inte kasta fel
  });
});