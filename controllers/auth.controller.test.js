const request = require("supertest");
const User = require("../models/User");
const app = require("../app");
const DB = require("../database/connect");

const MOCK_USER_DATA = {
  email: "tamphuc@gmail.com",
  password: "123456",
  fullname: "test",
  role: "staff",
};

beforeAll(() => {
  DB.connectDatabase();
});

afterAll(() => {
  DB.disconnectDatabase();
});

describe("POST /auth/register", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  it("should return 200 and create a new user", async () => {
    const userData = {
      email: "test@example.com",
      password: "testpassword",
      fullname: "Test User",
      role: "user",
    };

    const response = await request(app).post("/register").send(userData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.email).toBe(userData.email);
    expect(response.body.fullname).toBe(userData.fullname);
    expect(response.body.role).toBe(userData.role);

    const user = await User.findOne({ email: userData.email });
    expect(user).toBeDefined();
  });

  it("should return 400 if user already exists", async () => {
    const userData = {
      email: "test@example.com",
      password: "testpassword",
      fullname: "Test User",
      role: "admin",
    };

    await User.create(userData);

    const response = await request(app).post("/register").send(userData);

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("user already exist");
  });

  it("should return 500 if there is an internal server error", async () => {
    jest.spyOn(User, "create").mockImplementation(() => {
      throw new Error("Something went wrong");
    });

    const userData = {
      email: "test@example.com",
      password: "testpassword",
      fullname: "Test User",
      role: "admin",
    };

    const response = await request(app).post("/auth/register").send(userData);

    expect(response.statusCode).toBe(500);
    expect(response.text).toBe("Internal server error");

    jest.spyOn(User, "create").mockRestore();
  });
});
