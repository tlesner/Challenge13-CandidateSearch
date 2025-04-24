import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
// import CandidateSearch from './pages/CandidateSearch';

function App() {
  return (
    <>
      <Nav

      />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
