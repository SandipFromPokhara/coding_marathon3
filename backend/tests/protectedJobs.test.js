const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Job = require("../models/jobModel");
const jwt = require("jsonwebtoken");

// Helper: generate JWT token
const generateToken = (user) =>
  jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "1h" });

let testUser;
let token;

// Create a valid test user
beforeAll(async () => {
  await User.deleteMany({});
  await Job.deleteMany({});

  testUser = new User({
    name: "Test User",
    username: "testuser",
    password: "Password123!",
    phone_number: "1234567890",
    gender: "male",
    date_of_birth: new Date("1990-01-01"),
    address: {
      street: "123 Test St",
      city: "Test City",
      zipCode: "12345",
    },
  });

  await testUser.save();
  token = generateToken(testUser);
});

// Clear jobs before each test
beforeEach(async () => {
  await Job.deleteMany({});
});

// Close DB connection
afterAll(async () => {
  await mongoose.connection.close();
});

describe("protected route checkup", () => {
  describe("authentication", () => {
    it("should return all jobs (public route)", async () => {
      const job = new Job({
        title: "Software Engineer",
        type: "Full-time",
        description: "Build systems",
        company: { name: "TechCorp", contactEmail: "hr@tech.com" },
        location: { city: "Espoo", state: "Uusimaa" },
        salary: 90000,
        user_id: testUser._id,
      });
      await job.save();

      const res = await api.get("/api/jobs");
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe("Software Engineer");
    });
  });

  describe("GET /api/jobs/:id", () => {
    it("should return a job by valid ID", async () => {
      const job = new Job({
        title: "QA Analyst",
        type: "Part-time",
        description: "Testing software",
        company: { name: "SoftTest", contactEmail: "qa@test.com" },
        location: { city: "Helsinki", state: "Uusimaa" },
        salary: 60000,
        user_id: testUser._id,
      });
      await job.save();

      const res = await api.get(`/api/jobs/${job._id}`);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe("QA Analyst");
    });

    it("should return 404 for invalid ID", async () => {
      const res = await api.get("/api/jobs/invalidid");
      expect(res.status).toBe(404);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("POST /api/jobs", () => {
    const newJob = {
      title: "Backend Developer",
      type: "Full-time",
      description: "Node.js API dev",
      company: { name: "CodeHouse", contactEmail: "contact@code.com" },
      location: { city: "Rovaniemi", state: "Oulu" },
      salary: 85000,
    };

    it("should deny creation if not authenticated", async () => {
      const res = await api.post("/api/jobs").send(newJob);
      expect(res.status).toBe(401);
      expect(res.body.error).toBeDefined();
    });

    it("should allow creation of job if authenticated", async () => {
      const res = await api
        .post("/api/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send(newJob);

      expect(res.status).toBe(201);
      expect(res.body.title).toBe("Backend Developer");
      expect(res.body.user_id).toBe(String(testUser._id));
    });
  });

  describe("PUT /api/jobs/:id", () => {
    it("should deny job update if not authenticated", async () => {
      const job = new Job({
        title: "Frontend Developer",
        type: "Full-time",
        description: "React dev",
        company: { name: "UI Inc", contactEmail: "ui@test.com" },
        location: { city: "Helsinki", state: "Uusimaa" },
        salary: 80000,
        user_id: testUser._id,
      });
      await job.save();

      const res = await api.put(`/api/jobs/${job._id}`).send({ title: "Updated" });
      expect(res.status).toBe(401);
    });

    it("should allow job update if authenticated", async () => {
      const job = new Job({
        title: "Frontend Developer",
        type: "Full-time",
        description: "React dev",
        company: { name: "UI Inc", contactEmail: "ui@test.com" },
        location: { city: "Helsinki", state: "Uusimaa" },
        salary: 80000,
        user_id: testUser._id,
      });
      await job.save();

      const res = await api
        .put(`/api/jobs/${job._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Updated Frontend Developer" });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe("Updated Frontend Developer");
    });
  });

  describe("DELETE /api/jobs/:id", () => {
    it("should deny job deletion if not authenticated", async () => {
      const job = new Job({
        title: "DevOps Engineer",
        type: "Full-time",
        description: "Deploy systems",
        company: { name: "OpsCorp", contactEmail: "ops@test.com" },
        location: { city: "Espoo", state: "Uusimaa" },
        salary: 90000,
        user_id: testUser._id,
      });
      await job.save();

      const res = await api.delete(`/api/jobs/${job._id}`);
      expect(res.status).toBe(401);
    });

    it("should allow job deletion if authenticated", async () => {
      const job = new Job({
        title: "DevOps Engineer",
        type: "Full-time",
        description: "Deploy systems",
        company: { name: "OpsCorp", contactEmail: "ops@test.com" },
        location: { city: "Espoo", state: "Uusimaa" },
        salary: 90000,
        user_id: testUser._id,
      });
      await job.save();

      const res = await api
        .delete(`/api/jobs/${job._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(204);
    });
  });
});
