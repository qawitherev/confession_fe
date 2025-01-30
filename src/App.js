import './App.css';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CreateConfession from './pages/CreateConfession';
import PendingConfessions from './pages/admin/PendingConfessions';
import Unauthorize from './pages/common/Unauthorize';
import Confessions from './pages/common/Confessions';
import RejectedConfessions from './pages/admin/RejectedConfessions';
import PublishedConfessions from './pages/admin/PublishedConfessions';

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
        <Route path="/rejectedConfessions" element={<RejectedConfessions/>} />
        <Route path="/publishedConfessions" element={<PublishedConfessions/>} />
        <Route path="/unauthorized" element={<Unauthorize />} />
        <Route path="/confessions" element={<Confessions />} />
      </Routes>
    </Router>
  );
}

export default App;
