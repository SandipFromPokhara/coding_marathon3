const JobListing = ({ job, onDelete }) => {
  return (
    <div className="job-preview">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company?.name}</p>

      <button onClick={() => onDelete(job._id)}>
        Delete
      </button>
    </div>
  );
};

export default JobListing;
