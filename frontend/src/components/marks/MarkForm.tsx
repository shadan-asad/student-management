import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { markService } from '../../services/markService';
import { studentService } from '../../services/studentService';
import { subjectService } from '../../services/subjectService';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import type { Mark, Student, Subject } from '../../types';
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
  subjectId: Yup.string().required('Subject is required'),
  score: Yup.number()
    .required('Score is required')
    .min(0, 'Score must be at least 0')
    .max(100, 'Score cannot exceed 100'),
  semester: Yup.number()
    .required('Semester is required')
    .min(1, 'Semester must be at least 1')
    .max(8, 'Semester cannot exceed 8'),
  academicYear: Yup.string()
    .required('Academic year is required')
    .matches(/^\d{4}-\d{4}$/, 'Academic year must be in format YYYY-YYYY'),
});

export const MarkForm = () => {
  const { studentId, markId } = useParams<{ studentId: string; markId: string }>();
  const navigate = useNavigate();
  const [mark, setMark] = useState<Mark | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [studentId, markId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [studentData, subjectsResponse] = await Promise.all([
        studentService.getById(studentId!),
        subjectService.getAll(1, 100)
      ]);

      setStudent(studentData);
      setSubjects(subjectsResponse.data);

      if (markId) {
        const markData = await markService.getById(markId);
        setMark(markData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: Omit<Mark, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (markId) {
        await markService.update(markId, values);
        await Swal.fire('Success!', 'Mark updated successfully.', 'success');
      } else {
        await markService.create({ ...values, studentId: studentId! });
        await Swal.fire('Success!', 'Mark created successfully.', 'success');
      }
      navigate(`/students/${studentId}/marks`);
    } catch (err) {
      Swal.fire('Error!', 'Failed to save mark.', 'error');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!student) return <ErrorMessage message="Student not found" />;

  return (
    <Card>
      <Card.Header>
        <h2>{markId ? 'Edit Mark' : 'Add New Mark'}</h2>
        <p className="text-muted mb-0">
          Student: {student.firstName} {student.lastName}
        </p>
      </Card.Header>
      <Card.Body>
        <Formik
          initialValues={
            mark || {
              subjectId: '',
              score: 0,
              semester: 1,
              academicYear: '',
              studentId: studentId!
            }
          }
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Select
                  name="subjectId"
                  value={values.subjectId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.subjectId && !!errors.subjectId}
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} ({subject.code})
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.subjectId}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Score</Form.Label>
                <Form.Control
                  type="number"
                  name="score"
                  value={values.score}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.score && !!errors.score}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.score}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Semester</Form.Label>
                <Form.Control
                  type="number"
                  name="semester"
                  value={values.semester}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.semester && !!errors.semester}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.semester}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Academic Year</Form.Label>
                <Form.Control
                  type="text"
                  name="academicYear"
                  placeholder="YYYY-YYYY"
                  value={values.academicYear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.academicYear && !!errors.academicYear}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.academicYear}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="secondary" onClick={() => navigate(`/students/${studentId}/marks`)}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}; 