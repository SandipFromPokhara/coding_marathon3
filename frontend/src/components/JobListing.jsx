import { Link } from "react-router-dom";

const JobListing = ({ job }) => {
  return (
    <div className="job-preview">
      <h2>
        <Link to={`/jobs/${job._id}`}>{job.title}</Link>
      </h2>
      <p>Type: {job.type}</p>
      <p>Company: {job.company?.name}</p>
      <p>Location: {job.location?.city}, {job.location?.state}</p>
    </div>
  );
};

export default JobListing;
