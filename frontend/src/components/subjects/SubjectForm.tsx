import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { subjectService } from '../../services/subjectService';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import type { Subject } from '../../types';
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Subject name is required')
    .min(3, 'Subject name must be at least 3 characters')
    .max(60, 'Subject name cannot exceed 60 characters')
    .matches(/^[a-zA-Z0-9\s-]+$/, 'Subject name can only contain letters, numbers, spaces, and hyphens'),
  code: Yup.string()
    .required('Subject code is required')
    .min(3, 'Subject code must be at least 3 characters')
    .max(15, 'Subject code cannot exceed 15 characters')
    .matches(/^[A-Z0-9-]+$/, 'Subject code can only contain uppercase letters, numbers, and hyphens')
    .uppercase(),
});

export const SubjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchSubject();
    }
  }, [id]);

  const fetchSubject = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await subjectService.getById(id!);
      setSubject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (id) {
        await subjectService.update(id, values);
        await Swal.fire('Success!', 'Subject updated successfully.', 'success');
      } else {
        await subjectService.create(values);
        await Swal.fire('Success!', 'Subject created successfully.', 'success');
      }
      navigate('/subjects');
    } catch (err) {
      Swal.fire('Error!', 'Failed to save subject.', 'error');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Card>
      <Card.Header>
        <h2>{id ? 'Edit Subject' : 'Add New Subject'}</h2>
      </Card.Header>
      <Card.Body>
        <Formik
          initialValues={
            subject || {
              name: '',
              code: '',
            }
          }
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid, dirty, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Subject Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && !!errors.name}
                  placeholder="Enter subject name"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subject Code</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={values.code}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    setFieldValue('code', value, true);
                  }}
                  onBlur={handleBlur}
                  isInvalid={!!errors.code}
                  placeholder="Enter subject code"
                  style={{ textTransform: 'uppercase' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.code}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex gap-2">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="secondary" onClick={() => navigate('/subjects')}>
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