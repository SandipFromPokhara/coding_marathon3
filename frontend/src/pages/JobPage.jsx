import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();         
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`); 
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Failed to fetch job", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this job?");
    if (!ok) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (!res.ok) {
        console.error("Failed to delete job");
        return;
      }
      navigate("/");
    } catch (err) {
      console.error("Error deleting job", err);
    }
  };

  if (loading) return <p>Loading job...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="job-page">
      <h1>{job.title}</h1>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Description:</strong> {job.description}</p>

      <h3>Company</h3>
      <p><strong>Name:</strong> {job.company?.name}</p>
      <p><strong>Contact Email:</strong> {job.company?.contactEmail}</p>
      <p><strong>Size:</strong> {job.company?.size}</p>

      <h3>Location</h3>
      <p>{job.location?.city}, {job.location?.state}</p>

      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
      <p><strong>Status:</strong> {job.status}</p>

      {job.requirements && job.requirements.length > 0 && (
        <>
          <h3>Requirements</h3>
          <ul>
            {job.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </>
      )}

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <Link to={`/edit-job/${job._id}`}>
          <button>Edit Job</button>
        </Link>

        <button onClick={handleDelete}>
          Delete Job
        </button>
      </div>
    </div>
  );
};

export default JobPage;
