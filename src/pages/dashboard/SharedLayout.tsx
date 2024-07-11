import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';

const SharedLayout = () => {
  return (
    <div>
      <main>
        <NavBar>
          <Outlet />
        </NavBar>
      </main>
    </div>
  );
};

export default SharedLayout;
