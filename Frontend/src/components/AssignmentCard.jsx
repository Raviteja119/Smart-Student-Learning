function AssignmentCard({
  assignment,
  submitAssignment
}) {

  return (
    <div className="card">

      <h3>{assignment.title}</h3>

      <p>{assignment.description}</p>

      <button
        onClick={() =>
          submitAssignment(assignment._id)
        }
      >
        Submit Assignment
      </button>

    </div>
  );
}

export default AssignmentCard;