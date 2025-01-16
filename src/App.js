import './App.css';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CreateConfession from './pages/CreateConfession';
import PendingConfessions from './pages/admin/PendingConfessions';
import PublishedConfessionsAdmin from './pages/admin/PublishedConfessionsAdmin';
import RejectedConfessionsAdmin from './pages/admin/RejectedConfessionsAdmin';
import Unauthorize from './pages/common/Unauthorize';
import Confessions from './pages/common/Confessions';

// function App() {
//   return (
//     <div className="App">
//       <SignUp />
//     </div>
//   );
// }

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<CreateConfession />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createConfession" element={<CreateConfession/>} />
        <Route path="/pendingConfessions" element={<PendingConfessions/>} />
        <Route path="/publishedConfessionsAdmin" element={<PublishedConfessionsAdmin/>} />
        <Route path="/rejectedConfessionsAdmin" element={<RejectedConfessionsAdmin/>} />
        <Route path="/unauthorize" element={<Unauthorize />} />
        <Route path="/confessions" element={<Confessions />} />
      </Routes>
    </Router>
  );
}

export default App;
