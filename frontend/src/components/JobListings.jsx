import { useEffect, useState } from "react";
import JobListing from "./JobListing";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("/api/jobs"); 
      const data = await res.json();
      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-list">
      {jobs.length === 0 && <p>No jobs available.</p>}

      {jobs.map((job) => (
        <JobListing key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobListings;
