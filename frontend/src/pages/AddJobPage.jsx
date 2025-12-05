import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    type: "Full-time",
    description: "",
    companyName: "",
    contactEmail: "",
    companySize: "",
    city: "",
    state: "",
    salary: "",
    experienceLevel: "Entry",
    status: "open",
    applicationDeadline: "",
    requirements: "", 
  });

  const addJob = async (jobData) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });
      if (!res.ok) {
        throw new Error("Failed to add job");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const jobData = {
      title: form.title,
      type: form.type,
      description: form.description,
      company: {
        name: form.companyName,
        contactEmail: form.contactEmail,
        size: form.companySize ? Number(form.companySize) : undefined,
      },
      location: {
        city: form.city,
        state: form.state,
      },
      salary: Number(form.salary),
      experienceLevel: form.experienceLevel,
      status: form.status,
      applicationDeadline: form.applicationDeadline || null,
      requirements: form.requirements
        ? form.requirements.split(",").map((r) => r.trim()).filter(Boolean)
        : [],
    };

    console.log("Submitting job:", jobData);
    const ok = await addJob(jobData);
    if (ok) {
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>

      <form onSubmit={submitForm}>
        <label>Job Title</label>
        <input
          name="title"
          type="text"
          required
          value={form.title}
          onChange={handleChange}
        />

        <label>Job Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>

        <label>Job Description</label>
        <textarea
          name="description"
          required
          value={form.description}
          onChange={handleChange}
        />

        <label>Company Name</label>
        <input
          name="companyName"
          type="text"
          required
          value={form.companyName}
          onChange={handleChange}
        />

        <label>Contact Email</label>
        <input
          name="contactEmail"
          type="email"
          required
          value={form.contactEmail}
          onChange={handleChange}
        />

        <label>Company Size (number of employees)</label>
        <input
          name="companySize"
          type="number"
          min="1"
          value={form.companySize}
          onChange={handleChange}
        />

        <label>City</label>
        <input
          name="city"
          type="text"
          required
          value={form.city}
          onChange={handleChange}
        />

        <label>State</label>
        <input
          name="state"
          type="text"
          required
          value={form.state}
          onChange={handleChange}
        />

        <label>Salary</label>
        <input
          name="salary"
          type="number"
          min="0"
          required
          value={form.salary}
          onChange={handleChange}
        />

        <label>Experience Level</label>
        <select
          name="experienceLevel"
          value={form.experienceLevel}
          onChange={handleChange}
        >
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>

        <label>Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        <label>Application Deadline</label>
        <input
          name="applicationDeadline"
          type="date"
          value={form.applicationDeadline}
          onChange={handleChange}
        />

        <label>Requirements</label>
        <input
          name="requirements"
          type="text"
          value={form.requirements}
          onChange={handleChange}
        />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
