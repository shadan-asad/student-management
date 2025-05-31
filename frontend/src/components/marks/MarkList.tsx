import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Button, Pagination } from 'react-bootstrap';
import { markService } from '../../services/markService';
import { studentService } from '../../services/studentService';
import { subjectService } from '../../services/subjectService';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import type { Mark, Student, Subject } from '../../types';
import Swal from 'sweetalert2';

export const MarkList = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const [marks, setMarks] = useState<Mark[]>([]);
  const [student, setStudent] = useState<Student | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const [marksResponse, studentData, subjectsResponse] = await Promise.all([
        markService.getByStudentId(studentId!, page, itemsPerPage),
        studentService.getById(studentId!),
        subjectService.getAll(1, 100)
      ]);

      setMarks(marksResponse.data);
      setTotalPages(marksResponse.meta.totalPages);
      setStudent(studentData);
      setSubjects(subjectsResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, studentId]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await markService.delete(id);
        await Swal.fire('Deleted!', 'Mark has been deleted.', 'success');
        fetchData(currentPage);
      } catch (err) {
        Swal.fire('Error!', 'Failed to delete mark.', 'error');
      }
    }
  };

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown Subject';
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!student) return <ErrorMessage message="Student not found" />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Marks for {student.firstName} {student.lastName}</h2>
          <p className="text-muted">Email: {student.email}</p>
        </div>
        <Button variant="primary" onClick={() => navigate(`/students/${studentId}/marks/new`)}>
          Add New Mark
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Score</th>
            <th>Semester</th>
            <th>Academic Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark) => (
            <tr key={mark.id}>
              <td>{getSubjectName(mark.subjectId)}</td>
              <td>{mark.score}</td>
              <td>{mark.semester}</td>
              <td>{mark.academicYear}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/students/${studentId}/marks/${mark.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(mark.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        <Pagination.First
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
}; 