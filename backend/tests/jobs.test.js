const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Job = require("../models/jobModel");

const initialJobs = [
  {
    title: "Software Engineer",
    type: "Full-time",
    description: "Build systems",
    company: { name: "TechCorp", contactEmail: "hr@tech.com" },
    location: { city: "Espoo", state: "Uusimaa" },
    salary: 90000,
  },
  {
    title: "QA Analyst",
    type: "Part-time",
    description: "Testing software",
    company: { name: "SoftTest", contactEmail: "qa@test.com" },
    location: { city: "Helsinki", state: "Uusimaa" },
    salary: 60000,
  },
];

const jobsInDb = async () => {
  const jobs = await Job.find({});
  return jobs.map((job) => job.toJSON());
};

beforeEach(async () => {
  await Job.deleteMany({});
  await Job.insertMany(initialJobs);
});

describe("when there are initial jobs in the database", () => {
  it("should return all stored jobs", async () => {
    const response = await api.get("/api/jobs").expect(200);
    expect(response.body).toHaveLength(initialJobs.length);
  });

  it("should include a specific job title", async () => {
    const response = await api.get("/api/jobs");

    const titles = response.body.map((j) => j.title);
    expect(titles).toContain("Software Engineer");
  });

  it("should return the jobs in JSON format", async () => {
    await api
      .get("/api/jobs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create a new job and respond with status 201", async () => {
    const newJob = {
      title: "Backend Developer",
      type: "Full-time",
      description: "Node.js API dev",
      company: { name: "CodeHouse", contactEmail: "contact@code.com" },
      location: { city: "Rovaniemi", state: "Oulu" },
      salary: 85000,
    };

    await api.post("/api/jobs").send(newJob).expect(201);

    const jobsAtEnd = await jobsInDb();
    expect(jobsAtEnd).toHaveLength(initialJobs.length + 1);
  });

  it("should not create a job if a required field is missing", async () => {
    const badJob = {
      type: "Full-time",
      salary: 80000,
    };

    await api.post("/api/jobs").send(badJob).expect(400);

    const jobsAtEnd = await jobsInDb();
    expect(jobsAtEnd).toHaveLength(initialJobs.length);
  });
});

// Return a single job by ID
describe("getting a single job", () => {
  it("should return a job when ID is valid", async () => {
    const jobsAtStart = await jobsInDb();
    const jobToView = jobsAtStart[0];

    const response = await api.get(`/api/jobs/${jobToView.id}`).expect(200);

    expect(String(response.body.id)).toBe(String(jobToView.id));
  });

  it("should return status 400 for invalid ID format", async () => {
    await api.get("/api/jobs/12345").expect(400);
  });
});

// Update job by ID
describe("updating a job", () => {
  it("should update a job when ID is valid", async () => {
    const jobsAtStart = await jobsInDb();
    const jobToUpdate = jobsAtStart[0];

    const updatedData = { title: "Updated Engineer" };

    const response = await api
      .put(`/api/jobs/${jobToUpdate.id}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.title).toBe("Updated Engineer");
  });
});

// Delete a job by ID
describe("deleting a job", () => {
  it("should delete a job with valid ID", async () => {
    const jobsAtStart = await jobsInDb();
    const jobToDelete = jobsAtStart[0];

    await api.delete(`/api/jobs/${jobToDelete.id}`).expect(200);

    const jobsAtEnd = await jobsInDb();
    expect(jobsAtEnd).toHaveLength(initialJobs.length - 1);

    const titles = jobsAtEnd.map((j) => j.title);
    expect(titles).not.toContain(jobToDelete.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
