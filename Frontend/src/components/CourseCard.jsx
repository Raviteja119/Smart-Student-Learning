function CourseCard({ course, enrollCourse }) {

  return (
    <div className="card">

      <h3>{course.title}</h3>

      <p>{course.description}</p>

      <button
        onClick={() => enrollCourse(course._id)}
      >
        Enroll
      </button>

    </div>
  );
}

export default CourseCard;