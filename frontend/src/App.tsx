import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Navbar } from './components/common/Navbar';
import { StudentList } from './components/students/StudentList';
import { StudentForm } from './components/students/StudentForm';
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
          <Route path="/subjects" element={<div>Subjects List (Coming Soon)</div>} />
          <Route path="/students/:id/marks" element={<div>Student Marks (Coming Soon)</div>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
