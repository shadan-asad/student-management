import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Navbar } from './components/common/Navbar';
import { StudentList } from './components/students/StudentList';
import { StudentForm } from './components/students/StudentForm';
import { SubjectList } from './components/subjects/SubjectList';
import { SubjectForm } from './components/subjects/SubjectForm';
import { MarkList } from './components/marks/MarkList';
import { MarkForm } from './components/marks/MarkForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/students/new" element={<StudentForm />} />
          <Route path="/students/:id/edit" element={<StudentForm />} />
          <Route path="/subjects" element={<SubjectList />} />
          <Route path="/subjects/new" element={<SubjectForm />} />
          <Route path="/subjects/:id/edit" element={<SubjectForm />} />
          <Route path="/students/:studentId/marks" element={<MarkList />} />
          <Route path="/students/:studentId/marks/new" element={<MarkForm />} />
          <Route path="/students/:studentId/marks/:markId/edit" element={<MarkForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
